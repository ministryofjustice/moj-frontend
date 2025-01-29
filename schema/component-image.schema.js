const Joi = require('joi')

const schema = Joi.object({
  componentImage: Joi.string().label('Upload a file')
})

module.exports = schema
