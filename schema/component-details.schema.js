const Joi = require('joi')

const schema = Joi.object({
  componentName: Joi.string()
    .pattern(/^[A-Za-z\s]+$/, 'letters')
    .max(26)
    .required()
    .messages({
      'string.empty': 'Enter the name of the component',
      'string.pattern.name': 'Enter a name for the component using letters',
      'string.max': 'Enter a name for the component using fewer letters'
    })
    .label('What is the name of the component?'),
  componentOverview: Joi.string()
    .required()
    .messages({
      'string.empty': 'Enter an overview description of the component'
    })
    .label('Add an overview description about the component'),
  howIsTheComponentUsed: Joi.string()
    .required()
    .messages({
      'string.empty': 'Enter an answer for how the component is used currently'
    })
    .label('How is the component used in your service?')
})

module.exports = schema
