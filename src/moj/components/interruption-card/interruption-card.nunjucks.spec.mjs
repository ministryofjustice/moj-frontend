import { getByRole, queryByRole } from '@testing-library/dom'
import nunjucks from 'nunjucks'

import { getExamples } from '../../lib/components.js'

// The interruption card macro is named `interruptionCard` rather than
// `mojInterruptionCard`, so it doesn't follow the naming convention assumed
// by the shared `render()` helper in ../../lib/components.js. A local
// Nunjucks environment and render helper are used here instead, mirroring
// the behaviour of the shared helper (including `callBlock` support).
const env = nunjucks.configure(['src', 'node_modules/govuk-frontend/dist/'], {
  trimBlocks: true,
  lstripBlocks: true
})

/**
 * Renders the interruption card macro with the given fixture.
 *
 * @param {object} example - Example options from getExamples()
 * @returns {string} Rendered HTML
 */
function render(example) {
  const paramsFormatted = JSON.stringify(example.context ?? {}, undefined, 2)
  const macroPath = 'moj/components/interruption-card/macro.njk'
  const callBlock = example.fixture?.callBlock ?? ''

  const macroString = `{%- from "${macroPath}" import interruptionCard -%}{%- call interruptionCard(${paramsFormatted}) -%}${callBlock}{%- endcall -%}`

  return env.renderString(macroString, {})
}

/**
 * Renders a named interruption card fixture into the document body.
 *
 * @param {object} example - Example options from getExamples()
 * @returns {HTMLElement} The root component element
 */
function renderExample(example) {
  document.body.insertAdjacentHTML('afterbegin', render(example))

  return /** @type {HTMLElement} */ (
    document.querySelector('.moj-interruption-card')
  )
}

describe('interruption card', () => {
  let examples
  let example = 'default'
  let $component

  beforeAll(async () => {
    examples = await getExamples('interruption-card')
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

    test('has the moj-interruption-card class', () => {
      expect($component).toHaveClass('moj-interruption-card')
    })

    test('renders the heading', () => {
      const heading = $component.querySelector(
        '.moj-interruption-card__heading'
      )
      expect(heading).toHaveTextContent('Are you sure you want to change this?')
    })

    test('renders the heading as an h1', () => {
      const heading = getByRole($component, 'heading', { level: 1 })
      expect(heading).toHaveTextContent('Are you sure you want to change this?')
    })

    test('renders the body content passed via caller()', () => {
      const body = $component.querySelector('.moj-interruption-card__body')
      expect(body).toContainHTML(
        "<p>You've changed the person's address from Wales to England. This means that the referral needs to be cancelled.</p>"
      )
    })

    test('renders the primary action as a button by default', () => {
      const primaryAction = getByRole($component, 'button', {
        name: 'Continue'
      })
      expect(primaryAction).toBeInTheDocument()
      expect(primaryAction).toHaveAttribute('href', '#')
      expect(primaryAction).toHaveClass('govuk-button--inverse')
    })

    test('renders the secondary action as a link by default', () => {
      const secondaryAction = getByRole($component, 'link', {
        name: 'Go back to application'
      })
      expect(secondaryAction).toBeInTheDocument()
      expect(secondaryAction).toHaveAttribute('href', '#')
      expect(secondaryAction).toHaveClass('govuk-link--inverse')
    })

    test('renders the primary action as an anchor with role="button"', () => {
      const primaryAction = getByRole($component, 'button', {
        name: 'Continue'
      })
      expect(primaryAction.tagName).toBe('A')
    })
  })

  // ---------------------------------------------------------------------------
  // Primary action as a link
  // ---------------------------------------------------------------------------

  describe('primary action as link', () => {
    beforeAll(() => {
      example = 'primary action as link'
    })
    afterAll(() => {
      example = 'default'
    })

    test('renders the primary action as a link', () => {
      const primaryAction = getByRole($component, 'link', {
        name: 'Continue'
      })
      expect(primaryAction).toBeInTheDocument()
      expect(primaryAction).toHaveClass('govuk-link--inverse')
    })

    test('does not render the primary action as a button', () => {
      const primaryButton = queryByRole($component, 'button', {
        name: 'Continue'
      })
      expect(primaryButton).not.toBeInTheDocument()
    })
  })

  // ---------------------------------------------------------------------------
  // Secondary action as a button
  // ---------------------------------------------------------------------------

  describe('secondary action as button', () => {
    beforeAll(() => {
      example = 'secondary action as button'
    })
    afterAll(() => {
      example = 'default'
    })

    test('renders the secondary action as a button', () => {
      const secondaryAction = getByRole($component, 'button', {
        name: 'Go back to application'
      })
      expect(secondaryAction).toBeInTheDocument()
      expect(secondaryAction).toHaveClass('govuk-button--inverse')
    })

    test('does not render the secondary action as a link', () => {
      const secondaryLink = queryByRole($component, 'link', {
        name: 'Go back to application'
      })
      expect(secondaryLink).not.toBeInTheDocument()
    })
  })

  // ---------------------------------------------------------------------------
  // Without a secondary action
  // ---------------------------------------------------------------------------

  describe('without secondary action', () => {
    beforeAll(() => {
      example = 'without secondary action'
    })
    afterAll(() => {
      example = 'default'
    })

    test('does not render a secondary action', () => {
      const secondaryLink = queryByRole($component, 'link', {
        name: /Go back/
      })
      const secondaryButton = queryByRole($component, 'button', {
        name: /Go back/
      })
      expect(secondaryLink).not.toBeInTheDocument()
      expect(secondaryButton).not.toBeInTheDocument()
    })

    test('still renders the primary action', () => {
      const primaryAction = getByRole($component, 'button', {
        name: 'Continue'
      })
      expect(primaryAction).toBeInTheDocument()
    })
  })

  // ---------------------------------------------------------------------------
  // With custom primary action attributes
  // ---------------------------------------------------------------------------

  describe('with primary action attributes', () => {
    beforeAll(() => {
      example = 'with primary action attributes'
    })
    afterAll(() => {
      example = 'default'
    })

    test('passes custom attributes through to the primary action button', () => {
      const primaryAction = getByRole($component, 'button', {
        name: 'Continue'
      })
      expect(primaryAction).toHaveAttribute('data-custom', 'custom-value')
    })
  })

  // ---------------------------------------------------------------------------
  // With custom secondary action attributes
  // ---------------------------------------------------------------------------

  describe('with secondary action attributes', () => {
    beforeAll(() => {
      example = 'with secondary action attributes'
    })
    afterAll(() => {
      example = 'default'
    })

    test('passes custom attributes through to the secondary action button', () => {
      const secondaryAction = getByRole($component, 'button', {
        name: 'Go back to application'
      })
      expect(secondaryAction).toHaveAttribute('data-custom', 'custom-value')
    })
  })

  // ---------------------------------------------------------------------------
  // With multiple paragraphs of body content
  // ---------------------------------------------------------------------------

  describe('with multiple paragraphs', () => {
    beforeAll(() => {
      example = 'with multiple paragraphs'
    })
    afterAll(() => {
      example = 'default'
    })

    test('renders every paragraph passed via caller()', () => {
      const paragraphs = $component.querySelectorAll(
        '.moj-interruption-card__body p'
      )
      expect(paragraphs).toHaveLength(3)
      expect(paragraphs[1]).toHaveTextContent(
        'Previous home address: 1 Willow Lane, Newchurch, Kington, HR5 3QF'
      )
      expect(paragraphs[2]).toHaveTextContent(
        'New home address: 9 Elm Street, Whitney-on-Wye, Hereford, HR3 6EH'
      )
    })
  })
})
