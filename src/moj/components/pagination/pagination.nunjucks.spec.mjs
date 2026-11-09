import { getByRole, queryByRole } from '@testing-library/dom'

import { render, getExamples } from '../../lib/components.js'

/**
 * Renders a pagination fixture into the document body.
 *
 * @param {object} example - Example options from getExamples()
 * @returns {HTMLElement} The root component element
 */
function renderExample(example) {
  document.body.insertAdjacentHTML('afterbegin', render('pagination', example))

  return /** @type {HTMLElement} */ (document.querySelector('.moj-pagination'))
}

describe('pagination', () => {
  let examples
  let example = 'default'
  let $component

  beforeAll(async () => {
    examples = await getExamples('pagination')
  })

  beforeEach(() => {
    $component = renderExample(examples[example])
  })

  afterEach(() => {
    document.body.innerHTML = ''
  })

  describe('by default', () => {
    test('renders the component and pagination navigation', () => {
      expect($component).toBeInTheDocument()
      expect(getByRole($component, 'navigation')).toHaveClass(
        'moj-pagination__pagination'
      )
    })

    test('renders previous and next links', () => {
      expect(
        getByRole($component, 'link', { name: /previous/i })
      ).toHaveAttribute('href', '#')
      expect(getByRole($component, 'link', { name: /next/i })).toHaveAttribute(
        'href',
        '#'
      )
    })

    test('renders every pagination item', () => {
      expect(
        $component.querySelectorAll('.govuk-pagination__item')
      ).toHaveLength(3)
    })

    test('maps text and selected options to GOV.UK pagination options', () => {
      const currentPage = getByRole($component, 'link', { name: 'Page 2' })

      expect(currentPage).toHaveTextContent('2')
      expect(currentPage).toHaveAttribute('aria-current', 'page')
      expect(currentPage.parentElement).toHaveClass(
        'govuk-pagination__item--current'
      )
    })

    test('does not render results text', () => {
      expect($component.querySelector('.moj-pagination__results')).toBeNull()
    })
  })

  describe('without page items', () => {
    beforeAll(() => {
      example = 'default no pages'
    })
    afterAll(() => {
      example = 'default'
    })

    test('does not render previous and next controls on their own', () => {
      expect(queryByRole($component, 'navigation')).not.toBeInTheDocument()
    })
  })

  describe('with one page', () => {
    beforeAll(() => {
      example = 'one page'
    })
    afterAll(() => {
      example = 'default'
    })

    test('does not render pagination controls', () => {
      expect(queryByRole($component, 'navigation')).not.toBeInTheDocument()
    })

    test('does not render results without results options', () => {
      expect($component.querySelector('.moj-pagination__results')).toBeNull()
    })
  })

  describe('with one page and a results window', () => {
    beforeAll(() => {
      example = 'one page with results window and count'
    })
    afterAll(() => {
      example = 'default'
    })

    test('renders the results window and total', () => {
      expect(
        $component.querySelector('.moj-pagination__results')
      ).toHaveTextContent('Showing 1 to 7 of 7 total results')
    })
  })

  describe('with one page and a results count', () => {
    beforeAll(() => {
      example = 'one page with results count'
    })
    afterAll(() => {
      example = 'default'
    })

    test('renders the total results count', () => {
      expect(
        $component.querySelector('.moj-pagination__results')
      ).toHaveTextContent('7 total results')
    })
  })

  describe('with one page and a pages count', () => {
    beforeAll(() => {
      example = 'one page with pages count'
    })
    afterAll(() => {
      example = 'default'
    })

    test('renders the current and total page counts', () => {
      expect(
        $component.querySelector('.moj-pagination__results')
      ).toHaveTextContent('Page 1 of 1')
    })
  })

  describe('with a results window', () => {
    beforeAll(() => {
      example = 'with results window'
    })
    afterAll(() => {
      example = 'default'
    })

    test('renders the window without a total', () => {
      expect(
        $component.querySelector('.moj-pagination__results')
      ).toHaveTextContent('Showing results 11 to 20')
    })
  })

  describe('with a results window and count', () => {
    beforeAll(() => {
      example = 'with results window and count'
    })
    afterAll(() => {
      example = 'default'
    })

    test('renders the window and total', () => {
      expect(
        $component.querySelector('.moj-pagination__results')
      ).toHaveTextContent('Showing 11 to 20 of 28 total results')
    })
  })

  describe('with a results count only', () => {
    beforeAll(() => {
      example = 'with results count only'
    })
    afterAll(() => {
      example = 'default'
    })

    test('renders the total without a window', () => {
      const $results = $component.querySelector('.moj-pagination__results')

      expect($results).toHaveTextContent('28 total results')
      expect($results).not.toHaveTextContent('Showing')
    })
  })

  describe('with no pages and a results count', () => {
    beforeAll(() => {
      example = 'with no pages and results count'
    })
    afterAll(() => {
      example = 'default'
    })

    test('renders the result count without pagination controls', () => {
      expect(queryByRole($component, 'navigation')).not.toBeInTheDocument()
      expect(
        $component.querySelector('.moj-pagination__results')
      ).toHaveTextContent('8 total results')
    })
  })

  describe('with a pages count', () => {
    beforeAll(() => {
      example = 'with pages count'
    })
    afterAll(() => {
      example = 'default'
    })

    test('renders the current and total page counts', () => {
      expect(
        $component.querySelector('.moj-pagination__results')
      ).toHaveTextContent('Page 2 of 3')
    })
  })

  describe('with legacy dots options', () => {
    beforeAll(() => {
      example = 'with dots'
    })
    afterAll(() => {
      example = 'default'
    })

    test('maps a dots item to a GOV.UK ellipsis item', () => {
      expect(
        $component.querySelectorAll('.govuk-pagination__item')
      ).toHaveLength(3)
      expect(
        $component.querySelector('.govuk-pagination__item--ellipsis')
      ).toBeInTheDocument()
    })
  })

  describe('with GOV.UK pagination options', () => {
    beforeAll(() => {
      example = 'with govuk pagination args'
    })
    afterAll(() => {
      example = 'default'
    })

    test('supports number, ellipsis and current options', () => {
      expect(
        $component.querySelector('.govuk-pagination__item--ellipsis')
      ).toBeInTheDocument()

      const currentPage = getByRole($component, 'link', { name: 'Page 3' })
      expect(currentPage).toHaveAttribute('aria-current', 'page')
      expect(currentPage).toHaveTextContent('3')
    })
  })

  describe('with classes, attributes and a landmark label', () => {
    beforeAll(() => {
      example = 'with classes attributes and landmark label'
    })
    afterAll(() => {
      example = 'default'
    })

    test('passes options to the pagination navigation', () => {
      const $pagination = getByRole($component, 'navigation', {
        name: 'Search results'
      })

      expect($pagination).toHaveClass('custom-pagination-class')
      expect($pagination).toHaveClass('moj-pagination__pagination')
      expect($pagination).toHaveAttribute('data-custom', 'custom-value')
    })
  })

  describe('with a custom results term', () => {
    beforeAll(() => {
      example = 'with custom results term'
    })
    afterAll(() => {
      example = 'default'
    })

    test('uses the custom term in the results summary', () => {
      expect(
        $component.querySelector('.moj-pagination__results')
      ).toHaveTextContent('Showing 11 to 20 of 28 total cases')
    })
  })
})
