/* eslint-disable no-new */

import { userEvent } from '@testing-library/user-event'
import { outdent } from 'outdent'

import { PdsHeader } from './header.mjs'

const user = userEvent.setup()

function createComponent() {
  const html = outdent`
        <header class="probation-common-header govuk-!-display-none-print" role="banner" data-module="pds-header" data-pds-header-init="">
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
    <path fill="currentColor" d="M4.52884 18.6154C5.59134 17.8269 6.74879 17.2043 8.00119 16.7476C9.25358 16.2909 10.5865 16.0625 12 16.0625C13.4134 16.0625 14.7464 16.2909 15.9987 16.7476C17.2511 17.2043 18.4086 17.8269 19.4711 18.6154C20.2483 17.7612 20.8641 16.7724 21.3185 15.649C21.7728 14.5256 22 13.3093 22 12C22 9.22913 21.026 6.86976 19.0781 4.92184C17.1302 2.97393 14.7708 1.99997 12 1.99997C9.22913 1.99997 6.86976 2.97393 4.92184 4.92184C2.97393 6.86976 1.99997 9.22913 1.99997 12C1.99997 13.3093 2.22714 14.5256 2.68147 15.649C3.1358 16.7724 3.75159 17.7612 4.52884 18.6154ZM12.0003 12.9374C10.8591 12.9374 9.89661 12.5457 9.11297 11.7623C8.32932 10.9789 7.9375 10.0166 7.9375 8.87534C7.9375 7.73407 8.3292 6.77161 9.11259 5.98797C9.89601 5.20432 10.8583 4.8125 11.9996 4.8125C13.1409 4.8125 14.1033 5.2042 14.887 5.98759C15.6706 6.77101 16.0624 7.73334 16.0624 8.87459C16.0624 10.0159 15.6707 10.9783 14.8873 11.762C14.1039 12.5456 13.1416 12.9374 12.0003 12.9374ZM12 23.8749C10.3509 23.8749 8.80406 23.5648 7.35938 22.9446C5.91467 22.3244 4.65785 21.4799 3.58894 20.411C2.52004 19.3421 1.6755 18.0853 1.05531 16.6406C0.435104 15.1959 0.125 13.649 0.125 12C0.125 10.3509 0.435104 8.80406 1.05531 7.35938C1.6755 5.91467 2.52004 4.65785 3.58894 3.58894C4.65785 2.52004 5.91467 1.6755 7.35938 1.05531C8.80406 0.435104 10.3509 0.125 12 0.125C13.649 0.125 15.1959 0.435104 16.6406 1.05531C18.0853 1.6755 19.3421 2.52004 20.411 3.58894C21.4799 4.65785 22.3244 5.91467 22.9446 7.35938C23.5648 8.80406 23.8749 10.3509 23.8749 12C23.8749 13.649 23.5648 15.1959 22.9446 16.6406C22.3244 18.0853 21.4799 19.3421 20.411 20.411C19.3421 21.4799 18.0853 22.3244 16.6406 22.9446C15.1959 23.5648 13.649 23.8749 12 23.8749ZM12 22C13.1282 22 14.2159 21.8185 15.2632 21.4555C16.3105 21.0925 17.2404 20.5849 18.0529 19.9327C17.2404 19.3044 16.3225 18.8149 15.2993 18.4639C14.276 18.1129 13.1763 17.9374 12 17.9374C10.8237 17.9374 9.72191 18.1109 8.69466 18.4579C7.66741 18.8048 6.75154 19.2964 5.94706 19.9327C6.75956 20.5849 7.68946 21.0925 8.73675 21.4555C9.78402 21.8185 10.8718 22 12 22ZM12 11.0625C12.6218 11.0625 13.1418 10.8534 13.5601 10.4351C13.9784 10.0168 14.1875 9.49676 14.1875 8.87497C14.1875 8.25318 13.9784 7.73313 13.5601 7.31484C13.1418 6.89657 12.6218 6.68744 12 6.68744C11.3782 6.68744 10.8581 6.89657 10.4398 7.31484C10.0216 7.73313 9.81244 8.25318 9.81244 8.87497C9.81244 9.49676 10.0216 10.0168 10.4398 10.4351C10.8581 10.8534 11.3782 11.0625 12 11.0625Z"></path>
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
              

              
              <div class="probation-common-header__navigation__item">
                <button data-qa="probation-common-header__menu-toggle" class="probation-common-header__menu-toggle probation-common-header__services-menu-toggle" aria-controls="probation-common-header-services-menu" aria-expanded="false" data-text-for-show="Show services menu" data-text-for-hide="Hide services menu" type="button" aria-label="Show services menu">
                    <span>
                      <span class="govuk-!-font-size-19 govuk-!-font-weight-bold">Menu</span>
                    </span>
                </button>

                <div class="probation-common-header__icon-link-wrapper probation-common-header__services-menu-link" hidden="hidden">
                  <a class="probation-common-header__link" href="">
                      <span>
                        <span class="govuk-visually-hidden"> Services</span>
                        <span>Menu</span>
                      </span>
                  </a>
                </div>
              </div>
              

            </div>
          </div>
        </div>
        
        
        <div id="probation-common-header-services-menu" class="probation-common-header__pushdown-menu probation-common-header__services-menu" hidden="hidden">
          <div class="govuk-width-container">
            <div class="govuk-grid-row">
              <div class="govuk-grid-column-full">
                <h3 class="govuk-heading-m">
                  Services
                </h3>
                <ul class="govuk-list">
                  
                    <li><a href="#" class="probation-common-header__submenu-link" target="_blank" rel="noopener noreferrer">Service 1</a></li>
                  
                </ul>
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
    const servicesToggle = document.querySelector('.probation-common-header__services-menu-toggle')
    const servicesMenu = document.querySelector('#probation-common-header-services-menu')

    expect(toggleButton).toBeInTheDocument()
    expect(toggleButton).toHaveAttribute('aria-expanded', 'false')
    expect(toggleLabel).toHaveTextContent('Account')
    expect(userName).toHaveTextContent('Account name')
    expect(servicesToggle).toHaveTextContent('Menu')

    expect(userMenuOptions).toHaveAttribute('hidden', 'hidden')
    expect(servicesToggle).toHaveAttribute('hidden', 'hidden')
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
