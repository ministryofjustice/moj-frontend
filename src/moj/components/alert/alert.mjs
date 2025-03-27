import { mergeConfigs, normaliseDataset } from '../../common/configuration.mjs'
import { setFocus } from '../../common/index.mjs'
import {
  findNearestMatchingElement,
  getPreviousSibling
} from '../../helpers.mjs'

export class Alert {
  /**
   * @param {Element | null} $root - HTML element to use for alert
   * @param {AlertConfig} [config] - Alert config
   */
  constructor($root, config = {}) {
    if (!$root || !($root instanceof HTMLElement)) {
      return this
    }

    this.$root = $root

    if (this.$root.hasAttribute('data-moj-alert-init')) {
      return this
    }

    this.$root.setAttribute('data-moj-alert-init', '')

    /**
     * Merge configs
     *
     * @type {AlertConfig}
     */
    this.config = mergeConfigs(
      Alert.defaults,
      config,
      normaliseDataset(Alert, this.$root.dataset)
    )

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
      this.$root.getAttribute('role') === 'alert' &&
      !this.config.disableAutoFocus
    ) {
      setFocus(this.$root)
    }

    this.$dismissButton = this.$root.querySelector('.moj-alert__dismiss')

    if (this.config.dismissible && this.$dismissButton) {
      this.$dismissButton.innerHTML = this.config.dismissText
      this.$dismissButton.removeAttribute('hidden')

      this.$root.addEventListener('click', (event) => {
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
      const $nextSibling = this.$root.nextElementSibling
      if ($nextSibling && $nextSibling.matches('.moj-alert')) {
        $elementToRecieveFocus = $nextSibling
      }
    }

    // Else try to find any preceding sibling alert or heading
    if (!$elementToRecieveFocus) {
      $elementToRecieveFocus = getPreviousSibling(
        this.$root,
        '.moj-alert, h1, h2, h3, h4, h5, h6'
      )
    }

    // Else find the closest ancestor heading, or fallback to main, or last resort
    // use the body element
    if (!$elementToRecieveFocus) {
      $elementToRecieveFocus = findNearestMatchingElement(
        this.$root,
        'h1, h2, h3, h4, h5, h6, main, body'
      )
    }

    // If we have an element, place focus on it
    if ($elementToRecieveFocus instanceof HTMLElement) {
      setFocus($elementToRecieveFocus)
    }

    // Remove the alert
    this.$root.remove()
  }

  /**
   * Alert default config
   *
   * @type {AlertConfig}
   */
  static defaults = Object.freeze({
    dismissible: false,
    dismissText: 'Dismiss',
    disableAutoFocus: false
  })

  /**
   * Alert config schema
   *
   * @satisfies {Schema<AlertConfig>}
   */
  static schema = Object.freeze({
    properties: {
      dismissible: { type: 'boolean' },
      dismissText: { type: 'string' },
      disableAutoFocus: { type: 'boolean' },
      focusOnDismissSelector: { type: 'string' }
    }
  })
}

/**
 * @typedef {object} AlertConfig
 * @property {boolean} [dismissible=false] - Can the alert be dismissed by the user
 * @property {string} [dismissText=Dismiss] - the label text for the dismiss button
 * @property {boolean} [disableAutoFocus=false] - whether the alert will be autofocused
 * @property {string} [focusOnDismissSelector] - CSS Selector for element to be focused on dismiss
 */

/**
 * @import { Schema } from '../../common/configuration.mjs'
 */
