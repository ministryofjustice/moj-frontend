const {
  COMPONENT_FORM_PAGES,
  COMPONENT_FORM_PAGES_OPTIONS
} = require('../config')

const camelToKebab = (str) =>
  str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()

const transformErrorsToErrorList = (errors) => {
  return errors.map((error) => ({
    text: error.message,
    href: `#${camelToKebab(error.path[0])}`
  }))
}

const nextPage = (url, body) => {
  const index = COMPONENT_FORM_PAGES.findIndex((page) => url.endsWith(page))
  const currentPage = COMPONENT_FORM_PAGES[index]

  // Check if there's an entry for this page in COMPONENT_FORM_PAGES_OPTIONS
  if (COMPONENT_FORM_PAGES_OPTIONS[currentPage]) {
    const fieldKey = Object.keys(COMPONENT_FORM_PAGES_OPTIONS[currentPage])[0] // Get the expected field from the body
    const fieldValue = body?.[fieldKey] // Extract the value from the body

    if (
      fieldValue &&
      COMPONENT_FORM_PAGES_OPTIONS[currentPage][fieldKey][fieldValue]
    ) {
      return COMPONENT_FORM_PAGES_OPTIONS[currentPage][fieldKey][fieldValue] // Return mapped page
    }
  }

  // Default behavior: return the next page in COMPONENT_FORM_PAGES
  if (index !== -1 && index < COMPONENT_FORM_PAGES.length - 1) {
    return COMPONENT_FORM_PAGES[index + 1]
  }

  return null
}

const setNextPage = (req, res, next) => {
  req.nextPage = nextPage(req.originalUrl, req?.body)
  next()
}

const validateFormData = (req, res, next) => {
  const schemaName = req.url.replace('/', '')
  const schema = require(`../schema/${schemaName}.schema`)
  const { error, value } = schema.validate(req.body, { abortEarly: false })

  console.log('body', req.body)

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
