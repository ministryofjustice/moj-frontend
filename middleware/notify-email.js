const { NotifyClient } = require('notifications-node-client');
const {
  NOTIFY_TOKEN,
  NOTIFY_TEMPLATE,
  NOTIFY_EMAIL,
} = require('../config');
const notifyClient = new NotifyClient(NOTIFY_TOKEN);

const templateId = NOTIFY_TEMPLATE;
const emailAddress = NOTIFY_EMAIL;

const sendEmail = async (link = null) => {
  const personalisation = link ? { link } : {};

  try {
    console.log(`Sending email to ${emailAddress} using template ${templateId}`);
    const response = await notifyClient.sendEmail(templateId, emailAddress, { personalisation });
    console.log('Email sent successfully:', response);
  } catch (error) {
    handleEmailError(error);
    throw error;
  }
};

const handleEmailError = (error) => {
  if (error.response) {
    console.error('Error status:', error.response.status);
    console.error('Error data:', error.response.data);
    console.error('Error headers:', error.response.headers);
  } else if (error.request) {
    console.error('No response received:', error.request);
  } else {
    console.error('Error message:', error.message);
  }
  console.error('Error configuration:', error.config);
};

module.exports = sendEmail;
