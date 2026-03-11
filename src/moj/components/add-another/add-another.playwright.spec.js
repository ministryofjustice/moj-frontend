const path = require('path')

const { test, expect } = require('@playwright/test')

const { bundleComponent } = require('../../lib/bundle.js')
const { render, getExamples } = require('../../lib/components.js')

let bundledComponent

const initialiseAlerts = () => {
  const $alerts = document.querySelectorAll('[data-module="moj-alert"]')
  console.log($alerts)
  $alerts.forEach(($alert) => {
    /* eslint-disable no-new, no-undef */
    // @ts-expect-error Alert is in page scope not test scope
    new Alert($alert)
  })
}

test.describe('alert', () => {
  let examples
  let example = ''
  let $component

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
    await page.evaluate(initialiseAlerts)

    $component = page.locator('[data-module="moj-add-another"]')
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

    test('renders default content', async () => {
      await expect($component).toBeVisible()
    })

    test('js initialises', async () => {
      await expect($component).toHaveAttribute('data-moj-add-another-init')
    })
  })
})
