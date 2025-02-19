MOJFrontend.removeAttributeValue = function (el, attr, value) {
  let re, m
  if (el.getAttribute(attr)) {
    if (el.getAttribute(attr) === value) {
      el.removeAttribute(attr)
    } else {
      re = new RegExp(`(^|\\s)${value}(\\s|$)`)
      m = el.getAttribute(attr).match(re)
      if (m && m.length === 3) {
        el.setAttribute(
          attr,
          el.getAttribute(attr).replace(re, m[1] && m[2] ? ' ' : '')
        )
      }
    }
  }
}

MOJFrontend.addAttributeValue = function (el, attr, value) {
  let re
  if (!el.getAttribute(attr)) {
    el.setAttribute(attr, value)
  } else {
    re = new RegExp(`(^|\\s)${value}(\\s|$)`)
    if (!re.test(el.getAttribute(attr))) {
      el.setAttribute(attr, `${el.getAttribute(attr)} ${value}`)
    }
  }
}

MOJFrontend.dragAndDropSupported = function () {
  const div = document.createElement('div')
  return typeof div.ondrop !== 'undefined'
}

MOJFrontend.formDataSupported = function () {
  return typeof FormData === 'function'
}

MOJFrontend.fileApiSupported = function () {
  const input = document.createElement('input')
  input.type = 'file'
  return typeof input.files !== 'undefined'
}

MOJFrontend.nodeListForEach = function (nodes, callback) {
  if (window.NodeList.prototype.forEach) {
    return nodes.forEach(callback)
  }
  for (let i = 0; i < nodes.length; i++) {
    callback.call(window, nodes[i], i, nodes)
  }
}

/**
 * Find an elements next sibling
 *
 * Utility function to find an elements next sibling matching the provided
 * selector.
 *
 * @param {HTMLElement} element - Element to find siblings for
 * @param {string} selector - selector for required sibling
 */
MOJFrontend.getNextSibling = function (element, selector) {
  // Get the next sibling element
  let $sibling = element.nextElementSibling

  // If there's no selector, return the first sibling
  if (!selector) return $sibling

  // If the sibling matches our selector, use it
  // If not, jump to the next sibling and continue the loop
  while ($sibling) {
    if ($sibling.matches(selector)) return $sibling
    $sibling = $sibling.nextElementSibling
  }
}

/**
 * Find an elements preceding sibling
 *
 * Utility function to find an elements previous sibling matching the provided
 * selector.
 *
 * @param {HTMLElement} element - Element to find siblings for
 * @param {string} selector - selector for required sibling
 */
MOJFrontend.getPreviousSibling = function (element, selector) {
  // Get the previous sibling element
  let $sibling = element.previousElementSibling

  // If there's no selector, return the first sibling
  if (!selector) return $sibling

  // If the sibling matches our selector, use it
  // If not, jump to the next sibling and continue the loop
  while ($sibling) {
    if ($sibling.matches(selector)) return $sibling
    $sibling = $sibling.previousElementSibling
  }
}

MOJFrontend.findNearestMatchingElement = function ($element, selector) {
  // If no element or selector is provided, return null
  if (!$element) return null
  if (!selector) return null

  // Start with the current element
  let $currentElement = $element

  while ($currentElement) {
    // First check the current element
    if ($currentElement.matches(selector)) {
      return $currentElement
    }

    // Check all previous siblings
    let $sibling = $currentElement.previousElementSibling
    while ($sibling) {
      // Check if the sibling itself is a heading
      if ($sibling.matches(selector)) {
        return $sibling
      }
      $sibling = $sibling.previousElementSibling
    }

    // If no match found in siblings, move up to parent
    $currentElement = $currentElement.parentElement
  }

  // Return null if no match is found
  return null
}

/**
 * Move focus to element
 *
 * Sets tabindex to -1 to make the element programmatically focusable,
 * but removes it on blur as the element doesn't need to be focused again.
 *
 * @param {HTMLElement} $element - HTML element
 * @param {object} [options] - Handler options
 * @param {function(this: HTMLElement): void} [options.onBeforeFocus] - Callback before focus
 * @param {function(this: HTMLElement): void} [options.onBlur] - Callback on blur
 */
MOJFrontend.setFocus = function ($element, options = {}) {
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
    if (options.onBlur) {
      options.onBlur.call($element)
    }

    if (!isFocusable) {
      $element.removeAttribute('tabindex')
    }
  }

  // Add listener to reset element on blur, after focus
  $element.addEventListener('focus', onFocus, { once: true })

  // Focus element
  if (options.onBeforeFocus) {
    options.onBeforeFocus.call($element)
  }
  $element.focus()
}
