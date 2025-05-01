const { NotifyClient } = require('notifications-node-client')

const {
  NOTIFY_TOKEN,
  NOTIFY_PR_TEMPLATE,
  NOTIFY_SUBMISSION_TEMPLATE,
  NOTIFY_EMAIL,
  NOTIFY_EMAIL_RETRY_MS,
  NOTIFY_EMAIL_MAX_RETRIES
} = require('../config')
const notifyClient = new NotifyClient(NOTIFY_TOKEN)

const emailAddress = NOTIFY_EMAIL

const sendEmail = async (
  templateId,
  prLink = null,
  previewLink = null,
  fileBuffer = null,
  markdown = null,
  retries = NOTIFY_EMAIL_MAX_RETRIES,
  backoff = NOTIFY_EMAIL_RETRY_MS
) => {
  const personalisation = {}

  if (prLink) {
    personalisation.pr_link = prLink
  }
  if (previewLink) {
    personalisation.preview_link = previewLink
  }

  if (fileBuffer) {
    personalisation.link_to_file = notifyClient.prepareUpload(fileBuffer)
  }

  if (markdown) {
    personalisation.markdown = markdown
  }

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      console.log(
        `Sending email to ${emailAddress} using template ${templateId}, attempt ${attempt}`
      )
      const response = await notifyClient.sendEmail(templateId, emailAddress, {
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
  return sendEmail(NOTIFY_SUBMISSION_TEMPLATE, null, null, fileBuffer, markdown)
}

const sendPrEmail = async ({ url, number }) => {
  const previewUrl = `https://moj-frontend-pr-${number}.apps.live.cloud-platform.service.justice.gov.uk`
  return sendEmail(NOTIFY_PR_TEMPLATE, url, previewUrl)
}

const handleEmailError = (error) => {
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
  sendSubmissionEmail,
  sendPrEmail
}
