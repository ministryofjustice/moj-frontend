const Joi = require('joi')

const schema = Joi.object({
  componentPrototypeUrl: Joi.valid('yes', 'no').required().label('Do you have a prototype URL for the component?'),
})

module.exports = schema
