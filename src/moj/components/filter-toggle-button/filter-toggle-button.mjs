export class FilterToggleButton {
  constructor(options) {
    this.options = options
    this.container = this.options.toggleButton.container
    this.filterContainer = this.options.filter.container

    this.createToggleButton()
    this.setupResponsiveChecks()
    this.filterContainer.setAttribute('tabindex', '-1')
    if (this.options.startHidden) {
      this.hideMenu()
    }
  }

  setupResponsiveChecks() {
    this.mq = window.matchMedia(this.options.bigModeMediaQuery)
    this.mq.addListener(this.checkMode.bind(this))
    this.checkMode(this.mq)
  }

  createToggleButton() {
    this.menuButton = document.createElement('button')
    this.menuButton.setAttribute('type', 'button')
    this.menuButton.setAttribute('aria-haspopup', 'true')
    this.menuButton.setAttribute('aria-expanded', 'false')

    this.menuButton.className = `govuk-button ${this.options.toggleButton.classes}`
    this.menuButton.textContent = this.options.toggleButton.showText

    this.menuButton.addEventListener('click', this.onMenuButtonClick.bind(this))
    this.container.append(this.menuButton)
  }

  checkMode(mq) {
    if (mq.matches) {
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
    if (!this.options.closeButton) {
      return
    }

    this.closeButton = document.createElement('button')
    this.closeButton.setAttribute('type', 'button')

    this.closeButton.className = 'moj-filter__close'
    this.closeButton.textContent = this.options.closeButton.text

    this.closeButton.addEventListener('click', this.onCloseClick.bind(this))
    this.options.closeButton.container.append(this.closeButton)
  }

  onCloseClick() {
    this.hideMenu()
    this.menuButton.focus()
  }

  removeCloseButton() {
    if (this.closeButton) {
      this.closeButton.remove()
      this.closeButton = null
    }
  }

  hideMenu() {
    this.menuButton.setAttribute('aria-expanded', 'false')
    this.filterContainer.classList.add('moj-js-hidden')
    this.menuButton.textContent = this.options.toggleButton.showText
  }

  showMenu() {
    this.menuButton.setAttribute('aria-expanded', 'true')
    this.filterContainer.classList.remove('moj-js-hidden')
    this.menuButton.textContent = this.options.toggleButton.hideText
  }

  onMenuButtonClick() {
    this.toggle()
  }

  toggle() {
    if (this.menuButton.getAttribute('aria-expanded') === 'false') {
      this.showMenu()
      this.filterContainer.focus()
    } else {
      this.hideMenu()
    }
  }
}
