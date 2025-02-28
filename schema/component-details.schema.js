const Joi = require('joi')

const schema = Joi.object({
  componentName: Joi.string()
    .pattern(/^[A-Za-z\s]+$/, 'letters')
    .max(26)
    .required()
    .messages({
      'string.pattern.name': 'The component name must only include letters a to z, and special characters such as hyphens, spaces and apostrophes',
      'string.empty': 'Enter the name of the component',
      'string.max': 'The component name must be 26 characters or less'
    })
    .label('What is the name of the component?'),
  componentOverview: Joi.string()
    .required()
    .max(250)
    .messages({
      'string.empty': 'Enter an overview description of the component',
      'string.max': 'The overview description must be 250 characters or less'
    })
    .label('Add an overview description about the component'),
  howIsTheComponentUsed: Joi.string()
    .required()
    .max(250)
    .messages({
      'string.empty': 'Enter an answer for how the component is used currently',
      'string.max': 'The how the component is used currently must be 250 characters or less'
    })
    .label('How is the component used in your service?')
})

module.exports = schema

