/* eslint-disable no-new */

import { version } from './common/moj-frontend-version.mjs'
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

/**
 * @param {Config} [config]
 */
function initAll(config) {
  // Set the config to an empty object by default if no config is passed.
  config = typeof config !== 'undefined' ? config : {}

  // Allow the user to initialise MOJ Frontend in only certain sections of the page
  // Defaults to the entire document if nothing is set.
  const scope = typeof config.scope !== 'undefined' ? config.scope : document

  const $addAnothers = scope.querySelectorAll('[data-module="moj-add-another"]')

  $addAnothers.forEach(($addAnother) => {
    new AddAnother($addAnother)
  })

  const $multiSelects = scope.querySelectorAll(
    '[data-module="moj-multi-select"]'
  )

  $multiSelects.forEach(($multiSelect) => {
    new MultiSelect($multiSelect)
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
    new RichTextEditor($richTextEditor)
  })

  const $searchToggles = scope.querySelectorAll(
    '[data-module="moj-search-toggle"]'
  )

  $searchToggles.forEach(($searchToggle) => {
    new SearchToggle($searchToggle)
  })

  const $sortableTables = scope.querySelectorAll(
    '[data-module="moj-sortable-table"]'
  )

  $sortableTables.forEach(($table) => {
    new SortableTable($table)
  })

  const $datePickers = scope.querySelectorAll('[data-module="moj-date-picker"]')

  $datePickers.forEach(($datePicker) => {
    new DatePicker($datePicker)
  })

  const $buttonMenus = scope.querySelectorAll('[data-module="moj-button-menu"]')

  $buttonMenus.forEach(($buttonmenu) => {
    new ButtonMenu($buttonmenu)
  })

  const $alerts = scope.querySelectorAll('[data-module="moj-alert"]')
  $alerts.forEach(($alert) => {
    new Alert($alert)
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
 * @typedef {object} Config
 * @property {Element} [scope=document] - Scope to query for components
 */
