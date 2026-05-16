// index.js
import { SupportWidget } from './support-widget.mjs'

customElements.define('app-support-widget', SupportWidget)

---
// SupportWidget.mjs
export class SupportWidget extends HTMLElement {
  constructor() {
    super()

    this.$button = this.querySelector('[data-support-toggle]')
    this.$content = this.querySelector('[data-support-content]')

    if (!this.$button || !this.$content) return

    this.$content.hidden = true
    this.$button.setAttribute('aria-expanded', 'false')
    this.$button.setAttribute('aria-controls', this.$content.id)

    this.$button.addEventListener('click', () => this.toggle())
  }

  toggle() {
    const isExpanded = this.$button.getAttribute('aria-expanded') === 'true'

    this.$button.setAttribute('aria-expanded', !isExpanded)
    this.$content.hidden = isExpanded
  }
}

