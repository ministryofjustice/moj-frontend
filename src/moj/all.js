MOJFrontend.initAll = function (options) {
  // Set the options to an empty object by default if no options are passed.
  options = typeof options !== 'undefined' ? options : {}

  // Allow the user to initialise MOJ Frontend in only certain sections of the page
  // Defaults to the entire document if nothing is set.
  const scope = typeof options.scope !== 'undefined' ? options.scope : document

  const $addAnothers = scope.querySelectorAll('[data-module="moj-add-another"]')
  MOJFrontend.nodeListForEach($addAnothers, function ($addAnother) {
    new MOJFrontend.AddAnother($addAnother)
  })

  const $multiSelects = scope.querySelectorAll(
    '[data-module="moj-multi-select"]'
  )
  MOJFrontend.nodeListForEach($multiSelects, function ($multiSelect) {
    new MOJFrontend.MultiSelect({
      container: $multiSelect.querySelector(
        $multiSelect.getAttribute('data-multi-select-checkbox')
      ),
      checkboxes: $multiSelect.querySelectorAll(
        'tbody .govuk-checkboxes__input'
      ),
      id_prefix: $multiSelect.getAttribute('data-multi-select-idprefix')
    })
  })

  const $passwordReveals = scope.querySelectorAll(
    '[data-module="moj-password-reveal"]'
  )
  MOJFrontend.nodeListForEach($passwordReveals, function ($passwordReveal) {
    new MOJFrontend.PasswordReveal($passwordReveal)
  })

  const $richTextEditors = scope.querySelectorAll(
    '[data-module="moj-rich-text-editor"]'
  )
  MOJFrontend.nodeListForEach($richTextEditors, function ($richTextEditor) {
    const options = {
      textarea: $($richTextEditor)
    }

    const toolbarAttr = $richTextEditor.getAttribute(
      'data-moj-rich-text-editor-toolbar'
    )
    if (toolbarAttr) {
      const toolbar = toolbarAttr.split(',')
      options.toolbar = {}
      for (const item in toolbar) options.toolbar[toolbar[item]] = true
    }

    new MOJFrontend.RichTextEditor(options)
  })

  const $searchToggles = scope.querySelectorAll(
    '[data-module="moj-search-toggle"]'
  )
  MOJFrontend.nodeListForEach($searchToggles, function ($searchToggle) {
    new MOJFrontend.SearchToggle({
      toggleButton: {
        container: $($searchToggle.querySelector('.moj-search-toggle__toggle')),
        text: $searchToggle.getAttribute('data-moj-search-toggle-text')
      },
      search: {
        container: $($searchToggle.querySelector('.moj-search'))
      }
    })
  })

  const $sortableTables = scope.querySelectorAll(
    '[data-module="moj-sortable-table"]'
  )
  MOJFrontend.nodeListForEach($sortableTables, function ($table) {
    new MOJFrontend.SortableTable({
      table: $table
    })
  })

  const $datepickers = scope.querySelectorAll('[data-module="moj-date-picker"]')
  MOJFrontend.nodeListForEach($datepickers, function ($datepicker) {
    new MOJFrontend.DatePicker($datepicker, {}).init()
  })

  const $buttonMenus = scope.querySelectorAll('[data-module="moj-button-menu"]')
  MOJFrontend.nodeListForEach($buttonMenus, function ($buttonmenu) {
    new MOJFrontend.ButtonMenu($buttonmenu, {}).init()
  })
}
