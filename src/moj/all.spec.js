/* eslint-disable no-new */

const { getByTestId } = require('@testing-library/dom')

require('./helpers')
require('./all.js')

describe('initAll', () => {
  test('initialises container', () => {
    MOJFrontend.PasswordReveal = jest.fn()

    const container = document.createElement('div')

    container.innerHTML = `
      <input data-module="moj-password-reveal" data-testid="password-reveal" type="password" />
    `

    MOJFrontend.initAll({ scope: container })

    expect(MOJFrontend.PasswordReveal).toHaveBeenCalledWith(
      getByTestId(container, 'password-reveal')
    )
  })
})
