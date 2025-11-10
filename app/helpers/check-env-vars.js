/**
 * Check if required environment variables are set on server startup
 *
 * @param {string[]} requiredEnvVars - Environment variables that are required
 * @param {Function=} errorLog - Function used for logging error messages
 */
const checkRequiredEnvVars = (requiredEnvVars, errorLog = console.error) => {
  const missingEnvVars = requiredEnvVars.filter(
    (envVar) => !Object.prototype.hasOwnProperty.call(process.env, envVar)
  )

  if (missingEnvVars.length > 0) {
    missingEnvVars.forEach((envVar) =>
      errorLog('Required environment variable missing:', envVar)
    )
    throw new Error(
      'Server could not be started required environment variables are missing'
    )
  }
}

/**
 * Check that dangerous/dev-only environment variables are not set to their
 * disallowed value on server startup (e.g. SKIP_VERIFICATION in production)
 *
 * @param {{name: string, forbiddenValue: string}[]} forbiddenEnvVars - Environment variables that must not equal their disallowed value
 * @param {Function=} errorLog - Function used for logging error messages
 */
const checkForbiddenEnvVars = (forbiddenEnvVars, errorLog = console.error) => {
  const violations = forbiddenEnvVars.filter(
    ({ name, forbiddenValue }) => process.env[name] === forbiddenValue
  )

  if (violations.length > 0) {
    violations.forEach(({ name, forbiddenValue }) =>
      errorLog(
        'Forbidden environment variable set:',
        name,
        `(must not be '${forbiddenValue}')`
      )
    )
    throw new Error(
      'Server could not be started because forbidden environment variables are set'
    )
  }
}

module.exports = { checkRequiredEnvVars, checkForbiddenEnvVars }
