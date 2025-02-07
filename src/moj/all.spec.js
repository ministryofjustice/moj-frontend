/* eslint-disable no-new */

const { getByTestId } = require('@testing-library/dom')

const { initAll } = require('./all.js')
const {
  PasswordReveal
} = require('./components/password-reveal/password-reveal.js')

jest.mock('./components/password-reveal/password-reveal.js')

describe('initAll', () => {
  test('initialises container', () => {
    const container = document.createElement('div')

    container.innerHTML = `
      <input data-module="moj-password-reveal" data-testid="password-reveal" type="password" />
    `

    initAll({ scope: container })

    expect(PasswordReveal).toHaveBeenCalledWith(
      getByTestId(container, 'password-reveal')
    )
  })
})
