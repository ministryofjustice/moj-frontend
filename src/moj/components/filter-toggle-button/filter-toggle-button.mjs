import $ from 'jquery'

export function FilterToggleButton(options) {
  this.options = options
  this.container = $(this.options.toggleButton.container)
  this.filterContainer = $(this.options.filter.container)

  this.createToggleButton()
  this.setupResponsiveChecks()
  this.filterContainer.attr('tabindex', '-1')
  if (this.options.startHidden) {
    this.hideMenu()
  }
}

FilterToggleButton.prototype.setupResponsiveChecks = function () {
  this.mq = window.matchMedia(this.options.bigModeMediaQuery)
  this.mq.addListener($.proxy(this, 'checkMode'))
  this.checkMode(this.mq)
}

FilterToggleButton.prototype.createToggleButton = function () {
  this.menuButton = $(
    `<button class="govuk-button ${this.options.toggleButton.classes}" type="button" aria-haspopup="true" aria-expanded="false">${this.options.toggleButton.showText}</button>`
  )
  this.menuButton.on('click', $.proxy(this, 'onMenuButtonClick'))
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
  if (this.options.closeButton) {
    this.closeButton = $(
      `<button class="moj-filter__close" type="button">${this.options.closeButton.text}</button>`
    )
    this.closeButton.on('click', $.proxy(this, 'onCloseClick'))
    $(this.options.closeButton.container).append(this.closeButton)
  }
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
  this.menuButton.attr('aria-expanded', 'false')
  this.filterContainer.addClass('moj-js-hidden')
  this.menuButton.text(this.options.toggleButton.showText)
}

FilterToggleButton.prototype.showMenu = function () {
  this.menuButton.attr('aria-expanded', 'true')
  this.filterContainer.removeClass('moj-js-hidden')
  this.menuButton.text(this.options.toggleButton.hideText)
}

FilterToggleButton.prototype.onMenuButtonClick = function () {
  this.toggle()
}

FilterToggleButton.prototype.toggle = function () {
  if (this.menuButton.attr('aria-expanded') === 'false') {
    this.showMenu()
    this.filterContainer.get(0).focus()
  } else {
    this.hideMenu()
  }
}
