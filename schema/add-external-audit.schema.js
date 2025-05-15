const Joi = require('joi')
const moment = require('moment')

const maxWords = require('../helpers/max-words')

const schema = Joi.object({
  externalOrganisation: Joi.string().required().messages({
    'any.required':
      'Enter the name of the organisation that did the external audit',
    'string.empty':
      'Enter the name of the organisation that did the external audit'
  }),

  'auditDate-day': Joi.string()
    .pattern(/^\d{1,2}$/)
    .required()
    .messages({
      'any.required': 'The date of the external audit must include a day',
      'string.empty': 'The date of the external audit must include a day',
      'string.pattern.base':
        'The date of the external audit must be a real date'
    }),

  'auditDate-month': Joi.string()
    .pattern(/^\d{1,2}$/)
    .required()
    .messages({
      'any.required': 'The date of the external audit must include a month',
      'string.empty': 'The date of the external audit must include a month',
      'string.pattern.base':
        'The date of the external audit must be a real date'
    }),

  'auditDate-year': Joi.string()
    .pattern(/^\d{4}$/)
    .required()
    .messages({
      'any.required': 'The date of the external audit must include a year',
      'string.empty': 'The date of the external audit must include a year',
      'string.pattern.base':
        'The date of the external audit must be a real date'
    }),

  auditDate: Joi.string()
    .custom((value, helpers) => {
      const day = helpers.state.ancestors[0]['auditDate-day']
      const month = helpers.state.ancestors[0]['auditDate-month']
      const year = helpers.state.ancestors[0]['auditDate-year']

      if (
        !/^\d{1,2}$/.test(day) ||
        !/^\d{1,2}$/.test(month) ||
        !/^\d{4}$/.test(year)
      ) {
        // Skip custom auditDate validation if parts are invalid
        return value
      }

      if (!moment(value, 'YYYY-MM-DD', true).isValid()) {
        return helpers.error('any.invalid', {
          message: 'The date of the external audit must be a real date'
        })
      }

      if (moment(value).isAfter(moment())) {
        return helpers.error('any.invalid', {
          message: 'The date of the external audit must be today or in the past'
        })
      }

      // Check if the date is after 01/04/2011
      const minDate = moment('2011-04-01', 'YYYY-MM-DD')
      if (moment(value).isBefore(minDate)) {
        return helpers.error('any.invalid', {
          message: 'The date must be on or after 1/4/2011'
        })
      }

      return value
    })
    .messages({
      'any.invalid': '{{#message}}'
    }),

  issuesDiscovered: Joi.string()
    .required()
    .custom((value, helpers) => maxWords(value, helpers, 250))
    .messages({
      'any.required':
        'Enter details about issues discovered by the external audit',
      'string.empty':
        'Enter details about issues discovered by the external audit',
      'custom.max.words': 'Enter 250 words or less'
    })
})

module.exports = schema
