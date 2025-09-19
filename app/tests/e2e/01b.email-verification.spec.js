import { test, expect } from '@playwright/test'

import { ContributionsPage } from './pages/contributions-page.js'

let basePage
let emailInput
const email = 'test.user@justice.gov.uk'

test.describe('verification process', async () => {
  test.beforeEach(async ({ page }) => {
    basePage = new ContributionsPage(page)
    await page.goto('start')
    await basePage.clickContinue()
    basePage.expectPageTitle('Verify that you work for MoJ')

    emailInput = page.getByLabel('Enter your MoJ email address')

    await emailInput.fill(email)
    await basePage.clickContinue()
  })

  test('check', async ({ page }) => {
    await page.goto('email/check')
    basePage.expectPageTitle('Check your email account')
    await expect(page.locator('#main-content')).toContainText(email)

    await basePage.exepctAllLinksToHaveGovUkLinkClass()
  })

  test('resend', async ({ page }) => {
    const resendLink = page.getByRole('link', {
      name: 'Resend the confirmation email '
    })

    await page.goto('email/check')
    basePage.expectPageTitle('Check your email account')
    await page.getByText('Fix problems with the email').click()
    await expect(resendLink).toBeVisible()
    await resendLink.click()

    basePage.expectPageTitle('Resending a confirmation email')
    await expect(page.locator('#main-content')).toContainText(email)
    await basePage.exepctAllLinksToHaveGovUkLinkClass()

    await page
      .getByRole('button', { name: 'Resend confirmation email' })
      .click()

    basePage.expectPageTitle('Check your email account')
  })

  test('change email', async ({ page }) => {
    const newEmailLink = page.getByRole('link', {
      name: 'Enter a different email address'
    })

    await page.goto('email/check')

    basePage.expectPageTitle('Check your email account')
    await page.getByText('Fix problems with the email').click()
    await expect(newEmailLink).toBeVisible()
    await newEmailLink.click()

    basePage.expectPageTitle('Verify that you work for MoJ')
    await basePage.exepctAllLinksToHaveGovUkLinkClass()
  })

  test('invalid token', async ({ page }) => {
    await page.goto('email/verify/my-invalid-token')
    basePage.expectPageTitle('Your confirmation link was not recognised')

    await basePage.exepctAllLinksToHaveGovUkLinkClass()
    await page
      .getByRole('link', { name: 'enter your email address again' })
      .click()
    basePage.expectPageTitle('Verify that you work for MoJ')
  })

  test('valid token', async ({ page }) => {
    await page.goto(`email/verify/${process.env.VERIFICATION_TOKEN}`)
    basePage.expectPageTitle('Component details')
    await basePage.exepctAllLinksToHaveGovUkLinkClass()
  })
})
