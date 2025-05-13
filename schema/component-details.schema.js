const Joi = require('joi')

const maxWords = require('../helpers/max-words')

const schema = Joi.object({
  componentName: Joi.string()
    .pattern(/^[A-Za-z\s\-']+$/, 'letters')
    .max(26)
    .required()
    .messages({
      'any.required': 'Enter the name of the component',
      'string.pattern.name':
        'The component name must only include letters a to z, and special characters such as hyphens, spaces and apostrophes',
      'string.empty': 'Enter the name of the component',
      'string.max': 'Enter 26 characters or less for the component name'
    }),
  componentOverview: Joi.string()
    .required()
    .custom((value, helpers) => maxWords(value, helpers, 250))
    .messages({
      'any.required': 'Enter a description of the component',
      'string.empty': 'Enter a description of the component',
      'custom.max.words': 'Enter 250 words or less for the description'
    }),
  howIsTheComponentUsed: Joi.string()
    .required()
    .custom((value, helpers) => maxWords(value, helpers, 250))
    .messages({
      'any.required': 'Enter an answer for how the component is being used',
      'string.empty': 'Enter an answer for how the component is being used',
      'custom.max.words':
        'Enter 250 words or less for how the component is being used'
    })
})

module.exports = schema
