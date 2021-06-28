;(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.MOJFrontend = factory();
  }
}(this, function() {
var MOJFrontend = {};
MOJFrontend.removeAttributeValue = function(el, attr, value) {
  var re, m;
  if (el.getAttribute(attr)) {
    if (el.getAttribute(attr) == value) {
      el.removeAttribute(attr);
    } else {
      re = new RegExp('(^|\\s)' + value + '(\\s|$)');
      m = el.getAttribute(attr).match(re);
      if (m && m.length == 3) {
        el.setAttribute(attr, el.getAttribute(attr).replace(re, (m[1] && m[2])?' ':''))
      }
    }
  }
}

MOJFrontend.addAttributeValue = function(el, attr, value) {
  var re;
  if (!el.getAttribute(attr)) {
    el.setAttribute(attr, value);
  }
  else {
    re = new RegExp('(^|\\s)' + value + '(\\s|$)');
    if (!re.test(el.getAttribute(attr))) {
      el.setAttribute(attr, el.getAttribute(attr) + ' ' + value);
    }
  }
};

MOJFrontend.dragAndDropSupported = function() {
  var div = document.createElement('div');
  return typeof div.ondrop != 'undefined';
};

MOJFrontend.formDataSupported = function() {
  return typeof FormData == 'function';
};

MOJFrontend.fileApiSupported = function() {
  var input = document.createElement('input');
  input.type = 'file';
  return typeof input.files != 'undefined';
};

MOJFrontend.nodeListForEach = function(nodes, callback) {
  if (window.NodeList.prototype.forEach) {
    return nodes.forEach(callback)
  }
  for (var i = 0; i < nodes.length; i++) {
    callback.call(window, nodes[i], i, nodes)
  }
};

MOJFrontend.initAll = function (options) {
  // Set the options to an empty object by default if no options are passed.
  options = typeof options !== 'undefined' ? options : {};

  // Allow the user to initialise MOJ Frontend in only certain sections of the page
  // Defaults to the entire document if nothing is set.
  var scope = typeof options.scope !== 'undefined' ? options.scope : document;

  var $addAnothers = scope.querySelectorAll('[data-module="moj-add-another"]');
  MOJFrontend.nodeListForEach($addAnothers, function ($addAnother) {
    new MOJFrontend.AddAnother($addAnother);
  });

  var $multiSelects = scope.querySelectorAll('[data-module="moj-multi-select"]');
  MOJFrontend.nodeListForEach($multiSelects, function ($multiSelect) {
    new MOJFrontend.MultiSelect({
      container: $multiSelect.querySelector($multiSelect.getAttribute('data-multi-select-checkbox')),
      checkboxes: $multiSelect.querySelectorAll('tbody .govuk-checkboxes__input')
    });
  });

  var $passwordReveals = scope.querySelectorAll('[data-module="moj-password-reveal"]');
  MOJFrontend.nodeListForEach($passwordReveals, function ($passwordReveal) {
    new MOJFrontend.PasswordReveal($passwordReveal);
  });

  var $richTextEditors = scope.querySelectorAll('[data-module="moj-rich-text-editor"]');
  MOJFrontend.nodeListForEach($richTextEditors, function ($richTextEditor) {
    var options = {
      textarea: $($richTextEditor)
    };

    var toolbarAttr = $richTextEditor.getAttribute('data-moj-rich-text-editor-toolbar');
    if (toolbarAttr) {
      var toolbar = toolbarAttr.split(',');
      options.toolbar = {};
      for (var item in toolbar) options.toolbar[toolbar[item]] = true;
    }

    new MOJFrontend.RichTextEditor(options);
  });

  var $searchToggles = scope.querySelectorAll('[data-module="moj-search-toggle"]');
  MOJFrontend.nodeListForEach($searchToggles, function ($searchToggle) {
    new MOJFrontend.SearchToggle({
      toggleButton: {
        container: $($searchToggle.querySelector('.moj-search-toggle__toggle')),
        text: $searchToggle.getAttribute('data-moj-search-toggle-text')
      },
      search: {
        container: $($searchToggle.querySelector('.moj-search'))
      }
    });
  });

  var $sortableTables = scope.querySelectorAll('[data-module="moj-sortable-table"]');
  MOJFrontend.nodeListForEach($sortableTables, function ($table) {
    new MOJFrontend.SortableTable({
      table: $table
    });
  });

  var $sortableTables = scope.querySelectorAll('[data-module="moj-sortable-table"]');
  MOJFrontend.nodeListForEach($sortableTables, function ($table) {
    new MOJFrontend.SortableTable({
      table: $table
    });
  });
}

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

MOJFrontend.ButtonMenu = function(params) {
	this.container = params.container;
	this.menu = this.container.find('.moj-button-menu__wrapper');
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

MOJFrontend.ButtonMenu.prototype.onDocumentClick = function(e) {
	if(!$.contains(this.container[0], e.target)) {
	  this.hideMenu();
  }
};

MOJFrontend.ButtonMenu.prototype.createToggleButton = function() {
	this.menuButton = $('<button class="govuk-button moj-button-menu__toggle-button ' + this.buttonClasses + '" type="button" aria-haspopup="true" aria-expanded="false">'+this.buttonText+'</button>');
	this.menuButton.on('click', $.proxy(this, 'onMenuButtonClick'));
	this.menuButton.on('keydown', $.proxy(this, 'onMenuKeyDown'));
};

MOJFrontend.ButtonMenu.prototype.setupResponsiveChecks = function() {
	this.mql = window.matchMedia(this.mq);
	this.mql.addListener($.proxy(this, 'checkMode'));
	this.checkMode(this.mql);
};

MOJFrontend.ButtonMenu.prototype.checkMode = function(mql) {
	if(mql.matches) {
		this.enableBigMode();
	} else {
		this.enableSmallMode();
	}
};

MOJFrontend.ButtonMenu.prototype.enableSmallMode = function() {
	this.container.prepend(this.menuButton);
	this.hideMenu();
	this.removeButtonClasses();
	this.menu.attr('role', 'menu');
	this.container.find('.moj-button-menu__item').attr('role', 'menuitem');
};

MOJFrontend.ButtonMenu.prototype.enableBigMode = function() {
	this.menuButton.detach();
	this.showMenu();
	this.addButtonClasses();
	this.menu.removeAttr('role');
	this.container.find('.moj-button-menu__item').removeAttr('role');
};

MOJFrontend.ButtonMenu.prototype.removeButtonClasses = function() {
	this.menu.find('.moj-button-menu__item').each(function(index, el) {
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

MOJFrontend.ButtonMenu.prototype.addButtonClasses = function() {
	this.menu.find('.moj-button-menu__item').each(function(index, el) {
		if($(el).attr('data-secondary') == 'true') {
			$(el).addClass('govuk-button--secondary');
		}
		if($(el).attr('data-warning') == 'true') {
			$(el).addClass('govuk-button--warning');
		}
		$(el).addClass('govuk-button');
	});
};

MOJFrontend.ButtonMenu.prototype.hideMenu = function() {
	this.menuButton.attr('aria-expanded', 'false');
};

MOJFrontend.ButtonMenu.prototype.showMenu = function() {
	this.menuButton.attr('aria-expanded', 'true');
};

MOJFrontend.ButtonMenu.prototype.onMenuButtonClick = function() {
	this.toggle();
};

MOJFrontend.ButtonMenu.prototype.toggle = function() {
	if(this.menuButton.attr('aria-expanded') == 'false') {
		this.showMenu();
		this.menu.find('[role=menuitem]').first().focus();
	} else {
		this.hideMenu();
		this.menuButton.focus();
	}
};

MOJFrontend.ButtonMenu.prototype.onMenuKeyDown = function(e) {
	switch (e.keyCode) {
		case this.keys.down:
			this.toggle();
			break;
	}
};

MOJFrontend.ButtonMenu.prototype.onButtonKeydown = function(e) {
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

MOJFrontend.ButtonMenu.prototype.focusNext = function(currentButton) {
	var next = $(currentButton).next();
	if(next[0]) {
		next.focus();
	} else {
		this.container.find('[role=menuitem]').first().focus();
	}
};

MOJFrontend.ButtonMenu.prototype.focusPrevious = function(currentButton) {
	var prev = $(currentButton).prev();
	if(prev[0]) {
		prev.focus();
	} else {
		this.container.find('[role=menuitem]').last().focus();
	}
};
MOJFrontend.FilterToggleButton = function(options) {
  this.options = options;
  this.container = this.options.toggleButton.container;
  this.createToggleButton();
  this.setupResponsiveChecks();
  this.options.filter.container.attr('tabindex', '-1');
  if(this.options.startHidden) {
    this.hideMenu();
  }
};

MOJFrontend.FilterToggleButton.prototype.setupResponsiveChecks = function() {
  this.mq = window.matchMedia(this.options.bigModeMediaQuery);
  this.mq.addListener($.proxy(this, 'checkMode'));
  this.checkMode(this.mq);
};

MOJFrontend.FilterToggleButton.prototype.createToggleButton = function() {
  this.menuButton = $('<button class="govuk-button '+this.options.toggleButton.classes+'" type="button" aria-haspopup="true" aria-expanded="false">'+this.options.toggleButton.showText+'</button>');
  this.menuButton.on('click', $.proxy(this, 'onMenuButtonClick'));
  this.options.toggleButton.container.append(this.menuButton);
};

MOJFrontend.FilterToggleButton.prototype.checkMode = function(mq) {
  if(mq.matches) {
    this.enableBigMode();
  } else {
    this.enableSmallMode();
  }
};

MOJFrontend.FilterToggleButton.prototype.enableBigMode = function() {
  this.showMenu();
  this.removeCloseButton();
};

MOJFrontend.FilterToggleButton.prototype.enableSmallMode = function() {
  this.hideMenu();
  this.addCloseButton();
};

MOJFrontend.FilterToggleButton.prototype.addCloseButton = function() {
  if(this.options.closeButton) {
    this.closeButton = $('<button class="moj-filter__close" type="button">'+this.options.closeButton.text+'</button>');
    this.closeButton.on('click', $.proxy(this, 'onCloseClick'));
    this.options.closeButton.container.append(this.closeButton);
  }
};

MOJFrontend.FilterToggleButton.prototype.onCloseClick = function() {
  this.hideMenu();
  this.menuButton.focus();
};

MOJFrontend.FilterToggleButton.prototype.removeCloseButton = function() {
  if(this.closeButton) {
    this.closeButton.remove();
    this.closeButton = null;
  }
};

MOJFrontend.FilterToggleButton.prototype.hideMenu = function() {
  this.menuButton.attr('aria-expanded', 'false');
  this.options.filter.container.addClass('moj-js-hidden');
  this.menuButton.text(this.options.toggleButton.showText);
};

MOJFrontend.FilterToggleButton.prototype.showMenu = function() {
  this.menuButton.attr('aria-expanded', 'true');
  this.options.filter.container.removeClass('moj-js-hidden');
  this.menuButton.text(this.options.toggleButton.hideText);
};

MOJFrontend.FilterToggleButton.prototype.onMenuButtonClick = function() {
  this.toggle();
};

MOJFrontend.FilterToggleButton.prototype.toggle = function() {
  if(this.menuButton.attr('aria-expanded') == 'false') {
    this.showMenu();
    this.options.filter.container.focus();
  } else {
    this.hideMenu();
  }
};
MOJFrontend.FormValidator = function(form, options) {
  this.form = form;
  this.errors = [];
  this.validators = [];
  $(this.form).on('submit', $.proxy(this, 'onSubmit'));
  this.summary = (options && options.summary) ? $(options.summary) : $('.govuk-error-summary');
  this.originalTitle = document.title;
};

MOJFrontend.FormValidator.entityMap = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
  '/': '&#x2F;',
  '`': '&#x60;',
  '=': '&#x3D;'
};

MOJFrontend.FormValidator.prototype.escapeHtml = function(string) {
  return String(string).replace(/[&<>"'`=\/]/g, function fromEntityMap (s) {
    return MOJFrontend.FormValidator.entityMap[s];
  });
};

MOJFrontend.FormValidator.prototype.resetTitle = function() {
  document.title = this.originalTitle;
};

MOJFrontend.FormValidator.prototype.updateTitle = function() {
  document.title = "" + this.errors.length + " errors - " + document.title;
};

MOJFrontend.FormValidator.prototype.showSummary = function () {
  this.summary.html(this.getSummaryHtml());
  this.summary.removeClass('moj-hidden');
  this.summary.attr('aria-labelledby', 'errorSummary-heading');
  this.summary.focus();
};

MOJFrontend.FormValidator.prototype.getSummaryHtml = function() {
  var html = '<h2 id="error-summary-title" class="govuk-error-summary__title">There is a problem</h2>';
  html += '<div class="govuk-error-summary__body">';
  html += '<ul class="govuk-list govuk-error-summary__list">';
  for (var i = 0, j = this.errors.length; i < j; i++) {
    var error = this.errors[i];
    html += '<li>';
    html +=   '<a href="#' + this.escapeHtml(error.fieldName) + '">';
    html +=     this.escapeHtml(error.message);
    html +=   '</a>';
    html += '</li>';
  }
  html += '</ul>';
  html += '</div>';
  return html;
};

MOJFrontend.FormValidator.prototype.hideSummary = function() {
  this.summary.addClass('moj-hidden');
  this.summary.removeAttr('aria-labelledby');
};

MOJFrontend.FormValidator.prototype.onSubmit = function (e) {
  this.removeInlineErrors();
  this.hideSummary();
  this.resetTitle();
  if(!this.validate()) {
    e.preventDefault();
    this.updateTitle();
    this.showSummary();
    this.showInlineErrors();
  }
};

MOJFrontend.FormValidator.prototype.showInlineErrors = function() {
  for (var i = 0, j = this.errors.length; i < j; i++) {
    this.showInlineError(this.errors[i]);
  }
};

MOJFrontend.FormValidator.prototype.showInlineError = function (error) {
  var errorSpanId = error.fieldName + '-error';
  var errorSpan = '<span class="govuk-error-message" id="'+ errorSpanId +'">'+this.escapeHtml(error.message)+'</span>';
  var control = $("#" + error.fieldName);
  var fieldContainer = control.parents(".govuk-form-group");
  var label = fieldContainer.find('label');
  var legend = fieldContainer.find("legend");
  var fieldset = fieldContainer.find("fieldset");
  fieldContainer.addClass('govuk-form-group--error');
  if(legend.length) {
    legend.after(errorSpan);
    fieldContainer.attr('aria-invalid', 'true');
    MOJFrontend.addAttributeValue(fieldset[0], 'aria-describedby', errorSpanId);
  } else {
    label.after(errorSpan);
    control.attr('aria-invalid', 'true');
    MOJFrontend.addAttributeValue(control[0], 'aria-describedby', errorSpanId);
  }
};

MOJFrontend.FormValidator.prototype.removeInlineErrors = function() {
  var error;
  var i;
  for (var i = 0; i < this.errors.length; i++) {
    this.removeInlineError(this.errors[i]);
  }
};

MOJFrontend.FormValidator.prototype.removeInlineError = function(error) {
  var control = $("#" + error.fieldName);
  var fieldContainer = control.parents(".govuk-form-group");
  fieldContainer.find('.govuk-error-message').remove();
  fieldContainer.removeClass('govuk-form-group--error');
  fieldContainer.find("[aria-invalid]").attr('aria-invalid', 'false');
  var errorSpanId = error.fieldName + '-error';
  MOJFrontend.removeAttributeValue(fieldContainer.find('[aria-describedby]')[0], 'aria-describedby', errorSpanId);
};

MOJFrontend.FormValidator.prototype.addValidator = function(fieldName, rules) {
  this.validators.push({
    fieldName: fieldName,
    rules: rules,
    field: this.form.elements[fieldName]
  });
};

MOJFrontend.FormValidator.prototype.validate = function() {
  this.errors = [];
  var validator = null,
    validatorReturnValue = true,
    i,
    j;
  for (i = 0; i < this.validators.length; i++) {
    validator = this.validators[i];
    for (j = 0; j < validator.rules.length; j++) {
      validatorReturnValue = validator.rules[j].method(validator.field,
        validator.rules[j].params);

      if (typeof validatorReturnValue === 'boolean' && !validatorReturnValue) {
        this.errors.push({
          fieldName: validator.fieldName,
          message: validator.rules[j].message
        });
        break;
      } else if(typeof validatorReturnValue === 'string') {
        this.errors.push({
          fieldName: validatorReturnValue,
          message: validator.rules[j].message
        });
        break;
      }
    }
  }
  return this.errors.length === 0;
};
if(MOJFrontend.dragAndDropSupported() && MOJFrontend.formDataSupported() && MOJFrontend.fileApiSupported()) {
  MOJFrontend.MultiFileUpload = function(params) {
    this.defaultParams = {
      uploadFileEntryHook: $.noop,
      uploadFileExitHook: $.noop,
      uploadFileErrorHook: $.noop,
      fileDeleteHook: $.noop,
      uploadStatusText: 'Uploading files, please wait',
      dropzoneHintText: 'Drag and drop files here or',
      dropzoneButtonText: 'Choose files'
    };

    this.params = $.extend({}, this.defaultParams, params);

    this.params.container.addClass('moj-multi-file-upload--enhanced');

    this.feedbackContainer = this.params.container.find('.moj-multi-file__uploaded-files');
    this.setupFileInput();
    this.setupDropzone();
    this.setupLabel();
    this.setupStatusBox();
    this.params.container.on('click', '.moj-multi-file-upload__delete', $.proxy(this, 'onFileDeleteClick'));
  };

  MOJFrontend.MultiFileUpload.prototype.setupDropzone = function() {
    this.fileInput.wrap('<div class="moj-multi-file-upload__dropzone" />');
    this.dropzone = this.params.container.find('.moj-multi-file-upload__dropzone');
    this.dropzone.on('dragover', $.proxy(this, 'onDragOver'));
    this.dropzone.on('dragleave', $.proxy(this, 'onDragLeave'));
    this.dropzone.on('drop', $.proxy(this, 'onDrop'));
  };

  MOJFrontend.MultiFileUpload.prototype.setupLabel = function() {
    this.label = $('<label for="'+this.fileInput[0].id+'" class="govuk-button govuk-button--secondary">'+ this.params.dropzoneButtonText +'</label>');
    this.dropzone.append('<p class="govuk-body">' + this.params.dropzoneHintText + '</p>');
    this.dropzone.append(this.label);
  };

  MOJFrontend.MultiFileUpload.prototype.setupFileInput = function() {
    this.fileInput = this.params.container.find('.moj-multi-file-upload__input');
    this.fileInput.on('change', $.proxy(this, 'onFileChange'));
    this.fileInput.on('focus', $.proxy(this, 'onFileFocus'));
    this.fileInput.on('blur', $.proxy(this, 'onFileBlur'));
  };

  MOJFrontend.MultiFileUpload.prototype.setupStatusBox = function() {
    this.status = $('<div aria-live="polite" role="status" class="govuk-visually-hidden" />');
    this.dropzone.append(this.status);
  };

  MOJFrontend.MultiFileUpload.prototype.onDragOver = function(e) {
  	e.preventDefault();
  	this.dropzone.addClass('moj-multi-file-upload--dragover');
  };

  MOJFrontend.MultiFileUpload.prototype.onDragLeave = function() {
  	this.dropzone.removeClass('moj-multi-file-upload--dragover');
  };

  MOJFrontend.MultiFileUpload.prototype.onDrop = function(e) {
  	e.preventDefault();
  	this.dropzone.removeClass('moj-multi-file-upload--dragover');
    this.feedbackContainer.removeClass('moj-hidden');
    this.status.html(this.params.uploadStatusText);
  	this.uploadFiles(e.originalEvent.dataTransfer.files);
  };

  MOJFrontend.MultiFileUpload.prototype.uploadFiles = function(files) {
    for(var i = 0; i < files.length; i++) {
      this.uploadFile(files[i]);
    }
  };

  MOJFrontend.MultiFileUpload.prototype.onFileChange = function(e) {
    this.feedbackContainer.removeClass('moj-hidden');
    this.status.html(this.params.uploadStatusText);
    this.uploadFiles(e.currentTarget.files);
    this.fileInput.replaceWith($(e.currentTarget).val('').clone(true));
    this.setupFileInput();
    this.fileInput.focus();
  };

  MOJFrontend.MultiFileUpload.prototype.onFileFocus = function(e) {
    this.label.addClass('moj-multi-file-upload--focused');
  };

  MOJFrontend.MultiFileUpload.prototype.onFileBlur = function(e) {
    this.label.removeClass('moj-multi-file-upload--focused');
  };

  MOJFrontend.MultiFileUpload.prototype.getSuccessHtml = function(success) {
    return '<span class="moj-multi-file-upload__success"> <svg class="moj-banner__icon" fill="currentColor" role="presentation" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25" height="25" width="25"><path d="M25,6.2L8.7,23.2L0,14.1l4-4.2l4.7,4.9L21,2L25,6.2z"/></svg> ' + success.messageHtml + '</span>';
  };

  MOJFrontend.MultiFileUpload.prototype.getErrorHtml = function(error) {
    return '<span class="moj-multi-file-upload__error"> <svg class="moj-banner__icon" fill="currentColor" role="presentation" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25" height="25" width="25"><path d="M13.6,15.4h-2.3v-4.5h2.3V15.4z M13.6,19.8h-2.3v-2.2h2.3V19.8z M0,23.2h25L12.5,2L0,23.2z"/></svg> '+ error.message +'</span>';
  };

  MOJFrontend.MultiFileUpload.prototype.getFileRowHtml = function(file) {
    var html = '';
    html += '<div class="govuk-summary-list__row moj-multi-file-upload__row">';
    html += '  <dd class="govuk-summary-list__value moj-multi-file-upload__message">';
    html +=       '<span class="moj-multi-file-upload__filename">'+file.name+'</span>';
    html +=       '<span class="moj-multi-file-upload__progress">0%</span>';
    html += '  </dd>';
    html += '  <dd class="govuk-summary-list__actions moj-multi-file-upload__actions"></dd>';
    html += '</div>';
    return html;
  };

  MOJFrontend.MultiFileUpload.prototype.getDeleteButtonHtml = function(file) {
    var html = '<button class="moj-multi-file-upload__delete govuk-button govuk-button--secondary govuk-!-margin-bottom-0" type="button" name="delete" value="' + file.filename + '">';
    html += 'Delete <span class="govuk-visually-hidden">' + file.originalname + '</span>';
    html += '</button>';
    return html;
  };

  MOJFrontend.MultiFileUpload.prototype.uploadFile = function(file) {
    this.params.uploadFileEntryHook(this, file);
    var formData = new FormData();
    formData.append('documents', file);
    var item = $(this.getFileRowHtml(file));
    this.feedbackContainer.find('.moj-multi-file-upload__list').append(item);

    $.ajax({
      url: this.params.uploadUrl,
      type: 'post',
      data: formData,
      processData: false,
      contentType: false,
      success: $.proxy(function(response){
        if(response.error) {
          item.find('.moj-multi-file-upload__message').html(this.getErrorHtml(response.error));
          this.status.html(response.error.message);
        } else {
          item.find('.moj-multi-file-upload__message').html(this.getSuccessHtml(response.success));
          this.status.html(response.success.messageText);
        }
        item.find('.moj-multi-file-upload__actions').append(this.getDeleteButtonHtml(response.file));
        this.params.uploadFileExitHook(this, file, response);
      }, this),
      error: $.proxy(function(jqXHR, textStatus, errorThrown) {
        this.params.uploadFileErrorHook(this, file, jqXHR, textStatus, errorThrown);
      }, this),
      xhr: function() {
        var xhr = new XMLHttpRequest();
        xhr.upload.addEventListener('progress', function(e) {
          if (e.lengthComputable) {
            var percentComplete = e.loaded / e.total;
            percentComplete = parseInt(percentComplete * 100, 10);
            item.find('.moj-multi-file-upload__progress').text(' ' + percentComplete + '%');
          }
        }, false);
        return xhr;
      }
    });
  };

  MOJFrontend.MultiFileUpload.prototype.onFileDeleteClick = function(e) {
    e.preventDefault(); // if user refreshes page and then deletes
    var button = $(e.currentTarget);
    var data = {};
    data[button[0].name] = button[0].value;
    $.ajax({
      url: this.params.deleteUrl,
      type: 'post',
      dataType: 'json',
      data: data,
      success: $.proxy(function(response){
        if(response.error) {
          // handle error
        } else {
          button.parents('.moj-multi-file-upload__row').remove();
          if(this.feedbackContainer.find('.moj-multi-file-upload__row').length === 0) {
            this.feedbackContainer.addClass('moj-hidden');
          }
        }
        this.params.fileDeleteHook(this, response);
      }, this)
    });
  };
}

MOJFrontend.MultiSelect = function(options) {
  this.container = $(options.container);

  if (this.container.data('moj-multi-select-initialised')) {
    return
  }

  this.container.data('moj-multi-select-initialised', true);

  this.toggle = $(this.getToggleHtml());
  this.toggleButton = this.toggle.find('input');
  this.toggleButton.on('click', $.proxy(this, 'onButtonClick'));
  this.container.append(this.toggle);
  this.checkboxes = $(options.checkboxes);
  this.checkboxes.on('click', $.proxy(this, 'onCheckboxClick'));
  this.checked = options.checked || false;
};

MOJFrontend.MultiSelect.prototype.getToggleHtml = function() {
  var html = '';
  html += '<div class="govuk-checkboxes__item govuk-checkboxes--small moj-multi-select__checkbox">';
  html += '  <input type="checkbox" class="govuk-checkboxes__input" id="checkboxes-all">';
  html += '  <label class="govuk-label govuk-checkboxes__label moj-multi-select__toggle-label" for="checkboxes-all">';
  html += '    <span class="govuk-visually-hidden">Select all</span>';
  html += '  </label>';
  html += '</div>';
  return html;
};

MOJFrontend.MultiSelect.prototype.onButtonClick = function(e) {
  if(this.checked) {
    this.uncheckAll();
    this.toggleButton[0].checked = false;
  } else {
    this.checkAll();
    this.toggleButton[0].checked = true;
  }
};

MOJFrontend.MultiSelect.prototype.checkAll = function() {
  this.checkboxes.each($.proxy(function(index, el) {
    el.checked = true;
  }, this));
  this.checked = true;
};

MOJFrontend.MultiSelect.prototype.uncheckAll = function() {
  this.checkboxes.each($.proxy(function(index, el) {
    el.checked = false;
  }, this));
  this.checked = false;
};

MOJFrontend.MultiSelect.prototype.onCheckboxClick = function(e) {
  if(!e.target.checked) {
    this.toggleButton[0].checked = false;
    this.checked = false;
  } else {
    if(this.checkboxes.filter(':checked').length === this.checkboxes.length) {
      this.toggleButton[0].checked = true;
      this.checked = true;
    }
  }
};

MOJFrontend.PasswordReveal = function(element) {
  this.el = element;
  $el = $(this.el)

  if ($el.data('moj-password-reveal-initialised')) {
    return
  }

  $el.data('moj-password-reveal-initialised', true);

  $el.wrap('<div class="moj-password-reveal"></div>');
  this.container = $(this.el).parent();
  this.createButton();
};

MOJFrontend.PasswordReveal.prototype.createButton = function() {
  this.button = $('<button type="button" class="govuk-button govuk-button--secondary moj-password-reveal__button">Show</button>');
  this.container.append(this.button);
  this.button.on('click', $.proxy(this, 'onButtonClick'));
};

MOJFrontend.PasswordReveal.prototype.onButtonClick = function() {
  if (this.el.type === 'password') {
    this.el.type = 'text';
    this.button.text('Hide');
  } else {
    this.el.type = 'password';
    this.button.text('Show');
  }
};

if('contentEditable' in document.documentElement) {
  MOJFrontend.RichTextEditor = function(options) {
    this.options = options;
    this.options.toolbar = this.options.toolbar || {
      bold: false,
      italic: false,
      underline: false,
      bullets: true,
      numbers: true
    };
    this.textarea = this.options.textarea;
    this.container = $(this.textarea).parent();

    if (this.container.data('moj-rich-text-editor-initialised')) {
      return
    }

    this.container.data('moj-rich-text-editor-initialised', true);

    this.createToolbar();
    this.hideDefault();
    this.configureToolbar();
    this.keys = {
      left: 37,
      right: 39,
      up: 38,
      down: 40
    };
    this.container.on('click', '.moj-rich-text-editor__toolbar-button', $.proxy(this, 'onButtonClick'));
    this.container.find('.moj-rich-text-editor__content').on('input', $.proxy(this, 'onEditorInput'));
    this.container.find('label').on('click', $.proxy(this, 'onLabelClick'));
    this.toolbar.on('keydown', $.proxy(this, 'onToolbarKeydown'));
  };

  MOJFrontend.RichTextEditor.prototype.onToolbarKeydown = function(e) {
    var focusableButton;
    switch(e.keyCode) {
      case this.keys.right:
      case this.keys.down:
        focusableButton = this.toolbar.find('button[tabindex=0]');
        var nextButton = focusableButton.next('button');
        if(nextButton[0]) {
          nextButton.focus();
          focusableButton.attr('tabindex', '-1');
          nextButton.attr('tabindex', '0');
        }
        break;
      case this.keys.left:
      case this.keys.up:
        focusableButton = this.toolbar.find('button[tabindex=0]');
        var previousButton = focusableButton.prev('button');
        if(previousButton[0]) {
          previousButton.focus();
          focusableButton.attr('tabindex', '-1');
          previousButton.attr('tabindex', '0');
        }
        break;
    }
  };

  MOJFrontend.RichTextEditor.prototype.getToolbarHtml = function() {
    var html = '';

    html += '<div class="moj-rich-text-editor__toolbar" role="toolbar">';

    if(this.options.toolbar.bold) {
      html += '<button class="moj-rich-text-editor__toolbar-button moj-rich-text-editor__toolbar-button--bold" type="button" data-command="bold"><span class="govuk-visually-hidden">Bold</span></button>';
    }

    if(this.options.toolbar.italic) {
      html += '<button class="moj-rich-text-editor__toolbar-button moj-rich-text-editor__toolbar-button--italic" type="button" data-command="italic"><span class="govuk-visually-hidden">Italic</span></button>';
    }

    if(this.options.toolbar.underline) {
      html += '<button class="moj-rich-text-editor__toolbar-button moj-rich-text-editor__toolbar-button--underline" type="button" data-command="underline"><span class="govuk-visually-hidden">Underline</span></button>';
    }

    if(this.options.toolbar.bullets) {
      html += '<button class="moj-rich-text-editor__toolbar-button moj-rich-text-editor__toolbar-button--unordered-list" type="button" data-command="insertUnorderedList"><span class="govuk-visually-hidden">Unordered list</span></button>';
    }

    if(this.options.toolbar.numbers) {
      html += '<button class="moj-rich-text-editor__toolbar-button moj-rich-text-editor__toolbar-button--ordered-list" type="button" data-command="insertOrderedList"><span class="govuk-visually-hidden">Ordered list</span></button>';
    }

    html += '</div>';
    return html;
  };

  MOJFrontend.RichTextEditor.prototype.getEnhancedHtml = function(val) {
    return this.getToolbarHtml() + '<div class="moj-rich-text-editor__content" contenteditable="true" spellcheck="false"></div>';
  };

  MOJFrontend.RichTextEditor.prototype.hideDefault = function() {
    this.textarea = this.container.find('textarea');
    this.textarea.addClass('govuk-visually-hidden');
    this.textarea.attr('aria-hidden', true);
    this.textarea.attr('tabindex', '-1');
  };

  MOJFrontend.RichTextEditor.prototype.createToolbar = function() {
    this.toolbar = document.createElement('div');
    this.toolbar.className = 'moj-rich-text-editor';
    this.toolbar.innerHTML = this.getEnhancedHtml();
    this.container.append(this.toolbar);
    this.toolbar = this.container.find('.moj-rich-text-editor__toolbar');
    this.container.find('.moj-rich-text-editor__content').html(this.textarea.val());
  };

  MOJFrontend.RichTextEditor.prototype.configureToolbar = function() {
    this.buttons = this.container.find('.moj-rich-text-editor__toolbar-button');
    this.buttons.prop('tabindex', '-1');
    var firstTab = this.buttons.first();
    firstTab.prop('tabindex', '0');
  };

  MOJFrontend.RichTextEditor.prototype.onButtonClick = function(e) {
    document.execCommand($(e.currentTarget).data('command'), false, null);
  };

  MOJFrontend.RichTextEditor.prototype.getContent = function() {
    return this.container.find('.moj-rich-text-editor__content').html();
  };

  MOJFrontend.RichTextEditor.prototype.onEditorInput = function(e) {
    this.updateTextarea();
  };

  MOJFrontend.RichTextEditor.prototype.updateTextarea = function() {
    document.execCommand('defaultParagraphSeparator', false, 'p');
    this.textarea.val(this.getContent());
  };

  MOJFrontend.RichTextEditor.prototype.onLabelClick = function(e) {
    e.preventDefault();
    this.container.find('.moj-rich-text-editor__content').focus();
  };

}

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

MOJFrontend.SortableTable = function(params) {
	this.table = $(params.table);

	if (this.table.data('moj-search-toggle-initialised')) {
		return
	}

	this.table.data('moj-search-toggle-initialised', true);

	this.setupOptions(params);
	this.body = this.table.find('tbody');
	this.createHeadingButtons();
	this.createStatusBox();
	this.table.on('click', 'th button', $.proxy(this, 'onSortButtonClick'));
};

MOJFrontend.SortableTable.prototype.setupOptions = function(params) {
	params = params || {};
	this.statusMessage = params.statusMessage || 'Sort by %heading% (%direction%)';
	this.ascendingText = params.ascendingText || 'ascending';
	this.descendingText = params.descendingText || 'descending';
};

MOJFrontend.SortableTable.prototype.createHeadingButtons = function() {
	var headings = this.table.find('thead th');
	var heading;
	for(var i = 0; i < headings.length; i++) {
		heading = $(headings[i]);
		if(heading.attr('aria-sort')) {
			this.createHeadingButton(heading, i);
		}
	}
};

MOJFrontend.SortableTable.prototype.createHeadingButton = function(heading, i) {
	var text = heading.text();
	var button = $('<button type="button" data-index="'+i+'">'+text+'</button>');
	heading.text('');
	heading.append(button);
};

MOJFrontend.SortableTable.prototype.createStatusBox = function() {
	this.status = $('<div aria-live="polite" role="status" aria-atomic="true" class="govuk-visually-hidden" />');
	this.table.parent().append(this.status);
};

MOJFrontend.SortableTable.prototype.onSortButtonClick = function(e) {
	var columnNumber = e.currentTarget.getAttribute('data-index');
	var sortDirection = $(e.currentTarget).parent().attr('aria-sort');
	var newSortDirection;
	if(sortDirection === 'none' || sortDirection === 'descending') {
		newSortDirection = 'ascending';
	} else {
		newSortDirection = 'descending';
	}
	var rows = this.getTableRowsArray();
	var sortedRows = this.sort(rows, columnNumber, newSortDirection);
	this.addRows(sortedRows);
	this.removeButtonStates();
	this.updateButtonState($(e.currentTarget), newSortDirection);
};

MOJFrontend.SortableTable.prototype.updateButtonState = function(button, direction) {
	button.parent().attr('aria-sort', direction);
	var message = this.statusMessage;
	message = message.replace(/%heading%/, button.text());
	message = message.replace(/%direction%/, this[direction+'Text']);
	this.status.text(message);
};

MOJFrontend.SortableTable.prototype.removeButtonStates = function() {
	this.table.find('thead th').attr('aria-sort', 'none');
};

MOJFrontend.SortableTable.prototype.addRows = function(rows) {
	for(var i = 0; i < rows.length; i++) {
		this.body.append(rows[i]);
	}
};

MOJFrontend.SortableTable.prototype.getTableRowsArray = function() {
	var rows = [];
	var trs = this.body.find('tr');
	for (var i = 0; i < trs.length; i++) {
		rows.push(trs[i]);
	}
    return rows;
};

MOJFrontend.SortableTable.prototype.sort = function(rows, columnNumber, sortDirection) {
	var newRows = rows.sort($.proxy(function(rowA, rowB) {
		var tdA = $(rowA).find('td').eq(columnNumber);
		var tdB = $(rowB).find('td').eq(columnNumber);
		var valueA = this.getCellValue(tdA);
		var valueB = this.getCellValue(tdB);
		if(sortDirection === 'ascending') {
			if(valueA < valueB) {
				return -1;
			}
			if(valueA > valueB) {
				return 1;
			}
			return 0;
		} else {
			if(valueB < valueA) {
				return -1;
			}
			if(valueB > valueA) {
				return 1;
			}
			return 0;
		}
	}, this));
	return newRows;
};

MOJFrontend.SortableTable.prototype.getCellValue = function(cell) {
	var val = cell.attr('data-sort-value');
	val = val || cell.html();
	if($.isNumeric(val)) {
		val = parseInt(val, 10);
	}
	return val;
};

return MOJFrontend;
}));
