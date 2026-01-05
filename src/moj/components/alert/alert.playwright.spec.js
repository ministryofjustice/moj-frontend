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
  let $dismissButton

  test.beforeAll(async () => {
    examples = await getExamples('alert')
    bundledComponent = await bundleComponent(
      path.join(__dirname, 'alert.mjs'),
      'Alert'
    )
  })

  test.beforeEach(async ({ page }) => {
    // Render component and insert into page
    const html = render('alert', examples[example])
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

    $component = page.locator('[data-module="moj-alert"]')
    $dismissButton = $component.locator('.moj-alert__dismiss')
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

    test('js initialises', async () => {
      await expect($component).toHaveAttribute('data-moj-alert-init')
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

    test('has the alert role and gains focus', async () => {
      await expect($component).toHaveRole('alert')
      await expect($component).toBeFocused()
    })
  })

  test.describe('disable autofocus', () => {
    test.beforeAll(async () => {
      example = 'disable autofocus'
    })
    test.afterAll(async () => {
      example = ''
    })

    test('does not gain focus', async () => {
      await expect($component).toHaveRole('alert')
      await expect($component).not.toBeFocused()
    })
  })

  test.describe('dismissible', () => {
    test.beforeAll(async () => {
      example = 'dismissible'
    })
    test.afterAll(async () => {
      example = ''
    })

    test('can be dismissed', async ({ page }) => {
      await expect($dismissButton).toBeVisible()
      await expect($dismissButton).toHaveText('Dismiss')

      await $dismissButton.click()

      await expect($component).not.toBeAttached()
      await expect(page.locator('body')).toBeFocused()
    })
  })

  test.describe('focus on dismiss', () => {
    test.beforeAll(async () => {
      example = 'focus on dismiss'
    })
    test.afterAll(async () => {
      example = ''
    })

    test('focuses element if selector present', async ({ page }) => {
      const html = `<div id="focus-me"></div>`
      page.locator('body').evaluate((element, html) => {
        element.insertAdjacentHTML('beforeend', html)
      }, html)
      const $focusReceiver = page.locator('#focus-me')

      await $dismissButton.click()

      await expect($component).not.toBeAttached()
      await expect($focusReceiver).toBeFocused()
    })

    test('focuses next sibling alert', async ({ page }) => {
      const html = `<div class="moj-alert" data-testid="focus-receiver"></div>`
      page.locator('body').evaluate((element, html) => {
        element.insertAdjacentHTML('beforeend', html)
      }, html)
      const $focusReceiver = page.getByTestId('focus-receiver')

      await $dismissButton.click()

      await expect($component).not.toBeAttached()
      await expect($focusReceiver).toBeFocused()
    })

    test('focuses previous sibling alert', async ({ page }) => {
      const html = `<div class="moj-alert" data-testid="focus-receiver"></div>`
      page.locator('body').evaluate((element, html) => {
        element.insertAdjacentHTML('afterbegin', html)
      }, html)
      const $focusReceiver = page.getByTestId('focus-receiver')

      await $dismissButton.click()

      await expect($component).not.toBeAttached()
      await expect($focusReceiver).toBeFocused()
    })

    test('focuses previous sibling heading', async ({ page }) => {
      const html = `<h2 data-testid="focus-receiver">heading</h2>`
      page.locator('body').evaluate((element, html) => {
        element.insertAdjacentHTML('afterbegin', html)
      }, html)
      const $focusReceiver = page.getByTestId('focus-receiver')

      await $dismissButton.click()

      await expect($component).not.toBeAttached()
      await expect($focusReceiver).toBeFocused()
    })

    test('focuses ancestor heading', async ({ page }) => {
      const html = `
        <h1>page title</h1>
        <h2 data-testid="focus-receiver">heading</h2>
        <div data-testid="wrapper"></div>
      `
      page.locator('body').evaluate((element, html) => {
        element.insertAdjacentHTML('afterbegin', html)
        const alert = document.querySelector('.moj-alert')
        const wrapper = document.querySelector('[data-testid="wrapper"]')
        wrapper.replaceChildren(alert)
      }, html)
      const $focusReceiver = page.getByTestId('focus-receiver')

      await $dismissButton.click()

      await expect($component).not.toBeAttached()
      await expect($focusReceiver).toBeFocused()
    })
  })

  test.describe('dismiss text', async () => {
    test.beforeAll(async () => {
      example = 'dismiss text'
    })
    test.afterAll(async () => {
      example = ''
    })

    test('can be customised', async () => {
      await expect($dismissButton).toBeVisible()
      await expect($dismissButton).toHaveText('close')

      await $dismissButton.click()

      await expect($component).not.toBeAttached()
    })
  })

  test.describe('classes', () => {
    test.beforeAll(async () => {
      example = 'classes'
    })
    test.afterAll(async () => {
      example = ''
    })

    test('can be customised', async () => {
      await expect($component).toContainClass('custom-class another-class')
    })
  })

  test.describe('attributes', () => {
    test.beforeAll(async () => {
      example = 'attributes'
    })
    test.afterAll(async () => {
      example = ''
    })

    test('can be customised', async () => {
      await expect($component).toHaveAttribute('data-test', '123456')
      await expect($component).toHaveAttribute('data-custom', 'abcde')
    })
  })
})
