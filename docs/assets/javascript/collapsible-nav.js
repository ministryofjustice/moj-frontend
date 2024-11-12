export default class CollapsibleNav extends HTMLElement {
  constructor() {
    super()

    this.collapsibleItems = this.querySelectorAll('li:has(ul)')

    this.collapsibleItems.forEach( (item, index) => {
      const $link = item.querySelector('a')
      const $list = item.querySelector('ul')
      const $button = document.createElement('button')
      const open = item.classList.contains(this.openClass)

      if(!$list.id) {
        $list.id = `moj-collapsible-nav-${index}`
      }

      $button.setAttribute('aria-controls', $list.id)
      $button.setAttribute('aria-expanded', true)
      $button.classList.add('app-vertical-nav__toggle')

      $button.insertAdjacentHTML('afterbegin', $link.innerHTML)
      item.replaceChild($button, $link)
      if(!open) {
        $list.hidden = true
        $button.setAttribute('aria-expanded', false)
      }
    })

    this.addEventListener('click', this)
  }

  handleEvent(event) {
    this[`on${event.type}`](event)
  }

  onclick(event) {
    const $button = event.target.closest('button')
    if(!$button) return
    const $list = $button.parentNode.querySelector('ul')
    if(!$list) return

    if($list.hidden) {
      this.closeAll();
      $list.hidden = false;
      $button.setAttribute('aria-expanded', true)
    } else {
      $list.hidden = true
      $button.setAttribute('aria-expanded', false)
    }
  }

  closeAll() {
    this.openItems.forEach((item) => {
      item.hidden = true
    })
  }

  get openClass() {
    return this.getAttribute('open-class') || 'is-open'
  }

  get openItems() {
    return this.querySelectorAll('li ul:not([hidden])')
  }

}
