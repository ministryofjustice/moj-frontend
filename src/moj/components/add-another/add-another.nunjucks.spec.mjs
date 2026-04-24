/* eslint-disable no-new */

import { getByRole, queryByRole } from '@testing-library/dom'

import { render, getExamples } from '../../lib/components.js'

import { AddAnother } from './add-another.mjs'

/**
 * Renders a fixture into the document body and initialises all AddAnother
 * components found within it.
 *
 * @param {object} example - Example options from getExamples()
 * @returns {HTMLElement} The root component element
 */
function renderExample(example) {
  document.body.insertAdjacentHTML('afterbegin', render('add-another', example))

  document
    .querySelectorAll('[data-module="moj-add-another"]')
    .forEach(($el) => {
      new AddAnother($el)
    })

  return /** @type {HTMLElement} */ (
    document.querySelector('[data-module="moj-add-another"]')
  )
}

describe('add another', () => {
  let examples
  let example = 'default'
  let $component

  beforeAll(async () => {
    examples = await getExamples('add-another')
  })

  beforeEach(() => {
    $component = renderExample(examples[example])
  })

  afterEach(() => {
    document.body.innerHTML = ''
  })

  // ---------------------------------------------------------------------------
  // Default (single item, stacked layout)
  // ---------------------------------------------------------------------------

  describe('by default', () => {
    beforeAll(() => {
      example = 'default'
    })
    afterAll(() => {
      example = 'default'
    })

    test('marks component as initialised', () => {
      expect($component).toHaveAttribute('data-moj-add-another-init')
    })

    test('renders a single item', () => {
      const items = $component.querySelectorAll('.moj-add-another__item')
      expect(items).toHaveLength(1)
    })

    test('sets the legend to the item label and index', () => {
      const item = $component.querySelector('.moj-add-another__item')
      const legend = item.querySelector('legend')
      expect(legend).toHaveTextContent('Person 1')
    })

    test('appends a visually hidden label suffix to each field label', () => {
      const suffix = $component.querySelector('.moj-add-another__label-suffix')
      expect(suffix).toBeInTheDocument()
      expect(suffix).toHaveTextContent('for person 1')
      expect(suffix).toHaveClass('govuk-visually-hidden')
    })

    test('renders the add button with the correct text', () => {
      const addButton = getByRole($component, 'button', {
        name: 'Add another person'
      })
      expect(addButton).toBeInTheDocument()
    })

    test('sets type="button" on the add button to prevent form submission', () => {
      const addButton = getByRole($component, 'button', {
        name: 'Add another person'
      })
      expect(addButton).toHaveAttribute('type', 'button')
    })

    test('does not render a remove button when there is only one item', () => {
      const removeButton = queryByRole($component, 'button', { name: /Remove/ })
      expect(removeButton).not.toBeInTheDocument()
    })

    test('creates a hidden template element for new items', () => {
      const template = $component.querySelector(
        'template.moj-add-another__item-template'
      )
      expect(template).toBeInTheDocument()
    })
  })

  // ---------------------------------------------------------------------------
  // Multiple items (stacked)
  // ---------------------------------------------------------------------------

  describe('multiple items', () => {
    beforeAll(() => {
      example = 'multiple items'
    })
    afterAll(() => {
      example = 'default'
    })

    test('renders three items', () => {
      const items = $component.querySelectorAll('.moj-add-another__item')
      expect(items).toHaveLength(3)
    })

    test('renders a remove button on every item', () => {
      const items = $component.querySelectorAll('.moj-add-another__item')
      items.forEach((item) => {
        const removeButton = queryByRole(item, 'button', { name: /Remove/ })
        expect(removeButton).toBeInTheDocument()
      })
    })

    test('sets remove button labels to include the item index', () => {
      const items = $component.querySelectorAll('.moj-add-another__item')
      const labels = Array.from(items).map((item) =>
        queryByRole(item, 'button', { name: /Remove/ }).textContent.trim()
      )
      expect(labels[0]).toMatch(/Remove person 1/)
      expect(labels[1]).toMatch(/Remove person 2/)
      expect(labels[2]).toMatch(/Remove person 3/)
    })
  })

  // ---------------------------------------------------------------------------
  // Stacked layout with errors
  // ---------------------------------------------------------------------------

  describe('stacked with errors', () => {
    beforeAll(() => {
      example = 'stacked with errors'
    })
    afterAll(() => {
      example = 'default'
    })

    test('renders error messages in the second item', () => {
      const items = $component.querySelectorAll('.moj-add-another__item')
      const secondItem = items[1]
      const errorMessages = secondItem.querySelectorAll('.govuk-error-message')
      expect(errorMessages.length).toBeGreaterThan(0)
    })

    test('template clone contains no error messages', () => {
      const template = $component.querySelector(
        'template.moj-add-another__item-template'
      )
      const content = template.content
      expect(content.querySelector('.govuk-error-message')).toBeNull()
    })

    test('template clone contains no error input classes', () => {
      const template = $component.querySelector(
        'template.moj-add-another__item-template'
      )
      const content = template.content
      expect(content.querySelector('.govuk-input--error')).toBeNull()
    })

    test('template clone contains no error form group classes', () => {
      const template = $component.querySelector(
        'template.moj-add-another__item-template'
      )
      const content = template.content
      expect(content.querySelector('.govuk-form-group--error')).toBeNull()
    })
  })

  // ---------------------------------------------------------------------------
  // Inline layout
  // ---------------------------------------------------------------------------

  describe('inline layout', () => {
    beforeAll(() => {
      example = 'inline'
    })
    afterAll(() => {
      example = 'default'
    })

    test('sets data-layout="inline" on the container', () => {
      expect($component).toHaveAttribute('data-layout', 'inline')
    })

    test('adds the inline modifier class to items', () => {
      const item = $component.querySelector('.moj-add-another__item')
      expect(item).toHaveClass('moj-add-another__item--inline')
    })

    test('renders the item legend as visually hidden', () => {
      const item = $component.querySelector('.moj-add-another__item')
      const legend = item.querySelector('legend')
      expect(legend).toHaveClass('govuk-visually-hidden')
    })
  })

  // ---------------------------------------------------------------------------
  // Inline layout with errors
  // ---------------------------------------------------------------------------

  describe('inline with errors', () => {
    beforeAll(() => {
      example = 'inline with errors'
    })
    afterAll(() => {
      example = 'default'
    })

    test('adds error modifier class to item with an item-level error message', () => {
      const items = $component.querySelectorAll('.moj-add-another__item')
      expect(items[1]).toHaveClass('moj-add-another__item--error')
    })

    test('renders the item-level error message text', () => {
      const items = $component.querySelectorAll('.moj-add-another__item')
      const secondItem = items[1]
      const errorMessage = secondItem.querySelector('.govuk-error-message')
      expect(errorMessage).toBeInTheDocument()
      expect(errorMessage).toHaveTextContent('Enter last name for person 2')
    })

    test('does not add error modifier class to items without errors', () => {
      const items = $component.querySelectorAll('.moj-add-another__item')
      expect(items[0]).not.toHaveClass('moj-add-another__item--error')
    })
  })

  // ---------------------------------------------------------------------------
  // With custom container classes
  // ---------------------------------------------------------------------------

  describe('with classes', () => {
    beforeAll(() => {
      example = 'with classes'
    })
    afterAll(() => {
      example = 'default'
    })

    test('adds custom classes to the container', () => {
      expect($component).toHaveClass('custom-add-another-class')
    })

    test('retains the base component class', () => {
      expect($component).toHaveClass('moj-add-another')
    })
  })

  // ---------------------------------------------------------------------------
  // With custom container attributes
  // ---------------------------------------------------------------------------

  describe('with attributes', () => {
    beforeAll(() => {
      example = 'with attributes'
    })
    afterAll(() => {
      example = 'default'
    })

    test('renders custom data attributes on the container', () => {
      expect($component).toHaveAttribute('data-custom', 'custom-value')
      expect($component).toHaveAttribute('data-test', 'test-value')
    })
  })

  // ---------------------------------------------------------------------------
  // With custom item classes
  // ---------------------------------------------------------------------------

  describe('with item classes', () => {
    beforeAll(() => {
      example = 'with item classes'
    })
    afterAll(() => {
      example = 'default'
    })

    test('adds custom classes to the item', () => {
      const item = $component.querySelector('.moj-add-another__item')
      expect(item).toHaveClass('custom-item-class')
    })

    test('retains the base item class', () => {
      const item = $component.querySelector('.moj-add-another__item')
      expect(item).toHaveClass('moj-add-another__item')
    })
  })

  // ---------------------------------------------------------------------------
  // Custom item label
  // ---------------------------------------------------------------------------

  describe('custom item label', () => {
    beforeAll(() => {
      example = 'custom item label'
    })
    afterAll(() => {
      example = 'default'
    })

    test('uses the custom label in the add button text', () => {
      const addButton = getByRole($component, 'button', {
        name: 'Add another address'
      })
      expect(addButton).toBeInTheDocument()
    })

    test('uses the custom label in the item legend', () => {
      const item = $component.querySelector('.moj-add-another__item')
      const legend = item.querySelector('legend')
      expect(legend).toHaveTextContent('Address 1')
    })

    test('uses the custom label in visually hidden field label suffixes', () => {
      const suffix = $component.querySelector('.moj-add-another__label-suffix')
      expect(suffix).toHaveTextContent('for address 1')
    })
  })

  // ---------------------------------------------------------------------------
  // Events
  // ---------------------------------------------------------------------------

  describe('events', () => {
    beforeAll(() => {
      example = 'default'
    })

    test('dispatches moj-add-another:add-item when an item is added', () => {
      const listener = jest.fn()
      $component.addEventListener('moj-add-another:add-item', listener)

      const addButton = getByRole($component, 'button', {
        name: 'Add another person'
      })
      addButton.click()

      expect(listener).toHaveBeenCalledTimes(1)
      expect(listener.mock.calls[0][0]).toBeInstanceOf(CustomEvent)
    })

    test('dispatches moj-add-another:remove-item when an item is removed', () => {
      const listener = jest.fn()
      $component.addEventListener('moj-add-another:remove-item', listener)

      // Add an item so there are two (enabling remove buttons)
      const addButton = getByRole($component, 'button', {
        name: 'Add another person'
      })
      addButton.click()

      const removeButton = getByRole($component, 'button', {
        name: /Remove person 1/
      })
      removeButton.click()

      expect(listener).toHaveBeenCalledTimes(1)
      expect(listener.mock.calls[0][0]).toBeInstanceOf(CustomEvent)
    })

    test('add-item event is dispatched on the component root', () => {
      let eventTarget = null
      $component.addEventListener('moj-add-another:add-item', (event) => {
        eventTarget = event.currentTarget
      })

      getByRole($component, 'button', { name: 'Add another person' }).click()

      expect(eventTarget).toBe($component)
    })

    test('remove-item event is dispatched on the component root', () => {
      let eventTarget = null
      $component.addEventListener('moj-add-another:remove-item', (event) => {
        eventTarget = event.currentTarget
      })

      getByRole($component, 'button', { name: 'Add another person' }).click()
      getByRole($component, 'button', { name: /Remove person 1/ }).click()

      expect(eventTarget).toBe($component)
    })
  })
})
