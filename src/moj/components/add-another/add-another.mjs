export class AddAnother {
  /**
   * @param {Element | null} $root - HTML element to use for add another
   */
  constructor($root) {
    if (!$root || !($root instanceof HTMLElement)) {
      return this
    }

    this.$root = $root

    if (this.$root.hasAttribute('data-moj-add-another-init')) {
      return this
    }

    this.$root.setAttribute('data-moj-add-another-init', '')

    this.$root.addEventListener('click', this.onRemoveButtonClick.bind(this))
    this.$root.addEventListener('click', this.onAddButtonClick.bind(this))

    const $buttons = this.$root.querySelectorAll(
      '.moj-add-another__add-button, moj-add-another__remove-button'
    )

    $buttons.forEach(($button) => {
      if (!($button instanceof HTMLButtonElement)) {
        return
      }

      $button.type = 'button'
    })
  }

  /**
   * @param {MouseEvent} event - Click event
   */
  onAddButtonClick(event) {
    const $button = event.target

    if (
      !$button ||
      !($button instanceof HTMLButtonElement) ||
      !$button.classList.contains('moj-add-another__add-button')
    ) {
      return
    }

    const $items = this.getItems()
    const $item = this.getNewItem()

    if (!$item || !($item instanceof HTMLElement)) {
      return
    }

    this.updateAttributes($item, $items.length)
    this.resetItem($item)

    const $firstItem = $items[0]
    if (!this.hasRemoveButton($firstItem)) {
      this.createRemoveButton($firstItem)
    }

    $items[$items.length - 1].after($item)

    const $input = $item.querySelector('input, textarea, select')
    if ($input && $input instanceof HTMLInputElement) {
      $input.focus()
    }
  }

  /**
   * @param {HTMLElement} $item - Add another item
   */
  hasRemoveButton($item) {
    return $item.querySelectorAll('.moj-add-another__remove-button').length
  }

  getItems() {
    if (!this.$root) {
      return []
    }

    const $items = Array.from(
      this.$root.querySelectorAll('.moj-add-another__item')
    )

    return $items.filter((item) => item instanceof HTMLElement)
  }

  getNewItem() {
    const $items = this.getItems()
    const $item = $items[0].cloneNode(true)

    if (!$item || !($item instanceof HTMLElement)) {
      return
    }

    if (!this.hasRemoveButton($item)) {
      this.createRemoveButton($item)
    }

    return $item
  }

  /**
   * @param {HTMLElement} $item - Add another item
   * @param {number} index - Add another item index
   */
  updateAttributes($item, index) {
    $item.querySelectorAll('[data-name]').forEach(($input) => {
      if (!($input instanceof HTMLInputElement)) {
        return
      }

      const name = $input.getAttribute('data-name') || ''
      const id = $input.getAttribute('data-id') || ''
      const originalId = $input.id

      $input.name = name.replace(/%index%/, `${index}`)
      $input.id = id.replace(/%index%/, `${index}`)

      const $label =
        $input.parentElement.querySelector('label') ||
        $input.closest('label') ||
        $item.querySelector(`[for="${originalId}"]`)

      if ($label && $label instanceof HTMLLabelElement) {
        $label.htmlFor = $input.id
      }
    })
  }

  /**
   * @param {HTMLElement} $item - Add another item
   */
  createRemoveButton($item) {
    const $button = document.createElement('button')
    $button.type = 'button'

    $button.classList.add(
      'govuk-button',
      'govuk-button--secondary',
      'moj-add-another__remove-button'
    )

    $button.textContent = 'Remove'

    $item.append($button)
  }

  /**
   * @param {HTMLElement} $item - Add another item
   */
  resetItem($item) {
    $item.querySelectorAll('[data-name], [data-id]').forEach(($input) => {
      if (!($input instanceof HTMLInputElement)) {
        return
      }

      if ($input.type === 'checkbox' || $input.type === 'radio') {
        $input.checked = false
      } else {
        $input.value = ''
      }
    })
  }

  /**
   * @param {MouseEvent} event - Click event
   */
  onRemoveButtonClick(event) {
    const $button = event.target

    if (
      !$button ||
      !($button instanceof HTMLButtonElement) ||
      !$button.classList.contains('moj-add-another__remove-button')
    ) {
      return
    }

    $button.closest('.moj-add-another__item').remove()

    const $items = this.getItems()

    if ($items.length === 1) {
      $items[0].querySelector('.moj-add-another__remove-button').remove()
    }

    $items.forEach(($item, index) => {
      this.updateAttributes($item, index)
    })

    this.focusHeading()
  }

  focusHeading() {
    const $heading = this.$root.querySelector('.moj-add-another__heading')

    if ($heading && $heading instanceof HTMLElement) {
      $heading.focus()
    }
  }
}
