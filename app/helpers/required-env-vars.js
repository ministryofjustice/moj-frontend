const testRequiredEnvVars = ['APP_URL']

const commonRequiredEnvVars = ['SESSION_SECRET', 'APP_URL']

const integrationRequiredEnvVars = [
  'GITHUB_API_TOKEN',
  'GITHUB_REPO_OWNER',
  'GITHUB_REPO_NAME',
  'NOTIFY_TOKEN'
]

const productionOnlyRequiredEnvVars = [
  'REDIS_URL',
  'REDIS_AUTH_TOKEN',
  'SENTRY_DSN',
  'VIRUS_SCAN_HOST'
]

// Environment variables that must never be set to their disallowed value in
// staging/production, e.g. dev-only bypass flags such as SKIP_VERIFICATION.
const productionForbiddenEnvVars = [
  { name: 'SKIP_VERIFICATION', forbiddenValue: 'true' }
]

const getRequiredEnvVars = (env = process.env.ENV || 'development') => {
  if (env === 'test') {
    return testRequiredEnvVars
  }

  if (env === 'staging' || env === 'production') {
    return [
      ...commonRequiredEnvVars,
      ...integrationRequiredEnvVars,
      ...productionOnlyRequiredEnvVars
    ]
  }

  return [...commonRequiredEnvVars, ...integrationRequiredEnvVars]
}

const getForbiddenEnvVars = (env = process.env.ENV || 'development') => {
  if (env === 'staging' || env === 'production') {
    return productionForbiddenEnvVars
  }

  return []
}

module.exports = {
  getRequiredEnvVars,
  getForbiddenEnvVars
}
