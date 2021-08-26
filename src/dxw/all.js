dxwFrontend.initAll = function (options) {
  // Set the options to an empty object by default if no options are passed.
  options = typeof options !== 'undefined' ? options : {};

  // Allow the user to initialise MOJ Frontend in only certain sections of the page
  // Defaults to the entire document if nothing is set.
  var scope = typeof options.scope !== 'undefined' ? options.scope : document;

  var $addAnothers = scope.querySelectorAll('[data-module="moj-add-another"]');
  dxwFrontend.nodeListForEach($addAnothers, function ($addAnother) {
    new dxwFrontend.AddAnother($addAnother);
  });

  var $multiSelects = scope.querySelectorAll('[data-module="moj-multi-select"]');
  dxwFrontend.nodeListForEach($multiSelects, function ($multiSelect) {
    new dxwFrontend.MultiSelect({
      container: $multiSelect.querySelector($multiSelect.getAttribute('data-multi-select-checkbox')),
      checkboxes: $multiSelect.querySelectorAll('tbody .govuk-checkboxes__input')
    });
  });

  var $passwordReveals = scope.querySelectorAll('[data-module="moj-password-reveal"]');
  dxwFrontend.nodeListForEach($passwordReveals, function ($passwordReveal) {
    new dxwFrontend.PasswordReveal($passwordReveal);
  });

  var $richTextEditors = scope.querySelectorAll('[data-module="moj-rich-text-editor"]');
  dxwFrontend.nodeListForEach($richTextEditors, function ($richTextEditor) {
    var options = {
      textarea: $($richTextEditor)
    };

    var toolbarAttr = $richTextEditor.getAttribute('data-moj-rich-text-editor-toolbar');
    if (toolbarAttr) {
      var toolbar = toolbarAttr.split(',');
      options.toolbar = {};
      for (var item in toolbar) options.toolbar[toolbar[item]] = true;
    }

    new dxwFrontend.RichTextEditor(options);
  });

  var $searchToggles = scope.querySelectorAll('[data-module="moj-search-toggle"]');
  dxwFrontend.nodeListForEach($searchToggles, function ($searchToggle) {
    new dxwFrontend.SearchToggle({
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
  dxwFrontend.nodeListForEach($sortableTables, function ($table) {
    new dxwFrontend.SortableTable({
      table: $table
    });
  });

  var $sortableTables = scope.querySelectorAll('[data-module="moj-sortable-table"]');
  dxwFrontend.nodeListForEach($sortableTables, function ($table) {
    new dxwFrontend.SortableTable({
      table: $table
    });
  });
}
