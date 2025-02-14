import $ from 'jquery'

/**
 * @class
 * @param {SortableTableConfig} params
 */
export function SortableTable(params) {
  if (!params.table || !(params.table instanceof HTMLElement)) {
    return
  }

  this.table = $(params.table)

  this.body = this.table.find('tbody')
  this.statusMessage = 'Sort by %heading% (%direction%)'
  this.ascendingText = 'ascending'
  this.descendingText = 'descending'

  if (this.table.data('moj-search-toggle-initialised')) {
    return
  }

  this.status = $(
    '<div aria-live="polite" role="status" aria-atomic="true" class="govuk-visually-hidden" />'
  )

  this.table.parent().append(this.status)

  this.setupOptions(params)
  this.createHeadingButtons()
  this.initialiseSortedColumn()

  this.table.data('moj-search-toggle-initialised', true)
  this.table.on('click', 'th button', this.onSortButtonClick.bind(this))
}

/**
 * @param {SortableTableConfig} params
 */
SortableTable.prototype.setupOptions = function (params) {
  if (params.statusMessage) this.statusMessage = params.statusMessage
  if (params.ascendingText) this.ascendingText = params.ascendingText
  if (params.descendingText) this.descendingText = params.descendingText
}

SortableTable.prototype.createHeadingButtons = function () {
  const headings = this.table.find('thead th')

  for (let i = 0; i < headings.length; i++) {
    const heading = $(headings[i])

    if (heading.attr('aria-sort')) {
      this.createHeadingButton(heading, i)
    }
  }
}

/**
 * @param {JQuery<HTMLElement>} heading
 * @param {number} i
 */
SortableTable.prototype.createHeadingButton = function (heading, i) {
  const text = heading.text()
  const button = $(`<button type="button" data-index="${i}">${text}</button>`)
  heading.text('')
  heading.append(button)
}

SortableTable.prototype.initialiseSortedColumn = function () {
  const rows = this.getTableRowsArray()

  this.table
    .find('th')
    .filter('[aria-sort="ascending"], [aria-sort="descending"]')
    .first()
    .each((index, el) => {
      const sortDirection = $(el).attr('aria-sort') || 'none'
      const columnNumber = Number($(el).find('button').attr('data-index'))
      const sortedRows = this.sort(rows, columnNumber, sortDirection)
      this.addRows(sortedRows)
    })
}

/**
 * @param {JQuery.ClickEvent<HTMLElement, undefined, HTMLButtonElement>} e - Click event
 */
SortableTable.prototype.onSortButtonClick = function (e) {
  const columnNumber = Number(e.currentTarget.getAttribute('data-index'))
  const sortDirection = $(e.currentTarget).parent().attr('aria-sort') || 'none'

  const newSortDirection =
    sortDirection === 'descending' || sortDirection === 'none'
      ? 'ascending'
      : 'descending'

  const rows = this.getTableRowsArray()
  const sortedRows = this.sort(rows, columnNumber, newSortDirection)

  this.addRows(sortedRows)
  this.removeButtonStates()
  this.updateButtonState($(e.currentTarget), newSortDirection)
}

/**
 * @param {JQuery<HTMLButtonElement>} button
 * @param {string} direction
 */
SortableTable.prototype.updateButtonState = function (button, direction) {
  if (!(direction === 'ascending' || direction === 'descending')) {
    return
  }

  button.parent().attr('aria-sort', direction)
  let message = this.statusMessage
  message = message.replace(/%heading%/, button.text())
  message = message.replace(/%direction%/, this[`${direction}Text`])
  this.status.text(message)
}

SortableTable.prototype.removeButtonStates = function () {
  this.table.find('thead th').attr('aria-sort', 'none')
}

/**
 * @param {HTMLTableRowElement[]} rows
 */
SortableTable.prototype.addRows = function (rows) {
  for (let i = 0; i < rows.length; i++) {
    this.body.append(rows[i])
  }
}

SortableTable.prototype.getTableRowsArray = function () {
  const rows = []
  const trs = this.body.find('tr')
  for (let i = 0; i < trs.length; i++) {
    rows.push(trs[i])
  }
  return rows
}

/**
 * @param {HTMLTableRowElement[]} rows
 * @param {number} columnNumber
 * @param {string} sortDirection
 */
SortableTable.prototype.sort = function (rows, columnNumber, sortDirection) {
  return rows.sort((rowA, rowB) => {
    const tdA = $(rowA).find('td,th').eq(columnNumber)
    const tdB = $(rowB).find('td,th').eq(columnNumber)

    const valueA =
      sortDirection === 'ascending'
        ? this.getCellValue(tdA)
        : this.getCellValue(tdB)

    const valueB =
      sortDirection === 'ascending'
        ? this.getCellValue(tdB)
        : this.getCellValue(tdA)

    if (typeof valueA === 'string' || typeof valueB === 'string')
      return valueA.toString().localeCompare(valueB.toString())
    return valueA - valueB
  })
}

/**
 * @param {JQuery<HTMLElement>} cell
 */
SortableTable.prototype.getCellValue = function (cell) {
  const val = cell.attr('data-sort-value') || cell.html()

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
