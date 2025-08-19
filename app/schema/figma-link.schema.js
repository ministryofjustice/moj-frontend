const Joi = require('joi')

const maxWords = require('../helpers/max-words')

const addAnotherSchema = require('./add-another.schema')

const schema = addAnotherSchema.append({
  figmaLink: Joi.string()
    .required()
    .uri()
    .pattern(/^(https?:\/\/)?([\w-]+\.)*figma\.com(:[0-9]{1,5})?(\/.*)?$/)
    .messages({
      'any.required': 'Enter the link to the Figma design file',
      'string.empty': 'Enter the link to the Figma design file',
      'string.uri': 'Add a real URL',
      'string.pattern.base': 'Add a link to a Figma design file'
    }),
  figmaLinkAdditionalInformation: Joi.string()
    .optional()
    .allow(null, '')
    .custom((value, helpers) => maxWords(value, helpers, 250))
    .label('Add information about the Figma design file (optional)')
    .messages({
      'custom.max.words': 'Enter 250 words or less'
    })
})

module.exports = schema
