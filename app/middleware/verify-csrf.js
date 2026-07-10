const getCsrfTokens = (req) => {
  const tokens = [req?.query?._csrf, req?.body?._csrf].filter(
    (token) => typeof token === 'string' && token.length > 0
  )
  return [...new Set(tokens)]
}

const verifyCsrf = (req, res, next) => {
  const sessionToken = req?.session?.csrfToken
  const submittedTokens = getCsrfTokens(req)

  if (!sessionToken || !submittedTokens.includes(sessionToken)) {
    const error = new Error('Invalid CSRF token')
    error.status = 403
    console.error(error.message)
    return next(error)
  }

  next()
}

module.exports = verifyCsrf
