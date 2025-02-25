const Joi = require('joi')

const schema = Joi.object({
  fullName: Joi.string()
    .required()
    .messages({
      'string.empty': 'Enter your full name',
      'any.required': 'Enter your full name'
    })
    .label('Full Name'),
  emailAddress: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'string.email': 'Enter an email address in the correct format, like name@example.com',
      'string.empty': 'Enter your email address',
      'any.required': 'Enter your email address'
    })
    .label('Email Address'),
  teamName: Joi.string()
    .required()
    .messages({
      'string.empty': 'Enter the team name you worked for when creating the component',
      'any.required': 'Enter the team name you worked for when creating the component'
    })
    .label('What team did you work in when creating the component?'),
  shareYourDetails: Joi.array()
    .allow(null, '')
})

module.exports = schema
