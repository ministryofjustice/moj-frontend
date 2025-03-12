const Joi = require('joi')

const schema = Joi.object({
  accessibilityTellUsMore: Joi.string()
    .allow(null, '')
    .label(
      'Tell us more about how it has been accessibility tested and the findings'
    )
})

module.exports = schema
