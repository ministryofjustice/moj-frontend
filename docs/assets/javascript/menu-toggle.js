export default class MojMenuToggle extends HTMLElement {
  constructor() {
    super();

    this.menuSelector = this.getAttribute('menu')
    this.$menu = document.querySelector(this.menuSelector)
    this.$button = this.querySelector('button')

    if(!this.$menu) return
    if(!this.$button) return

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
    if(this.menuHidden) {
      this.showMenu()
    } else {
      this.hideMenu()
    }
  }

  hideToggle() {
    this.setAttribute('hidden', true)
  }

  showToggle() {
    this.removeAttribute('hidden')
  }

  hideMenu() {
    this.$menu.setAttribute('hidden', true)
  }

  showMenu() {
    this.$menu.removeAttribute('hidden')
  }

  get menuHidden() {
    return this.$menu.hasAttribute('hidden')
  }

  get breakpoint() {
    return parseInt( this.getAttribute('breakpoint') )
  }
}

