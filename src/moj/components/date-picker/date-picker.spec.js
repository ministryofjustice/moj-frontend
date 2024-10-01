/*
 * @jest-environment jsdom
 */
const {
  getByText,
  getByRole,
  queryByRole,
  queryByText,
  screen,
} = require("@testing-library/dom");
const { userEvent } = require("@testing-library/user-event");
const { configureAxe, toHaveNoViolations } = require("jest-axe");
expect.extend(toHaveNoViolations);

require("../../../../jest.setup.js");
require("./date-picker.js");

const user = userEvent.setup();
const axe = configureAxe({
  rules: {
    // disable landmark rules when testing isolated components.
    region: { enabled: false },
  },
});

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
    </div>`;
  document.body.insertAdjacentHTML("afterbegin", html);

  component = document.querySelector('[data-module="moj-date-picker"]');
  return component;
};

const randomIntBetween = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const padToTwoDigits = (number) => {
  return number.toString().padStart(2, "0");
};

const getFirstDayOfWeek = (dateObject, firstDayOfWeekIndex) => {
  const dayOfWeek = dateObject.getDay();
  const firstDayOfWeek = new Date(dateObject);
  const diff =
    dayOfWeek >= firstDayOfWeekIndex
      ? dayOfWeek - firstDayOfWeekIndex
      : 6 - dayOfWeek;

  firstDayOfWeek.setDate(dateObject.getDate() - diff);
  firstDayOfWeek.setHours(0, 0, 0, 0);

  return firstDayOfWeek;
};

const getLastDayOfWeek = (dateObject, lastDayOfWeekIndex) => {
  const dayOfWeek = dateObject.getDay();
  const lastDayOfWeek = new Date(dateObject);
  const diff =
    dayOfWeek <= lastDayOfWeekIndex
      ? lastDayOfWeekIndex - dayOfWeek
      : 7 - dayOfWeek;

  lastDayOfWeek.setDate(dateObject.getDate() - diff);
  lastDayOfWeek.setHours(0, 0, 0, 0);

  return lastDayOfWeek;
};

describe("Date picker with defaults", () => {
  let component;
  let calendarButton;
  let dialog;

  beforeEach(() => {
    component = createComponent();
    new MOJFrontend.DatePicker(component, {}).init();

    calendarButton = queryByText(component, "Choose date")?.closest("button");
    dialog = queryByRole(component, "dialog", { hidden: true });
  });

  afterEach(() => {
    document.body.innerHTML = "";
  });

  test("initialises calendar calendarButton and dialog", () => {
    expect(calendarButton).not.toBeNull();
    expect(dialog).not.toBeNull();
    expect(component).toContainElement(calendarButton);
    expect(component).toContainElement(dialog);
    expect(dialog).not.toBeVisible();
  });

  test("calendar button toggles dialog", async () => {
    await user.click(calendarButton);
    expect(dialog).toBeVisible();

    await user.click(calendarButton);
    expect(dialog).not.toBeVisible();
  });

  test("dialog has required buttons", async () => {
    await user.click(calendarButton);
    let selectButton = queryByText(dialog, "Select");
    let closeButton = queryByText(dialog, "Close");
    let prevMonthButton = queryByText(dialog, "Previous month");
    let prevYearButton = queryByText(dialog, "Previous year");
    let nextMonthButton = queryByText(dialog, "Next month");
    let nextYearButton = queryByText(dialog, "Next year");

    expect(selectButton).not.toBeNull();
    expect(closeButton).not.toBeNull();
    expect(prevMonthButton).not.toBeNull();
    expect(prevYearButton).not.toBeNull();
    expect(nextMonthButton).not.toBeNull();
    expect(nextYearButton).not.toBeNull();
  });

  test("calendar opens with current month and year", async () => {
    await user.click(calendarButton);
    const today = new Date();
    const currentMonthName = today.toLocaleString("default", { month: "long" });
    const currentYear = today.getFullYear();
    const dialogTitle = `${currentMonthName} ${currentYear}`;

    expect(dialog).toContainElement(screen.getByText(dialogTitle));
  });

  test("today is selected", async () => {
    await user.click(calendarButton);
    const today = new Date();
    const todayButton = getByRole(dialog, "button", { current: "date" });

    expect(todayButton).toHaveFocus();
    expect(todayButton).toHaveClass(
      "moj-datepicker__button--selected",
      "moj-datepicker__button--current",
      "moj-datepicker__button--today",
    );
    expect(todayButton.textContent).toContain(`${today.getDate()}`);
  });

  test("can navigate back in time", async () => {
    const today = new Date();
    const currentMonthName = today.toLocaleString("default", { month: "long" });
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();
    const previousMonthName = new Date(
      today.setMonth(currentMonth - 1),
    ).toLocaleString("default", { month: "long" });
    const previousYear = currentYear - 1;

    const currentTitle = `${currentMonthName} ${currentYear}`;
    const previousMonthTitle = `${previousMonthName} ${currentYear}`;
    const previousYearTitle = `${previousMonthName} ${previousYear}`;

    await user.click(calendarButton);
    let prevMonthButton = getByText(dialog, "Previous month");
    let prevYearButton = getByText(dialog, "Previous year");

    expect(dialog).toContainElement(screen.getByText(currentTitle));
    await user.click(prevMonthButton);
    expect(dialog).toContainElement(screen.getByText(previousMonthTitle));
    await user.click(prevYearButton);
    expect(dialog).toContainElement(screen.getByText(previousYearTitle));
  });

  test("can navigate forward in time", async () => {
    const today = new Date();
    const currentMonthName = today.toLocaleString("default", { month: "long" });
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();
    const nextMonthName = new Date(
      today.setMonth(currentMonth + 1),
    ).toLocaleString("default", { month: "long" });
    const nextYear = currentYear + 1;

    const currentTitle = `${currentMonthName} ${currentYear}`;
    const nextMonthTitle = `${nextMonthName} ${currentYear}`;
    const nextYearTitle = `${nextMonthName} ${nextYear}`;

    await user.click(calendarButton);
    let nextMonthButton = getByText(dialog, "Next month");
    let nextYearButton = getByText(dialog, "Next year");

    expect(dialog).toContainElement(screen.getByText(currentTitle));
    await user.click(nextMonthButton);
    expect(dialog).toContainElement(screen.getByText(nextMonthTitle));
    await user.click(nextYearButton);
    expect(dialog).toContainElement(screen.getByText(nextYearTitle));
  });

  test("close button closes the calendar popup", async () => {
    await user.click(calendarButton);
    let closeButton = queryByText(dialog, "Close");

    expect(dialog).toBeVisible();
    await user.click(closeButton);
    expect(dialog).not.toBeVisible();
    expect(calendarButton).toHaveFocus();
  });

  test("clicking outside closes the calendar popup", async () => {
    let hint = screen.getByText("For example, 17/5/2024.");

    await user.click(calendarButton);
    expect(dialog).toBeVisible();
    await user.click(hint);
    expect(dialog).not.toBeVisible();
  });

  describe("date picker with initial value", () => {
    let inputString;
    let dateString;
    let input;
    let selectedDate;
    let newDate;

    beforeEach(async () => {
      inputString = "19/05/2024";
      dateString = "2024-05-19";
      input = screen.getByLabelText("Date");
      selectedDate = new Date(dateString);

      while (newDate != selectedDate.getDate()) {
        newDate = randomIntBetween(7, 21); //outside this we could have duplicate hidden buttons from prev/next month
      }

      await user.type(input, inputString);
      await user.click(calendarButton);
    });

    test("opens to date in input field", async () => {
      const selectedDateButton = getByRole(dialog, "button", {
        current: "date",
      });

      expect(selectedDateButton).toHaveFocus();
      expect(selectedDateButton).toHaveClass(
        "moj-datepicker__button--selected",
        "moj-datepicker__button--current",
      );
      expect(selectedDateButton).not.toHaveClass(
        "moj-datepicker__button--today",
      );
      expect(selectedDateButton.textContent).toContain(
        `${selectedDate.getDate()}`,
      );
    });

    test("clicking a date selects it, closes dialog, and populates input", async () => {
      const newDateButton = queryByText(dialog, newDate)?.closest("button");

      await user.click(newDateButton);

      expect(dialog).not.toBeVisible();
      expect(input).toHaveValue(`${newDate}/5/2024`);
      expect(calendarButton).toHaveFocus();
    });

    test("clicking select, closes dialog and populates input", async () => {
      const selectButton = getByText(dialog, "Select");

      await user.keyboard("ArrowRight");
      await user.click(selectButton);

      expect(dialog).not.toBeVisible();
      expect(input).toHaveValue(`${newDate}/5/2024`);
      expect(calendarButton).toHaveFocus();
    });
  });

  describe("keyboard interaction", () => {
    let inputString;
    let dateString;
    let input;
    let initialDate;

    beforeEach(async () => {
      inputString = "19/5/2024";
      dateString = "2024-05-19";
      input = screen.getByLabelText("Date");
      initialDate = new Date(dateString);

      await user.type(input, inputString);
    });

    test("esc closes calendar dialog", async () => {
      await user.tab();
      expect(calendarButton).toHaveFocus();
      await user.keyboard("{enter}");
      expect(dialog).toBeVisible();
      await user.keyboard("{escape}");
      expect(dialog).not.toBeVisible();
      expect(calendarButton).toHaveFocus();
    });

    test("calendar dialog is a focus trap", async () => {
      await user.click(calendarButton);
      const selectedDateButton = getByRole(dialog, "button", {
        current: "date",
      });
      const selectButton = queryByText(dialog, "Select");
      const closeButton = queryByText(dialog, "Close");
      const prevMonthButton = getByRole(dialog, "button", {
        name: "Previous month",
      });
      const prevYearButton = getByRole(dialog, "button", {
        name: "Previous year",
      });
      const nextMonthButton = getByRole(dialog, "button", {
        name: "Next month",
      });
      const nextYearButton = getByRole(dialog, "button", { name: "Next year" });

      expect(selectedDateButton).toHaveFocus();
      await user.tab();
      expect(selectButton).toHaveFocus();
      await user.tab();
      expect(closeButton).toHaveFocus();
      await user.tab();
      expect(prevYearButton).toHaveFocus();
      await user.tab();
      expect(prevMonthButton).toHaveFocus();
      await user.tab();
      expect(nextMonthButton).toHaveFocus();
      await user.tab();
      expect(nextYearButton).toHaveFocus();
      await user.tab();
      expect(selectedDateButton).toHaveFocus();
    });

    test("rigth arrow navigates to next day", async () => {
      await user.click(calendarButton);
      const initialDateButton = getByRole(dialog, "button", {
        current: "date",
      });
      let selectedDateButton;
      let labelRegex;

      expect(initialDateButton).toHaveFocus();

      await user.keyboard("[ArrowRight]");
      labelRegex = new RegExp(` ${initialDate.getDate() + 1} `);
      selectedDateButton = getByRole(dialog, "button", { name: labelRegex });
      expect(selectedDateButton).toHaveClass(
        "moj-datepicker__button--selected",
      );
      expect(selectedDateButton).toHaveFocus();
    });

    test("left arrow navigates to next day", async () => {
      await user.click(calendarButton);
      const initialDateButton = getByRole(dialog, "button", {
        current: "date",
      });
      let selectedDateButton;
      let labelRegex;

      expect(initialDateButton).toHaveFocus();

      await user.keyboard("[ArrowLeft]");
      labelRegex = new RegExp(` ${initialDate.getDate() - 1} `);
      selectedDateButton = getByRole(dialog, "button", { name: labelRegex });
      expect(selectedDateButton).toHaveClass(
        "moj-datepicker__button--selected",
      );
      expect(selectedDateButton).toHaveFocus();
    });

    test("up arrow navigates to next day", async () => {
      await user.click(calendarButton);
      const initialDateButton = getByRole(dialog, "button", {
        current: "date",
      });
      let selectedDateButton;
      let labelRegex;

      expect(initialDateButton).toHaveFocus();

      await user.keyboard("[ArrowUp]");
      labelRegex = new RegExp(` ${initialDate.getDate() - 7} `);
      selectedDateButton = getByRole(dialog, "button", { name: labelRegex });
      expect(selectedDateButton).toHaveClass(
        "moj-datepicker__button--selected",
      );
      expect(selectedDateButton).toHaveFocus();
    });

    test("down arrow navigates to next day", async () => {
      await user.click(calendarButton);
      const initialDateButton = getByRole(dialog, "button", {
        current: "date",
      });
      let selectedDateButton;
      let labelRegex;

      expect(initialDateButton).toHaveFocus();

      await user.keyboard("[ArrowDown]");
      labelRegex = new RegExp(` ${initialDate.getDate() + 7} `);
      selectedDateButton = getByRole(dialog, "button", { name: labelRegex });
      expect(selectedDateButton).toHaveClass(
        "moj-datepicker__button--selected",
      );
      expect(selectedDateButton).toHaveFocus();
    });

    test("home key focuses first day of the week", async () => {
      await user.click(calendarButton);
      const initialDateButton = getByRole(dialog, "button", {
        current: "date",
      });
      const firstDayOfWeek = getFirstDayOfWeek(initialDate, 1);
      const labelRegex = new RegExp(` ${firstDayOfWeek.getDate()} `);
      const selectedDateButton = getByRole(dialog, "button", {
        name: labelRegex,
      });

      expect(initialDateButton).toHaveFocus();
      await user.keyboard("[Home]");
      expect(selectedDateButton).toHaveClass(
        "moj-datepicker__button--selected",
      );
      expect(selectedDateButton).toHaveFocus();
    });

    test("end key focuses last day of the week", async () => {
      await user.click(calendarButton);
      const initialDateButton = getByRole(dialog, "button", {
        current: "date",
      });
      const lastDayOfWeek = getLastDayOfWeek(initialDate, 0);
      const labelRegex = new RegExp(` ${lastDayOfWeek.getDate()} `);
      const selectedDateButton = getByRole(dialog, "button", {
        name: labelRegex,
      });

      expect(initialDateButton).toHaveFocus();
      await user.keyboard("[End]");
      expect(selectedDateButton).toHaveClass(
        "moj-datepicker__button--selected",
      );
      expect(selectedDateButton).toHaveFocus();
    });

    test("pageup focuses previous month and year", async () => {
      await user.click(calendarButton);
      const currentMonthName = initialDate.toLocaleString("default", {
        month: "long",
      });
      const currentYear = initialDate.getFullYear();
      const previousMonthName = new Date(
        new Date(initialDate).setMonth(initialDate.getMonth() - 1, 1),
      ).toLocaleString("default", { month: "long" });
      const previousYear = new Date(
        new Date(initialDate).setFullYear(initialDate.getFullYear() - 1),
      ).getFullYear();
      const currentTitle = `${currentMonthName} ${currentYear}`;
      const previousMonthTitle = `${previousMonthName} ${currentYear}`;
      const previousYearTitle = `${previousMonthName} ${previousYear}`;
      const dialogTitle = getByRole(dialog, "heading", { level: 2 });

      expect(dialogTitle.textContent).toEqual(currentTitle);

      await user.keyboard("{PageUp}");
      expect(dialogTitle.textContent).toEqual(previousMonthTitle);

      await user.keyboard("{Shift>}{PageUp}");
      expect(dialogTitle.textContent).toEqual(previousYearTitle);
    });

    test("pagedown focuses next month and year", async () => {
      await user.click(calendarButton);
      const currentMonthName = initialDate.toLocaleString("default", {
        month: "long",
      });
      const currentYear = initialDate.getFullYear();
      const nextMonthName = new Date(
        new Date(initialDate).setMonth(initialDate.getMonth() + 1, 1),
      ).toLocaleString("default", { month: "long" });
      const nextYear = new Date(
        new Date(initialDate).setFullYear(initialDate.getFullYear() + 1),
      ).getFullYear();
      const currentTitle = `${currentMonthName} ${currentYear}`;
      const nextMonthTitle = `${nextMonthName} ${currentYear}`;
      const nextYearTitle = `${nextMonthName} ${nextYear}`;
      const dialogTitle = getByRole(dialog, "heading", { level: 2 });

      expect(dialogTitle.textContent).toEqual(currentTitle);

      await user.keyboard("{PageDown}");
      expect(dialogTitle.textContent).toEqual(nextMonthTitle);

      await user.keyboard("{Shift>}{PageDown}");
      expect(dialogTitle.textContent).toEqual(nextYearTitle);
    });

    test("enter selects date and closes dialog", async () => {
      await user.click(calendarButton);
      await user.keyboard("[ArrowRight]");
      await user.keyboard("[Enter]");

      expect(dialog).not.toBeVisible();
      expect(input).toHaveValue(`20/5/2024`);
      expect(calendarButton).toHaveFocus();
    });

    test("space selects date and closes dialog", async () => {
      await user.click(calendarButton);
      await user.keyboard("[ArrowRight]");
      await user.keyboard("[Space]");

      expect(dialog).not.toBeVisible();
      expect(input).toHaveValue(`20/5/2024`);
      expect(calendarButton).toHaveFocus();
    });

    test("select button selects date and closes dialog", async () => {
      await user.click(calendarButton);
      await user.keyboard("[ArrowRight]");
      await user.tab();
      await user.keyboard("[Enter]");

      expect(dialog).not.toBeVisible();
      expect(input).toHaveValue(`20/5/2024`);
      expect(calendarButton).toHaveFocus();
    });

    test("close button, closes dialog", async () => {
      await user.click(calendarButton);
      await user.keyboard("[ArrowRight]");
      await user.tab();
      await user.tab();
      await user.keyboard("[Enter]");

      expect(dialog).not.toBeVisible();
      expect(input).toHaveValue(`19/5/2024`);
      expect(calendarButton).toHaveFocus();
    });
  });

  describe("accessibility", () => {
    test("component has no wcag violations", async () => {
      expect(await axe(document.body)).toHaveNoViolations();
      await user.click(calendarButton);
      expect(await axe(document.body)).toHaveNoViolations();
    });
  });

  //test component API - JS and data-attribute
  //open with date in input
  //min date
  //max date
  //excluded dates
  //excluded days
  //leadingZeros - test home and end keys
  //weekStartDay
});
