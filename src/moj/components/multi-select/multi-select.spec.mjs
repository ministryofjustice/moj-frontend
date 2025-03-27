/* eslint-disable no-new */

import { getByLabelText, queryAllByRole } from '@testing-library/dom'
import { userEvent } from '@testing-library/user-event'
import { outdent } from 'outdent'

import { MultiSelect } from './multi-select.mjs'

const user = userEvent.setup()

/**
 * @param {object} params
 * @param {string} [params.idPrefix]
 * @param {Record<string, string>} [params.attributes]
 */
function createComponent(params = {}) {
  const { idPrefix = '' } = params

  const attributes = Object.entries(params.attributes ?? {}).map(
    ([key, value]) => ` ${key}="${value}"`
  )

  const html = outdent`
    <table class="govuk-table" data-module="moj-multi-select"${attributes}>
      <thead class="govuk-table__head">
        <tr class="govuk-table__row">
          <th class="govuk-table__header" scope="col" id="${idPrefix}select-all"></th>
          <th class="govuk-table__header" scope="col">Name</th>
        </tr>
      </thead>
      <tbody class="govuk-table__body">
        <tr class="govuk-table__row govuk-table__row--selected">
          <td class="govuk-table__cell">
            <div class="govuk-checkboxes__item govuk-checkboxes--small moj-multi-select__checkbox">
              <input type="checkbox" class="govuk-checkboxes__input" id="mountain-aconcagua" value="aconcagua">
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

  return /** @type {HTMLElement} */ (
    document.querySelector('[data-module="moj-multi-select"]')
  )
}

describe('multi select', () => {
  let component

  beforeEach(() => {
    component = createComponent({
      idPrefix: 'mountain-',
      attributes: {
        'data-id-prefix': 'mountain-'
      }
    })

    new MultiSelect(component, {
      idPrefix: 'mountain-',
      checkboxes: {
        items: component.querySelectorAll('tbody input[type=checkbox]')
      }
    })
  })

  afterEach(() => {
    document.body.innerHTML = ''
  })

  test('initialises component', () => {
    const selectToggle = getByLabelText(component, 'Select all')
    expect(selectToggle).toBeInTheDocument()
  })

  test('toggles all checkboxes', async () => {
    const selectToggle = getByLabelText(component, 'Select all')
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
    const selectToggle = getByLabelText(component, 'Select all')
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
