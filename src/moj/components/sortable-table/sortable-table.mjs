import { mergeConfigs, normaliseDataset } from '../../common/configuration.mjs'

export class SortableTable {
  /**
   * @param {Element | null} $root - HTML element to use for sortable table
   * @param {SortableTableConfig} [config] - Sortable table config
   */
  constructor($root, config = {}) {
    const $head = $root?.querySelector('thead')
    const $body = $root?.querySelector('tbody')

    if (!$root || !($root instanceof HTMLElement) || !$head || !$body) {
      return this
    }

    this.$root = $root
    this.$head = $head
    this.$body = $body

    if (this.$root.hasAttribute('data-moj-sortable-table-init')) {
      return this
    }

    this.$root.setAttribute('data-moj-sortable-table-init', '')

    /**
     * Merge configs
     *
     * @type {SortableTableConfig}
     */
    this.config = mergeConfigs(
      SortableTable.defaults,
      config,
      normaliseDataset(SortableTable, this.$root.dataset)
    )

    this.$headings = this.$head
      ? Array.from(this.$head.querySelectorAll('th'))
      : []

    this.createHeadingButtons()
    this.createStatusBox()
    this.initialiseSortedColumn()

    this.$head.addEventListener('click', this.onSortButtonClick.bind(this))
  }

  createHeadingButtons() {
    for (const $heading of this.$headings) {
      if ($heading.hasAttribute('aria-sort')) {
        this.createHeadingButton($heading)
      }
    }
  }

  /**
   * @param {HTMLTableCellElement} $heading
   */
  createHeadingButton($heading) {
    const index = this.$headings.indexOf($heading)
    const $button = document.createElement('button')

    $button.setAttribute('type', 'button')
    $button.setAttribute('data-index', `${index}`)
    $button.textContent = $heading.textContent

    $heading.textContent = ''
    $heading.appendChild($button)
  }

  createStatusBox() {
    this.$status = document.createElement('div')

    this.$status.setAttribute('aria-atomic', 'true')
    this.$status.setAttribute('aria-live', 'polite')
    this.$status.setAttribute('class', 'govuk-visually-hidden')
    this.$status.setAttribute('role', 'status')

    this.$root.insertAdjacentElement('afterend', this.$status)
  }

  initialiseSortedColumn() {
    const $rows = this.getTableRowsArray()

    const $heading = this.$root.querySelector('th[aria-sort]')
    const $sortButton = $heading?.querySelector('button')
    const sortDirection = $heading?.getAttribute('aria-sort')

    const columnNumber = Number.parseInt(
      $sortButton?.getAttribute('data-index') ?? '0',
      10
    )

    if (
      !$heading ||
      !$sortButton ||
      !(sortDirection === 'ascending' || sortDirection === 'descending')
    ) {
      return
    }

    const $sortedRows = this.sort($rows, columnNumber, sortDirection)
    this.addRows($sortedRows)
  }

  /**
   * @param {MouseEvent} event - Click event
   */
  onSortButtonClick(event) {
    const $button = event.target

    if (
      !$button ||
      !($button instanceof HTMLButtonElement) ||
      !$button.parentElement
    ) {
      return
    }

    const $heading = $button.parentElement
    const sortDirection = $heading.getAttribute('aria-sort')

    const columnNumber = Number.parseInt(
      $button?.getAttribute('data-index') ?? '0',
      10
    )

    const newSortDirection =
      sortDirection === 'none' || sortDirection === 'descending'
        ? 'ascending'
        : 'descending'

    const $rows = this.getTableRowsArray()
    const $sortedRows = this.sort($rows, columnNumber, newSortDirection)

    this.addRows($sortedRows)
    this.removeButtonStates()
    this.updateButtonState($button, newSortDirection)
  }

  /**
   * @param {HTMLButtonElement} $button
   * @param {string} direction
   */
  updateButtonState($button, direction) {
    if (!(direction === 'ascending' || direction === 'descending')) {
      return
    }

    $button.parentElement.setAttribute('aria-sort', direction)
    let message = this.config.statusMessage
    message = message.replace(/%heading%/, $button.textContent)
    message = message.replace(/%direction%/, this.config[`${direction}Text`])
    this.$status.textContent = message
  }

  removeButtonStates() {
    for (const $heading of this.$headings) {
      $heading.setAttribute('aria-sort', 'none')
    }
  }

  /**
   * @param {HTMLTableRowElement[]} $rows
   */
  addRows($rows) {
    for (const $row of $rows) {
      this.$body.append($row)
    }
  }

  getTableRowsArray() {
    return Array.from(this.$body.querySelectorAll('tr'))
  }

  /**
   * @param {HTMLTableRowElement[]} $rows
   * @param {number} columnNumber
   * @param {string} sortDirection
   */
  sort($rows, columnNumber, sortDirection) {
    return $rows.sort(($rowA, $rowB) => {
      const $tdA = $rowA.querySelectorAll('td, th')[columnNumber]
      const $tdB = $rowB.querySelectorAll('td, th')[columnNumber]

      if (
        !$tdA ||
        !$tdB ||
        !($tdA instanceof HTMLElement) ||
        !($tdB instanceof HTMLElement)
      ) {
        return 0
      }

      const valueA =
        sortDirection === 'ascending'
          ? this.getCellValue($tdA)
          : this.getCellValue($tdB)

      const valueB =
        sortDirection === 'ascending'
          ? this.getCellValue($tdB)
          : this.getCellValue($tdA)

      return !(typeof valueA === 'number' && typeof valueB === 'number')
        ? valueA.toString().localeCompare(valueB.toString())
        : valueA - valueB
    })
  }

  /**
   * @param {HTMLElement} $cell
   */
  getCellValue($cell) {
    const val = $cell.getAttribute('data-sort-value') || $cell.innerHTML
    const valAsNumber = Number(val)

    return Number.isFinite(valAsNumber)
      ? valAsNumber // Exclude invalid numbers, infinity etc
      : val
  }

  /**
   * Sortable table config
   *
   * @type {SortableTableConfig}
   */
  static defaults = Object.freeze({
    statusMessage: 'Sort by %heading% (%direction%)',
    ascendingText: 'ascending',
    descendingText: 'descending'
  })

  /**
   * Sortable table config schema
   *
   * @satisfies {Schema<SortableTableConfig>}
   */
  static schema = Object.freeze({
    properties: {
      statusMessage: { type: 'string' },
      ascendingText: { type: 'string' },
      descendingText: { type: 'string' }
    }
  })
}

/**
 * Sortable table config
 *
 * @typedef {object} SortableTableConfig
 * @property {string} [statusMessage] - Status message
 * @property {string} [ascendingText] - Ascending text
 * @property {string} [descendingText] - Descending text
 */

/**
 * @import { Schema } from '../../common/configuration.mjs'
 */
