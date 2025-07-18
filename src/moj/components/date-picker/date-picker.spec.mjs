/* eslint-disable no-new */

import {
  getAllByRole,
  getByText,
  getByRole,
  queryByRole,
  queryByText,
  screen
} from '@testing-library/dom'
import { userEvent } from '@testing-library/user-event'
import dayjs from 'dayjs'
import { configureAxe } from 'jest-axe'
import { outdent } from 'outdent'

import { DatePicker } from './date-picker.mjs'

const user = userEvent.setup()
const axe = configureAxe({
  rules: {
    // disable landmark rules when testing isolated components.
    region: { enabled: false }
  }
})

/**
 * @param {object} params
 * @param {string} [params.html]
 * @param {Record<string, string>} [params.attributes]
 */
function createComponent(params = {}) {
  const attributes = Object.entries(params.attributes ?? {}).map(
    ([key, value]) => ` ${key}="${value}"`
  )

  const html =
    params.html ??
    outdent`
      <form aria-label="form" action="">
        <div class="moj-datepicker" data-module="moj-date-picker"${attributes}>
          <div class="govuk-form-group">
            <label class="govuk-label" for="date">
              Date
            </label>
            <div id="date-hint" class="govuk-hint">
              For example, 17/5/2024.
            </div>
            <input class="govuk-input moj-js-datepicker-input " id="date" name="date" type="text" aria-describedby="date-hint" autocomplete="off">
          </div>
        </div>
      </form>
    `

  document.body.insertAdjacentHTML('afterbegin', html)

  return /** @type {HTMLElement} */ (
    document.querySelector('[data-module="moj-date-picker"]')
  )
}

const randomIntBetween = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const getFirstDayOfWeek = (dateObject, firstDayOfWeekIndex) => {
  const dayOfWeek = dateObject.getDay()
  const firstDayOfWeek = new Date(dateObject)
  const diff =
    dayOfWeek >= firstDayOfWeekIndex
      ? dayOfWeek - firstDayOfWeekIndex
      : 6 - dayOfWeek

  firstDayOfWeek.setDate(dateObject.getDate() - diff)
  firstDayOfWeek.setHours(0, 0, 0, 0)

  return firstDayOfWeek
}

const getLastDayOfWeek = (dateObject, lastDayOfWeekIndex) => {
  const dayOfWeek = dateObject.getDay()
  const lastDayOfWeek = new Date(dateObject)
  const diff =
    dayOfWeek <= lastDayOfWeekIndex
      ? lastDayOfWeekIndex - dayOfWeek
      : 7 - dayOfWeek

  lastDayOfWeek.setDate(dateObject.getDate() - diff)
  lastDayOfWeek.setHours(0, 0, 0, 0)

  return lastDayOfWeek
}

const getDateFormatted = (value) => {
  return dayjs().date(value).startOf('day').format('D/M/YYYY')
}

const getDateInCurrentMonth = (excluding = []) => {
  const today = dayjs().date()
  excluding.push(today)
  const lastDayOfMonth = dayjs().endOf('month').date()
  const days = range(1, lastDayOfMonth).filter((x) => !excluding.includes(x))

  return days[Math.floor(Math.random() * days.length)]
}

/**
 * @param {number} start
 * @param {number} end
 */
const range = (start, end) => {
  return [...Array(end - start + 1).keys()].map((x) => x + start)
}

describe('Date picker with defaults', () => {
  let component
  let calendarButton
  let dialog

  beforeEach(() => {
    component = createComponent()
    new DatePicker(component)

    calendarButton = queryByText(component, 'Choose date')?.closest('button')
    dialog = queryByRole(component, 'dialog', { hidden: true })
  })

  afterEach(() => {
    document.body.innerHTML = ''
  })

  test('initialises calendar calendarButton and dialog', () => {
    expect(calendarButton).not.toBeNull()
    expect(dialog).not.toBeNull()
    expect(component).toContainElement(calendarButton)
    expect(component).toContainElement(dialog)
    expect(dialog).not.toBeVisible()
  })

  test('calendar button toggles dialog', async () => {
    await user.click(calendarButton)
    expect(dialog).toBeVisible()

    await user.click(calendarButton)
    expect(dialog).not.toBeVisible()
  })

  test('dialog has required buttons', async () => {
    await user.click(calendarButton)
    const selectButton = queryByText(dialog, 'Select')
    const closeButton = queryByText(dialog, 'Close')
    const prevMonthButton = queryByText(dialog, 'Previous month')
    const prevYearButton = queryByText(dialog, 'Previous year')
    const nextMonthButton = queryByText(dialog, 'Next month')
    const nextYearButton = queryByText(dialog, 'Next year')

    expect(selectButton).toBeInTheDocument()
    expect(closeButton).toBeInTheDocument()
    expect(prevMonthButton).toBeInTheDocument()
    expect(prevYearButton).toBeInTheDocument()
    expect(nextMonthButton).toBeInTheDocument()
    expect(nextYearButton).toBeInTheDocument()
  })

  test('calendar opens with current month and year', async () => {
    await user.click(calendarButton)
    const today = new Date()
    const currentMonthName = today.toLocaleString('default', { month: 'long' })
    const currentYear = today.getFullYear()
    const dialogTitle = `${currentMonthName} ${currentYear}`

    expect(dialog).toContainElement(screen.getByText(dialogTitle))
  })

  test('today is selected', async () => {
    await user.click(calendarButton)
    const today = new Date()
    const todayButton = getByRole(dialog, 'button', { current: 'date' })

    expect(todayButton).toHaveFocus()
    expect(todayButton).toHaveClass(
      'moj-datepicker__button--selected',
      'moj-datepicker__button--current',
      'moj-datepicker__button--today'
    )
    expect(todayButton).toHaveTextContent(new RegExp(`${today.getDate()}`))
  })

  test('can navigate back in time', async () => {
    const today = dayjs()
    const previousMonth = dayjs().subtract(1, 'month')
    const previousYear = previousMonth.subtract(1, 'year')

    const currentTitle = `${today.format('MMMM YYYY')}`
    const previousMonthTitle = `${previousMonth.format('MMMM YYYY')}`
    const previousYearTitle = `${previousYear.format('MMMM YYYY')}`

    await user.click(calendarButton)
    const prevMonthButton = getByText(dialog, 'Previous month')
    const prevYearButton = getByText(dialog, 'Previous year')

    expect(dialog).toContainElement(screen.getByText(currentTitle))
    await user.click(prevMonthButton)
    expect(dialog).toContainElement(screen.getByText(previousMonthTitle))
    await user.click(prevYearButton)
    expect(dialog).toContainElement(screen.getByText(previousYearTitle))
  })

  test('can navigate forward in time', async () => {
    const today = dayjs()
    const nextMonth = dayjs().add(1, 'month')
    const nextYear = nextMonth.add(1, 'year')

    const currentTitle = `${today.format('MMMM YYYY')}`
    const nextMonthTitle = `${nextMonth.format('MMMM YYYY')}`
    const nextYearTitle = `${nextYear.format('MMMM YYYY')}`

    await user.click(calendarButton)
    const nextMonthButton = getByText(dialog, 'Next month')
    const nextYearButton = getByText(dialog, 'Next year')

    expect(dialog).toContainElement(screen.getByText(currentTitle))
    await user.click(nextMonthButton)
    expect(dialog).toContainElement(screen.getByText(nextMonthTitle))
    await user.click(nextYearButton)
    expect(dialog).toContainElement(screen.getByText(nextYearTitle))
  })

  test('close button closes the calendar popup', async () => {
    await user.click(calendarButton)
    const closeButton = queryByText(dialog, 'Close')

    expect(dialog).toBeVisible()
    await user.click(closeButton)
    expect(dialog).not.toBeVisible()
    expect(calendarButton).toHaveFocus()
  })

  test('clicking outside closes the calendar popup', async () => {
    const hint = screen.getByText('For example, 17/5/2024.')

    await user.click(calendarButton)
    expect(dialog).toBeVisible()
    await user.click(hint)
    expect(dialog).not.toBeVisible()
  })

  describe('date picker with initial value', () => {
    let inputString
    let dateString
    let input
    let selectedDate
    let newDate

    beforeEach(async () => {
      inputString = '19/05/2024'
      dateString = '2024-05-19'
      input = screen.getByLabelText('Date')
      selectedDate = new Date(dateString)

      while (newDate !== selectedDate.getDate()) {
        newDate = randomIntBetween(7, 21) // outside this we could have duplicate hidden buttons from prev/next month
      }

      await user.type(input, inputString)
      await user.click(calendarButton)
    })

    test('opens to date in input field', async () => {
      const selectedDateButton = getByRole(dialog, 'button', {
        current: 'date'
      })

      expect(selectedDateButton).toHaveFocus()
      expect(selectedDateButton).toHaveClass(
        'moj-datepicker__button--selected',
        'moj-datepicker__button--current'
      )
      expect(selectedDateButton).not.toHaveClass(
        'moj-datepicker__button--today'
      )
      expect(selectedDateButton).toHaveTextContent(
        new RegExp(`${selectedDate.getDate()}`)
      )
    })

    test('clicking a date selects it, closes dialog, and populates input', async () => {
      const newDateButton = queryByText(dialog, newDate)?.closest('button')

      await user.click(newDateButton)

      expect(dialog).not.toBeVisible()
      expect(input).toHaveValue(`${newDate}/5/2024`)
      expect(calendarButton).toHaveFocus()
    })

    test('clicking select, closes dialog and populates input', async () => {
      const selectButton = getByText(dialog, 'Select')

      await user.keyboard('ArrowRight')
      await user.click(selectButton)

      expect(dialog).not.toBeVisible()
      expect(input).toHaveValue(`${newDate}/5/2024`)
      expect(calendarButton).toHaveFocus()
    })
  })

  describe('keyboard interaction', () => {
    let inputString
    let dateString
    let input
    let initialDate

    beforeEach(async () => {
      inputString = '19/5/2024'
      dateString = '2024-05-19'
      input = screen.getByLabelText('Date')
      initialDate = new Date(dateString)

      await user.type(input, inputString)
    })

    test('esc closes calendar dialog', async () => {
      await user.tab()
      expect(calendarButton).toHaveFocus()
      await user.keyboard('{enter}')
      expect(dialog).toBeVisible()
      await user.keyboard('{escape}')
      expect(dialog).not.toBeVisible()
      expect(calendarButton).toHaveFocus()
    })

    test('calendar dialog is a focus trap', async () => {
      await user.click(calendarButton)
      const selectedDateButton = getByRole(dialog, 'button', {
        current: 'date'
      })
      const selectButton = queryByText(dialog, 'Select')
      const closeButton = queryByText(dialog, 'Close')
      const prevMonthButton = getByRole(dialog, 'button', {
        name: 'Previous month'
      })
      const prevYearButton = getByRole(dialog, 'button', {
        name: 'Previous year'
      })
      const nextMonthButton = getByRole(dialog, 'button', {
        name: 'Next month'
      })
      const nextYearButton = getByRole(dialog, 'button', { name: 'Next year' })

      expect(selectedDateButton).toHaveFocus()
      await user.tab()
      expect(selectButton).toHaveFocus()
      await user.tab()
      expect(closeButton).toHaveFocus()
      await user.tab()
      expect(prevYearButton).toHaveFocus()
      await user.tab()
      expect(prevMonthButton).toHaveFocus()
      await user.tab()
      expect(nextMonthButton).toHaveFocus()
      await user.tab()
      expect(nextYearButton).toHaveFocus()
      await user.tab()
      expect(selectedDateButton).toHaveFocus()
    })

    test('rigth arrow navigates to next day', async () => {
      await user.click(calendarButton)
      const initialDateButton = getByRole(dialog, 'button', {
        current: 'date'
      })

      expect(initialDateButton).toHaveFocus()

      await user.keyboard('[ArrowRight]')
      const labelRegex = new RegExp(` ${initialDate.getDate() + 1} `)
      const selectedDateButton = getByRole(dialog, 'button', {
        name: labelRegex
      })
      expect(selectedDateButton).toHaveClass('moj-datepicker__button--selected')
      expect(selectedDateButton).toHaveFocus()
    })

    test('left arrow navigates to next day', async () => {
      await user.click(calendarButton)
      const initialDateButton = getByRole(dialog, 'button', {
        current: 'date'
      })

      expect(initialDateButton).toHaveFocus()

      await user.keyboard('[ArrowLeft]')
      const labelRegex = new RegExp(` ${initialDate.getDate() - 1} `)
      const selectedDateButton = getByRole(dialog, 'button', {
        name: labelRegex
      })
      expect(selectedDateButton).toHaveClass('moj-datepicker__button--selected')
      expect(selectedDateButton).toHaveFocus()
    })

    test('up arrow navigates to next day', async () => {
      await user.click(calendarButton)
      const initialDateButton = getByRole(dialog, 'button', {
        current: 'date'
      })

      expect(initialDateButton).toHaveFocus()

      await user.keyboard('[ArrowUp]')
      const labelRegex = new RegExp(` ${initialDate.getDate() - 7} `)
      const selectedDateButton = getByRole(dialog, 'button', {
        name: labelRegex
      })
      expect(selectedDateButton).toHaveClass('moj-datepicker__button--selected')
      expect(selectedDateButton).toHaveFocus()
    })

    test('down arrow navigates to next day', async () => {
      await user.click(calendarButton)
      const initialDateButton = getByRole(dialog, 'button', {
        current: 'date'
      })

      expect(initialDateButton).toHaveFocus()

      await user.keyboard('[ArrowDown]')
      const labelRegex = new RegExp(` ${initialDate.getDate() + 7} `)
      const selectedDateButton = getByRole(dialog, 'button', {
        name: labelRegex
      })
      expect(selectedDateButton).toHaveClass('moj-datepicker__button--selected')
      expect(selectedDateButton).toHaveFocus()
    })

    test('home key focuses first day of the week', async () => {
      await user.click(calendarButton)
      const initialDateButton = getByRole(dialog, 'button', {
        current: 'date'
      })
      const firstDayOfWeek = getFirstDayOfWeek(initialDate, 1)
      const labelRegex = new RegExp(` ${firstDayOfWeek.getDate()} `)
      const selectedDateButton = getByRole(dialog, 'button', {
        name: labelRegex
      })

      expect(initialDateButton).toHaveFocus()
      await user.keyboard('[Home]')
      expect(selectedDateButton).toHaveClass('moj-datepicker__button--selected')
      expect(selectedDateButton).toHaveFocus()
    })

    test('end key focuses last day of the week', async () => {
      await user.click(calendarButton)
      const initialDateButton = getByRole(dialog, 'button', {
        current: 'date'
      })
      const lastDayOfWeek = getLastDayOfWeek(initialDate, 0)
      const labelRegex = new RegExp(` ${lastDayOfWeek.getDate()} `)
      const selectedDateButton = getByRole(dialog, 'button', {
        name: labelRegex
      })

      expect(initialDateButton).toHaveFocus()
      await user.keyboard('[End]')
      expect(selectedDateButton).toHaveClass('moj-datepicker__button--selected')
      expect(selectedDateButton).toHaveFocus()
    })

    test('pageup focuses previous month and year', async () => {
      await user.click(calendarButton)
      const currentMonthName = initialDate.toLocaleString('default', {
        month: 'long'
      })
      const currentYear = initialDate.getFullYear()
      const previousMonthName = new Date(
        new Date(initialDate).setMonth(initialDate.getMonth() - 1, 1)
      ).toLocaleString('default', { month: 'long' })
      const previousYear = new Date(
        new Date(initialDate).setFullYear(initialDate.getFullYear() - 1)
      ).getFullYear()
      const currentTitle = `${currentMonthName} ${currentYear}`
      const previousMonthTitle = `${previousMonthName} ${currentYear}`
      const previousYearTitle = `${previousMonthName} ${previousYear}`
      const dialogTitle = getByRole(dialog, 'heading', { level: 2 })

      expect(dialogTitle).toHaveTextContent(currentTitle)

      await user.keyboard('{PageUp}')
      expect(dialogTitle).toHaveTextContent(previousMonthTitle)

      await user.keyboard('{Shift>}{PageUp}')
      expect(dialogTitle).toHaveTextContent(previousYearTitle)
    })

    test('pagedown focuses next month and year', async () => {
      await user.click(calendarButton)
      const currentMonthName = initialDate.toLocaleString('default', {
        month: 'long'
      })
      const currentYear = initialDate.getFullYear()
      const nextMonthName = new Date(
        new Date(initialDate).setMonth(initialDate.getMonth() + 1, 1)
      ).toLocaleString('default', { month: 'long' })
      const nextYear = new Date(
        new Date(initialDate).setFullYear(initialDate.getFullYear() + 1)
      ).getFullYear()
      const currentTitle = `${currentMonthName} ${currentYear}`
      const nextMonthTitle = `${nextMonthName} ${currentYear}`
      const nextYearTitle = `${nextMonthName} ${nextYear}`
      const dialogTitle = getByRole(dialog, 'heading', { level: 2 })

      expect(dialogTitle).toHaveTextContent(currentTitle)

      await user.keyboard('{PageDown}')
      expect(dialogTitle).toHaveTextContent(nextMonthTitle)

      await user.keyboard('{Shift>}{PageDown}')
      expect(dialogTitle).toHaveTextContent(nextYearTitle)
    })

    test('enter selects date and closes dialog', async () => {
      await user.click(calendarButton)
      await user.keyboard('[ArrowRight]')
      await user.keyboard('[Enter]')

      expect(dialog).not.toBeVisible()
      expect(input).toHaveValue(`20/5/2024`)
      expect(calendarButton).toHaveFocus()
    })

    test('space selects date and closes dialog', async () => {
      await user.click(calendarButton)
      await user.keyboard('[ArrowRight]')
      await user.keyboard('[Space]')

      expect(dialog).not.toBeVisible()
      expect(input).toHaveValue(`20/5/2024`)
      expect(calendarButton).toHaveFocus()
    })

    test('select button selects date and closes dialog', async () => {
      await user.click(calendarButton)
      await user.keyboard('[ArrowRight]')
      await user.tab()
      await user.keyboard('[Enter]')

      expect(dialog).not.toBeVisible()
      expect(input).toHaveValue(`20/5/2024`)
      expect(calendarButton).toHaveFocus()
    })

    test('close button, closes dialog', async () => {
      await user.click(calendarButton)
      await user.keyboard('[ArrowRight]')
      await user.tab()
      await user.tab()
      await user.keyboard('[Enter]')

      expect(dialog).not.toBeVisible()
      expect(input).toHaveValue(`19/5/2024`)
      expect(calendarButton).toHaveFocus()
    })

    test('return button submits parent form', async () => {
      const form = screen.queryByRole('form')
      let submitted = false
      form.addEventListener('submit', () => {
        submitted = true
      })
      await user.click(input)
      await user.keyboard('[Enter]')
      expect(submitted).toBe(true)
    })
  })

  describe('accessibility', () => {
    test('component has no wcag violations', async () => {
      expect(await axe(document.body)).toHaveNoViolations()
      await user.click(calendarButton)
      expect(await axe(document.body)).toHaveNoViolations()
    })
  })
})

describe('button menu JS API', () => {
  let component

  beforeEach(() => {
    component = createComponent()
  })

  afterEach(() => {
    document.body.innerHTML = ''
  })

  describe('config', () => {
    test('default config values', () => {
      const datePicker = new DatePicker(component)

      // @ts-expect-error Ignore protected access
      expect(datePicker.config).toStrictEqual({
        leadingZeros: false,
        weekStartDay: 'monday',
        input: {
          selector: '.moj-js-datepicker-input'
        }
      })
    })

    test('leadingZeros', () => {
      const datePicker = new DatePicker(component, {
        leadingZeros: true
      })

      // @ts-expect-error Ignore protected access
      expect(datePicker.config.leadingZeros).toBe(true)
    })

    test('weekStartDay can be set to sunday', () => {
      const datePicker = new DatePicker(component, {
        weekStartDay: 'Sunday'
      })

      // @ts-expect-error Ignore protected access
      expect(datePicker.config.weekStartDay).toBe('sunday')
      expect(datePicker.dayLabels[0]).toBe('Sunday')
    })

    test("weekStartDay can't be set to other days", () => {
      const datePicker = new DatePicker(component, {
        weekStartDay: 'friday'
      })

      // @ts-expect-error Ignore protected access
      expect(datePicker.config.weekStartDay).toBe('monday')
    })

    test('minDate', () => {
      const minDate = dayjs().subtract(1, 'week').startOf('day')
      const datePicker = new DatePicker(component, {
        minDate: minDate.format('D/M/YYYY')
      })

      expect(datePicker.minDate).toStrictEqual(minDate.toDate())
    })

    test('future minDate sets currentDate to minDate', () => {
      const minDate = dayjs().add(1, 'week').startOf('day')
      const datePicker = new DatePicker(component, {
        minDate: minDate.format('D/M/YYYY')
      })

      expect(datePicker.minDate).toStrictEqual(minDate.toDate())
      expect(datePicker.currentDate).toStrictEqual(minDate.toDate())
    })

    test('maxDate', () => {
      const maxDate = dayjs().add(1, 'week').startOf('day')
      const datePicker = new DatePicker(component, {
        maxDate: maxDate.format('D/M/YYYY')
      })

      expect(datePicker.maxDate).toStrictEqual(maxDate.toDate())
    })

    test('past maxDate sets currentDate to maxDate', () => {
      const maxDate = dayjs().subtract(1, 'week').startOf('day')
      const datePicker = new DatePicker(component, {
        maxDate: maxDate.format('D/M/YYYY')
      })

      expect(datePicker.maxDate).toStrictEqual(maxDate.toDate())
      expect(datePicker.currentDate).toStrictEqual(maxDate.toDate())
    })

    test('excludedDays', () => {
      const datePicker = new DatePicker(component, {
        excludedDays: 'sunday thursday'
      })

      expect(datePicker.excludedDays).toEqual([0, 4])
    })

    describe('excludedDates', () => {
      test('excluding a day', () => {
        const dateToExclude = dayjs()
          .date(getDateInCurrentMonth())
          .startOf('day')

        const datePicker = new DatePicker(component, {
          excludedDates: dateToExclude.format('D/M/YYYY')
        })

        expect(datePicker.excludedDates).toStrictEqual([dateToExclude.toDate()])
      })

      test('excluding multiple dates', () => {
        const firstDateToExclude = dayjs()
          .date(getDateInCurrentMonth())
          .startOf('day')

        const secondDateToExclude = dayjs()
          .date(getDateInCurrentMonth([firstDateToExclude.date()]))
          .startOf('day')

        const datePicker = new DatePicker(component, {
          excludedDates: `${firstDateToExclude.format('D/M/YYYY')} ${secondDateToExclude.format('D/M/YYYY')}`
        })

        expect(datePicker.excludedDates).toHaveLength(2)
        expect(datePicker.excludedDates).toStrictEqual([
          firstDateToExclude.toDate(),
          secondDateToExclude.toDate()
        ])
      })

      test('excluding a range of days', () => {
        let datesToExclude = []
        if (dayjs().date() < 15) {
          datesToExclude.push(dayjs().date(18))
          datesToExclude.push(dayjs().date(19))
          datesToExclude.push(dayjs().date(20))
        } else {
          datesToExclude.push(dayjs().date(3))
          datesToExclude.push(dayjs().date(4))
          datesToExclude.push(dayjs().date(5))
        }
        datesToExclude = datesToExclude.map((date) => date.startOf('day'))

        const datePicker = new DatePicker(component, {
          excludedDates: `${datesToExclude[0].format('D/M/YYYY')}-${datesToExclude[datesToExclude.length - 1].format('D/M/YYYY')}`
        })

        // expect(datePicker.excludedDates.length).toEqual(3);
        expect(datePicker.excludedDates).toStrictEqual(
          datesToExclude.map((date) => date.toDate())
        )
      })

      test('excluding individual dates and a range of days', () => {
        let datesToExclude = []
        if (dayjs().date() < 15) {
          datesToExclude.push(dayjs().date(18))
          datesToExclude.push(dayjs().date(19))
          datesToExclude.push(dayjs().date(20))
          datesToExclude.push(dayjs().date(22))
          datesToExclude.push(dayjs().date(25))
        } else {
          datesToExclude.push(dayjs().date(3))
          datesToExclude.push(dayjs().date(4))
          datesToExclude.push(dayjs().date(5))
          datesToExclude.push(dayjs().date(7))
          datesToExclude.push(dayjs().date(11))
        }
        datesToExclude = datesToExclude.map((date) => date.startOf('day'))

        const datePicker = new DatePicker(component, {
          excludedDates: `${datesToExclude[0].format('D/M/YYYY')}-${datesToExclude[2].format('D/M/YYYY')} ${datesToExclude[3].format('D/M/YYYY')} ${datesToExclude[4].format('D/M/YYYY')}`
        })

        expect(datePicker.excludedDates).toStrictEqual(
          datesToExclude.map((date) => date.toDate())
        )
      })
    })
  })

  describe('UI', () => {
    let calendarButton
    let input

    test('with leadingZeros false', async () => {
      input = screen.getByLabelText('Date')

      new DatePicker(component, {
        leadingZeros: false
      })

      calendarButton = screen.getByRole('button', { name: 'Choose date' })

      const dateToSelect = dayjs().date(9)
      const dateButton = screen.getByTestId(dateToSelect.format('D/M/YYYY'))

      await user.click(calendarButton)
      await user.click(dateButton)

      expect(input).toHaveValue(dateToSelect.format('D/M/YYYY'))
    })

    test('with leadingZeros true', async () => {
      input = screen.getByLabelText('Date')

      new DatePicker(component, {
        leadingZeros: true
      })

      calendarButton = screen.getByRole('button', { name: 'Choose date' })

      const dateToSelect = dayjs().date(9)
      const dateButton = screen.getByTestId(dateToSelect.format('DD/MM/YYYY'))

      await user.click(calendarButton)
      await user.click(dateButton)

      expect(input).toHaveValue(dateToSelect.format('DD/MM/YYYY'))
    })

    test('minDate', async () => {
      const minDay = 3
      const lastDayinMonth = dayjs().endOf('month').date()
      const minDate = dayjs().date(minDay)

      new DatePicker(component, {
        minDate: minDate.format('DD/MM/YYYY')
      })

      calendarButton = screen.getByRole('button', { name: 'Choose date' })

      await user.click(calendarButton)

      const dayButtonsDisabled = range(1, minDay - 1).map((day) =>
        screen.getByTestId(getDateFormatted(day))
      )

      const dayButtonsEnabled = range(minDay, lastDayinMonth).map((day) =>
        screen.getByTestId(getDateFormatted(day))
      )

      for (const dayButton of dayButtonsDisabled) {
        expect(dayButton).toHaveAttribute('aria-disabled', 'true')
      }

      for (const dayButton of dayButtonsEnabled) {
        expect(dayButton).not.toHaveAttribute('aria-disabled')
      }
    })

    test('maxDate', async () => {
      const maxDay = 21
      const lastDayinMonth = dayjs().endOf('month').date()
      const maxDate = dayjs().date(maxDay)

      new DatePicker(component, {
        maxDate: maxDate.format('DD/MM/YYYY')
      })

      calendarButton = screen.getByRole('button', { name: 'Choose date' })

      await user.click(calendarButton)

      const dayButtonsDisabled = range(maxDay + 1, lastDayinMonth).map((day) =>
        screen.getByTestId(getDateFormatted(day))
      )

      const dayButtonsEnabled = range(1, maxDay).map((day) =>
        screen.getByTestId(getDateFormatted(day))
      )

      for (const dayButton of dayButtonsDisabled) {
        expect(dayButton).toHaveAttribute('aria-disabled', 'true')
      }

      for (const dayButton of dayButtonsEnabled) {
        expect(dayButton).not.toHaveAttribute('aria-disabled')
      }
    })

    describe('excludedDates', () => {
      test('excluding a day', async () => {
        const dateToExclude = dayjs()
          .date(getDateInCurrentMonth())
          .startOf('day')

        const excludedDay = dateToExclude.date()
        const lastDayinMonth = dayjs().endOf('month').date()

        new DatePicker(component, {
          excludedDates: dateToExclude.format('D/M/YYYY')
        })

        calendarButton = screen.getByRole('button', { name: 'Choose date' })

        await user.click(calendarButton)

        const dayButtonsDisabled = [excludedDay].map((day) =>
          screen.getByTestId(getDateFormatted(day))
        )

        const dayButtonsEnabled = range(1, lastDayinMonth)
          .filter((day) => day !== excludedDay)
          .map((day) => screen.getByTestId(getDateFormatted(day)))

        for (const dayButton of dayButtonsDisabled) {
          expect(dayButton).toHaveAttribute('aria-disabled', 'true')
        }

        for (const dayButton of dayButtonsEnabled) {
          expect(dayButton).not.toHaveAttribute('aria-disabled')
        }
      })

      test('excluding a range of days', async () => {
        let datesToExclude = []
        if (dayjs().date() < 15) {
          datesToExclude.push(dayjs().date(18))
          datesToExclude.push(dayjs().date(19))
          datesToExclude.push(dayjs().date(20))
        } else {
          datesToExclude.push(dayjs().date(3))
          datesToExclude.push(dayjs().date(4))
          datesToExclude.push(dayjs().date(5))
        }
        datesToExclude = datesToExclude.map((date) => date.startOf('day'))

        const daysToExclude = datesToExclude.map((date) => date.date())
        const lastDayinMonth = dayjs().endOf('month').date()

        new DatePicker(component, {
          excludedDates: `${datesToExclude[0].format('D/M/YYYY')}-${datesToExclude[datesToExclude.length - 1].format('D/M/YYYY')}`
        })

        calendarButton = screen.getByRole('button', { name: 'Choose date' })

        await user.click(calendarButton)

        const dayButtonsDisabled = daysToExclude.map((day) =>
          screen.getByTestId(getDateFormatted(day))
        )

        const dayButtonsEnabled = range(1, lastDayinMonth)
          .filter((day) => !daysToExclude.includes(day))
          .map((day) => screen.getByTestId(getDateFormatted(day)))

        for (const dayButton of dayButtonsDisabled) {
          expect(dayButton).toHaveAttribute('aria-disabled', 'true')
        }

        for (const dayButton of dayButtonsEnabled) {
          expect(dayButton).not.toHaveAttribute('aria-disabled')
        }
      })
    })

    test('excludedDays', async () => {
      const lastDayinMonth = dayjs().endOf('month').date()
      const excludedDays = []
      for (let i = 1; i <= lastDayinMonth; i++) {
        if (dayjs().date(i).day() === 0) {
          excludedDays.push(i)
        }
      }

      new DatePicker(component, {
        excludedDays: 'sunday'
      })

      calendarButton = screen.getByRole('button', { name: 'Choose date' })

      await user.click(calendarButton)

      const dayButtonsDisabled = excludedDays.map((day) =>
        screen.getByTestId(getDateFormatted(day))
      )

      const dayButtonsEnabled = range(1, lastDayinMonth)
        .filter((day) => !excludedDays.includes(day))
        .map((day) => screen.getByTestId(getDateFormatted(day)))

      for (const dayButton of dayButtonsDisabled) {
        expect(dayButton).toHaveAttribute('aria-disabled', 'true')
      }

      for (const dayButton of dayButtonsEnabled) {
        expect(dayButton).not.toHaveAttribute('aria-disabled')
      }
    })

    test('default weekStartDay', async () => {
      new DatePicker(component)
      calendarButton = screen.getByRole('button', { name: 'Choose date' })
      await user.click(calendarButton)
      const headers = getAllByRole(component, 'columnheader')

      expect(headers[0]).toHaveAccessibleName('Monday')
    })

    test('weekStartDay Sunday', async () => {
      new DatePicker(component, { weekStartDay: 'sunday' })
      calendarButton = screen.getByRole('button', { name: 'Choose date' })
      await user.click(calendarButton)
      const headers = getAllByRole(component, 'columnheader')

      expect(headers[0]).toHaveAccessibleName('Sunday')
    })
  })
})

describe('Datepicker data-attributes API', () => {
  let component
  let calendarButton
  let input

  beforeEach(() => {})

  afterEach(() => {
    document.body.innerHTML = ''
  })

  test('with leadingZeros false', async () => {
    component = createComponent({
      attributes: {
        'data-leading-zeros': 'false'
      }
    })

    new DatePicker(component)

    input = screen.getByLabelText('Date')
    calendarButton = screen.getByRole('button', { name: 'Choose date' })
    const dateToSelect = dayjs().date(9)
    const dateButton = screen.getByTestId(dateToSelect.format('D/M/YYYY'))

    await user.click(calendarButton)
    await user.click(dateButton)

    expect(input).toHaveValue(dateToSelect.format('D/M/YYYY'))
  })

  test('with leadingZeros true', async () => {
    const component = createComponent({
      attributes: {
        'data-leading-zeros': 'true'
      }
    })

    new DatePicker(component)

    input = screen.getByLabelText('Date')
    calendarButton = screen.getByRole('button', { name: 'Choose date' })
    const dateToSelect = dayjs().date(9)
    const dateButton = screen.getByTestId(dateToSelect.format('DD/MM/YYYY'))

    await user.click(calendarButton)
    await user.click(dateButton)

    expect(input).toHaveValue(dateToSelect.format('DD/MM/YYYY'))
  })

  test('minDate', async () => {
    const minDay = 3
    const lastDayinMonth = dayjs().endOf('month').date()
    const minDate = dayjs().date(minDay)

    const component = createComponent({
      attributes: {
        'data-min-date': minDate.format('DD/MM/YYYY')
      }
    })

    new DatePicker(component)
    calendarButton = screen.getByRole('button', { name: 'Choose date' })

    await user.click(calendarButton)

    const dayButtonsDisabled = range(1, minDay - 1).map((day) =>
      screen.getByTestId(getDateFormatted(day))
    )

    const dayButtonsEnabled = range(minDay, lastDayinMonth).map((day) =>
      screen.getByTestId(getDateFormatted(day))
    )

    for (const dayButton of dayButtonsDisabled) {
      expect(dayButton).toHaveAttribute('aria-disabled', 'true')
    }

    for (const dayButton of dayButtonsEnabled) {
      expect(dayButton).not.toHaveAttribute('aria-disabled')
    }
  })

  test('maxDate', async () => {
    const maxDay = 21
    const lastDayinMonth = dayjs().endOf('month').date()
    const maxDate = dayjs().date(maxDay)

    const component = createComponent({
      attributes: {
        'data-max-date': maxDate.format('DD/MM/YYYY')
      }
    })

    new DatePicker(component)

    calendarButton = screen.getByRole('button', { name: 'Choose date' })

    await user.click(calendarButton)

    const dayButtonsDisabled = range(maxDay + 1, lastDayinMonth).map((day) =>
      screen.getByTestId(getDateFormatted(day))
    )

    const dayButtonsEnabled = range(1, maxDay).map((day) =>
      screen.getByTestId(getDateFormatted(day))
    )

    for (const dayButton of dayButtonsDisabled) {
      expect(dayButton).toHaveAttribute('aria-disabled', 'true')
    }

    for (const dayButton of dayButtonsEnabled) {
      expect(dayButton).not.toHaveAttribute('aria-disabled')
    }
  })

  describe('excludedDates', () => {
    test('excluding a day', async () => {
      const dateToExclude = dayjs().date(getDateInCurrentMonth()).startOf('day')
      const excludedDay = dateToExclude.date()
      const lastDayinMonth = dayjs().endOf('month').date()

      const component = createComponent({
        attributes: {
          'data-excluded-dates': dateToExclude.format('D/M/YYYY')
        }
      })

      new DatePicker(component)

      calendarButton = screen.getByRole('button', { name: 'Choose date' })

      await user.click(calendarButton)

      const dayButtonsDisabled = [excludedDay].map((day) =>
        screen.getByTestId(getDateFormatted(day))
      )

      const dayButtonsEnabled = range(1, lastDayinMonth)
        .filter((day) => day !== excludedDay)
        .map((day) => screen.getByTestId(getDateFormatted(day)))

      for (const dayButton of dayButtonsDisabled) {
        expect(dayButton).toHaveAttribute('aria-disabled', 'true')
      }

      for (const dayButton of dayButtonsEnabled) {
        expect(dayButton).not.toHaveAttribute('aria-disabled')
      }
    })

    test('excluding a range of days', async () => {
      let datesToExclude = []
      if (dayjs().date() < 15) {
        datesToExclude.push(dayjs().date(18))
        datesToExclude.push(dayjs().date(19))
        datesToExclude.push(dayjs().date(20))
      } else {
        datesToExclude.push(dayjs().date(3))
        datesToExclude.push(dayjs().date(4))
        datesToExclude.push(dayjs().date(5))
      }

      datesToExclude = datesToExclude.map((date) => date.startOf('day'))

      const daysToExclude = datesToExclude.map((date) => date.date())
      const lastDayinMonth = dayjs().endOf('month').date()

      component = createComponent({
        attributes: {
          'data-excluded-dates': `${datesToExclude[0].format('D/M/YYYY')}-${datesToExclude[datesToExclude.length - 1].format('D/M/YYYY')}`
        }
      })

      new DatePicker(component)

      calendarButton = screen.getByRole('button', { name: 'Choose date' })

      await user.click(calendarButton)

      const dayButtonsDisabled = daysToExclude.map((day) =>
        screen.getByTestId(getDateFormatted(day))
      )

      const dayButtonsEnabled = range(1, lastDayinMonth)
        .filter((day) => !daysToExclude.includes(day))
        .map((day) => screen.getByTestId(getDateFormatted(day)))

      for (const dayButton of dayButtonsDisabled) {
        expect(dayButton).toHaveAttribute('aria-disabled', 'true')
      }

      for (const dayButton of dayButtonsEnabled) {
        expect(dayButton).not.toHaveAttribute('aria-disabled')
      }
    })
  })

  test('excludedDays', async () => {
    const component = createComponent({
      attributes: {
        'data-excluded-days': 'sunday'
      }
    })

    const lastDayinMonth = dayjs().endOf('month').date()
    const excludedDays = []

    for (let i = 1; i <= lastDayinMonth; i++) {
      if (dayjs().date(i).day() === 0) {
        excludedDays.push(i)
      }
    }

    new DatePicker(component)

    calendarButton = screen.getByRole('button', { name: 'Choose date' })

    await user.click(calendarButton)

    const dayButtonsDisabled = excludedDays.map((day) =>
      screen.getByTestId(getDateFormatted(day))
    )

    const dayButtonsEnabled = range(1, lastDayinMonth)
      .filter((day) => !excludedDays.includes(day))
      .map((day) => screen.getByTestId(getDateFormatted(day)))

    for (const dayButton of dayButtonsDisabled) {
      expect(dayButton).toHaveAttribute('aria-disabled', 'true')
    }

    for (const dayButton of dayButtonsEnabled) {
      expect(dayButton).not.toHaveAttribute('aria-disabled')
    }
  })

  test('weekStartDay', async () => {
    component = createComponent({
      attributes: {
        'data-week-start-day': 'sunday'
      }
    })

    new DatePicker(component)

    calendarButton = screen.getByRole('button', { name: 'Choose date' })

    await user.click(calendarButton)
    const headers = getAllByRole(component, 'columnheader')

    expect(headers[0]).toHaveAccessibleName('Sunday')
  })
})
