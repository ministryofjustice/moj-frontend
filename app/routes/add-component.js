const crypto = require('crypto')
const fs = require('fs')

const express = require('express')
const multer = require('multer')

const {
  COMPONENT_FORM_PAGES,
  ADD_NEW_COMPONENT_ROUTE,
  MESSAGES,
  ENV
} = require('../config')
const ApplicationError = require('../helpers/application-error')
const { checkYourAnswers } = require('../helpers/check-your-answers')
const getPrTitleAndDescription = require('../helpers/get-pr-title-and-description')
const mockSessionData = require('../helpers/mockSessionData/sessionData.js')
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
  setCsrfToken,
  setSuccessMessage,
  xssComponentCode
} = require('../middleware/component-session')
const {
  pushToGitHub,
  createPullRequest,
  createReviewIssue
} = require('../middleware/github-api')
const {
  sendSubmissionEmail,
  sendPrEmail,
  sendVerificationEmail
} = require('../middleware/notify-email')
const {
  processPersonalData,
  processSubmissionData,
  processSubmissionFiles,
  buildComponentPage,
  generateSubmissionRef,
  getDetailsForPrEmail
} = require('../middleware/process-subission-data')
const verifyCsrf = require('../middleware/verify-csrf')
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB
})
const router = express.Router()
const checkYourAnswersPath = 'check-your-answers'

router.get('/error', (req, res, next) => {
  const error = new ApplicationError('ohno')
  next(error)
})

router.all('*', setCsrfToken)

// TODO:  Why is this a get * ? Can it not just be set in the get /checkYourAnswersPath route below?
router.get('*', (req, res, next) => {
  if (req?.session) {
    if (req?.url.endsWith(checkYourAnswersPath)) {
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
      page: {
        title: 'Check your answers'
      },
      submitUrl: req.originalUrl,
      sections,
      csrfToken: req?.session?.csrfToken,
      isDev: ENV === 'development',
      generateLink: `${ADD_NEW_COMPONENT_ROUTE}/generate-markdown`
    })
  }
)

/**
 * If we are in dev and the env var is set load data into the sesion to pre-fill the form
 * to speed up developemnt
 */
if (ENV === 'development' && process.env.DEV_DUMMY_DATA === 'true') {
  router.get('/component-details', (req, res, next) => {
    if (!req.session) {
      return next(new Error('Session not available'))
    }

    if (!req.session.checkYourAnswers) {
      Object.assign(req.session, mockSessionData)
      req.session.save((err) => {
        if (err) {
          return next(err)
        }
        next()
      })
    }
  })
}

/**
 * This adds a route for development to process and build the generated component markdown
 * locally and add it directly into the project for immediate preview - allowing
 * faster review without needing to generate a PR
 */
if (ENV === 'development') {
  router.get(
    '/generate-markdown',
    (req, res, next) => {
      if (!req.session) {
        return next(new Error('Session not available'))
      }

      if (!req.session.checkYourAnswers) {
        Object.assign(req.session, mockSessionData)
        req.session.save((err) => {
          if (err) {
            return next(err)
          }
        })
      }
      next()
    },
    processPersonalData,
    generateSubmissionRef,
    async (req, res, next) => {
      req.submissionFiles = await processSubmissionFiles(req)
      next()
    },
    buildComponentPage,
    async (req, res) => {
      const { markdownFilename: filename, markdownContent: content } = req
      fs.writeFile(`docs/components/${filename}`, content, (err) => {
        if (err) {
          console.error(err)
        } else {
          // file written successfully
          setTimeout(() => {
            res.redirect(
              `/components/${filename.split('.').at(0).toLowerCase()}`
            )
          }, 2000)
        }
      })
    }
  )
}

// Start
router.get('/start', (req, res) => {
  delete req.session.checkYourAnswers
  req.session.started = true
  res.render('start', {
    page: {
      title: 'Before you start'
    },
    csrfToken: req?.session?.csrfToken
  })
})

// Confirmation page
router.get('/confirmation', (req, res) => {
  res.render('confirmation', {
    title: 'Component submitted'
  })
})

/**
 * Email verifiaction
 * Compare the token from the url to the token in session in order to verify the
 * user has clicked the link in their email
 */
router.get('/email/verify/:token', (req, res) => {
  // Allow for the e2e tests to bypass this process as the token can't be kept
  // in session, and there is no way to click a link in the email
  if (ENV === 'test' && process.env.VERIFICATION_TOKEN && req?.session) {
    req.session.emailToken = process.env.VERIFICATION_TOKEN
  }

  if (!req?.session?.emailToken) {
    // Session has expired or there is no session
    res.redirect(`${ADD_NEW_COMPONENT_ROUTE}/email-session-expired`)
  } else {
    if (req.params.token === req.session.emailToken) {
      // Successfully verified
      req.session.verified = true
      req.session.sessionFlash = MESSAGES.emailVerificationSuccess
      res.redirect(`${ADD_NEW_COMPONENT_ROUTE}/component-details`)
    } else {
      // Token doesn't match - invalid
      res.redirect(`${ADD_NEW_COMPONENT_ROUTE}/email-invalid-token`)
    }
  }
})

router.get('/email-session-expired', (req, res) => {
  res.render('email-session-expired', {
    page: {
      title: 'Your confirmation link did not work'
    },
    resetUrl: `${ADD_NEW_COMPONENT_ROUTE}/email?reset=true`
  })
})

router.get('/email-invalid-token', (req, res) => {
  res.render('email-invalid-token', {
    page: {
      title: 'Your confirmation link was not recognised'
    },
    resetUrl: `${ADD_NEW_COMPONENT_ROUTE}/email?reset=true`
  })
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
  res.redirect(`${ADD_NEW_COMPONENT_ROUTE}/email`)
})

router.post(
  '/email',
  verifyCsrf,
  validateFormData,
  checkEmailDomain,
  (req, res, next) => {
    if (req.emailDomainAllowed) {
      saveSession(req, res, next)
    } else {
      // Pass email in query so it isn't saved in the session
      const emailAddress = req?.body?.emailAddress
      res.redirect(
        `${ADD_NEW_COMPONENT_ROUTE}/email/not-allowed?emailAddress=${encodeURIComponent(emailAddress)}`
      )
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
      // If configured, skip the email and auto-verify
      console.log(ENV)
      console.log(process.env.SKIP_VERIFICATION)
      console.log(process.env.DEV_VERIFIED_EMAIL)
      if (
        (ENV === 'development' || ENV === 'test') &&
        process.env.SKIP_VERIFICATION === 'true' &&
        process.env.DEV_VERIFIED_EMAIL
      ) {
        req.session['/email'] = { emailAddress: process.env.DEV_VERIFIED_EMAIL }
        req.session.emailDomainAllowed = true
        req.session.verified = true

        res.redirect(`${ADD_NEW_COMPONENT_ROUTE}/component-details`)
      } else {
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
  }
)

router.get('/email/check', (req, res) => {
  res.render('email-check', {
    page: {
      title: 'Check your email account',
      email: req?.session?.['/email']?.emailAddress
    },
    resendUrl: `${ADD_NEW_COMPONENT_ROUTE}/email/resend`,
    resetUrl: `${ADD_NEW_COMPONENT_ROUTE}/email?reset=true`
  })
})

router.get('/email/resend', (req, res) => {
  res.render('email-resend', {
    submitUrl: req.originalUrl,
    csrfToken: req?.session?.csrfToken,
    page: {
      title: 'Resending a confirmation email',
      email: req?.session?.['/email']?.emailAddress
    },
    resendUrl: `${ADD_NEW_COMPONENT_ROUTE}/email/resend`
  })
})

router.post('/email/resend', verifyCsrf, async (req, res, next) => {
  res.redirect(`${ADD_NEW_COMPONENT_ROUTE}/email/check`)
  const token = req?.session?.emailToken
  const email = req?.session?.['/email']?.emailAddress
  if (token && email) {
    try {
      await sendVerificationEmail(email, token)
    } catch (error) {
      console.error(`Error sending verification email: ${error}`)
      next(error)
    }
  }
})

router.get('/email/not-allowed', (req, res) => {
  res.render('email-not-allowed', {
    page: {
      title: 'You did not enter an MoJ email address',
      email: req.query?.emailAddress
    },
    resetUrl: `${ADD_NEW_COMPONENT_ROUTE}/email?reset=true`
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
        page: {
          title: 'Are you sure you want to remove this information?'
        },
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
    let redirectUrl = `${ADD_NEW_COMPONENT_ROUTE}/${req.page}`
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
    res.render(`${req.page}`, {
      page: COMPONENT_FORM_PAGES[req.page],
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
  getDetailsForPrEmail,
  processPersonalData,
  generateSubmissionRef,
  async (req, res, next) => {
    req.submissionFiles = await processSubmissionFiles(req)
    next()
  },
  buildComponentPage,
  processSubmissionData,
  async (req, res) => {
    // Extracts details from request that we'll need after the redirect
    const {
      session,
      sessionText,
      submissionData,
      submissionRef,
      markdownContent,
      detailsForPrEmail
    } = req

    req.session.regenerate((err) => {
      if (err) {
        console.error('Error regenerating session:', err)
      }
      res.redirect(`${ADD_NEW_COMPONENT_ROUTE}/confirmation`)
    })

    try {
      const branchName = await pushToGitHub(submissionData, submissionRef)
      const { title, description } = getPrTitleAndDescription(session)
      const pr = await createPullRequest(branchName, title, description)
      const issue = await createReviewIssue(pr, detailsForPrEmail)
      await sendPrEmail(pr, issue, detailsForPrEmail)
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
  verifyCsrf,
  saveFileToRedis,
  canAddAnother,
  validateFormDataFileUpload,
  getBackLink,
  validateFormData,
  (req, res, next) => {
    if (req.file) {
      req.session.sessionFlash = MESSAGES.componentImageUploaded(
        req.file.originalname
      )
      saveSession(req, res, next)
    } else {
      // Skipping saving as no new file uploaded
      next()
    }
  },
  setNextPage,
  (req, res, next) => {
    if (req.file) {
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
  xssComponentCode,
  verifyCsrf,
  validatePageParams,
  getBackLink,
  canAddAnother,
  validateFormData,
  saveSession,
  setNextPage,
  setSuccessMessage,
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
