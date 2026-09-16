import { render, getExamples } from '../../lib/components.js'

/**
 * Renders a named notification badge fixture into the document body.
 *
 * @param {object} example - Example options from getExamples()
 * @returns {HTMLElement | null} The root component element, or null when the
 *   badge renders nothing (for example a zero count)
 */
function renderExample(example) {
  document.body.insertAdjacentHTML(
    'afterbegin',
    render('notification-badge', example)
  )

  return document.querySelector('span[class^=moj-notification-badge]')
}

describe('notification badge', () => {
  let examples
  let example = 'default'
  let $component

  beforeAll(async () => {
    examples = await getExamples('notification-badge')
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

    test('renders the moj-notification-badge class', () => {
      expect($component).toHaveClass('moj-notification-badge')
    })

    test('renders the count in an aria-hidden span', () => {
      const count = $component.querySelector('[aria-hidden="true"]')
      expect(count).toHaveTextContent('5')
    })

    test('renders the visually hidden text with the count and context', () => {
      const hidden = $component.querySelector('.govuk-visually-hidden')
      expect(hidden).toHaveTextContent('(5 new messages)')
    })
  })

  // ---------------------------------------------------------------------------
  // Zero
  // ---------------------------------------------------------------------------

  describe('zero', () => {
    beforeAll(() => {
      example = 'zero'
    })
    afterAll(() => {
      example = 'default'
    })

    test('renders nothing', () => {
      expect($component).toBeNull()
    })
  })

  // ---------------------------------------------------------------------------
  // Negative number
  // ---------------------------------------------------------------------------

  describe('negative number', () => {
    beforeAll(() => {
      example = 'negative number'
    })
    afterAll(() => {
      example = 'default'
    })

    test('renders nothing', () => {
      expect($component).toBeNull()
    })
  })

  // ---------------------------------------------------------------------------
  // Non-numeric text
  // ---------------------------------------------------------------------------

  describe('non-numeric text', () => {
    beforeAll(() => {
      example = 'non-numeric text'
    })
    afterAll(() => {
      example = 'default'
    })

    test('renders nothing', () => {
      expect($component).toBeNull()
    })
  })

  // ---------------------------------------------------------------------------
  // 99 or more
  // ---------------------------------------------------------------------------

  describe('99 or more', () => {
    beforeAll(() => {
      example = '99 or more'
    })
    afterAll(() => {
      example = 'default'
    })

    test('caps the displayed count at "99+"', () => {
      const count = $component.querySelector('[aria-hidden="true"]')
      expect(count).toHaveTextContent('99+')
    })

    test('uses "99 or more" in the visually hidden text', () => {
      const hidden = $component.querySelector('.govuk-visually-hidden')
      expect(hidden).toHaveTextContent('(99 or more new messages)')
    })
  })

  // ---------------------------------------------------------------------------
  // Exactly 99
  // ---------------------------------------------------------------------------

  describe('exactly 99', () => {
    beforeAll(() => {
      example = 'exactly 99'
    })
    afterAll(() => {
      example = 'default'
    })

    test('caps the displayed count at "99+"', () => {
      const count = $component.querySelector('[aria-hidden="true"]')
      expect(count).toHaveTextContent('99+')
    })

    test('uses "99 or more" in the visually hidden text', () => {
      const hidden = $component.querySelector('.govuk-visually-hidden')
      expect(hidden).toHaveTextContent('(99 or more new messages)')
    })
  })

  // ---------------------------------------------------------------------------
  // Without visually hidden text
  // ---------------------------------------------------------------------------

  describe('without visually hidden text', () => {
    beforeAll(() => {
      example = 'without visually hidden text'
    })
    afterAll(() => {
      example = 'default'
    })

    test('only includes the count in the visually hidden text', () => {
      const hidden = $component.querySelector('.govuk-visually-hidden')
      expect(hidden).toHaveTextContent('(5)')
    })
  })

  // ---------------------------------------------------------------------------
  // With custom classes
  // ---------------------------------------------------------------------------

  describe('with classes', () => {
    beforeAll(() => {
      example = 'with classes'
    })
    afterAll(() => {
      example = 'default'
    })

    // Note: the template has no space between "moj-notification-badge" and
    // the custom classes, so they're concatenated into a single class name
    // rather than added as a separate class.
    test('concatenates custom classes onto the base class name', () => {
      expect($component).toHaveClass(
        'moj-notification-badgecustom-notification-badge-class'
      )
    })
  })

  // ---------------------------------------------------------------------------
  // With custom attributes
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
})
