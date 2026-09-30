import { getAllByRole, getByRole } from '@testing-library/dom'

import { render, getExamples } from '../../lib/components.js'

/**
 * Renders a button-menu fixture into the document body.
 *
 * @param {object} example - Example options from getExamples()
 * @returns {HTMLElement} The root component element
 */
function renderExample(example) {
  document.body.insertAdjacentHTML('afterbegin', render('button-menu', example))

  return /** @type {HTMLElement} */ (
    document.querySelector('[data-module="moj-button-menu"]')
  )
}

describe('button menu', () => {
  let examples
  let example = 'default'
  let $component

  beforeAll(async () => {
    examples = await getExamples('button-menu')
  })

  beforeEach(() => {
    $component = renderExample(examples[example])
  })

  afterEach(() => {
    document.body.innerHTML = ''
  })

  // ---------------------------------------------------------------------------
  // Default
  // ---------------------------------------------------------------------------

  describe('by default', () => {
    beforeAll(() => {
      example = 'default'
    })
    afterAll(() => {
      example = 'default'
    })

    test('has the moj-button-menu class', () => {
      expect($component).toHaveClass('moj-button-menu')
    })

    test('has the moj-button-menu data-module attribute', () => {
      expect($component).toHaveAttribute('data-module', 'moj-button-menu')
    })

    test('renders an item for each button', () => {
      const items = getAllByRole($component, 'button')
      expect(items).toHaveLength(3)
    })

    test('renders items with the correct text', () => {
      const items = getAllByRole($component, 'button')
      expect(items.map((item) => item.textContent.trim())).toEqual([
        'Archive',
        'Reassign',
        'Delete'
      ])
    })

    test('renders items as links with the correct href', () => {
      const firstItem = getByRole($component, 'button', { name: 'Archive' })
      expect(firstItem.tagName).toBe('A')
      expect(firstItem).toHaveAttribute('href', '#archive')
    })

    test('adds the moj-button-menu__item class to each item', () => {
      const items = getAllByRole($component, 'button')
      items.forEach((item) => {
        expect(item).toHaveClass('moj-button-menu__item')
      })
    })

    test('adds the govuk-button--secondary class to each item', () => {
      const items = getAllByRole($component, 'button')
      items.forEach((item) => {
        expect(item).toHaveClass('govuk-button--secondary')
      })
    })

    test('does not set data-button-text attribute', () => {
      expect($component).not.toHaveAttribute('data-button-text')
    })

    test('does not set data-button-classes attribute', () => {
      expect($component).not.toHaveAttribute('data-button-classes')
    })

    test('does not set data-align-menu attribute', () => {
      expect($component).not.toHaveAttribute('data-align-menu')
    })
  })

  // ---------------------------------------------------------------------------
  // Single item
  // ---------------------------------------------------------------------------

  describe('single item', () => {
    beforeAll(() => {
      example = 'single item'
    })
    afterAll(() => {
      example = 'default'
    })

    test('renders only one item', () => {
      const items = getAllByRole($component, 'button')
      expect(items).toHaveLength(1)
    })

    test('renders the single item with the correct text and href', () => {
      const item = getByRole($component, 'button', { name: 'Archive' })
      expect(item).toHaveAttribute('href', '#archive')
    })
  })

  // ---------------------------------------------------------------------------
  // With html item content
  // ---------------------------------------------------------------------------

  describe('with html item', () => {
    beforeAll(() => {
      example = 'with html item'
    })
    afterAll(() => {
      example = 'default'
    })

    test('renders the html content inside the item', () => {
      const items = getAllByRole($component, 'button')
      expect(items[0].querySelector('strong')).toHaveTextContent('Archive')
    })
  })

  // ---------------------------------------------------------------------------
  // With disabled item
  // ---------------------------------------------------------------------------

  describe('with disabled item', () => {
    beforeAll(() => {
      example = 'with disabled item'
    })
    afterAll(() => {
      example = 'default'
    })

    test('renders the disabled item as a disabled button', () => {
      const item = getByRole($component, 'button', { name: 'Delete' })
      expect(item.tagName).toBe('BUTTON')
      expect(item).toBeDisabled()
    })

    test('renders the aria-disabled attribute on the disabled item', () => {
      const item = getByRole($component, 'button', { name: 'Delete' })
      expect(item).toHaveAttribute('aria-disabled', 'true')
    })

    test('does not disable other items', () => {
      const item = getByRole($component, 'button', { name: 'Archive' })
      expect(item).toBeEnabled()
    })
  })

  // ---------------------------------------------------------------------------
  // With button element items
  // ---------------------------------------------------------------------------

  describe('with button items', () => {
    beforeAll(() => {
      example = 'with button items'
    })
    afterAll(() => {
      example = 'default'
    })

    test('renders items as button elements', () => {
      const items = getAllByRole($component, 'button')
      items.forEach((item) => {
        expect(item.tagName).toBe('BUTTON')
      })
    })

    test('sets the name and value attributes on each item', () => {
      const item = getByRole($component, 'button', { name: 'Archive' })
      expect(item).toHaveAttribute('name', 'archive')
      expect(item).toHaveValue('archive')
    })

    test('sets the type attribute on each item', () => {
      const items = getAllByRole($component, 'button')
      items.forEach((item) => {
        expect(item).toHaveAttribute('type', 'button')
      })
    })
  })

  // ---------------------------------------------------------------------------
  // With submit button item
  // ---------------------------------------------------------------------------

  describe('with submit button item', () => {
    beforeAll(() => {
      example = 'with submit button item'
    })
    afterAll(() => {
      example = 'default'
    })

    test('renders the item as a button element', () => {
      const item = getByRole($component, 'button', { name: 'Archive' })
      expect(item.tagName).toBe('BUTTON')
    })

    test('sets the type, name and value attributes on the button', () => {
      const item = getByRole($component, 'button', { name: 'Archive' })
      expect(item).toHaveAttribute('type', 'submit')
      expect(item).toHaveAttribute('name', 'archive')
      expect(item).toHaveValue('archive')
    })

    test('adds the moj-button-menu__item class to the button', () => {
      const item = getByRole($component, 'button', { name: 'Archive' })
      expect(item).toHaveClass('moj-button-menu__item')
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

    test('adds the custom class to the item', () => {
      const item = getByRole($component, 'button', { name: 'Archive' })
      expect(item).toHaveClass('custom-item-class')
    })

    test('retains the base item classes', () => {
      const item = getByRole($component, 'button', { name: 'Archive' })
      expect(item).toHaveClass('moj-button-menu__item')
      expect(item).toHaveClass('govuk-button--secondary')
    })

    test('does not add the custom class to other items', () => {
      const item = getByRole($component, 'button', { name: 'Delete' })
      expect(item).not.toHaveClass('custom-item-class')
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

    test('adds the custom class to the container', () => {
      expect($component).toHaveClass('custom-button-menu-class')
    })

    test('retains the base moj-button-menu class', () => {
      expect($component).toHaveClass('moj-button-menu')
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
    })
  })

  // ---------------------------------------------------------------------------
  // With custom toggle button text
  // ---------------------------------------------------------------------------

  describe('with button text', () => {
    beforeAll(() => {
      example = 'with button text'
    })
    afterAll(() => {
      example = 'default'
    })

    test('sets the data-button-text attribute', () => {
      expect($component).toHaveAttribute('data-button-text', 'Menu title')
    })
  })

  // ---------------------------------------------------------------------------
  // With custom toggle button classes
  // ---------------------------------------------------------------------------

  describe('with button classes', () => {
    beforeAll(() => {
      example = 'with button classes'
    })
    afterAll(() => {
      example = 'default'
    })

    test('sets the data-button-classes attribute', () => {
      expect($component).toHaveAttribute(
        'data-button-classes',
        'custom-toggle-class'
      )
    })
  })

  // ---------------------------------------------------------------------------
  // With menu aligned right
  // ---------------------------------------------------------------------------

  describe('with align menu right', () => {
    beforeAll(() => {
      example = 'with align menu right'
    })
    afterAll(() => {
      example = 'default'
    })

    test('sets the data-align-menu attribute to "right"', () => {
      expect($component).toHaveAttribute('data-align-menu', 'right')
    })
  })
})
