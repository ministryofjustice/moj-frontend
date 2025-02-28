const Joi = require('joi')

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
    .allow(null, '')
    .label('How do you use the code? (optional)'),
  componentCode: Joi.string().allow(null, '').label('Add the code')
})

module.exports = schema
