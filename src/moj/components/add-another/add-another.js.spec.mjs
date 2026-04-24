/* eslint-disable no-new */

import { getByRole, queryByRole } from '@testing-library/dom'
import { outdent } from 'outdent'

import { AddAnother } from './add-another.mjs'

/**
 * Creates a minimal add-another component with no data-item-label or
 * data-layout attributes on the root element, so that config must be
 * supplied via the JavaScript constructor argument.
 *
 * @param {object} [config] - Config to pass to the AddAnother constructor
 * @returns {HTMLElement} The root component element
 */
function createComponentWithJSConfig(config = {}) {
  const html = outdent`
    <div data-module="moj-add-another">
      <div class="moj-add-another__items">
        <div class="moj-add-another__item">
          <fieldset class="govuk-fieldset moj-add-another__fieldset">
            <legend class="govuk-fieldset__legend govuk-fieldset__legend--m moj-add-another__item-title">
              Item
            </legend>
            <div class="moj-add-another__item-container">
              <div class="govuk-form-group">
                <label class="govuk-label" for="item[0][name]">Name</label>
                <input class="govuk-input"
                       id="item[0][name]"
                       name="item[0][name]"
                       type="text"
                       data-name="item[%index%][name]"
                       data-id="item[%index%][name]"
                       data-label="Name">
              </div>
              <div class="moj-add-another__remove-button-container"></div>
            </div>
          </fieldset>
        </div>
      </div>
      <div class="moj-add-another__add-button-container">
        <button type="button" class="govuk-button govuk-button--secondary moj-add-another__add-button">
          Add another item
        </button>
      </div>
    </div>
  `

  document.body.insertAdjacentHTML('afterbegin', html)

  const $root = /** @type {HTMLElement} */ (
    document.querySelector('[data-module="moj-add-another"]')
  )

  new AddAnother($root, config)

  return $root
}

describe('add another', () => {
  // ---------------------------------------------------------------------------
  // JavaScript config — itemLabel
  // ---------------------------------------------------------------------------

  describe('JS config — itemLabel', () => {
    let $component

    beforeEach(() => {
      $component = createComponentWithJSConfig({ itemLabel: 'Defendant' })
    })

    afterEach(() => {
      document.body.innerHTML = ''
    })

    test('does not require a data-item-label attribute on the root element', () => {
      // Confirms the component is sourcing itemLabel from the JS constructor
      // argument rather than the dataset. Legend text is updated via innerText
      // which is not reliable in jsdom — that behaviour is covered in the
      // playwright tests via accessible name assertions.
      expect($component).not.toHaveAttribute('data-item-label')
      expect($component).toHaveAttribute('data-moj-add-another-init')
    })

    test('uses the JS-provided itemLabel in field label suffixes', () => {
      const suffix = $component.querySelector('.moj-add-another__label-suffix')
      expect(suffix).toBeInTheDocument()
      expect(suffix).toHaveTextContent('for defendant 1')
    })

    test('uses the JS-provided itemLabel in remove button labels', () => {
      // Add a second item to make remove buttons appear
      getByRole($component, 'button', { name: /Add another/ }).click()

      const items = $component.querySelectorAll('.moj-add-another__item')
      const firstRemove = queryByRole(items[0], 'button', { name: /Remove/ })
      const secondRemove = queryByRole(items[1], 'button', { name: /Remove/ })

      expect(firstRemove).toHaveAccessibleName('Remove defendant 1')
      expect(secondRemove).toHaveAccessibleName('Remove defendant 2')
    })
  })

  // ---------------------------------------------------------------------------
  // JavaScript config — layout
  // ---------------------------------------------------------------------------

  describe('JS config — layout', () => {
    let $component

    beforeEach(() => {
      $component = createComponentWithJSConfig({
        itemLabel: 'Item',
        layout: 'inline'
      })
    })

    afterEach(() => {
      document.body.innerHTML = ''
    })

    test('uses the inline remove button label format when layout is passed via JS', () => {
      // Add a second item to make remove buttons appear
      getByRole($component, 'button', { name: /Add another/ }).click()

      const items = $component.querySelectorAll('.moj-add-another__item')
      const removeButton = queryByRole(items[0], 'button', { name: /Remove/ })

      // Inline format wraps the item index in a visually-hidden span so the
      // visible text is just "Remove" while screen readers read the full label
      expect(
        removeButton.querySelector('.govuk-visually-hidden')
      ).toBeInTheDocument()
    })

    test('stacked layout does not use visually-hidden spans in remove button labels', () => {
      // Default layout — no layout key passed, so falls back to static default
      const $stackedComponent = createComponentWithJSConfig({
        itemLabel: 'Item',
        layout: 'stacked'
      })

      getByRole($stackedComponent, 'button', { name: /Add another/ }).click()

      const items = $stackedComponent.querySelectorAll('.moj-add-another__item')
      const $firstItem = /** @type {HTMLElement} */ (items[0])
      const removeButton = queryByRole($firstItem, 'button', { name: /Remove/ })

      expect(
        removeButton.querySelector('.govuk-visually-hidden')
      ).not.toBeInTheDocument()
    })
  })
})
