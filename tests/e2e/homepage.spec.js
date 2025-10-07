import { test, expect } from '@playwright/test'

test('homepage', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveTitle(/MoJ Design System/)
  await expect(page.getByRole('heading', { name: 'Design, build, and deliver accessible and consistent services' })).toBeVisible();
})

test('submit a component is visible', async ({ page }) => {
  await page.goto('/')
  const main = page.getByRole('main')
  await expect(page.getByLabel('About the Design System').getByRole('link', { name: 'Submit a Component' })).toBeVisible()
  await expect(main.getByRole('link', { name: 'Submit a Component' })).toBeVisible()
})

test.describe('navigation', () => {
  test('menus are collapsed', async ({page}) => {
    await page.goto('/')
    await expect(page.getByRole('link', { name: 'Date picker' })).not.toBeVisible()
    await expect(page.getByRole('link', { name: 'Filter a list' })).not.toBeVisible()
    await expect(page.getByRole('link', { name: 'Use Nunjucks' })).not.toBeVisible()
  })

  test('menus can be opened', async ({page}) => {
    await page.goto('/')

    await page.getByRole('button', {name: 'Components'}).click()
    await expect(page.getByRole('link', { name: 'Date picker' })).toBeVisible()

    await page.getByRole('button', {name: 'Patterns'}).click()
    await expect(page.getByRole('link', { name: 'Date picker' })).not.toBeVisible()
    await expect(page.getByRole('link', { name: 'Filter a list' })).toBeVisible()

    await page.getByRole('button', {name: 'Production'}).click()
    await expect(page.getByRole('link', { name: 'Filter a list' })).toBeVisible()
    await expect(page.getByRole('link', { name: 'Use Nunjucks' })).toBeVisible()

    await page.getByRole('button', {name: 'Production'}).click()
    await expect(page.getByRole('link', { name: 'Use Nunjucks' })).not.toBeVisible()

  })
})
