/* eslint-disable no-new */

import { getByDisplayValue, getByText } from '@testing-library/dom'
import { userEvent } from '@testing-library/user-event'
import { configureAxe } from 'jest-axe'

import { PasswordReveal } from './password-reveal.mjs'

const user = userEvent.setup()
const axe = configureAxe({
  rules: {
    // disable landmark rules when testing isolated components.
    region: { enabled: false }
  }
})

describe('Password reveal', () => {
  let group

  beforeEach(() => {
    const input = document.createElement('input')
    input.type = 'password'
    input.value = 'password'

    const container = document.createElement('div')
    container.className = 'govuk-form-group'
    container.append(input)

    new PasswordReveal(input)

    group = input.parentElement
  })

  test('initialises container', () => {
    expect(group).toHaveClass('moj-password-reveal')
    expect(group).toContainElement(getByText(group, 'Show'))
  })

  test('toggle reveal', async () => {
    const input = getByDisplayValue(group, 'password')
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
