const checkEnvVars = require('./check-env-vars')

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
