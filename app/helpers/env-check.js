/**
 * Check if required environment variables are set on server startup
 *
 * @param {string[]} requiredEnvVars - Environment variables that are required
 * @param {Function=} errorLog - Function used for logging error messages
 */
const checkEnvVars = (requiredEnvVars, errorLog = console.error) => {
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

module.exports = checkEnvVars
