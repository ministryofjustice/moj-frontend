const Joi = require('joi');

const schema = Joi.object({
  componentImage: Joi.string().label('Component Image'),
});

module.exports = schema;
