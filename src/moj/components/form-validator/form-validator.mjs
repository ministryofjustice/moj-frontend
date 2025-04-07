import { ConfigurableComponent } from 'govuk-frontend'

import { addAttributeValue, removeAttributeValue } from '../../helpers.mjs'

/**
 * @augments {ConfigurableComponent<FormValidatorConfig, HTMLFormElement>}
 */
export class FormValidator extends ConfigurableComponent {
  /**
   * @param {Element | null} $root - HTML element to use for form validator
   * @param {FormValidatorConfig} [config] - Form validator config
   */
  constructor($root, config = {}) {
    super($root, config)

    const $summary =
      this.config.summary.element ||
      document.querySelector(this.config.summary.selector)

    if (!$summary || !($summary instanceof HTMLElement)) {
      return this
    }

    this.$summary = $summary

    this.errors = /** @type {ValidationError[]} */ ([])
    this.validators = /** @type {Validator[]} */ ([])
    this.originalTitle = document.title

    this.$root.addEventListener('submit', this.onSubmit.bind(this))
  }

  escapeHtml(string = '') {
    return String(string).replace(
      /[&<>"'`=/]/g,
      (name) => FormValidator.entityMap[name]
    )
  }

  resetTitle() {
    document.title = this.originalTitle
  }

  updateTitle() {
    document.title = `${this.errors.length} errors - ${document.title}`
  }

  showSummary() {
    this.$summary.innerHTML = this.getSummaryHtml()
    this.$summary.classList.remove('moj-hidden')
    this.$summary.setAttribute('aria-labelledby', 'errorSummary-heading')
    this.$summary.focus()
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
    this.$summary.classList.add('moj-hidden')
    this.$summary.removeAttribute('aria-labelledby')
  }

  /**
   * @param {SubmitEvent} event - Form submit event
   */
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

  /**
   * @param {ValidationError} error
   */
  showInlineError(error) {
    const $errorSpan = document.createElement('span')
    $errorSpan.id = `${error.fieldName}-error`
    $errorSpan.classList.add('govuk-error-message')
    $errorSpan.innerHTML = this.escapeHtml(error.message)

    const $control = document.querySelector(`#${error.fieldName}`)
    const $fieldset = $control.closest('.govuk-fieldset')
    const $fieldContainer = ($fieldset || $control).closest('.govuk-form-group')

    const $label = $fieldContainer.querySelector('label')
    const $legend = $fieldContainer.querySelector('legend')

    $fieldContainer.classList.add('govuk-form-group--error')

    if ($fieldset && $legend) {
      $legend.after($errorSpan)
      $fieldContainer.setAttribute('aria-invalid', 'true')
      addAttributeValue($fieldset, 'aria-describedby', $errorSpan.id)
    } else if ($label && $control) {
      $label.after($errorSpan)
      $control.setAttribute('aria-invalid', 'true')
      addAttributeValue($control, 'aria-describedby', $errorSpan.id)
    }
  }

  removeInlineErrors() {
    for (const error of this.errors) {
      this.removeInlineError(error)
    }
  }

  /**
   * @param {ValidationError} error
   */
  removeInlineError(error) {
    const $errorSpan = document.querySelector(`#${error.fieldName}-error`)

    const $control = document.querySelector(`#${error.fieldName}`)
    const $fieldset = $control.closest('.govuk-fieldset')
    const $fieldContainer = ($fieldset || $control).closest('.govuk-form-group')

    const $label = $fieldContainer.querySelector('label')
    const $legend = $fieldContainer.querySelector('legend')

    $errorSpan.remove()
    $fieldContainer.classList.remove('govuk-form-group--error')

    if ($fieldset && $legend) {
      $fieldContainer.removeAttribute('aria-invalid')
      removeAttributeValue($fieldset, 'aria-describedby', $errorSpan.id)
    } else if ($label && $control) {
      $control.removeAttribute('aria-invalid')
      removeAttributeValue($control, 'aria-describedby', $errorSpan.id)
    }
  }

  /**
   * @param {string} fieldName - Field name
   * @param {ValidationRule[]} rules - Validation rules
   */
  addValidator(fieldName, rules) {
    this.validators.push({
      fieldName,
      rules,
      field: this.$root.elements.namedItem(fieldName)
    })
  }

  validate() {
    this.errors = []

    /** @type {Validator | null} */
    let validator = null

    /** @type {boolean | string} */
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

  /**
   * @type {Record<string, string>}
   */
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

  /**
   * Name for the component used when initialising using data-module attributes.
   */
  static moduleName = 'moj-form-validator'

  /**
   * Multi file upload default config
   *
   * @type {FormValidatorConfig}
   */
  static defaults = Object.freeze({
    summary: {
      selector: '.govuk-error-summary'
    }
  })

  /**
   * Multi file upload config schema
   *
   * @satisfies {Schema<FormValidatorConfig>}
   */
  static schema = Object.freeze(
    /** @type {const} */ ({
      properties: {
        summary: { type: 'object' }
      }
    })
  )
}

/**
 * @typedef {object} FormValidatorConfig
 * @property {object} [summary] - Error summary config
 * @property {string} [summary.selector] - Selector for error summary
 * @property {Element | null} [summary.element] - HTML element for error summary
 */

/**
 * @typedef {object} ValidationRule
 * @property {(field: Validator['field'], params: Record<string, Validator['field']>) => boolean | string} method - Validation method
 * @property {string} message - Error message
 * @property {Record<string, Validator['field']>} [params] - Parameters for validation
 */

/**
 * @typedef {object} ValidationError
 * @property {string} fieldName - Name of the field
 * @property {string} message - Validation error message
 */

/**
 * @typedef {object} Validator
 * @property {string} fieldName - Name of the field
 * @property {ValidationRule[]} rules - Validation rules
 * @property {Element | RadioNodeList} field - Form field
 */

/**
 * @import { Schema } from 'govuk-frontend/dist/govuk/common/configuration.mjs'
 */
