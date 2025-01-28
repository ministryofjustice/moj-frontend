const { getByDisplayValue, getByText } = require('@testing-library/dom')
const { userEvent } = require('@testing-library/user-event')
const { configureAxe } = require('jest-axe')

require('./password-reveal.js')

const user = userEvent.setup()
const axe = configureAxe({
  rules: {
    // disable landmark rules when testing isolated components.
    region: { enabled: false }
  }
})

describe('Password reveal', () => {
  let container

  beforeEach(() => {
    const input = document.createElement('input')
    input.type = 'password'
    input.value = 'password'

    new MOJFrontend.PasswordReveal(input)

    container = input.parentNode
  })

  test('initialises container', () => {
    expect(container).toHaveClass('moj-password-reveal')
    expect(container).toContainElement(getByText(container, 'Show'))
  })

  test('toggle reveal', async () => {
    const input = getByDisplayValue(container, 'password')
    const button = getByText(container, 'Show')

    await user.click(button)

    expect(input).toHaveAttribute('type', 'text')
    expect(button).toHaveTextContent('Hide')

    await user.click(button)

    expect(input).toHaveAttribute('type', 'password')
    expect(button).toHaveTextContent('Show')
  })

  test('accessibility', async () => {
    const button = getByText(container, 'Show')

    expect(await axe(document.body)).toHaveNoViolations()
    await user.click(button)
    expect(await axe(document.body)).toHaveNoViolations()
  })
})
