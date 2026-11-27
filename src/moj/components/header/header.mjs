import { Component } from 'govuk-frontend'

export class MOJHeader extends Component {
  /**
   * @param {Element | null} $root - HTML element to use for the header
   */
  constructor($root) {
    super($root)

    const $wrapReference = this.$root.querySelector(
      '.js-moj-header__wrap-reference'
    )
    const $wrapItems = this.$root.querySelectorAll('.js-moj-header__wrap-item')

    if (!$wrapReference || !$wrapItems.length) return

    const updateWrappedState = () => {
      const referenceBottom = $wrapReference.getBoundingClientRect().bottom
      const isWrapped = Array.from($wrapItems).some(
        ($item) => $item.getBoundingClientRect().top >= referenceBottom
      )

      this.$root.classList.toggle('js-stacked', isWrapped)
      this.$root.classList.toggle('js-inline', !isWrapped)
    }

    const resizeObserver = new ResizeObserver(updateWrappedState)
    resizeObserver.observe(this.$root)
    resizeObserver.observe($wrapReference)
    $wrapItems.forEach(($item) => resizeObserver.observe($item))
    updateWrappedState()
  }

  /**
   * Name for the component used when initialising using data-module attributes.
   */
  static moduleName = 'moj-header'
}
