const Joi = require('joi')

const maxWords = require('../helpers/max-words')

const addAnotherSchema = require('./add-another.schema')

const schema = addAnotherSchema.append({
  prototypeUrl: Joi.string()
    .uri()
    .required()
    .label('Add the URL to where the prototype is saved')
    .messages({
      'any.required': 'Enter the prototype link',
      'string.empty': 'Enter the prototype link',
      'string.uri': 'The prototype link must be a real website URL'
    }),
  prototypeUrlAdditionalInformation: Joi.string()
    .optional()
    .allow(null, '')
    .custom((value, helpers) => maxWords(value, helpers, 250))
    .label('Additional information about the URL (optional)')
    .messages({
      'custom.max.words': 'There must be 250 words or less'
    })
})

module.exports = schema
