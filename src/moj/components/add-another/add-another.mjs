import { ConfigurableComponent } from 'govuk-frontend'
/**
 * @augments {ConfigurableComponent<AddAnotherConfig>}
 */
export class AddAnother extends ConfigurableComponent {
  /**
   * @param {Element | null} $root - HTML element to use for add another
   * @param {AddAnotherConfig} [config] - Add another config
   */
  constructor($root, config = {}) {
    super($root, config)
    console.log('add another constructor')
    console.log(this.config)
    this.$itemTemplate = this.$root.querySelector(
      '.moj-add-another__item-template'
    )
    this.$removeButtonTemplate = this.$root.querySelector(
      '.moj-add-another__remove-button-template'
    )
    this.$itemsContainer = this.$root.querySelector('.moj-add-another__items')

    console.log(this.$itemTemplate)
    console.log(this.$itemsContainer)

    if (!(this.$itemTemplate instanceof HTMLTemplateElement)) {
      return
    }

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

    this.updateAllItems()
  }

  /**
   * @param {MouseEvent} event - Click event
   */
  onAddButtonClick(event) {
    event.preventDefault()
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
    console.log($items)
    console.log($item)

    // if (!$item || !($item instanceof HTMLElement)) {
    //   return
    // }

    // this.resetItem($item)

    this.$itemsContainer.appendChild($item)

    this.updateAllItems()
    // const $lastItem = $items[$items.length - 1]
    // if (!this.hasRemoveButton($lastItem)) {
    //   this.createRemoveButton($lastItem)
    // }

    // $items[$items.length - 1].after($item)

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
      this.$root.querySelectorAll('.moj-add-another__items > fieldset')
    )

    return $items.filter((item) => item instanceof HTMLElement)
  }

  getNewItem() {
    const $item = document.importNode(this.$itemTemplate.content, true)
    console.log($item)

    if (!$item) {
      return
    }

    if (!this.hasRemoveButton($item)) {
      this.createRemoveButton($item)
    }

    return $item
  }

  updateAllItems() {
    const $items = this.getItems()
    const $firstItem = $items[0]

    if ($items.length === 1) {
      $firstItem.querySelector('.moj-add-another__remove-button')?.remove()
    }

    if ($items.length > 1 && !this.hasRemoveButton($firstItem)) {
      this.createRemoveButton($firstItem)
    }

    $items.forEach(($item, index, items) => {
      this.updateIndexes($item, $items.length)
      this.updateLegends($item, index, items.length)
      this.updateRemoveButtons($item, index)
      this.updateFieldLabels($item, index)
      this.updateGroupedFieldLegends($item, index)
    })
  }

  /**
   * @param {HTMLElement} $item - Add another item
   * @param {number} index - Add another item index
   */
  updateIndexes($item, index) {
    $item.querySelectorAll('[data-name]').forEach(($input) => {
      if (!this.isValidInputElement($input)) {
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

  updateFieldLabels($item, index) {
    $item.querySelectorAll('[data-label]').forEach(($input) => {
      if (!this.isValidInputElement($input)) {
        return
      }

      const labelText = $input.getAttribute('data-label') || ''

      const $label =
        $input.parentElement.querySelector('label') || $input.closest('label')

      if ($label && $label instanceof HTMLLabelElement) {
        $label.innerText = `${labelText} for ${this.config.legendLabel.toLowerCase()} ${index + 1}`
      }
    })
  }

  updateGroupedFieldLegends($item, index) {
    $item.querySelectorAll('[data-legend]').forEach(($fieldset) => {
      if ((!$fieldset) instanceof HTMLFieldSetElement) {
        return
      }

      const labelText = $fieldset.getAttribute('data-legend') || ''

      const $legend = $fieldset.querySelector('legend')

      if ($legend && $legend instanceof HTMLLegendElement) {
        $legend.innerText = `${labelText} for ${this.config.legendLabel.toLowerCase()} ${index + 1}`
      }
    })
  }

  updateLegends($item, index, itemsCount) {
    const legend = $item.querySelector('legend')

    if (itemsCount === 1) {
      legend.innerText = `${this.config.legendLabel} ${index + 1}`
    } else {
      legend.innerText = `${this.config.legendLabel} ${index + 1} of ${itemsCount}`
    }
  }

  updateRemoveButtons($item, index) {
    const button = $item.querySelector('.moj-add-another__remove-button')

    if (button && button instanceof HTMLButtonElement) {
      button.innerText = `Remove ${this.config.legendLabel} ${index + 1}`
    }
  }

  /**
   * @param {HTMLElement|DocumentFragment} $item - Add another item
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

    if ($item instanceof DocumentFragment) {
      console.log($item.firstElementChild)
      $item.firstElementChild.append($button)
    } else {
      $item.append($button)
    }
  }

  /**
   * @param {HTMLElement} $item - Add another item
   */
  resetItem($item) {
    $item.querySelectorAll('[data-name], [data-id]').forEach(($input) => {
      if (!this.isValidInputElement($input)) {
        return
      }

      if ($input instanceof HTMLSelectElement) {
        $input.selectedIndex = -1
        $input.value = ''
      } else if ($input instanceof HTMLTextAreaElement) {
        $input.value = ''
      } else {
        switch ($input.type) {
          case 'checkbox':
          case 'radio':
            $input.checked = false
            break
          default:
            $input.value = ''
        }
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

    $button.closest('fieldset').remove()

    const $items = this.getItems()

    this.updateAllItems()

    this.focusHeading()
  }

  focusHeading() {
    const $heading = this.$root.querySelector('.moj-add-another__heading')

    if ($heading && $heading instanceof HTMLElement) {
      $heading.focus()
    }
  }

  /**
   * @param {Element} $input - the input to validate
   */
  isValidInputElement($input) {
    return (
      $input instanceof HTMLInputElement ||
      $input instanceof HTMLSelectElement ||
      $input instanceof HTMLTextAreaElement
    )
  }

  /**
   * Name for the component used when initialising using data-module attributes.
   */
  static moduleName = 'moj-add-another'
  /**
   * Add another default config
   *
   * @type {AddAnotherConfig}
   */
  static defaults = Object.freeze({
    legendFormat: '%label% %index% of %total%'
  })

  /**
   * Date picker config schema
   *
   * @satisfies {Schema<AddAnotherConfig>}
   */
  static schema = Object.freeze(
    /** @type {const} */ ({
      properties: {
        legendLabel: { type: 'string' },
        legendFormat: { type: 'string' }
      }
    })
  )
}
/**
 * Add another config
 *
 * @typedef {object} AddAnotherConfig
 * @property {string} [legendLabel] - Label for each fieldset
 * @property {string} [legendFormat] - Format for fieldset legends
 */

/**
 * @import { Schema } from 'govuk-frontend/dist/govuk/common/configuration.mjs'
 */
