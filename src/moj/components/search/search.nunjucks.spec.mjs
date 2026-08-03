import { getByRole } from '@testing-library/dom'

import { render, getExamples } from '../../lib/components.js'

/**
 * Renders a search fixture into the document body.
 *
 * @param {object} example - Example options from getExamples()
 * @returns {HTMLElement} The root component element
 */
function renderExample(example) {
  document.body.insertAdjacentHTML('afterbegin', render('search', example))

  return /** @type {HTMLElement} */ (document.querySelector('.moj-search'))
}

describe('search', () => {
  let examples
  let example = 'default'
  let $component

  beforeAll(async () => {
    examples = await getExamples('search')
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

    test('renders a search element', () => {
      expect(document.querySelector('search')).toBeInTheDocument()
    })

    test('has the moj-search class', () => {
      expect($component).toHaveClass('moj-search')
    })

    test('renders a form with the correct action', () => {
      const form = $component.querySelector('form')
      expect(form).toHaveAttribute('action', '/search')
    })

    test('form method defaults to "get"', () => {
      const form = $component.querySelector('form')
      expect(form).toHaveAttribute('method', 'get')
    })

    test('renders a search input with the correct id', () => {
      const input = $component.querySelector('input[type="search"]')
      expect(input).toHaveAttribute('id', 'search')
    })

    test('renders a search input with the correct name', () => {
      const input = $component.querySelector('input[type="search"]')
      expect(input).toHaveAttribute('name', 'search')
    })

    test('input has the moj-search__input class', () => {
      const input = $component.querySelector('input[type="search"]')
      expect(input).toHaveClass('moj-search__input')
    })

    test('renders a button with the correct text', () => {
      const button = getByRole($component, 'button', { name: 'Search' })
      expect(button).toBeInTheDocument()
    })

    test('button has the moj-search__button class', () => {
      const button = $component.querySelector('button')
      expect(button).toHaveClass('moj-search__button')
    })

    test('does not render a CSRF hidden input', () => {
      expect($component.querySelector('input[type="hidden"]')).toBeNull()
    })
  })

  // ---------------------------------------------------------------------------
  // Stacked layout
  // ---------------------------------------------------------------------------

  describe('stacked layout', () => {
    beforeAll(() => {
      example = 'stacked layout'
    })
    afterAll(() => {
      example = 'default'
    })

    test('adds the moj-search--stacked class to the container', () => {
      expect($component).toHaveClass('moj-search--stacked')
    })

    test('does not render the input wrapper', () => {
      expect($component.querySelector('.moj-search__input-wrapper')).toBeNull()
    })

    test('button is rendered outside the input wrapper', () => {
      const button = $component.querySelector('button')
      expect(button).toBeInTheDocument()
      expect($component.querySelector('.moj-search__input-wrapper')).toBeNull()
    })
  })

  // ---------------------------------------------------------------------------
  // With label
  // ---------------------------------------------------------------------------

  describe('with label', () => {
    beforeAll(() => {
      example = 'with label'
    })
    afterAll(() => {
      example = 'default'
    })

    test('renders the label with the correct text', () => {
      const label = $component.querySelector('label')
      expect(label).toHaveTextContent('Search the service')
    })

    test('label has the moj-search__label class', () => {
      const label = $component.querySelector('label')
      expect(label).toHaveClass('moj-search__label')
    })
  })

  // ---------------------------------------------------------------------------
  // With hint
  // ---------------------------------------------------------------------------

  describe('with hint', () => {
    beforeAll(() => {
      example = 'with hint'
    })
    afterAll(() => {
      example = 'default'
    })

    test('renders the hint with the correct text', () => {
      const hint = $component.querySelector('.govuk-hint')
      expect(hint).toHaveTextContent(
        'Enter a name, reference number or keyword'
      )
    })

    test('hint has the moj-search__hint class', () => {
      const hint = $component.querySelector('.govuk-hint')
      expect(hint).toHaveClass('moj-search__hint')
    })

    test('input references the hint via aria-describedby', () => {
      const hint = $component.querySelector('.govuk-hint')
      const input = $component.querySelector('input[type="search"]')
      expect(input).toHaveAttribute('aria-describedby', hint.id)
    })
  })

  // ---------------------------------------------------------------------------
  // With icon button
  // ---------------------------------------------------------------------------

  describe('with icon button', () => {
    beforeAll(() => {
      example = 'with icon button'
    })
    afterAll(() => {
      example = 'default'
    })

    test('button has the moj-search__button--icon class', () => {
      const button = $component.querySelector('button')
      expect(button).toHaveClass('moj-search__button--icon')
    })

    test('renders an SVG icon inside the button', () => {
      const button = $component.querySelector('button')
      expect(button.querySelector('svg')).toBeInTheDocument()
    })

    test('SVG icon is aria-hidden', () => {
      const svg = $component.querySelector('button svg')
      expect(svg).toHaveAttribute('aria-hidden', 'true')
    })

    test('button text is visually hidden', () => {
      const visiblyHidden = $component.querySelector(
        'button .govuk-visually-hidden'
      )
      expect(visiblyHidden).toBeInTheDocument()
      expect(visiblyHidden).toHaveTextContent('Search')
    })
  })

  // ---------------------------------------------------------------------------
  // Icon button in stacked layout
  // ---------------------------------------------------------------------------

  describe('icon button in stacked layout', () => {
    beforeAll(() => {
      example = 'icon button in stacked layout'
    })
    afterAll(() => {
      example = 'default'
    })

    test('button does not have the icon class in stacked layout', () => {
      const button = $component.querySelector('button')
      expect(button).not.toHaveClass('moj-search__button--icon')
    })

    test('button does not render an SVG icon in stacked layout', () => {
      const button = $component.querySelector('button')
      expect(button.querySelector('svg')).toBeNull()
    })
  })

  // ---------------------------------------------------------------------------
  // Icon button with default text
  // ---------------------------------------------------------------------------

  describe('icon button with default text', () => {
    beforeAll(() => {
      example = 'icon button with default text'
    })
    afterAll(() => {
      example = 'default'
    })

    test('visually hidden button text defaults to "search"', () => {
      const visiblyHidden = $component.querySelector(
        'button .govuk-visually-hidden'
      )
      expect(visiblyHidden).toHaveTextContent('search')
    })
  })

  // ---------------------------------------------------------------------------
  // With CSRF token
  // ---------------------------------------------------------------------------

  describe('with csrf', () => {
    beforeAll(() => {
      example = 'with csrf'
    })
    afterAll(() => {
      example = 'default'
    })

    test('renders a hidden input with the default CSRF field name', () => {
      const hidden = $component.querySelector('input[type="hidden"]')
      expect(hidden).toHaveAttribute('name', '_csrf')
    })

    test('hidden input has the correct CSRF value', () => {
      const hidden = $component.querySelector('input[type="hidden"]')
      expect(hidden).toHaveValue('abc123')
    })
  })

  // ---------------------------------------------------------------------------
  // With CSRF token — custom field name
  // ---------------------------------------------------------------------------

  describe('with csrf custom name', () => {
    beforeAll(() => {
      example = 'with csrf custom name'
    })
    afterAll(() => {
      example = 'default'
    })

    test('hidden input uses the custom CSRF field name', () => {
      const hidden = $component.querySelector('input[type="hidden"]')
      expect(hidden).toHaveAttribute('name', 'custom_token')
    })

    test('hidden input has the correct value', () => {
      const hidden = $component.querySelector('input[type="hidden"]')
      expect(hidden).toHaveValue('token123')
    })
  })

  // ---------------------------------------------------------------------------
  // With POST method
  // ---------------------------------------------------------------------------

  describe('with post method', () => {
    beforeAll(() => {
      example = 'with post method'
    })
    afterAll(() => {
      example = 'default'
    })

    test('sets the form method to "post"', () => {
      const form = $component.querySelector('form')
      expect(form).toHaveAttribute('method', 'post')
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
      expect($component).toHaveClass('custom-search-class')
    })

    test('retains the base moj-search class', () => {
      expect($component).toHaveClass('moj-search')
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
  // With custom input classes
  // ---------------------------------------------------------------------------

  describe('with input classes', () => {
    beforeAll(() => {
      example = 'with input classes'
    })
    afterAll(() => {
      example = 'default'
    })

    test('adds custom classes to the input', () => {
      const input = $component.querySelector('input[type="search"]')
      expect(input).toHaveClass('custom-input-class')
    })

    test('retains the moj-search__input class on the input', () => {
      const input = $component.querySelector('input[type="search"]')
      expect(input).toHaveClass('moj-search__input')
    })
  })

  // ---------------------------------------------------------------------------
  // With custom button classes
  // ---------------------------------------------------------------------------

  describe('with button classes', () => {
    beforeAll(() => {
      example = 'with button classes'
    })
    afterAll(() => {
      example = 'default'
    })

    test('adds custom classes to the button', () => {
      const button = $component.querySelector('button')
      expect(button).toHaveClass('custom-button-class')
    })

    test('retains the moj-search__button class on the button', () => {
      const button = $component.querySelector('button')
      expect(button).toHaveClass('moj-search__button')
    })
  })
})
