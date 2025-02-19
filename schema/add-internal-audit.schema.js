const Joi = require('joi')
const moment = require('moment')

const schema = Joi.object({
  organisation: Joi.string()
    .required()
    .messages({
      'any.required': 'Enter the name of the organisation who conducted the internal audit',
      'string.empty': 'Enter the name of the organisation who conducted the internal audit'
    }),

  'auditDate-day': Joi.string()
    .pattern(/^\d{1,2}$/)
    .required()
    .messages({
      'any.required': 'The date of the internal audit must include a day',
      'string.empty': 'The date of the internal audit must include a day',
      'string.pattern.base': 'The date of the internal audit must be a real date'
    }),

  'auditDate-month': Joi.string()
    .pattern(/^\d{1,2}$/)
    .required()
    .messages({
      'any.required': 'The date of the internal audit must include a month',
      'string.empty': 'The date of the internal audit must include a month',
      'string.pattern.base': 'The date of the internal audit must be a real date'
    }),

  'auditDate-year': Joi.string()
    .pattern(/^\d{4}$/)
    .required()
    .messages({
      'any.required': 'The date of the internal audit must include a year',
      'string.empty': 'The date of the internal audit must include a year',
      'string.pattern.base': 'The date of the internal audit must be a real date'
    }),

  auditDate: Joi.string()
    .custom((value, helpers) => {
      if (!moment(value, 'YYYY-MM-DD', true).isValid()) {
        return helpers.error('any.invalid', { message: 'The date of the internal audit must be a real date' });
      }
      if (moment(value).isAfter(moment())) {
        return helpers.error('any.invalid', { message: 'The date of the internal audit must be today or in the past' });
      }
      return value;
    })
    .messages({
      'any.invalid': '{{#message}}'
    }),

  accessibilityReport: Joi.string()
    .allow('')
    .pattern(/\.pdf$/i)
    .messages({
      'string.pattern.base': 'The selected file must be a PDF'
    })
    .optional(),

  issuesDiscovered: Joi.string().optional().allow(null, '')
})

module.exports = schema
