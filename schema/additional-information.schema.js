const Joi = require('joi')

const schema = Joi.object({
  additionalInformation: Joi.string().allow(null, '').label('Add any further supporting information you have about the component'),
})

module.exports = schema
