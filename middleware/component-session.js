const crypto = require('crypto')

const { sanitize } = require('express-xss-sanitizer')
const sanitizeFilename = require('sanitize-filename')

const {
  MAX_ADD_ANOTHER: maxAddAnother,
  ADD_NEW_COMPONENT_ROUTE,
  ALLOWED_EMAIL_DOMAINS: allowedDomains,
  COMPONENT_FORM_PAGES: formPages,
  MESSAGES,
  HTML_SANITIZATION_OPTIONS
} = require('../config')
const ApplicationError = require('../helpers/application-error')
const { getAnswersForSection } = require('../helpers/check-your-answers')
const extractBody = require('../helpers/extract-body')
const getCurrentFormPages = require('../helpers/form-pages')
const { getNextPage, getPreviousPage } = require('../helpers/page-navigation')
const redis = require('../helpers/redis-client')

const camelToKebab = (str) =>
  str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()

// Function to hash req.url
const getHashedUrl = (url) => {
  return crypto.createHash('sha256').update(url).digest('hex')
}

const getTemplate = (req) => {
  let template = sanitizeFilename(
    `${req.params.page || req.path.replace('/', '')}`
  )
  if (!Object.keys(formPages).includes(template)) {
    template = 'error'
  }
  return template
}

const getPageData = (req) => {
  let pageData = sanitizeFilename(
    `${req.params.page || req.path.replace('/', '')}`
  )
  if (!Object.keys(formPages).includes(pageData)) {
    pageData = {}
  }
  return formPages[pageData]
}

const checkEmailDomain = (req, res, next) => {
  let allowed = false
  const email = req?.body?.emailAddress
  console.log({ email })
  if (email) {
    const domain = email.split('@').at(-1)
    console.log({ domain })
    if (allowedDomains.includes(domain)) {
      allowed = true
    }
  }
  console.log({ allowed })
  req.emailDomainAllowed = allowed
  next()
}

const transformErrorsToErrorList = (errors) => {
  return errors.map((error) => ({
    text: error.message,
    href: `#${camelToKebab(error.path[0])}`
  }))
}

const setCurrentFormPages = (req, res, next) => {
  const { url, session } = req
  req.formPages = getCurrentFormPages(url, session)
  next()
}

const setNextPage = (req, res, next) => {
  console.log('setting nextPage')
  const amendingAnswers = req?.session?.checkYourAnswers
  const addingAnother = req?.body?.addAnother !== undefined

  const { url, session } = req
  const nextPage = getNextPage(url, session, addingAnother, amendingAnswers)

  console.log(nextPage)

  if (amendingAnswers && !nextPage && !addingAnother) {
    req.nextPage = 'check-your-answers'
    if (req.method === 'POST') {
      delete req.session.checkYourAnswers
    }
  } else {
    req.nextPage = nextPage
  }
  next()
}

const setSuccessMessage = (req, res, next) => {
  const addingAnother = req?.body?.addAnother !== undefined
  const page = req.path.split('/').at(1)
  const number = req.path.split('/').at(2) || 1

  if (addingAnother && page === 'component-code-details') {
    console.log('adding a success message to the session flash')
    req.session.sessionFlash = MESSAGES.componentCodeAdded(number)
  }

  next()
}

const clearSkippedPageData = (req, res, next) => {
  console.log('clearing data for skipped pages')
  const requiredPages = getCurrentFormPages(req.session).map((page) => {
    return page.startsWith('/') ? page : `/${page}`
  })

  console.log(requiredPages)
  // Delete page and subpage data
  for (const sessionPage of Object.keys(req.session)) {
    if (
      ![
        'started',
        'cookie',
        'csrfToken',
        'checkYourAnswers',
        'emailToken',
        'emailDomainAllowed',
        'verified',
        'sessionFlash'
      ].includes(sessionPage)
    ) {
      console.log(sessionPage)
      const parentPage = `/${sessionPage.split('/')[1]}`
      console.log(`checking${parentPage}`)
      if (!requiredPages.includes(parentPage)) {
        console.log(`clearing data for ${sessionPage}`)
        // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
        delete req.session[sessionPage]
      }
    }
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

/**
 * If code is JS or other, we cannot sanitize it as it will then be incorrect
 */
const xssComponentCode = (req, res, next) => {
  if (req.body.componentCodeLanguage) {
    if (
      req.body.componentCodeLanguage !== 'javascript' &&
      req.body.componentCodeLanguage !== 'other'
    ) {
      req.body.componentCode = sanitize(
        req.body.componentCode,
        HTML_SANITIZATION_OPTIONS
      )
    }
  }
  next()
}

const validateFormData = (req, res, next) => {
  console.log('validate form data')
  const schemaName = req.path.split('/').at(1)
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
  console.log('saving session')
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
  console.log(req.url)
  console.log(req.path)
  req.session[req.path] = { ...req.session[req.path], ...body }
  delete req.session[req.path].addAnother

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
  const sectionKey = url.slice(1).split('/').at(0)
  delete req.removeSummaryRows
  if (formData) {
    req.removeSummaryRows = getAnswersForSection(sectionKey, formData, false)
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
  console.log('getting back link')
  const { url, session } = req
  if (session?.checkYourAnswers) {
    console.log('cya is true')
    req.backLink = 'check-your-answers'
  } else {
    req.backLink = getPreviousPage(url, session)
  }
  next()
}

const removeFromSession = (req, res, next) => {
  const url = req.url.replace(/\/(remove|change)/, '')

  if (req.params.page === 'component-image') {
    const filename = req.session[url]?.componentImage?.originalname
    console.log(filename)
    if (filename) {
      req.session.sessionFlash = MESSAGES.componentImageRemoved(filename)
    }
  }

  // If there are conditions for this page we need to set the conditional
  // question answer to 'no' to prevent the user being prompted to refill in
  // the answers
  const sectionKey = url.slice(1).split('/')[0]
  const conditions = formPages[sectionKey]?.conditions
  if (conditions) {
    Object.entries(conditions).forEach(([key, value]) => {
      if (typeof value === 'object') {
        Object.entries(value).forEach(([questionKey, _]) => {
          if (req.session[key]?.[questionKey] === 'yes') {
            req.session[key][questionKey] = 'no'
          }
        })
      }
    })
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

const sessionVerified = (req, res, next) => {
  if (!req?.session?.verified) {
    console.error('No verified email for session')
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

const validatePageParams = (req, res, next) => {
  const validPages = Object.keys(formPages)
  let valid = true

  if (req.params.page) {
    // if page is present it must be in allowlist of configured pages
    valid = validPages.includes(req.params.page)
  }

  if (req.params.subpage) {
    // if subpage is present it must always be a number
    valid = /^\d+$/.test(req.params.subpage)
  }

  if (valid) {
    next()
  } else {
    const error = new ApplicationError('Page not found', 404)
    next(error)
  }
}

const setCsrfToken = (req, res, next) => {
  if (req?.session) {
    if (!req?.session?.csrfToken) {
      req.session.csrfToken = crypto.randomBytes(32).toString('hex')
    }
  }
  next()
}

module.exports = {
  setNextPage,
  setCurrentFormPages,
  validateFormData,
  saveSession,
  getFormDataFromSession,
  getRawSessionText,
  canAddAnother,
  getBackLink,
  getFormSummaryListForRemove,
  removeFromSession,
  sessionStarted,
  sessionVerified,
  validateFormDataFileUpload,
  validateComponentImagePage,
  saveFileToRedis,
  clearSkippedPageData,
  checkEmailDomain,
  validatePageParams,
  setCsrfToken,
  xssComponentCode,
  setSuccessMessage
}
