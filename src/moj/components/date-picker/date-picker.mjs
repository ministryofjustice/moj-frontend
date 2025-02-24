/**
 * Date picker config
 *
 * @typedef {object} DatePickerConfig
 * @property {string} [excludedDates] - Dates that cannot be selected
 * @property {string} [excludedDays] - Days that cannot be selected
 * @property {boolean} [leadingZeroes] - Whether to add leading zeroes when populating the field
 * @property {string} [minDate] - The earliest available date
 * @property {string} [maxDate] - The latest available date
 * @property {string} [weekStartDay] - First day of the week in calendar view
 */

/**
 * @param {HTMLElement} $module - HTML element
 * @param {DatePickerConfig} config - config object
 * @class
 */
export function DatePicker($module, config = {}) {
  if (!$module) {
    return this
  }

  const schema = Object.freeze({
    properties: {
      excludedDates: { type: 'string' },
      excludedDays: { type: 'string' },
      leadingZeros: { type: 'string' },
      maxDate: { type: 'string' },
      minDate: { type: 'string' },
      weekStartDay: { type: 'string' }
    }
  })

  const defaults = {
    leadingZeros: false,
    weekStartDay: 'monday'
  }

  // data attributes override JS config, which overrides defaults
  this.config = this.mergeConfigs(
    defaults,
    config,
    this.parseDataset(schema, $module.dataset)
  )

  this.dayLabels = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
  ]

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
    'December'
  ]

  this.currentDate = new Date()
  this.currentDate.setHours(0, 0, 0, 0)
  this.calendarDays = []
  this.excludedDates = []
  this.excludedDays = []

  this.buttonClass = 'moj-datepicker__button'
  this.selectedDayButtonClass = 'moj-datepicker__button--selected'
  this.currentDayButtonClass = 'moj-datepicker__button--current'
  this.todayButtonClass = 'moj-datepicker__button--today'

  this.$module = $module
  this.$input = $module.querySelector('.moj-js-datepicker-input')
}

DatePicker.prototype.init = function () {
  // Check that required elements are present
  if (!this.$input) {
    return
  }
  if (this.$module.dataset.initialized) {
    return
  }

  this.setOptions()
  this.initControls()
  this.$module.setAttribute('data-initialized', 'true')
}

DatePicker.prototype.initControls = function () {
  this.id = `datepicker-${this.$input.id}`

  this.$dialog = this.createDialog()
  this.createCalendarHeaders()

  const $componentWrapper = document.createElement('div')
  const $inputWrapper = document.createElement('div')
  $componentWrapper.classList.add('moj-datepicker__wrapper')
  $inputWrapper.classList.add('govuk-input__wrapper')

  this.$input.parentNode.insertBefore($componentWrapper, this.$input)
  $componentWrapper.appendChild($inputWrapper)
  $inputWrapper.appendChild(this.$input)

  $inputWrapper.insertAdjacentHTML('beforeend', this.toggleTemplate())
  $componentWrapper.insertAdjacentElement('beforeend', this.$dialog)

  this.$calendarButton = this.$module.querySelector('.moj-js-datepicker-toggle')
  this.$dialogTitle = this.$dialog.querySelector(
    '.moj-js-datepicker-month-year'
  )

  this.createCalendar()

  this.$prevMonthButton = this.$dialog.querySelector(
    '.moj-js-datepicker-prev-month'
  )
  this.$prevYearButton = this.$dialog.querySelector(
    '.moj-js-datepicker-prev-year'
  )
  this.$nextMonthButton = this.$dialog.querySelector(
    '.moj-js-datepicker-next-month'
  )
  this.$nextYearButton = this.$dialog.querySelector(
    '.moj-js-datepicker-next-year'
  )
  this.$cancelButton = this.$dialog.querySelector('.moj-js-datepicker-cancel')
  this.$okButton = this.$dialog.querySelector('.moj-js-datepicker-ok')

  // add event listeners
  this.$prevMonthButton.addEventListener('click', (event) =>
    this.focusPreviousMonth(event, false)
  )
  this.$prevYearButton.addEventListener('click', (event) =>
    this.focusPreviousYear(event, false)
  )
  this.$nextMonthButton.addEventListener('click', (event) =>
    this.focusNextMonth(event, false)
  )
  this.$nextYearButton.addEventListener('click', (event) =>
    this.focusNextYear(event, false)
  )
  this.$cancelButton.addEventListener('click', (event) => {
    event.preventDefault()
    this.closeDialog(event)
  })
  this.$okButton.addEventListener('click', () => {
    this.selectDate(this.currentDate)
  })

  const dialogButtons = this.$dialog.querySelectorAll(
    'button:not([disabled="true"])'
  )

  this.$firstButtonInDialog = dialogButtons[0]
  this.$lastButtonInDialog = dialogButtons[dialogButtons.length - 1]
  this.$firstButtonInDialog.addEventListener('keydown', (event) =>
    this.firstButtonKeydown(event)
  )
  this.$lastButtonInDialog.addEventListener('keydown', (event) =>
    this.lastButtonKeydown(event)
  )

  this.$calendarButton.addEventListener('click', (event) =>
    this.toggleDialog(event)
  )

  this.$dialog.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      this.closeDialog()
      event.preventDefault()
      event.stopPropagation()
    }
  })

  document.body.addEventListener('mouseup', (event) =>
    this.backgroundClick(event)
  )

  // populates calendar with initial dates, avoids Wave errors about null buttons
  this.updateCalendar()
}

DatePicker.prototype.createDialog = function () {
  const titleId = `datepicker-title-${this.$input.id}`
  const $dialog = document.createElement('div')

  $dialog.id = this.id
  $dialog.setAttribute('class', 'moj-datepicker__dialog')
  $dialog.setAttribute('role', 'dialog')
  $dialog.setAttribute('aria-modal', 'true')
  $dialog.setAttribute('aria-labelledby', titleId)
  $dialog.innerHTML = this.dialogTemplate(titleId)
  $dialog.hidden = true

  return $dialog
}

DatePicker.prototype.createCalendar = function () {
  const $tbody = this.$dialog.querySelector('tbody')
  let dayCount = 0
  for (let i = 0; i < 6; i++) {
    // create row
    const $row = $tbody.insertRow(i)

    for (let j = 0; j < 7; j++) {
      // create cell (day)
      const $cell = document.createElement('td')
      const $dateButton = document.createElement('button')

      $cell.appendChild($dateButton)
      $row.appendChild($cell)

      const calendarDay = new DSCalendarDay($dateButton, dayCount, i, j, this)
      calendarDay.init()
      this.calendarDays.push(calendarDay)
      dayCount++
    }
  }
}

DatePicker.prototype.toggleTemplate = function () {
  return `<button class="moj-datepicker__toggle moj-js-datepicker-toggle" type="button" aria-haspopup="dialog" aria-controls="${this.id}" aria-expanded="false">
            <span class="govuk-visually-hidden">Choose date</span>
            <svg width="32" height="24" focusable="false" class="moj-datepicker-icon" aria-hidden="true" role="img" viewBox="0 0 22 22">
              <path
                fill="currentColor"
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M16.1333 2.93333H5.86668V4.4C5.86668 5.21002 5.21003 5.86667 4.40002 5.86667C3.59 5.86667 2.93335 5.21002 2.93335 4.4V2.93333H2C0.895431 2.93333 0 3.82877 0 4.93334V19.2667C0 20.3712 0.89543 21.2667 2 21.2667H20C21.1046 21.2667 22 20.3712 22 19.2667V4.93333C22 3.82876 21.1046 2.93333 20 2.93333H19.0667V4.4C19.0667 5.21002 18.41 5.86667 17.6 5.86667C16.79 5.86667 16.1333 5.21002 16.1333 4.4V2.93333ZM20.5333 8.06667H1.46665V18.8C1.46665 19.3523 1.91436 19.8 2.46665 19.8H19.5333C20.0856 19.8 20.5333 19.3523 20.5333 18.8V8.06667Z"
              ></path>
              <rect x="3.66669" width="1.46667" height="5.13333" rx="0.733333" fill="currentColor"></rect>
              <rect x="16.8667" width="1.46667" height="5.13333" rx="0.733333" fill="currentColor"></rect>
            </svg>
          </button>`
}

/**
 * HTML template for calendar dialog
 *
 * @param {string} [titleId] - Id attribute for dialog title
 * @returns {string}
 */
DatePicker.prototype.dialogTemplate = function (titleId) {
  return `<div class="moj-datepicker__dialog-header">
            <div class="moj-datepicker__dialog-navbuttons">
              <button class="moj-datepicker__button moj-js-datepicker-prev-year">
                <span class="govuk-visually-hidden">Previous year</span>
                <svg width="44" height="40" viewBox="0 0 44 40" fill="none" fill="none" focusable="false" aria-hidden="true" role="img">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M23.1643 20L28.9572 14.2071L27.5429 12.7929L20.3358 20L27.5429 27.2071L28.9572 25.7929L23.1643 20Z" fill="currentColor"/>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M17.1643 20L22.9572 14.2071L21.5429 12.7929L14.3358 20L21.5429 27.2071L22.9572 25.7929L17.1643 20Z" fill="currentColor"/>
                </svg>
              </button>

              <button class="moj-datepicker__button moj-js-datepicker-prev-month">
                <span class="govuk-visually-hidden">Previous month</span>
                <svg width="44" height="40" viewBox="0 0 44 40" fill="none" focusable="false" aria-hidden="true" role="img">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M20.5729 20L25.7865 14.2071L24.5137 12.7929L18.0273 20L24.5137 27.2071L25.7865 25.7929L20.5729 20Z" fill="currentColor"/>
                </svg>
              </button>
            </div>

            <h2 id="${titleId}" class="moj-datepicker__dialog-title moj-js-datepicker-month-year" aria-live="polite">June 2020</h2>

            <div class="moj-datepicker__dialog-navbuttons">
              <button class="moj-datepicker__button moj-js-datepicker-next-month">
                <span class="govuk-visually-hidden">Next month</span>
                <svg width="44" height="40" viewBox="0 0 44 40" fill="none"  focusable="false" aria-hidden="true" role="img">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M23.4271 20L18.2135 14.2071L19.4863 12.7929L25.9727 20L19.4863 27.2071L18.2135 25.7929L23.4271 20Z" fill="currentColor"/>
                </svg>
              </button>

              <button class="moj-datepicker__button moj-js-datepicker-next-year">
                <span class="govuk-visually-hidden">Next year</span>
                <svg width="44" height="40" viewBox="0 0 44 40" fill="none" fill="none" focusable="false" aria-hidden="true" role="img">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M20.8357 20L15.0428 14.2071L16.4571 12.7929L23.6642 20L16.4571 27.2071L15.0428 25.7929L20.8357 20Z" fill="currentColor"/>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M26.8357 20L21.0428 14.2071L22.4571 12.7929L29.6642 20L22.4571 27.2071L21.0428 25.7929L26.8357 20Z" fill="currentColor"/>
                </svg>
              </button>
            </div>
          </div>

          <table class="moj-datepicker__calendar moj-js-datepicker-grid" role="grid" aria-labelledby="${titleId}">
            <thead>
              <tr></tr>
            </thead>

            <tbody></tbody>
          </table>

          <div class="govuk-button-group">
            <button type="button" class="govuk-button moj-js-datepicker-ok">Select</button>
            <button type="button" class="govuk-button govuk-button--secondary moj-js-datepicker-cancel">Close</button>
          </div>`
}

DatePicker.prototype.createCalendarHeaders = function () {
  this.dayLabels.forEach((day) => {
    const html = `<th scope="col"><span aria-hidden="true">${day.substring(0, 3)}</span><span class="govuk-visually-hidden">${day}</span></th>`
    const $headerRow = this.$dialog.querySelector('thead > tr')
    $headerRow.insertAdjacentHTML('beforeend', html)
  })
}

/**
 * Pads given number with leading zeros
 *
 * @param {number} value - The value to be padded
 * @param {number} length - The length in characters of the output
 * @returns {string}
 */
DatePicker.prototype.leadingZeros = function (value, length = 2) {
  let ret = value.toString()

  while (ret.length < length) {
    ret = `0${ret}`
  }

  return ret
}

DatePicker.prototype.setOptions = function () {
  this.setMinAndMaxDatesOnCalendar()
  this.setExcludedDates()
  this.setExcludedDays()
  this.setLeadingZeros()
  this.setWeekStartDay()
}

DatePicker.prototype.setMinAndMaxDatesOnCalendar = function () {
  if (this.config.minDate) {
    this.minDate = this.formattedDateFromString(this.config.minDate, null)
    if (this.minDate && this.currentDate < this.minDate) {
      this.currentDate = this.minDate
    }
  }

  if (this.config.maxDate) {
    this.maxDate = this.formattedDateFromString(this.config.maxDate, null)
    if (this.maxDate && this.currentDate > this.maxDate) {
      this.currentDate = this.maxDate
    }
  }
}

DatePicker.prototype.setExcludedDates = function () {
  if (this.config.excludedDates) {
    this.excludedDates = this.config.excludedDates
      .replace(/\s+/, ' ')
      .split(' ')
      .map((item) => {
        return item.includes('-')
          ? this.parseDateRangeString(item)
          : this.formattedDateFromString(item)
      })
      .flat()
      .filter((item) => item)
  }
}

/*
 * Parses a daterange string into an array of dates
 * @param {String} datestring - A daterange string in the format "dd/mm/yyyy-dd/mm/yyyy"
 * @returns {Date[]}
 */
DatePicker.prototype.parseDateRangeString = function (datestring) {
  const dates = []
  const [startDate, endDate] = datestring
    .split('-')
    .map((d) => this.formattedDateFromString(d, null))

  if (startDate && endDate) {
    const date = new Date(startDate.getTime())
    /* eslint-disable no-unmodified-loop-condition */
    while (date <= endDate) {
      dates.push(new Date(date))
      date.setDate(date.getDate() + 1)
    }
    /* eslint-enable no-unmodified-loop-condition */
  }
  return dates
}

DatePicker.prototype.setExcludedDays = function () {
  if (this.config.excludedDays) {
    // lowercase and arrange dayLabels to put indexOf sunday == 0 for comparison
    // with getDay() function
    const weekDays = this.dayLabels.map((item) => item.toLowerCase())
    if (this.config.weekStartDay === 'monday') {
      weekDays.unshift(weekDays.pop())
    }

    this.excludedDays = this.config.excludedDays
      .replace(/\s+/, ' ')
      .toLowerCase()
      .split(' ')
      .map((item) => weekDays.indexOf(item))
      .filter((item) => item !== -1)
  }
}

DatePicker.prototype.setLeadingZeros = function () {
  if (typeof this.config.leadingZeros !== 'boolean') {
    if (this.config.leadingZeros.toLowerCase() === 'true') {
      this.config.leadingZeros = true
      return
    }
    if (this.config.leadingZeros.toLowerCase() === 'false') {
      this.config.leadingZeros = false
    }
  }
}

DatePicker.prototype.setWeekStartDay = function () {
  const weekStartDayParam = this.config.weekStartDay
  if (weekStartDayParam && weekStartDayParam.toLowerCase() === 'sunday') {
    this.config.weekStartDay = 'sunday'
    // Rotate dayLabels array to put Sunday as the first item
    this.dayLabels.unshift(this.dayLabels.pop())
  } else {
    this.config.weekStartDay = 'monday'
  }
}

/**
 * Determine if a date is selecteable
 *
 * @param {Date} date - the date to check
 * @returns {boolean}
 */
DatePicker.prototype.isExcludedDate = function (date) {
  // This comparison does not work correctly - it will exclude the mindate itself
  // see: https://github.com/ministryofjustice/moj-frontend/issues/923
  if (this.minDate && this.minDate > date) {
    return true
  }

  // This comparison works as expected - the maxdate will not be excluded
  if (this.maxDate && this.maxDate < date) {
    return true
  }

  for (const excludedDate of this.excludedDates) {
    if (date.toDateString() === excludedDate.toDateString()) {
      return true
    }
  }

  if (this.excludedDays.includes(date.getDay())) {
    return true
  }

  return false
}

/**
 * Get a Date object from a string
 *
 * @param {string} dateString - string in the format d/m/yyyy dd/mm/yyyy
 * @param {Date} fallback - date object to return if formatting fails
 * @returns {Date}
 */
DatePicker.prototype.formattedDateFromString = function (
  dateString,
  fallback = new Date()
) {
  let formattedDate = null
  // Accepts d/m/yyyy and dd/mm/yyyy
  const dateFormatPattern = /(\d{1,2})([-/,. ])(\d{1,2})\2(\d{4})/

  if (!dateFormatPattern.test(dateString)) return fallback

  const match = dateString.match(dateFormatPattern)
  const day = match[1]
  const month = match[3]
  const year = match[4]

  formattedDate = new Date(`${year}-${month}-${day}`)
  if (formattedDate instanceof Date && !isNaN(formattedDate)) {
    return formattedDate
  }
  return fallback
}

/**
 * Get a formatted date string from a Date object
 *
 * @param {Date} date - date to format to a string
 * @returns {string}
 */
DatePicker.prototype.formattedDateFromDate = function (date) {
  if (this.config.leadingZeros) {
    return `${this.leadingZeros(date.getDate())}/${this.leadingZeros(date.getMonth() + 1)}/${date.getFullYear()}`
  }

  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
}

/**
 * Get a human readable date in the format Monday 2 March 2024
 *
 * @param {Date} date - date to format
 * @returns {string}
 */
DatePicker.prototype.formattedDateHuman = function (date) {
  return `${this.dayLabels[(date.getDay() + 6) % 7]} ${date.getDate()} ${this.monthLabels[date.getMonth()]} ${date.getFullYear()}`
}

DatePicker.prototype.backgroundClick = function (event) {
  if (
    this.isOpen() &&
    !this.$dialog.contains(event.target) &&
    !this.$input.contains(event.target) &&
    !this.$calendarButton.contains(event.target)
  ) {
    event.preventDefault()
    this.closeDialog()
  }
}

DatePicker.prototype.firstButtonKeydown = function (event) {
  if (event.key === 'Tab' && event.shiftKey) {
    this.$lastButtonInDialog.focus()
    event.preventDefault()
  }
}

DatePicker.prototype.lastButtonKeydown = function (event) {
  if (event.key === 'Tab' && !event.shiftKey) {
    this.$firstButtonInDialog.focus()
    event.preventDefault()
  }
}

// render calendar
DatePicker.prototype.updateCalendar = function () {
  this.$dialogTitle.innerHTML = `${this.monthLabels[this.currentDate.getMonth()]} ${this.currentDate.getFullYear()}`

  const day = this.currentDate
  const firstOfMonth = new Date(day.getFullYear(), day.getMonth(), 1)
  let dayOfWeek

  if (this.config.weekStartDay === 'monday') {
    dayOfWeek = firstOfMonth.getDay() === 0 ? 6 : firstOfMonth.getDay() - 1 // Change logic to make Monday first day of week, i.e. 0
  } else {
    dayOfWeek = firstOfMonth.getDay()
  }

  firstOfMonth.setDate(firstOfMonth.getDate() - dayOfWeek)

  const thisDay = new Date(firstOfMonth)

  // loop through our days
  for (const calendarDay of this.calendarDays) {
    const hidden = thisDay.getMonth() !== day.getMonth()
    const disabled = this.isExcludedDate(thisDay)

    calendarDay.update(thisDay, hidden, disabled)

    thisDay.setDate(thisDay.getDate() + 1)
  }
}

DatePicker.prototype.setCurrentDate = function (focus = true) {
  const { currentDate } = this
  this.calendarDays.forEach((calendarDay) => {
    calendarDay.button.classList.add('moj-datepicker__button')
    calendarDay.button.classList.add('moj-datepicker__calendar-day')
    calendarDay.button.setAttribute('tabindex', '-1')
    calendarDay.button.classList.remove(this.selectedDayButtonClass)
    const calendarDayDate = calendarDay.date
    calendarDayDate.setHours(0, 0, 0, 0)

    const today = new Date()
    today.setHours(0, 0, 0, 0)

    if (
      calendarDayDate.getTime() ===
      currentDate.getTime() /* && !calendarDay.button.disabled */
    ) {
      if (focus) {
        calendarDay.button.setAttribute('tabindex', '0')
        calendarDay.button.focus()
        calendarDay.button.classList.add(this.selectedDayButtonClass)
      }
    }

    if (
      this.inputDate &&
      calendarDayDate.getTime() === this.inputDate.getTime()
    ) {
      calendarDay.button.classList.add(this.currentDayButtonClass)
      calendarDay.button.setAttribute('aria-current', 'date')
    } else {
      calendarDay.button.classList.remove(this.currentDayButtonClass)
      calendarDay.button.removeAttribute('aria-current')
    }

    if (calendarDayDate.getTime() === today.getTime()) {
      calendarDay.button.classList.add(this.todayButtonClass)
    } else {
      calendarDay.button.classList.remove(this.todayButtonClass)
    }
  })

  // if no date is tab-able, make the first non-disabled date tab-able
  if (!focus) {
    const enabledDays = this.calendarDays.filter((calendarDay) => {
      return (
        window.getComputedStyle(calendarDay.button).display === 'block' &&
        !calendarDay.button.disabled
      )
    })

    enabledDays[0].button.setAttribute('tabindex', '0')

    this.currentDate = enabledDays[0].date
  }
}

DatePicker.prototype.selectDate = function (date) {
  if (this.isExcludedDate(date)) {
    return
  }

  this.$calendarButton.querySelector('span').innerText =
    `Choose date. Selected date is ${this.formattedDateHuman(date)}`
  this.$input.value = this.formattedDateFromDate(date)

  const changeEvent = new Event('change', { bubbles: true, cancelable: true })
  this.$input.dispatchEvent(changeEvent)

  this.closeDialog()
}

DatePicker.prototype.isOpen = function () {
  return this.$dialog.classList.contains('moj-datepicker__dialog--open')
}

DatePicker.prototype.toggleDialog = function (event) {
  event.preventDefault()
  if (this.isOpen()) {
    this.closeDialog()
  } else {
    this.setMinAndMaxDatesOnCalendar()
    this.openDialog()
  }
}

DatePicker.prototype.openDialog = function () {
  this.$dialog.hidden = false
  this.$dialog.classList.add('moj-datepicker__dialog--open')
  this.$calendarButton.setAttribute('aria-expanded', 'true')

  // position the dialog
  // if input is wider than dialog pin it to the right
  if (this.$input.offsetWidth > this.$dialog.offsetWidth) {
    this.$dialog.style.right = `0px`
  }
  this.$dialog.style.top = `${this.$input.offsetHeight + 3}px`

  // get the date from the input element
  this.inputDate = this.formattedDateFromString(this.$input.value)
  this.currentDate = this.inputDate
  this.currentDate.setHours(0, 0, 0, 0)

  this.updateCalendar()
  this.setCurrentDate()
}

DatePicker.prototype.closeDialog = function () {
  this.$dialog.hidden = true
  this.$dialog.classList.remove('moj-datepicker__dialog--open')
  this.$calendarButton.setAttribute('aria-expanded', 'false')
  this.$calendarButton.focus()
}

DatePicker.prototype.goToDate = function (date, focus) {
  const current = this.currentDate
  this.currentDate = date

  if (
    current.getMonth() !== this.currentDate.getMonth() ||
    current.getFullYear() !== this.currentDate.getFullYear()
  ) {
    this.updateCalendar()
  }

  this.setCurrentDate(focus)
}

// day navigation
DatePicker.prototype.focusNextDay = function () {
  const date = new Date(this.currentDate)
  date.setDate(date.getDate() + 1)
  this.goToDate(date)
}

DatePicker.prototype.focusPreviousDay = function () {
  const date = new Date(this.currentDate)
  date.setDate(date.getDate() - 1)
  this.goToDate(date)
}

// week navigation
DatePicker.prototype.focusNextWeek = function () {
  const date = new Date(this.currentDate)
  date.setDate(date.getDate() + 7)
  this.goToDate(date)
}

DatePicker.prototype.focusPreviousWeek = function () {
  const date = new Date(this.currentDate)
  date.setDate(date.getDate() - 7)
  this.goToDate(date)
}

DatePicker.prototype.focusFirstDayOfWeek = function () {
  const date = new Date(this.currentDate)
  const firstDayOfWeekIndex = this.config.weekStartDay === 'sunday' ? 0 : 1
  const dayOfWeek = date.getDay()
  const diff =
    dayOfWeek >= firstDayOfWeekIndex
      ? dayOfWeek - firstDayOfWeekIndex
      : 6 - dayOfWeek

  date.setDate(date.getDate() - diff)
  date.setHours(0, 0, 0, 0)

  this.goToDate(date)
}

DatePicker.prototype.focusLastDayOfWeek = function () {
  const date = new Date(this.currentDate)
  const lastDayOfWeekIndex = this.config.weekStartDay === 'sunday' ? 6 : 0
  const dayOfWeek = date.getDay()
  const diff =
    dayOfWeek <= lastDayOfWeekIndex
      ? lastDayOfWeekIndex - dayOfWeek
      : 7 - dayOfWeek

  date.setDate(date.getDate() + diff)
  date.setHours(0, 0, 0, 0)

  this.goToDate(date)
}

// month navigation
DatePicker.prototype.focusNextMonth = function (event, focus = true) {
  event.preventDefault()
  const date = new Date(this.currentDate)
  date.setMonth(date.getMonth() + 1, 1)
  this.goToDate(date, focus)
}

DatePicker.prototype.focusPreviousMonth = function (event, focus = true) {
  event.preventDefault()
  const date = new Date(this.currentDate)
  date.setMonth(date.getMonth() - 1, 1)
  this.goToDate(date, focus)
}

// year navigation
DatePicker.prototype.focusNextYear = function (event, focus = true) {
  event.preventDefault()
  const date = new Date(this.currentDate)
  date.setFullYear(date.getFullYear() + 1, date.getMonth(), 1)
  this.goToDate(date, focus)
}

DatePicker.prototype.focusPreviousYear = function (event, focus = true) {
  event.preventDefault()
  const date = new Date(this.currentDate)
  date.setFullYear(date.getFullYear() - 1, date.getMonth(), 1)
  this.goToDate(date, focus)
}

/**
 * Parse dataset
 *
 * @param {Schema} schema - Component class
 * @param {DOMStringMap} dataset - HTML element dataset
 * @returns {object} Normalised dataset
 */
DatePicker.prototype.parseDataset = function (schema, dataset) {
  const parsed = {}

  for (const [field, ,] of Object.entries(schema.properties)) {
    if (field in dataset) {
      parsed[field] = dataset[field]
    }
  }

  return parsed
}

/**
 * Config merging function
 *
 * Takes any number of objects and combines them together, with
 * greatest priority on the LAST item passed in.
 *
 * @param {...{ [key: string]: unknown }} configObjects - Config objects to merge
 * @returns {{ [key: string]: unknown }} A merged config object
 */
DatePicker.prototype.mergeConfigs = function (...configObjects) {
  const formattedConfigObject = {}

  // Loop through each of the passed objects
  for (const configObject of configObjects) {
    for (const key of Object.keys(configObject)) {
      const option = formattedConfigObject[key]
      const override = configObject[key]

      // Push their keys one-by-one into formattedConfigObject. Any duplicate
      // keys with object values will be merged, otherwise the new value will
      // override the existing value.
      if (typeof option === 'object' && typeof override === 'object') {
        // @ts-expect-error Index signature for type 'string' is missing
        formattedConfigObject[key] = this.mergeConfigs(option, override)
      } else {
        formattedConfigObject[key] = override
      }
    }
  }

  return formattedConfigObject
}

/**
 *
 * @param {HTMLElement} button
 * @param {number} index
 * @param {number} row
 * @param {number} column
 * @param {DatePicker} picker
 * @class
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

/**
 * @param {Date} day - the Date for the calendar day
 * @param {boolean} hidden - visibility of the day
 * @param {boolean} disabled - is the day selectable or excluded
 */
DSCalendarDay.prototype.update = function (day, hidden, disabled) {
  const label = day.getDate()
  let accessibleLabel = this.picker.formattedDateHuman(day)

  if (disabled) {
    this.button.setAttribute('aria-disabled', 'true')
    accessibleLabel = `Excluded date, ${accessibleLabel}`
  } else {
    this.button.removeAttribute('aria-disabled')
  }

  if (hidden) {
    this.button.style.display = 'none'
  } else {
    this.button.style.display = 'block'
  }
  this.button.setAttribute(
    'data-testid',
    this.picker.formattedDateFromDate(day)
  )

  this.button.innerHTML = `<span class="govuk-visually-hidden">${accessibleLabel}</span><span aria-hidden="true">${label}</span>`
  this.date = new Date(day)
}

DSCalendarDay.prototype.click = function (event) {
  this.picker.goToDate(this.date)
  this.picker.selectDate(this.date)

  event.stopPropagation()
  event.preventDefault()
}

DSCalendarDay.prototype.keyPress = function (event) {
  let calendarNavKey = true

  switch (event.key) {
    case 'ArrowLeft':
      this.picker.focusPreviousDay()
      break
    case 'ArrowRight':
      this.picker.focusNextDay()
      break
    case 'ArrowUp':
      this.picker.focusPreviousWeek()
      break
    case 'ArrowDown':
      this.picker.focusNextWeek()
      break
    case 'Home':
      this.picker.focusFirstDayOfWeek()
      break
    case 'End':
      this.picker.focusLastDayOfWeek()
      break
    case 'PageUp': {
      if (event.shiftKey) {
        this.picker.focusPreviousYear(event)
      } else {
        this.picker.focusPreviousMonth(event)
      }
      break
    }
    case 'PageDown': {
      if (event.shiftKey) {
        this.picker.focusNextYear(event)
      } else {
        this.picker.focusNextMonth(event)
      }
      break
    }
    default:
      calendarNavKey = false
      break
  }

  if (calendarNavKey) {
    event.preventDefault()
    event.stopPropagation()
  }
}
