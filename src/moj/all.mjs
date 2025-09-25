import { createAll } from 'govuk-frontend'

import { version } from './common/moj-frontend-version.mjs'
import { AddAnother } from './components/add-another/add-another.mjs'
import { Alert } from './components/alert/alert.mjs'
import { ButtonMenu } from './components/button-menu/button-menu.mjs'
import { DatePicker } from './components/date-picker/date-picker.mjs'
import { PdsHeader } from './components/domain-specific/probation/header/header.mjs'
import { FilterToggleButton } from './components/filter-toggle-button/filter-toggle-button.mjs'
import { FormValidator } from './components/form-validator/form-validator.mjs'
import { MultiFileUpload } from './components/multi-file-upload/multi-file-upload.mjs'
import { MultiSelect } from './components/multi-select/multi-select.mjs'
import { PasswordReveal } from './components/password-reveal/password-reveal.mjs'
import { RichTextEditor } from './components/rich-text-editor/rich-text-editor.mjs'
import { SearchToggle } from './components/search-toggle/search-toggle.mjs'
import { SortableTable } from './components/sortable-table/sortable-table.mjs'

/**
 * Initialise all components
 *
 * Use the `data-module` attributes to find, instantiate and init all of the
 * components provided as part of MOJ Frontend.
 *
 * @param {Config | Element | Document | null} [scopeOrConfig]
 */
function initAll(scopeOrConfig) {
  for (const Component of [
    AddAnother,
    Alert,
    ButtonMenu,
    DatePicker,
    MultiSelect,
    PasswordReveal,
    PdsHeader,
    RichTextEditor,
    SearchToggle,
    SortableTable
  ]) {
    createAll(Component, undefined, scopeOrConfig)
  }
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
  PdsHeader,
  RichTextEditor,
  SearchToggle,
  SortableTable
}

/**
 * Config for all components via `initAll()`
 *
 * @typedef {object} Config
 * @property {Element | Document | null } scope - the scope to search for components in
 */

/**
 * @import * as GOVUKFrontend from 'govuk-frontend'
 */
