import { test, expect } from '@playwright/test'

import { ContributionsPage } from './pages/contributions-page.js'

let basePage

test('session expired', async ({ page }) => {
  basePage = new ContributionsPage(page)
  await page.goto('email/verify/my-verification-token')
  await expect(page).toHaveTitle(/Your confirmation link did not work/)
  await basePage.exepctAllLinksToHaveGovUkLinkClass()
})
