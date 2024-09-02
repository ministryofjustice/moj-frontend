/**
 * @jest-environment jsdom
 */
const { getByDisplayValue, getByText } = require("@testing-library/dom");
const { axe, toHaveNoViolations } = require('jest-axe')
expect.extend(toHaveNoViolations)


require('../../../../jest.setup.js')
require("./password-reveal.js");

describe("Password reveal", () => {
  let container;

  beforeEach(() => {
    const input = document.createElement("input");
    input.type = "password";
    input.value = "password";

    new MOJFrontend.PasswordReveal(input);

    container = input.parentNode;
  });

  test("initialises container", () => {
    expect(container).toHaveClass("moj-password-reveal");
    expect(container).toContainElement(getByText(container, "Show"));
  });

  test("toggle reveal", () => {
    const input = getByDisplayValue(container, "password");
    const button = getByText(container, "Show");

    button.click();

    expect(input).toHaveAttribute("type", "text");
    expect(button).toHaveTextContent("Hide");

    button.click();

    expect(input).toHaveAttribute("type", "password");
    expect(button).toHaveTextContent("Show");
  });

  test('accessibility', async () => {
    const button = getByText(container, "Show");

    expect(await axe(document.body)).toHaveNoViolations()
    button.click();
    expect(await axe(document.body)).toHaveNoViolations()
  })
});
