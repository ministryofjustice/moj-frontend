/* eslint-disable no-new */

import { AddAnother } from './components/add-another/add-another.mjs'
import { Alert } from './components/alert/alert.mjs'
import { ButtonMenu } from './components/button-menu/button-menu.mjs'
import { DatePicker } from './components/date-picker/date-picker.mjs'
import { FilterToggleButton } from './components/filter-toggle-button/filter-toggle-button.mjs'
import { FormValidator } from './components/form-validator/form-validator.mjs'
import { MultiFileUpload } from './components/multi-file-upload/multi-file-upload.mjs'
import { MultiSelect } from './components/multi-select/multi-select.mjs'
import { PasswordReveal } from './components/password-reveal/password-reveal.mjs'
import { RichTextEditor } from './components/rich-text-editor/rich-text-editor.mjs'
import { SearchToggle } from './components/search-toggle/search-toggle.mjs'
import { SortableTable } from './components/sortable-table/sortable-table.mjs'
import { version } from './version.mjs'

function initAll(options) {
  // Set the options to an empty object by default if no options are passed.
  options = typeof options !== 'undefined' ? options : {}

  // Allow the user to initialise MOJ Frontend in only certain sections of the page
  // Defaults to the entire document if nothing is set.
  const scope = typeof options.scope !== 'undefined' ? options.scope : document

  const $addAnothers = scope.querySelectorAll('[data-module="moj-add-another"]')

  $addAnothers.forEach(($addAnother) => {
    new AddAnother($addAnother)
  })

  const $multiSelects = scope.querySelectorAll(
    '[data-module="moj-multi-select"]'
  )

  $multiSelects.forEach(($multiSelect) => {
    new MultiSelect({
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

  $passwordReveals.forEach(($passwordReveal) => {
    new PasswordReveal($passwordReveal)
  })

  const $richTextEditors = scope.querySelectorAll(
    '[data-module="moj-rich-text-editor"]'
  )

  $richTextEditors.forEach(($richTextEditor) => {
    const options = {
      textarea: $richTextEditor
    }

    const toolbarAttr = $richTextEditor.getAttribute(
      'data-moj-rich-text-editor-toolbar'
    )

    if (toolbarAttr) {
      const toolbar = toolbarAttr.split(',')

      options.toolbar = {}

      for (const item in toolbar) {
        options.toolbar[toolbar[item]] = true
      }
    }

    new RichTextEditor(options)
  })

  const $searchToggles = scope.querySelectorAll(
    '[data-module="moj-search-toggle"]'
  )

  $searchToggles.forEach(($searchToggle) => {
    new SearchToggle({
      toggleButton: {
        container: $searchToggle.querySelector('.moj-search-toggle__toggle'),
        text: $searchToggle.getAttribute('data-moj-search-toggle-text')
      },
      search: {
        container: $searchToggle.querySelector('.moj-search')
      }
    })
  })

  const $sortableTables = scope.querySelectorAll(
    '[data-module="moj-sortable-table"]'
  )

  $sortableTables.forEach(($table) => {
    new SortableTable({
      table: $table
    })
  })

  const $datePickers = scope.querySelectorAll('[data-module="moj-date-picker"]')

  $datePickers.forEach(($datePicker) => {
    new DatePicker($datePicker).init()
  })

  const $buttonMenus = scope.querySelectorAll('[data-module="moj-button-menu"]')

  $buttonMenus.forEach(($buttonmenu) => {
    new ButtonMenu($buttonmenu).init()
  })

  const $alerts = scope.querySelectorAll('[data-module="moj-alert"]')
  $alerts.forEach(($alert) => {
    new Alert($alert).init()
  })
}

export {
  initAll,
  version,

  // Components
  AddAnother,
  Alert,
  ButtonMenu,
  DatePicker,
  FilterToggleButton,
  FormValidator,
  MultiFileUpload,
  MultiSelect,
  PasswordReveal,
  RichTextEditor,
  SearchToggle,
  SortableTable
}

/**
 * Schema for component config
 *
 * @typedef {object} Schema
 * @property {{ [field: string]: SchemaProperty | undefined }} properties - Schema properties
 */

/**
 * Schema property for component config
 *
 * @typedef {object} SchemaProperty
 * @property {'string' | 'boolean' | 'number' | 'object'} type - Property type
 */
