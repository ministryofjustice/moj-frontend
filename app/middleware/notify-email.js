const { NotifyClient } = require('notifications-node-client')

const {
  NOTIFY_TOKEN,
  NOTIFY_PR_TEMPLATE,
  NOTIFY_SUBMISSION_TEMPLATE,
  NOTIFY_SUCCESS_TEMPLATE,
  NOTIFY_VERIFICATION_TEMPLATE,
  NOTIFY_EMAIL,
  NOTIFY_EMAIL_RETRY_MS,
  NOTIFY_EMAIL_MAX_RETRIES,
  APP_URL
} = require('../config')
const { urlize } = require( '../helpers/text-helper')
const notifyClient = new NotifyClient(NOTIFY_TOKEN)

const dsTeamEmail = NOTIFY_EMAIL

const sendEmail = async (
  templateId,
  email,
  personalisation = {},
  retries = NOTIFY_EMAIL_MAX_RETRIES,
  backoff = NOTIFY_EMAIL_RETRY_MS
) => {
  // if (process.env.ENV === 'development') return Promise.resolve(true)
  // if (process.env.ENV === 'test') return Promise.resolve(false)
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      console.log(
        `Sending email to ${email} using template ${templateId}, attempt ${attempt}`
      )
      const response = await notifyClient.sendEmail(templateId, email, {
        personalisation
      })
      console.log('Email sent successfully.')
      return response
    } catch (error) {
      handleEmailError(error)
      if (attempt < retries) {
        console.log(`Retrying in ${backoff}ms...`)
        await new Promise((resolve) => setTimeout(resolve, backoff))
        backoff *= 2 // Exponential backoff
      } else {
        console.error('All retry attempts failed.')
        throw error
      }
    }
  }
}

const sendSubmissionEmail = async (fileBuffer = null, markdown = null) => {
  const personalisation = {}

  if (fileBuffer) {
    personalisation.link_to_file = notifyClient.prepareUpload(fileBuffer)
  }

  if (markdown) {
    personalisation.markdown = markdown
  }

  return sendEmail(NOTIFY_SUBMISSION_TEMPLATE, dsTeamEmail, personalisation)
}

const sendPrEmail = async (pr, issue, contactDetails) => {
  const { url: prUrl, number: prNumber } = pr
  const { url: issueUrl } = issue
  const { componentName, email, name, team } = contactDetails
  const personalisation = {}
  const componentSlug = `components/${urlize(componentName)}`

  if (prUrl) {
    personalisation.pr_link = prUrl
  }
  if (prNumber) {
    personalisation.preview_link = `https://moj-frontend-pr-${prNumber}.apps.live.cloud-platform.service.justice.gov.uk/${componentSlug}`
  }
  if (issueUrl) {
    personalisation.issue_link = issueUrl
  }
  if (componentName) {
    personalisation.component_name = componentName
  }
  if (email) {
    personalisation.email = email
  }
  if (name) {
    personalisation.name = name
  }
  if (team) {
    personalisation.team = team
  }

  return sendEmail(NOTIFY_PR_TEMPLATE, dsTeamEmail, personalisation)
}

const sendSuccessEmail = async (contactDetails) => {
  const { componentName, email, name } = contactDetails
  const personalisation = {}

  if (componentName) {
    personalisation.component_name = componentName
  }
  if (email) {
    personalisation.email = email
  }
  if (name) {
    personalisation.name = name.split(' ').at(0) || 'contributor'
  }

  return sendEmail(NOTIFY_SUCCESS_TEMPLATE, email, personalisation)
}

const sendVerificationEmail = async (email, token) => {
  const personalisation = {}
  personalisation.token_link = `${APP_URL}/contribute/add-new-component/email/verify/${token}`
  return sendEmail(NOTIFY_VERIFICATION_TEMPLATE, email, personalisation)
}

const handleEmailError = (error) => {
  console.error(error)
  if (error.response) {
    console.error('Error status:', error.response.status)
    console.error('Error data:', error.response.data)
    console.error('Error headers:', error.response.headers)
  } else if (error.request) {
    console.error('No response received:', error.request)
  } else {
    console.error('Error message:', error.message)
  }
  console.error('Error configuration:', error.config)
}

module.exports = {
  sendPrEmail,
  sendSubmissionEmail,
  sendSuccessEmail,
  sendVerificationEmail
}
