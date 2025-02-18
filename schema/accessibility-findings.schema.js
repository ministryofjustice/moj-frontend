const Joi = require('joi')

const schema = Joi.object({
  hasComponentBeenTestedExternalAccessibility: Joi.valid('yes', 'no')
    .required()
    .messages({
      'any.required': 'Select yes if you had an external audit'
    })
    .label('Has the component been tested as part of an external accessibility audit?'),
  hasComponentBeenTestedInternalAudit: Joi.valid('yes', 'no')
    .required()
    .messages({
      'any.required': 'Select yes if you had an internal audit'
    })
    .label('Has the component been tested as part of an internal audit?'),
  hasComponentBeenTestedUsingAssistiveTechnology: Joi.valid('yes', 'no')
    .required()
    .messages({
      'any.required': 'Select yes if you had tested using assistive technology'
    })
    .label('Has the component been tested using assistive technology?')
})

module.exports = schema
