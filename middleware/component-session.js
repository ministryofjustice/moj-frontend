const { MAX_ADD_ANOTHER: maxAddAnother } = require('../config')
const extractBody = require('../helpers/extract-body')
const {checkYourAnswers} = require("../helpers/mockSessionData/sessionData");
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
  const addAnother = req?.body?.addAnother
  if (req?.session?.checkYourAnswers && !addAnother) {
    req.nextPage = 'check-your-answers'
    if(req.method === 'POST') {
      delete req.session.checkYourAnswers
    }
  } else {
    let subpage = null
    if(addAnother) {
      subpage = req?.params?.subpage ? parseInt(req?.params?.subpage) + 1 : 1
    }
    const { url, session, body } = req
    req.nextPage = nextPage(url, session, body, subpage)
  }
  next()
}

const validateFormData = (req, res, next) => {
  const schemaName = req.url.split('/')[1]
  const schema = require(`../schema/${schemaName}.schema`)
  const body = extractBody(req?.url,{...req.body})
  const { error, value } = schema.validate(body, { abortEarly: false })
  const dateFields = ['auditDate']

  if (error) {
    console.error('Validation error:', error.details)

    const formErrorStyles = {}

    const formErrors = Object.keys(body).reduce((acc, key) => {
      acc[key] = null
      return acc
    }, {})

    error.details.forEach((error) => {
      let field = error.path[0]
      if(dateFields.includes(field.split('-')[0])) {
        formErrorStyles[field] = 'govuk-input--error'
        field = field.split('-')[0]
      }
      if(!formErrors[field]) {
        // Just add the first error for a field
        formErrors[field] = { text: error.message }
      }
    })

    const errorList = transformErrorsToErrorList(error.details)

    res.status(400).render(`${req.params.page}`, {
      submitUrl: req.originalUrl,
      formData: req.body,
      formErrorStyles,
      formErrors,
      errorList,
      backLink: req?.backLink || false,
      addAnother: req?.params?.subpage || 1,
      showAddAnother: !!req?.body?.addAnother,
      skipQuestion: req?.skipQuestion || false
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

  req.session[req.url] = {...body}
  delete req.session[req.url].addAnother

  console.log('saved session', req.url)
  next()
}

const getFormDataFromSession = (req, res, next) => {
  req.formData = null
  req.formData = req.session[req.url] || {}
  next()
}

const getFormSummaryListForRemove = ( req, res, next ) => {
  const url = req.url.replace('/remove','')
  const formData = req.session[url]
  delete req.removeSummaryRows
  if(formData) {
    req.removeSummaryRows = Object.entries(formData).map(([key, value]) => ({
      key: { text: formatLabel(key) },
      value: { text: value }
    }));
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
    ? 1 + parseInt(req.params.subpage)
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
  if(session?.checkYourAnswers) {
    req.backLink = 'check-your-answers'
  } else {
    req.backLink = previousPage(url, session, {...formData})
  }
  next()
}

const removeFromSession = (req, res, next) => {
  const url = req.url.replace('/remove','')
  delete req.session[url]
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
  removeFromSession
}
