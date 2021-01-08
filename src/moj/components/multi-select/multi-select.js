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
