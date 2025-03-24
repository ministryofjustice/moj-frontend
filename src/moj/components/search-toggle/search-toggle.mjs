export function SearchToggle(options) {
  this.options = options
  this.container = this.options.search.container
  this.toggleButtonContainer = this.options.toggleButton.container

  if (this.container.hasAttribute('data-moj-search-toggle-init')) {
    return
  }

  this.container.setAttribute('data-moj-search-toggle-init', '')

  const svg =
    '<svg viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="moj-search-toggle__button__icon"><path d="M7.433,12.5790048 C6.06762625,12.5808611 4.75763941,12.0392925 3.79217348,11.0738265 C2.82670755,10.1083606 2.28513891,8.79837375 2.28699522,7.433 C2.28513891,6.06762625 2.82670755,4.75763941 3.79217348,3.79217348 C4.75763941,2.82670755 6.06762625,2.28513891 7.433,2.28699522 C8.79837375,2.28513891 10.1083606,2.82670755 11.0738265,3.79217348 C12.0392925,4.75763941 12.5808611,6.06762625 12.5790048,7.433 C12.5808611,8.79837375 12.0392925,10.1083606 11.0738265,11.0738265 C10.1083606,12.0392925 8.79837375,12.5808611 7.433,12.5790048 L7.433,12.5790048 Z M14.293,12.579 L13.391,12.579 L13.071,12.269 C14.2300759,10.9245158 14.8671539,9.20813198 14.866,7.433 C14.866,3.32786745 11.5381325,-1.65045755e-15 7.433,-1.65045755e-15 C3.32786745,-1.65045755e-15 -1.65045755e-15,3.32786745 -1.65045755e-15,7.433 C-1.65045755e-15,11.5381325 3.32786745,14.866 7.433,14.866 C9.208604,14.8671159 10.9253982,14.2296624 12.27,13.07 L12.579,13.39 L12.579,14.294 L18.296,20 L20,18.296 L14.294,12.579 L14.293,12.579 Z"></path></svg>'

  this.toggleButton = document.createElement('button')
  this.toggleButton.setAttribute('class', 'moj-search-toggle__button')
  this.toggleButton.setAttribute('type', 'button')
  this.toggleButton.setAttribute('aria-haspopup', 'true')
  this.toggleButton.setAttribute('aria-expanded', 'false')
  this.toggleButton.innerHTML = `${this.options.toggleButton.text} ${svg}`

  this.toggleButton.addEventListener(
    'click',
    this.onToggleButtonClick.bind(this)
  )

  this.toggleButtonContainer.append(this.toggleButton)

  document.addEventListener('click', this.onDocumentClick.bind(this))
  document.addEventListener('focusin', this.onDocumentClick.bind(this))
}

SearchToggle.prototype.showMenu = function () {
  this.toggleButton.setAttribute('aria-expanded', 'true')
  this.container.classList.remove('moj-js-hidden')
  this.container.querySelector('input').focus()
}

SearchToggle.prototype.hideMenu = function () {
  this.container.classList.add('moj-js-hidden')
  this.toggleButton.setAttribute('aria-expanded', 'false')
}

SearchToggle.prototype.onToggleButtonClick = function () {
  if (this.toggleButton.getAttribute('aria-expanded') === 'false') {
    this.showMenu()
  } else {
    this.hideMenu()
  }
}

SearchToggle.prototype.onDocumentClick = function (event) {
  if (
    !this.toggleButtonContainer.contains(event.target) &&
    !this.container.contains(event.target)
  ) {
    this.hideMenu()
  }
}
