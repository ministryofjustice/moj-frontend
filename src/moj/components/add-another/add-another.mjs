export function AddAnother(container) {
  this.container = container

  if (this.container.hasAttribute('data-moj-add-another-init')) {
    return
  }

  this.container.setAttribute('data-moj-add-another-init', '')

  this.container.addEventListener('click', this.onRemoveButtonClick.bind(this))
  this.container.addEventListener('click', this.onAddButtonClick.bind(this))

  const buttons = this.container.querySelectorAll(
    '.moj-add-another__add-button, moj-add-another__remove-button'
  )

  buttons.forEach((button) => {
    button.type = 'button'
  })
}

AddAnother.prototype.onAddButtonClick = function (event) {
  const button = event.target

  if (!button || !button.classList.contains('moj-add-another__add-button')) {
    return
  }

  const items = this.getItems()
  const item = this.getNewItem()

  this.updateAttributes(item, items.length)
  this.resetItem(item)

  const firstItem = items[0]
  if (!this.hasRemoveButton(firstItem)) {
    this.createRemoveButton(firstItem)
  }

  items[items.length - 1].after(item)
  item.querySelectorAll('input, textarea, select')[0].focus()
}

AddAnother.prototype.hasRemoveButton = function (item) {
  return item.querySelectorAll('.moj-add-another__remove-button').length
}

AddAnother.prototype.getItems = function () {
  return this.container.querySelectorAll('.moj-add-another__item')
}

AddAnother.prototype.getNewItem = function () {
  const items = this.getItems()
  const item = items[0].cloneNode(true)

  if (!this.hasRemoveButton(item)) {
    this.createRemoveButton(item)
  }

  return item
}

AddAnother.prototype.updateAttributes = function (item, index) {
  item.querySelectorAll('[data-name]').forEach(function (el) {
    const originalId = el.id

    el.name = el.getAttribute('data-name').replace(/%index%/, index)
    el.id = el.getAttribute('data-id').replace(/%index%/, index)

    const label =
      el.parentNode.querySelector('label') ||
      el.closest('label') ||
      item.querySelector(`[for="${originalId}"]`)

    label.htmlFor = el.id
  })
}

AddAnother.prototype.createRemoveButton = function (item) {
  const button = document.createElement('button')
  button.type = 'button'

  button.classList.add(
    'govuk-button',
    'govuk-button--secondary',
    'moj-add-another__remove-button'
  )

  button.textContent = 'Remove'

  item.append(button)
}

AddAnother.prototype.resetItem = function (item) {
  item.querySelectorAll('[data-name], [data-id]').forEach(function (el) {
    if (el.type === 'checkbox' || el.type === 'radio') {
      el.checked = false
    } else {
      el.value = ''
    }
  })
}

AddAnother.prototype.onRemoveButtonClick = function (event) {
  const button = event.target

  if (!button || !button.classList.contains('moj-add-another__remove-button')) {
    return
  }

  button.closest('.moj-add-another__item').remove()

  const items = this.getItems()

  if (items.length === 1) {
    items[0].querySelector('.moj-add-another__remove-button').remove()
  }

  items.forEach((el, index) => {
    this.updateAttributes(el, index)
  })

  this.focusHeading()
}

AddAnother.prototype.focusHeading = function () {
  this.container.querySelector('.moj-add-another__heading').focus()
}
