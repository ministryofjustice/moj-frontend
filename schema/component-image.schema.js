const Joi = require('joi')

const addAnotherSchema = require('./add-another.schema')

const schema = addAnotherSchema.append({
  componentImage: Joi.string().required().label('Upload a file').messages({
    'any.required': 'Select an image to upload'
  })
})

module.exports = schema
