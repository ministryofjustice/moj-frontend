import ClipboardJS from 'clipboard'

class Copy {
  /**
   * @param {Element | null} $module - HTML element to use for cookies
   */
  constructor($module) {
    if (!$module || !($module instanceof HTMLElement)) {
      return this
    }

    this.$module = $module

    const $button = document.createElement('button')
    $button.className = 'app-copy-button js-copy-button'
    $button.setAttribute('aria-live', 'assertive')
    $button.textContent = 'Copy code'

    this.$module.insertBefore($button, this.$module.firstChild)
    this.copyAction()
  }

  copyAction() {
    const $pre = this.$module.querySelector('pre')

    // Copy to clipboard
    try {
      new ClipboardJS('.js-copy-button', {
        target: function () {
          return $pre
        }
      }).on('success', function (event) {
        event.trigger.textContent = 'Code copied'
        event.clearSelection()
        setTimeout(function () {
          event.trigger.textContent = 'Copy code'
        }, 5000)
      })
    } catch (err) {
      if (err) {
        console.log(err.message)
      }
    }
  }
}

export default Copy
