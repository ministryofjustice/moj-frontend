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

MOJFrontend.AddAnotherForm = function (container) {
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

MOJFrontend.AddAnotherForm.prototype.onAddAnotherButtonClick = function (e) {
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
