import { ConfigurableComponent } from 'govuk-frontend'

import { setFocus, emitEvent, generateUniqueId } from '../../common/index.mjs'

/**
 * @augments {ConfigurableComponent<AddAnotherConfig>}
 */
export class AddAnother extends ConfigurableComponent {
  /** @private */
  itemTemplateClass = 'moj-add-another__item-template'

  /** @private */
  itemsContainerClass = 'moj-add-another__items'

  /** @private */
  itemClass = 'moj-add-another__item'

  /** @private */
  removeButtonContainerClass = 'moj-add-another__remove-button-container'

  /** @private */
  removeButtonClass = 'moj-add-another__remove-button'

  /** @private */
  addButtonClass = 'moj-add-another__add-button'

  /** @private */
  labelSuffixClass = 'moj-add-another__label-suffix'

  /** @private */
  itemCounterClass = 'moj-add-another__item-counter'

  /** @private */
  itemAddedEvent = 'add-item'

  /** @private */
  itemRemovedEvent = 'remove-item'

  /** @private */
  $items

  /**
   * Add another component
   *
   * Allows for a section of a form to be duplicated to allow users to add
   * multiple entries for a set of fields. For example, adding multiple
   * addresses.
   *
   * @param {Element | null} $root - HTML element to use for add another
   * @param {AddAnotherConfig} [config] - Add another config
   */
  constructor($root, config = {}) {
    super($root, config)

    const $itemTemplate = this.$root.querySelector(`.${this.itemTemplateClass}`)
    const $itemsContainer = this.$root.querySelector(
      `.${this.itemsContainerClass}`
    )
    const $items = this.getItems()

    if (
      !($itemTemplate instanceof HTMLTemplateElement) ||
      !($itemsContainer instanceof HTMLElement)
    ) {
      return
    }

    this.$itemTemplate = $itemTemplate
    this.$itemsContainer = $itemsContainer
    this.$items = $items

    this.initButtons()
    this.updateAllItems()

    this.$root.addEventListener('click', (event) =>
      this.onRemoveButtonClick(event)
    )
    this.$root.addEventListener('click', (event) =>
      this.onAddButtonClick(event)
    )
  }

  /**
   * Ensure buttons have type="button" to prevent form submission when clicked
   */
  initButtons() {
    const $buttons = this.$root.querySelectorAll(
      `.${this.addButtonClass}, .${this.removeButtonClass}`
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
    event.preventDefault()

    const $button = event.target

    if (
      !$button ||
      !($button instanceof HTMLButtonElement) ||
      !$button.classList.contains(`${this.addButtonClass}`)
    ) {
      return
    }

    const $item = this.getNewItem()
    if (!$item || !($item instanceof DocumentFragment)) {
      return
    }

    this.$itemsContainer.appendChild($item)
    this.updateAllItems()
    const $lastItem = this.$items[this.$items.length - 1]

    // Place focus on the added item
    if ($lastItem && $lastItem instanceof HTMLFieldSetElement) {
      emitEvent($lastItem, AddAnother, this.itemAddedEvent)
      console.log('setting focus on fieldset')
      setTimeout(() => {
        setFocus($lastItem)
      }, 100)
    }
  }

  /**
   * @param {Element | DocumentFragment} $item - Add another item
   */
  hasRemoveButton($item) {
    return $item.querySelectorAll('.moj-add-another__remove-button').length
  }

  /**
   * Get all add another items
   *
   * @returns {Element[]} Array of add another items
   */
  getItems() {
    if (!this.$root) {
      return []
    }

    const $items = Array.from(this.$root.querySelectorAll(`.${this.itemClass}`))

    return $items.filter((item) => item instanceof HTMLElement)
  }

  getNewItem() {
    const $item = document.importNode(this.$itemTemplate.content, true)

    if (!$item) {
      return
    }

    if (!this.hasRemoveButton($item)) {
      this.createRemoveButton($item)
    }

    return $item
  }

  updateAllItems(action = '') {
    this.$items = this.getItems()

    this.$items.forEach(($item, index, items) => {
      this.updateIndexes($item, index)
      this.updateLegends($item, index, items.length)
      this.updateRemoveButtons($item, index, items.length)
      this.updateFieldLabels($item, index)
      this.updateGroupedFieldLegends($item, index)
      if (action === 'remove') {
        this.updateErrorMessages($item, index)
      }
    })
  }

  /**
   * Updates the name and id attributes of inputs within an item, as well as
   * their associated labels, to reflect the current index of the item.
   *
   * @param {Element} $item - Add another item
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

  /**
   * Updates the id attributes of error messages associated with inputs within
   * an item, as well as the aria-describedby attributes of the inputs, to
   * reflect the current index of the item.
   *
   * @param {Element} $item - Add another item
   * @param {number} index - Add another item index
   */
  updateErrorMessages($item, index) {
    $item.querySelectorAll('[data-name]').forEach(($input) => {
      if (!this.isValidInputElement($input)) {
        return
      }

      const $errorMessage = $input.parentElement?.querySelector(
        '.govuk-error-message'
      )
      if (!$errorMessage || !($errorMessage instanceof HTMLElement)) {
        return
      }

      const id = $input.getAttribute('data-id') || ''
      const originalErrorMessageId = $errorMessage.id

      const newErrorMessageId = `${id.replace(/%index%/, `${index}`)}-error`
      $errorMessage.id = newErrorMessageId

      const describedBy = $input.getAttribute('aria-describedby') || ''
      const newDescribedBy = describedBy
        .split(' ')
        .map((desc) =>
          desc === originalErrorMessageId ? newErrorMessageId : desc
        )
        .join(' ')

      $input.setAttribute('aria-describedby', newDescribedBy)
    })
  }

  /**
   * Updates the text of labels associated with inputs within an item to have
   * visually hidden text appended that reflects the current index of the item.
   *
   * @param {Element} $item - Add another item
   * @param {number} index - Add another item index
   */
  updateFieldLabels($item, index) {
    $item.querySelectorAll('[data-label]').forEach(($input) => {
      if (!this.isValidInputElement($input)) {
        return
      }

      const $label = $input.closest('.govuk-form-group').querySelector('label')
      if ($label && $label instanceof HTMLLabelElement) {
        let $labelSuffix = $label.querySelector(`.${this.labelSuffixClass}`)

        if (!$labelSuffix) {
          $labelSuffix = document.createElement('span')
          $labelSuffix.classList.add(
            `${this.labelSuffixClass}`,
            'govuk-visually-hidden'
          )
          $label.appendChild($labelSuffix)
        }

        $labelSuffix.innerHTML = ` for ${this.config.itemLabel.toLowerCase()} ${index + 1}`
      }
    })
  }

  /**
   * Updates the text of legends within an item to have visually hidden text
   * appended that reflects the current index of the item, for grouped fields
   * that contain multiple inputs (e.g. date inputs, radio button and checkbox groups).
   *
   * @param {Element} $item - Add another item
   * @param {number} index - Add another item index
   */
  updateGroupedFieldLegends($item, index) {
    $item.querySelectorAll('[data-legend]').forEach(($fieldset) => {
      if (!($fieldset instanceof HTMLFieldSetElement)) {
        return
      }

      const labelText = $fieldset.getAttribute('data-legend') || ''

      const $legend = $fieldset.querySelector('legend')

      if ($legend && $legend instanceof HTMLLegendElement) {
        $legend.innerHTML = `${labelText}<span class="govuk-visually-hidden">for ${this.config.itemLabel.toLowerCase()} ${index + 1}</span>`
      }
    })
  }

  /**
   * Updates the text of legends within an item to reflect the current index of
   * the item and the total number of items to ensue unique accessible names.
   *
   * If there is no legend, a visually hidden span is added to the start of the
   * item and the aria-labelledby attribute of the item is updated to reference
   * it.
   *
   * @param {Element} $item - Add another item
   * @param {number} index - Add another item index
   * @param {number} itemsCount - Total number of items
   */
  updateLegends($item, index, itemsCount) {
    const $legend = $item.querySelector('legend')
    let suffix = ''

    if (itemsCount === 1) {
      suffix = `${index + 1}`
    } else {
      suffix = `${index + 1} of ${itemsCount}`
    }

    if ($legend) {
      $legend.innerText = `${this.config.itemLabel} ${suffix}`
      return
    }

    const counterId = generateUniqueId()
    let $counter = $item.querySelector(`.${this.itemCounterClass}`)

    if ($counter && $counter instanceof HTMLElement) {
      $counter.innerHTML = `${suffix}`
    } else {
      $counter = document.createElement('span')
      $counter.classList.add(
        'govuk-visually-hidden',
        `${this.itemCounterClass}`
      )
      $counter.id = `${counterId}`
      $counter.innerHTML = `${suffix}`
      $item.prepend($counter)
      $item.setAttribute(
        'aria-labelledby',
        `${$item.getAttribute('aria-labelledby')} ${counterId}`
      )
    }
  }

  /**
   * Updates the text of remove buttons within an item to reflect the current
   * index of the item to ensure unique accessible names.
   * If there is only one item remaining, the remove button is removed.
   *
   * @param {Element} $item - Add another item
   * @param {number} index - Add another item index
   * @param {number} itemsCount - Total number of items
   */
  updateRemoveButtons($item, index, itemsCount) {
    const $button = $item.querySelector(`.${this.removeButtonClass}`)
    const label = this.removeButtonLabelText(
      `${this.config.itemLabel} ${index + 1}`
    )
    console.log(label)

    if (!$button || !($button instanceof HTMLButtonElement)) {
      console.log('no button')
      console.log({ itemsCount, index })
      if (itemsCount > 1 && index === 0) {
        console.log('creating remove button for first item')
        this.createRemoveButton($item, label)
      }
      return
    }

    if (itemsCount === 1 && index === 0) {
      $button.remove()
    } else {
      $button.innerHTML = label
    }
  }

  /**
   * Creates a remove button for an item if it doesn't already exist, and
   * adds it to the item.
   *
   * @param {Element|DocumentFragment} $item - Add another item
   */
  createRemoveButton($item, label = 'Remove') {
    const $buttonContainer = $item.querySelector(
      `.${this.removeButtonContainerClass}`
    )
    const $button = document.createElement('button')
    $button.type = 'button'
    $button.classList.add(
      'govuk-button',
      'govuk-button--secondary',
      `${this.removeButtonClass}`
    )
    $button.innerHTML = label

    if ($buttonContainer && $buttonContainer instanceof HTMLElement) {
      $buttonContainer.appendChild($button)
    } else if ($item instanceof DocumentFragment) {
      $item.firstElementChild.appendChild($button)
    } else {
      $item.appendChild($button)
    }
  }

  /**
   * Generates the label text for the remove button based on the layout
   * configuration.
   *
   * @param {string} labelIndex - the index to include in the remove button label
   * @returns {string} the label for the remove button based on the layout configuration
   */
  removeButtonLabelText(labelIndex) {
    console.log(this.config.layout)
    if (this.config.layout === 'inline') {
      return `Remove <span class="govuk-visually-hidden">${labelIndex}</span>`
    }

    return `Remove ${labelIndex}`
  }

  /**
   * Handles click events on remove buttons within items.
   *
   * @param {MouseEvent} event - Click event
   */
  onRemoveButtonClick(event) {
    const $button = event.target

    if (
      !$button ||
      !($button instanceof HTMLButtonElement) ||
      !$button.classList.contains(`${this.removeButtonClass}`)
    ) {
      return
    }

    const $itemToRemove = $button.closest(`.${this.itemClass}`)

    if (!$itemToRemove || !($itemToRemove instanceof HTMLFieldSetElement)) {
      return
    }

    let $itemToFocus = $itemToRemove.previousElementSibling

    // Should we get the next element?
    if (!$itemToFocus || !($itemToFocus instanceof HTMLFieldSetElement)) {
      $itemToFocus = $itemToRemove.nextElementSibling
    }
    // focus on root of component?
    // it needs an accessible name?
    if (!$itemToFocus || !($itemToFocus instanceof HTMLFieldSetElement)) {
      $itemToFocus = this.$root
    }

    $itemToRemove.remove()
    this.updateAllItems('remove')
    emitEvent(this.$root, AddAnother, this.itemRemovedEvent)
    if ($itemToFocus instanceof HTMLElement) {
      setFocus($itemToFocus)
    }
  }

  /**
   * Checks if an element is a valid input element (input, select, or textarea).
   *
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
    layout: 'block'
  })

  /**
   * Date picker config schema
   *
   * @satisfies {Schema<AddAnotherConfig>}
   */
  static schema = Object.freeze(
    /** @type {const} */ ({
      properties: {
        itemLabel: { type: 'string' },
        layout: { type: 'string' }
      }
    })
  )
}

/**
 * @typedef {"block"|"inline"} AddAnotherLayout
 */

/**
 * Add another config
 *
 * @typedef {object} AddAnotherConfig
 * @property {string} [itemLabel] - Label for each fieldset
 * @property {AddAnotherLayout} [layout] - layout style for fields
 */

/**
 * @import { Schema } from 'govuk-frontend/dist/govuk/common/configuration.mjs'
 */
