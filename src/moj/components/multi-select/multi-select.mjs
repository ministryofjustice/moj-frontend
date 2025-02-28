export class MultiSelect {
  constructor(options) {
    this.container = options.container

    if (this.container.hasAttribute('data-moj-multi-select-init')) {
      return this
    }

    this.container.setAttribute('data-moj-multi-select-init', '')

    const idPrefix = options.id_prefix
    this.setupToggle(idPrefix)

    this.toggleButton = this.toggle.querySelector('input')
    this.toggleButton.addEventListener('click', this.onButtonClick.bind(this))
    this.container.append(this.toggle)

    this.checkboxes = Array.from(options.checkboxes)
    this.checkboxes.forEach((el) =>
      el.addEventListener('click', this.onCheckboxClick.bind(this))
    )

    this.checked = options.checked || false
  }

  setupToggle(idPrefix = '') {
    const id = `${idPrefix}checkboxes-all`

    const toggle = document.createElement('div')
    const label = document.createElement('label')
    const input = document.createElement('input')
    const span = document.createElement('span')

    toggle.classList.add(
      'govuk-checkboxes__item',
      'govuk-checkboxes--small',
      'moj-multi-select__checkbox'
    )

    input.id = id
    input.type = 'checkbox'
    input.classList.add('govuk-checkboxes__input')

    label.setAttribute('for', id)
    label.classList.add(
      'govuk-label',
      'govuk-checkboxes__label',
      'moj-multi-select__toggle-label'
    )

    span.classList.add('govuk-visually-hidden')
    span.textContent = 'Select all'

    label.append(span)
    toggle.append(input, label)

    this.toggle = toggle
  }

  onButtonClick() {
    if (this.checked) {
      this.uncheckAll()
      this.toggleButton.checked = false
    } else {
      this.checkAll()
      this.toggleButton.checked = true
    }
  }

  checkAll() {
    this.checkboxes.forEach((el) => {
      el.checked = true
    })
    this.checked = true
  }

  uncheckAll() {
    this.checkboxes.forEach((el) => {
      el.checked = false
    })
    this.checked = false
  }

  onCheckboxClick(event) {
    if (!event.target.checked) {
      this.toggleButton.checked = false
      this.checked = false
    } else {
      if (
        this.checkboxes.filter((el) => el.checked).length ===
        this.checkboxes.length
      ) {
        this.toggleButton.checked = true
        this.checked = true
      }
    }
  }
}
