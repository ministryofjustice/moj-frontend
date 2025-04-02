import { FormValidator } from '/javascripts/moj-frontend.min.js'

const validator = new FormValidator(
  document.querySelector('[data-module="moj-form-validator"]')
)

validator.addValidator('email', [
  {
    method: function (field) {
      return field.value.trim().length > 0
    },
    message: 'Enter your email address'
  },
  {
    method: function (field) {
      return field.value.indexOf('@') > -1
    },
    message: 'You need to enter the ‘at’ symbol in your email address'
  }
])

validator.addValidator('password', [
  {
    method: function (field) {
      return field.value.trim().length > 0
    },
    message: 'Enter your password'
  },
  {
    method: function (field) {
      return field.value.length > 8
    },
    message: 'Your password must contain at least 8 characters'
  },
  {
    method: function (field) {
      return /\d/.test(field.value)
    },
    message: 'Your password must contain at least one number'
  }
])

validator.addValidator('location', [
  {
    method: function (field) {
      return field.value.trim().length > 0
    },
    message: 'Select your location'
  }
])

validator.addValidator('dob-day', [
  {
    method: function (field, params) {
      return (
        params.day.value.length !== 0 &&
        params.month.value.length !== 0 &&
        params.year.value !== 0
      )
    },
    message: 'Enter your date of birth',
    params: {
      day: document.getElementById('dob-day'),
      month: document.getElementById('dob-month'),
      year: document.getElementById('dob-year')
    }
  },
  {
    method: function (field, params) {
      const d = new Date(
        Number.parseInt(params.year.value, 10),
        Number.parseInt(params.month.value, 10) - 1,
        Number.parseInt(params.day.value, 10) - 1
      )
      return d instanceof Date && Number.isFinite(d.getTime())
    },
    message: 'Enter a valid date of birth',
    params: {
      day: document.getElementById('dob-day'),
      month: document.getElementById('dob-month'),
      year: document.getElementById('dob-year')
    }
  }
])
