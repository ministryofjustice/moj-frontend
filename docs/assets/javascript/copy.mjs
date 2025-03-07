import ClipboardJS from 'clipboard'
import { Component } from 'govuk-frontend'

class Copy extends Component {
  constructor($root) {
    super($root)

    const $button = document.createElement('button')
    $button.className = 'app-copy-button js-copy-button'
    $button.setAttribute('aria-live', 'assertive')
    $button.textContent = 'Copy code'

    this.$root.insertBefore($button, this.$root.firstChild)
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
      }).on('success', function (e) {
        e.trigger.textContent = 'Code copied'
        e.clearSelection()
        setTimeout(function () {
          e.trigger.textContent = 'Copy code'
        }, 5000)
      })
    } catch (err) {
      if (err) {
        console.log(err.message)
      }
    }
  }

  /**
   * Name for the component used when initialising using data-module attributes.
   */
  static moduleName = 'app-copy'
}

export default Copy
