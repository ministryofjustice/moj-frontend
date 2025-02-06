const Joi = require('joi')

const schema = Joi.object({
  fullName: Joi.string().label('Full Name'),
  emailAddress: Joi.string().label('Email Address'),
  shareYourDetails: Joi.alternatives()
    .try(Joi.string(), Joi.array().items(Joi.string()))
    .required()
    .label('Share your details')
  // addNameAndEmailToComponentPage: Joi.string().label(
  //   'Add my name and email address to the component page'
  // ),
  // onlyShareNameAndEmailWhenRequested: Joi.string().label(
  //   'Only share my name and email address when requested by the other users'
  // ),
  // doNotSharePersonalDetails: Joi.string().label(
  //   'Do not share my personal details with anyone'
  // )
})

module.exports = schema
