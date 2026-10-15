import { getByRole } from '@testing-library/dom'

import { render, getExamples } from '../../lib/components.js'

/**
 * Renders a scrollable pane fixture with its call block content.
 *
 * @param {{context?: unknown, fixture?: {callBlock?: string}}} example - Fixture options and content
 * @returns {HTMLElement} The root component element
 */
function renderExample(example) {
  document.body.insertAdjacentHTML(
    'afterbegin',
    render('scrollable-pane', {
      context: example.context,
      callBlock: example.fixture?.callBlock
    })
  )

  return /** @type {HTMLElement} */ (
    document.querySelector('.moj-scrollable-pane')
  )
}

describe('scrollable pane macro', () => {
  let examples
  let example = 'default'
  let component

  beforeAll(async () => {
    examples = await getExamples('scrollable-pane')
  })

  beforeEach(() => {
    component = renderExample(examples[example])
  })

  afterEach(() => {
    document.body.innerHTML = ''
  })

  describe('by default', () => {
    test('renders a labelled, keyboard-focusable region', () => {
      expect(
        getByRole(document.body, 'region', {
          name: 'Historic rainfall in June'
        })
      ).toBe(component)
      expect(component).toHaveClass('moj-scrollable-pane')
      expect(component).toHaveAttribute('tabindex', '0')
      expect(component).toHaveAttribute(
        'aria-label',
        'Historic rainfall in June'
      )
      expect(component).not.toHaveAttribute('aria-labelledby')
    })

    test('renders call block HTML inside the pane', () => {
      const table = getByRole(component, 'table', {
        name: 'Historic rainfall in June'
      })

      expect(
        getByRole(table, 'columnheader', { name: 'Station' })
      ).toBeInTheDocument()
      expect(getByRole(table, 'cell', { name: '13.7mm' })).toBeInTheDocument()
    })
  })

  describe('with labelled by', () => {
    beforeAll(() => {
      example = 'with labelled by'
    })
    afterAll(() => {
      example = 'default'
    })

    test('uses the referenced heading to label a focusable region', () => {
      expect(component).toHaveAttribute('aria-labelledby', 'pane-heading')
      expect(component).not.toHaveAttribute('aria-label')
      expect(component).toHaveAttribute('tabindex', '0')
      expect(
        getByRole(document.body, 'region', {
          name: 'Historic rainfall in June'
        })
      ).toBe(component)
    })
  })

  describe('with label and labelled by', () => {
    beforeAll(() => {
      example = 'with label and labelled by'
    })
    afterAll(() => {
      example = 'default'
    })

    test('uses label in preference to labelledBy', () => {
      expect(component).toHaveAttribute('aria-label', 'Rainfall measurements')
      expect(component).not.toHaveAttribute('aria-labelledby')
      expect(
        getByRole(document.body, 'region', { name: 'Rainfall measurements' })
      ).toBe(component)
    })
  })

  describe.each(['without label', 'with empty labels'])('%s', (fixtureName) => {
    beforeAll(() => {
      example = fixtureName
    })
    afterAll(() => {
      example = 'default'
    })

    test('renders content without region or focus attributes', () => {
      expect(component).toHaveTextContent('Rainfall measurements by station.')
      expect(component).not.toHaveAttribute('role')
      expect(component).not.toHaveAttribute('tabindex')
      expect(component).not.toHaveAttribute('aria-label')
      expect(component).not.toHaveAttribute('aria-labelledby')
    })
  })

  describe('with classes', () => {
    beforeAll(() => {
      example = 'with classes'
    })
    afterAll(() => {
      example = 'default'
    })

    test('adds custom classes while retaining the base class', () => {
      expect(component).toHaveClass(
        'moj-scrollable-pane',
        'custom-pane-class',
        'another-pane-class'
      )
    })
  })

  describe('with attributes', () => {
    beforeAll(() => {
      example = 'with attributes'
    })
    afterAll(() => {
      example = 'default'
    })

    test('adds custom attributes to the pane', () => {
      expect(component).toHaveAttribute('id', 'rainfall-pane')
      expect(component).toHaveAttribute('data-custom', 'custom-value')
    })
  })

  describe('with special characters', () => {
    beforeAll(() => {
      example = 'with special characters'
    })
    afterAll(() => {
      example = 'default'
    })

    test('escapes label and attribute values', () => {
      expect(component).toHaveAttribute(
        'data-custom',
        'A "quoted" value <with markup> & symbols'
      )
      expect(
        getByRole(document.body, 'region', {
          name: 'Rainfall "measurements" <by station> & year'
        })
      ).toBe(component)
    })
  })
})
