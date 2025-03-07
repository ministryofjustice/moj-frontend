const Joi = require('joi')

const maxWords = require('../helpers/max-words')

const addAnotherSchema = require('./add-another.schema')

const schema = addAnotherSchema.append({
  componentCodeLanguage: Joi.string()
    .required()
    .label('What language is the code written in?')
    .messages({
      'any.required': 'Enter the name of the language the code is written in',
      'string.empty': 'Enter the name of the language the code is written in'
    }),
  componentCodeUsage: Joi.string()
    .optional()
    .allow(null, '')
    .custom((value, helpers) => maxWords(value, helpers, 250))
    .label('How do you use the code? (optional)')
    .messages({
      'custom.max.words': 'There must be 250 words or less'
    }),
  componentCode: Joi.string()
    .optional()
    .allow(null, '')
    .custom((value, helpers) => maxWords(value, helpers, 1000))
    .label('Add the code')
    .messages({
      'custom.max.words': 'There must be 1000 words or less'
    })
})

module.exports = schema
