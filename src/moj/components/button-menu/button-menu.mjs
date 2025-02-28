import { ConfigurableComponent } from 'govuk-frontend'

export class ButtonMenu extends ConfigurableComponent {
  /**
   * @param {HTMLElement} $root
   * @param {ButtonMenuConfig} [config]
   */
  constructor($root, config = {}) {
    super($root, config)

    // If only one button is provided, don't initiate a menu and toggle button
    // if classes have been provided for the toggleButton, apply them to the single item
    if (this.$root.children.length === 1) {
      const button = this.$root.children[0]
      button.classList.forEach((className) => {
        if (className.startsWith('govuk-button-')) {
          button.classList.remove(className)
        }
        button.classList.remove('moj-button-menu__item')
      })
      if (this.config.buttonClasses) {
        button.classList.add(...this.config.buttonClasses.split(' '))
      }
    }
    // Otherwise intialise a button menu
    if (this.$root.children.length > 1) {
      this.initMenu()
    }
  }

  initMenu() {
    this.$menu = this.createMenu()
    this.$root.insertAdjacentHTML('afterbegin', this.toggleTemplate())
    this.setupMenuItems()

    this.$menuToggle = this.$root.querySelector(':scope > button')
    this.items = this.$menu.querySelectorAll('a, button')

    this.$menuToggle.addEventListener('click', (event) => {
      this.toggleMenu(event)
    })

    this.$root.addEventListener('keydown', (event) => {
      this.handleKeyDown(event)
    })

    document.addEventListener('click', (event) => {
      if (!this.$root.contains(event.target)) {
        this.closeMenu(false)
      }
    })
  }

  createMenu() {
    const $menu = document.createElement('ul')
    $menu.setAttribute('role', 'list')
    $menu.hidden = true
    $menu.classList.add('moj-button-menu__wrapper')
    if (this.config.alignMenu === 'right') {
      $menu.classList.add('moj-button-menu__wrapper--right')
    }

    this.$root.appendChild($menu)
    while (this.$root.firstChild !== $menu) {
      $menu.appendChild(this.$root.firstChild)
    }

    return $menu
  }

  setupMenuItems() {
    Array.from(this.$menu.children).forEach((item) => {
      // wrap item in li tag
      const listItem = document.createElement('li')
      this.$menu.insertBefore(listItem, item)
      listItem.appendChild(item)

      item.setAttribute('tabindex', -1)

      if (item.tagName === 'BUTTON') {
        item.setAttribute('type', 'button')
      }

      item.classList.forEach((className) => {
        if (className.startsWith('govuk-button')) {
          item.classList.remove(className)
        }
      })

      // add a slight delay after click before closing the menu, makes it *feel* better
      item.addEventListener('click', (event) => {
        setTimeout(() => {
          this.closeMenu(false)
        }, 50)
      })
    })
  }

  toggleTemplate() {
    return `
    <button type="button" class="govuk-button moj-button-menu__toggle-button ${this.config.buttonClasses || ''}" aria-haspopup="true" aria-expanded="false">
      <span>
       ${this.config.buttonText}
       <svg width="11" height="5" viewBox="0 0 11 5"  xmlns="http://www.w3.org/2000/svg">
         <path d="M5.5 0L11 5L0 5L5.5 0Z" fill="currentColor"/>
       </svg>
      </span>
    </button>`
  }

  /**
   * @returns {boolean}
   */
  isOpen() {
    return this.$menuToggle.getAttribute('aria-expanded') === 'true'
  }

  toggleMenu(event) {
    event.preventDefault()

    // If menu is triggered with mouse don't move focus to first item
    const keyboardEvent = event.detail === 0
    const focusIndex = keyboardEvent ? 0 : -1

    if (this.isOpen()) {
      this.closeMenu()
    } else {
      this.openMenu(focusIndex)
    }
  }

  /**
   * Opens the menu and optionally sets the focus to the item with given index
   *
   * @param {number} focusIndex - The index of the item to focus
   */
  openMenu(focusIndex = 0) {
    this.$menu.hidden = false
    this.$menuToggle.setAttribute('aria-expanded', 'true')
    if (focusIndex !== -1) {
      this.focusItem(focusIndex)
    }
  }

  /**
   * Closes the menu and optionally returns focus back to menuToggle
   *
   * @param {boolean} moveFocus - whether to return focus to the toggle button
   */
  closeMenu(moveFocus = true) {
    this.$menu.hidden = true
    this.$menuToggle.setAttribute('aria-expanded', 'false')
    if (moveFocus) {
      this.$menuToggle.focus()
    }
  }

  /**
   * Focuses the menu item at the specified index
   *
   * @param {number} index - the index of the item to focus
   */
  focusItem(index) {
    if (index >= this.items.length) index = 0
    if (index < 0) index = this.items.length - 1

    const menuItem = this.items.item(index)
    if (menuItem) {
      menuItem.focus()
    }
  }

  currentFocusIndex() {
    const activeElement = document.activeElement
    const menuItems = Array.from(this.items)

    return menuItems.indexOf(activeElement)
  }

  handleKeyDown(event) {
    if (event.target === this.$menuToggle) {
      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault()
          this.openMenu()
          break
        case 'ArrowUp':
          event.preventDefault()
          this.openMenu(this.items.length - 1)
          break
      }
    }

    if (this.$menu.contains(event.target) && this.isOpen()) {
      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault()
          if (this.currentFocusIndex() !== -1) {
            this.focusItem(this.currentFocusIndex() + 1)
          }
          break
        case 'ArrowUp':
          event.preventDefault()
          if (this.currentFocusIndex() !== -1) {
            this.focusItem(this.currentFocusIndex() - 1)
          }
          break
        case 'Home':
          event.preventDefault()
          this.focusItem(0)
          break
        case 'End':
          event.preventDefault()
          this.focusItem(this.items.length - 1)
          break
      }
    }

    if (event.key === 'Escape' && this.isOpen()) {
      this.closeMenu()
    }
    if (event.key === 'Tab' && this.isOpen()) {
      this.closeMenu(false)
    }
  }

  /**
   * Name for the component used when initialising using data-module attributes.
   */
  static moduleName = 'moj-button-menu'

  /**
   * Button menu default config
   *
   * @type {ButtonMenuConfig}
   */
  static defaults = Object.freeze({
    buttonText: 'Actions',
    alignMenu: 'left',
    buttonClasses: ''
  })

  /**
   * Button menu config schema
   *
   * @satisfies {Schema<ButtonMenuConfig>}
   */
  static schema = Object.freeze({
    properties: {
      buttonText: { type: 'string' },
      buttonClasses: { type: 'string' },
      alignMenu: { type: 'string' }
    }
  })
}

/**
 * @typedef {object} ButtonMenuConfig
 * @property {string} [buttonText='Actions'] - Label for the toggle button
 * @property {"left" | "right"} [alignMenu='left'] - the alignment of the menu
 * @property {string} [buttonClasses='govuk-button--secondary'] - css classes applied to the toggle button
 */

/**
 * @import { Schema } from 'govuk-frontend/dist/govuk/common/configuration.mjs'
 */
