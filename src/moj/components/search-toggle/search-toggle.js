MOJFrontend.SearchToggle = function(options) {
  this.options = options;

  if (this.options.search.container.data('moj-search-toggle-initialised')) {
    return
  }

  this.options.search.container.data('moj-search-toggle-initialised', true);

  this.toggleButton = $('<button class="moj-search-toggle__button" type="button" aria-haspopup="true" aria-expanded="false">'+this.options.toggleButton.text+'</button>');
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
