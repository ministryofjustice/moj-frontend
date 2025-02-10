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

const nextPage = (url, body, subpage) => {
  const path = url.split('/')[1]
  const index = COMPONENT_FORM_PAGES.findIndex((page) => path.endsWith(page))
  const currentPage = COMPONENT_FORM_PAGES[index]

  if (subpage) {
    // Return same page but with the next subpage
    return `${currentPage}/${subpage}`
  }

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
  if (req?.session?.checkYourAnswers) {
    req.nextPage = '/check-your-answers'
  } else {
    const subpage = req?.query?.addAnother && req?.params?.subpage
    req.nextPage = nextPage(req.url, req?.body, subpage)
  }
  next()
}

const validateFormData = (req, res, next) => {
  const schemaName = req.url.split('/')[1]
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

  console.log('saved session', req.url)
  next()
}

const getFormDataFromSession = (req, res, next) => {
  console.log('getFormDataFromSession')
  req.formData = null
  const formData = req.session[req.url] || {}
  req.formData = formData
  next()
}

// Get the raw session text without images
const getRawSessionText = (req, res, next) => {
  const deepCloneAndRemoveBuffer = (obj) => {
    if (Array.isArray(obj)) {
      return obj.map(deepCloneAndRemoveBuffer)
    } else if (obj !== null && typeof obj === 'object') {
      return Object.keys(obj).reduce((acc, key) => {
        if (key === 'buffer') {
          console.log(`Removing buffer for field: ${obj.fieldname}`)
        } else {
          acc[key] = deepCloneAndRemoveBuffer(obj[key])
        }
        return acc
      }, {})
    }
    return obj
  }

  const clonedSession = deepCloneAndRemoveBuffer(req.session)
  delete clonedSession.cookie
  const sessionText = JSON.stringify(clonedSession, null, 2)
  console.log('Set raw session text')
  req.sessionText = sessionText
  next()
}

module.exports = {
  setNextPage,
  validateFormData,
  saveSession,
  getFormDataFromSession,
  getRawSessionText
}
