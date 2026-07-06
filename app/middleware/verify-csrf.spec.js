const verifyCsrf = require('./verify-csrf')

describe('verifyCsrf', () => {
  let next
  let originalConsoleError

  beforeEach(() => {
    next = jest.fn()
    originalConsoleError = console.error
    console.error = jest.fn()
  })

  afterEach(() => {
    console.error = originalConsoleError
    jest.clearAllMocks()
  })

  it('allows requests with a matching query token', () => {
    const req = {
      session: { csrfToken: 'token-1' },
      query: { _csrf: 'token-1' },
      body: {}
    }

    verifyCsrf(req, {}, next)

    expect(next).toHaveBeenCalledWith()
  })

  it('allows requests with a matching body token', () => {
    const req = {
      session: { csrfToken: 'token-2' },
      query: {},
      body: { _csrf: 'token-2' }
    }

    verifyCsrf(req, {}, next)

    expect(next).toHaveBeenCalledWith()
  })

  it('allows requests when either body or query token matches', () => {
    const req = {
      session: { csrfToken: 'token-3' },
      query: { _csrf: 'wrong-token' },
      body: { _csrf: 'token-3' }
    }

    verifyCsrf(req, {}, next)

    expect(next).toHaveBeenCalledWith()
  })

  it('rejects requests with no valid token', () => {
    const req = {
      session: { csrfToken: 'token-4' },
      query: {},
      body: {}
    }

    verifyCsrf(req, {}, next)

    expect(next).toHaveBeenCalledWith(expect.any(Error))
    const [error] = next.mock.calls[0]
    expect(error.message).toBe('Invalid CSRF token')
    expect(error.status).toBe(403)
  })
})
