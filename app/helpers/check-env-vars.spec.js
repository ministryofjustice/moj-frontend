const {
  checkRequiredEnvVars: checkEnvVars,
  checkForbiddenEnvVars
} = require('./check-env-vars')

describe('checkEnvVars', () => {
  let mockLog

  beforeEach(() => {
    mockLog = jest.fn()
  })

  afterEach(() => {
    delete process.env.TEST_VAR_A
    delete process.env.TEST_VAR_B
  })

  it('does not throw when all required variables are present', () => {
    process.env.TEST_VAR_A = 'value'

    expect(() => checkEnvVars(['TEST_VAR_A'], mockLog)).not.toThrow()
  })

  it('does not call errorLog when all required variables are present', () => {
    process.env.TEST_VAR_A = 'value'

    checkEnvVars(['TEST_VAR_A'], mockLog)

    expect(mockLog).not.toHaveBeenCalled()
  })

  it('does not throw when the required variables array is empty', () => {
    expect(() => checkEnvVars([], mockLog)).not.toThrow()
  })

  it('throws when a required variable is missing', () => {
    expect(() => checkEnvVars(['TEST_VAR_A'], mockLog)).toThrow(
      'Server could not be started required environment variables are missing'
    )
  })

  it('calls errorLog for a missing variable', () => {
    try {
      checkEnvVars(['TEST_VAR_A'], mockLog)
    } catch {}

    expect(mockLog).toHaveBeenCalledWith(
      'Required environment variable missing:',
      'TEST_VAR_A'
    )
  })

  it('calls errorLog once per missing variable', () => {
    try {
      checkEnvVars(['TEST_VAR_A', 'TEST_VAR_B'], mockLog)
    } catch {}

    expect(mockLog).toHaveBeenCalledTimes(2)
    expect(mockLog).toHaveBeenCalledWith(
      'Required environment variable missing:',
      'TEST_VAR_A'
    )
    expect(mockLog).toHaveBeenCalledWith(
      'Required environment variable missing:',
      'TEST_VAR_B'
    )
  })

  it('only logs and throws for variables that are missing, not those present', () => {
    process.env.TEST_VAR_A = 'value'

    try {
      checkEnvVars(['TEST_VAR_A', 'TEST_VAR_B'], mockLog)
    } catch {}

    expect(mockLog).toHaveBeenCalledTimes(1)
    expect(mockLog).toHaveBeenCalledWith(
      'Required environment variable missing:',
      'TEST_VAR_B'
    )
  })

  it('uses console.error as the default errorLog', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {})

    try {
      checkEnvVars(['TEST_VAR_A'])
    } catch {}

    expect(consoleSpy).toHaveBeenCalledWith(
      'Required environment variable missing:',
      'TEST_VAR_A'
    )

    consoleSpy.mockRestore()
  })
})

describe('checkForbiddenEnvVars', () => {
  let mockLog

  beforeEach(() => {
    mockLog = jest.fn()
  })

  afterEach(() => {
    delete process.env.TEST_FORBIDDEN_A
    delete process.env.TEST_FORBIDDEN_B
  })

  it('does not throw when no forbidden variables are set', () => {
    expect(() =>
      checkForbiddenEnvVars(
        [{ name: 'TEST_FORBIDDEN_A', forbiddenValue: 'true' }],
        mockLog
      )
    ).not.toThrow()
  })

  it('does not throw when a forbidden variable is set to a different value', () => {
    process.env.TEST_FORBIDDEN_A = 'false'

    expect(() =>
      checkForbiddenEnvVars(
        [{ name: 'TEST_FORBIDDEN_A', forbiddenValue: 'true' }],
        mockLog
      )
    ).not.toThrow()
  })

  it('does not throw when the forbidden variables array is empty', () => {
    expect(() => checkForbiddenEnvVars([], mockLog)).not.toThrow()
  })

  it('throws when a forbidden variable equals its disallowed value', () => {
    process.env.TEST_FORBIDDEN_A = 'true'

    expect(() =>
      checkForbiddenEnvVars(
        [{ name: 'TEST_FORBIDDEN_A', forbiddenValue: 'true' }],
        mockLog
      )
    ).toThrow(
      'Server could not be started because forbidden environment variables are set'
    )
  })

  it('calls errorLog for a violating variable', () => {
    process.env.TEST_FORBIDDEN_A = 'true'

    try {
      checkForbiddenEnvVars(
        [{ name: 'TEST_FORBIDDEN_A', forbiddenValue: 'true' }],
        mockLog
      )
    } catch {}

    expect(mockLog).toHaveBeenCalledWith(
      'Forbidden environment variable set:',
      'TEST_FORBIDDEN_A',
      "(must not be 'true')"
    )
  })

  it('calls errorLog once per violating variable', () => {
    process.env.TEST_FORBIDDEN_A = 'true'
    process.env.TEST_FORBIDDEN_B = 'true'

    try {
      checkForbiddenEnvVars(
        [
          { name: 'TEST_FORBIDDEN_A', forbiddenValue: 'true' },
          { name: 'TEST_FORBIDDEN_B', forbiddenValue: 'true' }
        ],
        mockLog
      )
    } catch {}

    expect(mockLog).toHaveBeenCalledTimes(2)
  })

  it('only logs and throws for variables that violate, not those that do not', () => {
    process.env.TEST_FORBIDDEN_A = 'true'
    process.env.TEST_FORBIDDEN_B = 'false'

    try {
      checkForbiddenEnvVars(
        [
          { name: 'TEST_FORBIDDEN_A', forbiddenValue: 'true' },
          { name: 'TEST_FORBIDDEN_B', forbiddenValue: 'true' }
        ],
        mockLog
      )
    } catch {}

    expect(mockLog).toHaveBeenCalledTimes(1)
    expect(mockLog).toHaveBeenCalledWith(
      'Forbidden environment variable set:',
      'TEST_FORBIDDEN_A',
      "(must not be 'true')"
    )
  })

  it('uses console.error as the default errorLog', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
    process.env.TEST_FORBIDDEN_A = 'true'

    try {
      checkForbiddenEnvVars([
        { name: 'TEST_FORBIDDEN_A', forbiddenValue: 'true' }
      ])
    } catch {}

    expect(consoleSpy).toHaveBeenCalledWith(
      'Forbidden environment variable set:',
      'TEST_FORBIDDEN_A',
      "(must not be 'true')"
    )

    consoleSpy.mockRestore()
  })
})
