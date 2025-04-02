/* eslint-disable no-new */

import { getByDisplayValue, getByText } from '@testing-library/dom'
import { userEvent } from '@testing-library/user-event'
import { configureAxe } from 'jest-axe'
import { outdent } from 'outdent'

import { PasswordReveal } from './password-reveal.mjs'

const user = userEvent.setup()
const axe = configureAxe({
  rules: {
    // disable landmark rules when testing isolated components.
    region: { enabled: false }
  }
})

function createComponent() {
  const html = outdent`
    <div class="govuk-form-group" data-module="moj-password-reveal">
      <label class="govuk-label govuk-label--m" for="password">
        Password
      </label>

      <input class="govuk-input govuk-input--width-20" id="password" name="password" type="password" value="1234ABC!">
    </div>
  `

  document.body.insertAdjacentHTML('afterbegin', html)

  return /** @type {HTMLElement} */ (
    document.querySelector('[data-module="moj-password-reveal"]')
  )
}

describe('Password reveal', () => {
  let component
  let wrapper

  beforeEach(() => {
    component = createComponent()

    new PasswordReveal(component)

    wrapper = component.querySelector('input').parentElement
  })

  afterEach(() => {
    document.body.innerHTML = ''
  })

  test('initialises container', () => {
    expect(component).toHaveClass('moj-password-reveal')
    expect(wrapper).toHaveClass('moj-password-reveal__wrapper')
    expect(wrapper).toContainElement(getByText(wrapper, 'Show'))
  })

  test('toggle reveal', async () => {
    const input = getByDisplayValue(component, '1234ABC!')
    const button = getByText(component, 'Show')

    await user.click(button)

    expect(input).toHaveAttribute('type', 'text')
    expect(button).toHaveTextContent('Hide')

    await user.click(button)

    expect(input).toHaveAttribute('type', 'password')
    expect(button).toHaveTextContent('Show')
  })

  test('accessibility', async () => {
    const button = getByText(component, 'Show')

    expect(await axe(document.body)).toHaveNoViolations()
    await user.click(button)
    expect(await axe(document.body)).toHaveNoViolations()
  })
})
