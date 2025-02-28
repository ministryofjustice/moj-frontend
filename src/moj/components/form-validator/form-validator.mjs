import { addAttributeValue, removeAttributeValue } from '../../helpers.mjs'

export class FormValidator {
  /**
   * @param {Element | null} form - HTML element to use for form validator
   * @param {FormValidatorConfig} [config] - Button menu config
   */
  constructor(form, config = {}) {
    if (!form || !(form instanceof HTMLFormElement)) {
      return this
    }

    this.form = form
    this.errors = []
    this.validators = []
    this.form.addEventListener('submit', this.onSubmit.bind(this))
    this.summary =
      config.summary || document.querySelector('.govuk-error-summary')
    this.originalTitle = document.title
  }

  escapeHtml(string) {
    return String(string).replace(/[&<>"'`=/]/g, function fromEntityMap(s) {
      return FormValidator.entityMap[s]
    })
  }

  resetTitle() {
    document.title = this.originalTitle
  }

  updateTitle() {
    document.title = `${this.errors.length} errors - ${document.title}`
  }

  showSummary() {
    this.summary.innerHTML = this.getSummaryHtml()
    this.summary.classList.remove('moj-hidden')
    this.summary.setAttribute('aria-labelledby', 'errorSummary-heading')
    this.summary.focus()
  }

  getSummaryHtml() {
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

  hideSummary() {
    this.summary.classList.add('moj-hidden')
    this.summary.removeAttribute('aria-labelledby')
  }

  onSubmit(event) {
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

  showInlineErrors() {
    for (const error of this.errors) {
      this.showInlineError(error)
    }
  }

  showInlineError(error) {
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

  removeInlineErrors() {
    for (const error of this.errors) {
      this.removeInlineError(error)
    }
  }

  removeInlineError(error) {
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
      control.removeAttribute('aria-invalid')
      removeAttributeValue(control, 'aria-describedby', errorSpan.id)
    }
  }

  addValidator(fieldName, rules) {
    this.validators.push({
      fieldName,
      rules,
      field: this.form.elements[fieldName]
    })
  }

  validate() {
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

        if (
          typeof validatorReturnValue === 'boolean' &&
          !validatorReturnValue
        ) {
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

  static entityMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
    '/': '&#x2F;',
    '`': '&#x60;',
    '=': '&#x3D;'
  }
}

/**
 * @typedef {object} FormValidatorConfig
 * @property {HTMLElement} [summary] - HTML element to use for error summary
 */
