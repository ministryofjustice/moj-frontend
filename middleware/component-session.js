const crypto = require('crypto')

const {
  MAX_ADD_ANOTHER: maxAddAnother,
  ADD_NEW_COMPONENT_ROUTE,
  COMPONENT_FORM_PAGES
} = require('../config')
const ApplicationError = require('../helpers/application-error')
const extractBody = require('../helpers/extract-body')
const nextPage = require('../helpers/next-page')
const previousPage = require('../helpers/previous-page')
const redis = require('../helpers/redis-client')
const { humanReadableLabel } = require('../helpers/text-helper')

const camelToKebab = (str) =>
  str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()

// Function to hash req.url
const getHashedUrl = (url) => {
  return crypto.createHash('sha256').update(url).digest('hex')
}

const getTemplate = (req) => {
  let template = `${req.params.page || req.url.replace('/', '')}`
  if (!Object.keys(COMPONENT_FORM_PAGES).includes(template)) {
    template = 'error'
  }
  return template
}

const getPageData = (req) => {
  let pageData = `${req.params.page || req.url.replace('/', '')}`
  if (!Object.keys(COMPONENT_FORM_PAGES).includes(pageData)) {
    pageData = {}
  }
  return pageData
}

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
    page: getPageData(req),
    submitUrl: req.originalUrl,
    formData: req.body,
    file: req?.file,
    formErrorStyles,
    formErrors,
    errorList,
    backLink: req?.backLink || false,
    addAnother: req?.params?.subpage || 1,
    showAddAnother: req?.showAddAnother || 'addAnother' in (req.body || {}),
    skipQuestion: req?.skipQuestion || false,
    csrfToken: req?.session?.csrfToken
  }
}

const validateFormDataFileUpload = (err, req, res, next) => {
  console.log('validate form data file uplaod')
  if (err.code === 'LIMIT_FILE_SIZE') {
    const errorMessage = 'The selected file must be smaller than 10MB'
    const formErrors = {}
    formErrors[err.field] = { text: errorMessage }
    const errors = [{ message: errorMessage, path: [err.field] }]
    const errorList = transformErrorsToErrorList(errors)
    const template = getTemplate(req)
    res
      .status(400)
      .render(template, errorTemplateVariables(req, formErrors, errorList))
  } else {
    next()
  }
}

const validateFormData = (req, res, next) => {
  console.log('validate form data')
  const schemaName = req.url.split('/')[1]
  const schema = require(`../schema/${schemaName}.schema`)
  const body = extractBody(req?.url, { ...req.body })
  delete body._csrf
  console.log(req?.file?.fieldname)
  console.log(req?.file?.originalname)
  if (req?.file?.fieldname && req?.file?.originalname) {
    console.log('theres a file!')
    body[req.file.fieldname] = req.file.originalname
  }
  const { error } = schema.validate(body, { abortEarly: false })
  const dateFields = ['auditDate', 'testingDate']

  if (error) {
    console.error('Validation error:', error.details)

    const formErrorStyles = {}

    const formErrors = Object.keys(body).reduce((acc, key) => {
      acc[key] = null
      return acc
    }, {})

    const errorListDetails = []

    error.details.forEach((error) => {
      let field = error.path[0]
      if (dateFields.includes(field.split('-')[0])) {
        formErrorStyles[field] = 'govuk-input--error'
        field = field.split('-')[0]
      }
      if (!formErrors[field]) {
        // Just add the first error for a field
        formErrors[field] = { text: error.message }
        errorListDetails.push(error)
      }
    })

    const errorList = transformErrorsToErrorList(errorListDetails)
    const template = getTemplate(req)
    res
      .status(400)
      .render(
        template,
        errorTemplateVariables(req, formErrors, errorList, formErrorStyles)
      )
  } else {
    next()
  }
}

const saveSession = (req, res, next) => {
  if (!req.session) req.session = {}

  const { _csrf, ...body } = req.body

  if (req.file) {
    // Generate a hash of the req.url
    const urlHash = getHashedUrl(req.url)
    const redisKey = `file:${urlHash}:${req.sessionID}:${req.file.fieldname}`

    if (redisKey) {
      body[req.file.fieldname] = {
        originalname: req.file.originalname,
        redisKey
      } // Use the Redis key reference
    }
  }

  // prevent prototype pollution
  if (
    req.url === '__proto__' ||
    req.url === 'constructor' ||
    req.url === 'prototype'
  ) {
    res.end(403)
    return
  }

  req.session[req.url] = { ...req.session[req.url], ...body }
  delete req.session[req.url].addAnother

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
      key: { text: humanReadableLabel(key) },
      value: { text: value?.originalname || value }
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
  const url = req.url.replace(/\/(remove|change)/, '')

  if (req.params.page === 'component-image') {
    const filename = req.session[url]?.componentImage?.originalname
    console.log(filename)
    if (filename) {
      req.session.sessionFlash = {
        type: 'success',
        message: `File ‘${filename}’ removed.`
      }
    }
  }
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

const validateComponentImagePage = (req, res, next) => {
  if (req.params.page !== 'component-image') {
    const error = new ApplicationError('Invalid page', 400)
    console.log(error.toErrorObject())
    return next(error)
  }
  next()
}

const saveFileToRedis = async (req, res, next) => {
  if (req.file) {
    const { buffer, originalname, mimetype } = req.file

    const urlHash = getHashedUrl(req.url)
    const redisKey = `file:${urlHash}:${req.sessionID}:${req.file.fieldname}` // Generate Redis key

    try {
      // Save file in Redis with a 24-hour expiry
      await redis.set(
        redisKey,
        JSON.stringify({
          buffer: buffer.toString('base64'),
          originalname,
          mimetype
        }),
        'EX',
        24 * 60 * 60
      )

      // Save Redis key in session
      req.session[req.file.fieldname] = redisKey

      console.log(`[Redis] File saved with key: ${redisKey}`)
    } catch (err) {
      console.error(`[Redis] Error saving file: ${err.message}`)
      return res.status(500).send('Failed to process file.')
    }
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
  validateFormDataFileUpload,
  validateComponentImagePage,
  saveFileToRedis
}
