const { readFileSync } = require('fs')
const path = require('path')

const AxeBuilder = require('@axe-core/playwright').default
const { test, expect } = require('@playwright/test')
const { compile } = require('sass-embedded')

const { bundleComponent } = require('../../lib/bundle.js')
const { render, getExamples } = require('../../lib/components.js')

let bundledComponent
let componentStyles
let govukStyles

/**
 * @param {import('@playwright/test').Page} page
 * @param {Record<string, object>} examples
 * @param {string} exampleName
 */
async function setupPage(page, examples, exampleName) {
  await page.setContent(render('header', examples[exampleName], true))
  await page.addStyleTag({ content: govukStyles })
  await page.addStyleTag({ content: componentStyles })
  await page.addScriptTag({ content: bundledComponent, type: 'module' })
  // @ts-expect-error MOJHeader is in page scope, not test scope
  await page.waitForFunction(() => typeof MOJHeader !== 'undefined')
  await page.evaluate(() => {
    // @ts-expect-error MOJHeader is in page scope, not test scope
    new MOJHeader(document.querySelector('[data-module="moj-header"]')) // eslint-disable-line no-new, no-undef
  })
}

test.describe('header accessibility', () => {
  let examples

  test.beforeAll(async () => {
    examples = await getExamples('header')
    bundledComponent = await bundleComponent(
      path.join(__dirname, 'header.mjs'),
      'MOJHeader'
    )
    componentStyles = compile(path.join(__dirname, '_header.scss'), {
      loadPaths: [path.join(__dirname, '../../../../node_modules')],
      quietDeps: true
    }).css
    govukStyles = readFileSync(
      path.join(
        __dirname,
        '../../../../node_modules/govuk-frontend/dist/govuk/govuk-frontend.min.css'
      ),
      'utf8'
    )
  })

  test.afterEach(async ({ page }) => {
    await page.setContent('')
  })

  for (const viewport of [
    { name: 'desktop', width: 1440, height: 900 },
    { name: 'mobile', width: 375, height: 900 }
  ]) {
    test.describe(viewport.name, () => {
      test.use({ viewport: { width: viewport.width, height: viewport.height } })

      for (const example of [
        'default',
        'labels with html',
        'crown logo',
        'with tag',
        'responsive account',
        'with navigation',
        'with end slot'
      ]) {
        test(`${example} has no accessibility violations`, async ({ page }) => {
          await setupPage(page, examples, example)

          const results = await new AxeBuilder({ page })
            .include('.moj-header')
            .analyze()

          expect(results.violations).toEqual([])
        })
      }
    })
  }
})
