MOJFrontend.removeAttributeValue = function (el, attr, value) {
  let re, m
  if (el.getAttribute(attr)) {
    if (el.getAttribute(attr) == value) {
      el.removeAttribute(attr)
    } else {
      re = new RegExp(`(^|\\s)${value}(\\s|$)`)
      m = el.getAttribute(attr).match(re)
      if (m && m.length == 3) {
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
