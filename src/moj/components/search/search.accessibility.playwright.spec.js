const AxeBuilder = require('@axe-core/playwright').default
const { test, expect } = require('@playwright/test')

const { render, getExamples } = require('../../lib/components.js')

/**
 * Renders a named search fixture into the page.
 *
 * @param {import('@playwright/test').Page} page
 * @param {Record<string, object>} examples
 * @param {string} exampleName
 */
async function setupPage(page, examples, exampleName) {
  const html = render('search', examples[exampleName])
  await page.setContent(html)
}

test.describe('search accessibility', () => {
  let examples

  test.beforeAll(async () => {
    examples = await getExamples('search')
  })

  test.afterEach(async ({ page }) => {
    await page.setContent('')
  })

  test('default — inline layout', async ({ page }) => {
    await setupPage(page, examples, 'default')

    const results = await new AxeBuilder({ page })
      .include('.moj-search')
      .analyze()
    expect(results.violations).toEqual([])
  })

  test('stacked layout', async ({ page }) => {
    await setupPage(page, examples, 'stacked layout')

    const results = await new AxeBuilder({ page })
      .include('.moj-search')
      .analyze()
    expect(results.violations).toEqual([])
  })

  test('with label', async ({ page }) => {
    await setupPage(page, examples, 'with label')

    const results = await new AxeBuilder({ page })
      .include('.moj-search')
      .analyze()
    expect(results.violations).toEqual([])
  })

  test('with hint', async ({ page }) => {
    await setupPage(page, examples, 'with hint')

    const results = await new AxeBuilder({ page })
      .include('.moj-search')
      .analyze()
    expect(results.violations).toEqual([])
  })

  test('with icon button', async ({ page }) => {
    await setupPage(page, examples, 'with icon button')

    const results = await new AxeBuilder({ page })
      .include('.moj-search')
      .analyze()
    expect(results.violations).toEqual([])
  })

  test('icon button in stacked layout', async ({ page }) => {
    await setupPage(page, examples, 'icon button in stacked layout')

    const results = await new AxeBuilder({ page })
      .include('.moj-search')
      .analyze()
    expect(results.violations).toEqual([])
  })
})
