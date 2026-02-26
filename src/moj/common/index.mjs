/**
 * GOV.UK Frontend helpers
 *
 * @todo Import from GOV.UK Frontend
 */

/**
 * Move focus to element
 *
 * Sets tabindex to -1 to make the element programmatically focusable,
 * but removes it on blur as the element doesn't need to be focused again.
 *
 * @template {HTMLElement} FocusElement
 * @param {FocusElement} $element - HTML element
 * @param {object} [options] - Handler options
 * @param {function(this: FocusElement): void} [options.onBeforeFocus] - Callback before focus
 * @param {function(this: FocusElement): void} [options.onBlur] - Callback on blur
 */
export function setFocus($element, options = {}) {
  const isFocusable = $element.getAttribute('tabindex')

  if (!isFocusable) {
    $element.setAttribute('tabindex', '-1')
  }

  /**
   * Handle element focus
   */
  function onFocus() {
    $element.addEventListener('blur', onBlur, { once: true })
  }

  /**
   * Handle element blur
   */
  function onBlur() {
    options.onBlur?.call($element)

    if (!isFocusable) {
      $element.removeAttribute('tabindex')
    }
  }

  // Add listener to reset element on blur, after focus
  $element.addEventListener('focus', onFocus, { once: true })

  // Focus element
  options.onBeforeFocus?.call($element)
  $element.focus()
}

/**
 * Emit a custom event
 *
 * @template {CompatibleClass} ComponentClass
 * @param {Element} $element - The event type
 * @param {ComponentClass} Component - class of the component to create
 * @param {string} eventName - The name of the event to emit
 * @param {object} detail - Any details to pass along with the event
 * @param {boolean} cancelable - whether the event is cancelable
 */
export function emitEvent(
  $element,
  Component,
  eventName,
  detail = null,
  cancelable = false
) {
  if (!$element) return

  const event = new CustomEvent(`${Component.moduleName}:${eventName}`, {
    bubbles: true,
    cancelable,
    detail
  })

  return $element.dispatchEvent(event)
}

/* eslint-disable jsdoc/valid-types --
 * `{new(...args: any[] ): object}` is not recognised as valid
 * https://github.com/gajus/eslint-plugin-jsdoc/issues/145#issuecomment-1308722878
 * https://github.com/jsdoc-type-pratt-parser/jsdoc-type-pratt-parser/issues/131
 **/

/**
 * A class that can be instantiated with any arguments and has a static
 * `moduleName` property.
 *
 * @typedef {{new (...args: any[]): any, moduleName: string}} CompatibleClass
 */

/* eslint-enable jsdoc/valid-types */
