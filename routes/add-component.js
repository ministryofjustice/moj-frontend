const crypto = require('crypto')

const express = require('express')
const { xss } = require('express-xss-sanitizer')
const multer = require('multer')

const {
  COMPONENT_FORM_PAGES,
  ADD_NEW_COMPONENT_ROUTE,
  MESSAGES
} = require('../config')
const ApplicationError = require('../helpers/application-error')
const { checkYourAnswers } = require('../helpers/check-your-answers')
const getPrTitleAndDescription = require('../helpers/get-pr-title-and-description')
const sessionData = require('../helpers/mockSessionData/sessionData.js')
const { urlToTitleCase } = require('../helpers/text-helper')
const {
  validateFormData,
  setNextPage,
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
  saveFileToRedis,
  clearSkippedPageData,
  checkEmailDomain,
  validatePageParams,
  setCsrfToken
} = require('../middleware/component-session')
const { generateMarkdown } = require('../middleware/generate-documentation')
const { pushToGitHub, createPullRequest } = require('../middleware/github-api')
const {
  sendSubmissionEmail,
  sendPrEmail,
  sendVerificationEmail
} = require('../middleware/notify-email')
const {
  processSubmissionData,
  processSubmissionFiles
} = require('../middleware/process-subission-data')
const verifyCsrf = require('../middleware/verify-csrf')
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB
})
const router = express.Router()
const checkYourAnswersPath = 'check-your-answers'

router.get('/error', (req,res, next) => {
  const error = new ApplicationError('ohno')
  next(error)
})

router.all('*', setCsrfToken)

// TODO:  Why is this a get * ? Can it not just be set in the get /checkYourAnswersPath route below?
router.get('*', (req, res, next) => {
  console.log('setting cya visited')
  if (req?.session) {
    if (req?.url.endsWith(checkYourAnswersPath)) {
      console.log('visited checkYourAnswersPath')
      // Indicate that we've been on the check your answers page
      req.session.checkYourAnswers = true
    }
  }
  next()
})

// Check your answers page
router.get(
  `/${checkYourAnswersPath}`,
  sessionStarted,
  getBackLink,
  (req, res) => {
    const sections = checkYourAnswers(req.session)
    res.render(checkYourAnswersPath, {
      submitUrl: req.originalUrl,
      sections,
      csrfToken: req?.session?.csrfToken
    })
  }
)

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
  console.log('get start')

  delete req.session.checkYourAnswers
  req.session.started = true
  console.log('Start session')
  res.render('start', {
    title: 'Submit a component',
    csrfToken: req?.session?.csrfToken
  })
  console.log('after render')
})

// Confirmation page
router.get('/confirmation', (req, res) => {
  res.render('confirmation', {
    title: 'Component submitted'
  })
})

router.get('/email/verify/:token', (req, res) => {
  if (!req?.session?.emailToken) {
    // session expired
    req.session.sessionFlash = MESSAGES.emailVerificationExpired
    res.redirect(`${ADD_NEW_COMPONENT_ROUTE}/email`)
  } else {
    if (req.params.token === req.session.emailToken) {
      // verified
      req.session.verified = true
      req.session.sessionFlash = MESSAGES.emailVerificationSuccess
      res.redirect(`${ADD_NEW_COMPONENT_ROUTE}/component-details`)
    } else {
      // token invalid
      req.session.sessionFlash = MESSAGES.emailVerificationInvalidToken
      res.redirect(`${ADD_NEW_COMPONENT_ROUTE}/email`)
    }
  }
})

router.get('/email', (req, res) => {
  req.session.started = true

  if (req.query.reset === 'true') {
    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
    delete req.session['/email']
    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
    delete req.session.emailToken
  }

  res.render('email', {
    page: COMPONENT_FORM_PAGES.email,
    submitUrl: req.originalUrl,
    csrfToken: req?.session?.csrfToken
  })
})

// For all following routed we must have a session in progress
router.all('*', sessionStarted)

router.post('/start', verifyCsrf, (req, res) => {
  if(process.env.SKIP_VERIFICATION === 'true' && process.env.DEV_VERIFIED_EMAIL) {
    req.session['/email'] = { emailAddress: process.env.DEV_VERIFIED_EMAIL}
    req.session.emailDomainAllowed = true
    req.session.verified = true
    res.redirect(`${ADD_NEW_COMPONENT_ROUTE}/component-details`)
  } else {
    res.redirect(`${ADD_NEW_COMPONENT_ROUTE}/email`)
  }
})

router.post(
  '/email',
  xss(),
  verifyCsrf,
  validateFormData,
  checkEmailDomain,
  (req, res, next) => {
    if (req.emailDomainAllowed) {
      saveSession(req, res, next)
    } else {
      res.redirect(`${ADD_NEW_COMPONENT_ROUTE}/email/not-allowed`)
    }
  },
  // generate token
  (req, res, next) => {
    req.session.emailToken = crypto.randomBytes(32).toString('hex')
    next()
  },
  // send email
  async (req, res) => {
    if (req.emailDomainAllowed) {
      res.redirect(`${ADD_NEW_COMPONENT_ROUTE}/email/check`)
      const token = req?.session?.emailToken
      const email = req?.session?.['/email']?.emailAddress
      if (token && email) {
        try {
          await sendVerificationEmail(email, token)
        } catch (error) {
          console.error(`Error sending verification email: ${error}`)
        }
      }
    }
  }
)

router.get('/email/check', (req, res) => {
  res.render('email-check', {
    page: {
      title: 'Check your email',
      email: req?.session?.['/email']?.emailAddress
    }
  })
})

router.get('/email/resend', (req, res) => {
  res.render('email-resend', {
    submitUrl: req.originalUrl,
    csrfToken: req?.session?.csrfToken,
    page: {
      title: 'If you’re having problems with the email',
      email: req?.session?.['/email']?.emailAddress
    }
  })
})

router.post('/email/resend', xss(), verifyCsrf, async (req, res) => {
    res.redirect(`${ADD_NEW_COMPONENT_ROUTE}/email/check`)
    const token = req?.session?.emailToken
    const email = req?.session?.['/email']?.emailAddress
    if (token && email) {
      try {
        await sendVerificationEmail(email, token)
      } catch (error) {
          console.error(`Error sending verification email: ${error}`)
      }
    }
})

router.get('/email/not-allowed', (req, res) => {
  res.render('email-not-allowed', {
    page: {
      title: 'You cannot submit a component'
    }
  })
})

// For all following routed we must have verified an email address
router.all('*', sessionVerified)

// Remove form page
router.get(
  ['/remove/:page', '/remove/:page/:subpage'],
  validatePageParams,
  getFormSummaryListForRemove,
  (req, res) => {
    const summaryRows = req?.removeSummaryRows
    const type = urlToTitleCase(req?.params?.page || '')

    if (!req?.params?.page || !summaryRows) {
      res.redirect(`${ADD_NEW_COMPONENT_ROUTE}/${checkYourAnswersPath}`)
    } else {
      res.render('remove', {
        submitUrl: req.originalUrl,
        formData: req?.formData,
        backLink: `${ADD_NEW_COMPONENT_ROUTE}/${checkYourAnswersPath}`,
        type,
        summaryRows,
        csrfToken: req?.session?.csrfToken
      })
    }
  }
)

router.get(
  ['/change/:page', '/change/:page/:subpage'],
  validatePageParams,
  removeFromSession,
  (req, res) => {
    let redirectUrl = `${ADD_NEW_COMPONENT_ROUTE}/${req.params.page}`
    if (req.params.subpage) {
      const subpage = parseInt(req.params.subpage)
      if (subpage > 1) {
        redirectUrl += `/${subpage - 1}`
      }
    }
    res.redirect(redirectUrl)
  }
)

router.post(
  ['/remove/:page', '/remove/:page/:subpage'],
  xss(),
  verifyCsrf,
  validatePageParams,
  removeFromSession,
  (req, res) => {
    res.redirect(`${ADD_NEW_COMPONENT_ROUTE}/${checkYourAnswersPath}`)
  }
)

// Component form page
router.get(
  ['/:page', '/:page/:subpage'],
  validatePageParams,
  getFormDataFromSession,
  canAddAnother,
  getBackLink,
  (req, res) => {
    console.log('get page/subpage')
    console.log(`CYA: ${req?.session?.checkYourAnswers}`)
    res.render(`${req.params.page}`, {
      page: COMPONENT_FORM_PAGES[req.params.page],
      submitUrl: req.originalUrl,
      sessionFlash: res.locals.sessionFlash,
      formData: req?.formData,
      addAnother: req?.addAnother,
      showAddAnother: req?.showAddAnother,
      backLink: req?.backLink || false,
      csrfToken: req?.session?.csrfToken,
      changeUrl: `${ADD_NEW_COMPONENT_ROUTE}/change/${req.params.page}${req.params.subpage ? `/${req.params.subpage}` : ''}`
    })
  }
)

// "Check Your Answers" form submission
router.post(
  `/${checkYourAnswersPath}`,
  verifyCsrf,
  getRawSessionText,
  async (req, res) => {
    const submissionRef = `submission-${Date.now()}`
    const submissionFiles = await processSubmissionFiles(
      req.session,
      submissionRef
    )
    // console.log(submissionFiles)
    const { filename: markdownFilename, content: markdownContent } =
      generateMarkdown(req.session, submissionFiles)
    const markdown = {}
    markdown[markdownFilename] = markdownContent
    const { sessionText } = req
    const session = { ...req.session, ...markdown }
    const sessionData = processSubmissionData(
      session,
      submissionFiles,
      submissionRef
    )

    req.session.regenerate((err) => {
      if (err) {
        console.error('Error regenerating session:', err)
      }
      res.redirect(`${ADD_NEW_COMPONENT_ROUTE}/confirmation`)
    })

    try {
      const branchName = await pushToGitHub(sessionData, submissionRef)
      const { title, description } = getPrTitleAndDescription(session)
      const pr = await createPullRequest(branchName, title, description)
      await sendPrEmail(pr)
    } catch (error) {
      console.error('[FORM SUBMISSION] Error sending submission:', error)
      await sendSubmissionEmail(sessionText, markdownContent)
    }
  }
)

// Component image upload
router.post(
  ['/component-image', '/component-image/:subpage'],
  validatePageParams,
  upload.single('componentImage'),
  xss(),
  verifyCsrf,
  saveFileToRedis,
  canAddAnother,
  validateFormDataFileUpload,
  getBackLink,
  validateFormData,
  (req, res, next) => {
    if (req.file) {
      req.session.sessionFlash = MESSAGES.componentImageUploaded(req.file.originalname)
      saveSession(req, res, next)
    } else {
      // Skipping saving as no new file uploaded
      next()
    }
  },
  setNextPage,
  (req, res, next) => {
    if (req.file) {
      // console.log(req.file)
      // return to same page after upload
      res.redirect(`${ADD_NEW_COMPONENT_ROUTE}${req.url}`)
    }
    if (req.nextPage) {
      res.redirect(`${req.nextPage}`)
    } else {
      const error = new ApplicationError('Unknown page', 404)
      console.log(error.toErrorObject())
      next(error)
    }
  }
)

// Form submissions for pages
router.post(
  ['/:page', '/:page/:subpage'],
  xss(),
  verifyCsrf,
  validatePageParams,
  getBackLink,
  validateFormData,
  saveSession,
  setNextPage,
  clearSkippedPageData,
  (req, res, next) => {
    if (req?.nextPage) {
      res.redirect(`${req.nextPage}`)
    } else {
      const error = new ApplicationError('Page not found', 404)
      next(error)
    }
  }
)

module.exports = router
