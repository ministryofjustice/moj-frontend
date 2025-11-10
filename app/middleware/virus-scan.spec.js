const loadMiddleware = (config = {}) => {
  jest.resetModules()

  const scanStream = jest.fn()
  const init = jest.fn().mockImplementation(async () => ({ scanStream }))
  const captureException = jest.fn()

  class FakeNodeClam {
    init(...args) {
      return init(...args)
    }
  }

  jest.doMock('clamscan', () => FakeNodeClam)
  jest.doMock('@sentry/node', () => ({
    captureException
  }))
  jest.doMock('../config', () => ({
    VIRUS_SCAN_ENABLED: true,
    VIRUS_SCAN_HOST: 'clamav',
    VIRUS_SCAN_PORT: 3310,
    VIRUS_SCAN_SOCKET: undefined,
    VIRUS_SCAN_TIMEOUT_MS: 15000,
    ...config
  }))

  const { scanUploadedFileForViruses } = require('./virus-scan')

  return {
    captureException,
    init,
    scanStream,
    scanUploadedFileForViruses
  }
}

describe('scanUploadedFileForViruses', () => {
  let req, res, next
  const originalConsoleError = console.error
  const originalConsoleWarn = console.warn

  beforeEach(() => {
    req = {
      file: {
        fieldname: 'componentImage',
        originalname: 'test-file.pdf',
        buffer: Buffer.from('%PDF-test')
      }
    }
    res = {}
    next = jest.fn()
    console.error = jest.fn()
    console.warn = jest.fn()
  })

  afterEach(() => {
    jest.dontMock('clamscan')
    jest.dontMock('@sentry/node')
    jest.dontMock('../config')
    console.error = originalConsoleError
    console.warn = originalConsoleWarn
  })

  it('calls next without scanning when no file is present', async () => {
    const { init, scanStream, scanUploadedFileForViruses } = loadMiddleware()
    delete req.file

    await scanUploadedFileForViruses(req, res, next)

    expect(init).not.toHaveBeenCalled()
    expect(scanStream).not.toHaveBeenCalled()
    expect(next).toHaveBeenCalledWith()
  })

  it('calls next without scanning when scanning is disabled', async () => {
    const { init, scanStream, scanUploadedFileForViruses } = loadMiddleware({
      VIRUS_SCAN_ENABLED: false
    })

    await scanUploadedFileForViruses(req, res, next)

    expect(init).not.toHaveBeenCalled()
    expect(scanStream).not.toHaveBeenCalled()
    expect(next).toHaveBeenCalledWith()
  })

  it('calls next after a clean scan', async () => {
    const { init, scanStream, scanUploadedFileForViruses } = loadMiddleware()
    scanStream.mockResolvedValue({ isInfected: false, viruses: [] })

    await scanUploadedFileForViruses(req, res, next)

    expect(init).toHaveBeenCalledWith({
      clamdscan: {
        host: 'clamav',
        port: 3310,
        timeout: 15000,
        localFallback: false,
        active: true
      },
      clamscan: { active: false },
      preference: 'clamdscan'
    })
    expect(scanStream).toHaveBeenCalledTimes(1)
    expect(next).toHaveBeenCalledWith()
  })

  it('uses socket scan options when a scanner socket is configured', async () => {
    const { init, scanStream, scanUploadedFileForViruses } = loadMiddleware({
      VIRUS_SCAN_HOST: undefined,
      VIRUS_SCAN_SOCKET: '/run/clamav/clamd.sock'
    })
    scanStream.mockResolvedValue({ isInfected: false, viruses: [] })

    await scanUploadedFileForViruses(req, res, next)

    expect(init).toHaveBeenCalledWith({
      clamdscan: {
        socket: '/run/clamav/clamd.sock',
        timeout: 15000,
        localFallback: false,
        active: true
      },
      clamscan: { active: false },
      preference: 'clamdscan'
    })
    expect(next).toHaveBeenCalledWith()
  })

  it('reuses the initialized scanner across multiple successful scans', async () => {
    const { init, scanStream, scanUploadedFileForViruses } = loadMiddleware()
    scanStream.mockResolvedValue({ isInfected: false, viruses: [] })

    await scanUploadedFileForViruses(req, res, next)
    await scanUploadedFileForViruses(req, res, next)

    expect(init).toHaveBeenCalledTimes(1)
    expect(scanStream).toHaveBeenCalledTimes(2)
  })

  it('passes a virus found error when the scan is malicious', async () => {
    const { scanStream, scanUploadedFileForViruses } = loadMiddleware()
    scanStream.mockResolvedValue({
      isInfected: true,
      viruses: ['Eicar-Test-Signature']
    })

    await scanUploadedFileForViruses(req, res, next)

    const [error] = next.mock.calls[0]
    expect(error).toBeInstanceOf(Error)
    expect(error.code).toBe('LIMIT_FILE_VIRUS_FOUND')
    expect(error.field).toBe('componentImage')
  })

  it('passes a scanner failure error when scanning throws', async () => {
    const { captureException, scanStream, scanUploadedFileForViruses } =
      loadMiddleware()
    const thrownError = new Error('Connection refused')
    scanStream.mockRejectedValue(thrownError)

    await scanUploadedFileForViruses(req, res, next)

    const [error] = next.mock.calls[0]
    expect(error).toBeInstanceOf(Error)
    expect(error.code).toBe('LIMIT_FILE_VIRUS_SCAN_FAILED')
    expect(error.field).toBe('componentImage')
    expect(error.cause).toBe(thrownError)
    expect(captureException).toHaveBeenCalledWith(thrownError)
  })

  it('re-initializes the scanner after a scan failure', async () => {
    const { init, scanStream, scanUploadedFileForViruses } = loadMiddleware()
    scanStream.mockRejectedValueOnce(new Error('Connection refused'))
    scanStream.mockResolvedValueOnce({ isInfected: false, viruses: [] })

    await scanUploadedFileForViruses(req, res, next)
    await scanUploadedFileForViruses(req, res, next)

    expect(init).toHaveBeenCalledTimes(2)
    expect(next).toHaveBeenNthCalledWith(2)
  })

  it('fails closed when scanning is enabled without scanner config', async () => {
    const { captureException, init, scanStream, scanUploadedFileForViruses } =
      loadMiddleware({
        VIRUS_SCAN_HOST: undefined,
        VIRUS_SCAN_SOCKET: undefined
      })

    await scanUploadedFileForViruses(req, res, next)

    const [error] = next.mock.calls[0]
    expect(init).not.toHaveBeenCalled()
    expect(scanStream).not.toHaveBeenCalled()
    expect(error).toBeInstanceOf(Error)
    expect(error.code).toBe('LIMIT_FILE_VIRUS_SCAN_FAILED')
    expect(error.field).toBe('componentImage')
    expect(captureException).toHaveBeenCalledWith(error)
  })
})
