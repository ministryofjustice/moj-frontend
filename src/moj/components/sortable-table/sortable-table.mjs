export function SortableTable(params) {
  this.table = params.table

  if (this.table.dataset.mojSearchToggleInitialised) {
    return
  }

  this.table.dataset.mojSearchToggleInitialised = 'true'

  this.head = this.table.querySelector('thead')
  this.body = this.table.querySelector('tbody')
  this.rows = this.body.querySelectorAll('tr')
  this.headings = this.head.querySelectorAll('th')

  this.setupOptions(params)
  this.createHeadingButtons()
  this.createStatusBox()
  this.initialiseSortedColumn()

  this.head.addEventListener('click', this.onbuttonClick.bind(this))
}

SortableTable.prototype.setupOptions = function (params) {
  params = params || {}
  this.statusMessage = params.statusMessage || 'Sort by %heading% (%direction%)'
  this.ascendingText = params.ascendingText || 'ascending'
  this.descendingText = params.descendingText || 'descending'
}

SortableTable.prototype.createHeadingButtons = function () {
  const headings = Array.from(this.headings)

  for (const heading of headings) {
    if (heading.hasAttribute('aria-sort')) {
      this.createHeadingButton(heading)
    }
  }
}

SortableTable.prototype.createHeadingButton = function (heading) {
  const headings = Array.from(this.headings)
  const index = headings.indexOf(heading)

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
  for (const heading of Array.from(this.headings)) {
    const button = heading.querySelector('button')
    const sortDirection = heading.getAttribute('aria-sort')

    if (sortDirection === 'ascending' || sortDirection === 'descending') {
      const columnNumber = button.getAttribute('data-index')
      const sortedRows = this.sort(columnNumber, sortDirection)

      this.addRows(sortedRows)
    }
  }
}

SortableTable.prototype.onbuttonClick = function (e) {
  const button = e.target

  if (
    !button ||
    !button.parentElement ||
    !(button instanceof HTMLButtonElement)
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

  const sortedRows = this.sort(columnNumber, newSortDirection)

  this.addRows(sortedRows)
  this.removeButtonStates()
  this.updateButtonState(button, heading, newSortDirection)
}

SortableTable.prototype.updateButtonState = function (
  button,
  heading,
  direction
) {
  heading.setAttribute('aria-sort', direction)
  let message = this.statusMessage
  message = message.replace(/%heading%/, button.textContent)
  message = message.replace(/%direction%/, this[`${direction}Text`])
  this.status.textContent = message
}

SortableTable.prototype.removeButtonStates = function () {
  for (const heading of Array.from(this.headings)) {
    heading.setAttribute('aria-sort', 'none')
  }
}

SortableTable.prototype.addRows = function (rows) {
  for (let i = 0; i < rows.length; i++) {
    this.body.append(rows[i])
  }
}

SortableTable.prototype.sort = function (columnNumber, sortDirection) {
  const newRows = Array.from(this.rows).sort(
    function (rowA, rowB) {
      const tdA = rowA.querySelectorAll('td,th')[columnNumber]
      const tdB = rowB.querySelectorAll('td,th')[columnNumber]

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
    }.bind(this)
  )
  return newRows
}

SortableTable.prototype.getCellValue = function (cell) {
  const val = cell.getAttribute('data-sort-value') || cell.innerHTML

  const valAsNumber = Number(val)
  return isNaN(valAsNumber) ? val : valAsNumber
}
