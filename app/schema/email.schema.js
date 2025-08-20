const Joi = require('joi')

const schema = Joi.object({
  emailAddress: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'string.email':
        'Enter an email address in the format: name@justice.gov.uk',
      'string.empty': 'Enter your email address',
      'any.required': 'Enter your email address'
    })
})

module.exports = schema
