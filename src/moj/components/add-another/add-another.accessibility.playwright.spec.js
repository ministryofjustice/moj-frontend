const path = require('path')

const AxeBuilder = require('@axe-core/playwright').default
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
    // @ts-expect-error AddAnother is in page scope not test scope
    new AddAnother($addAnother)
  })
}

/**
 * Renders a named fixture into the page, injects the bundled component script,
 * and initialises all add-another instances.
 *
 * @param {import('@playwright/test').Page} page
 * @param {Record<string, object>} examples
 * @param {string} exampleName
 */
async function setupPage(page, examples, exampleName) {
  const html = render('add-another', examples[exampleName])
  await page.setContent(html)

  await page.evaluate(() => {
    document.body.className += ` js-enabled ${'noModule' in HTMLScriptElement.prototype ? ' govuk-frontend-supported' : ''}`
  })

  await page.addScriptTag({
    content: bundledComponent,
    type: 'module'
  })

  await page.evaluate(initialiseAddAnothers)
}

test.use({
  headless: false
})

test.describe('add another accessibility', () => {
  let examples

  test.beforeAll(async () => {
    examples = await getExamples('add-another')
    bundledComponent = await bundleComponent(
      path.join(__dirname, 'add-another.mjs'),
      'AddAnother'
    )
  })

  test.afterEach(async ({ page }) => {
    await page.setContent('')
  })

  // ---------------------------------------------------------------------------
  // Static render state — one test per meaningful fixture variant
  // ---------------------------------------------------------------------------

  test('default — single item, stacked layout', async ({ page }) => {
    await setupPage(page, examples, 'default')

    const results = await new AxeBuilder({ page })
      .include('.moj-add-another')
      .analyze()
    expect(results.violations).toEqual([])
  })

  test('multiple items — three items, stacked layout', async ({ page }) => {
    await setupPage(page, examples, 'multiple items')

    const results = await new AxeBuilder({ page })
      .include('.moj-add-another')
      .analyze()
    expect(results.violations).toEqual([])
  })

  test('inline layout — single item', async ({ page }) => {
    await setupPage(page, examples, 'inline')

    const results = await new AxeBuilder({ page })
      .include('.moj-add-another')
      .analyze()
    expect(results.violations).toEqual([])
  })

  test('inline with multiple items', async ({ page }) => {
    await setupPage(page, examples, 'inline with multiple items')

    const results = await new AxeBuilder({ page })
      .include('.moj-add-another')
      .analyze()
    expect(results.violations).toEqual([])
  })

  test('stacked with errors', async ({ page }) => {
    await setupPage(page, examples, 'stacked with errors')

    const results = await new AxeBuilder({ page })
      .include('.moj-add-another')
      .analyze()
    expect(results.violations).toEqual([])
  })

  test('inline with errors', async ({ page }) => {
    await setupPage(page, examples, 'inline with errors')

    const results = await new AxeBuilder({ page })
      .include('.moj-add-another')
      .analyze()
    expect(results.violations).toEqual([])
  })

  test('custom item label', async ({ page }) => {
    await setupPage(page, examples, 'custom item label')

    const results = await new AxeBuilder({ page })
      .include('.moj-add-another')
      .analyze()
    expect(results.violations).toEqual([])
  })

  // ---------------------------------------------------------------------------
  // Dynamic states — test after user interaction
  // ---------------------------------------------------------------------------

  test('after adding an item', async ({ page }) => {
    await setupPage(page, examples, 'default')

    const $component = page.locator('[data-module="moj-add-another"]')
    await $component.getByRole('button', { name: /Add another/ }).click()

    const results = await new AxeBuilder({ page })
      .include('.moj-add-another')
      .analyze()
    expect(results.violations).toEqual([])
  })

  test('after adding multiple items', async ({ page }) => {
    await setupPage(page, examples, 'default')

    const $addButton = page
      .locator('[data-module="moj-add-another"]')
      .getByRole('button', { name: /Add another/ })

    await $addButton.click()
    await $addButton.click()

    const results = await new AxeBuilder({ page })
      .include('.moj-add-another')
      .analyze()
    expect(results.violations).toEqual([])
  })

  test('after removing an item', async ({ page }) => {
    await setupPage(page, examples, 'multiple items')

    const $component = page.locator('[data-module="moj-add-another"]')
    const $removeButtons = $component.getByRole('button', { name: /Remove/ })
    await $removeButtons.nth(1).click()

    const results = await new AxeBuilder({ page })
      .include('.moj-add-another')
      .analyze()
    expect(results.violations).toEqual([])
  })

  test('after removing down to a single item', async ({ page }) => {
    await setupPage(page, examples, 'default')

    const $component = page.locator('[data-module="moj-add-another"]')
    const $addButton = $component.getByRole('button', { name: /Add another/ })

    await $addButton.click()

    const $removeButtons = $component.getByRole('button', { name: /Remove/ })
    await $removeButtons.nth(0).click()

    const results = await new AxeBuilder({ page })
      .include('.moj-add-another')
      .analyze()
    expect(results.violations).toEqual([])
  })

  test('inline layout — after adding an item', async ({ page }) => {
    await setupPage(page, examples, 'inline')

    const $component = page.locator('[data-module="moj-add-another"]')
    await $component.getByRole('button', { name: /Add another/ }).click()

    const results = await new AxeBuilder({ page })
      .include('.moj-add-another')
      .analyze()
    expect(results.violations).toEqual([])
  })
})
