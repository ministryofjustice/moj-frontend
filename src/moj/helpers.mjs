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
