import { ConfigurableComponent } from 'govuk-frontend'

/**
 * @augments {ConfigurableComponent<SortableTableConfig>}
 */
export class SortableTable extends ConfigurableComponent {
  /**
   * @param {Element | null} $root - HTML element to use for sortable table
   * @param {SortableTableConfig} [config] - Sortable table config
   */
  constructor($root, config = {}) {
    super($root, config)

    const $head = $root?.querySelector('thead')
    const $body = $root?.querySelector('tbody')

    if (!$head || !$body) {
      return this
    }

    this.$head = $head
    this.$body = $body
    this.$caption = this.$root.querySelector('caption')

    this.$upArrow = `<svg width="22" height="22" focusable="false" aria-hidden="true" role="img" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.5625 15.5L11 6.63125L15.4375 15.5H6.5625Z" fill="currentColor"/>
</svg>`
    this.$downArrow = `<svg width="22" height="22" focusable="false" aria-hidden="true" role="img" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15.4375 7L11 15.8687L6.5625 7L15.4375 7Z" fill="currentColor"/>
</svg>`
    this.$upDownArrow = `<svg width="22" height="22" focusable="false" aria-hidden="true" role="img" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.1875 9.5L10.9609 3.95703L13.7344 9.5H8.1875Z" fill="currentColor"/>
<path d="M13.7344 12.0781L10.9609 17.6211L8.1875 12.0781H13.7344Z" fill="currentColor"/>
</svg>`

    this.$headings = this.$head
      ? Array.from(this.$head.querySelectorAll('th'))
      : []

    this.createHeadingButtons()
    this.updateCaption()
    this.updateDirectionIndicators()
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

    const $heading = this.$root.querySelector(
      'th[aria-sort="ascending"], th[aria-sort="descending"]'
    )
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
    const $target = /** @type {HTMLElement} */ (event.target)
    const $button = $target.closest('button')

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
    this.updateDirectionIndicators()
  }

  updateCaption() {
    if (!this.$caption) {
      return
    }

    let assistiveText = this.$caption.querySelector('.govuk-visually-hidden')
    if (assistiveText) {
      return
    }

    assistiveText = document.createElement('span')
    assistiveText.classList.add('govuk-visually-hidden')
    assistiveText.textContent = ' (column headers with buttons are sortable).'

    this.$caption.appendChild(assistiveText)
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

  updateDirectionIndicators() {
    for (const $heading of this.$headings) {
      const $button = /** @type {HTMLButtonElement} */ (
        $heading.querySelector('button')
      )
      if ($heading.hasAttribute('aria-sort') && $button) {
        const direction = $heading.getAttribute('aria-sort')
        $button.querySelector('svg')?.remove()

        switch (direction) {
          case 'ascending':
            $button.insertAdjacentHTML('beforeend', this.$upArrow)
            break
          case 'descending':
            $button.insertAdjacentHTML('beforeend', this.$downArrow)
            break
          default:
            $button.insertAdjacentHTML('beforeend', this.$upDownArrow)
        }
      }
    }
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
   * Name for the component used when initialising using data-module attributes.
   */
  static moduleName = 'moj-sortable-table'

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
  static schema = Object.freeze(
    /** @type {const} */ ({
      properties: {
        statusMessage: { type: 'string' },
        ascendingText: { type: 'string' },
        descendingText: { type: 'string' }
      }
    })
  )
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
 * @import { Schema } from 'govuk-frontend/dist/govuk/common/configuration.mjs'
 */
