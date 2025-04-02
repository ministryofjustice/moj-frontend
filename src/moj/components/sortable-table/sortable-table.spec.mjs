/* eslint-disable no-new */

import { queryByRole } from '@testing-library/dom'
import { userEvent } from '@testing-library/user-event'
import { outdent } from 'outdent'

import { SortableTable } from './sortable-table.mjs'

const user = userEvent.setup()

function createComponent() {
  const html = outdent`
    <div>
      <table class="govuk-table" data-module="moj-sortable-table">
        <thead class="govuk-table__head">
          <tr class="govuk-table__row">
            <th scope="col" class="govuk-table__header" aria-sort="ascending">Name</th>
            <th scope="col" class="govuk-table__header" aria-sort="none">Elevation</th>
            <th scope="col" class="govuk-table__header" aria-sort="none">Continent</th>
            <th scope="col" class="govuk-table__header govuk-table__header--numeric" aria-sort="none">First summit</th>
            <th scope="col" class="govuk-table__header" aria-sort="none">Test nickname</th>
          </tr>
        </thead>
        <tbody class="govuk-table__body">
          <tr class="govuk-table__row">
            <td class="govuk-table__cell">Aconcagua</td>
            <td class="govuk-table__cell" data-sort-value="6961">6,961 meters</td>
            <td class="govuk-table__cell">South America</td>
            <td class="govuk-table__cell govuk-table__cell--numeric" data-sort-value="1897">1897</td>
            <td class="govuk-table__cell"></td>
          </tr>
          <tr class="govuk-table__row">
            <td class="govuk-table__cell">Everest</td>
            <td class="govuk-table__cell" data-sort-value="8850">8,850 meters</td>
            <td class="govuk-table__cell">Asia</td>
            <td class="govuk-table__cell govuk-table__cell--numeric" data-sort-value="1953">1953</td>
            <td class="govuk-table__cell">1Tallest</td>
          </tr>
          <tr class="govuk-table__row">
            <td class="govuk-table__cell">Kilimanjaro</td>
            <td class="govuk-table__cell" data-sort-value="5895">5,895 meters</td>
            <td class="govuk-table__cell">Africa</td>
            <td class="govuk-table__cell govuk-table__cell--numeric" data-sort-value="1889">1889</td>
            <td class="govuk-table__cell">KiliJ89</td>
          </tr>
          <tr class="govuk-table__row">
            <td class="govuk-table__cell">K2</td>
            <td class="govuk-table__cell" data-sort-value="8611">8,611 meters</td>
            <td class="govuk-table__cell">Asia</td>
            <td class="govuk-table__cell govuk-table__cell--numeric" data-sort-value="1889">1954</td>
            <td class="govuk-table__cell">1NearlyTallest</td>
          </tr>
        </tbody>
      </table>
    </div>
  `

  document.body.insertAdjacentHTML('afterbegin', html)

  return /** @type {HTMLElement} */ (
    document.querySelector('[data-module="moj-sortable-table"]')
  )
}

describe('sortable table', () => {
  let component

  beforeEach(() => {
    component = createComponent()
    new SortableTable(component)
  })

  afterEach(() => {
    document.body.innerHTML = ''
  })

  test('initialises with buttons in headers', () => {
    const headers = Array.from(component.querySelectorAll('th')).filter(
      (header) => header.getAttribute('aria-sort')
    )

    for (const header of headers) {
      const button = header.querySelector('button')
      expect(button).toBeInTheDocument()
      expect(button).toHaveTextContent(`${header.textContent}`)
    }
  })

  test('creates status box for announcements', () => {
    const statusBox = queryByRole(component.parentElement, 'status')
    expect(statusBox).toBeInTheDocument()
    expect(statusBox).toHaveClass('govuk-visually-hidden')
  })

  test('sorts ascending by Name on initial load', () => {
    const tbody = component.querySelector('tbody')
    const cells = tbody.querySelectorAll('tr td:first-child')
    const values = Array.from(cells).map((cell) => cell.textContent.trim())

    expect(component.querySelector('th')).toHaveAttribute(
      'aria-sort',
      'ascending'
    )
    expect(values).toEqual(['Aconcagua', 'Everest', 'K2', 'Kilimanjaro'])
  })

  test('sorts string column in descending order when clicked', async () => {
    const nameHeaderButton = queryByRole(component, 'button', { name: 'Name' })
    const tbody = component.querySelector('tbody')

    await user.click(nameHeaderButton)

    const descCells = tbody.querySelectorAll('tr td:first-child')
    const descValues = Array.from(descCells).map((cell) =>
      cell.textContent.trim()
    )

    expect(descValues).toEqual(['Kilimanjaro', 'K2', 'Everest', 'Aconcagua'])
    expect(nameHeaderButton.parentElement).toHaveAttribute(
      'aria-sort',
      'descending'
    )

    await user.click(nameHeaderButton)

    const ascCells = tbody.querySelectorAll('tr td:first-child')
    const ascValues = Array.from(ascCells).map((cell) =>
      cell.textContent.trim()
    )

    expect(ascValues).toEqual(['Aconcagua', 'Everest', 'K2', 'Kilimanjaro'])
    expect(nameHeaderButton.parentElement).toHaveAttribute(
      'aria-sort',
      'ascending'
    )
  })

  test('sorts numeric column using data-sort-value', async () => {
    const elevationHeaderButton = queryByRole(component, 'button', {
      name: 'Elevation'
    })
    const tbody = component.querySelector('tbody')

    await user.click(elevationHeaderButton)

    const ascCells = tbody.querySelectorAll('tr td:nth-child(2)')
    const ascValues = Array.from(ascCells).map((cell) =>
      Number.parseInt(cell.getAttribute('data-sort-value'))
    )

    expect(ascValues).toEqual([5895, 6961, 8611, 8850])
    expect(elevationHeaderButton.parentElement).toHaveAttribute(
      'aria-sort',
      'ascending'
    )

    await user.click(elevationHeaderButton)

    const descCells = tbody.querySelectorAll('tr td:nth-child(2)')
    const descValues = Array.from(descCells).map((cell) =>
      Number.parseInt(cell.getAttribute('data-sort-value'))
    )

    expect(descValues).toEqual([8850, 8611, 6961, 5895])
    expect(elevationHeaderButton.parentElement).toHaveAttribute(
      'aria-sort',
      'descending'
    )
  })

  test('sorts mixed data column without specified data-sort-value', async () => {
    const nicknameHeaderButton = queryByRole(component, 'button', {
      name: 'Test nickname'
    })
    const tbody = component.querySelector('tbody')

    await user.click(nicknameHeaderButton)

    const ascCells = tbody.querySelectorAll('tr td:nth-child(5)')
    const ascValues = Array.from(ascCells).map((cell) =>
      cell.textContent.trim()
    )
    // Values converted to numbers in getCellValue function for comparison

    expect(ascValues).toEqual(['', '1NearlyTallest', '1Tallest', 'KiliJ89'])
    expect(nicknameHeaderButton.parentElement).toHaveAttribute(
      'aria-sort',
      'ascending'
    )
  })

  test('updates status message when sorting', async () => {
    const elevationHeaderButton = queryByRole(component, 'button', {
      name: 'Elevation'
    })
    const statusBox = queryByRole(component.parentElement, 'status')

    await user.click(elevationHeaderButton)

    expect(statusBox).toHaveTextContent('Sort by Elevation (ascending)')

    await user.click(elevationHeaderButton)

    expect(statusBox).toHaveTextContent('Sort by Elevation (descending)')
  })

  test('removes sort state from other columns when sorting a new column', async () => {
    const nameHeaderButton = queryByRole(component, 'button', { name: 'Name' })
    const elevationHeaderButton = queryByRole(component, 'button', {
      name: 'Elevation'
    })

    await user.click(elevationHeaderButton)

    expect(nameHeaderButton.parentElement).toHaveAttribute('aria-sort', 'none')
    expect(elevationHeaderButton.parentElement).toHaveAttribute(
      'aria-sort',
      'ascending'
    )
  })

  test('cycles through sort states: none -> ascending -> descending', async () => {
    const headerButton = queryByRole(component, 'button', { name: 'Continent' })
    const header = headerButton.parentElement

    expect(header).toHaveAttribute('aria-sort', 'none')

    await user.click(headerButton)
    expect(header).toHaveAttribute('aria-sort', 'ascending')

    await user.click(headerButton)
    expect(header).toHaveAttribute('aria-sort', 'descending')

    await user.click(headerButton)
    expect(header).toHaveAttribute('aria-sort', 'ascending')
  })
})

describe('sortable table options', () => {
  let component

  beforeEach(() => {
    component = createComponent()
  })

  afterEach(() => {
    document.body.innerHTML = ''
  })

  test('uses default status message when no options provided', async () => {
    new SortableTable(component)

    const elevationHeaderButton = queryByRole(component, 'button', {
      name: 'Elevation'
    })
    const statusBox = queryByRole(component.parentElement, 'status')

    await user.click(elevationHeaderButton)
    expect(statusBox).toHaveTextContent('Sort by Elevation (ascending)')
  })

  test('uses custom status message when provided', async () => {
    new SortableTable(component, {
      statusMessage: 'Sorted column: %heading% (order: %direction%)'
    })

    const elevationHeaderButton = queryByRole(component, 'button', {
      name: 'Elevation'
    })
    const statusBox = queryByRole(component.parentElement, 'status')

    await user.click(elevationHeaderButton)
    expect(statusBox).toHaveTextContent(
      'Sorted column: Elevation (order: ascending)'
    )
  })

  test('uses custom ascending text when provided', async () => {
    new SortableTable(component, {
      ascendingText: 'A to Z'
    })

    const nameHeaderButton = queryByRole(component, 'button', { name: 'Name' })
    const statusBox = queryByRole(component.parentElement, 'status')

    await user.click(nameHeaderButton)
    await user.click(nameHeaderButton)

    expect(statusBox).toHaveTextContent('Sort by Name (A to Z)')
  })

  test('uses custom descending text when provided', async () => {
    new SortableTable(component, {
      descendingText: 'Z to A'
    })

    const nameHeaderButton = queryByRole(component, 'button', { name: 'Name' })
    const statusBox = queryByRole(component.parentElement, 'status')

    await user.click(nameHeaderButton)

    expect(statusBox).toHaveTextContent('Sort by Name (Z to A)')
  })

  test('uses all custom options together', async () => {
    new SortableTable(component, {
      statusMessage: 'component sorted by %heading% in %direction% order',
      ascendingText: 'lowest to highest',
      descendingText: 'highest to lowest'
    })

    const elevationHeaderButton = queryByRole(component, 'button', {
      name: 'Elevation'
    })
    const statusBox = queryByRole(component.parentElement, 'status')

    await user.click(elevationHeaderButton)
    expect(statusBox).toHaveTextContent(
      'component sorted by Elevation in lowest to highest order'
    )

    await user.click(elevationHeaderButton)
    expect(statusBox).toHaveTextContent(
      'component sorted by Elevation in highest to lowest order'
    )
  })
})
