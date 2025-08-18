import { test, expect } from '@playwright/test'
import { ContributionsPage } from './pages/contributions-page'

let basePage

test('session expired', async ({page}) => {
    basePage = new ContributionsPage(page)
    await page.goto('email/verify/my-verification-token')
    await expect(page).toHaveTitle(/Your confirmation link did not work - MoJ Design System/)
    await basePage.exepctAllLinksToHaveGovUkLinkClass()
})
