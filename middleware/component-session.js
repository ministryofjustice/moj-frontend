const {
  MAX_ADD_ANOTHER: maxAddAnother,
  ADD_NEW_COMPONENT_ROUTE
} = require('../config')
const extractBody = require('../helpers/extract-body')
const nextPage = require('../helpers/next-page')
const previousPage = require('../helpers/previous-page')
const { formatLabel } = require('../helpers/text-helper')

const camelToKebab = (str) =>
  str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()

const transformErrorsToErrorList = (errors) => {
  return errors.map((error) => ({
    text: error.message,
    href: `#${camelToKebab(error.path[0])}`
  }))
}

const setNextPage = (req, res, next) => {
  const addAnother = req?.body?.addAnother !== undefined
  if (req?.session?.checkYourAnswers && !addAnother) {
    req.nextPage = 'check-your-answers'
    if (req.method === 'POST') {
      delete req.session.checkYourAnswers
    }
  } else {
    let subpage = null
    if (addAnother) {
      subpage = req?.params?.subpage
        ? Number.parseInt(req?.params?.subpage) + 1
        : 1
    }
    const { url, session, body } = req
    req.nextPage = nextPage(url, session, body, subpage)
  }
  next()
}

const errorTemplateVariables = (
  req,
  formErrors,
  errorList,
  formErrorStyles = null
) => {
  return {
    submitUrl: req.originalUrl,
    formData: req.body,
    formErrorStyles,
    formErrors,
    errorList,
    backLink: req?.backLink || false,
    addAnother: req?.params?.subpage || 1,
    showAddAnother: 'addAnother' in (req.body || {}),
    skipQuestion: req?.skipQuestion || false,
    csrfToken: req?.session?.csrfToken
  }
}

const validateFormDataFileUpload = (err, req, res, next) => {
  if (err.code === 'LIMIT_FILE_SIZE') {
    const errorMessage = 'The selected file must be smaller than 10MB'
    const formErrors = {}
    formErrors[err.field] = { text: errorMessage }
    const errors = [{ message: errorMessage, path: [err.field] }]
    const errorList = transformErrorsToErrorList(errors)
    res
      .status(400)
      .render(
        `${req.params.page || req.url.replace('/', '')}`,
        errorTemplateVariables(req, formErrors, errorList)
      )
  } else {
    next()
  }
}

const validateFormData = (req, res, next) => {
  const schemaName = req.url.split('/')[1]
  const schema = require(`../schema/${schemaName}.schema`)
  const body = extractBody(req?.url, { ...req.body })
  delete body._csrf
  const { error } = schema.validate(body, { abortEarly: false })
  const dateFields = ['auditDate', 'testingDate']

  if (error) {
    console.error('Validation error:', error.details)

    const formErrorStyles = {}

    const formErrors = Object.keys(body).reduce((acc, key) => {
      acc[key] = null
      return acc
    }, {})

    error.details.forEach((error) => {
      let field = error.path[0]
      if (dateFields.includes(field.split('-')[0])) {
        formErrorStyles[field] = 'govuk-input--error'
        field = field.split('-')[0]
      }
      if (!formErrors[field]) {
        // Just add the first error for a field
        formErrors[field] = { text: error.message }
      }
    })

    const errorList = transformErrorsToErrorList(error.details)
    res
      .status(400)
      .render(
        `${req.params.page}`,
        errorTemplateVariables(req, formErrors, errorList, formErrorStyles)
      )
  } else {
    next()
  }
}

const saveSession = (req, res, next) => {
  if (!req.session) {
    req.session = {}
  }

  let { _csrf, ...body } = req.body

  if (req.file) {
    const { fieldname } = req.file
    const file = {}
    file[fieldname] = req.file
    body = { ...body, ...file }
  }

  req.session[req.url] = { ...body }
  delete req.session[req.url].addAnother

  console.log('saved session', req.url)
  next()
}

const getFormDataFromSession = (req, res, next) => {
  req.formData = null
  req.formData = req.session[req.url] || {}
  next()
}

const getFormSummaryListForRemove = (req, res, next) => {
  const url = req.url.replace('/remove', '')
  const formData = req.session[url]
  delete req.removeSummaryRows
  if (formData) {
    req.removeSummaryRows = Object.entries(formData).map(([key, value]) => ({
      key: { text: formatLabel(key) },
      value: { text: value }
    }))
  }
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

// Check if can skip question and set value to page to skip to
const canSkipQuestion = (req, res, next) => {
  const skipPage = req?.nextPage
  req.skipQuestion = skipPage || false
  next()
}

// Determine if can add another copy of the form
const canAddAnother = (req, res, next) => {
  const addAnotherCount = req?.params?.subpage
    ? 1 + Number.parseInt(req.params.subpage)
    : 1
  const addAnother =
    addAnotherCount > maxAddAnother ? maxAddAnother : addAnotherCount
  const showAddAnother = addAnotherCount <= maxAddAnother
  req.addAnother = addAnother
  req.showAddAnother = showAddAnother
  next()
}

const getBackLink = (req, res, next) => {
  const { url, session, formData } = req
  if (session?.checkYourAnswers) {
    req.backLink = 'check-your-answers'
  } else {
    req.backLink = previousPage(url, session, { ...formData })
  }
  next()
}

const removeFromSession = (req, res, next) => {
  const url = req.url.replace('/remove', '')
  // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
  delete req.session[url]
  next()
}

const sessionStarted = (req, res, next) => {
  if (!req?.session?.started) {
    console.error('No session available')
    return res.redirect(`${ADD_NEW_COMPONENT_ROUTE}/start`)
  }
  next()
}

module.exports = {
  setNextPage,
  validateFormData,
  saveSession,
  getFormDataFromSession,
  getRawSessionText,
  canSkipQuestion,
  canAddAnother,
  getBackLink,
  getFormSummaryListForRemove,
  removeFromSession,
  sessionStarted,
  validateFormDataFileUpload
}
