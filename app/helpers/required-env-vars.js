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
  'SENTRY_DSN'
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

module.exports = {
  getRequiredEnvVars
}
