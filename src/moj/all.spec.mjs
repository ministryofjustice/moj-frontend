/* eslint-disable no-new */

import { getByTestId } from '@testing-library/dom'

import { initAll } from './all.mjs'
import { PasswordReveal } from './components/password-reveal/password-reveal.mjs'

jest.mock('./components/password-reveal/password-reveal.mjs')

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
