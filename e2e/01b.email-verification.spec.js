import { test, expect, describe } from '@playwright/test'
import { ContributionsPage } from './pages/contributions-page'

let basePage
let emailInput
const email = 'test.user@justice.gov.uk'

describe('verification process', async () => {
  test.beforeEach(async ({ page }) => {
    console.log(`Running ${test.info().title}`)
    basePage = new ContributionsPage(page)
    await page.goto('start')
    await basePage.clickContinue()
    await expect(page).toHaveTitle(
      /Verify that you work for MoJ - MoJ Design System/
    )

    emailInput = page.getByLabel('Enter your justice.gov.uk email address')

    await emailInput.fill(email)
    await basePage.clickContinue()
  })

  test('check', async ({ page }) => {
    await page.goto('email/check')
    await expect(page).toHaveTitle(
      /Check your email account - MoJ Design System/
    )
    await expect(page.locator('#main-content')).toContainText(email)

    await basePage.exepctAllLinksToHaveGovUkLinkClass()
  })

  test('resend', async ({ page }) => {
    const resendLink = page.getByRole('link', {
      name: 'Resend the confirmation email '
    })

    await page.goto('email/check')
    await expect(page).toHaveTitle(
      /Check your email account - MoJ Design System/
    )
    await page.getByText('Fix problems with the email').click()
    await expect(resendLink).toBeVisible()
    await resendLink.click()

    await expect(page).toHaveTitle(
      /Resending a confirmation email - MoJ Design System/
    )
    await expect(page.locator('#main-content')).toContainText(email)
    await basePage.exepctAllLinksToHaveGovUkLinkClass()

    await page
      .getByRole('button', { name: 'Resend confirmation email' })
      .click()

    await expect(page).toHaveTitle(
      /Check your email account - MoJ Design System/
    )
  })

  test('change email', async ({ page }) => {
    const newEmailLink = page.getByRole('link', {
      name: 'Enter a different email address'
    })

    await page.goto('email/check')
    await expect(page).toHaveTitle(
      /Check your email account - MoJ Design System/
    )
    await page.getByText('Fix problems with the email').click()
    await expect(newEmailLink).toBeVisible()
    await newEmailLink.click()

    await expect(page).toHaveTitle(
      /Verify that you work for MoJ - MoJ Design System/
    )
    await basePage.exepctAllLinksToHaveGovUkLinkClass()
  })

  test('invalid token', async ({page}) => {
    await page.goto('email/verify/my-invalid-token')
    await expect(page).toHaveTitle(/Your confirmation link was not recognised - MoJ Design System/)
    await basePage.exepctAllLinksToHaveGovUkLinkClass()
    await page.getByRole('link', { name: 'enter your email address again' }).click()
    await expect(page).toHaveTitle(
      /Verify that you work for MoJ - MoJ Design System/
    )
  })

  test('valid token', async ({page}) => {
    await page.goto(`email/verify/${process.env.VERIFICATION_TOKEN}`)
    await expect(page).toHaveTitle(/Component details - MoJ Design System/)
    await basePage.exepctAllLinksToHaveGovUkLinkClass()
  })
})
