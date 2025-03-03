import $ from 'jquery'

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

export function nodeListForEach(nodes, callback) {
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
 * @param {HTMLElement} $element - Element to find siblings for
 * @param {string} selector - selector for required sibling
 */
export function getNextSibling($element, selector) {
  if (!$element) return
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
 * @param {HTMLElement} $element - Element to find siblings for
 * @param {string} selector - selector for required sibling
 */
export function getPreviousSibling($element, selector) {
  if (!$element) return
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

export function findNearestMatchingElement($element, selector) {
  // If no element or selector is provided, return null
  if (!$element) return
  if (!selector) return

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

export function AddAnotherForm(container) {
  this.container = $(container)

  if (this.container.data('moj-add-another-initialised')) {
    console.log('AddAnotherForm already initialised for this container.')
    return
  }

  console.log('Initialising AddAnotherForm for container:', container)
  this.container.data('moj-add-another-initialised', true)

  this.container.on('click', '.moj-add-another__remove-button', (e) =>
    this.onRemoveButtonClick(e)
  )
  this.container.on('click', '.moj-add-another__add-button', (e) =>
    this.onAddButtonClick(e)
  )
  this.container
    .find('.moj-add-another__add-button, .moj-add-another__remove-button')
    .prop('type', 'button')

  this.container.on('click', '[data-add-another]', (e) =>
    this.onAddAnotherButtonClick(e)
  )
}

AddAnotherForm.prototype.onAddAnotherButtonClick = function (e) {
  const button = $(e.currentTarget)
  console.log('AddAnother button clicked:', button)
  const form = button.closest('form')

  // Add hidden input to indicate we want another page
  if (form.find('input[name="addAnother"]').length === 0) {
    form.append('<input type="hidden" name="addAnother" value="true">')
    console.log('Hidden input added to form.')
  } else {
    console.log('Hidden input already exists in form.')
  }
}
