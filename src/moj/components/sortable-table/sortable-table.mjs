/**
 * @class
 * @param {SortableTableConfig} params
 */
export function SortableTable(params) {
  if (!params.table || !(params.table instanceof HTMLElement)) {
    return
  }

  this.table = params.table

  if (this.table.hasAttribute('data-moj-sortable-table-init')) {
    return
  }

  this.table.setAttribute('data-moj-sortable-table-init', '')

  this.head = this.table.querySelector('thead')
  this.body = this.table.querySelector('tbody')
  this.headings = Array.from(this.head.querySelectorAll('th'))

  this.setupOptions(params)
  this.createHeadingButtons()
  this.createStatusBox()
  this.initialiseSortedColumn()

  this.head.addEventListener('click', this.onSortButtonClick.bind(this))
}

/**
 * @param {SortableTableConfig} params
 */
SortableTable.prototype.setupOptions = function (params) {
  params = params || {}
  this.statusMessage = params.statusMessage || 'Sort by %heading% (%direction%)'
  this.ascendingText = params.ascendingText || 'ascending'
  this.descendingText = params.descendingText || 'descending'
}

SortableTable.prototype.createHeadingButtons = function () {
  for (const heading of this.headings) {
    if (heading.hasAttribute('aria-sort')) {
      this.createHeadingButton(heading)
    }
  }
}

/**
 * @param {HTMLElement} heading
 */
SortableTable.prototype.createHeadingButton = function (heading) {
  const index = this.headings.indexOf(heading)
  const button = document.createElement('button')

  button.setAttribute('type', 'button')
  button.setAttribute('data-index', index)
  button.textContent = heading.textContent

  heading.textContent = ''
  heading.appendChild(button)
}

SortableTable.prototype.createStatusBox = function () {
  this.status = document.createElement('div')

  this.status.setAttribute('aria-atomic', 'true')
  this.status.setAttribute('aria-live', 'polite')
  this.status.setAttribute('class', 'govuk-visually-hidden')
  this.status.setAttribute('role', 'status')

  this.table.insertAdjacentElement('afterend', this.status)
}

SortableTable.prototype.initialiseSortedColumn = function () {
  const rows = this.getTableRowsArray()

  const heading = this.table.querySelector('th[aria-sort]')
  const sortButton = heading?.querySelector('button')
  const sortDirection = heading?.getAttribute('aria-sort')
  const columnNumber = sortButton?.getAttribute('data-index')

  if (
    !heading ||
    !sortButton ||
    !(sortDirection === 'ascending' || sortDirection === 'descending')
  ) {
    return
  }

  const sortedRows = this.sort(rows, columnNumber, sortDirection)
  this.addRows(sortedRows)
}

/**
 * @param {MouseEvent} event - Click event
 */
SortableTable.prototype.onSortButtonClick = function (event) {
  const button = event.target

  if (
    !button ||
    !(button instanceof HTMLButtonElement) ||
    !button.parentElement
  ) {
    return
  }

  const heading = button.parentElement
  const columnNumber = button.getAttribute('data-index')
  const sortDirection = heading.getAttribute('aria-sort')

  const newSortDirection =
    sortDirection === 'none' || sortDirection === 'descending'
      ? 'ascending'
      : 'descending'

  const rows = this.getTableRowsArray()
  const sortedRows = this.sort(rows, columnNumber, newSortDirection)

  this.addRows(sortedRows)
  this.removeButtonStates()
  this.updateButtonState(button, newSortDirection)
}

/**
 * @param {HTMLButtonElement} button
 * @param {string} direction
 */
SortableTable.prototype.updateButtonState = function (button, direction) {
  if (!(direction === 'ascending' || direction === 'descending')) {
    return
  }

  button.parentElement.setAttribute('aria-sort', direction)
  let message = this.statusMessage
  message = message.replace(/%heading%/, button.textContent)
  message = message.replace(/%direction%/, this[`${direction}Text`])
  this.status.textContent = message
}

SortableTable.prototype.removeButtonStates = function () {
  for (const heading of this.headings) {
    heading.setAttribute('aria-sort', 'none')
  }
}

/**
 * @param {HTMLTableRowElement[]} rows
 */
SortableTable.prototype.addRows = function (rows) {
  for (const row of rows) {
    this.body.append(row)
  }
}

SortableTable.prototype.getTableRowsArray = function () {
  return Array.from(this.body.querySelectorAll('tr'))
}

/**
 * @param {HTMLTableRowElement[]} rows
 * @param {number} columnNumber
 * @param {string} sortDirection
 */
SortableTable.prototype.sort = function (rows, columnNumber, sortDirection) {
  return rows.sort((rowA, rowB) => {
    const tdA = rowA.querySelectorAll('td, th')[columnNumber]
    const tdB = rowB.querySelectorAll('td, th')[columnNumber]

    if (
      !tdA ||
      !tdA ||
      !(tdA instanceof HTMLElement) ||
      !(tdB instanceof HTMLElement)
    ) {
      return 0
    }

    const valueA =
      sortDirection === 'ascending'
        ? this.getCellValue(tdA)
        : this.getCellValue(tdB)

    const valueB =
      sortDirection === 'ascending'
        ? this.getCellValue(tdB)
        : this.getCellValue(tdA)

    return !(typeof valueA === 'number' && typeof valueB === 'number')
      ? valueA.toString().localeCompare(valueB.toString())
      : valueA - valueB
  })
}

/**
 * @param {HTMLElement} cell
 */
SortableTable.prototype.getCellValue = function (cell) {
  const val = cell.getAttribute('data-sort-value') || cell.innerHTML

  const valAsNumber = Number(val)
  return isNaN(valAsNumber) ? val : valAsNumber
}

/**
 * Sortable table config
 *
 * @typedef {object} SortableTableConfig
 * @property {Element | null} [table] - Table selector
 * @property {string} [statusMessage] - Status message
 * @property {string} [ascendingText] - Ascending text
 * @property {string} [descendingText] - Descending text
 */
