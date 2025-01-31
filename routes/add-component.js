const express = require('express')
const multer = require('multer')
const {
  validateFormData,
  setNextPage,
  saveSession,
  getFormDataFromSession
} = require('../middleware/component-session')
const { pushToGitHub, createPullRequest } = require('../middleware/github-api')
const {
    sendSubmissionEmail,
    sendPrEmail
} = require('../middleware/notify-email')
const { generateMarkdown } = require('../middleware/generate-documentation')
const { COMPONENT_FORM_PAGES } = require('../config')
const ApplicationError = require('../helpers/application-error')
const upload = multer({ storage: multer.memoryStorage() })
const router = express.Router()
const checkYourAnswers = require('../helpers/check-your-answers')
const sessionData = require("../helpers/mockSessionData/sessionData.js");

const isValidComponentFormPage = (req, res, next) => {
  if (!COMPONENT_FORM_PAGES.includes(req.params.page)) {
    const error = new ApplicationError('Unknown page', 404)
    console.log(error.toErrorObject())
    next(error)
  } else {
    next()
  }
}

const checkYourAnswersPath = 'check-your-answers'

router.get('*', (req, res, next) => {
    if(req.session && req.url.endsWith(checkYourAnswersPath)) {
        req.session.checkYourAnswers = true
    }
    next();
})

// Check your answers page
router.get('/check-your-answers', (req, res) => {
  const {
    componentDetailsRows,
    accessibilityRows,
    prototypeRows,
    componentCodeRows,
    additionalInformationRows,
    yourDetailsRows
  } = checkYourAnswers(req.session)
    res.render('check-your-answers', {
    submitUrl: req.originalUrl,
    componentDetailsRows,
    accessibilityRows,
    prototypeRows,
    componentCodeRows,
    additionalInformationRows,
    yourDetailsRows
  })
})

if(process.env.DEV_DUMMY_DATA) {
    // Set dummy data for add component via session
    router.get("/component-details", (req, res, next) => {
        if (!req.session) {
          return next(new Error("Session not available"));
        }

        Object.assign(req.session, sessionData);

        req.session.save((err) => {
        if (err) {
            return next(err);
        }
        next();
        });
    });
}

// Start
router.get('/start', (req, res) => {
    res.render('start')
})

router.post('/start', (req, res) => {
    res.redirect('/get-involved/add-new-component/component-details')
})

// Confirmation page
router.get('/confirmation', (req, res) => {
    res.render('confirmation')
})

// Component form page
router.get('/:page', isValidComponentFormPage, getFormDataFromSession, (req, res) => {
  res.render(`${req.params.page}`, {
    submitUrl: req.originalUrl,
    formData: req?.formData
  })
})

// "Check Your Answers" form submission
router.post('/check-your-answers', async (req, res) => {
  const { filename: markdownFilename, content: markdownContent } =
    generateMarkdown(req.session)
  const markdown = {}
  markdown[markdownFilename] = markdownContent
  const sessionText = JSON.stringify(req.session, null, 2);
  await sendSubmissionEmail(null, markdownContent, sessionText)
  const session = { ...req.session, ...markdown }
  const branchName = await pushToGitHub(session)
  const title = 'test title'
  const description = 'test description'
  const pr = await createPullRequest(branchName, title, description)
  await sendPrEmail(pr)
    res.redirect('/get-involved/add-new-component/confirmation')
})

// Component image upload
router.post(
  '/component-image',
  upload.single('componentImage'),
  validateFormData,
  saveSession,
  setNextPage,
  (req, res, next) => {
    if (req.nextPage) {
      res.redirect(`/get-involved/add-new-component/${req.nextPage}`)
    } else {
      const error = new ApplicationError('Unknown page', 404)
      console.log(error.toErrorObject())
      next(error)
    }
  }
)

// Form submissions for pages
router.post(
  '/:page',
  isValidComponentFormPage,
  validateFormData,
  saveSession,
  setNextPage,
  (req, res, next) => {
    if (req.nextPage) {
      res.redirect(`/get-involved/add-new-component/${req.nextPage}`)
    } else {
      const error = new ApplicationError('Unknown page', 404)
      console.log(error.toErrorObject())
      next(error)
    }
  }
)

module.exports = router
