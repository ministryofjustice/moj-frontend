import { Component } from 'govuk-frontend'

export class Cookies extends Component {
  /**
   * @param {Element | null} $root - HTML element to use for cookies
   */
  constructor($root) {
    super($root)

    const $accept = this.$root.querySelector('[name="accept"]')
    $accept.addEventListener('click', this.accept.bind(this))

    const $reject = this.$root.querySelector('[name="reject"]')
    $reject.addEventListener('click', this.reject.bind(this))

    const configEncoded = window.localStorage.getItem('mojpl-cookies')
    if (configEncoded) {
      const config = JSON.parse(configEncoded)
      this.load(config)
    } else {
      // If there is no config, show the cookie banner
      this.$root.hidden = false
    }
  }

  load(config) {
    if (config.analytics) {
      window.dataLayer = window.dataLayer || []
      gtag('js', new Date())
      gtag('config', 'G-VTGX4YLSVL')
    } else {
      window['ga-disable-G-VTGX4YLSVL'] = true
    }

    this.hideMessage()
  }

  hideMessage() {
    if (!this.$root.hasAttribute('data-persistent')) {
      this.$root.hidden = true
    }
  }

  accept() {
    const config = { analytics: true }
    window.localStorage.setItem('mojpl-cookies', JSON.stringify(config))

    this.load(config)
  }

  reject() {
    const config = { analytics: false }
    window.localStorage.setItem('mojpl-cookies', JSON.stringify(config))

    window.location.reload()
  }

  /**
   * Name for the component used when initialising using data-module attributes.
   */
  static moduleName = 'app-cookies'
}

function gtag() {
  window.dataLayer.push(arguments)
}
