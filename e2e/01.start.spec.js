import { test, expect } from '@playwright/test'

import { ContributionsPage } from './pages/contributions-page.js'

let testPage

test.beforeEach(async ({ page }) => {
  console.log(`Running ${test.info().title}`)
  testPage = new ContributionsPage(page)
})

test('start page', async ({ page }) => {
  await page.goto('start')

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Before you start - MoJ Design System/)
  await testPage.exepctAllLinksToHaveGovUkLinkClass()

  await testPage.clickContinue()

  // await page.waitForURL('/contribute/add-new-component/component-details');
  // await expect(page).toHaveTitle(/Component details - MoJ Design System/);
  await expect(page).toHaveTitle(
    /Verify that you work for MoJ - MoJ Design System/
  )
})
