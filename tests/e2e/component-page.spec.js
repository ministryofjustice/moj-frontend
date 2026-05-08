import { test, expect } from '@playwright/test'

test.describe('layout tabs', () => {
  test('layout tabs initialised', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: 'Components', exact: true }).click()
    await page.getByRole('link', { name: 'Alert' }).click()

    const tabs = page.locator('[data-module="govuk-tabs"]')

    await expect(tabs).toBeVisible()
    await expect(tabs).toHaveAttribute('data-govuk-tabs-init')

    await expect(page.getByRole('heading', { name: 'Overview' })).toBeVisible()
    await expect(
      page.getByRole('heading', { name: 'Examples' })
    ).not.toBeVisible()
  })

  test('layout tabs function', async ({ page }) => {
    await page.goto('/components/alert')

    const tabs = page.locator('[data-module="govuk-tabs"]')
    await expect(tabs).toHaveAttribute('data-govuk-tabs-init')

    await tabs.getByRole('tab', { name: 'Examples' }).click()

    await expect(
      page.getByRole('heading', { name: 'Overview' })
    ).not.toBeVisible()
    await expect(page.getByRole('heading', { name: 'Examples' })).toBeVisible()
  })

  test('tabs pagination', async ({ page }) => {
    await page.goto('/components/alert')
    const tabs = page.locator('[data-module="govuk-tabs"]')
    await expect(tabs).toHaveAttribute('data-govuk-tabs-init')

    await page.getByRole('link', { name: /Next/ }).click()

    await expect(
      page.getByRole('heading', { name: 'How to use' })
    ).toBeVisible()
    await expect(
      page.getByRole('heading', { name: 'Overview' })
    ).not.toBeVisible()
  })
})

test.describe('example tabs', () => {
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
    const nunjucksPanel = tabContainer.getByRole('tabpanel', {
      name: 'Nunjucks'
    })

    await tabContainer.getByRole('tab', { name: 'Nunjucks' }).click()

    await expect(nunjucksPanel).toBeVisible()

    const details = nunjucksPanel.locator('[data-module="govuk-details"]')
    await expect(details).toBeVisible()
  })
})

test.describe('copy button', () => {
  test('copy buttons present', async ({ page }) => {
    await page.goto('/components/button-menu')
    const tabs = page.locator('[data-module="app-tabs"]')
    const nunjucksPanel = tabs.getByRole('tabpanel', { name: 'Nunjucks' })

    await page.getByRole('tab', { name: 'Nunjucks' }).click()
    await expect(
      nunjucksPanel.getByRole('button', { name: 'Copy code' })
    ).toBeVisible()
  })
})

test.describe('scroll container', () => {
  test('scroll container intialised', async ({ page }) => {
    await page.goto('/components/interruption-card')
    const tabContainer = page.locator('[data-module="app-tabs"]')
    const nunjucksPanel = tabContainer.getByRole('tabpanel', {
      name: 'Nunjucks'
    })

    await tabContainer.getByRole('tab', { name: 'Nunjucks' }).click()
    const code = nunjucksPanel.locator(
      'code[data-module="app-scroll-container"]'
    )
    await expect(code).toHaveAttribute('data-app-scroll-container-init')
  })
})
