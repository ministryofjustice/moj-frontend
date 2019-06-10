MOJFrontend.MultiSelect = function(options) {
  this.container = options.container;
  this.toggle = $(this.getToggleHtml());
  this.toggle.on('click', $.proxy(this, 'onButtonClick'))
  this.container.append(this.toggle);
  this.checkboxes = options.checkboxes;
  this.checked = options.checked || false;
};

MOJFrontend.MultiSelect.prototype.getToggleHtml = function() {
  var html = '';
  html += '<div class="govuk-checkboxes__item govuk-checkboxes--small">';
  html += '  <input type="checkbox" class="govuk-checkboxes__input" id="checkboxes-all">'
  html += '  <label class="govuk-label govuk-checkboxes__label" for="checkboxes-all">'
  html += '    <span class="govuk-visually-hidden">Select all</span>'
  html += '  </label>'
  html += '</div>';
  return html;
};

MOJFrontend.MultiSelect.prototype.onButtonClick = function(e) {
  if(this.checked) {
    this.uncheckAll();
    this.toggle.checked = false;
  } else {
    this.checkAll();
    this.toggle.checked = true;
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