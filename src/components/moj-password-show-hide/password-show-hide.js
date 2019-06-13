MOJFrontend.PasswordShowHide = function(element) {
  this.el = element;
  $(this.el).wrap('<div class="moj-password-show-hide"></div>');
  this.container = $(this.el).parent();
  this.createButton();
};

MOJFrontend.PasswordShowHide.prototype.createButton = function() {
  this.button = $('<button type="button" class="govuk-button govuk-button--secondary moj-password-show-hide__button">Show</button>');
  this.container.append(this.button);
  this.button.on('click', $.proxy(this, 'onButtonClick'));
};

MOJFrontend.PasswordShowHide.prototype.onButtonClick = function() {
  if (this.el.type === 'password') {
    this.el.type = 'text';
    this.button.text('Hide');
  } else {
    this.el.type = 'password';
    this.button.text('Show');
  }
};