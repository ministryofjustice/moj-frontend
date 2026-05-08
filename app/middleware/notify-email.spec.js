const mockSendEmail = jest.fn()
const mockPrepareUpload = jest.fn().mockReturnValue('mockFileUrl')

const mockConfigDefaults = {
  NOTIFY_SUBMISSION_TEMPLATE: 'mock-submission-template',
  NOTIFY_PR_TEMPLATE: 'mock-pr-template',
  NOTIFY_SUCCESS_TEMPLATE: 'mock-success-template',
  NOTIFY_VERIFICATION_TEMPLATE: 'mock-verification-template',
  NOTIFY_EMAIL: 'mock@email.com',
  NOTIFY_TOKEN: 'mock-token',
  NOTIFY_EMAIL_RETRY_MS: 1000,
  NOTIFY_EMAIL_MAX_RETRIES: 3,
  APP_URL: 'http://localhost:3000'
}

jest.mock('../config', () => ({ ...mockConfigDefaults }))

jest.mock('notifications-node-client', () => {
  return {
    NotifyClient: jest.fn().mockImplementation(() => {
      return {
        sendEmail: mockSendEmail,
        prepareUpload: mockPrepareUpload
      }
    })
  }
})

const { NotifyClient } = require('notifications-node-client')

const {
  sendSubmissionEmail,
  sendPrEmail,
  sendSuccessEmail,
  sendVerificationEmail
} = require('./notify-email')

// Helper to re-require notify-email with a patched config
const requireWithConfig = (configOverrides) => {
  jest.resetModules()
  jest.doMock('../config', () => ({
    ...mockConfigDefaults,
    ...configOverrides
  }))
  jest.doMock('notifications-node-client', () => ({
    NotifyClient: jest.fn().mockImplementation(() => ({
      sendEmail: mockSendEmail,
      prepareUpload: mockPrepareUpload
    }))
  }))
  return require('./notify-email')
}

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

  it('should retry and throw an error after all retries are exhausted', async () => {
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

  it('should throw if NOTIFY_SUBMISSION_TEMPLATE is not set', async () => {
    const { sendSubmissionEmail: fn } = requireWithConfig({
      NOTIFY_SUBMISSION_TEMPLATE: ''
    })
    await expect(fn('filebuffer', 'markdown')).rejects.toThrow(
      'NOTIFY_SUBMISSION_TEMPLATE env var is not set'
    )
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
            'https://moj-frontend-pr-1234.apps.live.cloud-platform.service.justice.gov.uk/components/component',
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

  it('should retry and throw an error after all retries are exhausted', async () => {
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
            'https://moj-frontend-pr-1234.apps.live.cloud-platform.service.justice.gov.uk/components/'
        }
      }
    )
    expect(mockSendEmail).toHaveBeenCalledTimes(3)
  })

  it('should throw if NOTIFY_PR_TEMPLATE is not set', async () => {
    const { sendPrEmail: fn } = requireWithConfig({ NOTIFY_PR_TEMPLATE: '' })
    await expect(
      fn({ url: 'http://example.com', number: 1 }, {}, {})
    ).rejects.toThrow('NOTIFY_PR_TEMPLATE env var is not set')
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

  it('should retry and throw an error after all retries are exhausted', async () => {
    const error = new Error('Failed to send email')
    mockSendEmail.mockRejectedValue(error)

    await expect(sendSuccessEmail({})).rejects.toThrow('Failed to send email')

    expect(mockSendEmail).toHaveBeenCalledWith(expect.any(String), undefined, {
      personalisation: {}
    })
    expect(mockSendEmail).toHaveBeenCalledTimes(3)
  })

  it('should throw if NOTIFY_SUCCESS_TEMPLATE is not set', async () => {
    const { sendSuccessEmail: fn } = requireWithConfig({
      NOTIFY_SUCCESS_TEMPLATE: ''
    })
    await expect(
      fn({ componentName: 'component', email: 'a@b.com', name: 'bob' })
    ).rejects.toThrow('NOTIFY_SUCCESS_TEMPLATE env var is not set')
  })
})

describe('sendVerificationEmail', () => {
  let mockSendEmail

  beforeEach(() => {
    const notifyClientInstance = new NotifyClient()
    mockSendEmail = notifyClientInstance.sendEmail
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should send a verification email successfully', async () => {
    mockSendEmail.mockResolvedValue({ status: 'success' })

    await sendVerificationEmail('user@example.com', 'abc123')

    expect(mockSendEmail).toHaveBeenCalledWith(
      expect.any(String),
      'user@example.com',
      {
        personalisation: {
          token_link:
            'http://localhost:3000/contribute/add-new-component/email/verify/abc123'
        }
      }
    )
    expect(mockSendEmail).toHaveBeenCalledTimes(1)
  })

  it('should retry and throw an error after all retries are exhausted', async () => {
    const error = new Error('Failed to send email')
    mockSendEmail.mockRejectedValue(error)

    await expect(
      sendVerificationEmail('user@example.com', 'abc123')
    ).rejects.toThrow('Failed to send email')
    expect(mockSendEmail).toHaveBeenCalledTimes(3)
  })

  it('should throw if NOTIFY_VERIFICATION_TEMPLATE is not set', async () => {
    const { sendVerificationEmail: fn } = requireWithConfig({
      NOTIFY_VERIFICATION_TEMPLATE: ''
    })
    await expect(fn('user@example.com', 'abc123')).rejects.toThrow(
      'NOTIFY_VERIFICATION_TEMPLATE env var is not set'
    )
  })
})
