const Joi = require('joi')

const schema = Joi.object({
  componentCodeAvailable: Joi.valid('yes', 'no')
    .required()
    .label('Do you have code for the component available?')
    .messages({
      'any.required': 'Select yes if you have code for the component',
      'string.empty': 'Select yes if you have code for the component'
    })
})

module.exports = schema
