const Joi = require('joi')

const schema = Joi.object({
  auditDate: Joi.string()
    .allow(null, ''),
  issuesDiscovered: Joi.string()
    .allow(null, ''),
  accessibilityReport: Joi.string()
    .allow(null, ''),
})

module.exports = schema
