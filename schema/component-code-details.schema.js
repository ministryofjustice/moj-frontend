const Joi = require('joi')

const schema = Joi.object({
  componentCodeLanguage: Joi.string()
    .allow(null, '')
    .label('What language is the code written in?'),
  componentCodeUsage: Joi.string()
    .allow(null, '')
    .label('How do you use the code? (optional)'),
  componentCode: Joi.string().allow(null, '').label('Add the code')
})

module.exports = schema
