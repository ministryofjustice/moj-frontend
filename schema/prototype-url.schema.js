const Joi = require('joi')

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
    .allow(null, '')
    .label('Additional information about the URL (optional)')
})

module.exports = schema
