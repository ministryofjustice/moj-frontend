import { test, expect } from '@playwright/test'

import { ContributionsPage } from './pages/contributions-page.js'

let testPage

test.beforeEach(async ({ page }) => {
  testPage = new ContributionsPage(page)
})

test('start page', async ({ page }) => {
  await page.goto('start')

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Before you start/)
  await testPage.exepctAllLinksToHaveGovUkLinkClass()

  await testPage.clickContinue()

  await testPage.expectPageTitle('Verify that you work for MoJ')
  await testPage.expectSelectedNavItem('Submit a component')
})
