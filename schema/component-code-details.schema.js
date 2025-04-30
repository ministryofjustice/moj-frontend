const Joi = require('joi')

const maxWords = require('../helpers/max-words')

const addAnotherSchema = require('./add-another.schema')

const schema = addAnotherSchema.append({
  componentCodeLanguage: Joi.string()
    .required()
    .label('What language is the code written in?')
    .messages({
      'any.required': 'Enter the name of the code language',
      'string.empty': 'Enter the name of the code language'
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
      'custom.max.words': 'Enter 10,000 characers or less'
    })
})

module.exports = schema
