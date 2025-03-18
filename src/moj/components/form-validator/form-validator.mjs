import { addAttributeValue, removeAttributeValue } from '../../helpers.mjs'

export function FormValidator(form, options = {}) {
  this.form = form
  this.errors = []
  this.validators = []
  this.form.addEventListener('submit', this.onSubmit.bind(this))
  this.summary =
    options.summary || document.querySelector('.govuk-error-summary')
  this.originalTitle = document.title
}

FormValidator.entityMap = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
  '/': '&#x2F;',
  '`': '&#x60;',
  '=': '&#x3D;'
}

FormValidator.prototype.escapeHtml = function (string) {
  return String(string).replace(/[&<>"'`=/]/g, function fromEntityMap(s) {
    return FormValidator.entityMap[s]
  })
}

FormValidator.prototype.resetTitle = function () {
  document.title = this.originalTitle
}

FormValidator.prototype.updateTitle = function () {
  document.title = `${this.errors.length} errors - ${document.title}`
}

FormValidator.prototype.showSummary = function () {
  this.summary.innerHTML = this.getSummaryHtml()
  this.summary.classList.remove('moj-hidden')
  this.summary.setAttribute('aria-labelledby', 'errorSummary-heading')
  this.summary.focus()
}

FormValidator.prototype.getSummaryHtml = function () {
  let html =
    '<h2 id="error-summary-title" class="govuk-error-summary__title">There is a problem</h2>'
  html += '<div class="govuk-error-summary__body">'
  html += '<ul class="govuk-list govuk-error-summary__list">'
  for (const error of this.errors) {
    html += '<li>'
    html += `<a href="#${this.escapeHtml(error.fieldName)}">`
    html += this.escapeHtml(error.message)
    html += '</a>'
    html += '</li>'
  }
  html += '</ul>'
  html += '</div>'
  return html
}

FormValidator.prototype.hideSummary = function () {
  this.summary.classList.add('moj-hidden')
  this.summary.removeAttribute('aria-labelledby')
}

FormValidator.prototype.onSubmit = function (event) {
  this.removeInlineErrors()
  this.hideSummary()
  this.resetTitle()
  if (!this.validate()) {
    event.preventDefault()
    this.updateTitle()
    this.showSummary()
    this.showInlineErrors()
  }
}

FormValidator.prototype.showInlineErrors = function () {
  for (const error of this.errors) {
    this.showInlineError(error)
  }
}

FormValidator.prototype.showInlineError = function (error) {
  const errorSpan = document.createElement('span')
  errorSpan.id = `${error.fieldName}-error`
  errorSpan.classList.add('govuk-error-message')
  errorSpan.innerHTML = this.escapeHtml(error.message)

  const control = document.querySelector(`#${error.fieldName}`)
  const fieldset = control.closest('.govuk-fieldset')
  const fieldContainer = (fieldset || control).closest('.govuk-form-group')

  const label = fieldContainer.querySelector('label')
  const legend = fieldContainer.querySelector('legend')

  fieldContainer.classList.add('govuk-form-group--error')

  if (fieldset && legend) {
    legend.after(errorSpan)
    fieldContainer.setAttribute('aria-invalid', 'true')
    addAttributeValue(fieldset, 'aria-describedby', errorSpan.id)
  } else if (label && control) {
    label.after(errorSpan)
    control.setAttribute('aria-invalid', 'true')
    addAttributeValue(control, 'aria-describedby', errorSpan.id)
  }
}

FormValidator.prototype.removeInlineErrors = function () {
  for (const error of this.errors) {
    this.removeInlineError(error)
  }
}

FormValidator.prototype.removeInlineError = function (error) {
  const errorSpan = document.querySelector(`#${error.fieldName}-error`)

  const control = document.querySelector(`#${error.fieldName}`)
  const fieldset = control.closest('.govuk-fieldset')
  const fieldContainer = (fieldset || control).closest('.govuk-form-group')

  const label = fieldContainer.querySelector('label')
  const legend = fieldContainer.querySelector('legend')

  errorSpan.remove()
  fieldContainer.classList.remove('govuk-form-group--error')

  if (fieldset && legend) {
    fieldContainer.removeAttribute('aria-invalid')
    removeAttributeValue(fieldset, 'aria-describedby', errorSpan.id)
  } else if (label && control) {
    control.removeAttribute('aria-invalid', 'true')
    removeAttributeValue(control, 'aria-describedby', errorSpan.id)
  }
}

FormValidator.prototype.addValidator = function (fieldName, rules) {
  this.validators.push({
    fieldName,
    rules,
    field: this.form.elements[fieldName]
  })
}

FormValidator.prototype.validate = function () {
  this.errors = []
  let validator = null
  let validatorReturnValue = true
  let i
  let j
  for (i = 0; i < this.validators.length; i++) {
    validator = this.validators[i]
    for (j = 0; j < validator.rules.length; j++) {
      validatorReturnValue = validator.rules[j].method(
        validator.field,
        validator.rules[j].params
      )

      if (typeof validatorReturnValue === 'boolean' && !validatorReturnValue) {
        this.errors.push({
          fieldName: validator.fieldName,
          message: validator.rules[j].message
        })
        break
      } else if (typeof validatorReturnValue === 'string') {
        this.errors.push({
          fieldName: validatorReturnValue,
          message: validator.rules[j].message
        })
        break
      }
    }
  }
  return this.errors.length === 0
}
