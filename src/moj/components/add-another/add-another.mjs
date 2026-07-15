import { ConfigurableComponent } from 'govuk-frontend'
import { I18n } from 'govuk-frontend/dist/govuk/i18n.mjs'

import {
  setFocus,
  emitEvent,
  closestAttributeValue
} from '../../common/index.mjs'

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
  fieldsetClass = 'moj-add-another__fieldset'

  /** @private */
  removeButtonContainerClass = 'moj-add-another__remove-button-container'

  /** @private */
  removeButtonClass = 'moj-add-another__remove-button'

  /** @private */
  addButtonClass = 'moj-add-another__add-button'

  /** @private */
  labelSuffixClass = 'moj-add-another__label-suffix'

  /** @private */
  newItemSuffixClass = 'moj-add-another__new-item-suffix'

  /** @private */
  itemAddedEvent = 'add-item'

  /** @private */
  itemRemovedEvent = 'remove-item'

  /** @private */
  itemResetEvent = 'reset-item'

  /** @private */
  templateCreatedEvent = 'create-template'

  /** @private */
  /** @type {HTMLElement[]} */
  $items

  /** @private */
  /** @type {HTMLTemplateElement} */
  $itemTemplate

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

    const $itemsContainer = this.$root.querySelector(
      `.${this.itemsContainerClass}`
    )

    if (!($itemsContainer instanceof HTMLElement)) {
      return
    }

    this.i18n = new I18n(this.config.i18n, {
      // Read the fallback if necessary rather than have it set in the defaults
      locale: closestAttributeValue(this.$root, 'lang')
    })

    this.$itemsContainer = $itemsContainer
    this.$items = this.getItems()

    this.initButtons()
    this.createTemplate()
    this.updateAllItems()

    this.$root.addEventListener('click', (event) =>
      this.onRemoveButtonClick(event)
    )
    this.$root.addEventListener('click', (event) =>
      this.onAddButtonClick(event)
    )
  }

  /**
   * Creates a template element from the first item in the list of items and
   * appends it to the component root.
   *
   * @fires AddAnother#templateCreated
   */
  createTemplate() {
    const $templateHTML = this.$items[0]?.cloneNode(true)

    if (!($templateHTML instanceof HTMLElement)) {
      return
    }

    // reset values of all fields
    this.resetItem($templateHTML)

    // remove error messages, and error classes
    this.clearErrorMessages($templateHTML)

    // create template element and append to component root
    const $template = document.createElement('template')
    $template.classList.add(`${this.itemTemplateClass}`)
    $template.content.append($templateHTML)
    this.$itemTemplate = this.$root.appendChild($template)

    emitEvent(this.$itemTemplate, AddAnother, this.templateCreatedEvent)
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
   * Get all add another items
   *
   * @returns {HTMLElement[]} Array of add another items
   */
  getItems() {
    if (!this.$root) {
      return []
    }

    const $items = Array.from(this.$root.querySelectorAll(`.${this.itemClass}`))

    return $items.filter((item) => item instanceof HTMLElement)
  }

  /**
   * Clones a new item from the template and returns it.
   *
   * @returns {DocumentFragment | undefined}
   */
  getNewItem() {
    const $item = document.importNode(this.$itemTemplate.content, true)

    if (!$item) {
      return
    }

    // Ensure the new item has a remove button
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
    $item.querySelectorAll('[data-name][data-id]').forEach(($input) => {
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
   * Removes error links from the error summary that are associated with inputs
   * within an item, and removes the error summary if there are no remaining
   * error links.
   *
   * @param {Element} $item - Add another item
   */
  updateErrorSummary($item) {
    const $errorSummary = document.querySelector('.govuk-error-summary')

    if (!$errorSummary || !($errorSummary instanceof HTMLElement)) {
      return
    }

    const $errorLinks = $errorSummary.querySelectorAll('a')

    $errorLinks.forEach(($link) => {
      const href = $link.getAttribute('href') || ''
      const hrefParts = href.split('#')
      const targetId = href.includes('#')
        ? hrefParts[hrefParts.length - 1]
        : null
      const $target = targetId ? document.getElementById(targetId) : null
      if ($target && $item.contains($target)) {
        const $listItem = $link.closest('li')
        if ($listItem) {
          $listItem.remove()
        } else {
          $link.remove()
        }
      }
    })

    const $remainingErrorLinks = $errorSummary.querySelectorAll('a')
    if ($remainingErrorLinks.length === 0) {
      $errorSummary.remove()
    }
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
        this.updateSuffixText($label, index + 1)
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

      const $legend = $fieldset.querySelector('legend')

      if ($legend && $legend instanceof HTMLLegendElement) {
        this.updateSuffixText($legend, index + 1)
      }
    })
  }

  /**
   * Updates the text of legends within an item to reflect the current index of
   * the item and the total number of items to ensure unique accessible names.
   *
   * @param {Element} $item - Add another item
   * @param {number} index - Add another item index
   * @param {number} itemsCount - Total number of items
   */
  updateLegends($item, index, itemsCount) {
    const $fieldset = $item.querySelector(`.${this.fieldsetClass}`)

    if (!$fieldset || !($fieldset instanceof HTMLFieldSetElement)) {
      return
    }
    const $legend = $fieldset.querySelector('legend')

    const legendText = this.i18n.t('itemLegendText', {
      itemLabel: this.config.itemLabel,
      number: index + 1,
      count: itemsCount
    })

    if (!$legend || !($legend instanceof HTMLLegendElement)) {
      return
    }

    // Replace the legend node rather than mutating text in-place so assistive
    // technologies recalculate the fieldset name after item reindex/removal.
    const $replacementLegend = /** @type {HTMLLegendElement} */ (
      $legend.cloneNode(false)
    )

    if (
      $legend.firstElementChild &&
      $legend.firstElementChild instanceof HTMLHeadingElement
    ) {
      const $replacementHeading = /** @type {HTMLHeadingElement} */ (
        $legend.firstElementChild.cloneNode(false)
      )
      $replacementHeading.textContent = legendText
      $replacementLegend.appendChild($replacementHeading)
    } else {
      $replacementLegend.textContent = legendText
    }

    $legend.replaceWith($replacementLegend)
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
    const labelIndex = index + 1

    if (!$button || !($button instanceof HTMLButtonElement)) {
      if (itemsCount > 1 && index === 0) {
        this.createRemoveButton($item, labelIndex)
      }
      return
    }

    if (itemsCount === 1 && index === 0) {
      $button.remove()
    } else {
      this.setRemoveButtonContent($button, labelIndex)
    }
  }

  /**
   * Adds visually hidden text to the legend of an item to indicate it has been
   * added, to provide additional context for screen reader users.
   *
   * @param {Element} $item - Add another item
   */
  addNewItemSuffix($item) {
    const $newItemSuffix = document.createElement('span')
    $newItemSuffix.classList.add(
      'govuk-visually-hidden',
      `${this.newItemSuffixClass}`
    )
    $newItemSuffix.textContent = `(added)`

    const $legend = $item.querySelector('legend')
    if ($legend && $legend instanceof HTMLLegendElement) {
      $legend.appendChild($newItemSuffix)
    }
  }

  /**
   * Updates the visually hidden text of a label to reflect the current index of
   * the item.
   *
   * @param {Element} $element - Add another item
   * @param {number} index - Add another item index
   */
  updateSuffixText($element, index) {
    let $suffix = $element.querySelector(`.${this.labelSuffixClass}`)

    if (!$suffix) {
      $suffix = document.createElement('span')
      $suffix.classList.add(`${this.labelSuffixClass}`, 'govuk-visually-hidden')
      $suffix = $element.appendChild($suffix)
    }

    if ($suffix && $suffix instanceof HTMLElement) {
      $suffix.textContent = this.i18n.t('fieldLabelSuffixText', {
        itemLabel: this.config.itemLabel.toLowerCase(),
        number: index
      })
    }
  }

  /**
   * Removes the visually hidden text added by addNewItemSuffix to indicate an item has been added.
   * Replaces the legend node rather than mutating text in-place so assistive
   * technologies recalculate the fieldset name after item reindex/removal.
   *
   * @param {Element} $item - Add another item
   */
  removeNewItemSuffix($item) {
    const $legend = $item.querySelector('legend')
    if (!$legend || !($legend instanceof HTMLLegendElement)) {
      return
    }

    const $replacementLegend = /** @type {HTMLLegendElement} */ (
      $legend.cloneNode(true)
    )
    $replacementLegend
      .querySelectorAll(`.${this.newItemSuffixClass}`)
      .forEach(($suffix) => {
        if ($suffix instanceof HTMLElement) {
          $suffix.remove()
        }
      })

    $legend.replaceWith($replacementLegend)
  }

  /**
   * Creates a remove button for an item if it doesn't already exist, and
   * adds it to the item.
   *
   * @param {Element|DocumentFragment} $item - Add another item
   * @param {number} [labelIndex] - label index
   */
  createRemoveButton($item, labelIndex = 1) {
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
    this.setRemoveButtonContent($button, labelIndex)

    if ($buttonContainer && $buttonContainer instanceof HTMLElement) {
      $buttonContainer.appendChild($button)
    } else {
      if (!(this.config.layout === 'inline')) {
        $item.appendChild($button)
      }
    }
  }

  /**
   * Resets the values of all input fields within an item to their default
   * state.
   *
   * @param {HTMLElement} $item - Add another item
   * @fires AddAnother#resetItem
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
      } else if ($input instanceof HTMLInputElement) {
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

    emitEvent($item, AddAnother, this.itemResetEvent)
  }

  /**
   * Removes error messages and error classes from an item.
   *
   * @param {Element} $item
   */
  clearErrorMessages($item) {
    // remove error messages
    $item.querySelectorAll('.govuk-error-message').forEach(($errorMessage) => {
      if ($errorMessage instanceof HTMLElement) {
        $errorMessage.remove()
      }
    })

    // remove error classes from form groups
    $item.querySelectorAll('.govuk-form-group--error').forEach(($formGroup) => {
      if ($formGroup && $formGroup instanceof HTMLElement) {
        $formGroup.classList.remove('govuk-form-group--error')
      }
    })

    // remove error classes from inputs
    $item.querySelectorAll('.govuk-input--error').forEach(($formGroup) => {
      if ($formGroup && $formGroup instanceof HTMLElement) {
        $formGroup.classList.remove('govuk-input--error')
      }
    })
  }

  /**
   * Generates remove button text.
   *
   * @returns {string} translated remove button text
   */
  removeButtonText() {
    return this.i18n.t('removeButtonText')
  }

  /**
   * Generates remove button suffix text.
   *
   * @param {number} labelIndex - the index to include in the remove button label
   * @returns {string} translated remove button suffix text
   */
  removeButtonSuffixText(labelIndex) {
    return this.i18n.t('removeButtonSuffixText', {
      itemLabel: this.config.itemLabel.toLowerCase(),
      number: labelIndex
    })
  }

  /**
   * Sets remove button label content safely without using innerHTML.
   *
   * @param {HTMLButtonElement} $button
   * @param {number} labelIndex
   */
  setRemoveButtonContent($button, labelIndex) {
    const text = this.removeButtonText()
    const suffix = this.removeButtonSuffixText(labelIndex)

    if (this.config.layout === 'inline') {
      $button.textContent = `${text} `
      const $hiddenSuffix = document.createElement('span')
      $hiddenSuffix.classList.add('govuk-visually-hidden')
      $hiddenSuffix.textContent = suffix
      $button.appendChild($hiddenSuffix)
      return
    }

    $button.textContent = `${text} ${suffix}`
  }

  /**
   * Handles click events on the add button to create a new item and append it
   * to the list of items.
   *
   * @param {MouseEvent} event - Click event
   * @fires AddAnother#itemAdded
   */
  onAddButtonClick(event) {
    const $button = event.target

    if (
      !$button ||
      !($button instanceof HTMLButtonElement) ||
      !$button.classList.contains(`${this.addButtonClass}`)
    ) {
      return
    }

    event.preventDefault()

    const $item = this.getNewItem()
    if (!$item || !($item instanceof DocumentFragment)) {
      return
    }

    this.$itemsContainer.appendChild($item)
    this.updateAllItems()
    const $lastItem = this.$items[this.$items.length - 1]

    // Place focus on the added item
    if ($lastItem && $lastItem instanceof HTMLElement) {
      const $fieldset = $lastItem.querySelector(`.${this.fieldsetClass}`)

      if ($fieldset && $fieldset instanceof HTMLFieldSetElement) {
        this.addNewItemSuffix($fieldset)

        $fieldset.addEventListener('blur', () => {
          this.removeNewItemSuffix($fieldset)
        })

        emitEvent($lastItem, AddAnother, this.itemAddedEvent)

        setTimeout(() => {
          setFocus($fieldset)
        }, 100)
      }
    }
  }

  /**
   * Handles click events on remove buttons within items.
   *
   * @param {MouseEvent} event - Click event
   * @fires AddAnother#itemRemoved
   */
  onRemoveButtonClick(event) {
    const $target = /** @type {Element} */ (event.target)
    const $button = $target.closest('button')

    if (
      !$button ||
      !($button instanceof HTMLButtonElement) ||
      !$button.classList.contains(`${this.removeButtonClass}`)
    ) {
      return
    }

    const $itemToRemove = $button.closest(`.${this.itemClass}`)

    if (!$itemToRemove || !($itemToRemove instanceof HTMLElement)) {
      return
    }

    let $itemToFocus = $itemToRemove.previousElementSibling?.querySelector(
      `.${this.fieldsetClass}`
    )

    // Should we get the next element?
    if (!$itemToFocus || !($itemToFocus instanceof HTMLFieldSetElement)) {
      $itemToFocus = $itemToRemove.nextElementSibling?.querySelector(
        `.${this.fieldsetClass}`
      )
    }
    // focus on root of component?
    // it needs an accessible name?
    if (!$itemToFocus || !($itemToFocus instanceof HTMLFieldSetElement)) {
      $itemToFocus = this.$root
    }

    if ($itemToRemove.querySelector('.govuk-error-message')) {
      this.updateErrorSummary($itemToRemove)
    }

    $itemToRemove.remove()
    this.updateAllItems('remove')
    emitEvent(this.$root, AddAnother, this.itemRemovedEvent)
    if ($itemToFocus instanceof HTMLElement) {
      this.focusItemAfterRemoval($itemToFocus)
    }
  }

  /**
   * Moves focus to a neutral container before moving focus to the fieldset.
   * This helps VoiceOver refresh the fieldset accessible name after dynamic
   * legend updates when an item is removed.
   *
   * @param {HTMLElement} $itemToFocus
   */
  focusItemAfterRemoval($itemToFocus) {
    const $neutralTarget =
      this.$itemsContainer instanceof HTMLElement
        ? this.$itemsContainer
        : this.$root

    if (
      !($neutralTarget instanceof HTMLElement) ||
      $neutralTarget === $itemToFocus
    ) {
      setFocus($itemToFocus)
      return
    }

    setFocus($neutralTarget)

    const focusTargetItem = () => setFocus($itemToFocus)
    if (typeof requestAnimationFrame === 'function') {
      requestAnimationFrame(focusTargetItem)
    } else {
      setTimeout(focusTargetItem, 0)
    }
  }

  /**
   * Check if an item has a remove button.
   *
   * @param {Element | DocumentFragment} $item - Add another item
   * @returns {boolean}
   */
  hasRemoveButton($item) {
    return !!$item.querySelectorAll('.moj-add-another__remove-button').length
  }

  /**
   * Checks if an element is a valid input element (input, select, or textarea).
   *
   * @param {Element} $input - the input to validate
   * @returns {$input is AddAnotherInputElement}
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
    i18n: {
      removeButtonText: 'Remove',
      removeButtonSuffixText: '%{itemLabel} %{number}',
      fieldLabelSuffixText: 'for %{itemLabel} %{number}',
      itemLegendText: {
        one: '%{itemLabel} %{number}',
        other: '%{itemLabel} %{number} of %{count}'
      }
    },
    itemLabel: 'Item',
    layout: 'stacked'
  })

  /**
   * Date picker config schema
   *
   * @satisfies {Schema<AddAnotherConfig>}
   */
  static schema = Object.freeze(
    /** @type {const} */ ({
      properties: {
        i18n: { type: 'object' },
        itemLabel: { type: 'string' },
        layout: { type: 'string' }
      }
    })
  )
}

/**
 * @typedef {HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement} AddAnotherInputElement
 */

/**
 * @typedef {"stacked"|"inline"} AddAnotherLayout
 */

/**
 * Add another config
 *
 * @typedef {object} AddAnotherConfig
 * @property {string} [itemLabel] - Label for each fieldset
 * @property {AddAnotherLayout} [layout] - layout style for fields
 * @property {AddAnotherTranslations} [i18n=AddAnother.defaults.i18n] - Add another translations
 */

/**
 * Add another translations
 *
 * @see {@link AddAnother.defaults.i18n}
 * @typedef {object} AddAnotherTranslations
 * @property {TranslationPluralForms} [itemLegendText] - Legend for the item.
 *   %{itemLabel} placeholder will be replaced with the AddAnother.config.itemLabel.
 *   %{number} and %{count} placeholders will be replaced with the correct numbers.
 *   This is a GOV.UK design system [pluralised list of
 *   messages](https://frontend.design-system.service.gov.uk/localise-govuk-frontend).
 * @property {string} [removeButtonText] - Label for the item remove buttons.
 * @property {string} [removeButtonSuffixText] - suffix for the item remove buttons.
 *   The `%{itemLabel}` placeholder will be replaced with the AddAnother.config.itemLabel.
 *   The `%{number}` placeholder will be replaced with the index of the item.
 * @property {string} [fieldLabelSuffixText] - hidden suffix for the field labels and legends.
 *   The `%{itemLabel}` placeholder will be replaced with the AddAnother.config.itemLabel.
 *   The `%{number}` placeholder will be replaced with the index of the item.
 */

/**
 * Template created event
 * Fired when a reusable item template is created.
 *
 * Event name: `moj-add-another:create-template`
 * Dispatched from: the created `<template>` element. (this.$itemTemplate)
 *
 * @event AddAnother#templateCreated
 * @type {CustomEvent<null>}
 */

/**
 * Item added event
 * Fired when a new item is added to the list of items.
 *
 * Event name: `moj-add-another:add-item`
 * Dispatched from: the newly added item element (bubbles to this.$root and document).
 *
 * @event AddAnother#itemAdded
 * @type {CustomEvent<null>}
 */

/**
 * Item removed event
 * Fired when an item is removed from the list of items.
 *
 * Event name: `moj-add-another:remove-item`
 * Dispatched from: the root element of the component. (this.$root)
 *
 * @event AddAnother#itemRemoved
 * @type {CustomEvent<null>}
 */

/**
 * Item reset event
 * Fired when an item is reset to its default state.
 *
 * Event name: `moj-add-another:reset-item`
 * Dispatched from: the item that was reset.
 *
 * @event AddAnother#itemReset
 * @type {CustomEvent<null>}
 */

/**
 * @import { Schema } from 'govuk-frontend/dist/govuk/common/configuration.mjs'
 * @import { TranslationPluralForms } from 'govuk-frontend/dist/govuk/i18n.mjs'
 */
