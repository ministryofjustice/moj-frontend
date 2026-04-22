/* eslint-disable no-new */

import { getByLabelText, getByRole, queryByRole } from '@testing-library/dom'
import { userEvent } from '@testing-library/user-event'
import { outdent } from 'outdent'

import { AddAnother } from './add-another.mjs'

const user = userEvent.setup()

function createComponent() {
  const html = outdent`
    <div data-module="moj-add-another">
      <h2 class="govuk-heading-l moj-add-another__heading" tabindex="-1">Add a person</h2>
      <form>
        <fieldset class="govuk-fieldset moj-add-another__item">
          <legend>Person</legend>
          <div class="govuk-form-group">
            <label for="person[0][title]">Title</label>
            <select class="govuk-select" id="person[0][title]" name="person[0][title]" data-name="person[%index%][title]" data-id="person[%index%][title]">
              <option></option>
              <option>Mr</option>
              <option>Mrs</option>
              <option>Miss</option>
              <option>Ms</option>
            </select>
          </div>
          <div class="govuk-form-group">
            <label for="person[0][first_name]">First name</label>
            <input class="govuk-input" id="person[0][first_name]" name="person[0][first_name]" type="text" data-name="person[%index%][first_name]" data-id="person[%index%][first_name]">
          </div>
          <div class="govuk-form-group">
            <label for="person[0][last_name]">Last name</label>
            <input class="govuk-input" id="person[0][last_name]" name="person[0][last_name]" type="text" data-name="person[%index%][last_name]" data-id="person[%index%][last_name]">
          </div>
          <div class="govuk-form-group">
            <label for="person[0][bio]">Bio</label>
            <textarea class="govuk-textarea" id="person[0][bio]" name="person[0][bio]" data-name="person[%index%][bio]" data-id="person[%index%][bio]"></textarea>
          </div>
<div class="govuk-form-group">
  <fieldset class="govuk-fieldset">
    <legend class="govuk-fieldset__legend govuk-fieldset__legend--l">
      <h3 class="govuk-fieldset__heading">
        Have you changed your name?
      </h3>
    </legend>
    <div class="govuk-radios govuk-radios--inline" data-module="govuk-radios">
      <div class="govuk-radios__item">
        <input class="govuk-radios__input" id="person[0][changedName]-yes" name="person[0][changedName]" type="radio" value="yes" data-name="person[%index%][changedName]" data-id="person[%index%][changedName]-yes">
        <label class="govuk-label govuk-radios__label" for="person[0][changedName]-yes">
          Yes
        </label>
      </div>
      <div class="govuk-radios__item">
        <input class="govuk-radios__input" id="person[0][changedName]-no" name="person[0][changedName]" type="radio" value="no" data-name="person[%index%][changedName]" data-id="person[%index%][changedName]-no">
        <label class="govuk-label govuk-radios__label" for="person[0][changedName]-no">
          No
        </label>
      </div>
    </div>
  </fieldset>
</div>
<div class="govuk-form-group">
  <fieldset class="govuk-fieldset" aria-describedby="contact-hint">
    <legend class="govuk-fieldset__legend govuk-fieldset__legend--l">
      <h3 class="govuk-fieldset__heading">
        How would you like to be contacted?
      </h3>
    </legend>
    <div id="contact-hint" class="govuk-hint">
      Select all options that are relevant to you
    </div>
    <div class="govuk-checkboxes" data-module="govuk-checkboxes">
      <div class="govuk-checkboxes__item">
        <input class="govuk-checkboxes__input" id="person[0][contact]-email" name="person[0][contact]" type="checkbox" value="email" data-name="person[%index%][contact]" data-id="person[%index%][contact]-email">
        <label class="govuk-label govuk-checkboxes__label" for="person[0][contact]-email">
          Email
        </label>
      </div>
      <div class="govuk-checkboxes__item">
        <input class="govuk-checkboxes__input" id="person[0][contact]-phone" name="person[0][contact]" type="checkbox" value="phone" data-name="person[%index%][contact]" data-id="person[%index%][contact]-phone">
        <label class="govuk-label govuk-checkboxes__label" for="person[0][contact]-phone">
          Phone
        </label>
      </div>
  </fieldset>
</div>
        </fieldset>
        <button type="button" class="govuk-button moj-add-another__add-button">Add another person</button>
      </form>
    </div>
  `

  document.body.insertAdjacentHTML('afterbegin', html)

  return /** @type {HTMLElement} */ (
    document.querySelector('[data-module="moj-add-another"]')
  )
}

describe('Add Another component', () => {
  let component
  let addButton

  beforeEach(() => {
    component = createComponent()
    new AddAnother(component)
    addButton = getByRole(component, 'button', { name: 'Add another person' })
  })

  afterEach(() => {
    document.body.innerHTML = ''
  })

  test('adds a new item when "Add another person" is clicked', async () => {
    const initialItems = component.querySelectorAll('.moj-add-another__item')
    expect(initialItems).toHaveLength(1)

    await user.click(addButton)

    const updatedItems = component.querySelectorAll('.moj-add-another__item')
    expect(updatedItems).toHaveLength(2)

    const secondItemFirstName = updatedItems[1].querySelector(
      '[name="person[1][first_name]"]'
    )
    expect(secondItemFirstName).toBeInTheDocument()
    expect(secondItemFirstName.value).toBe('')

    const secondItemTitle = updatedItems[1].querySelector(
      '[name="person[1][title]"]'
    )
    expect(secondItemTitle).toBeInTheDocument()
    expect(secondItemTitle.value).toBe('')

    const secondItemBio = updatedItems[1].querySelector(
      '[name="person[1][bio]"]'
    )
    expect(secondItemBio).toBeInTheDocument()
    expect(secondItemBio.value).toBe('')

    const secondItemRadios = updatedItems[1].querySelectorAll(
      '[name="person[1][changedName]"]'
    )
    expect(secondItemRadios).toHaveLength(2)
    secondItemRadios.forEach((radio) => {
      expect(radio).not.toBeChecked()
    })

    const secondItemCheckboxes = updatedItems[1].querySelectorAll(
      '[name="person[1][contact]"]'
    )
    expect(secondItemCheckboxes).toHaveLength(2)
    secondItemCheckboxes.forEach((checkbox) => {
      expect(checkbox).not.toBeChecked()
    })
  })

  test('adds a remove button to new items', async () => {
    await user.click(addButton)

    const firstItem = component.querySelectorAll('.moj-add-another__item')[0]
    const secondItem = component.querySelectorAll('.moj-add-another__item')[1]
    const firstItemRemoveButton = getByRole(firstItem, 'button', {
      name: 'Remove'
    })
    const secondItemRemoveButton = getByRole(secondItem, 'button', {
      name: 'Remove'
    })

    expect(firstItemRemoveButton).toBeInTheDocument()
    expect(secondItemRemoveButton).toBeInTheDocument()
  })

  test('removes an item when the "Remove" button is clicked', async () => {
    await user.click(addButton)

    const secondItem = component.querySelectorAll('.moj-add-another__item')[1]
    const removeButton = getByRole(secondItem, 'button', { name: 'Remove' })

    await user.click(removeButton)

    const remainingItems = component.querySelectorAll('.moj-add-another__item')

    expect(remainingItems).toHaveLength(1)
    expect(
      queryByRole(component, 'button', { name: 'Remove' })
    ).not.toBeInTheDocument()
  })

  test('new item inputs have no value', async () => {
    await user.click(addButton)

    const secondItem = component.querySelectorAll('.moj-add-another__item')[1]
    const titleSelect = getByLabelText(secondItem, 'Title')
    const firstNameInput = getByLabelText(secondItem, 'First name')
    const lastNameInput = getByLabelText(secondItem, 'Last name')
    const bioTextArea = getByLabelText(secondItem, 'Bio')
    const changedNameRadiosYes = getByLabelText(secondItem, 'Yes')
    const changedNameRadiosNo = getByLabelText(secondItem, 'No')
    const contactCheckboxesEmail = getByLabelText(secondItem, 'Email')
    const contactCheckboxesPhone = getByLabelText(secondItem, 'Phone')

    expect(titleSelect).toHaveValue('')
    expect(firstNameInput).toHaveValue('')
    expect(lastNameInput).toHaveValue('')
    expect(bioTextArea).toHaveValue('')
    expect(changedNameRadiosYes).not.toBeChecked()
    expect(changedNameRadiosNo).not.toBeChecked()
    expect(contactCheckboxesEmail).not.toBeChecked()
    expect(contactCheckboxesPhone).not.toBeChecked()
  })

  test('resets form values in a new item', async () => {
    await user.click(addButton)

    const firstItem = component.querySelectorAll('.moj-add-another__item')[0]
    const firstItemTitleSelect = getByLabelText(firstItem, 'Title')
    const firstItemFirstNameInput = getByLabelText(firstItem, 'First name')
    const firstItemLastNameInput = getByLabelText(firstItem, 'Last name')
    const firstItemBioTextArea = getByLabelText(firstItem, 'Bio')
    const firstItemChangedNameYes = getByLabelText(firstItem, 'Yes')
    const firstItemChangedNameNo = getByLabelText(firstItem, 'No')
    const firstItemContactEmail = getByLabelText(firstItem, 'Email')
    const firstItemContactPhone = getByLabelText(firstItem, 'Phone')

    await user.selectOptions(firstItemTitleSelect, 'Mrs')
    await user.type(firstItemFirstNameInput, 'Steve')
    await user.type(firstItemLastNameInput, 'Jobs')
    await user.type(firstItemBioTextArea, 'Apple')
    await user.click(firstItemChangedNameYes)
    await user.click(firstItemContactEmail)
    await user.click(firstItemContactPhone)

    expect(firstItemTitleSelect).toHaveValue('Mrs')
    expect(firstItemFirstNameInput).toHaveValue('Steve')
    expect(firstItemLastNameInput).toHaveValue('Jobs')
    expect(firstItemBioTextArea).toHaveValue('Apple')
    expect(firstItemChangedNameYes).toBeChecked()
    expect(firstItemChangedNameNo).not.toBeChecked()
    expect(firstItemContactEmail).toBeChecked()
    expect(firstItemContactPhone).toBeChecked()

    const secondItem = component.querySelectorAll('.moj-add-another__item')[1]
    const secondItemTitleSelect = getByLabelText(secondItem, 'Title')
    const secondItemFirstNameInput = getByLabelText(secondItem, 'First name')
    const secondItemLastNameInput = getByLabelText(secondItem, 'Last name')
    const secondItemBioTextArea = getByLabelText(secondItem, 'Bio')
    const secondItemChangedNameYes = getByLabelText(secondItem, 'Yes')
    const secondItemChangedNameNo = getByLabelText(secondItem, 'No')
    const secondItemContactEmail = getByLabelText(secondItem, 'Email')
    const secondItemContactPhone = getByLabelText(secondItem, 'Phone')

    expect(secondItemTitleSelect).toHaveValue('')
    expect(secondItemFirstNameInput).toHaveValue('')
    expect(secondItemLastNameInput).toHaveValue('')
    expect(secondItemBioTextArea).toHaveValue('')
    expect(secondItemChangedNameYes).not.toBeChecked()
    expect(secondItemChangedNameNo).not.toBeChecked()
    expect(secondItemContactEmail).not.toBeChecked()
    expect(secondItemContactPhone).not.toBeChecked()
  })

  test('focuses the heading after removing an item', async () => {
    await user.click(addButton)

    const heading = queryByRole(component, 'heading', { level: 2 })
    const secondItem = component.querySelectorAll('.moj-add-another__item')[1]
    const removeButton = getByRole(secondItem, 'button', { name: 'Remove' })

    await user.click(removeButton)

    expect(heading).toHaveFocus()
  })

  test('updates attributes correctly after removing an item', async () => {
    await user.click(addButton)
    await user.click(addButton)

    const secondItem = component.querySelectorAll('.moj-add-another__item')[1]
    const removeButton = getByRole(secondItem, 'button', { name: 'Remove' })

    await user.click(removeButton)

    const remainingItems = component.querySelectorAll('.moj-add-another__item')
    remainingItems.forEach((item, index) => {
      const firstNameInput = item.querySelector(
        `[name="person[${index}][first_name]"]`
      )
      const lastNameInput = item.querySelector(
        `[name="person[${index}][last_name]"]`
      )
      expect(firstNameInput).toBeInTheDocument()
      expect(lastNameInput).toBeInTheDocument()
    })
  })
})
