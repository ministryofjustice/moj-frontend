MOJFrontend.AddAnother = function(container) {
	this.container = $(container);

	if (this.container.data('moj-add-another-initialised')) {
		return
	}

	this.container.data('moj-add-another-initialised', true);

	this.container.on('click', '.moj-add-another__remove-button', $.proxy(this, 'onRemoveButtonClick'));
	this.container.on('click', '.moj-add-another__add-button', $.proxy(this, 'onAddButtonClick'));
	this.container.find('.moj-add-another__add-button, moj-add-another__remove-button').prop('type', 'button');
};

MOJFrontend.AddAnother.prototype.onAddButtonClick = function(e) {
	var item = this.getNewItem();
	this.updateAttributes(this.getItems().length, item);
	this.resetItem(item);
	var firstItem = this.getItems().first();
	if(!this.hasRemoveButton(firstItem)) {
		this.createRemoveButton(firstItem);
	}
	this.getItems().last().after(item);
	item.find('input, textarea, select').first().focus();
};

MOJFrontend.AddAnother.prototype.hasRemoveButton = function(item) {
	return item.find('.moj-add-another__remove-button').length;
};

MOJFrontend.AddAnother.prototype.getItems = function() {
	return this.container.find('.moj-add-another__item');
};

MOJFrontend.AddAnother.prototype.getNewItem = function() {
	var item = this.getItems().first().clone();
	if(!this.hasRemoveButton(item)) {
		this.createRemoveButton(item);
	}
	return item;
};

MOJFrontend.AddAnother.prototype.updateAttributes = function(index, item) {
	item.find('[data-name]').each(function(i, el) {
    var originalId = el.id

		el.name = $(el).attr('data-name').replace(/%index%/, index);
		el.id = $(el).attr('data-id').replace(/%index%/, index);

    var label = $(el).siblings('label')[0] || $(el).parents('label')[0] || item.find('[for="' + originalId + '"]')[0];
		label.htmlFor = el.id;
	});
};

MOJFrontend.AddAnother.prototype.createRemoveButton = function(item) {
	item.append('<button type="button" class="govuk-button govuk-button--secondary moj-add-another__remove-button">Remove</button>');
};

MOJFrontend.AddAnother.prototype.resetItem = function(item) {
	item.find('[data-name], [data-id]').each(function(index, el) {
		if(el.type == 'checkbox' || el.type == 'radio') {
			el.checked = false;
		} else {
			el.value = '';
		}
	});
};

MOJFrontend.AddAnother.prototype.onRemoveButtonClick = function(e) {
	$(e.currentTarget).parents('.moj-add-another__item').remove();
	var items = this.getItems();
	if(items.length === 1) {
		items.find('.moj-add-another__remove-button').remove();
	}
	items.each($.proxy(function(index, el) {
		this.updateAttributes(index, $(el));
	}, this));
	this.focusHeading();
};

MOJFrontend.AddAnother.prototype.focusHeading = function() {
	this.container.find('.moj-add-another__heading').focus();
};
