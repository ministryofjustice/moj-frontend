const crypto = require('crypto')

const express = require('express')
const multer = require('multer')

const { COMPONENT_FORM_PAGES, ADD_NEW_COMPONENT_ROUTE } = require('../config')
const ApplicationError = require('../helpers/application-error')
const checkYourAnswers = require('../helpers/check-your-answers')
const sessionData = require('../helpers/mockSessionData/sessionData.js')
const { urlToTitleCase } = require('../helpers/text-helper')
const {
  validateFormData,
  setNextPage,
  saveSession,
  getFormDataFromSession,
  getRawSessionText,
  canSkipQuestion,
  canAddAnother,
  getBackLink,
  getFormSummaryListForRemove,
  removeFromSession,
  sessionStarted
} = require('../middleware/component-session')
const { generateMarkdown } = require('../middleware/generate-documentation')
const { pushToGitHub, createPullRequest } = require('../middleware/github-api')
const {
  sendSubmissionEmail,
  sendPrEmail
} = require('../middleware/notify-email')
const verifyCsrf = require('../middleware/verify-csrf')
const upload = multer({ storage: multer.memoryStorage() })
const router = express.Router()

const isValidComponentFormPage = (req, res, next) => {
  if (!Object.keys(COMPONENT_FORM_PAGES).includes(req.params.page)) {
    const error = new ApplicationError('Unknown page', 404)
    console.log(error.toErrorObject())
    next(error)
  } else {
    next()
  }
}

const checkYourAnswersPath = 'check-your-answers'

const setCsrfToken = (req, res, next) => {
  if (req?.session) {
    if (!req?.session?.csrfToken) {
      // Set CSRF token
      req.session.csrfToken = crypto.randomBytes(32).toString("hex");
    }
  }
  next()
}

router.all('*', setCsrfToken)

router.get('*', (req, res, next) => {
  if(req?.session) {
    if (req?.url.endsWith(checkYourAnswersPath)) {
      // Indicate that we've been on the check your answers page
      req.session.checkYourAnswers = true
    }
  }
  next()
})

// Check your answers page
router.get(`/${checkYourAnswersPath}`, sessionStarted, (req, res) => {
  const {
    componentDetailsRows,
    accessibilityRows,
    prototypeRows,
    componentCodeRows,
    addExternalAuditRows,
    addInternalAuditRows,
    addAssistiveTechRows,
    yourDetailsRows,
    figmaRows,
  } = checkYourAnswers(req.session)
  res.render(checkYourAnswersPath, {
    submitUrl: req.originalUrl,
    componentDetailsRows,
    accessibilityRows,
    prototypeRows,
    componentCodeRows,
    addExternalAuditRows,
    addInternalAuditRows,
    addAssistiveTechRows,
    yourDetailsRows,
    figmaRows,
    csrfToken: req?.session?.csrfToken
  })
})

if (process.env.DEV_DUMMY_DATA) {
  // Set dummy data for add component via session
  router.get('/component-details', (req, res, next) => {
    if (!req.session) {
      return next(new Error('Session not available'))
    }

    Object.assign(req.session, sessionData)

    req.session.save((err) => {
      if (err) {
        return next(err)
      }
      next()
    })
  })
}

// Start
router.get('/start', (req, res) => {
  delete req.session.checkYourAnswers
  req.session.started = true
  console.log('Start session')
  res.render('start', {
    csrfToken: req?.session?.csrfToken
  })
})

router.post('/start', verifyCsrf, (req, res) => {
  res.redirect('/get-involved/add-new-component/component-details')
})

// Confirmation page
router.get('/confirmation', (req, res) => {
  res.render('confirmation')
})

// Check that we have a session in progress
router.all('*', sessionStarted )

// Remove form page
router.get(
  ['/remove/:page', '/remove/:page/:subpage'],
  isValidComponentFormPage,
  getFormSummaryListForRemove,
  (req, res) => {
    const summary = req?.removeSummaryRows
    const type = urlToTitleCase(req?.params?.page || '')

    if(!req?.params?.page || !summary) {
      res.redirect(`${ADD_NEW_COMPONENT_ROUTE}/${checkYourAnswersPath}`)
    } else {
      res.render('remove', {
        submitUrl: req.originalUrl,
        formData: req?.formData,
        backLink: `${ADD_NEW_COMPONENT_ROUTE}/${checkYourAnswersPath}`,
        type,
        summary,
        deleteText: `Delete ${type}`,
        csrfToken: req?.session?.csrfToken
      })
    }
  }
)

router.post(
  ['/remove/:page', '/remove/:page/:subpage'],
  verifyCsrf,
  removeFromSession,
  (req, res ) => {
    res.redirect(`${ADD_NEW_COMPONENT_ROUTE}/${checkYourAnswersPath}`)
  })

// Component form page
router.get(
  ['/:page', '/:page/:subpage'],
  isValidComponentFormPage,
  getFormDataFromSession,
  setNextPage,
  canAddAnother,
  canSkipQuestion,
  getBackLink,
  (req, res) => {
    res.render(`${req.params.page}`, {
      submitUrl: req.originalUrl,
      formData: req?.formData,
      addAnother: req?.addAnother,
      showAddAnother: req?.showAddAnother,
      skipQuestion: req?.skipQuestion || false,
      backLink: req?.backLink || false,
      csrfToken: req?.session?.csrfToken
    })
  }
)

// "Check Your Answers" form submission
router.post(`/${checkYourAnswersPath}`, verifyCsrf, getRawSessionText, async (req, res) => {
  const { filename: markdownFilename, content: markdownContent } =
    generateMarkdown(req.session)
  const markdown = {}
  markdown[markdownFilename] = markdownContent
  const { sessionText } = req
  await sendSubmissionEmail(null, sessionText, markdownContent)
  const session = { ...req.session, ...markdown }
  req.session.regenerate((err) => {
    if (err) {
      console.error('Error regenerating session:', err)
    }
    res.redirect(`${ADD_NEW_COMPONENT_ROUTE}/confirmation`)
  })
  const branchName = await pushToGitHub(session)
  const title = 'test title'
  const description = 'test description'
  const pr = await createPullRequest(branchName, title, description)
  await sendPrEmail(pr)
})

// Component image upload
router.post(
  '/component-image',
  upload.single('componentImage'),
  verifyCsrf,
  validateFormData,
  saveSession,
  setNextPage,
  getBackLink,
  (req, res, next) => {
    if (req.nextPage) {
      res.redirect(`${ADD_NEW_COMPONENT_ROUTE}/${req.nextPage}`)
    } else {
      const error = new ApplicationError('Unknown page', 404)
      console.log(error.toErrorObject())
      next(error)
    }
  }
)

// Accessibility file upload
router.post(
  ['/add-internal-audit', '/add-external-audit', '/add-assistive-tech'],
  upload.single('accessibilityReport')
)

// Form submissions for pages
router.post(
  ['/:page', '/:page/:subpage'],
  isValidComponentFormPage,
  setNextPage,
  canSkipQuestion,
  getBackLink,
  verifyCsrf,
  validateFormData,
  saveSession,
  (req, res, next) => {
    if (req?.nextPage) {
      res.redirect(`${ADD_NEW_COMPONENT_ROUTE}/${req.nextPage}`)
    } else {
      const error = new ApplicationError('Unknown page', 404)
      console.log(error.toErrorObject())
      next(error)
    }
  }
)

module.exports = router
