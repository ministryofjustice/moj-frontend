const Joi = require('joi')
const moment = require('moment')

const maxWords = require('../helpers/max-words')

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
      const day = helpers.state.ancestors[0]['testingDate-day']
      const month = helpers.state.ancestors[0]['testingDate-month']
      const year = helpers.state.ancestors[0]['testingDate-year']

      if (
        !/^\d{1,2}$/.test(day) ||
        !/^\d{1,2}$/.test(month) ||
        !/^\d{4}$/.test(year)
      ) {
        // Skip custom testingDate validation if parts are invalid
        return value
      }

      if (!moment(value, 'YYYY-MM-DD', true).isValid()) {
        return helpers.error('any.invalid', {
          message: 'The date of the testing must be a real date'
        })
      }

      if (moment(value).isAfter(moment())) {
        return helpers.error('any.invalid', {
          message: 'The date of the testing must be today or in the past'
        })
      }

      // Check if the date is after 01/04/2011
      const minDate = moment('2011-04-01', 'YYYY-MM-DD')
      if (moment(value).isBefore(minDate)) {
        return helpers.error('any.invalid', {
          message: 'The date must be after 01/04/2011'
        })
      }

      return value
    })
    .messages({
      'any.invalid': '{{#message}}'
    }),

  issuesDiscovered: Joi.string()
    .optional()
    .allow(null, '')
    .custom((value, helpers) => maxWords(value, helpers, 250))
    .messages({
      'custom.max.words': 'There must be 250 words or less'
    }),

  accessibilityReport: Joi.string()
    .allow('')
    .pattern(/\.pdf$/i)
    .messages({
      'string.pattern.base': 'The selected file must be a PDF'
    })
    .optional()
})

module.exports = schema
