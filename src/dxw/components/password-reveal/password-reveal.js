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
