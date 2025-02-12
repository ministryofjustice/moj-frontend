const mockSendEmail = jest.fn()
const { sendSubmissionEmail, sendPrEmail } = require('./notify-email')
const { NotifyClient } = require('notifications-node-client')

jest.mock('notifications-node-client', () => {
  return {
    NotifyClient: jest.fn().mockImplementation(() => {
      return {
        sendEmail: mockSendEmail,
        prepareUpload: jest.fn().mockReturnValue('mockFileUrl')
      }
    })
  }
})

describe('sendSubmissionEmail', () => {
  let originalLog, originalError

  beforeEach(() => {
    originalLog = console.log
    originalError = console.error
    console.log = jest.fn()
    console.error = jest.fn()
  })

  afterEach(() => {
    jest.clearAllMocks()
    console.log = originalLog
    console.error = originalError
  })

  it('should send a submission email successfully', async () => {
    mockSendEmail.mockResolvedValue({ status: 'success' })

    await sendSubmissionEmail('http://example.com')

    expect(mockSendEmail).toHaveBeenCalledWith(
      expect.any(String),
      expect.any(String),
      {
        personalisation: { link: 'http://example.com' }
      }
    )
    expect(mockSendEmail).toHaveBeenCalledTimes(1)
  })

  it('should handle errors when sending a submission email', async () => {
    const error = new Error('Failed to send email')
    mockSendEmail.mockRejectedValue(error)

    await expect(sendSubmissionEmail('http://example.com')).rejects.toThrow(
      'Failed to send email'
    )

    expect(mockSendEmail).toHaveBeenCalledWith(
      expect.any(String),
      expect.any(String),
      {
        personalisation: { link: 'http://example.com' }
      }
    )
    expect(mockSendEmail).toHaveBeenCalledTimes(1)
  })
})

describe('sendPrEmail', () => {
  let mockSendEmail

  beforeEach(() => {
    const notifyClientInstance = new NotifyClient()
    mockSendEmail = notifyClientInstance.sendEmail
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should send a PR email successfully', async () => {
    mockSendEmail.mockResolvedValue({ status: 'success' })

    await sendPrEmail('http://example.com')

    expect(mockSendEmail).toHaveBeenCalledWith(
      expect.any(String),
      expect.any(String),
      {
        personalisation: { link: 'http://example.com' }
      }
    )
    expect(mockSendEmail).toHaveBeenCalledTimes(1)
  })

  it('should handle errors when sending a PR email', async () => {
    const error = new Error('Failed to send email')
    mockSendEmail.mockRejectedValue(error)

    await expect(sendPrEmail('http://example.com')).rejects.toThrow(
      'Failed to send email'
    )

    expect(mockSendEmail).toHaveBeenCalledWith(
      expect.any(String),
      expect.any(String),
      {
        personalisation: { link: 'http://example.com' }
      }
    )
    expect(mockSendEmail).toHaveBeenCalledTimes(1)
  })
})
