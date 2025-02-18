const Joi = require('joi')

const schema = Joi.object({
  'testingDate-day': Joi.string()
    .allow(null, ''),
  'testingDate-month': Joi.string()
    .allow(null, ''),
  'testingDate-year': Joi.string()
    .allow(null, ''),
  issuesDiscovered: Joi.string()
    .allow(null, ''),
  accessibilityReport: Joi.string()
    .allow(null, ''),
})

module.exports = schema
