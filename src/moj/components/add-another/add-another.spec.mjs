/* eslint-disable no-new */

import { getByLabelText, getByRole, queryByRole } from '@testing-library/dom'
import { userEvent } from '@testing-library/user-event'

import { AddAnother } from './add-another.mjs'

const user = userEvent.setup()

const createComponent = () => {
  const html = `
    <div data-module="moj-add-another">
      <h2 class="govuk-heading-l moj-add-another__heading" tabindex="-1">Add a person</h2>
      <form>
        <fieldset class="govuk-fieldset moj-add-another__item">
          <legend>Person</legend>
          <div class="govuk-form-group">
            <label for="person[0][first_name]">First name</label>
            <input class="govuk-input" id="person[0][first_name]" name="person[0][first_name]" type="text" data-name="person[%index%][first_name]" data-id="person[%index%][first_name]">
          </div>
          <div class="govuk-form-group">
            <label for="person[0][last_name]">Last name</label>
            <input class="govuk-input" id="person[0][last_name]" name="person[0][last_name]" type="text" data-name="person[%index%][last_name]" data-id="person[%index%][last_name]">
          </div>
        </fieldset>
        <button type="button" class="govuk-button moj-add-another__add-button">Add another person</button>
      </form>
    </div>`
  document.body.innerHTML = html
  const component = document.querySelector('[data-module="moj-add-another"]')
  return component
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
    const firstNameInput = getByLabelText(secondItem, 'First name')
    const lastNameInput = getByLabelText(secondItem, 'Last name')

    expect(firstNameInput.value).toBe('')
    expect(lastNameInput.value).toBe('')
  })

  test('resets form values in a new item', async () => {
    await user.click(addButton)

    const firstItem = component.querySelectorAll('.moj-add-another__item')[0]
    const firstItemFirstNameInput = getByLabelText(firstItem, 'First name')
    const firstItemLastNameInput = getByLabelText(firstItem, 'Last name')

    await user.type(firstItemFirstNameInput, 'Steve')
    await user.type(firstItemLastNameInput, 'Jobs')

    expect(firstItemFirstNameInput.value).toBe('Steve')
    expect(firstItemLastNameInput.value).toBe('Jobs')

    const secondItem = component.querySelectorAll('.moj-add-another__item')[1]
    const secondItemFirstNameInput = getByLabelText(secondItem, 'First name')
    const secondItemLastNameInput = getByLabelText(secondItem, 'Last name')

    expect(secondItemFirstNameInput.value).toBe('')
    expect(secondItemLastNameInput.value).toBe('')
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
