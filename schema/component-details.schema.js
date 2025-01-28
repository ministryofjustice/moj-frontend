const Joi = require('joi')

const schema = Joi.object({
  componentName: Joi.string().required().label('Component Name'),
  briefDescription: Joi.string().required().label('Brief Description'),
  whyNeeded: Joi.string().required().label('Why Needed')
})

module.exports = schema
