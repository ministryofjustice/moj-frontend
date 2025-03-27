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
