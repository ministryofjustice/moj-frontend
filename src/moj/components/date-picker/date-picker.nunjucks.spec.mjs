import { getByLabelText } from '@testing-library/dom'

import { render, getExamples } from '../../lib/components.js'

function renderExample(example) {
  document.body.insertAdjacentHTML('afterbegin', render('date-picker', example))

  return /** @type {HTMLElement} */ (document.querySelector('.moj-datepicker'))
}

describe('date picker macro', () => {
  let examples
  let example = 'default'
  let component

  beforeAll(async () => {
    examples = await getExamples('date-picker')
  })

  beforeEach(() => {
    component = renderExample(examples[example])
  })

  afterEach(() => {
    document.body.innerHTML = ''
  })

  describe('by default', () => {
    test('renders a date picker input', () => {
      const input = getByLabelText(component, 'Appointment date')

      expect(component).toHaveClass('moj-datepicker')
      expect(component).toHaveAttribute('data-module', 'moj-date-picker')
      expect(input).toHaveAttribute('id', 'appointment-date')
      expect(input).toHaveAttribute('name', 'appointment-date')
      expect(input).toHaveClass('moj-js-datepicker-input')
      expect(input).toHaveAttribute('autocomplete', 'off')
    })

    test('renders the hint', () => {
      expect(component.querySelector('.govuk-hint')).toHaveTextContent(
        'For example, 17/5/2024.'
      )
    })
  })

  describe('with value', () => {
    beforeAll(() => {
      example = 'with value'
    })
    afterAll(() => {
      example = 'default'
    })

    test('passes the value to the input', () => {
      expect(getByLabelText(component, 'Appointment date')).toHaveValue(
        '17/5/2024'
      )
    })
  })

  describe('with error', () => {
    beforeAll(() => {
      example = 'with error'
    })
    afterAll(() => {
      example = 'default'
    })

    test('renders the error message and error input class', () => {
      expect(component.querySelector('.govuk-error-message')).toHaveTextContent(
        'Enter an appointment date'
      )
      expect(getByLabelText(component, 'Appointment date')).toHaveClass(
        'govuk-input--error'
      )
    })
  })

  describe('with classes and attributes', () => {
    beforeAll(() => {
      example = 'with classes and attributes'
    })
    afterAll(() => {
      example = 'default'
    })

    test('passes classes and attributes to the input', () => {
      const input = getByLabelText(component, 'Appointment date')

      expect(input).toHaveClass('custom-date-picker-input')
      expect(input).toHaveAttribute('data-custom', 'custom-value')
      expect(input).toHaveAttribute('aria-describedby', 'custom-hint')
    })
  })

  describe('with date options', () => {
    beforeAll(() => {
      example = 'with date constraints'
    })
    afterAll(() => {
      example = 'default'
    })

    test('renders date options as data attributes', () => {
      expect(component).toHaveAttribute('data-min-date', '01/01/2020')
      expect(component).toHaveAttribute('data-max-date', '31/12/2030')
      expect(component).toHaveAttribute(
        'data-excluded-dates',
        '10/06/2026 15/06/2026'
      )
      expect(component).toHaveAttribute('data-excluded-days', 'saturday sunday')
    })
  })

  describe('with leading zeros and Sunday week start', () => {
    beforeAll(() => {
      example = 'with leading zeros and Sunday week start'
    })
    afterAll(() => {
      example = 'default'
    })

    test('renders configuration data attributes', () => {
      expect(component).toHaveAttribute('data-leading-zeros')
      expect(component).toHaveAttribute('data-week-start-day', 'sunday')
    })
  })
})
