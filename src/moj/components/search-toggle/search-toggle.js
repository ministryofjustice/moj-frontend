MOJFrontend.SearchToggle = function(options) {
  this.options = options;

  if (this.options.search.container.data('moj-search-toggle-initialised')) {
    return
  }

  this.options.search.container.data('moj-search-toggle-initialised', true);

  const svg = '<svg viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="moj-search-toggle__button__icon"><path d="M7.433,12.5790048 C6.06762625,12.5808611 4.75763941,12.0392925 3.79217348,11.0738265 C2.82670755,10.1083606 2.28513891,8.79837375 2.28699522,7.433 C2.28513891,6.06762625 2.82670755,4.75763941 3.79217348,3.79217348 C4.75763941,2.82670755 6.06762625,2.28513891 7.433,2.28699522 C8.79837375,2.28513891 10.1083606,2.82670755 11.0738265,3.79217348 C12.0392925,4.75763941 12.5808611,6.06762625 12.5790048,7.433 C12.5808611,8.79837375 12.0392925,10.1083606 11.0738265,11.0738265 C10.1083606,12.0392925 8.79837375,12.5808611 7.433,12.5790048 L7.433,12.5790048 Z M14.293,12.579 L13.391,12.579 L13.071,12.269 C14.2300759,10.9245158 14.8671539,9.20813198 14.866,7.433 C14.866,3.32786745 11.5381325,-1.65045755e-15 7.433,-1.65045755e-15 C3.32786745,-1.65045755e-15 -1.65045755e-15,3.32786745 -1.65045755e-15,7.433 C-1.65045755e-15,11.5381325 3.32786745,14.866 7.433,14.866 C9.208604,14.8671159 10.9253982,14.2296624 12.27,13.07 L12.579,13.39 L12.579,14.294 L18.296,20 L20,18.296 L14.294,12.579 L14.293,12.579 Z"></path></svg>';

  this.toggleButton = $('<button class="moj-search-toggle__button" type="button" aria-haspopup="true" aria-expanded="false">' + this.options.toggleButton.text + svg + '</button>');
	this.toggleButton.on('click', $.proxy(this, 'onToggleButtonClick'));
  this.options.toggleButton.container.append(this.toggleButton);
};

MOJFrontend.SearchToggle.prototype.onToggleButtonClick = function() {
  if(this.toggleButton.attr('aria-expanded') == 'false') {
    this.toggleButton.attr('aria-expanded', 'true');
    this.options.search.container.removeClass('moj-js-hidden');
    this.options.search.container.find('input').first().focus();
	} else {
		this.options.search.container.addClass('moj-js-hidden');
		this.toggleButton.attr('aria-expanded', 'false');
	}
};
