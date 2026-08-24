const loadMiddleware = (config = {}) => {
  jest.resetModules()

  const scanBuffer = jest.fn()
  const captureException = jest.fn()
  const verdict = {
    Clean: Symbol('Clean'),
    Malicious: Symbol('Malicious'),
    ScanError: Symbol('ScanError')
  }

  jest.doMock('pompelmi', () => ({
    scanBuffer,
    Verdict: verdict
  }))
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
    scanBuffer,
    scanUploadedFileForViruses,
    verdict
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
    jest.dontMock('pompelmi')
    jest.dontMock('@sentry/node')
    jest.dontMock('../config')
    console.error = originalConsoleError
    console.warn = originalConsoleWarn
  })

  it('calls next without scanning when no file is present', async () => {
    const { scanBuffer, scanUploadedFileForViruses } = loadMiddleware()
    delete req.file

    await scanUploadedFileForViruses(req, res, next)

    expect(scanBuffer).not.toHaveBeenCalled()
    expect(next).toHaveBeenCalledWith()
  })

  it('calls next without scanning when scanning is disabled', async () => {
    const { scanBuffer, scanUploadedFileForViruses } = loadMiddleware({
      VIRUS_SCAN_ENABLED: false
    })

    await scanUploadedFileForViruses(req, res, next)

    expect(scanBuffer).not.toHaveBeenCalled()
    expect(next).toHaveBeenCalledWith()
  })

  it('calls next after a clean scan', async () => {
    const { scanBuffer, scanUploadedFileForViruses, verdict } = loadMiddleware()
    scanBuffer.mockResolvedValue(verdict.Clean)

    await scanUploadedFileForViruses(req, res, next)

    expect(scanBuffer).toHaveBeenCalledWith(req.file.buffer, {
      host: 'clamav',
      port: 3310,
      timeout: 15000
    })
    expect(next).toHaveBeenCalledWith()
  })

  it('uses socket scan options when a scanner socket is configured', async () => {
    const { scanBuffer, scanUploadedFileForViruses, verdict } = loadMiddleware({
      VIRUS_SCAN_HOST: undefined,
      VIRUS_SCAN_SOCKET: '/run/clamav/clamd.sock'
    })
    scanBuffer.mockResolvedValue(verdict.Clean)

    await scanUploadedFileForViruses(req, res, next)

    expect(scanBuffer).toHaveBeenCalledWith(req.file.buffer, {
      socket: '/run/clamav/clamd.sock',
      timeout: 15000
    })
    expect(next).toHaveBeenCalledWith()
  })

  it('passes a virus found error when the scan is malicious', async () => {
    const { scanBuffer, scanUploadedFileForViruses, verdict } = loadMiddleware()
    scanBuffer.mockResolvedValue(verdict.Malicious)

    await scanUploadedFileForViruses(req, res, next)

    const [error] = next.mock.calls[0]
    expect(error).toBeInstanceOf(Error)
    expect(error.code).toBe('LIMIT_FILE_VIRUS_FOUND')
    expect(error.field).toBe('componentImage')
  })

  it('passes a scanner failure error when the scan returns ScanError', async () => {
    const {
      captureException,
      scanBuffer,
      scanUploadedFileForViruses,
      verdict
    } = loadMiddleware()
    scanBuffer.mockResolvedValue(verdict.ScanError)

    await scanUploadedFileForViruses(req, res, next)

    const [error] = next.mock.calls[0]
    expect(error).toBeInstanceOf(Error)
    expect(error.code).toBe('LIMIT_FILE_VIRUS_SCAN_FAILED')
    expect(error.field).toBe('componentImage')
    expect(captureException).toHaveBeenCalledWith(error)
  })

  it('passes a scanner failure error when scanning throws', async () => {
    const { captureException, scanBuffer, scanUploadedFileForViruses } =
      loadMiddleware()
    const thrownError = new Error('Connection refused')
    scanBuffer.mockRejectedValue(thrownError)

    await scanUploadedFileForViruses(req, res, next)

    const [error] = next.mock.calls[0]
    expect(error).toBeInstanceOf(Error)
    expect(error.code).toBe('LIMIT_FILE_VIRUS_SCAN_FAILED')
    expect(error.field).toBe('componentImage')
    expect(error.cause).toBe(thrownError)
    expect(captureException).toHaveBeenCalledWith(thrownError)
  })

  it('fails closed when scanning is enabled without scanner config', async () => {
    const { captureException, scanBuffer, scanUploadedFileForViruses } =
      loadMiddleware({
        VIRUS_SCAN_HOST: undefined,
        VIRUS_SCAN_SOCKET: undefined
      })

    await scanUploadedFileForViruses(req, res, next)

    const [error] = next.mock.calls[0]
    expect(scanBuffer).not.toHaveBeenCalled()
    expect(error).toBeInstanceOf(Error)
    expect(error.code).toBe('LIMIT_FILE_VIRUS_SCAN_FAILED')
    expect(error.field).toBe('componentImage')
    expect(captureException).toHaveBeenCalledWith(error)
  })
})
