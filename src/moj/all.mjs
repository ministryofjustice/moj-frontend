/* eslint-disable no-new */

import { AddAnother } from './components/add-another/add-another.mjs'
import { ButtonMenu } from './components/button-menu/button-menu.mjs'
import { DatePicker } from './components/date-picker/date-picker.mjs'
import { FilterToggleButton } from './components/filter-toggle-button/filter-toggle-button.mjs'
import { MultiFileUpload } from './components/multi-file-upload/multi-file-upload.mjs'
import { MultiSelect } from './components/multi-select/multi-select.mjs'
import { PasswordReveal } from './components/password-reveal/password-reveal.mjs'
import { RichTextEditor } from './components/rich-text-editor/rich-text-editor.mjs'
import { SearchToggle } from './components/search-toggle/search-toggle.mjs'
import { SortableTable } from './components/sortable-table/sortable-table.mjs'
import { nodeListForEach } from './helpers.mjs'
import { version } from './version.mjs'

/**
 * @param {Config} [config]
 */
function initAll(config) {
  // Set the options to an empty object by default if no options are passed.
  config = typeof config !== 'undefined' ? config : {}

  // Allow the user to initialise MOJ Frontend in only certain sections of the page
  // Defaults to the entire document if nothing is set.
  const scope = typeof config.scope !== 'undefined' ? config.scope : document

  const $addAnothers = scope.querySelectorAll('[data-module="moj-add-another"]')

  nodeListForEach($addAnothers, function ($addAnother) {
    new AddAnother($addAnother)
  })

  const $multiSelects = scope.querySelectorAll(
    '[data-module="moj-multi-select"]'
  )

  nodeListForEach($multiSelects, function ($multiSelect) {
    const containerSelector = $multiSelect.getAttribute(
      'data-multi-select-checkbox'
    )

    if (!($multiSelect instanceof HTMLElement) || !containerSelector) {
      return
    }

    new MultiSelect({
      container: $multiSelect.querySelector(containerSelector),
      checkboxes: $multiSelect.querySelectorAll(
        'tbody .govuk-checkboxes__input'
      ),
      id_prefix: $multiSelect.getAttribute('data-multi-select-idprefix')
    })
  })

  const $passwordReveals = scope.querySelectorAll(
    '[data-module="moj-password-reveal"]'
  )

  nodeListForEach($passwordReveals, function ($passwordReveal) {
    new PasswordReveal($passwordReveal)
  })

  const $richTextEditors = scope.querySelectorAll(
    '[data-module="moj-rich-text-editor"]'
  )

  nodeListForEach($richTextEditors, function ($richTextEditor) {
    /** @type {RichTextEditorConfig} */
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

  nodeListForEach($searchToggles, function ($searchToggle) {
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

  nodeListForEach($sortableTables, function ($table) {
    new SortableTable({
      table: $table
    })
  })

  const $datepickers = scope.querySelectorAll('[data-module="moj-date-picker"]')

  nodeListForEach($datepickers, function ($datepicker) {
    if (!($datepicker instanceof HTMLElement)) {
      return
    }

    new DatePicker($datepicker, {}).init()
  })

  const $buttonMenus = scope.querySelectorAll('[data-module="moj-button-menu"]')

  nodeListForEach($buttonMenus, function ($buttonmenu) {
    if (!($buttonmenu instanceof HTMLElement)) {
      return
    }

    new ButtonMenu($buttonmenu, {}).init()
  })
}

export {
  initAll,
  version,

  // Components
  AddAnother,
  ButtonMenu,
  DatePicker,
  FilterToggleButton,
  MultiFileUpload,
  MultiSelect,
  PasswordReveal,
  RichTextEditor,
  SearchToggle,
  SortableTable
}

/**
 * @typedef {object} Config
 * @property {Element} [scope=document] - Scope to query for components
 */

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

/**
 * @import { RichTextEditorConfig } from './components/rich-text-editor/rich-text-editor.mjs'
 */
