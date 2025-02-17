const {
  COMPONENT_FORM_PAGES,
  COMPONENT_FORM_PAGES_OPTIONS
} = require('../config')

const maxAddAnother = 10

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
  const addAnother = req?.body?.addAnother
  if (req?.session?.checkYourAnswers && !addAnother) {
    req.nextPage = 'check-your-answers'
    delete req.session.checkYourAnswers
  } else {
    let subpage = null
    if(addAnother) {
      subpage = req?.params?.subpage ? parseInt(req?.params?.subpage) + 1 : 1
    }
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
      errorList,
      addAnother: req?.params?.subpage || 1,
      showAddAnother: !!req?.body?.addAnother,//!!req?.params?.subpage,
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

// Check if can skip question and set value to page to skip to
const canSkipQuestion = (req, res, next) => {
  console.error('canSkipQuestion',req.url)
  const skipPage = nextPage(req.url)
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
  if(req.session.checkYourAnswers) {
    req.backLink = 'check-your-answers'
    return next()
  }
  const path = req.url.split('/')[1]
  const index = COMPONENT_FORM_PAGES.findIndex((page) => path.endsWith(page))

  if (index > 0) {
    req.backLink = COMPONENT_FORM_PAGES[index - 1]
    //todo multipage logic
  } else {
    req.backLink = false
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
  getBackLink
}
