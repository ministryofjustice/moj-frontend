const addAnotherSchema = require('./add-another.schema')
const Joi = require('joi')

const schema = addAnotherSchema.append({
  figmaLink: Joi.string()
    .uri()
    .required()
    .label('Add the link to where the Figma design file is saved')
    .messages({
      'any.required': 'Enter the website link for where the Figma design file is saved',
      'string.empty': 'Enter the website link for where the Figma design file is saved',
      'string.uri': 'The Figma design file link must be a real website URL'
    }),
  figmaLinkAdditionalInformation: Joi.string()
    .allow(null, '')
    .label('Additional information about the Figma design file (optional)')
})

module.exports = schema
