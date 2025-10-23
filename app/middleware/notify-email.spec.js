const mockSendEmail = jest.fn()
process.env.NOTIFY_EMAIL_RETRY_MS = 1000
process.env.NOTIFY_EMAIL_MAX_RETRIES = 3
const { NotifyClient } = require('notifications-node-client')

const {
  sendSubmissionEmail,
  sendPrEmail,
  sendSuccessEmail
} = require('./notify-email')

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

    await sendSubmissionEmail('session text', 'markdown')

    expect(mockSendEmail).toHaveBeenCalledWith(
      expect.any(String),
      expect.any(String),
      {
        personalisation: {
          link_to_file: 'mockFileUrl',
          markdown: 'markdown'
        }
      }
    )
    expect(mockSendEmail).toHaveBeenCalledTimes(1)
  })

  it('should handle errors when sending a submission email', async () => {
    const error = new Error('Failed to send email')
    mockSendEmail.mockRejectedValue(error)

    await expect(sendSubmissionEmail('filebuffer', 'markdown')).rejects.toThrow(
      'Failed to send email'
    )

    expect(mockSendEmail).toHaveBeenCalledWith(
      expect.any(String),
      expect.any(String),
      {
        personalisation: {
          link_to_file: 'mockFileUrl',
          markdown: 'markdown'
        }
      }
    )
    expect(mockSendEmail).toHaveBeenCalledTimes(3)
  })
})

describe('sendEmail with backoff logic', () => {
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

  it('should retry with exponential backoff on failure', async () => {
    const error = new Error('Failed to send email')
    mockSendEmail
      .mockRejectedValueOnce(error)
      .mockRejectedValueOnce(error)
      .mockResolvedValue({ status: 'success' })

    const start = Date.now()
    await sendSubmissionEmail('filebuffer', 'markdown')
    const end = Date.now()

    expect(mockSendEmail).toHaveBeenCalledTimes(3)
    expect(mockSendEmail).toHaveBeenCalledWith(
      expect.any(String),
      expect.any(String),
      {
        personalisation: {
          link_to_file: 'mockFileUrl',
          markdown: 'markdown'
        }
      }
    )

    const duration = end - start
    expect(duration).toBeGreaterThanOrEqual(3000) // 1000ms + 2000ms backoff
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

    await sendPrEmail(
      {
        url: 'http://pr.example.com',
        number: 1234
      },
      {
        url: 'http://issue.example.com',
        number: 5678
      },
      {
        componentName: 'component',
        email: 'name@email.com',
        name: 'bob',
        team: 'team'
      }
    )

    expect(mockSendEmail).toHaveBeenCalledWith(
      expect.any(String),
      expect.any(String),
      {
        personalisation: {
          pr_link: 'http://pr.example.com',
          preview_link:
            'https://moj-frontend-pr-1234.apps.live.cloud-platform.service.justice.gov.uk',
          issue_link: 'http://issue.example.com',
          component_name: 'component',
          name: 'bob',
          email: 'name@email.com',
          team: 'team'
        }
      }
    )
    expect(mockSendEmail).toHaveBeenCalledTimes(1)
  })

  it('should handle errors when sending a PR email', async () => {
    const error = new Error('Failed to send email')
    mockSendEmail.mockRejectedValue(error)

    await expect(
      sendPrEmail(
        {
          url: 'http://example.com',
          number: 1234
        },
        {},
        {}
      )
    ).rejects.toThrow('Failed to send email')

    expect(mockSendEmail).toHaveBeenCalledWith(
      expect.any(String),
      expect.any(String),
      {
        personalisation: {
          pr_link: 'http://example.com',
          preview_link:
            'https://moj-frontend-pr-1234.apps.live.cloud-platform.service.justice.gov.uk'
        }
      }
    )
    expect(mockSendEmail).toHaveBeenCalledTimes(3)
  })
})

describe('sendSuccessEmail', () => {
  let mockSendEmail

  beforeEach(() => {
    const notifyClientInstance = new NotifyClient()
    mockSendEmail = notifyClientInstance.sendEmail
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should send a success email successfully', async () => {
    mockSendEmail.mockResolvedValue({ status: 'success' })

    await sendSuccessEmail({
      componentName: 'component',
      email: 'name@email.com',
      name: 'bob',
      team: 'team'
    })

    expect(mockSendEmail).toHaveBeenCalledWith(
      expect.any(String),
      'name@email.com',
      {
        personalisation: {
          component_name: 'component',
          name: 'bob',
          email: 'name@email.com'
        }
      }
    )
    expect(mockSendEmail).toHaveBeenCalledTimes(1)
  })

  it('should handle errors when sending a success email', async () => {
    const error = new Error('Failed to send email')
    mockSendEmail.mockRejectedValue(error)

    await expect(sendSuccessEmail({})).rejects.toThrow('Failed to send email')

    expect(mockSendEmail).toHaveBeenCalledWith(expect.any(String), undefined, {
      personalisation: {}
    })
    expect(mockSendEmail).toHaveBeenCalledTimes(3)
  })
})
