import $ from 'jquery'

export function SortableTable(params) {
  this.table = $(params.table)

  if (this.table.data('moj-search-toggle-initialised')) {
    return
  }

  this.table.data('moj-search-toggle-initialised', true)
  this.caption = this.table.find('caption')

  this.upArrow = `<svg width="22" height="22" focusable="false" aria-hidden="true" role="img" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.5625 15.5L11 6.63125L15.4375 15.5H6.5625Z" fill="currentColor"/>
</svg>`
  this.downArrow = `<svg width="22" height="22" focusable="false" aria-hidden="true" role="img" vviewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15.4375 7L11 15.8687L6.5625 7L15.4375 7Z" fill="currentColor"/>
</svg>`
  this.upDownArrow = `<svg width="22" height="22" focusable="false" aria-hidden="true" role="img" vviewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.1875 9.5L10.9609 3.95703L13.7344 9.5H8.1875Z" fill="currentColor"/>
<path d="M13.7344 12.0781L10.9609 17.6211L8.1875 12.0781H13.7344Z" fill="currentColor"/>
</svg>`

  this.setupOptions(params)
  this.body = this.table.find('tbody')
  this.createHeadingButtons()
  this.updateCaption()
  this.updateDirectionIndicators()
  this.createStatusBox()
  this.initialiseSortedColumn()
  this.table.on('click', 'th button', $.proxy(this, 'onSortButtonClick'))
}

SortableTable.prototype.setupOptions = function (params) {
  params = params || {}
  this.statusMessage = params.statusMessage || 'Sort by %heading% (%direction%)'
  this.ascendingText = params.ascendingText || 'ascending'
  this.descendingText = params.descendingText || 'descending'
}

SortableTable.prototype.createHeadingButtons = function () {
  const headings = this.table.find('thead th')
  let heading
  for (let i = 0; i < headings.length; i++) {
    heading = $(headings[i])
    if (heading.attr('aria-sort')) {
      this.createHeadingButton(heading, i)
    }
  }
}

SortableTable.prototype.createHeadingButton = function (heading, i) {
  const text = heading.text()
  const button = $(`<button type="button" data-index="${i}">${text}</button>`)
  heading.text('')
  heading.append(button)
}

SortableTable.prototype.createStatusBox = function () {
  this.status = $(
    '<div aria-live="polite" role="status" aria-atomic="true" class="govuk-visually-hidden" />'
  )
  this.table.parent().append(this.status)
}

SortableTable.prototype.initialiseSortedColumn = function () {
  const rows = this.getTableRowsArray()

  this.table
    .find('th')
    .filter('[aria-sort="ascending"], [aria-sort="descending"]')
    .first()
    .each((index, el) => {
      const sortDirection = $(el).attr('aria-sort')
      const columnNumber = $(el).find('button').attr('data-index')
      const sortedRows = this.sort(rows, columnNumber, sortDirection)
      this.addRows(sortedRows)
    })
}

SortableTable.prototype.onSortButtonClick = function (e) {
  const button = e.target.closest('button')
  const columnNumber = button.getAttribute('data-index')
  const sortDirection = $(button).parent().attr('aria-sort')
  let newSortDirection
  if (sortDirection === 'none' || sortDirection === 'descending') {
    newSortDirection = 'ascending'
  } else {
    newSortDirection = 'descending'
  }
  const rows = this.getTableRowsArray()
  const sortedRows = this.sort(rows, columnNumber, newSortDirection)
  this.addRows(sortedRows)
  this.removeButtonStates()
  this.updateButtonState($(e.currentTarget), newSortDirection)
  this.updateDirectionIndicators()
}

SortableTable.prototype.updateCaption = function () {
  const captionElement = this.caption.get(0)

  if (!captionElement) {
    return
  }

  let assistiveText = captionElement.querySelector('.govuk-visually-hidden')
  if (assistiveText) {
    return
  }

  assistiveText = document.createElement('span')
  assistiveText.classList.add('govuk-visually-hidden')
  assistiveText.textContent = ' (column headers with buttons are sortable).'

  captionElement.appendChild(assistiveText)
}

SortableTable.prototype.updateButtonState = function (button, direction) {
  button.parent().attr('aria-sort', direction)
  let message = this.statusMessage
  message = message.replace(/%heading%/, button.text())
  message = message.replace(/%direction%/, this[`${direction}Text`])
  this.status.text(message)
}

SortableTable.prototype.updateDirectionIndicators = function () {
  const component = this
  this.table.find('th').each(function () {
    const heading = $(this)
    const button = heading.find('button')
    const direction = heading.attr('aria-sort')
    button.find('svg').remove()
    switch (direction) {
      case 'ascending':
        button.append(component.upArrow)
        break
      case 'descending':
        button.append(component.downArrow)
        break
      case 'none':
        button.append(component.upDownArrow)
    }
  })
}

SortableTable.prototype.removeButtonStates = function () {
  this.table.find('thead th').attr('aria-sort', 'none')
}

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

SortableTable.prototype.sort = function (rows, columnNumber, sortDirection) {
  const newRows = rows.sort(
    function (rowA, rowB) {
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
    }.bind(this)
  )
  return newRows
}

SortableTable.prototype.getCellValue = function (cell) {
  const val = cell.attr('data-sort-value') || cell.html()

  const valAsNumber = Number(val)
  return isNaN(valAsNumber) ? val : valAsNumber
}
