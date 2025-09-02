const Joi = require('joi')

const schema = Joi.object({
  hasComponentBeenTestedExternalAccessibility: Joi.valid('yes', 'no')
    .required()
    .messages({
      'any.required': 'Select yes if there was an external audit'
    })
    .label(
      'Has the component been tested as part of an external accessibility audit?'
    ),
  hasComponentBeenTestedInternalAudit: Joi.valid('yes', 'no')
    .required()
    .messages({
      'any.required': 'Select yes if it was internally reviewed'
    })
    .label('Has the component been tested as part of an internal audit?'),
  hasComponentBeenTestedUsingAssistiveTechnology: Joi.valid('yes', 'no')
    .required()
    .messages({
      'any.required': 'Select yes if it was tested with assistive technology'
    })
    .label('Has the component been tested using assistive technology?')
})

module.exports = schema
