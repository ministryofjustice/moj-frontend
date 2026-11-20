import { Component } from 'govuk-frontend'

export class MOJHeader extends Component {
  /**
   * @param {Element | null} $root - HTML element to use for the header
   */
  constructor($root) {
    super($root)

    const $identity = this.$root.querySelector('.moj-header__identity')
    const $content = this.$root.querySelectorAll('.moj-header__content')

    if (!$identity || !$content.length) return

    const updateWrappedState = () => {
      const identityBottom = $identity.getBoundingClientRect().bottom
      const isWrapped = Array.from($content).some(
        ($item) => $item.getBoundingClientRect().top >= identityBottom
      )

      this.$root.toggleAttribute('data-wrapped', isWrapped)
    }

    const resizeObserver = new ResizeObserver(updateWrappedState)
    resizeObserver.observe(this.$root)
    resizeObserver.observe($identity)
    $content.forEach(($item) => resizeObserver.observe($item))
    updateWrappedState()
  }

  /**
   * Name for the component used when initialising using data-module attributes.
   */
  static moduleName = 'moj-header'
}
