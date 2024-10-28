/**
 * @typedef {object} ButtonMenuConfig
 * @property {string} [buttonText=Actions] - Label for the toggle button
 * @property {"left" | "right"} [alignMenu=left] - the alignment of the menu
 * @property {string} [buttonClasses=govuk-button--secondary] - css classes applied to the toggle button
 */

/**
 * @param {HTMLElement} $module
 * @param {ButtonMenuConfig} config
 * @constructor
 */
MOJFrontend.ButtonMenu = function ($module, config = {}) {
  if (!$module) {
    return this;
  }

  const schema = Object.freeze({
    properties: {
      buttonText: { type: "string" },
      buttonClasses: { type: "string" },
      alignMenu: { type: "string" },
    },
  });

  const defaults = {
    buttonText: "Actions",
    alignMenu: "left",
    buttonClasses: "",
  };
  // data attributes override JS config, which overrides defaults
  this.config = this.mergeConfigs(
    defaults,
    config,
    this.parseDataset(schema, $module.dataset),
  );

  this.$module = $module;
};

MOJFrontend.ButtonMenu.prototype.init = function () {
  // If only one button is provided, don't initiate a menu and toggle button
  // if classes have been provided for the toggleButton, apply them to the single item
  if (this.$module.children.length == 1) {
    const button = this.$module.children[0];
    button.classList.forEach((className) => {
      if (className.startsWith("govuk-button-")) {
        button.classList.remove(className);
      }
      button.classList.remove("moj-button-menu__item")
    });
    if (this.config.buttonClasses) {
      button.classList.add(...this.config.buttonClasses.split(" "));
    }
  }
  // Otherwise intialise a button menu
  if (this.$module.children.length > 1) {
    this.initMenu();
  }
};

MOJFrontend.ButtonMenu.prototype.initMenu = function () {
  this.$menu = this.createMenu();
  this.$module.insertAdjacentHTML("afterbegin", this.toggleTemplate());
  this.setupMenuItems();

  this.$menuToggle = this.$module.querySelector(":scope > button");
  this.items = this.$menu.querySelectorAll("a, button");

  this.$menuToggle.addEventListener("click", (event) => {
    this.toggleMenu(event);
  });

  this.$module.addEventListener("keydown", (event) => {
    this.handleKeyDown(event);
  });

  document.addEventListener("click", (event) => {
    if (!this.$module.contains(event.target)) {
      this.closeMenu(false);
    }
  });
};

MOJFrontend.ButtonMenu.prototype.createMenu = function () {
  const $menu = document.createElement("ul");
  $menu.setAttribute("role", "list");
  $menu.hidden = true;
  $menu.classList.add("moj-button-menu__wrapper");
  if (this.config.alignMenu == "right") {
    $menu.classList.add("moj-button-menu__wrapper--right");
  }

  this.$module.appendChild($menu);
  while (this.$module.firstChild !== $menu) {
    $menu.appendChild(this.$module.firstChild);
  }

  return $menu;
};

MOJFrontend.ButtonMenu.prototype.setupMenuItems = function () {
  Array.from(this.$menu.children).forEach((item) => {
    // wrap item in li tag
    const listItem = document.createElement("li");
    this.$menu.insertBefore(listItem, item);
    listItem.appendChild(item);

    item.setAttribute("tabindex", -1);

    if (item.tagName == "BUTTON") {
      item.setAttribute("type", "button");
    }

    item.classList.forEach((className) => {
      if (className.startsWith("govuk-button")) {
        item.classList.remove(className);
      }
    });

    // add a slight delay after click before closing the menu, makes it *feel* better
    item.addEventListener("click", (event) => {
      setTimeout(() => {
        this.closeMenu(false);
      }, 50);
    });
  });
};

MOJFrontend.ButtonMenu.prototype.toggleTemplate = function () {
  return `
    <button type="button" class="govuk-button moj-button-menu__toggle-button ${this.config.buttonClasses || ""}" aria-haspopup="true" aria-expanded="false">
      <span>
       ${this.config.buttonText}
       <svg width="11" height="5" viewBox="0 0 11 5"  xmlns="http://www.w3.org/2000/svg">
         <path d="M5.5 0L11 5L0 5L5.5 0Z" fill="currentColor"/>
       </svg>
      </span>
    </button>`;
};

/**
 * @returns {boolean}
 */
MOJFrontend.ButtonMenu.prototype.isOpen = function () {
  return this.$menuToggle.getAttribute("aria-expanded") === "true";
};

MOJFrontend.ButtonMenu.prototype.toggleMenu = function (event) {
  event.preventDefault();

  // If menu is triggered with mouse don't move focus to first item
  const keyboardEvent = event.detail == 0;
  const focusIndex = keyboardEvent ? 0 : -1;

  if (this.isOpen()) {
    this.closeMenu();
  } else {
    this.openMenu(focusIndex);
  }
};

/**
 * Opens the menu and optionally sets the focus to the item with given index
 *
 * @param {number} focusIndex - The index of the item to focus
 */
MOJFrontend.ButtonMenu.prototype.openMenu = function (focusIndex = 0) {
  this.$menu.hidden = false;
  this.$menuToggle.setAttribute("aria-expanded", "true");
  if (focusIndex !== -1) {
    this.focusItem(focusIndex);
  }
};

/**
 * Closes the menu and optionally returns focus back to menuToggle
 *
 * @param {boolean} moveFocus - whether to return focus to the toggle button
 */
MOJFrontend.ButtonMenu.prototype.closeMenu = function (moveFocus = true) {
  this.$menu.hidden = true;
  this.$menuToggle.setAttribute("aria-expanded", "false");
  if (moveFocus) {
    this.$menuToggle.focus();
  }
};

/**
 * Focuses the menu item at the specified index
 *
 * @param {number} index - the index of the item to focus
 */
MOJFrontend.ButtonMenu.prototype.focusItem = function (index) {
  if (index >= this.items.length) index = 0;
  if (index < 0) index = this.items.length - 1;

  this.items.item(index)?.focus();
};

MOJFrontend.ButtonMenu.prototype.currentFocusIndex = function () {
  const activeElement = document.activeElement;
  const menuItems = Array.from(this.items);

  return menuItems.indexOf(activeElement);
};

MOJFrontend.ButtonMenu.prototype.handleKeyDown = function (event) {
  if (event.target == this.$menuToggle) {
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        this.openMenu();
        break;
      case "ArrowUp":
        event.preventDefault();
        this.openMenu(this.items.length - 1);
        break;
    }
  }

  if (this.$menu.contains(event.target) && this.isOpen()) {
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        if (this.currentFocusIndex() !== -1) {
          this.focusItem(this.currentFocusIndex() + 1);
        }
        break;
      case "ArrowUp":
        event.preventDefault();
        if (this.currentFocusIndex() !== -1) {
          this.focusItem(this.currentFocusIndex() - 1);
        }
        break;
      case "Home":
        event.preventDefault();
        this.focusItem(0);
        break;
      case "End":
        event.preventDefault();
        this.focusItem(this.items.length - 1);
        break;
    }
  }

  if (event.key == "Escape" && this.isOpen()) {
    this.closeMenu();
  }
  if (event.key == "Tab" && this.isOpen()) {
    this.closeMenu(false);
  }
};

/**
 * Parse dataset
 *
 * Loop over an object and normalise each value using {@link normaliseString},
 * optionally expanding nested `i18n.field`
 *
 * @param {{ schema: Schema }} Component - Component class
 * @param {DOMStringMap} dataset - HTML element dataset
 * @returns {Object} Normalised dataset
 */
MOJFrontend.ButtonMenu.prototype.parseDataset = function (schema, dataset) {
  const parsed = {};

  for (const [field, attributes] of Object.entries(schema.properties)) {
    if (field in dataset) {
      if (dataset[field]) {
        parsed[field] = dataset[field];
      }
    }
  }

  return parsed;
};

/**
 * Config merging function
 *
 * Takes any number of objects and combines them together, with
 * greatest priority on the LAST item passed in.
 *
 * @param {...{ [key: string]: unknown }} configObjects - Config objects to merge
 * @returns {{ [key: string]: unknown }} A merged config object
 */
MOJFrontend.ButtonMenu.prototype.mergeConfigs = function (...configObjects) {
  const formattedConfigObject = {};

  // Loop through each of the passed objects
  for (const configObject of configObjects) {
    for (const key of Object.keys(configObject)) {
      const option = formattedConfigObject[key];
      const override = configObject[key];

      // Push their keys one-by-one into formattedConfigObject. Any duplicate
      // keys with object values will be merged, otherwise the new value will
      // override the existing value.
      if (typeof option === "object" && typeof override === "object") {
        // @ts-expect-error Index signature for type 'string' is missing
        formattedConfigObject[key] = this.mergeConfigs(option, override);
      } else {
        formattedConfigObject[key] = override;
      }
    }
  }

  return formattedConfigObject;
};

/**
 * Schema for component config
 *
 * @typedef {object} Schema
 * @property {{ [field: string]: SchemaProperty | undefined }} properties - Schema properties
 */

/**
 * Schema property for component config
 *
 * @typedef {object} SchemaProperty
 * @property {'string' | 'boolean' | 'number' | 'object'} type - Property type
 */
