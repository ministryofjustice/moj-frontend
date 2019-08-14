MOJFrontend.ButtonGroup = function(params) {
	this.container = params.container;
	this.menu = this.container.find('.moj-button-group__wrapper');
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

MOJFrontend.ButtonGroup.prototype.onDocumentClick = function(e) {
	if(!$.contains(this.container[0], e.target)) {
	  this.hideMenu();
  }
};

MOJFrontend.ButtonGroup.prototype.createToggleButton = function() {
	this.menuButton = $('<button class="govuk-button moj-button-group__toggle-button ' + this.buttonClasses + '" type="button" aria-haspopup="true" aria-expanded="false">'+this.buttonText+'</button>');
	this.menuButton.on('click', $.proxy(this, 'onMenuButtonClick'));
	this.menuButton.on('keydown', $.proxy(this, 'onMenuKeyDown'));
};

MOJFrontend.ButtonGroup.prototype.setupResponsiveChecks = function() {
	this.mql = window.matchMedia(this.mq);
	this.mql.addListener($.proxy(this, 'checkMode'));
	this.checkMode(this.mql);
};

MOJFrontend.ButtonGroup.prototype.checkMode = function(mql) {
	if(mql.matches) {
		this.enableBigMode();
	} else {
		this.enableSmallMode();
	}
};

MOJFrontend.ButtonGroup.prototype.enableSmallMode = function() {
	this.container.prepend(this.menuButton);
	this.hideMenu();
	this.removeButtonClasses();
	this.menu.attr('role', 'menu');
	this.container.find('.moj-button-group__item').attr('role', 'menuitem');
};

MOJFrontend.ButtonGroup.prototype.enableBigMode = function() {
	this.menuButton.detach();
	this.showMenu();
	this.addButtonClasses();
	this.menu.removeAttr('role');
	this.container.find('.moj-button-group__item').removeAttr('role');
};

MOJFrontend.ButtonGroup.prototype.removeButtonClasses = function() {
	this.menu.find('.moj-button-group__item').each(function(index, el) {
		if($(el).hasClass('govuk-button--secondary')) {
			$(el).attr('data-secondary', 'true');
			$(el).removeClass('govuk-button--secondary');
		}
		if($(el).hasClass('govuk-button--warning')) {
			$(el).attr('data-warning', 'true');
			$(el).removeClass('govuk-button--warning');
		}
		$(el).removeClass('govuk-button');
	});
};

MOJFrontend.ButtonGroup.prototype.addButtonClasses = function() {
	this.menu.find('.moj-button-group__item').each(function(index, el) {
		if($(el).attr('data-secondary') == 'true') {
			$(el).addClass('govuk-button--secondary');
		}
		if($(el).attr('data-warning') == 'true') {
			$(el).addClass('govuk-button--warning');
		}
		$(el).addClass('govuk-button');
	});
};

MOJFrontend.ButtonGroup.prototype.hideMenu = function() {
	this.menuButton.attr('aria-expanded', 'false');
};

MOJFrontend.ButtonGroup.prototype.showMenu = function() {
	this.menuButton.attr('aria-expanded', 'true');
};

MOJFrontend.ButtonGroup.prototype.onMenuButtonClick = function() {
	this.toggle();
};

MOJFrontend.ButtonGroup.prototype.toggle = function() {
	if(this.menuButton.attr('aria-expanded') == 'false') {
		this.showMenu();
		this.menu.find('[role=menuitem]').first().focus();
	} else {
		this.hideMenu();
		this.menuButton.focus();
	}
};

MOJFrontend.ButtonGroup.prototype.onMenuKeyDown = function(e) {
	switch (e.keyCode) {
		case this.keys.down:
			this.toggle();
			break;
	}
};

MOJFrontend.ButtonGroup.prototype.onButtonKeydown = function(e) {
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

MOJFrontend.ButtonGroup.prototype.focusNext = function(currentButton) {
	var next = $(currentButton).next();
	if(next[0]) {
		next.focus();
	} else {
		this.container.find('[role=menuitem]').first().focus();
	}
};

MOJFrontend.ButtonGroup.prototype.focusPrevious = function(currentButton) {
	var prev = $(currentButton).prev();
	if(prev[0]) {
		prev.focus();
	} else {
		this.container.find('[role=menuitem]').last().focus();
	}
};