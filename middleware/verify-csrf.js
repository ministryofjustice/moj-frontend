const verifyCsrf = (req, res, next) => {
  if (req.session.csrfToken !== req.body._csrf) {
    const errorMessage = 'Invalid CSRF token'
    console.error(errorMessage)
    return next(errorMessage)
  }
  next()
}

module.exports = verifyCsrf
