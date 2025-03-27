import { mergeConfigs, normaliseDataset } from '../../common/configuration.mjs'

export class SearchToggle {
  /**
   * @param {Element | null} $root - HTML element to use for search toggle
   * @param {SearchToggleConfig} [config] - Search toggle config
   */
  constructor($root, config = {}) {
    if (!$root || !($root instanceof HTMLElement)) {
      return this
    }

    this.$root = $root

    if (this.$root.hasAttribute('data-moj-search-toggle-init')) {
      return this
    }

    this.$root.setAttribute('data-moj-search-toggle-init', '')

    /**
     * Merge configs
     *
     * @type {SearchToggleConfig}
     */
    this.config = mergeConfigs(
      SearchToggle.defaults,
      config,
      normaliseDataset(SearchToggle, this.$root.dataset)
    )

    const $searchContainer =
      this.config.searchContainer.element ??
      this.$root.querySelector(this.config.searchContainer.selector)

    const $toggleButtonContainer =
      this.config.toggleButtonContainer.element ??
      this.$root.querySelector(this.config.toggleButtonContainer.selector)

    if (
      !$searchContainer ||
      !$toggleButtonContainer ||
      !($searchContainer instanceof HTMLElement) ||
      !($toggleButtonContainer instanceof HTMLElement)
    ) {
      return this
    }

    this.$searchContainer = $searchContainer
    this.$toggleButtonContainer = $toggleButtonContainer

    const svg =
      '<svg viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="moj-search-toggle__button__icon"><path d="M7.433,12.5790048 C6.06762625,12.5808611 4.75763941,12.0392925 3.79217348,11.0738265 C2.82670755,10.1083606 2.28513891,8.79837375 2.28699522,7.433 C2.28513891,6.06762625 2.82670755,4.75763941 3.79217348,3.79217348 C4.75763941,2.82670755 6.06762625,2.28513891 7.433,2.28699522 C8.79837375,2.28513891 10.1083606,2.82670755 11.0738265,3.79217348 C12.0392925,4.75763941 12.5808611,6.06762625 12.5790048,7.433 C12.5808611,8.79837375 12.0392925,10.1083606 11.0738265,11.0738265 C10.1083606,12.0392925 8.79837375,12.5808611 7.433,12.5790048 L7.433,12.5790048 Z M14.293,12.579 L13.391,12.579 L13.071,12.269 C14.2300759,10.9245158 14.8671539,9.20813198 14.866,7.433 C14.866,3.32786745 11.5381325,-1.65045755e-15 7.433,-1.65045755e-15 C3.32786745,-1.65045755e-15 -1.65045755e-15,3.32786745 -1.65045755e-15,7.433 C-1.65045755e-15,11.5381325 3.32786745,14.866 7.433,14.866 C9.208604,14.8671159 10.9253982,14.2296624 12.27,13.07 L12.579,13.39 L12.579,14.294 L18.296,20 L20,18.296 L14.294,12.579 L14.293,12.579 Z"></path></svg>'

    this.$toggleButton = document.createElement('button')
    this.$toggleButton.setAttribute('class', 'moj-search-toggle__button')
    this.$toggleButton.setAttribute('type', 'button')
    this.$toggleButton.setAttribute('aria-haspopup', 'true')
    this.$toggleButton.setAttribute('aria-expanded', 'false')
    this.$toggleButton.innerHTML = `${this.config.toggleButton.text} ${svg}`

    this.$toggleButton.addEventListener(
      'click',
      this.onToggleButtonClick.bind(this)
    )

    this.$toggleButtonContainer.append(this.$toggleButton)

    document.addEventListener('click', this.onDocumentClick.bind(this))
    document.addEventListener('focusin', this.onDocumentClick.bind(this))
  }

  showMenu() {
    this.$toggleButton.setAttribute('aria-expanded', 'true')
    this.$searchContainer.classList.remove('moj-js-hidden')
    this.$searchContainer.querySelector('input').focus()
  }

  hideMenu() {
    this.$searchContainer.classList.add('moj-js-hidden')
    this.$toggleButton.setAttribute('aria-expanded', 'false')
  }

  onToggleButtonClick() {
    if (this.$toggleButton.getAttribute('aria-expanded') === 'false') {
      this.showMenu()
    } else {
      this.hideMenu()
    }
  }

  /**
   * @param {MouseEvent | FocusEvent} event
   */
  onDocumentClick(event) {
    if (
      event.target instanceof Node &&
      !this.$toggleButtonContainer.contains(event.target) &&
      !this.$searchContainer.contains(event.target)
    ) {
      this.hideMenu()
    }
  }

  /**
   * Search toggle config
   *
   * @type {SearchToggleConfig}
   */
  static defaults = Object.freeze({
    searchContainer: {
      selector: '.moj-search'
    },
    toggleButton: {
      text: 'Search'
    },
    toggleButtonContainer: {
      selector: '.moj-search-toggle__toggle'
    }
  })

  /**
   * Search toggle config schema
   *
   * @satisfies {Schema<SearchToggleConfig>}
   */
  static schema = Object.freeze({
    properties: {
      searchContainer: { type: 'object' },
      toggleButton: { type: 'object' },
      toggleButtonContainer: { type: 'object' }
    }
  })
}

/**
 * @typedef {object} SearchToggleConfig
 * @property {object} [searchContainer] - Search config
 * @property {string} [searchContainer.selector] - Selector for search container
 * @property {Element | null} [searchContainer.element] - HTML element for search container
 * @property {object} [toggleButton] - Toggle button config
 * @property {string} [toggleButton.text] - Text for toggle button
 * @property {object} [toggleButtonContainer] - Toggle button container config
 * @property {string} [toggleButtonContainer.selector] - Selector for toggle button container
 * @property {Element | null} [toggleButtonContainer.element] - HTML element for toggle button container
 */

/**
 * @import { Schema } from '../../common/configuration.mjs'
 */
