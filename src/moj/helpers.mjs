/**
 * @param {Element} $element - Element to remove attribute value from
 * @param {string} attr - Attribute name
 * @param {string} value - Attribute value
 */
export function removeAttributeValue($element, attr, value) {
  let re, m
  if ($element.getAttribute(attr)) {
    if ($element.getAttribute(attr) === value) {
      $element.removeAttribute(attr)
    } else {
      re = new RegExp(`(^|\\s)${value}(\\s|$)`)
      m = $element.getAttribute(attr).match(re)
      if (m && m.length === 3) {
        $element.setAttribute(
          attr,
          $element.getAttribute(attr).replace(re, m[1] && m[2] ? ' ' : '')
        )
      }
    }
  }
}

/**
 * @param {Element} $element - Element to add attribute value to
 * @param {string} attr - Attribute name
 * @param {string} value - Attribute value
 */
export function addAttributeValue($element, attr, value) {
  let re
  if (!$element.getAttribute(attr)) {
    $element.setAttribute(attr, value)
  } else {
    re = new RegExp(`(^|\\s)${value}(\\s|$)`)
    if (!re.test($element.getAttribute(attr))) {
      $element.setAttribute(attr, `${$element.getAttribute(attr)} ${value}`)
    }
  }
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
