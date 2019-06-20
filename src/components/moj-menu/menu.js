MOJFrontend.Menu = function(params) {
	this.container = params.container;
	this.menu = this.container.find('.moj-menu__wrapper');
	if(params.menuClasses) {
		this.menu.addClass(params.menuClasses);
	}
	this.menu.attr('role', 'menu');
	this.mq = params.mq;
	this.buttonText = params.buttonText;
	this.buttonClasses = params.buttonClasses || '';
	this.keys = { esc: 27, up: 38, down: 40, tab: 9 };
	this.menu.on('keydown', '[role=menuitem]', $.proxy(this, 'onButtonKeydown'));
	this.createToggleButton();
	this.setupResponsiveChecks();
	$(document).on('click', $.proxy(this, 'onDocumentClick'));
};

MOJFrontend.Menu.prototype.onDocumentClick = function(e) {
	if(!$.contains(this.container[0], e.target)) {
	  this.hideMenu();
  }
};

MOJFrontend.Menu.prototype.createToggleButton = function() {
	this.menuButton = $('<button class="govuk-button moj-menu__toggle-button ' + this.buttonClasses + '" type="button" aria-haspopup="true" aria-expanded="false">'+this.buttonText+'</button>');
	this.menuButton.on('click', $.proxy(this, 'onMenuButtonClick'));
	this.menuButton.on('keydown', $.proxy(this, 'onMenuKeyDown'));
};

MOJFrontend.Menu.prototype.setupResponsiveChecks = function() {
	this.mql = window.matchMedia(this.mq);
	this.mql.addListener($.proxy(this, 'checkMode'));
	this.checkMode(this.mql);
};

MOJFrontend.Menu.prototype.checkMode = function(mql) {
	if(mql.matches) {
		this.enableBigMode();
	} else {
		this.enableSmallMode();
	}
};

MOJFrontend.Menu.prototype.enableSmallMode = function() {
	this.container.prepend(this.menuButton);
	this.hideMenu();
	this.removeButtonClasses();
	this.menu.attr('role', 'menu');
	this.container.find('.moj-menu__item').attr('role', 'menuitem');
};

MOJFrontend.Menu.prototype.enableBigMode = function() {
	this.menuButton.detach();
	this.showMenu();
	this.addButtonClasses();
	this.menu.removeAttr('role');
	this.container.find('.moj-menu__item').removeAttr('role');
};

MOJFrontend.Menu.prototype.removeButtonClasses = function() {
	this.menu.find('.moj-menu__item').each(function(index, el) {
		if($(el).hasClass('govuk-button--secondary')) {
			$(el).attr('data-secondary', 'true');
			$(el).removeClass('govuk-button--secondary');
		}
		$(el).removeClass('govuk-button');
	});
};

MOJFrontend.Menu.prototype.addButtonClasses = function() {
	this.menu.find('.moj-menu__item').each(function(index, el) {
		if($(el).attr('data-secondary') == 'true') {
			$(el).addClass('govuk-button--secondary');
		}
		$(el).addClass('govuk-button');
	});
};

MOJFrontend.Menu.prototype.hideMenu = function() {
	this.menuButton.attr('aria-expanded', 'false');
};

MOJFrontend.Menu.prototype.showMenu = function() {
	this.menuButton.attr('aria-expanded', 'true');
};

MOJFrontend.Menu.prototype.onMenuButtonClick = function() {
	this.toggle();
};

MOJFrontend.Menu.prototype.toggle = function() {
	if(this.menuButton.attr('aria-expanded') == 'false') {
		this.showMenu();
		this.menu.find('[role=menuitem]').first().focus();
	} else {
		this.hideMenu();
		this.menuButton.focus();
	}
};

MOJFrontend.Menu.prototype.onMenuKeyDown = function(e) {
	switch (e.keyCode) {
		case this.keys.down:
			this.toggle();
			break;
	}
};

MOJFrontend.Menu.prototype.onButtonKeydown = function(e) {
	switch (e.keyCode) {
		case this.keys.up:
			e.preventDefault();
			this.focusPrevious(e.currentTarget);
			break;
		case this.keys.down:
			e.preventDefault();
			this.focusNext(e.currentTarget);
			break;
		case this.keys.esc:
			if(!this.mq.matches) {
				this.menuButton.focus();
				this.hideMenu();
			}
			break;
		case this.keys.tab:
			if(!this.mq.matches) {
				this.hideMenu();
			}
	}
};

MOJFrontend.Menu.prototype.focusNext = function(currentButton) {
	var next = $(currentButton).next();
	if(next[0]) {
		next.focus();
	} else {
		this.container.find('[role=menutiem]').first().focus();
	}
};

MOJFrontend.Menu.prototype.focusPrevious = function(currentButton) {
	var prev = $(currentButton).prev();
	if(prev[0]) {
		prev.focus();
	} else {
		this.container.find('[role=menutiem]').last().focus();
	}
};