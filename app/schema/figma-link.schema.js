const Joi = require('joi')

const addAnotherSchema = require('./add-another.schema')

const schema = addAnotherSchema.append({
  figmaLink: Joi.string()
    .required()
    .uri()
    .pattern(/^(https?:\/\/)?([\w-]+\.)*figma\.com(:[0-9]{1,5})?(\/.*)?$/)
    .messages({
      'any.required': 'Enter the link to the Figma design file',
      'string.empty': 'Enter the link to the Figma design file',
      'string.uri': 'Add a link to a Figma design file',
      'string.pattern.base': 'Add a link to a Figma design file'
    })
})

module.exports = schema
