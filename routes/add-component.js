const express = require('express')
const multer = require('multer')
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
  removeFromSession
} = require('../middleware/component-session')
const { pushToGitHub, createPullRequest } = require('../middleware/github-api')
const {
  sendSubmissionEmail,
  sendPrEmail
} = require('../middleware/notify-email')
const { generateMarkdown } = require('../middleware/generate-documentation')
const { COMPONENT_FORM_PAGES, ADD_NEW_COMPONENT_ROUTE } = require('../config')
const ApplicationError = require('../helpers/application-error')
const upload = multer({ storage: multer.memoryStorage() })
const router = express.Router()
const checkYourAnswers = require('../helpers/check-your-answers')
const sessionData = require('../helpers/mockSessionData/sessionData.js')
const { urlToTitleCase } = require('../helpers/text-helper')

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

router.get('*', (req, res, next) => {
  if (req.session && req.url.endsWith(checkYourAnswersPath)) {
    req.session.checkYourAnswers = true
  }
  next()
})

// Check your answers page
router.get(`/${checkYourAnswersPath}`, (req, res) => {
  const {
    componentDetailsRows,
    accessibilityRows,
    prototypeRows,
    componentCodeRows,
    addExternalAuditRows,
    addInternalAuditRows,
    addAssistiveTechRows,
    yourDetailsRows
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
    yourDetailsRows
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
  res.render('start')
})

router.post('/start', (req, res) => {
  res.redirect('/get-involved/add-new-component/component-details')
})

// Confirmation page
router.get('/confirmation', (req, res) => {
  res.render('confirmation')
})

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
        deleteText: `Delete ${type}`
      })
    }
  }
)

router.post(
  ['/remove/:page', '/remove/:page/:subpage'],
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
      backLink: req?.backLink || false
    })
  }
)

// "Check Your Answers" form submission
router.post('/check-your-answers', getRawSessionText, async (req, res) => {
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
  validateFormData,
  saveSession,
  // setNextPage,
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
  validateFormData,
  saveSession,
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

module.exports = router
