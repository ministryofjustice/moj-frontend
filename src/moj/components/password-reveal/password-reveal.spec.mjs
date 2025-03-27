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
    <div class="govuk-form-group">
      <label class="govuk-label govuk-label--m" for="password">
        Password
      </label>

      <input class="govuk-input govuk-input--width-20" id="password" name="password" type="password" value="1234ABC!" data-module="moj-password-reveal">
    </div>
  `

  document.body.insertAdjacentHTML('afterbegin', html)

  return /** @type {HTMLElement} */ (
    document.querySelector('[data-module="moj-password-reveal"]')
  )
}

describe('Password reveal', () => {
  let component
  let group

  beforeEach(() => {
    component = createComponent()

    new PasswordReveal(component)

    group = component.parentElement
  })

  afterEach(() => {
    document.body.innerHTML = ''
  })

  test('initialises container', () => {
    expect(group).toHaveClass('moj-password-reveal')
    expect(group).toContainElement(getByText(group, 'Show'))
  })

  test('toggle reveal', async () => {
    const input = getByDisplayValue(group, '1234ABC!')
    const button = getByText(group, 'Show')

    await user.click(button)

    expect(input).toHaveAttribute('type', 'text')
    expect(button).toHaveTextContent('Hide')

    await user.click(button)

    expect(input).toHaveAttribute('type', 'password')
    expect(button).toHaveTextContent('Show')
  })

  test('accessibility', async () => {
    const button = getByText(group, 'Show')

    expect(await axe(document.body)).toHaveNoViolations()
    await user.click(button)
    expect(await axe(document.body)).toHaveNoViolations()
  })
})
