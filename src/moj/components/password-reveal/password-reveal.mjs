export class PasswordReveal {
  /**
   * @param {Element | null} $input - HTML element to use for password reveal
   */
  constructor($input) {
    if (!$input || !($input instanceof HTMLInputElement)) {
      return this
    }

    this.$input = $input
    this.$root = $input.parentElement

    if (this.$root.hasAttribute('data-moj-password-reveal-init')) {
      return this
    }

    this.$root.setAttribute('data-moj-password-reveal-init', '')

    this.$input.setAttribute('spellcheck', 'false')
    this.createButton()
  }

  createButton() {
    this.$group = document.createElement('div')
    this.$button = document.createElement('button')

    this.$button.setAttribute('type', 'button')

    this.$group.classList.add('moj-password-reveal')
    this.$button.classList.add(
      'govuk-button',
      'govuk-button--secondary',
      'moj-password-reveal__button'
    )

    this.$button.innerHTML =
      'Show <span class="govuk-visually-hidden">password</span>'

    this.$button.addEventListener('click', this.onButtonClick.bind(this))

    this.$group.append(this.$input, this.$button)
    this.$root.append(this.$group)
  }

  onButtonClick() {
    if (this.$input.type === 'password') {
      this.$input.type = 'text'
      this.$button.innerHTML =
        'Hide <span class="govuk-visually-hidden">password</span>'
    } else {
      this.$input.type = 'password'
      this.$button.innerHTML =
        'Show <span class="govuk-visually-hidden">password</span>'
    }
  }
}
