import $ from 'jquery'

export function PasswordReveal(element) {
  const $el = $(element)

  this.el = element
  this.container = $el.parent()

  if (this.container.get(0).hasAttribute('data-moj-password-reveal-init')) {
    return
  }

  this.container.get(0).setAttribute('data-moj-password-reveal-init', '')

  $el.attr('spellcheck', 'false')
  $el.wrap('<div class="moj-password-reveal"></div>')

  this.createButton()
}

PasswordReveal.prototype.createButton = function () {
  this.button = $(
    '<button type="button" class="govuk-button govuk-button--secondary moj-password-reveal__button">Show <span class="govuk-visually-hidden">password</span></button>'
  )
  this.container.append(this.button)
  this.button.on('click', this.onButtonClick.bind(this))
}

PasswordReveal.prototype.onButtonClick = function () {
  if (this.el.type === 'password') {
    this.el.type = 'text'
    this.button.html('Hide <span class="govuk-visually-hidden">password</span>')
  } else {
    this.el.type = 'password'
    this.button.html('Show <span class="govuk-visually-hidden">password</span>')
  }
}
