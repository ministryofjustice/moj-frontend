const path = require('path')

const { test, expect } = require('@playwright/test')

const { bundleComponent } = require('../../lib/bundle.js')
const { render, getExamples } = require('../../lib/components.js')

let bundledComponent

const initialiseAddAnothers = () => {
  const $addAnothers = document.querySelectorAll(
    '[data-module="moj-add-another"]'
  )
  $addAnothers.forEach(($addAnother) => {
    /* eslint-disable no-new, no-undef */
    // @ts-expect-error Alert is in page scope not test scope
    new AddAnother($addAnother)
  })
}

test.use({
  headless: true
})

test.describe('add another', () => {
  let examples
  let example = ''
  let $component
  let $addButton
  let $items

  test.beforeAll(async () => {
    examples = await getExamples('add-another')
    bundledComponent = await bundleComponent(
      path.join(__dirname, 'add-another.mjs'),
      'AddAnother'
    )
  })

  test.beforeEach(async ({ page }) => {
    // Render component and insert into page
    const html = render('add-another', examples[example])
    await page.setContent(html)

    // Set classes for GOVUK Frontend support
    await page.evaluate(() => {
      document.body.className += ` js-enabled ${'noModule' in HTMLScriptElement.prototype ? ' govuk-frontend-supported' : ''}`
    })

    // Add bundled component code
    await page.addScriptTag({
      content: bundledComponent,
      type: 'module'
    })

    // Initialise component(s)
    await page.evaluate(initialiseAddAnothers)

    $component = page.locator('[data-module="moj-add-another"]')
    $addButton = $component.getByRole('button', { name: /Add another/ })
    $items = $component.getByRole('group')
  })

  test.afterEach(async ({ page }) => {
    await page.setContent('')
  })

  // ---------------------------------------------------------------------------
  // Default (single item, stacked)
  // ---------------------------------------------------------------------------

  test.describe('by default', () => {
    test.beforeAll(async () => {
      example = 'default'
    })
    test.afterAll(async () => {
      example = ''
    })

    test('initialises first item', async () => {
      const $removeButton = $component.getByRole('button', { name: /Remove/ })

      await expect($component).toHaveAttribute('data-moj-add-another-init')
      await expect($component).toBeVisible()
      await expect($addButton).toBeVisible()
      await expect($removeButton).not.toBeAttached()
      await expect($items).toHaveCount(1)
      for (const $item of await $component.getByRole('group').all()) {
        await expect($item).toHaveAccessibleName('Person 1')
        await expect($item.getByLabel('Name')).toHaveAccessibleName(
          'Name for person 1'
        )
      }
    })

    test('adds another item', async () => {
      await $addButton.click()
      const $removeButtons = $component.getByRole('button', { name: /Remove/ })

      await expect($items).toHaveCount(2)
      await expect($removeButtons).toHaveCount(2)
      const count = await $items.count()

      await expect($items.nth(0)).toHaveAccessibleName(`Person 1 of 2`)

      await expect($items.nth(1)).toHaveAccessibleName(`Person 2 of 2(added)`)

      for (let i = 0; i < count; ++i) {
        const $item = $items.nth(i)
        const itemNumber = i + 1

        await expect($item.getByLabel('Name')).toHaveAccessibleName(
          `Name for person ${itemNumber}`
        )
        await expect($item.getByRole('button')).toHaveAccessibleName(
          `Remove person ${itemNumber}`
        )
      }
    })

    test('removing items', async ({ page }) => {
      const names = ['Jane Smith', 'John Baines', 'Janet Morris']

      // add two items so there are three in total
      await $addButton.click()
      await $addButton.click()
      const $removeButtons = $component.getByRole('button', { name: /Remove/ })

      await expect($items).toHaveCount(3)
      await expect($removeButtons).toHaveCount(3)
      const count = await $items.count()

      // fill in names for each item
      for (let i = 0; i < count; ++i) {
        const $item = $items.nth(i)
        const $input = $item.getByLabel('Name')
        await $input.fill(names[i])
      }

      // click remove on the second item
      await $removeButtons.nth(1).click()

      await expect($items).toHaveCount(2)
      await expect($removeButtons).toHaveCount(2)

      $items = $component.getByRole('group')

      // check the correct item was removed and the remaining items were updated
      await expect($items.nth(0)).toHaveAccessibleName('Person 1 of 2')
      await expect($items.nth(0).getByLabel('Name')).toHaveAccessibleName(
        'Name for person 1'
      )
      await expect($items.nth(0).getByLabel('Name')).toHaveValue('Jane Smith')

      await expect($items.nth(1)).toHaveAccessibleName('Person 2 of 2')
      await expect($items.nth(1).getByLabel('Name')).toHaveAccessibleName(
        'Name for person 2'
      )
      await expect($items.nth(1).getByLabel('Name')).toHaveValue('Janet Morris')

      // click remove on the first item
      await $removeButtons.nth(0).click()

      // check there is only one item left, and that the removeButton is no
      // longer visible.
      await expect($items).toHaveCount(1)
      await expect($removeButtons).toHaveCount(0)
      await expect($items.nth(0)).toHaveAccessibleName('Person 1')
      await expect($items.nth(0).getByLabel('Name')).toHaveAccessibleName(
        'Name for person 1'
      )
      await expect($items.nth(0).getByLabel('Name')).toHaveValue('Janet Morris')
    })
  })

  // ---------------------------------------------------------------------------
  // Multiple items (pre-rendered)
  // ---------------------------------------------------------------------------

  test.describe('multiple items', () => {
    test.beforeAll(async () => {
      example = 'multiple items'
    })
    test.afterAll(async () => {
      example = ''
    })

    test('shows remove buttons on all items', async () => {
      const $removeButtons = $component.getByRole('button', { name: /Remove/ })
      await expect($items).toHaveCount(3)
      await expect($removeButtons).toHaveCount(3)
    })

    test('sets accessible names to include total count', async () => {
      await expect($items.nth(0)).toHaveAccessibleName('Person 1 of 3')
      await expect($items.nth(1)).toHaveAccessibleName('Person 2 of 3')
      await expect($items.nth(2)).toHaveAccessibleName('Person 3 of 3')
    })

    test('reorders accessible names after removing the middle item', async () => {
      const $removeButtons = $component.getByRole('button', { name: /Remove/ })
      await $removeButtons.nth(1).click()

      await expect($items).toHaveCount(2)
      await expect($items.nth(0)).toHaveAccessibleName('Person 1 of 2')
      await expect($items.nth(1)).toHaveAccessibleName('Person 2 of 2')
    })

    test('removes all remove buttons when reduced to a single item', async () => {
      const $removeButtons = $component.getByRole('button', { name: /Remove/ })

      await $removeButtons.nth(0).click()
      await $removeButtons.nth(0).click()

      await expect($items).toHaveCount(1)
      await expect(
        $component.getByRole('button', { name: /Remove/ })
      ).toHaveCount(0)
      await expect($items.nth(0)).toHaveAccessibleName('Person 1')
    })
  })

  // ---------------------------------------------------------------------------
  // Inline layout
  // ---------------------------------------------------------------------------

  test.describe('inline layout', () => {
    test.beforeAll(async () => {
      example = 'inline'
    })
    test.afterAll(async () => {
      example = ''
    })

    test('adds another item', async () => {
      await $addButton.click()

      await expect($items).toHaveCount(2)
      await expect($items.nth(0)).toHaveAccessibleName('Person 1 of 2')
      await expect($items.nth(1)).toHaveAccessibleName('Person 2 of 2(added)')
    })

    test('remove button uses visually hidden text to identify the item', async () => {
      await $addButton.click()
      const $removeButtons = $component.getByRole('button', { name: /Remove/ })
      await expect($removeButtons).toHaveCount(2)

      // Accessible name should include the item index even though the
      // visible text is just "Remove"
      await expect($removeButtons.nth(0)).toHaveAccessibleName(
        'Remove person 1'
      )
      await expect($removeButtons.nth(1)).toHaveAccessibleName(
        'Remove person 2'
      )
    })

    test('removing an item reorders the remaining items', async () => {
      await $addButton.click()
      await $addButton.click()
      const $removeButtons = $component.getByRole('button', { name: /Remove/ })

      await $removeButtons.nth(1).click()

      await expect($items).toHaveCount(2)
      await expect($items.nth(0)).toHaveAccessibleName('Person 1 of 2')
      await expect($items.nth(1)).toHaveAccessibleName('Person 2 of 2')
    })
  })

  // ---------------------------------------------------------------------------
  // Inline layout with errors
  // ---------------------------------------------------------------------------

  test.describe('inline with errors', () => {
    test.beforeAll(async () => {
      example = 'inline with errors'
    })
    test.afterAll(async () => {
      example = ''
    })

    test('renders the item-level error message', async ({ page }) => {
      const $errorMessage = page.locator('.govuk-error-message')
      await expect($errorMessage).toBeVisible()
      await expect($errorMessage).toContainText('Enter last name for person 2')
    })

    test('removing the item with errors removes its error link from the error summary', async ({
      page
    }) => {
      // Add a synthetic error summary matching the inline-errors example pattern
      await page.evaluate(() => {
        const summary = document.createElement('div')
        summary.className = 'govuk-error-summary'
        summary.innerHTML = `
          <div class="govuk-error-summary__body">
            <ul class="govuk-list govuk-error-summary__list">
              <li><a href="#person[1][last_name]">Enter last name for person 2</a></li>
            </ul>
          </div>
        `
        document.body.prepend(summary)
      })

      const $removeButtons = $component.getByRole('button', { name: /Remove/ })
      // Remove the second item (which has the error)
      await $removeButtons.nth(1).click()

      const $errorSummary = page.locator('.govuk-error-summary')
      await expect($errorSummary).not.toBeAttached()
    })

    test('remaining items are renumbered after removing the errored item', async () => {
      const $removeButtons = $component.getByRole('button', { name: /Remove/ })
      await $removeButtons.nth(1).click()

      await expect($items).toHaveCount(1)
      await expect($items.nth(0)).toHaveAccessibleName('Person 1')
    })
  })

  // ---------------------------------------------------------------------------
  // Stacked layout with errors
  // ---------------------------------------------------------------------------

  test.describe('stacked with errors', () => {
    test.beforeAll(async () => {
      example = 'stacked with errors'
    })
    test.afterAll(async () => {
      example = ''
    })

    test('shows existing error messages before any interaction', async ({
      page
    }) => {
      const $errorMessages = page.locator('.govuk-error-message')
      await expect($errorMessages).toHaveCount(2)
    })

    test('adds a new item with no error messages', async () => {
      await $addButton.click()

      const $newItem = $items.nth(2)
      await expect($newItem).toHaveAccessibleName('Person 3 of 3(added)')
      await expect($newItem.locator('.govuk-error-message')).toHaveCount(0)
      await expect($newItem.locator('.govuk-input--error')).toHaveCount(0)
      await expect($newItem.locator('.govuk-form-group--error')).toHaveCount(0)
    })

    test('new item inputs are empty', async () => {
      await $addButton.click()

      const $newItem = $items.nth(2)
      const inputs = $newItem.locator('input')
      const count = await inputs.count()
      for (let i = 0; i < count; i++) {
        await expect(inputs.nth(i)).toHaveValue('')
      }
    })
  })

  // ---------------------------------------------------------------------------
  // Custom item label
  // ---------------------------------------------------------------------------

  test.describe('custom item label', () => {
    test.beforeAll(async () => {
      example = 'custom item label'
    })
    test.afterAll(async () => {
      example = ''
    })

    test('uses the custom label in the add button text', async () => {
      await expect(
        $component.getByRole('button', { name: 'Add another address' })
      ).toBeVisible()
    })

    test('uses the custom label in item accessible names', async () => {
      await $addButton.click()

      await expect($items.nth(0)).toHaveAccessibleName('Address 1 of 2')
      await expect($items.nth(1)).toHaveAccessibleName('Address 2 of 2(added)')
    })

    test('uses the custom label in remove button accessible names', async () => {
      await $addButton.click()
      const $removeButtons = $component.getByRole('button', { name: /Remove/ })

      await expect($removeButtons.nth(0)).toHaveAccessibleName(
        'Remove address 1'
      )
      await expect($removeButtons.nth(1)).toHaveAccessibleName(
        'Remove address 2'
      )
    })

    test('uses the custom label in field label suffixes', async () => {
      // The visually-hidden suffix should read "for address 1"
      await expect(
        $items.nth(0).getByLabel('Address line 1')
      ).toHaveAccessibleName('Address line 1 for address 1')
    })
  })

  // ---------------------------------------------------------------------------
  // Focus management
  // ---------------------------------------------------------------------------

  test.describe('focus management', () => {
    test.beforeAll(async () => {
      example = 'default'
    })
    test.afterAll(async () => {
      example = ''
    })

    test('moves focus to the new item fieldset after adding', async () => {
      await $addButton.click()

      const $newFieldset = $items.nth(1)
      await expect($newFieldset).toBeFocused({ timeout: 500 })
    })

    test('moves focus to the previous item fieldset after removing', async () => {
      await $addButton.click()

      const $removeButtons = $component.getByRole('button', { name: /Remove/ })
      // Remove the second item — focus should go to the first item's fieldset
      await $removeButtons.nth(1).click()

      const $firstFieldset = $items.nth(0)
      await expect($firstFieldset).toBeFocused()
    })
  })
})
