const { NotifyClient } = require('notifications-node-client')

const {
  NOTIFY_TOKEN,
  NOTIFY_PR_TEMPLATE,
  NOTIFY_SUBMISSION_TEMPLATE,
  NOTIFY_EMAIL
} = require('../config')
const notifyClient = new NotifyClient(NOTIFY_TOKEN)

const emailAddress = NOTIFY_EMAIL

const sendEmail = async (
  templateId,
  link = null,
  fileBuffer = null,
  markdown = null
) => {
  const personalisation = link ? { link } : {}

  if (fileBuffer) {
    personalisation.link_to_file = notifyClient.prepareUpload(fileBuffer)
  }

  if (markdown) {
    personalisation.markdown = markdown
  }

  try {
    console.log(`Sending email to ${emailAddress} using template ${templateId}`)
    const response = await notifyClient.sendEmail(templateId, emailAddress, {
      personalisation
    })
    console.log('Email sent successfully.')
  } catch (error) {
    handleEmailError(error)
    throw error
  }
}

const sendSubmissionEmail = async (
  link = null,
  fileBuffer = null,
  markdown = null
) => {
  return sendEmail(NOTIFY_SUBMISSION_TEMPLATE, link, fileBuffer, markdown)
}

const sendPrEmail = async (link = null) => {
  return sendEmail(NOTIFY_PR_TEMPLATE, link)
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
