const { queryByRole, screen } = require("@testing-library/dom");
const { userEvent } = require("@testing-library/user-event");
const { configureAxe, toHaveNoViolations } = require("jest-axe");
expect.extend(toHaveNoViolations);

require("../../../../jest.setup.js");
require("./button-menu.js");

const user = userEvent.setup();
const axe = configureAxe({
  rules: {
    // disable landmark rules when testing isolated components.
    region: { enabled: false },
  },
});

const createComponent = () => {
  const html = `
      <div class="moj-button-menu" data-module="moj-button-menu">
          <a href="#one">First action</a>
          <a href="#two">Second action</a>
          <a href="#three">Third action</a>
      </div>`;
  document.body.insertAdjacentHTML("afterbegin", html);

  component = document.querySelector('[data-module="moj-button-menu"]');
  return component;
};

describe("Button menu with defaults", () => {
  let component;
  let toggleButton;
  let menu;
  let items;

  beforeEach(() => {
    component = createComponent();
    new MOJFrontend.ButtonMenu(component, {}).init();

    toggleButton = queryByRole(component, "button", { hidden: false });
    menu = screen.queryByRole("list", { hidden: true });
    items = menu?.querySelectorAll("a, button");
  });

  afterEach(() => {
    document.body.innerHTML = "";
  });

  test("initialises component elements", () => {
    expect(toggleButton).not.toBeNull();
    expect(menu).not.toBeNull();
    expect(items).not.toBeNull();
  });

  test("intialises toggle button", () => {
    expect(component).toContainElement(toggleButton);
    expect(toggleButton).toHaveAttribute("aria-expanded", "false");
    expect(toggleButton).toHaveAttribute("aria-haspopup", "true");
  });

  test("intialises menu", () => {
    expect(component).toContainElement(menu);
    expect(menu).not.toBeVisible();
  });

  test("adds menuitem roles", () => {
    expect(items.length).toBe(3);
  });

  test("clicking toggle button shows menu", async () => {
    await user.click(toggleButton);

    expect(menu).toBeVisible();
    expect(toggleButton).toHaveAttribute("aria-expanded", "true");
  });

  test("clicking a link in the menu", async () => {
    await user.click(toggleButton);

    expect(menu).toBeVisible();
    await user.click(items[0]);
    expect(global.window.location.hash).toContain("#one");
    await user.click(items[2]);
    expect(global.window.location.hash).toContain("#three");
  });

  test("clicking outside closes menu", async () => {
    await user.click(toggleButton);
    expect(menu).toBeVisible();

    await user.click(document.body);
    expect(menu).not.toBeVisible();
  });

  describe("keyboard interactions", () => {
    test("enter on toggle button opens menu", async () => {
      toggleButton.focus();
      await user.keyboard("[Enter]");

      expect(menu).toBeVisible();
      expect(toggleButton).toHaveAttribute("aria-expanded", "true");
      expect(items[0]).toHaveFocus();
    });

    test("space on toggle button opens menu", async () => {
      toggleButton.focus();
      await user.keyboard("[Space]");

      expect(menu).toBeVisible();
      expect(toggleButton).toHaveAttribute("aria-expanded", "true");
      expect(items[0]).toHaveFocus();
    });

    test("esc closes menu", async () => {
      toggleButton.focus();
      await user.keyboard("[Space]");
      expect(menu).toBeVisible();
      await user.keyboard("[Escape]");

      expect(menu).not.toBeVisible();
      expect(toggleButton).toHaveFocus();
    });

    test("down arrow on toggle button opens menu with focus on first item", async () => {
      toggleButton.focus();
      await user.keyboard("[ArrowDown]");

      expect(menu).toBeVisible();
      expect(toggleButton).toHaveAttribute("aria-expanded", "true");
      expect(items[0]).toHaveFocus();
    });

    test("up arrow on toggle button opens menu with focus on last item", async () => {
      toggleButton.focus();
      await user.keyboard("[ArrowUp]");

      expect(menu).toBeVisible();
      expect(toggleButton).toHaveAttribute("aria-expanded", "true");
      expect(items[items.length - 1]).toHaveFocus();
    });

    test("down arrow on menu item navigates to next item with looping", async () => {
      toggleButton.focus();
      await user.keyboard("[Enter]");
      expect(items[0]).toHaveFocus();

      await user.keyboard("[ArrowDown]");
      expect(items[1]).toHaveFocus();

      await user.keyboard("[ArrowDown]");
      expect(items[2]).toHaveFocus();

      await user.keyboard("[ArrowDown]");
      expect(items[0]).toHaveFocus();
    });

    test("up arrow on menu item navigates to previous item with looping", async () => {
      toggleButton.focus();
      await user.keyboard("[ArrowUp]");
      expect(items[items.length - 1]).toHaveFocus();

      await user.keyboard("[ArrowUp]");
      expect(items[1]).toHaveFocus();

      await user.keyboard("[ArrowUp]");
      expect(items[0]).toHaveFocus();

      await user.keyboard("[ArrowUp]");
      expect(items[items.length - 1]).toHaveFocus();
    });

    test("home navigates to first item", async () => {
      toggleButton.focus();
      await user.keyboard("[ArrowUp]");
      expect(items[items.length - 1]).toHaveFocus();

      await user.keyboard("[Home]");
      expect(items[0]).toHaveFocus();
    });

    test("end navigates to last item", async () => {
      toggleButton.focus();
      await user.keyboard("[Enter]");
      expect(items[0]).toHaveFocus();

      await user.keyboard("[End]");
      expect(items[items.length - 1]).toHaveFocus();
    });

    test("tab moves focus out of the menu", async () => {
      toggleButton.focus();
      await user.keyboard("[Enter]");
      expect(menu).toBeVisible();
      expect(items[0]).toHaveFocus();
      await user.tab();

      expect(document.body).toHaveFocus();
      expect(menu).not.toBeVisible();
    });
  });
});
