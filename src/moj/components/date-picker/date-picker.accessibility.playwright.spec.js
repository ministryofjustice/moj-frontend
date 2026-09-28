const path = require('path')

const AxeBuilder = require('@axe-core/playwright').default
const { test, expect } = require('@playwright/test')

const { bundleComponent } = require('../../lib/bundle.js')
const { render, getExamples } = require('../../lib/components.js')

let bundledComponent

async function setupPage(page, examples, exampleName) {
  await page.setContent(render('date-picker', examples[exampleName], true))
  await page.addScriptTag({ content: bundledComponent, type: 'module' })
  await page.evaluate(() => {
    document
      .querySelectorAll('[data-module="moj-date-picker"]')
      .forEach(($datePicker) => {
        /* eslint-disable no-new, no-undef */
        // @ts-expect-error DatePicker is in page scope, not test scope
        new DatePicker($datePicker)
      })
  })
}

test.describe('date picker accessibility', () => {
  let examples

  test.beforeAll(async () => {
    examples = await getExamples('date-picker')
    bundledComponent = await bundleComponent(
      path.join(__dirname, 'date-picker.mjs'),
      'DatePicker'
    )
  })

  test.afterEach(async ({ page }) => {
    await page.setContent('')
  })

  for (const example of ['default', 'with value', 'with error']) {
    test(`${example} has no accessibility violations`, async ({ page }) => {
      await setupPage(page, examples, example)

      const component = page.locator('.moj-datepicker')
      const results = await new AxeBuilder({ page })
        .include('.moj-datepicker')
        .analyze()

      expect(results.violations).toEqual([])
      await component.getByRole('button', { name: 'Choose date' }).click()

      const openResults = await new AxeBuilder({ page })
        .include('.moj-datepicker')
        .analyze()
      expect(openResults.violations).toEqual([])
    })
  }
})
