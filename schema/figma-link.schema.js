const Joi = require('joi')

const maxWords = require('../helpers/max-words')

const addAnotherSchema = require('./add-another.schema')

const schema = addAnotherSchema.append({
  figmaLink: Joi.string()
    .pattern(/^(https?:\/\/)?([\w-]+(\.[\w-]+)+)(:[0-9]{1,5})?(\/.*)?$/)
    .required()
    .label('Add the link to where the Figma design file is saved')
    .messages({
      'any.required': 'Enter the link to the Figma design file',
      'string.empty': 'Enter the link to the Figma design file',
      'string.pattern.base': 'The link to the Figma design file must be a real URL'
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
