const Joi = require('joi')

const schema = Joi.object({
  addAnother: Joi.string().optional().allow(null, '').label('Add Another')
})

module.exports = schema
