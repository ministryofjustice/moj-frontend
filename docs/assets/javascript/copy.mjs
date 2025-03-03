import ClipboardJS from 'clipboard'

class Copy {
  constructor($module) {
    if (!$module) {
      return
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
    // Copy to clipboard
    try {
      new ClipboardJS('.js-copy-button', {
        target: function (trigger) {
          return trigger.nextElementSibling
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
}

export default Copy
