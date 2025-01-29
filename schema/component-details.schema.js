const Joi = require('joi')

const schema = Joi.object({
  componentName: Joi.string()
    .required()
    .label('What is the name of the component?'),
  componentOverview: Joi.string()
    .required()
    .label('Add an overview description about the component'),
  howIsTheComponentUsed: Joi.string()
    .required()
    .label('How is the component used in your service?'),
  componentProblemSolved: Joi.string()
    .required()
    .label('What problem did the component solve?')
})

module.exports = schema
