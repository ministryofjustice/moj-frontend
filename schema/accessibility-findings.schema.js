const Joi = require('joi')

const schema = Joi.object({
  hasComponentBeenTestedForAccessibility: Joi.valid('yes', 'no')
    .required()
    .label('Has component been tested for accessibility purposes?')
})

module.exports = schema
