const {
  queryByRole,
} = require("@testing-library/dom");
const { userEvent } = require("@testing-library/user-event");
const { configureAxe } = require("jest-axe");
const merge = require("lodash.merge");
const { setMedia } = require("mock-match-media");

require("./filter-toggle-button.js");

const user = userEvent.setup();
const axe = configureAxe({
  rules: {
    // disable landmark rules when testing isolated components.
    region: { enabled: false },
  },
});

const createTemplate = () => {
  html = `
      <div class="moj-filter">
        <div class="moj-filter__header">
          <div class="moj-filter__header-title">
            <h2 class="govuk-heading-m">Filter</h2>
          </div>
          <div class="moj-filter__header-action"></div>
        </div>
      </div>
      <div class="moj-action-bar">
        <div class="moj-action-bar__filter"></div>
      </div>`;
  document.body.insertAdjacentHTML("afterbegin", html);

  const buttonContainer = document.querySelector(".moj-action-bar__filter");
  const closeButtonContainer = document.querySelector(
    ".moj-filter__header-action",
  );
  const filterContainer = document.querySelector(".moj-filter");

  return {
    buttonContainer: buttonContainer,
    closeButtonContainer: closeButtonContainer,
    filterContainer: filterContainer,
  };
};

let baseConfig;

beforeEach(() => {
  baseConfig = {
    bigModeMediaQuery: "(min-width: 600px)",
    startHidden: true,
    toggleButton: {
      container: document.querySelector(".moj-action-bar__filter"),
      showText: "Show filter",
      hideText: "Hide filter",
      classes: "govuk-button--secondary",
    },
    closeButton: {
      container: document.querySelector(".moj-filter__header-action"),
      text: "Close",
    },
    filter: {
      container: document.querySelector(".moj-filter"),
    },
  };
});

describe("Filter toggle in big mode", () => {
  let defaultConfig, buttonContainer, closeButtonContainer, filterContainer;

  beforeEach(() => {
    setMedia({
      width: "800px",
    });

    ({ buttonContainer, closeButtonContainer, filterContainer } = createTemplate());

    defaultConfig = merge(baseConfig, {
      toggleButton: {
        container: document.querySelector(".moj-action-bar__filter"),
      },
      closeButton: {
        container: document.querySelector(".moj-filter__header-action"),
      },
      filter: { container: document.querySelector(".moj-filter") },
    });
  });

  afterEach(() => {
    document.body.innerHTML = "";
  });

  test("creates toggle button", () => {
    new MOJFrontend.FilterToggleButton(defaultConfig);
    const toggleButton = queryByRole(buttonContainer, "button");

    expect(toggleButton).not.toBeNull();
    expect(toggleButton.innerHTML).toBe("Show filter");
    expect(toggleButton).toHaveAttribute("aria-expanded", "false");
    expect(toggleButton).toHaveClass("govuk-button--secondary");

    expect(filterContainer).toHaveAttribute("tabindex", "-1");
    expect(filterContainer).toHaveClass("moj-js-hidden");
  });

  test("toggle button reveals filters", async () => {
    new MOJFrontend.FilterToggleButton(defaultConfig);
    const toggleButton = queryByRole(buttonContainer, "button");

    expect(filterContainer).toHaveAttribute("tabindex", "-1");
    expect(filterContainer).toHaveClass("moj-js-hidden");

    await user.click(toggleButton);

    expect(toggleButton).toHaveAttribute("aria-expanded", "true");
    expect(toggleButton.innerHTML).toBe("Hide filter");
    expect(filterContainer).not.toHaveClass("moj-js-hidden");
    expect(filterContainer).toHaveFocus();

    await user.click(toggleButton);

    expect(toggleButton).toHaveAttribute("aria-expanded", "false");
    expect(toggleButton.innerHTML).toBe("Show filter");
    expect(filterContainer).toHaveClass("moj-js-hidden");

    expect(toggleButton).toHaveFocus();
  });

  test("start visible", () => {
    const config = merge(defaultConfig, { startHidden: false });
    new MOJFrontend.FilterToggleButton(config);
    const toggleButton = queryByRole(buttonContainer, "button");

    expect(toggleButton.innerHTML).toBe("Hide filter");
    expect(filterContainer).not.toHaveClass("moj-js-hidden");
  });

  test("custom button text", async () => {
    const config = merge(defaultConfig, {
      toggleButton: { showText: "Custom label", hideText: "Hide me" },
    });
    new MOJFrontend.FilterToggleButton(config);
    const toggleButton = queryByRole(buttonContainer, "button");

    expect(toggleButton.innerHTML).toBe("Custom label");
    await user.click(toggleButton);
    expect(toggleButton.innerHTML).toBe("Hide me");
  });

  test("custom toggle button classes", () => {
    const config = merge(defaultConfig, {
      toggleButton: { classes: "classname-1 classname-2" },
    });
    new MOJFrontend.FilterToggleButton(config);
    const toggleButton = queryByRole(buttonContainer, "button");

    expect(toggleButton).toHaveClass("classname-1 classname-2");
  });

  describe("accessibility", () => {
    test("component has no wcag violations", async () => {
      new MOJFrontend.FilterToggleButton(defaultConfig);
      const toggleButton = queryByRole(buttonContainer, "button");
      expect(await axe(document.body)).toHaveNoViolations();
      await user.click(toggleButton);
      expect(await axe(document.body)).toHaveNoViolations();
    });
  });
});

describe("Filter toggle in small mode", () => {
  let defaultConfig, buttonContainer, closeButtonContainer, filterContainer;

  beforeEach(() => {
    setMedia({
      width: "500px",
    });

    ({ buttonContainer, closeButtonContainer, filterContainer } = createTemplate()),

    defaultConfig = merge(baseConfig, {
      toggleButton: {
        container: document.querySelector(".moj-action-bar__filter"),
      },
      closeButton: {
        container: document.querySelector(".moj-filter__header-action"),
      },
      filter: { container: document.querySelector(".moj-filter") },
    });
  });

  afterEach(() => {
    document.body.innerHTML = "";
  });

  test("creates toggle button", () => {
    new MOJFrontend.FilterToggleButton(defaultConfig);
    const toggleButton = queryByRole(buttonContainer, "button");

    expect(toggleButton).not.toBeNull();
    expect(toggleButton.innerHTML).toBe("Show filter");
    expect(toggleButton).toHaveAttribute("aria-expanded", "false");
    expect(toggleButton).toHaveClass("govuk-button--secondary");

    expect(filterContainer).toHaveAttribute("tabindex", "-1");
    expect(filterContainer).toHaveClass("moj-js-hidden");
  });

  test("toggle button reveals filters", async () => {
    new MOJFrontend.FilterToggleButton(defaultConfig);
    const toggleButton = queryByRole(buttonContainer, "button");

    expect(filterContainer).toHaveAttribute("tabindex", "-1");
    expect(filterContainer).toHaveClass("moj-js-hidden");

    await user.click(toggleButton);

    expect(toggleButton).toHaveAttribute("aria-expanded", "true");
    expect(toggleButton.innerHTML).toBe("Hide filter");
    expect(filterContainer).not.toHaveClass("moj-js-hidden");
    expect(filterContainer).toHaveFocus();

    await user.click(toggleButton);

    expect(toggleButton).toHaveAttribute("aria-expanded", "false");
    expect(toggleButton.innerHTML).toBe("Show filter");
    expect(filterContainer).toHaveClass("moj-js-hidden");

    expect(toggleButton).toHaveFocus();
  });

  test("start visible is ignored", () => {
    const config = merge(defaultConfig, { startHidden: false });
    new MOJFrontend.FilterToggleButton(config);
    const toggleButton = queryByRole(buttonContainer, "button");

    expect(toggleButton.innerHTML).toBe("Show filter");
    expect(filterContainer).toHaveClass("moj-js-hidden");
  });

  test("adds a close button", async () => {
    const config = merge(defaultConfig, { startHidden: false });
    new MOJFrontend.FilterToggleButton(config);
    const toggleButton = queryByRole(buttonContainer, "button");

    await user.click(toggleButton);

    const closeButton = queryByRole(closeButtonContainer, "button");

    expect(closeButton).not.toBeNull();
    expect(closeButton.innerHTML).toBe("Close");
  });

  test("hides on resize from big to small", async () => {
    setMedia({
      width: "800px",
    });

    const config = merge(defaultConfig, { startHidden: false });
    new MOJFrontend.FilterToggleButton(config);
    const toggleButton = queryByRole(buttonContainer, "button");

    expect(toggleButton.innerHTML).toBe("Hide filter");
    expect(filterContainer).not.toHaveClass("moj-js-hidden");

    setMedia({
      width: "500px",
    });

    expect(toggleButton.innerHTML).toBe("Show filter");
    expect(filterContainer).toHaveClass("moj-js-hidden");
  });

  test("shows on resize from small to big", async () => {
    setMedia({
      width: "500px",
    });

    const config = merge(defaultConfig);
    new MOJFrontend.FilterToggleButton(config);
    const toggleButton = queryByRole(buttonContainer, "button");

    expect(toggleButton.innerHTML).toBe("Show filter");
    expect(filterContainer).toHaveClass("moj-js-hidden");

    setMedia({
      width: "800px",
    });

    expect(toggleButton.innerHTML).toBe("Hide filter");
    expect(filterContainer).not.toHaveClass("moj-js-hidden");
  });

  describe("accessibility", () => {
    test("component has no wcag violations", async () => {
      new MOJFrontend.FilterToggleButton(defaultConfig);
      const toggleButton = queryByRole(buttonContainer, "button");
      expect(await axe(document.body)).toHaveNoViolations();
      await user.click(toggleButton);
      expect(await axe(document.body)).toHaveNoViolations();
    });
  });
});
