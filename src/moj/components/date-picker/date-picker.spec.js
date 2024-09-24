/*
 * @jest-environment jsdom
 */
const { getByDisplayValue, getByText, getByRole, queryByRole, queryByText } = require("@testing-library/dom");
const { axe, toHaveNoViolations } = require('jest-axe')
expect.extend(toHaveNoViolations)

require('../../../../jest.setup.js')
require("./date-picker.js");

const createComponent = () => {
  const html = `
      <div class="moj-datepicker" data-module="moj-date-picker">
        <div class="govuk-form-group">
          <label class="govuk-label" for="date">
            Date
          </label>
          <div id="date-hint" class="govuk-hint">
            For example, 17/5/2024.
          </div>
          <input class="govuk-input moj-js-datepicker-input " id="date" name="date" type="text" aria-describedby="date-hint" autocomplete="off">
        </div>
    </div>`
  document.body.insertAdjacentHTML('afterbegin', html);

  component = document.querySelector('[data-module="moj-date-picker"]');
  return component
}

describe("Date picker with defaults", () => {
  let component;
  let calendarButton;
  let dialog;

  beforeEach(() => {
    component = createComponent()
    new MOJFrontend.DatePicker(component, {}).init();

    calendarButton = queryByText(component, "Choose date");
    dialog = queryByRole(component, "dialog", { hidden: true })
  });

  test("initialises calendar calendarButton and dialog", () => {
    expect(calendarButton).not.toBeNull()
    expect(dialog).not.toBeNull()
    expect(component).toContainElement(calendarButton);
    expect(component).toContainElement(dialog);
    expect(dialog).not.toBeVisible();
  })

  test("calendar button toggles dialog", () => {
    calendarButton.click()
    expect(dialog).toBeVisible();

    calendarButton.click()
    expect(dialog).not.toBeVisible();
  })

  test("dialog has select and close buttons", () => {
    calendarButton.click()
    let selectButton = queryByText(dialog, "Select")
    let closeButton = queryByText(dialog, "Close")
    let prevMonthButton = queryByText(dialog, "Previous month")
    let prevYearButton = queryByText(dialog, "Previous year")
    let nextMonthButton = queryByText(dialog, "Next month")
    let nextYearButton = queryByText(dialog, "Next year")

    expect(selectButton).not.toBeNull()
    expect(closeButton).not.toBeNull()
    expect(prevMonthButton).not.toBeNull()
    expect(prevYearButton).not.toBeNull()
    expect(nextMonthButton).not.toBeNull()
    expect(nextYearButton).not.toBeNull()
  })

  // expect prev next month calendarButtons
  // expect prev next year calendarButtons
  // expect current month name
  // expect current year name
  // expect today to be selected

  // prev month works
  // prev year works
  // next month works
  // next year works

  //close calendarButton works
  //click off works

  //click select works
  //click date works


  //test component API
  //min date
  //max date
  //excluded dates
  //excluded days
  //leadingZeros
  //weekStartDay


})

