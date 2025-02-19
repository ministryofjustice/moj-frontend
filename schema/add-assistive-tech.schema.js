const Joi = require('joi')
const moment = require('moment')

const schema = Joi.object({
  'testingDate-day': Joi.string()
    .pattern(/^\d{1,2}$/)
    .required()
    .messages({
      'any.required': 'The date of the testing must include a day',
      'string.empty': 'The date of the testing must include a day',
      'string.pattern.base': 'The date of the testing must be a real date'
    }),

  'testingDate-month': Joi.string()
    .pattern(/^\d{1,2}$/)
    .required()
    .messages({
      'any.required': 'The date of the testing must include a month',
      'string.empty': 'The date of the testing must include a month',
      'string.pattern.base': 'The date of the testing must be a real date'
    }),

  'testingDate-year': Joi.string()
    .pattern(/^\d{4}$/)
    .required()
    .messages({
      'any.required': 'The date of the testing must include a year',
      'string.empty': 'The date of the testing must include a year',
      'string.pattern.base': 'The date of the testing must be a real date'
    }),

  testingDate: Joi.string()
    .custom((value, helpers) => {
      if (!moment(value, 'YYYY-MM-DD', true).isValid()) {
        return helpers.error('any.invalid', { message: 'The date of the testing must be a real date' });
      }
      if (moment(value).isAfter(moment())) {
        return helpers.error('any.invalid', { message: 'The date of the testing must be today or in the past' });
      }
      return value;
    })
    .messages({
      'any.invalid': '{{#message}}'
    }),

  issuesDiscovered: Joi.string().optional().allow(null, ''),

  accessibilityReport: Joi.string()
    .allow('')
    .pattern(/\.pdf$/i)
    .messages({
      'string.pattern.base': 'The selected file must be a PDF'
    })
    .optional()
})

module.exports = schema
