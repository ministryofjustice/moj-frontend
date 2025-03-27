import ClipboardJS from 'clipboard'

export class Copy {
  /**
   * @param {Element | null} $root - HTML element to use for cookies
   */
  constructor($root) {
    if (!$root || !($root instanceof HTMLElement)) {
      return this
    }

    this.$root = $root

    const $button = document.createElement('button')
    $button.className = 'app-copy-button js-copy-button'
    $button.setAttribute('aria-live', 'assertive')
    $button.textContent = 'Copy code'

    this.$root.insertBefore($button, this.$root.firstChild)
    this.copyAction()
  }

  copyAction() {
    const $pre = this.$root.querySelector('pre')

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
