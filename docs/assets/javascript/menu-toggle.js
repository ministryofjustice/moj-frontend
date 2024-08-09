export default class MenuToggle extends HTMLElement {
  constructor() {
    super();

    this.menuSelector = this.getAttribute('menu')
    this.$menu = document.querySelector(this.menuSelector)
    this.$button = this.querySelector('button')

    if(!this.$menu) {
      console.error('Menu element must exist ')
      return
    }
    if(!this.$button) {
      console.error('Menu toggle element must contain a button element')
      return
    }
    if(!this.$menu.id) {
      console.error('Menu element must have an id attribute')
      return
    }

    this.$button.setAttribute('aria-controls', this.$menu.id)

    this.addEventListener('click', this)

    if( this.breakpoint && Number.isInteger(this.breakpoint)) {
      window.addEventListener('resize', (event) => { this.onresize(event) })
    }

    /* ↓ Set initial state */
    this.onresize();
  }

  handleEvent(event) {
    	this[`on${event.type}`](event);
  }

  onclick(event) {
    this.toggle()
  }

  onresize(event) {
    if( document.documentElement.clientWidth > this.breakpoint ) {
      this.hideToggle()
      this.showMenu()
    } else {
      this.showToggle()
      this.hideMenu()
    }
  }

  toggle() {
    if(this.$menu.hidden) {
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
    this.$button.setAttribute('aria-expanded', false)
  }

  showMenu() {
    this.$menu.hidden = false
    this.$button.setAttribute('aria-expanded', true)
  }

  get breakpoint() {
    return parseInt( this.getAttribute('breakpoint') )
  }
}

