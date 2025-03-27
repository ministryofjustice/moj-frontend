import { createAll } from 'govuk-frontend'

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
  for (const Component of [
    AddAnother,
    Alert,
    ButtonMenu,
    DatePicker,
    MultiSelect,
    PasswordReveal,
    RichTextEditor,
    SearchToggle,
    SortableTable
  ]) {
    createAll(Component, undefined, config)
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
  RichTextEditor,
  SearchToggle,
  SortableTable
}

/**
 * @typedef {Parameters<typeof GOVUKFrontend.initAll>[0]} Config
 */

/**
 * @import * as GOVUKFrontend from 'govuk-frontend'
 */
