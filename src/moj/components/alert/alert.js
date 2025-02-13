/**
 * @typedef {object} AlertConfig
 * @property {boolean} [dismissible=false] - Can the alert be dismissed by the user
 * @property {string} [dismissText=Dismiss] - the label text for the dismiss button
 * @property {boolean} [disableAutoFocus=false] - whether the alert will be autofocused
 */

/**
 * @param {HTMLElement} $module
 * @param {AlertConfig} config
 * @class
 */
MOJFrontend.Alert = function ($module, config = {}) {
  if (!$module) {
    return this
  }

  const schema = Object.freeze({
    properties: {
      dismissible: { type: 'boolean' },
      dismissText: { type: 'string' },
      disableAutoFocus: { type: 'boolean' },
      focusOnDismissSelector: { type: 'string' }
    }
  })

  const defaults = {
    dismissible: false,
    dismissText: 'Dismiss',
    disableAutoFocus: false
  }
  // data attributes override JS config, which overrides defaults
  this.config = this.mergeConfigs(
    defaults,
    config,
    this.parseDataset(schema, $module.dataset)
  )
  this.$module = $module
}

MOJFrontend.Alert.prototype.init = function () {
  /**
   * Focus the alert
   *
   * If `role="alert"` is set, focus the element to help some assistive
   * technologies prioritise announcing it.
   *
   * You can turn off the auto-focus functionality by setting
   * `data-disable-auto-focus="true"` in the component HTML. You might wish to
   * do this based on user research findings, or to avoid a clash with another
   * element which should be focused when the page loads.
   */
  if (
    this.$module.getAttribute('role') === 'alert' &&
    !this.config.disableAutoFocus
  ) {
    MOJFrontend.setFocus(this.$module)
  }

  this.$dismissButton = this.$module.querySelector('.moj-alert__action button')

  if (this.config.dismissible && this.$dismissButton) {
    this.$dismissButton.hidden = false

    this.$module.addEventListener('click', (event) => {
      if (this.$dismissButton.contains(event.target)) {
        this.dimiss()
      }
    })
  }
}

MOJFrontend.Alert.prototype.createDismissButton = function () {
  const template = `
    <div class="moj-alert__action">
      <button class="govuk-body govuk-link">${this.config.dismissText}</a>
    </div>`
  this.$module.insertAdjacentHTML('beforeend', template)
}

MOJFrontend.Alert.prototype.dimiss = function () {
  let $elementToRecieveFocus

  if (this.config.focusOnDismissSelector) {
    $elementToRecieveFocus = document.querySelector(
      this.config.focusOnDismissSelector
    )
  }

  if (!$elementToRecieveFocus) {
    $elementToRecieveFocus = MOJFrontend.getPreviousSibling(
      this.$module,
      '.moj-alert, h1, h2, h3, h4, h5, h6'
    )
  }

  if (!$elementToRecieveFocus) {
    $elementToRecieveFocus = this.$module.closest(
      'h1, h2, h3, h4, h5, h6, main'
    )
  }

  if ($elementToRecieveFocus) {
    MOJFrontend.setFocus($elementToRecieveFocus)
  }

  this.$module.remove()
}

/**
 * Parse dataset
 *
 * Loop over an object and normalise each value using {@link normaliseString},
 * optionally expanding nested `i18n.field`
 *
 * @param {Schema} schema - component schema
 * @param {DOMStringMap} dataset - HTML element dataset
 * @returns {object} Normalised dataset
 */
MOJFrontend.Alert.prototype.parseDataset = function (schema, dataset) {
  const parsed = {}

  for (const [field, ,] of Object.entries(schema.properties)) {
    if (field in dataset) {
      if (dataset[field]) {
        parsed[field] = dataset[field]
      }
    }
  }

  return parsed
}

/**
 * Config merging function
 *
 * Takes any number of objects and combines them together, with
 * greatest priority on the LAST item passed in.
 *
 * @param {...{ [key: string]: unknown }} configObjects - Config objects to merge
 * @returns {{ [key: string]: unknown }} A merged config object
 */
MOJFrontend.Alert.prototype.mergeConfigs = function (...configObjects) {
  const formattedConfigObject = {}

  // Loop through each of the passed objects
  for (const configObject of configObjects) {
    for (const key of Object.keys(configObject)) {
      const option = formattedConfigObject[key]
      const override = configObject[key]

      // Push their keys one-by-one into formattedConfigObject. Any duplicate
      // keys with object values will be merged, otherwise the new value will
      // override the existing value.
      if (typeof option === 'object' && typeof override === 'object') {
        // @ts-expect-error Index signature for type 'string' is missing
        formattedConfigObject[key] = this.mergeConfigs(option, override)
      } else {
        formattedConfigObject[key] = override
      }
    }
  }

  return formattedConfigObject
}

/**
 * Schema for component config
 *
 * @typedef {object} Schema
 * @property {{ [field: string]: SchemaProperty | undefined }} properties - Schema properties
 */

/**
 * Schema property for component config
 *
 * @typedef {object} SchemaProperty
 * @property {'string' | 'boolean' | 'number' | 'object'} type - Property type
 */
