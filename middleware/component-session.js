const { COMPONENT_FORM_PAGES } = require('../config')

const camelToKebab = (str) =>
  str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()

const transformErrorsToErrorList = (errors) => {
  return errors.map((error) => ({
    text: error.message,
    href: `#${camelToKebab(error.path[0])}`
  }))
}

const nextPage = (url) => {
  const index = COMPONENT_FORM_PAGES.findIndex((page) => url.endsWith(page))

  if (index !== -1 && index < COMPONENT_FORM_PAGES.length - 1) {
    return COMPONENT_FORM_PAGES[index + 1]
  }

  return null
}

const setNextPage = (req, res, next) => {
  req.nextPage = nextPage(req.originalUrl)
  next()
}

const validateFormData = (req, res, next) => {
  const schemaName = req.url.replace('/', '')
  const schema = require(`../schema/${schemaName}.schema`)
  const { error, value } = schema.validate(req.body, { abortEarly: false })

  if (error) {
    console.error('Validation error:', error.details)
    const formErrors = Object.keys(req.body).reduce((acc, key) => {
      acc[key] = null
      return acc
    }, {})

    error.details.forEach((error) => {
      const field = error.path[0]
      formErrors[field] = { text: error.message }
    })

    const errorList = transformErrorsToErrorList(error.details)

    res.status(400).render(`${req.params.page}`, {
      submitUrl: req.originalUrl,
      formData: req.body,
      formErrors,
      errorList
    })
  } else {
    console.log('Validation success:', value)
    next()
  }
}

const saveSession = (req, res, next) => {
  console.log('saveSession')
  if (!req.session) {
    req.session = {}
  }

  let body = req.body

  if (req.file) {
    const { fieldname } = req.file
    const file = {}
    file[fieldname] = req.file
    body = { ...body, ...file }
  }

  req.session[req.url] = body

  console.log('saved session', req.session)
  next()
}

const submitSession = (req, res) => {
  // generate a markup
  // create a zip of resources
  // send an email
}

module.exports = {
  setNextPage,
  validateFormData,
  saveSession
}
