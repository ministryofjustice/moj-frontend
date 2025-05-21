const Joi = require('joi')

const maxWords = require('../helpers/max-words')

const addAnotherSchema = require('./add-another.schema')

const schema = addAnotherSchema.append({
  componentCodeLanguage: Joi.string()
    .required()
    .label('What language is the code written in?')
    .messages({
      'any.required': 'Select a code language from the list',
      'string.empty': 'Select a code language from the list'
    }),
  componentCodeLanguageOther: Joi.string()
    .label('Other code language')
    .when('componentCodeLanguage', {
      is: 'other',
      then: Joi.required().messages({
        'any.required': 'Enter the language the code is written in',
        'string.empty': 'Enter the language the code is written in'
      }),
      otherwise: Joi.optional().allow(null, '')
    }),
  componentCodeUsage: Joi.string()
    .optional()
    .allow(null, '')
    .custom((value, helpers) => maxWords(value, helpers, 250))
    .label('How do you use the code? (optional)')
    .messages({
      'custom.max.words': 'Enter 250 words or less'
    }),
  componentCode: Joi.string()
    .optional()
    .allow(null, '')
    .custom((value, helpers) => maxWords(value, helpers, 1000))
    .label('Add the code')
    .messages({
      'custom.max.words': 'Enter 10,000 characters or less'
    })
})

module.exports = schema
