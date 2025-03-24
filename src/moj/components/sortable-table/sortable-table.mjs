export function SortableTable(params) {
  const table = params.table
  const head = table?.querySelector('thead')
  const body = table?.querySelector('tbody')

  if (!table || !(table instanceof HTMLElement) || !head || !body) {
    return
  }

  this.table = table
  this.head = head
  this.body = body

  if (this.table.hasAttribute('data-moj-sortable-table-init')) {
    return
  }

  this.table.setAttribute('data-moj-sortable-table-init', '')

  this.headings = this.head ? Array.from(this.head.querySelectorAll('th')) : []

  this.setupOptions(params)
  this.createHeadingButtons()
  this.createStatusBox()
  this.initialiseSortedColumn()

  this.head.addEventListener('click', this.onSortButtonClick.bind(this))
}

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

SortableTable.prototype.createHeadingButton = function (heading) {
  const index = this.headings.indexOf(heading)
  const button = document.createElement('button')

  button.setAttribute('type', 'button')
  button.setAttribute('data-index', `${index}`)
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
  const columnNumber = Number.parseInt(
    sortButton?.getAttribute('data-index') ?? '0',
    10
  )

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
  const sortDirection = heading.getAttribute('aria-sort')
  const columnNumber = Number.parseInt(
    button?.getAttribute('data-index') ?? '0',
    10
  )

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

SortableTable.prototype.addRows = function (rows) {
  for (const row of rows) {
    this.body.append(row)
  }
}

SortableTable.prototype.getTableRowsArray = function () {
  return Array.from(this.body.querySelectorAll('tr'))
}

SortableTable.prototype.sort = function (rows, columnNumber, sortDirection) {
  return rows.sort((rowA, rowB) => {
    const tdA = rowA.querySelectorAll('td, th')[columnNumber]
    const tdB = rowB.querySelectorAll('td, th')[columnNumber]

    if (
      !tdA ||
      !tdB ||
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

SortableTable.prototype.getCellValue = function (cell) {
  const val = cell.getAttribute('data-sort-value') || cell.innerHTML
  const valAsNumber = Number(val)

  return Number.isFinite(valAsNumber)
    ? valAsNumber // Exclude invalid numbers, infinity etc
    : val
}
