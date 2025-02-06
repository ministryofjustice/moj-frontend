const Joi = require('joi')

const schema = Joi.object({
  prototypeUrl: Joi.string()
    .uri()
    .optional()
    .label('Add the URL to where the prototype is saved'),
  prototypeUrlAdditionalInformation: Joi.string()
    .allow(null, '')
    .label('Additional information about the URL (optional)')
})

module.exports = schema
