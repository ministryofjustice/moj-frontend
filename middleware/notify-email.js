const { NotifyClient } = require('notifications-node-client');

const notifyClient = new NotifyClient(process.env.NOTIFY_TOKEN);

const templateId = process.env.NOTIFY_TEMPLATE;

const emailAddress = process.env.NOTIFY_EMAIL;

const personalisation = {
  name: 'John Doe',
  linkText: 'View PR',
  link: 'https://example.com',
};

async function sendEmail(link = null) {
  try {
    console.log(templateId,emailAddress);
    if(link){
      personalisation.link = link;
    }
    const response = await notifyClient.sendEmail(templateId, emailAddress, { personalisation });
    console.log('Email sent successfully:', response);
  } catch (error) {
    if (error.response) {
      console.error('Error status:', error.response.status);
      console.error('Error data:', error.response.data);
      console.error('Error headers:', error.response.headers);
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Error message:', error.message);
    }

    console.error('Error configuration:', error.config); // Optional: Log request configuration
    }
}

module.exports = sendEmail;
