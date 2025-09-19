/* eslint-disable no-new */

import { userEvent } from '@testing-library/user-event'
import { outdent } from 'outdent'

import { PdsHeader } from './header.mjs'

const user = userEvent.setup()

function createComponent() {
  const html = outdent`
        <header class="probation-common-header govuk-!-display-none-print" role="banner" data-module="pds-header">
            <div class="govuk-clearfix">
                <div class="govuk-width-container probation-common-header__title">
                    <a class="probation-common-header__link probation-common-header__title__organisation-name" href="#">
                        <svg role="presentation" focusable="false" class="probation-common-header__logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" height="40" width="40">
                        </svg>
                        Probation Digital Services
                    </a>
                    <strong class="govuk-tag govuk-tag--green" data-qa="probation-common-environment-tag">
                    DEV
                    </strong>
                </div>
                <nav aria-labelledby="probation-common-navigation-heading">
                    <h2 id="probation-common-navigation-heading" class="govuk-visually-hidden">
                        Navigation menu
                    </h2>
                    <div class="govuk-width-container probation-common-header__button-width-container">
                        <div class="probation-common-header__button-container">
                            <div class="probation-common-header__navigation">                
                                <div class="probation-common-header__navigation__item">
                                    <button class="probation-common-header__menu-toggle probation-common-header__user-menu-toggle" aria-controls="probation-common-header-user-menu" aria-expanded="false" type="button">
                                        <span>             
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" alt="">
                                            </svg>
                                            <span>
                                                <span class="probation-common-header__menu-toggle-label">Account</span>
                                                <span data-qa="probation-common-header-user-name">Account name</span>
                                            </span>
                                        </span>
                                    </button>
                                    <ul id="probation-common-header-user-menu" class="govuk-list probation-common-header__user-menu" hidden="hidden">
                                        <li>
                                        <a class="probation-common-header__submenu-link" href="#">Your account</a>
                                        </li>
                                        <li>
                                        <a class="probation-common-header__submenu-link" href="/sign-out">Sign out</a>
                                        </li>
                                    </ul>
                                    <div class="probation-common-header__icon-link-wrapper probation-common-header__user-menu-link" hidden="hidden">
                                        <a class="probation-common-header__link" href="#">
                                        <span>
                                            <span class="govuk-visually-hidden"> Manage your account or sign out</span>
                                            <span>Account name</span>
                                        </span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>   
                </nav>
            </div>
        </header>
  `

  document.body.insertAdjacentHTML('afterbegin', html)

  return /** @type {HTMLElement} */ (
    document.querySelector('[data-module="pds-header"]')
  )
}

describe('pds header', () => {
  let component
  let userMenuOptions

  beforeEach(() => {
    component = createComponent()
    userMenuOptions = component.querySelector(
      '.probation-common-header__user-menu'
    )

    new PdsHeader(component)
  })

  afterEach(() => {
    document.body.innerHTML = ''
  })

  test('initialises component', () => {
    const toggleButton = component.querySelector(
      '.probation-common-header__menu-toggle'
    )
    const toggleLabel = component.querySelector(
      '.probation-common-header__menu-toggle-label'
    )
    const userName = component.querySelector(
      '[data-qa="probation-common-header-user-name"]'
    )

    expect(toggleButton).toBeInTheDocument()
    expect(toggleButton).toHaveAttribute('aria-expanded', 'false')
    expect(toggleLabel).toHaveTextContent('Account')
    expect(userName).toHaveTextContent('Account name')

    expect(userMenuOptions).toHaveAttribute('hidden', 'hidden')
  })

  test('clicking button toggles user menu', async () => {
    const toggleButton = component.querySelector(
      '.probation-common-header__menu-toggle'
    )

    await user.click(toggleButton)

    expect(toggleButton).toHaveAttribute('aria-expanded', 'true')
    expect(userMenuOptions).not.toHaveAttribute('hidden', 'hidden')

    await user.click(toggleButton)

    expect(toggleButton).toHaveAttribute('aria-expanded', 'false')
    expect(userMenuOptions).toHaveAttribute('hidden', 'hidden')
  })
})
