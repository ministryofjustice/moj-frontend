const Joi = require('joi')

const schema = Joi.object({
  componentPrototypeUrl: Joi.valid('yes', 'no')
    .required()
    .label('Do you have a prototype link for the component?')
    .messages({
      'any.required': 'Select yes if you have a prototype link'
    })
})

module.exports = schema
