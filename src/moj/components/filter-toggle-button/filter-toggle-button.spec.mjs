/* eslint-disable no-new */

import { queryByRole } from '@testing-library/dom'
import { userEvent } from '@testing-library/user-event'
import { configureAxe } from 'jest-axe'
import merge from 'lodash/merge.js'
import { setMedia } from 'mock-match-media'
import { outdent } from 'outdent'

import { FilterToggleButton } from './filter-toggle-button.mjs'

const user = userEvent.setup()
const axe = configureAxe({
  rules: {
    // disable landmark rules when testing isolated components.
    region: { enabled: false }
  }
})

function createComponent() {
  const html = outdent`
    <div class="moj-filter" data-module="moj-filter">
      <div class="moj-filter__header">
        <div class="moj-filter__header-title">
          <h2 class="govuk-heading-m">Filter</h2>
        </div>
        <div class="moj-filter__header-action"></div>
      </div>
    </div>
    <div class="moj-action-bar">
      <div class="moj-action-bar__filter"></div>
    </div>
  `

  document.body.insertAdjacentHTML('afterbegin', html)

  return /** @type {HTMLElement} */ (
    document.querySelector('[data-module="moj-filter"]')
  )
}

describe('Filter toggle in big mode', () => {
  let component
  let config

  beforeEach(() => {
    setMedia({
      width: '800px'
    })

    component = createComponent()

    config = {
      bigModeMediaQuery: '(min-width: 600px)',
      startHidden: true,
      toggleButton: {
        showText: 'Show filter',
        hideText: 'Hide filter',
        classes: 'govuk-button--secondary'
      },
      toggleButtonContainer: {
        element: document.querySelector('.moj-action-bar__filter')
      },
      closeButton: {
        text: 'Close',
        classes: 'moj-filter__close'
      },
      closeButtonContainer: {
        element: document.querySelector('.moj-filter__header-action')
      }
    }
  })

  afterEach(() => {
    document.body.innerHTML = ''
  })

  test('creates toggle button', () => {
    const { element: buttonContainer } = config.toggleButtonContainer

    new FilterToggleButton(component, config)

    const toggleButton = queryByRole(buttonContainer, 'button')

    expect(toggleButton).toBeInTheDocument()
    expect(toggleButton.innerHTML).toBe('Show filter')
    expect(toggleButton).toHaveAttribute('aria-expanded', 'false')
    expect(toggleButton).toHaveClass('govuk-button--secondary')

    expect(component).toHaveAttribute('tabindex', '-1')
    expect(component).toHaveClass('moj-js-hidden')
  })

  test('toggle button reveals filters', async () => {
    const { element: buttonContainer } = config.toggleButtonContainer

    new FilterToggleButton(component, config)

    const toggleButton = queryByRole(buttonContainer, 'button')

    expect(component).toHaveAttribute('tabindex', '-1')
    expect(component).toHaveClass('moj-js-hidden')

    await user.click(toggleButton)

    expect(toggleButton).toHaveAttribute('aria-expanded', 'true')
    expect(toggleButton.innerHTML).toBe('Hide filter')
    expect(component).not.toHaveClass('moj-js-hidden')
    expect(component).toHaveFocus()

    await user.click(toggleButton)

    expect(toggleButton).toHaveAttribute('aria-expanded', 'false')
    expect(toggleButton.innerHTML).toBe('Show filter')
    expect(component).toHaveClass('moj-js-hidden')

    expect(toggleButton).toHaveFocus()
  })

  test('start visible', () => {
    const { element: buttonContainer } = config.toggleButtonContainer

    new FilterToggleButton(
      component,
      merge(config, {
        startHidden: false
      })
    )

    const toggleButton = queryByRole(buttonContainer, 'button')

    expect(toggleButton.innerHTML).toBe('Hide filter')
    expect(component).not.toHaveClass('moj-js-hidden')
  })

  test('custom button text', async () => {
    const { element: buttonContainer } = config.toggleButtonContainer

    new FilterToggleButton(
      component,
      merge(config, {
        toggleButton: {
          showText: 'Custom label',
          hideText: 'Hide me'
        }
      })
    )

    const toggleButton = queryByRole(buttonContainer, 'button')
    expect(toggleButton.innerHTML).toBe('Custom label')

    await user.click(toggleButton)
    expect(toggleButton.innerHTML).toBe('Hide me')
  })

  test('custom toggle button classes', () => {
    const { element: buttonContainer } = config.toggleButtonContainer

    new FilterToggleButton(
      component,
      merge(config, {
        toggleButton: { classes: 'classname-1 classname-2' }
      })
    )

    const toggleButton = queryByRole(buttonContainer, 'button')
    expect(toggleButton).toHaveClass('classname-1 classname-2')
  })

  describe('accessibility', () => {
    test('component has no wcag violations', async () => {
      const { element: buttonContainer } = config.toggleButtonContainer

      new FilterToggleButton(component, config)

      const toggleButton = queryByRole(buttonContainer, 'button')
      expect(await axe(document.body)).toHaveNoViolations()

      await user.click(toggleButton)
      expect(await axe(document.body)).toHaveNoViolations()
    })
  })
})

describe('Filter toggle in small mode', () => {
  let component
  let config

  beforeEach(() => {
    setMedia({
      width: '500px'
    })

    component = createComponent()

    config = {
      bigModeMediaQuery: '(min-width: 600px)',
      startHidden: true,
      toggleButton: {
        showText: 'Show filter',
        hideText: 'Hide filter',
        classes: 'govuk-button--secondary'
      },
      toggleButtonContainer: {
        element: document.querySelector('.moj-action-bar__filter')
      },
      closeButton: {
        text: 'Close',
        classes: 'moj-filter__close'
      },
      closeButtonContainer: {
        element: document.querySelector('.moj-filter__header-action')
      }
    }
  })

  afterEach(() => {
    document.body.innerHTML = ''
  })

  test('creates toggle button', () => {
    const { element: buttonContainer } = config.toggleButtonContainer

    new FilterToggleButton(component, config)

    const toggleButton = queryByRole(buttonContainer, 'button')

    expect(toggleButton).toBeInTheDocument()
    expect(toggleButton.innerHTML).toBe('Show filter')
    expect(toggleButton).toHaveAttribute('aria-expanded', 'false')
    expect(toggleButton).toHaveClass('govuk-button--secondary')

    expect(component).toHaveAttribute('tabindex', '-1')
    expect(component).toHaveClass('moj-js-hidden')
  })

  test('toggle button reveals filters', async () => {
    const { element: buttonContainer } = config.toggleButtonContainer

    new FilterToggleButton(component, config)

    const toggleButton = queryByRole(buttonContainer, 'button')

    expect(component).toHaveAttribute('tabindex', '-1')
    expect(component).toHaveClass('moj-js-hidden')

    await user.click(toggleButton)

    expect(toggleButton).toHaveAttribute('aria-expanded', 'true')
    expect(toggleButton.innerHTML).toBe('Hide filter')
    expect(component).not.toHaveClass('moj-js-hidden')
    expect(component).toHaveFocus()

    await user.click(toggleButton)

    expect(toggleButton).toHaveAttribute('aria-expanded', 'false')
    expect(toggleButton.innerHTML).toBe('Show filter')
    expect(component).toHaveClass('moj-js-hidden')

    expect(toggleButton).toHaveFocus()
  })

  test('start visible is ignored', () => {
    const { element: buttonContainer } = config.toggleButtonContainer

    new FilterToggleButton(
      component,
      merge(config, {
        startHidden: false
      })
    )

    const toggleButton = queryByRole(buttonContainer, 'button')

    expect(toggleButton.innerHTML).toBe('Show filter')
    expect(component).toHaveClass('moj-js-hidden')
  })

  test('adds a close button', async () => {
    const { element: buttonContainer } = config.toggleButtonContainer
    const { element: closeButtonContainer } = config.closeButtonContainer

    new FilterToggleButton(
      component,
      merge(config, {
        startHidden: false
      })
    )

    const toggleButton = queryByRole(buttonContainer, 'button')

    await user.click(toggleButton)

    const closeButton = queryByRole(closeButtonContainer, 'button')

    expect(closeButton).toBeInTheDocument()
    expect(closeButton.innerHTML).toBe('Close')
  })

  test('hides on resize from big to small', async () => {
    const { element: buttonContainer } = config.toggleButtonContainer

    setMedia({
      width: '800px'
    })

    new FilterToggleButton(
      component,
      merge(config, {
        startHidden: false
      })
    )

    const toggleButton = queryByRole(buttonContainer, 'button')

    expect(toggleButton.innerHTML).toBe('Hide filter')
    expect(component).not.toHaveClass('moj-js-hidden')

    setMedia({
      width: '500px'
    })

    expect(toggleButton.innerHTML).toBe('Show filter')
    expect(component).toHaveClass('moj-js-hidden')
  })

  test('shows on resize from small to big', async () => {
    const { element: buttonContainer } = config.toggleButtonContainer

    setMedia({
      width: '500px'
    })

    new FilterToggleButton(component, config)
    const toggleButton = queryByRole(buttonContainer, 'button')

    expect(toggleButton.innerHTML).toBe('Show filter')
    expect(component).toHaveClass('moj-js-hidden')

    setMedia({
      width: '800px'
    })

    expect(toggleButton.innerHTML).toBe('Hide filter')
    expect(component).not.toHaveClass('moj-js-hidden')
  })

  describe('accessibility', () => {
    test('component has no wcag violations', async () => {
      const { element: buttonContainer } = config.toggleButtonContainer

      new FilterToggleButton(component, config)

      const toggleButton = queryByRole(buttonContainer, 'button')
      expect(await axe(document.body)).toHaveNoViolations()

      await user.click(toggleButton)
      expect(await axe(document.body)).toHaveNoViolations()
    })
  })
})
