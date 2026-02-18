import { ConfigurableComponent } from 'govuk-frontend'

import { setFocus } from '../../common/index.mjs'

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

    const $item = this.getNewItem()
    console.log($item)

    // if (!$item || !($item instanceof HTMLElement)) {
    //   return
    // }

    // this.resetItem($item)

    this.$itemsContainer.appendChild($item)

    const $items = this.getItems()
    this.updateAllItems()
    const $lastItem = $items[$items.length - 1]

    // focus first input
    // const $input = $lastItem.querySelector('input, textarea, select')
    // if ($input && $input instanceof HTMLInputElement) {
    //   setTimeout(() => {
    //     $input.focus()
    //   }, 100)
    // }

    // focus legend
    // const $legend = $lastItem.querySelector('legend')
    // if ($legend && $legend instanceof HTMLElement) {
    //   console.log('setting focus on legend')
    //   setTimeout(() => {
    //     setFocus($legend)
    //   }, 100)
    // }

    // focus fieldset
    if ($lastItem && $lastItem instanceof HTMLElement) {
      console.log('setting focus on fieldset')
      setTimeout(() => {
        setFocus($lastItem)
      }, 100)
    }

    // Focus on new item legend
    // const $legend = $item.querySelector('legend')
    // setFocus($lastItem)
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

    $items.forEach(($item, index, items) => {
      this.updateIndexes($item, index, items.length)
      this.updateLegends($item, index, items.length)
      this.updateRemoveButtons($item, index, items.length)
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

      // const labelText = $input.getAttribute('data-label') || ''

      const $label = $input.closest('.govuk-form-group').querySelector('label')
      if ($label && $label instanceof HTMLLabelElement) {
        // const $labelhiddenText = $label.querySelector(
        //   'span.govuk-visually-hidden:not(.moj-add-another__label-suffix)'
        // )
        let $labelSuffix = $label.querySelector(
          '.moj-add-another__label-suffix'
        )
        console.log($labelSuffix)
        if (!$labelSuffix) {
          console.log('no suffix adding one')
          $labelSuffix = document.createElement('span')
          $labelSuffix.classList.add(
            'moj-add-another__label-suffix',
            'govuk-visually-hidden'
          )
          $label.appendChild($labelSuffix)
        }
        $labelSuffix.innerText = ` for ${this.config.itemLabel.toLowerCase()} ${index + 1}`
      }
    })
  }

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

    const counterId = this.generateUniqueId()
    let $counter = $item.querySelector(`.moj-add-another__item-counter`)

    if ($counter) {
      $counter.innerText = `${suffix}`
    } else {
      $counter = document.createElement('span')
      $counter.classList.add(
        'govuk-visually-hidden',
        'moj-add-another__item-counter'
      )
      $counter.id = `${counterId}`
      $counter.innerText = `${suffix}`
      $item.prepend($counter)
      $item.setAttribute(
        'aria-labelledby',
        `${$item.getAttribute('aria-labelledby')} ${counterId}`
      )
    }
  }

  updateRemoveButtons($item, index, itemsCount) {
    const $button = $item.querySelector('.moj-add-another__remove-button')
    const label = this.removeButtonLabel(
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
   * @param {HTMLElement|DocumentFragment} $item - Add another item
   */
  createRemoveButton($item, label = 'Remove') {
    const $buttonContainer = $item.querySelector(
      '.moj-add-another__remove-button-container'
    )
    const $button = document.createElement('button')
    $button.type = 'button'
    $button.classList.add(
      'govuk-button',
      'govuk-button--secondary',
      'moj-add-another__remove-button'
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

  removeButtonLabel(labelIndex) {
    console.log(this.config.layout)
    if (this.config.layout === 'block') {
      return `Remove ${labelIndex}`
    }

    if (this.config.layout === 'inline') {
      return `Remove <span class="govuk-visually-hidden">${labelIndex}</span>`
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

    const $itemToRemove = $button.closest('fieldset')

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
    this.updateAllItems()
    if ($itemToFocus instanceof HTMLElement) {
      setFocus($itemToFocus)
    }
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
   * Creates a valid HTML id from a string
   *
   * @param {string} str - string to turn into an id
   */
  createHtmlId(str) {
    return str
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9_-]/g, '-') // Replace invalid chars with hyphen
      .replace(/^[0-9-]/, '_$&') // If starts with digit/hyphen, prefix with underscore
      .replace(/-+/g, '-') // Collapse multiple hyphens
      .replace(/^-|-$/g, '') // Remove leading/trailing hyphens
  }

  generateUniqueId(prefix = 'moj') {
    return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
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
