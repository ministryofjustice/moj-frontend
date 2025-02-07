/**
 * @param {HTMLElement} el
 * @param {string} attr
 * @param {string} expected
 */
export function removeAttributeValue(el, attr, expected) {
  const value = el.getAttribute(attr)

  if (value) {
    if (value === expected) {
      el.removeAttribute(attr)
    } else {
      const re = new RegExp(`(^|\\s)${expected}(\\s|$)`)
      const m = value.match(re)

      if (m && m.length === 3) {
        el.setAttribute(attr, value.replace(re, m[1] && m[2] ? ' ' : ''))
      }
    }
  }
}

/**
 * @param {HTMLElement} el
 * @param {string} attr
 * @param {string} expected
 */
export function addAttributeValue(el, attr, expected) {
  const value = el.getAttribute(attr)

  if (!value) {
    el.setAttribute(attr, expected)
  } else {
    const re = new RegExp(`(^|\\s)${expected}(\\s|$)`)

    if (!re.test(value)) {
      el.setAttribute(attr, `${value} ${expected}`)
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
 * @template {Node} ElementType
 * @param {NodeListOf<ElementType>} nodes - NodeList from querySelectorAll()
 * @param {nodeListIterator<ElementType>} callback - Callback function to run for each node
 */
export function nodeListForEach(nodes, callback) {
  if ('forEach' in window.NodeList.prototype) {
    return nodes.forEach(callback)
  }

  for (let i = 0; i < nodes.length; i++) {
    callback.call(window, nodes[i], i, nodes)
  }
}

/**
 * @template {Node} ElementType
 * @callback nodeListIterator
 * @param {ElementType} value - The current node being iterated on
 * @param {number} index - The current index in the iteration
 * @param {NodeListOf<ElementType>} nodes - NodeList from querySelectorAll()
 * @returns {void}
 */
