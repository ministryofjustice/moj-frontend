/**
 * Datepicker config
 *
 * @typedef {object} DatepickerConfig
 *
 * @property {string} [imagePath] - The path to image assets.
 * @property {string} [id] - .
 * @property {string} [name] - .
 * @property {string} [label] - .
 * @property {string} [hint] - .
 * @property {string} [minDate] - .
 * @property {string} [maxDate] - .
 */

/**
 * Datepicker component
 *
 * @param {HTMLElement} $module - HTML element
 * @param {DatepickerConfig} config - Datepicker config
 * @constructor
 */
function Datepicker($module, config) {
  if (!$module) {
    return this
  }
  const defaultConfig = {
    imagePath: '/assets/images/',
  }
  this.config = { ...defaultConfig, ...config }

  this.dayLabels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  this.monthLabels = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  this.currentDate = new Date()
  this.currentDate.setHours(0, 0, 0, 0)
  this.calendarDays = []

  this.keycodes = {
    tab: 9,
    esc: 27,
    pageup: 33,
    pagedown: 34,
    end: 35,
    home: 36,
    left: 37,
    up: 38,
    right: 39,
    down: 40,
  }

  this.$module = $module
  this.$input = $module.querySelector('.moj-js-datepicker-input')
  this.$calendarButton = $module.querySelector('.moj-js-datepicker-toggle')
}

/**
 * Initialise Datepicker
 */
Datepicker.prototype.init = function () {
  // Check that required elements are present
  if (!this.$input) {
    return
  }

  this.initControls()
}

/**
 * Initialise controls and set attributes
 */
Datepicker.prototype.initControls = function () {
  // Create datepicker popup dialog
  const titleId = `datepicker-title-${this.$input.id}`
  const dialog = document.createElement('div')
  dialog.id = `datepicker-${this.$input.id}`
  dialog.setAttribute('class', 'moj-datepicker-dialog  datepickerDialog')
  dialog.setAttribute('role', 'dialog')
  dialog.setAttribute('aria-modal', 'true')
  dialog.setAttribute('aria-labelledby', titleId)
  dialog.innerHTML = this.createDialogMarkup(titleId)

  this.dialogElement = dialog
  this.$input.insertAdjacentElement('afterend', this.dialogElement)

  this.dialogTitleNode = this.dialogElement.querySelector('.moj-js-datepicker-month-year')

  this.setMinAndMaxDatesOnCalendar()

  // create calendar
  const tbody = this.dialogElement.querySelector('tbody')
  let dayCount = 0
  for (let i = 0; i < 6; i++) {
    // create row
    const row = tbody.insertRow(i)

    for (let j = 0; j < 7; j++) {
      // create cell (day)
      const cell = document.createElement('td')
      const dateButton = document.createElement('button')

      cell.appendChild(dateButton)
      row.appendChild(cell)

      const calendarDay = new DSCalendarDay(dateButton, dayCount, i, j, this)
      calendarDay.init()
      this.calendarDays.push(calendarDay)
      dayCount++
    }
  }

  // add event listeners
  this.prevMonthButton = this.dialogElement.querySelector('.moj-js-datepicker-prev-month')
  this.prevYearButton = this.dialogElement.querySelector('.moj-js-datepicker-prev-year')
  this.nextMonthButton = this.dialogElement.querySelector('.moj-js-datepicker-next-month')
  this.nextYearButton = this.dialogElement.querySelector('.moj-js-datepicker-next-year')
  this.prevMonthButton.addEventListener('click', event => this.focusPreviousMonth(event, false))
  this.prevYearButton.addEventListener('click', event => this.focusPreviousYear(event, false))
  this.nextMonthButton.addEventListener('click', event => this.focusNextMonth(event, false))
  this.nextYearButton.addEventListener('click', event => this.focusNextYear(event, false))

  this.cancelButton = this.dialogElement.querySelector('.moj-js-datepicker-cancel')
  this.okButton = this.dialogElement.querySelector('.moj-js-datepicker-ok')
  this.cancelButton.addEventListener('click', (event) => {
    event.preventDefault()
    this.closeDialog(event)
  })
  this.okButton.addEventListener('click', () => this.selectDate(this.currentDate))

  const dialogButtons = this.dialogElement.querySelectorAll('button:not([disabled="true"])')
  // eslint-disable-next-line prefer-destructuring
  this.firstButtonInDialog = dialogButtons[0]
  this.lastButtonInDialog = dialogButtons[dialogButtons.length - 1]
  this.firstButtonInDialog.addEventListener('keydown', event => this.firstButtonKeydown(event))
  this.lastButtonInDialog.addEventListener('keydown', event => this.lastButtonKeydown(event))

  this.$calendarButton.addEventListener('click', event => this.toggleDialog(event))

  document.body.addEventListener('mouseup', event => this.backgroundClick(event))

  // populates calendar with initial dates, avoids Wave errors about null buttons
  this.updateCalendar()
}

Datepicker.prototype.createDialogMarkup = function (titleId) {
  return `<div class="moj-datepicker-dialog__header">
        <div class="moj-datepicker-dialog__navbuttons">
            <button class="moj-datepicker-button moj-js-datepicker-prev-year" data-button="button-datepicker-prevyear">
                <span class="govuk-visually-hidden">Previous year</span>
                <svg width="44" height="40" viewBox="0 0 44 40" fill="none" fill="none" focusable="false" aria-hidden="true" role="img">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M23.1643 20L28.9572 14.2071L27.5429 12.7929L20.3358 20L27.5429 27.2071L28.9572 25.7929L23.1643 20Z" fill="currentColor"/>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M17.1643 20L22.9572 14.2071L21.5429 12.7929L14.3358 20L21.5429 27.2071L22.9572 25.7929L17.1643 20Z" fill="currentColor"/>
                </svg>
            </button>

            <button class="moj-datepicker-button moj-js-datepicker-prev-month" data-button="button-datepicker-prevmonth">
                <span class="govuk-visually-hidden">Previous month</span>
<svg width="44" height="40" viewBox="0 0 44 40" fill="none" focusable="false" aria-hidden="true" role="img">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M20.5729 20L25.7865 14.2071L24.5137 12.7929L18.0273 20L24.5137 27.2071L25.7865 25.7929L20.5729 20Z" fill="currentColor"/>
</svg>
            </button>
        </div>

        <h2 id="${titleId}" class="moj-datepicker-dialog__title moj-js-datepicker-month-year" aria-live="polite">June 2020</h2>

        <div class="moj-datepicker-dialog__navbuttons">
            <button class="moj-datepicker-button moj-js-datepicker-next-month" data-button="button-datepicker-nextmonth">
                <span class="govuk-visually-hidden">Next month</span>
                <svg width="44" height="40" viewBox="0 0 44 40" fill="none"  focusable="false" aria-hidden="true" role="img">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M23.4271 20L18.2135 14.2071L19.4863 12.7929L25.9727 20L19.4863 27.2071L18.2135 25.7929L23.4271 20Z" fill="currentColor"/>
                </svg>
            </button>

            <button class="moj-datepicker-button moj-js-datepicker-next-year" data-button="button-datepicker-nextyear">
                <span class="govuk-visually-hidden">Next year</span>
                <svg width="44" height="40" viewBox="0 0 44 40" fill="none" fill="none" focusable="false" aria-hidden="true" role="img">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M20.8357 20L15.0428 14.2071L16.4571 12.7929L23.6642 20L16.4571 27.2071L15.0428 25.7929L20.8357 20Z" fill="currentColor"/>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M26.8357 20L21.0428 14.2071L22.4571 12.7929L29.6642 20L22.4571 27.2071L21.0428 25.7929L26.8357 20Z" fill="currentColor"/>
                </svg>
            </button>
        </div>
      </div>

      <table class="moj-datepicker-calendar moj-js-datepicker-grid" role="grid" aria-labelledby="${titleId}">
      <thead>
          <tr>
          <th scope="col" abbr="Monday">Mon</th>
          <th scope="col" abbr="Tuesday">Tue</th>
          <th scope="col" abbr="Wednesday">Wed</th>
          <th scope="col" abbr="Thursday">Thu</th>
          <th scope="col" abbr="Friday">Fri</th>
          <th scope="col" abbr="Saturday">Sat</th>
          <th scope="col" abbr="Sunday">Sun</th>
          </tr>
      </thead>

      <tbody></tbody>
      </table>

      <div class="govuk-button-group">
        <button type="button" class="govuk-button moj-js-datepicker-ok" value="ok" data-button="button-datepicker-ok">Select</button>
        <button type="button" class="govuk-button govuk-button--secondary moj-js-datepicker-cancel" value="cancel" data-button="button-datepicker-cancel">Cancel</button>
      </div>`
}

Datepicker.prototype.leadingZeroes = function (value, length = 2) {
  let ret = value.toString()

  while (ret.length < length) {
    ret = `0${ret.toString()}`
  }

  return ret
}

Datepicker.prototype.setMinAndMaxDatesOnCalendar = function () {
  if (this.$input.dataset.mindate) {
    this.minDate = this.formattedDateFromString(this.$input.dataset.mindate, null)
    if (this.minDate && this.currentDate < this.minDate) {
      this.currentDate = this.minDate
    }
  }

  if (this.$input.dataset.maxdate) {
    this.maxDate = this.formattedDateFromString(this.$input.dataset.maxdate, null)
    if (this.maxDate && this.currentDate > this.maxDate) {
      this.currentDate = this.maxDate
    }
  }
}

Datepicker.prototype.formattedDateFromString = function (dateString, fallback = new Date()) {
  let formattedDate = null
  const dateFormatPattern = /(\d{1,2})([-/,. ])(\d{1,2})[-/,. ](\d{4})/

  if (!dateFormatPattern.test(dateString)) return fallback

  const match = dateString.match(dateFormatPattern)
  const separator = match[2]
  const day = match[1]
  const month = match[3]
  const year = match[4]

  formattedDate = new Date(`${month}${separator}${day}${separator}${year}`)
  if (formattedDate instanceof Date && !isNaN(formattedDate)) {
    return formattedDate
  }
  return fallback
}

Datepicker.prototype.formattedDateFromDate = function (date) {
  return `${this.leadingZeroes(date.getDate())}/${this.leadingZeroes(date.getMonth() + 1)}/${date.getFullYear()}`
}

Datepicker.prototype.backgroundClick = function (event) {
  if (
    this.isOpen() &&
    !this.dialogElement.contains(event.target) &&
    !this.$input.contains(event.target) &&
    !this.$calendarButton.contains(event.target)
  ) {
    event.preventDefault()
    this.closeDialog()
  }
}

Datepicker.prototype.formattedDateHuman = function (date) {
  return `${this.dayLabels[date.getDay()]} ${date.getDate()} ${this.monthLabels[date.getMonth()]} ${date.getFullYear()}`
}

Datepicker.prototype.firstButtonKeydown = function (event) {
  if (event.keyCode === this.keycodes.tab && event.shiftKey) {
    this.lastButtonInDialog.focus()
    event.preventDefault()
  }
}

Datepicker.prototype.lastButtonKeydown = function (event) {
  if (event.keyCode === this.keycodes.tab && !event.shiftKey) {
    this.firstButtonInDialog.focus()
    event.preventDefault()
  }
}

// render calendar
Datepicker.prototype.updateCalendar = function () {
  this.dialogTitleNode.innerHTML = `${this.monthLabels[this.currentDate.getMonth()]} ${this.currentDate.getFullYear()}`

  const day = this.currentDate

  const firstOfMonth = new Date(day.getFullYear(), day.getMonth(), 1)
  const dayOfWeek = firstOfMonth.getDay() === 0 ? 6 : firstOfMonth.getDay() - 1 // Change logic to make Monday first day of week, i.e. 0

  firstOfMonth.setDate(firstOfMonth.getDate() - dayOfWeek)

  const thisDay = new Date(firstOfMonth)

  // loop through our days
  for (let i = 0; i < this.calendarDays.length; i++) {
    const hidden = thisDay.getMonth() !== day.getMonth()

    let disabled

    if (thisDay < this.minDate) {
      disabled = true
    }
    if (thisDay > this.maxDate) {
      disabled = true
    }

    this.calendarDays[i].update(thisDay, hidden, disabled)

    thisDay.setDate(thisDay.getDate() + 1)
  }
}

Datepicker.prototype.setCurrentDate = function (focus = true) {
  const { currentDate } = this

  this.calendarDays.forEach(calendarDay => {
    calendarDay.button.classList.add('moj-datepicker-button')
    calendarDay.button.classList.add('moj-datepicker-calendar__day')
    calendarDay.button.setAttribute('tabindex', -1)
    calendarDay.button.classList.remove('selected')
    const calendarDayDate = calendarDay.date
    calendarDayDate.setHours(0, 0, 0, 0)

    const today = new Date()
    today.setHours(0, 0, 0, 0)

    if (calendarDayDate.getTime() === currentDate.getTime() && !calendarDay.disabled) {
      if (focus) {
        calendarDay.button.setAttribute('tabindex', 0)
        calendarDay.button.focus()
        calendarDay.button.classList.add('selected')
      }
    }

    if (this.inputDate && calendarDayDate.getTime() === this.inputDate.getTime()) {
      calendarDay.button.classList.add('current')
      calendarDay.button.setAttribute('aria-selected', true)
    } else {
      calendarDay.button.classList.remove('current')
      calendarDay.button.removeAttribute('aria-selected')
    }

    if (calendarDayDate.getTime() === today.getTime()) {
      calendarDay.button.classList.add('today')
    } else {
      calendarDay.button.classList.remove('today')
    }
  })

  // if no date is tab-able, make the first non-disabled date tab-able
  if (!focus) {
    const enabledDays = this.calendarDays.filter(calendarDay => {
      return window.getComputedStyle(calendarDay.button).display === 'block' && !calendarDay.button.disabled
    })

    enabledDays[0].button.setAttribute('tabindex', 0)

    this.currentDate = enabledDays[0].date
  }
}

Datepicker.prototype.selectDate = function (date) {
  this.$calendarButton.querySelector('span').innerText = `Choose date. Selected date is ${this.formattedDateHuman(
    date,
  )}`
  this.$input.value = this.formattedDateFromDate(date)

  const changeEvent = new Event('change', { bubbles: true, cancelable: true })
  this.$input.dispatchEvent(changeEvent)

  this.closeDialog()
}

Datepicker.prototype.isOpen = function () {
  return this.dialogElement.classList.contains('moj-datepicker-dialog--open')
}

Datepicker.prototype.toggleDialog = function (event) {
  event.preventDefault()
  if (this.isOpen()) {
    this.closeDialog()
  } else {
    this.setMinAndMaxDatesOnCalendar()
    this.openDialog()
  }
}

Datepicker.prototype.openDialog = function () {
  // display the dialog
  this.dialogElement.style.display = 'block'
  this.dialogElement.classList.add('moj-datepicker-dialog--open')

  // position the dialog
  // if input is wider than dialog pin it to the right
  if(this.$input.offsetWidth > this.dialogElement.offsetWidth) {
    this.dialogElement.style.right = `0px`
  }
  this.dialogElement.style.top = `${this.$input.offsetHeight + 16}px`

  // get the date from the input element
  if (this.$input.value.match(/^(\d{1,2})([-/,. ])(\d{1,2})[-/,. ](\d{4})$/)) {
    this.inputDate = this.formattedDateFromString(this.$input.value)
    this.currentDate = this.inputDate
  }

  this.updateCalendar()
  this.setCurrentDate()
}

Datepicker.prototype.closeDialog = function () {
  this.dialogElement.style.display = 'none'
  this.dialogElement.classList.remove('moj-datepicker-dialog--open')
  this.$calendarButton.focus()
}

Datepicker.prototype.goToDate = function (date, focus) {
  const current = this.currentDate
  this.currentDate = date

  if (this.minDate && this.minDate > date) {
    this.currentDate = this.minDate
  } else if (this.maxDate && this.maxDate < date) {
    this.currentDate = this.maxDate
  }

  if (current.getMonth() !== this.currentDate.getMonth() || current.getFullYear() !== this.currentDate.getFullYear()) {
    this.updateCalendar()
  }

  this.setCurrentDate(focus)
}

// day navigation
Datepicker.prototype.focusNextDay = function () {
  const date = new Date(this.currentDate)
  date.setDate(date.getDate() + 1)
  this.goToDate(date)
}

Datepicker.prototype.focusPreviousDay = function () {
  const date = new Date(this.currentDate)
  date.setDate(date.getDate() - 1)
  this.goToDate(date)
}

// week navigation
Datepicker.prototype.focusNextWeek = function () {
  const date = new Date(this.currentDate)
  date.setDate(date.getDate() + 7)
  this.goToDate(date)
}

Datepicker.prototype.focusPreviousWeek = function () {
  const date = new Date(this.currentDate)
  date.setDate(date.getDate() - 7)
  this.goToDate(date)
}

Datepicker.prototype.focusFirstDayOfWeek = function () {
  const date = new Date(this.currentDate)
  date.setDate(date.getDate() - date.getDay())
  this.goToDate(date)
}

Datepicker.prototype.focusLastDayOfWeek = function () {
  const date = new Date(this.currentDate)
  date.setDate(date.getDate() - date.getDay() + 6)
  this.goToDate(date)
}

// month navigation
Datepicker.prototype.focusNextMonth = function (event, focus = true) {
  event.preventDefault()
  const date = new Date(this.currentDate)
  date.setMonth(date.getMonth() + 1, 1)
  this.goToDate(date, focus)
}

Datepicker.prototype.focusPreviousMonth = function (event, focus = true) {
  event.preventDefault()
  const date = new Date(this.currentDate)
  date.setMonth(date.getMonth() - 1, 1)
  this.goToDate(date, focus)
}

// year navigation
Datepicker.prototype.focusNextYear = function (event, focus = true) {
  event.preventDefault()
  const date = new Date(this.currentDate)
  date.setFullYear(date.getFullYear() + 1, date.getMonth(), 1)
  this.goToDate(date, focus)
}

Datepicker.prototype.focusPreviousYear = function (event, focus = true) {
  event.preventDefault()
  const date = new Date(this.currentDate)
  date.setFullYear(date.getFullYear() - 1, date.getMonth(), 1)
  this.goToDate(date, focus)
}

/**
 *
 * @param button
 * @param index
 * @param row
 * @param column
 * @param picker
 * @constructor
 */
function DSCalendarDay(button, index, row, column, picker) {
  this.index = index
  this.row = row
  this.column = column
  this.button = button
  this.picker = picker

  this.date = new Date()
}

DSCalendarDay.prototype.init = function () {
  this.button.addEventListener('keydown', this.keyPress.bind(this))
  this.button.addEventListener('click', this.click.bind(this))
}

DSCalendarDay.prototype.update = function (day, hidden, disabled) {
  this.button.innerHTML = day.getDate()
  this.date = new Date(day)

  if (disabled) {
    this.button.setAttribute('disabled', true)
  } else {
    this.button.removeAttribute('disabled')
  }

  if (hidden) {
    this.button.style.display = 'none'
  } else {
    this.button.style.display = 'block'
  }
}

DSCalendarDay.prototype.click = function (event) {
  this.picker.goToDate(this.date)
  this.picker.selectDate(this.date)

  event.stopPropagation()
  event.preventDefault()
}

DSCalendarDay.prototype.keyPress = function (event) {
  let calendarNavKey = true

  switch (event.keyCode) {
    case this.picker.keycodes.left:
      this.picker.focusPreviousDay()
      break
    case this.picker.keycodes.right:
      this.picker.focusNextDay()
      break
    case this.picker.keycodes.up:
      this.picker.focusPreviousWeek()
      break
    case this.picker.keycodes.down:
      this.picker.focusNextWeek()
      break
    case this.picker.keycodes.home:
      this.picker.focusFirstDayOfWeek()
      break
    case this.picker.keycodes.end:
      this.picker.focusLastDayOfWeek()
      break
    case this.picker.keycodes.pageup:
      // eslint-disable-next-line no-unused-expressions
      event.shiftKey ? this.picker.focusPreviousYear(event) : this.picker.focusPreviousMonth(event)
      break
    case this.picker.keycodes.pagedown:
      // eslint-disable-next-line no-unused-expressions
      event.shiftKey ? this.picker.focusNextYear(event) : this.picker.focusNextMonth(event)
      break
    case this.picker.keycodes.esc:
      this.picker.closeDialog()
      break
    default:
      calendarNavKey = false
      break
  }

  if (calendarNavKey) {
    event.preventDefault()
    event.stopPropagation()
  }
}

MOJFrontend.DatePicker = Datepicker;
