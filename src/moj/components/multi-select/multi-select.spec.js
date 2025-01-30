/* eslint-disable no-new */

const { queryByRole, queryAllByRole } = require('@testing-library/dom')
const { userEvent } = require('@testing-library/user-event')

require('./multi-select.js')

const user = userEvent.setup()

const createComponent = (id = 'multi-select', idprefix = false) => {
  const html = `
<table id="${id}" class="govuk-table" data-module="moj-multi-select" data-multi-select-checkbox="#${id}-select-all" ${idprefix ? `data-multi-select-idprefix="${idprefix}-"` : ''}>
  <thead class="govuk-table__head">
    <tr class="govuk-table__row">
      <th class="govuk-table__header" scope="col" id="${id}-select-all"></th>
      <th class="govuk-table__header" scope="col">Name</th>
    </tr>
  </thead>
  <tbody class="govuk-table__body">
    <tr class="govuk-table__row govuk-table__row--selected">
      <td class="govuk-table__cell">
        <div class="govuk-checkboxes__item govuk-checkboxes--small moj-multi-select__checkbox">
          <input type="checkbox" class="govuk-checkboxes__input" id="mountain-aconcagua">
          <label class="govuk-label govuk-checkboxes__label" for="mountain-aconcagua">
            <span class="govuk-visually-hidden">Select Aconcagua</span>
          </label>
        </div>
      </td>
      <td class="govuk-table__cell">Aconcagua</td>
    </tr>
    <tr class="govuk-table__row">
      <td class="govuk-table__cell">
        <div class="govuk-checkboxes__item govuk-checkboxes--small moj-multi-select__checkbox">
          <input type="checkbox" class="govuk-checkboxes__input" id="mountain-denali" value="denali">
          <label class="govuk-label govuk-checkboxes__label" for="mountain-denali">
            <span class="govuk-visually-hidden">Select Denali</span>
          </label>
        </div>
      </td>
      </td>
      <td class="govuk-table__cell">Denali</td>
    </tr>
  </tbody>
</table>
`
  document.body.insertAdjacentHTML('afterbegin', html)
  const component = document.querySelector(`#${id}`)
  return component
}

describe('multi select', () => {
  let component
  let container
  let checkboxes

  beforeEach(() => {
    component = createComponent()
    container = component.querySelector('#multi-select-select-all')
    checkboxes = component.querySelectorAll('tbody input[type=checkbox]')

    new MOJFrontend.MultiSelect({
      container,
      checkboxes
    })
  })

  afterEach(() => {
    document.body.innerHTML = ''
  })

  test('initialises component', () => {
    const selectToggle = queryByRole(container, 'checkbox')

    expect(selectToggle).toBeInTheDocument()
    expect(selectToggle).toHaveAccessibleName('Select all')
  })

  test('toggles all checkboxes', async () => {
    const selectToggle = queryByRole(container, 'checkbox')
    const tbody = component.querySelector('tbody')
    const checkboxes = queryAllByRole(tbody, 'checkbox')

    expect(checkboxes).toHaveLength(2)
    checkboxes.forEach((checkbox) => {
      expect(checkbox).not.toBeChecked()
    })

    await user.click(selectToggle)
    expect(selectToggle).toBeChecked()

    checkboxes.forEach((checkbox) => {
      expect(checkbox).toBeChecked()
    })

    await user.click(selectToggle)
    expect(selectToggle).not.toBeChecked()

    checkboxes.forEach((checkbox) => {
      expect(checkbox).not.toBeChecked()
    })
  })

  test('deselcting single checkbox unchecks all checkbox', async () => {
    const selectToggle = queryByRole(container, 'checkbox')
    const tbody = component.querySelector('tbody')
    const checkboxes = queryAllByRole(tbody, 'checkbox')

    expect(checkboxes).toHaveLength(2)
    checkboxes.forEach((checkbox) => {
      expect(checkbox).not.toBeChecked()
    })

    await user.click(selectToggle)
    expect(selectToggle).toBeChecked()

    checkboxes.forEach((checkbox) => {
      expect(checkbox).toBeChecked()
    })

    await user.click(checkboxes[0])
    expect(checkboxes[0]).not.toBeChecked()
    expect(selectToggle).not.toBeChecked()

    await user.click(checkboxes[0])
    expect(checkboxes[0]).toBeChecked()
    expect(selectToggle).toBeChecked()
  })
})
