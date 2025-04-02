/* eslint-disable no-new */

import { queryByRole } from '@testing-library/dom'
import { userEvent } from '@testing-library/user-event'
import { outdent } from 'outdent'

import { SearchToggle } from './search-toggle.mjs'

const user = userEvent.setup()

function createComponent() {
  const html = outdent`
    <div class="moj-search-toggle" data-module="moj-search-toggle">
      <div class="moj-search-toggle__toggle"></div>
      <div class="moj-search-toggle__search">

        <div class="moj-search moj-search--ondark moj-search--toggle moj-js-hidden">
          <form action="" method="get">

            <div class="govuk-form-group">
              <label class="govuk-label moj-search__label govuk-visually-hidden" for="search2">
                Search
              </label>

              <div id="search2-hint" class="govuk-hint moj-search__hint ">
                Enter case number, for example 123456
              </div>

              <input class="govuk-input moj-search__input " id="search2" name="search2" type="search" aria-describedby="search2-hint">
            </div>

            <button type="submit" class="govuk-button moj-search__button " data-module="govuk-button">
              Search
            </button>

          </form>
        </div>

      </div>
    </div>

    <a href="#">link</a>
  `

  document.body.insertAdjacentHTML('afterbegin', html)

  return /** @type {HTMLElement} */ (
    document.querySelector('[data-module="moj-search-toggle"]')
  )
}

describe('search toggle', () => {
  let component
  let buttonContainer
  let searchContainer

  beforeEach(() => {
    component = createComponent()
    searchContainer = component.querySelector('.moj-search')
    buttonContainer = component.querySelector('.moj-search-toggle__toggle')

    new SearchToggle(component, {
      toggleButton: {
        text: 'Find case'
      }
    })
  })

  afterEach(() => {
    document.body.innerHTML = ''
  })

  test('initialises component', () => {
    const toggleButton = queryByRole(buttonContainer, 'button')

    expect(toggleButton).toBeInTheDocument()
    expect(toggleButton).toHaveTextContent('Find case')
    expect(toggleButton).toHaveAttribute('aria-haspopup', 'true')
    expect(toggleButton).toHaveAttribute('aria-expanded', 'false')

    expect(searchContainer).toHaveClass('moj-js-hidden')
  })

  test('clicking button toggles search container', async () => {
    const toggleButton = queryByRole(buttonContainer, 'button')

    await user.click(toggleButton)

    expect(toggleButton).toHaveAttribute('aria-expanded', 'true')
    expect(searchContainer).not.toHaveClass('moj-js-hidden')

    const input = queryByRole(searchContainer, 'searchbox')
    expect(input).toHaveFocus()

    await user.click(toggleButton)

    expect(toggleButton).toHaveAttribute('aria-expanded', 'false')
    expect(searchContainer).toHaveClass('moj-js-hidden')
    expect(toggleButton).toHaveFocus()
  })

  test('clicking outside closes the search container', async () => {
    const toggleButton = queryByRole(buttonContainer, 'button')

    await user.click(toggleButton)

    expect(toggleButton).toHaveAttribute('aria-expanded', 'true')
    expect(searchContainer).not.toHaveClass('moj-js-hidden')

    await user.click(document.body)

    expect(toggleButton).toHaveAttribute('aria-expanded', 'false')
    expect(searchContainer).toHaveClass('moj-js-hidden')
  })

  test('tabbing closes the search container', async () => {
    const toggleButton = queryByRole(buttonContainer, 'button')

    await user.click(toggleButton)

    expect(toggleButton).toHaveAttribute('aria-expanded', 'true')
    expect(searchContainer).not.toHaveClass('moj-js-hidden')

    await user.tab()
    await user.tab()

    expect(toggleButton).toHaveAttribute('aria-expanded', 'false')
    expect(searchContainer).toHaveClass('moj-js-hidden')
  })
})
