import $ from 'jquery'

export class FilterToggleButton {
  constructor(options) {
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

  setupResponsiveChecks() {
    this.mq = window.matchMedia(this.options.bigModeMediaQuery)
    this.mq.addListener($.proxy(this, 'checkMode'))
    this.checkMode(this.mq)
  }

  createToggleButton() {
    this.menuButton = $(
      `<button class="govuk-button ${this.options.toggleButton.classes}" type="button" aria-haspopup="true" aria-expanded="false">${this.options.toggleButton.showText}</button>`
    )
    this.menuButton.on('click', $.proxy(this, 'onMenuButtonClick'))
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
    if (this.options.closeButton) {
      this.closeButton = $(
        `<button class="moj-filter__close" type="button">${this.options.closeButton.text}</button>`
      )
      this.closeButton.on('click', $.proxy(this, 'onCloseClick'))
      $(this.options.closeButton.container).append(this.closeButton)
    }
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
    this.menuButton.attr('aria-expanded', 'false')
    this.filterContainer.addClass('moj-js-hidden')
    this.menuButton.text(this.options.toggleButton.showText)
  }

  showMenu() {
    this.menuButton.attr('aria-expanded', 'true')
    this.filterContainer.removeClass('moj-js-hidden')
    this.menuButton.text(this.options.toggleButton.hideText)
  }

  onMenuButtonClick() {
    this.toggle()
  }

  toggle() {
    if (this.menuButton.attr('aria-expanded') === 'false') {
      this.showMenu()
      this.filterContainer.get(0).focus()
    } else {
      this.hideMenu()
    }
  }
}
