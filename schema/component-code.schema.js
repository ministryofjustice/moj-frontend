const Joi = require('joi')

const schema = Joi.object({
  componentCodeAvailable: Joi.valid('yes', 'no')
    .required()
    .label('Do you have code for the component available?')
})

module.exports = schema
