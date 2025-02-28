import {
  findNearestMatchingElement,
  getPreviousSibling,
  setFocus
} from '../../helpers.mjs'

export class Alert {
  /**
   * @param {Element | null} $module - HTML element to use for alert
   * @param {AlertConfig} [config] - Alert config
   */
  constructor($module, config = {}) {
    if (!$module || !($module instanceof HTMLElement)) {
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

  init() {
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
      setFocus(this.$module)
    }

    this.$dismissButton = this.$module.querySelector('.moj-alert__dismiss')

    if (this.config.dismissible && this.$dismissButton) {
      this.$dismissButton.innerHTML = this.config.dismissText
      this.$dismissButton.removeAttribute('hidden')

      this.$module.addEventListener('click', (event) => {
        if (
          event.target instanceof Node &&
          this.$dismissButton.contains(event.target)
        ) {
          this.dimiss()
        }
      })
    }
  }

  /**
   * Handle dismissing the alert
   */
  dimiss() {
    let $elementToRecieveFocus

    // If a selector has been provided, attempt to find that element
    if (this.config.focusOnDismissSelector) {
      $elementToRecieveFocus = document.querySelector(
        this.config.focusOnDismissSelector
      )
    }

    // Is the next sibling another alert
    if (!$elementToRecieveFocus) {
      const $nextSibling = this.$module.nextElementSibling
      if ($nextSibling && $nextSibling.matches('.moj-alert')) {
        $elementToRecieveFocus = $nextSibling
      }
    }

    // Else try to find any preceding sibling alert or heading
    if (!$elementToRecieveFocus) {
      $elementToRecieveFocus = getPreviousSibling(
        this.$module,
        '.moj-alert, h1, h2, h3, h4, h5, h6'
      )
    }

    // Else find the closest ancestor heading, or fallback to main, or last resort
    // use the body element
    if (!$elementToRecieveFocus) {
      $elementToRecieveFocus = findNearestMatchingElement(
        this.$module,
        'h1, h2, h3, h4, h5, h6, main, body'
      )
    }

    // If we have an element, place focus on it
    if ($elementToRecieveFocus instanceof HTMLElement) {
      setFocus($elementToRecieveFocus)
    }

    // Remove the alert
    this.$module.remove()
  }

  /**
   * Normalise string
   *
   * 'If it looks like a duck, and it quacks like a duck…' 🦆
   *
   * If the passed value looks like a boolean or a number, convert it to a boolean
   * or number.
   *
   * Designed to be used to convert config passed via data attributes (which are
   * always strings) into something sensible.
   *
   * @internal
   * @param {DOMStringMap[string]} value - The value to normalise
   * @param {SchemaProperty} [property] - Component schema property
   * @returns {string | boolean | number | undefined} Normalised data
   */
  normaliseString(value, property) {
    const trimmedValue = value ? value.trim() : ''

    let output
    let outputType
    if (property && property.type) {
      outputType = property.type
    }

    // No schema type set? Determine automatically
    if (!outputType) {
      if (['true', 'false'].includes(trimmedValue)) {
        outputType = 'boolean'
      }

      // Empty / whitespace-only strings are considered finite so we need to check
      // the length of the trimmed string as well
      if (trimmedValue.length > 0 && Number.isFinite(Number(trimmedValue))) {
        outputType = 'number'
      }
    }

    switch (outputType) {
      case 'boolean':
        output = trimmedValue === 'true'
        break

      case 'number':
        output = Number(trimmedValue)
        break

      default:
        output = value
    }

    return output
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
  parseDataset(schema, dataset) {
    const parsed = {}

    for (const [field, property] of Object.entries(schema.properties)) {
      if (field in dataset) {
        if (dataset[field]) {
          parsed[field] = this.normaliseString(dataset[field], property)
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
  mergeConfigs(...configObjects) {
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
}

/**
 * @typedef {object} AlertConfig
 * @property {boolean} [dismissible=false] - Can the alert be dismissed by the user
 * @property {string} [dismissText=Dismiss] - the label text for the dismiss button
 * @property {boolean} [disableAutoFocus=false] - whether the alert will be autofocused
 * @property {string} [focusOnDismissSelector] - CSS Selector for element to be focused on dismiss
 */
