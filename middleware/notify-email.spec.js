const mockSendEmail = jest.fn()

jest.mock('notifications-node-client', () => {
  return {
    NotifyClient: jest.fn().mockImplementation(() => {
      return { sendEmail: mockSendEmail }
    })
  }
})

const sendEmail = require('./notify-email')

describe('sendEmail', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should send an email successfully', async () => {
    mockSendEmail.mockResolvedValue({ status: 'success' })

    await sendEmail('http://example.com')

    console.log('sendEmail called with:', mockSendEmail.mock.calls)

    expect(mockSendEmail).toHaveBeenCalledWith(
      expect.any(String),
      expect.any(String),
      {
        personalisation: { link: 'http://example.com' }
      }
    )
    expect(mockSendEmail).toHaveBeenCalledTimes(1)
  })

  it('should handle errors when sending an email', async () => {
    const error = new Error('Failed to send email')
    mockSendEmail.mockRejectedValue(error)

    await expect(sendEmail('http://example.com')).rejects.toThrow(
      'Failed to send email'
    )

    console.log('sendEmail called with:', mockSendEmail.mock.calls)

    expect(mockSendEmail).toHaveBeenCalledWith(
      expect.any(String),
      expect.any(String),
      {
        personalisation: { link: 'http://example.com' }
      }
    )
    expect(mockSendEmail).toHaveBeenCalledTimes(1)
  })

  it('should send an email without a link', async () => {
    mockSendEmail.mockResolvedValue({ status: 'success' })

    await sendEmail()

    console.log('sendEmail called with:', mockSendEmail.mock.calls)

    expect(mockSendEmail).toHaveBeenCalledWith(
      expect.any(String),
      expect.any(String),
      {
        personalisation: {}
      }
    )
    expect(mockSendEmail).toHaveBeenCalledTimes(1)
  })
})
