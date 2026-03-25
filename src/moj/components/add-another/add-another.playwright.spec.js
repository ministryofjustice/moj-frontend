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
  headless: false
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

  test.describe('by default', () => {
    test.beforeAll(async () => {
      example = 'default'
    })
    test.afterAll(async () => {
      example = ''
    })

    test('initialises first item', async ({ page }) => {
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

      for (let i = 0; i < count; ++i) {
        const $item = $items.nth(i)
        const itemNumber = i + 1
        await expect($item).toHaveAccessibleName(
          `Person ${itemNumber} of ${count}`
        )
        await expect($item.getByLabel('Name')).toHaveAccessibleName(
          `Name for person ${itemNumber}`
        )
        await expect($item.getByRole('button')).toHaveAccessibleName(
          `Remove person ${itemNumber}`
        )
      }
    })

    test('removing items', async () => {
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
})
