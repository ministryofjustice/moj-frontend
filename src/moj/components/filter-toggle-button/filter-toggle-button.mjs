export function FilterToggleButton(options) {
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

FilterToggleButton.prototype.setupResponsiveChecks = function () {
  this.mq = window.matchMedia(this.options.bigModeMediaQuery)
  this.mq.addListener(this.checkMode.bind(this))
  this.checkMode(this.mq)
}

FilterToggleButton.prototype.createToggleButton = function () {
  this.menuButton = document.createElement('button')
  this.menuButton.setAttribute('type', 'button')
  this.menuButton.setAttribute('aria-haspopup', 'true')
  this.menuButton.setAttribute('aria-expanded', 'false')

  this.menuButton.className = `govuk-button ${this.options.toggleButton.classes}`
  this.menuButton.textContent = this.options.toggleButton.showText

  this.menuButton.addEventListener('click', this.onMenuButtonClick.bind(this))
  this.container.append(this.menuButton)
}

FilterToggleButton.prototype.checkMode = function (mq) {
  if (mq.matches) {
    this.enableBigMode()
  } else {
    this.enableSmallMode()
  }
}

FilterToggleButton.prototype.enableBigMode = function () {
  this.showMenu()
  this.removeCloseButton()
}

FilterToggleButton.prototype.enableSmallMode = function () {
  this.hideMenu()
  this.addCloseButton()
}

FilterToggleButton.prototype.addCloseButton = function () {
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

FilterToggleButton.prototype.onCloseClick = function () {
  this.hideMenu()
  this.menuButton.focus()
}

FilterToggleButton.prototype.removeCloseButton = function () {
  if (this.closeButton) {
    this.closeButton.remove()
    this.closeButton = null
  }
}

FilterToggleButton.prototype.hideMenu = function () {
  this.menuButton.setAttribute('aria-expanded', 'false')
  this.filterContainer.classList.add('moj-js-hidden')
  this.menuButton.textContent = this.options.toggleButton.showText
}

FilterToggleButton.prototype.showMenu = function () {
  this.menuButton.setAttribute('aria-expanded', 'true')
  this.filterContainer.classList.remove('moj-js-hidden')
  this.menuButton.textContent = this.options.toggleButton.hideText
}

FilterToggleButton.prototype.onMenuButtonClick = function () {
  this.toggle()
}

FilterToggleButton.prototype.toggle = function () {
  if (this.menuButton.getAttribute('aria-expanded') === 'false') {
    this.showMenu()
    this.filterContainer.focus()
  } else {
    this.hideMenu()
  }
}
