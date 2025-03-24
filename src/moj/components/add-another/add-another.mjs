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
    if (!(button instanceof HTMLButtonElement)) {
      return
    }

    button.type = 'button'
  })
}

AddAnother.prototype.onAddButtonClick = function (event) {
  const button = event.target

  if (
    !button ||
    !(button instanceof HTMLButtonElement) ||
    !button.classList.contains('moj-add-another__add-button')
  ) {
    return
  }

  const items = this.getItems()
  const item = this.getNewItem()

  if (!item || !(item instanceof HTMLElement)) {
    return
  }

  this.updateAttributes(item, items.length)
  this.resetItem(item)

  const firstItem = items[0]
  if (!this.hasRemoveButton(firstItem)) {
    this.createRemoveButton(firstItem)
  }

  items[items.length - 1].after(item)

  const input = item.querySelector('input, textarea, select')
  if (input && input instanceof HTMLInputElement) {
    input.focus()
  }
}

AddAnother.prototype.hasRemoveButton = function (item) {
  return item.querySelectorAll('.moj-add-another__remove-button').length
}

AddAnother.prototype.getItems = function () {
  if (!this.container) {
    return []
  }

  const items = Array.from(
    this.container.querySelectorAll('.moj-add-another__item')
  )

  return items.filter((item) => item instanceof HTMLElement)
}

AddAnother.prototype.getNewItem = function () {
  const items = this.getItems()
  const item = items[0].cloneNode(true)

  if (!item || !(item instanceof HTMLElement)) {
    return
  }

  if (!this.hasRemoveButton(item)) {
    this.createRemoveButton(item)
  }

  return item
}

AddAnother.prototype.updateAttributes = function (item, index) {
  item.querySelectorAll('[data-name]').forEach((el) => {
    if (!(el instanceof HTMLInputElement)) {
      return
    }

    const name = el.getAttribute('data-name') || ''
    const id = el.getAttribute('data-id') || ''
    const originalId = el.id

    el.name = name.replace(/%index%/, `${index}`)
    el.id = id.replace(/%index%/, `${index}`)

    const label =
      el.parentElement.querySelector('label') ||
      el.closest('label') ||
      item.querySelector(`[for="${originalId}"]`)

    if (label && label instanceof HTMLLabelElement) {
      label.htmlFor = el.id
    }
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
  item.querySelectorAll('[data-name], [data-id]').forEach((el) => {
    if (!(el instanceof HTMLInputElement)) {
      return
    }

    if (el.type === 'checkbox' || el.type === 'radio') {
      el.checked = false
    } else {
      el.value = ''
    }
  })
}

AddAnother.prototype.onRemoveButtonClick = function (event) {
  const button = event.target

  if (
    !button ||
    !(button instanceof HTMLButtonElement) ||
    !button.classList.contains('moj-add-another__remove-button')
  ) {
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
  const heading = this.container.querySelector('.moj-add-another__heading')

  if (heading && heading instanceof HTMLElement) {
    heading.focus()
  }
}
