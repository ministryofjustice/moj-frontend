const { getRequiredEnvVars } = require('./required-env-vars')

describe('getRequiredEnvVars', () => {
  it('returns minimum required variables for test', () => {
    expect(getRequiredEnvVars('test')).toStrictEqual(['APP_URL'])
  })

  it('returns development requirements without production-only variables', () => {
    expect(getRequiredEnvVars('development')).toStrictEqual([
      'SESSION_SECRET',
      'APP_URL',
      'GITHUB_API_TOKEN',
      'GITHUB_REPO_OWNER',
      'GITHUB_REPO_NAME',
      'NOTIFY_TOKEN'
    ])
  })

  it('returns full requirements for staging', () => {
    expect(getRequiredEnvVars('staging')).toStrictEqual([
      'SESSION_SECRET',
      'APP_URL',
      'GITHUB_API_TOKEN',
      'GITHUB_REPO_OWNER',
      'GITHUB_REPO_NAME',
      'NOTIFY_TOKEN',
      'REDIS_URL',
      'REDIS_AUTH_TOKEN',
      'SENTRY_DSN',
      'VIRUS_SCAN_HOST'
    ])
  })

  it('returns full requirements for production', () => {
    expect(getRequiredEnvVars('production')).toStrictEqual([
      'SESSION_SECRET',
      'APP_URL',
      'GITHUB_API_TOKEN',
      'GITHUB_REPO_OWNER',
      'GITHUB_REPO_NAME',
      'NOTIFY_TOKEN',
      'REDIS_URL',
      'REDIS_AUTH_TOKEN',
      'SENTRY_DSN',
      'VIRUS_SCAN_HOST'
    ])
  })

  it('falls back to development requirements for unrecognised env values', () => {
    expect(getRequiredEnvVars('preview')).toStrictEqual([
      'SESSION_SECRET',
      'APP_URL',
      'GITHUB_API_TOKEN',
      'GITHUB_REPO_OWNER',
      'GITHUB_REPO_NAME',
      'NOTIFY_TOKEN'
    ])
  })
})
