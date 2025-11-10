import { queryByRole } from '@testing-library/dom'

import { render, getExamples } from '../../lib/components.js'

/**
 * Renders an alert fixture into the document body.
 *
 * @param {object} example - Example options from getExamples()
 * @returns {HTMLElement} The root component element
 */
function renderExample(example) {
  document.body.insertAdjacentHTML('afterbegin', render('alert', example))

  return /** @type {HTMLElement} */ (
    document.querySelector('[data-module="moj-alert"]')
  )
}

describe('alert', () => {
  let examples
  let example = 'default'
  let $component

  beforeAll(async () => {
    examples = await getExamples('alert')
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

    test('has the moj-alert class', () => {
      expect($component).toHaveClass('moj-alert')
    })

    test('has the information variant class by default', () => {
      expect($component).toHaveClass('moj-alert--information')
    })

    test('has the moj-alert data-module attribute', () => {
      expect($component).toHaveAttribute('data-module', 'moj-alert')
    })

    test('defaults to the "region" role', () => {
      expect($component).toHaveAttribute('role', 'region')
    })

    test('sets an aria-label including the variant and title', () => {
      expect($component).toHaveAttribute(
        'aria-label',
        'information: The finance section has moved'
      )
    })

    test('renders the text content', () => {
      expect($component.querySelector('.moj-alert__content')).toHaveTextContent(
        'You can now find it in the new building'
      )
    })

    test('does not show the title as a heading', () => {
      expect($component.querySelector('.moj-alert__heading')).toBeNull()
    })

    test('does not add the with-heading class', () => {
      expect($component).not.toHaveClass('moj-alert--with-heading')
    })

    test('renders an SVG icon', () => {
      expect(
        $component.querySelector('svg.moj-alert__icon')
      ).toBeInTheDocument()
    })

    test('renders a hidden dismiss button by default', () => {
      const dismissButton = queryByRole($component, 'button', { hidden: true })
      expect(dismissButton).toHaveAttribute('hidden')
    })

    test('dismiss button has the default text', () => {
      const dismissButton = queryByRole($component, 'button', { hidden: true })
      expect(dismissButton).toHaveTextContent('Dismiss')
    })

    test('does not set the data-dismissible attribute', () => {
      expect($component).not.toHaveAttribute('data-dismissible')
    })

    test('does not set the data-disable-auto-focus attribute', () => {
      expect($component).not.toHaveAttribute('data-disable-auto-focus')
    })
  })

  // ---------------------------------------------------------------------------
  // With HTML content
  // ---------------------------------------------------------------------------

  describe('with html', () => {
    beforeAll(() => {
      example = 'with html'
    })
    afterAll(() => {
      example = 'default'
    })

    test('renders the html content', () => {
      const link = $component.querySelector('.moj-alert__content a')
      expect(link).toBeInTheDocument()
      expect(link).toHaveTextContent('new building')
    })
  })

  // ---------------------------------------------------------------------------
  // With title shown as heading
  // ---------------------------------------------------------------------------

  describe('with title as heading', () => {
    beforeAll(() => {
      example = 'with title as heading'
    })
    afterAll(() => {
      example = 'default'
    })

    test('adds the with-heading class', () => {
      expect($component).toHaveClass('moj-alert--with-heading')
    })

    test('renders the title inside a heading element', () => {
      const heading = $component.querySelector('.moj-alert__heading')
      expect(heading).toBeInTheDocument()
      expect(heading.tagName).toBe('H2')
      expect(heading).toHaveTextContent('The finance section has moved')
    })

    test('still renders the text content', () => {
      expect($component.querySelector('.moj-alert__content')).toHaveTextContent(
        'You can now find it in the new building'
      )
    })
  })

  // ---------------------------------------------------------------------------
  // With title only, no content
  // ---------------------------------------------------------------------------

  describe('with title only', () => {
    beforeAll(() => {
      example = 'with title only'
    })
    afterAll(() => {
      example = 'default'
    })

    test('renders the title as plain content', () => {
      expect($component.querySelector('.moj-alert__content')).toHaveTextContent(
        'The finance section has moved'
      )
    })

    test('does not add the with-heading class', () => {
      expect($component).not.toHaveClass('moj-alert--with-heading')
    })
  })

  // ---------------------------------------------------------------------------
  // With custom heading tag
  // ---------------------------------------------------------------------------

  describe('with custom heading tag', () => {
    beforeAll(() => {
      example = 'with custom heading tag'
    })
    afterAll(() => {
      example = 'default'
    })

    test('renders the heading using the custom tag', () => {
      const heading = $component.querySelector('.moj-alert__heading')
      expect(heading.tagName).toBe('H3')
    })
  })

  // ---------------------------------------------------------------------------
  // Success variant
  // ---------------------------------------------------------------------------

  describe('success variant', () => {
    beforeAll(() => {
      example = 'success'
    })
    afterAll(() => {
      example = 'default'
    })

    test('has the success variant class', () => {
      expect($component).toHaveClass('moj-alert--success')
    })

    test('sets an aria-label including the success variant', () => {
      expect($component).toHaveAttribute(
        'aria-label',
        'success: Your application has been submitted'
      )
    })
  })

  // ---------------------------------------------------------------------------
  // Warning variant
  // ---------------------------------------------------------------------------

  describe('warning variant', () => {
    beforeAll(() => {
      example = 'warning'
    })
    afterAll(() => {
      example = 'default'
    })

    test('has the warning variant class', () => {
      expect($component).toHaveClass('moj-alert--warning')
    })
  })

  // ---------------------------------------------------------------------------
  // Error variant
  // ---------------------------------------------------------------------------

  describe('error variant', () => {
    beforeAll(() => {
      example = 'error'
    })
    afterAll(() => {
      example = 'default'
    })

    test('has the error variant class', () => {
      expect($component).toHaveClass('moj-alert--error')
    })
  })

  // ---------------------------------------------------------------------------
  // Dismissible
  // ---------------------------------------------------------------------------

  describe('dismissible', () => {
    beforeAll(() => {
      example = 'dismissible'
    })
    afterAll(() => {
      example = 'default'
    })

    test('sets the data-dismissible attribute to "true"', () => {
      expect($component).toHaveAttribute('data-dismissible', 'true')
    })
  })

  // ---------------------------------------------------------------------------
  // Dismissible "false" string
  // ---------------------------------------------------------------------------

  describe('dismissible false string', () => {
    beforeAll(() => {
      example = 'dismissible false string'
    })
    afterAll(() => {
      example = 'default'
    })

    test('does not set the data-dismissible attribute', () => {
      expect($component).not.toHaveAttribute('data-dismissible')
    })
  })

  // ---------------------------------------------------------------------------
  // With custom dismiss text
  // ---------------------------------------------------------------------------

  describe('with custom dismiss text', () => {
    beforeAll(() => {
      example = 'with custom dismiss text'
    })
    afterAll(() => {
      example = 'default'
    })

    test('renders the custom dismiss button text', () => {
      const dismissButton = queryByRole($component, 'button', { hidden: true })
      expect(dismissButton).toHaveTextContent('Close')
    })
  })

  // ---------------------------------------------------------------------------
  // With alert role
  // ---------------------------------------------------------------------------

  describe('with alert role', () => {
    beforeAll(() => {
      example = 'with alert role'
    })
    afterAll(() => {
      example = 'default'
    })

    test('sets the role attribute to "alert"', () => {
      expect($component).toHaveAttribute('role', 'alert')
    })
  })

  // ---------------------------------------------------------------------------
  // With disableAutoFocus
  // ---------------------------------------------------------------------------

  describe('with disable auto focus', () => {
    beforeAll(() => {
      example = 'with disable auto focus'
    })
    afterAll(() => {
      example = 'default'
    })

    test('sets the data-disable-auto-focus attribute to "true"', () => {
      expect($component).toHaveAttribute('data-disable-auto-focus', 'true')
    })
  })

  // ---------------------------------------------------------------------------
  // With focusOnDismissSelector
  // ---------------------------------------------------------------------------

  describe('with focus on dismiss selector', () => {
    beforeAll(() => {
      example = 'with focus on dismiss selector'
    })
    afterAll(() => {
      example = 'default'
    })

    test('sets the data-focus-on-dismiss-selector attribute', () => {
      expect($component).toHaveAttribute(
        'data-focus-on-dismiss-selector',
        '#focus-target'
      )
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
      expect($component).toHaveClass('custom-alert-class')
    })

    test('retains the base moj-alert class', () => {
      expect($component).toHaveClass('moj-alert')
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
})
