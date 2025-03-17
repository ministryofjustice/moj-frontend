export function PasswordReveal(element) {
  this.el = element
  this.container = element.parentElement

  if (this.container.hasAttribute('data-moj-password-reveal-init')) {
    return
  }

  this.container.setAttribute('data-moj-password-reveal-init', '')

  this.el.setAttribute('spellcheck', 'false')
  this.createButton()
}

PasswordReveal.prototype.createButton = function () {
  this.group = document.createElement('div')
  this.button = document.createElement('button')

  this.button.setAttribute('type', 'button')

  this.group.className = 'moj-password-reveal'

  this.button.className =
    'govuk-button govuk-button--secondary moj-password-reveal__button'

  this.button.innerHTML =
    'Show <span class="govuk-visually-hidden">password</span>'

  this.button.addEventListener('click', this.onButtonClick.bind(this))

  this.group.append(this.el, this.button)
  this.container.append(this.group)
}

PasswordReveal.prototype.onButtonClick = function () {
  if (this.el.type === 'password') {
    this.el.type = 'text'
    this.button.innerHTML =
      'Hide <span class="govuk-visually-hidden">password</span>'
  } else {
    this.el.type = 'password'
    this.button.innerHTML =
      'Show <span class="govuk-visually-hidden">password</span>'
  }
}
