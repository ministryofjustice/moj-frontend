import { mergeConfigs, normaliseDataset } from '../../common/configuration.mjs'

export class FilterToggleButton {
  /**
   * @param {Element | null} $root - HTML element to use for filter toggle button
   * @param {FilterToggleButtonConfig} [config] - Filter toggle button config
   */
  constructor($root, config = {}) {
    if (!$root || !($root instanceof HTMLElement)) {
      return this
    }

    this.$root = $root

    if (this.$root.hasAttribute('data-moj-filter-init')) {
      return this
    }

    this.$root.setAttribute('data-moj-filter-init', '')

    /**
     * Merge configs
     *
     * @type {FilterToggleButtonConfig}
     */
    this.config = mergeConfigs(
      FilterToggleButton.defaults,
      config,
      normaliseDataset(FilterToggleButton, this.$root.dataset)
    )

    const $toggleButtonContainer =
      this.config.toggleButtonContainer.element ??
      this.$root.querySelector(this.config.toggleButtonContainer.selector)

    const $closeButtonContainer =
      this.config.closeButtonContainer.element ??
      this.$root.querySelector(this.config.closeButtonContainer.selector)

    if (
      !(
        $toggleButtonContainer instanceof HTMLElement &&
        $closeButtonContainer instanceof HTMLElement
      )
    ) {
      return this
    }

    this.$toggleButtonContainer = $toggleButtonContainer
    this.$closeButtonContainer = $closeButtonContainer

    this.createToggleButton()
    this.setupResponsiveChecks()

    this.$root.setAttribute('tabindex', '-1')

    if (this.config.startHidden) {
      this.hideMenu()
    }
  }

  setupResponsiveChecks() {
    this.mq = window.matchMedia(this.config.bigModeMediaQuery)
    this.mq.addListener(this.checkMode.bind(this))
    this.checkMode()
  }

  createToggleButton() {
    this.$menuButton = document.createElement('button')
    this.$menuButton.setAttribute('type', 'button')
    this.$menuButton.setAttribute('aria-haspopup', 'true')
    this.$menuButton.setAttribute('aria-expanded', 'false')

    this.$menuButton.className = `govuk-button ${this.config.toggleButton.classes}`
    this.$menuButton.textContent = this.config.toggleButton.showText

    this.$menuButton.addEventListener(
      'click',
      this.onMenuButtonClick.bind(this)
    )

    this.$toggleButtonContainer.append(this.$menuButton)
  }

  checkMode() {
    if (this.mq.matches) {
      this.enableBigMode()
    } else {
      this.enableSmallMode()
    }
  }

  enableBigMode() {
    this.showMenu()
    this.removeCloseButton()
  }

  enableSmallMode() {
    this.hideMenu()
    this.addCloseButton()
  }

  addCloseButton() {
    this.$closeButton = document.createElement('button')
    this.$closeButton.setAttribute('type', 'button')

    this.$closeButton.className = this.config.closeButton.classes
    this.$closeButton.textContent = this.config.closeButton.text

    this.$closeButton.addEventListener('click', this.onCloseClick.bind(this))
    this.$closeButtonContainer.append(this.$closeButton)
  }

  onCloseClick() {
    this.hideMenu()
    this.$menuButton.focus()
  }

  removeCloseButton() {
    if (this.$closeButton) {
      this.$closeButton.remove()
      this.$closeButton = null
    }
  }

  hideMenu() {
    this.$menuButton.setAttribute('aria-expanded', 'false')
    this.$root.classList.add('moj-js-hidden')
    this.$menuButton.textContent = this.config.toggleButton.showText
  }

  showMenu() {
    this.$menuButton.setAttribute('aria-expanded', 'true')
    this.$root.classList.remove('moj-js-hidden')
    this.$menuButton.textContent = this.config.toggleButton.hideText
  }

  onMenuButtonClick() {
    this.toggle()
  }

  toggle() {
    if (this.$menuButton.getAttribute('aria-expanded') === 'false') {
      this.showMenu()
      this.$root.focus()
    } else {
      this.hideMenu()
    }
  }

  /**
   * Filter toggle button config
   *
   * @type {FilterToggleButtonConfig}
   */
  static defaults = Object.freeze({
    bigModeMediaQuery: '(min-width: 48.0625em)',
    startHidden: true,
    toggleButton: {
      showText: 'Show filter',
      hideText: 'Hide filter',
      classes: 'govuk-button--secondary'
    },
    toggleButtonContainer: {
      selector: '.moj-action-bar__filter'
    },
    closeButton: {
      text: 'Close',
      classes: 'moj-filter__close'
    },
    closeButtonContainer: {
      selector: '.moj-filter__header-action'
    }
  })

  /**
   * Filter toggle button config schema
   *
   * @satisfies {Schema<FilterToggleButtonConfig>}
   */
  static schema = Object.freeze({
    properties: {
      bigModeMediaQuery: { type: 'string' },
      startHidden: { type: 'boolean' },
      toggleButton: { type: 'object' },
      toggleButtonContainer: { type: 'object' },
      closeButton: { type: 'object' },
      closeButtonContainer: { type: 'object' }
    }
  })
}

/**
 * @typedef {object} FilterToggleButtonConfig
 * @property {string} [bigModeMediaQuery] - Media query for big mode
 * @property {boolean} [startHidden] - Whether to start hidden
 * @property {object} [toggleButton] - Toggle button config
 * @property {string} [toggleButton.showText] - Text for show button
 * @property {string} [toggleButton.hideText] - Text for hide button
 * @property {string} [toggleButton.classes] - Classes for toggle button
 * @property {object} [toggleButtonContainer] - Toggle button container config
 * @property {string} [toggleButtonContainer.selector] - Selector for toggle button container
 * @property {Element | null} [toggleButtonContainer.element] - HTML element for toggle button container
 * @property {object} [closeButton] - Close button config
 * @property {string} [closeButton.text] - Text for close button
 * @property {string} [closeButton.classes] - Classes for close button
 * @property {object} [closeButtonContainer] - Close button container config
 * @property {string} [closeButtonContainer.selector] - Selector for close button container
 * @property {Element | null} [closeButtonContainer.element] - HTML element for close button container
 */

/**
 * @import { Schema } from '../../common/configuration.mjs'
 */
