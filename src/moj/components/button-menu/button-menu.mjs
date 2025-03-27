import { mergeConfigs, normaliseDataset } from '../../common/configuration.mjs'

export class ButtonMenu {
  /**
   * @param {Element | null} $root - HTML element to use for button menu
   * @param {ButtonMenuConfig} [config] - Button menu config
   */
  constructor($root, config = {}) {
    if (!$root || !($root instanceof HTMLElement)) {
      return this
    }

    this.$root = $root

    /**
     * Merge configs
     *
     * @type {ButtonMenuConfig}
     */
    this.config = mergeConfigs(
      ButtonMenu.defaults,
      config,
      normaliseDataset(ButtonMenu, this.$root.dataset)
    )

    // If only one button is provided, don't initiate a menu and toggle button
    // if classes have been provided for the toggleButton, apply them to the single item
    if (this.$root.children.length === 1) {
      const $button = this.$root.children[0]

      $button.classList.forEach((className) => {
        if (className.startsWith('govuk-button-')) {
          $button.classList.remove(className)
        }

        $button.classList.remove('moj-button-menu__item')
        $button.classList.add('moj-button-menu__single-button')
      })

      if (this.config.buttonClasses) {
        $button.classList.add(...this.config.buttonClasses.split(' '))
      }
    }
    // Otherwise initialise a button menu
    if (this.$root.children.length > 1) {
      this.initMenu()
    }
  }

  initMenu() {
    this.$menu = this.createMenu()
    this.$root.insertAdjacentHTML('afterbegin', this.toggleTemplate())
    this.setupMenuItems()

    this.$menuToggle = this.$root.querySelector(':scope > button')
    this.$items = this.$menu.querySelectorAll('a, button')

    this.$menuToggle.addEventListener('click', (event) => {
      this.toggleMenu(event)
    })

    this.$root.addEventListener('keydown', (event) => {
      this.handleKeyDown(event)
    })

    document.addEventListener('click', (event) => {
      if (event.target instanceof Node && !this.$root.contains(event.target)) {
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
    Array.from(this.$menu.children).forEach(($menuItem) => {
      // wrap item in li tag
      const $listItem = document.createElement('li')
      this.$menu.insertBefore($listItem, $menuItem)
      $listItem.appendChild($menuItem)

      $menuItem.setAttribute('tabindex', '-1')

      if ($menuItem.tagName === 'BUTTON') {
        $menuItem.setAttribute('type', 'button')
      }

      $menuItem.classList.forEach((className) => {
        if (className.startsWith('govuk-button')) {
          $menuItem.classList.remove(className)
        }
      })

      // add a slight delay after click before closing the menu, makes it *feel* better
      $menuItem.addEventListener('click', () => {
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

  /**
   * @param {MouseEvent} event - Click event
   */
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
    if (index >= this.$items.length) index = 0
    if (index < 0) index = this.$items.length - 1

    const $menuItem = this.$items.item(index)
    if ($menuItem) {
      $menuItem.focus()
    }
  }

  currentFocusIndex() {
    const $activeElement = document.activeElement
    const $menuItems = Array.from(this.$items)

    return (
      ($activeElement instanceof HTMLAnchorElement ||
        $activeElement instanceof HTMLButtonElement) &&
      $menuItems.indexOf($activeElement)
    )
  }

  /**
   * @param {KeyboardEvent} event - Keydown event
   */
  handleKeyDown(event) {
    if (event.target === this.$menuToggle) {
      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault()
          this.openMenu()
          break
        case 'ArrowUp':
          event.preventDefault()
          this.openMenu(this.$items.length - 1)
          break
      }
    }

    if (
      event.target instanceof Node &&
      this.$menu.contains(event.target) &&
      this.isOpen()
    ) {
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
          this.focusItem(this.$items.length - 1)
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
   * Button menu config
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
 * @import { Schema } from '../../common/configuration.mjs'
 */
