import { test, expect, describe } from '@playwright/test'

describe('button menu', () => {
  test('button menu example iframes initialize', async ({ page }) => {
    await page.goto('/components/button-menu')

    const examples = page.locator('[data-module="moj-iframe-resizer"]')

    for (const example of await examples.all()) {
      await expect(example).toHaveAttribute('data-moj-iframe-resizer-init')
    }
  })

  test('button menu initializes', async ({ page }) => {
    await page.goto('/components/button-menu')

    const example = page
      .frameLocator('[data-module="moj-iframe-resizer"]')
      .nth(1)
    const buttonMenu = example.locator('[data-module="moj-button-menu"]')

    await expect(buttonMenu).toHaveAttribute('data-moj-button-menu-init')
  })
})

describe('date picker', () => {
  test('date picker example iframes initialize', async ({ page }) => {
    await page.goto('/components/date-picker')

    const examples = page.locator('[data-module="moj-iframe-resizer"]')

    for (const example of await examples.all()) {
      await expect(example).toHaveAttribute('data-moj-iframe-resizer-init')
    }
  })

  test('date picker initializes', async ({ page }) => {
    await page.goto('/components/date-picker')

    const example = page
      .frameLocator('[data-module="moj-iframe-resizer"]')
      .nth(1)
    const buttonMenu = example.locator('[data-module="moj-date-picker"]')

    await expect(buttonMenu).toHaveAttribute('data-moj-date-picker-init')
  })
})
