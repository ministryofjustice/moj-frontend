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

  var $passwordReveals = scope.querySelectorAll('[data-module="moj-password-reveal"]');
  MOJFrontend.nodeListForEach($passwordReveals, function ($passwordReveal) {
    new MOJFrontend.PasswordReveal($passwordReveal);
  });
}
