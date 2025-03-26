export function removeAttributeValue(el, attr, value) {
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

export function addAttributeValue(el, attr, value) {
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

export function dragAndDropSupported() {
  const div = document.createElement('div')
  return typeof div.ondrop !== 'undefined'
}

export function formDataSupported() {
  return typeof FormData === 'function'
}

export function fileApiSupported() {
  const input = document.createElement('input')
  input.type = 'file'
  return typeof input.files !== 'undefined'
}

/**
 * Find an elements next sibling
 *
 * Utility function to find an elements next sibling matching the provided
 * selector.
 *
 * @param {Element | null} $element - Element to find siblings for
 * @param {string} [selector] - selector for required sibling
 */
export function getNextSibling($element, selector) {
  if (!$element || !($element instanceof HTMLElement)) {
    return
  }

  // Get the next sibling element
  let $sibling = $element.nextElementSibling

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
 * @param {Element | null} $element - Element to find siblings for
 * @param {string} [selector] - selector for required sibling
 */
export function getPreviousSibling($element, selector) {
  if (!$element || !($element instanceof HTMLElement)) {
    return
  }

  // Get the previous sibling element
  let $sibling = $element.previousElementSibling

  // If there's no selector, return the first sibling
  if (!selector) return $sibling

  // If the sibling matches our selector, use it
  // If not, jump to the next sibling and continue the loop
  while ($sibling) {
    if ($sibling.matches(selector)) return $sibling
    $sibling = $sibling.previousElementSibling
  }
}

/**
 * @param {Element | null} $element
 * @param {string} [selector]
 */
export function findNearestMatchingElement($element, selector) {
  // If no element or selector is provided, return
  if (!$element || !($element instanceof HTMLElement) || !selector) {
    return
  }

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
}
