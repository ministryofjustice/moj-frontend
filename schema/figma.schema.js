const Joi = require('joi')

const schema = Joi.object({
  figmaUrl: Joi.valid('yes', 'no')
    .required()
    .label('Do you have a Figma design file for the component?')
    .messages({
      'any.required': 'Select yes if you have a link to Figma'
    })
})

module.exports = schema
