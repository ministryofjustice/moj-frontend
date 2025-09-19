import { Component } from 'govuk-frontend'

export class PdsHeader extends Component {
  /**
   * @param {Element | null} $root - HTML element to use for PDS header
   */
  constructor($root) {
    super($root)
    this.initHeader()
  }

  initHeader() {
    this.$tabOpenClass = 'probation-common-header__toggle-open'
    const $userToggle = this.$root.querySelector(
      '.probation-common-header__user-menu-toggle'
    )
    const $userMenu = this.$root.querySelector(
      '#probation-common-header-user-menu'
    )

    if (
      !$userToggle ||
      !$userMenu ||
      !($userToggle instanceof HTMLElement) ||
      !($userMenu instanceof HTMLElement)
    ) {
      return 0
    }

    this.hideFallbackLinks()
    $userToggle.removeAttribute('hidden')

    this.closeTabs([[$userToggle, $userMenu]])

    $userToggle.addEventListener('click', (_event) => {
      this.toggleMenu($userToggle, $userMenu)
    })
  }

  /**
   * @param {[any, any][]} tabTuples
   */
  closeTabs(tabTuples) {
    tabTuples.forEach(([toggle, menu]) => {
      if (menu && toggle) {
        menu.setAttribute('hidden', 'hidden')
        toggle.classList.remove(this.$tabOpenClass)
        toggle.parentElement.classList.remove('item-open')
        toggle.setAttribute('aria-expanded', 'false')
        if (toggle.dataset.textForShow)
          toggle.setAttribute('aria-label', toggle.dataset.textForShow)
      }
    })
  }

  /**
   * @param {HTMLElement} toggle
   * @param {HTMLElement} menu
   */
  toggleMenu(toggle, menu) {
    const isOpen = !menu.getAttribute('hidden')

    if (isOpen) {
      this.closeTabs([[toggle, menu]])
    } else if (menu && toggle) {
      menu.removeAttribute('hidden')
      toggle.classList.add(this.$tabOpenClass)
      toggle.parentElement.classList.add('item-open')
      toggle.setAttribute('aria-expanded', 'true')
      if (toggle.dataset.textForHide)
        toggle.setAttribute('aria-label', toggle.dataset.textForHide)
    }
  }

  hideFallbackLinks() {
    const $userLink = this.$root.querySelector(
      '.probation-common-header__user-menu-link'
    )
    if ($userLink) $userLink.setAttribute('hidden', 'hidden')
  }

  /**
   * Name for the component used when initialising using data-module attributes.
   */
  static moduleName = 'pds-header'
}
