class Cookies {
  /**
   * @param {Element | null} $module - HTML element to use for cookies
   */
  constructor($module) {
    this.$module = $module
  }

  init() {
    const $module = this.$module
    if (!$module || !($module instanceof HTMLElement)) {
      return this
    }

    const $accept = this.$module.querySelector('[name="accept"]')
    $accept.addEventListener('click', this.accept.bind(this))

    const $reject = this.$module.querySelector('[name="reject"]')
    $reject.addEventListener('click', this.reject.bind(this))

    const configEncoded = window.localStorage.getItem('mojpl-cookies')
    if (configEncoded) {
      const config = JSON.parse(configEncoded)
      this.load(config)
    } else {
      // If there is no config, show the cookie banner
      this.$module.hidden = false
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
    if (!this.$module.hasAttribute('data-persistent')) {
      this.$module.hidden = true
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
}

function gtag() {
  window.dataLayer.push(arguments)
}

export default Cookies
