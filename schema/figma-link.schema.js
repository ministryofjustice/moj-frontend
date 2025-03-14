const Joi = require('joi')

const maxWords = require('../helpers/max-words')

const addAnotherSchema = require('./add-another.schema')

const schema = addAnotherSchema.append({
  figmaLink: Joi.string()
    .pattern(/^(https?:\/\/)?([\w-]+(\.[\w-]+)+)(:[0-9]{1,5})?(\/.*)?$/)
    .required()
    .label('Add the link to where the Figma design file is saved')
    .messages({
      'any.required':
        'Enter the website link for where the Figma design file is saved',
      'string.empty':
        'Enter the website link for where the Figma design file is saved',
      'string.pattern.base': 'The Figma design file link must be a real website URL'
    }),
  figmaLinkAdditionalInformation: Joi.string()
    .optional()
    .allow(null, '')
    .custom((value, helpers) => maxWords(value, helpers, 250))
    .label('Additional information about the Figma design file (optional)')
    .messages({
      'custom.max.words': 'There must be 250 words or less'
    })
})

module.exports = schema
