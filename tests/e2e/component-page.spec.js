import { test, expect, describe } from '@playwright/test'

describe('layout tabs', () => {
  test('layout tabs initialised', async ({page}) => {
    await page.goto('/')
    await page.getByRole('button', {name: 'Components'}).click()
    await page.getByRole('link', { name: 'Alert' }).click()

    const tabs = page.locator('[data-module="govuk-tabs"]')

    await expect(tabs).toBeVisible()
    await expect(tabs).toHaveAttribute('data-govuk-tabs-init')

    expect(page.getByRole('heading', { name: 'Overview'})).toBeVisible()
    expect(page.getByRole('heading', { name: 'Examples'})).not.toBeVisible()
  })

  test("layout tabs function", async ({ page }) => {
    await page.goto('/components/alert')

    const tabs = page.locator('[data-module="govuk-tabs"]')
    await expect(tabs).toHaveAttribute('data-govuk-tabs-init')

    await tabs.getByRole('tab', { name: 'Examples'}).click()

    expect(page.getByRole('heading', { name: 'Overview'})).not.toBeVisible()
    expect(page.getByRole('heading', { name: 'Examples'})).toBeVisible()
  })

  test('tabs pagination', async ({ page }) => {
    await page.goto('/components/alert')
    const tabs = page.locator('[data-module="govuk-tabs"]')
    await expect(tabs).toHaveAttribute('data-govuk-tabs-init')

    await page.getByRole('link', { name: 'Next tab : How to use'}).click()

    expect(page.getByRole('heading', { name: 'Overview'})).not.toBeVisible()
    expect(page.getByRole('heading', { name: 'How to use'})).toBeVisible()
  })
})


describe('example tabs', () => {
  test('example tabs init', async ({ page }) => {
    await page.goto('/components/alert')
    const tabContainer = page.locator('[data-module="app-tabs"]').nth(1)

    await expect(tabContainer).toBeVisible()
    await expect(tabContainer).toHaveAttribute('data-app-tabs-init')

    for (const tab of await tabContainer.getByRole('tab').all()) {
      await expect(tab).toHaveAttribute('aria-selected', 'false')
    }
  })

  test('example tabs functionality', async ({ page }) => {
    await page.goto('/components/alert')
    const tabContainer = page.locator('[data-module="app-tabs"]').nth(1)
    const nunjucksPanel = tabContainer.getByRole('tabpanel', {name: 'Nunjucks  (Alert (example))'})

    await tabContainer.getByRole('tab', {name: 'Nunjucks'}).click()

    expect(nunjucksPanel).toBeVisible()
    expect(nunjucksPanel.getByRole('button', {name: 'Copy code'})).toBeVisible()
  })
})
