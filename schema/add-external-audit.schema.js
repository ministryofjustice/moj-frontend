const Joi = require('joi')

const schema = Joi.object({
  organisation: Joi.string()
    .allow(null, ''),
  'auditDate-day': Joi.string()
    .allow(null, ''),
  'auditDate-month': Joi.string()
    .allow(null, ''),
  'auditDate-year': Joi.string()
    .allow(null, ''),
  accessibilityReport: Joi.string()
    .allow(null, ''),
  issuesDiscovered: Joi.string()
    .allow(null, ''),
})

module.exports = schema
