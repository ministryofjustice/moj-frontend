const fs = require('fs')
const path = require('path')

const { test, expect } = require('@playwright/test')

const { render, getExamples } = require('../../lib/components.js')

// test.use({ headless: false })

test.describe('alert', () => {
  let examples
  let example = ''
  let $component
  let $dismissButton

  test.beforeAll(async () => {
    examples = await getExamples('alert')
  })

  test.beforeEach(async ({ page }) => {
    const html = render('alert', examples[example])
    // page.on('console', (msg) => console.log(msg.text()))
    // await page.addScriptTag({
    //   path: require.resolve(path: require.resolve('govuk-frontend/dist/govuk/govuk-frontend.min.js')),
    //   type: 'module'
    // })
    //
    // // Load your local module
    // const alertModulePath = path.join(__dirname, 'alert.mjs')
    // const alertContent = fs.readFileSync(alertModulePath, 'utf-8')
    //
    // await page.addScriptTag({
    //   content: alertContent,
    //   type: 'module'
    // })
    //
    await page.setContent(html)
    // await page.pause()
    // await page.evaluate(() => {
    //   const $alerts = document.querySelectorAll('[data-module="moj-alert"]')
    //   $alerts.forEach(($alert) => {
    //     new Alert($alert) // Might need to expose Alert globally
    //   })
    // })
    $component = page.locator('.moj-alert')
    $dismissButton = page.locator('.moj-alert__dismiss')
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
      await expect($component).toContainText('You can find it in the dashboard')
      await expect($component).toContainClass('moj-alert--information')
      await expect($component).toHaveAccessibleName(
        'information: The finance section has moved'
      )
      await expect($dismissButton).not.toBeVisible()
    })
  })

  test.describe('html content', () => {
    test.beforeAll(async () => {
      example = 'html content'
    })
    test.afterAll(async () => {
      example = ''
    })

    test('uses html content', async () => {
      const $link = $component.getByRole('link')
      await expect($component).toBeVisible()
      await expect($component).toContainText(
        'Enter the information manually in case details.'
      )
      await expect($link).toContainText('case details')
    })
  })

  test.describe('title as heading', () => {
    test.beforeAll(async () => {
      example = 'show title as heading'
    })
    test.afterAll(async () => {
      example = ''
    })

    test('shows title as h2', async () => {
      const $heading = $component.getByRole('heading', { level: 2 })
      await expect($heading).toBeVisible()
      await expect($heading).toContainText('The finance section has moved')
    })
  })

  test.describe('title with no content', () => {
    test.beforeAll(async () => {
      example = 'title no content'
    })
    test.afterAll(async () => {
      example = ''
    })

    test('uses title as content', async () => {
      const $heading = $component.getByRole('heading', { level: 2 })
      await expect($heading).not.toBeAttached()
      await expect($component).toContainText('The finance section has moved')
    })
  })

  test.describe('custom heading tag', () => {
    test.beforeAll(async () => {
      example = 'set heading tag'
    })
    test.afterAll(async () => {
      example = ''
    })

    test('uses h3', async () => {
      const $heading = $component.getByRole('heading', { level: 3 })
      await expect($heading).toBeVisible()
      await expect($component).toContainText('The finance section has moved')
    })
  })

  test.describe('invalid heading tag', () => {
    test.beforeAll(async () => {
      example = 'invalid heading tag'
    })
    test.afterAll(async () => {
      example = ''
    })

    test('uses h2 instead of h1', async () => {
      const $heading1 = $component.getByRole('heading', { level: 1 })
      const $heading2 = $component.getByRole('heading', { level: 2 })
      await expect($heading1).not.toBeAttached()
      await expect($heading2).toBeVisible()
      await expect($heading2).toContainText('The finance section has moved')
    })
  })

  test.describe('success variant', () => {
    test.beforeAll(async () => {
      example = 'success variant'
    })
    test.afterAll(async () => {
      example = ''
    })

    test('adds attributes', async () => {
      await expect($component).toContainClass('moj-alert--success')
      await expect($component).toHaveAccessibleName(
        'success: The finance section has moved'
      )
    })
  })

  test.describe('warning variant', () => {
    test.beforeAll(async () => {
      example = 'warning variant'
    })
    test.afterAll(async () => {
      example = ''
    })

    test('adds attributes', async () => {
      await expect($component).toContainClass('moj-alert--warning')
      await expect($component).toHaveAccessibleName(
        'warning: The finance section has moved'
      )
    })
  })

  test.describe('error variant', () => {
    test.beforeAll(async () => {
      example = 'error variant'
    })
    test.afterAll(async () => {
      example = ''
    })

    test('adds attributes', async () => {
      await expect($component).toContainClass('moj-alert--error')
      await expect($component).toHaveAccessibleName(
        'error: The finance section has moved'
      )
    })
  })

  test.describe('invalid variant', () => {
    test.beforeAll(async () => {
      example = 'invalid variant'
    })
    test.afterAll(async () => {
      example = ''
    })

    test('defaults to info variant', async () => {
      await expect($component).toContainClass('moj-alert--information')
      await expect($component).toHaveAccessibleName(
        'information: The finance section has moved'
      )
    })
  })

  test.describe('alert role', () => {
    test.beforeAll(async () => {
      example = 'alert role'
    })
    test.afterAll(async () => {
      example = ''
    })

    test('defaults to info variant', async () => {
      await expect($component).toHaveRole('alert')
      // await expect($component).toBeFocused()
    })
  })
})
