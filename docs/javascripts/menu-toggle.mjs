export class MenuToggle extends HTMLElement {
  constructor() {
    super()

    const menuSelector = this.getAttribute('menu')
    const $menu = document.querySelector(menuSelector)
    const $button = this.querySelector('button')

    if (!$menu || !($menu instanceof HTMLElement)) {
      console.error('Menu element must exist ')
      return this
    }

    if (!$button || !($button instanceof HTMLElement)) {
      console.error('Menu toggle element must contain a button element')
      return this
    }

    if (!$menu.id) {
      console.error('Menu element must have an id attribute')
      return this
    }

    this.$menu = $menu
    this.$button = $button

    this.$button.setAttribute('aria-controls', this.$menu.id)

    this.addEventListener('click', this)

    if (this.breakpoint && Number.isInteger(this.breakpoint)) {
      window.addEventListener('resize', (event) => {
        this.onresize(event)
      })
    }

    this.windowWidth = window.innerWidth

    this.setState()
  }

  handleEvent(event) {
    this[`on${event.type}`](event)
  }

  onclick() {
    this.toggleMenu()
  }

  onresize() {
    // Check if the window width has changed - prevents resize events triggered
    // by scrolling on mobile browsers
    if (window.innerWidth !== this.windowWidth) {
      this.windowWidth = window.innerWidth
      this.setState()
    }
  }

  setState() {
    if (document.documentElement.clientWidth >= this.breakpoint) {
      this.hideToggle()
      this.showMenu()
    } else {
      this.showToggle()
      this.hideMenu()
    }
  }

  toggleMenu() {
    if (this.$menu.hidden) {
      this.showMenu()
    } else {
      this.hideMenu()
    }
  }

  hideToggle() {
    this.hidden = true
  }

  showToggle() {
    this.hidden = false
  }

  hideMenu() {
    this.$menu.hidden = true
    this.$button.setAttribute('aria-expanded', 'false')
  }

  showMenu() {
    this.$menu.hidden = false
    this.$button.setAttribute('aria-expanded', 'true')
  }

  get breakpoint() {
    return Number.parseInt(this.getAttribute('breakpoint'))
  }
}
