const { queryByRole } = require('@testing-library/dom')
const { userEvent } = require('@testing-library/user-event')
const { configureAxe } = require('jest-axe')
const $ = require('jquery')

require('./search-toggle.js')

const user = userEvent.setup()
const axe = configureAxe({
  rules: {
    // disable landmark rules when testing isolated components.
    region: { enabled: false }
  }
})

const createComponent = () => {
  html = `
<div class="moj-search-toggle" data-module="moj-search-toggle" data-moj-search-toggle-text="Find case">
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
<a href="#">link</a>`
  document.body.insertAdjacentHTML('afterbegin', html)
  const component = document.querySelector('.moj-search-toggle')
  return component
}

describe('search toggle', () => {
  let component, buttonContainer, searchContainer

  beforeEach(() => {
    component = createComponent()
    searchContainer = component.querySelector('.moj-search')
    buttonContainer = component.querySelector('.moj-search-toggle__toggle')

    new MOJFrontend.SearchToggle({
      toggleButton: {
        container: $(buttonContainer),
        text: component.getAttribute('data-moj-search-toggle-text')
      },
      search: {
        container: $(searchContainer)
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
