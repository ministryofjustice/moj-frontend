import { test, expect } from '@playwright/test'

import { ContributionsPage } from './pages/contributions-page.js'

let basePage
let emailInput

test.beforeEach(async ({ page }) => {
  basePage = new ContributionsPage(page)
  await page.goto('start')
  await basePage.clickContinue()
  await expect(page).toHaveTitle(
    /Verify that you work for MoJ - MoJ Design System/
  )

  emailInput = page.getByLabel('Enter your MoJ email address')
})

test.describe('validation', async () => {
  test('empty state', async () => {
    await basePage.exepctAllLinksToHaveGovUkLinkClass()

    await basePage.clickContinue()
    await basePage.expectErrorSummaryWithMessages(['Enter your email address'])

    await expect(basePage.errorMessages).toHaveCount(1)
    await expect(basePage.errorMessages).toContainText([
      'Enter your email address'
    ])
  })

  test('invalid email', async () => {
    await emailInput.fill('not an email address')

    await basePage.clickContinue()
    await basePage.expectErrorSummaryWithMessages([
      'Enter an email address in the correct format, for example name@justice.gov.uk'
    ])

    await expect(basePage.errorMessages).toHaveCount(1)
    await expect(basePage.errorMessages).toContainText([
      'Enter an email address in the correct format, for example name@justice.gov.uk'
    ])
  })

  test('non justice domain email', async ({ page }) => {
    const email = 'bob@notinjustice.com'
    await emailInput.fill(email)

    await basePage.clickContinue()
    await expect(page).toHaveTitle(
      /You cannot submit a component with this email address - MoJ Design System/
    )

    await expect(page.locator('#main-content')).toContainText(email)

    await page
      .getByRole('button', { name: 'Enter a different email address' })
      .click()

    await expect(page).toHaveTitle(
      /Verify that you work for MoJ - MoJ Design System/
    )
  })

  test('valid email', async ({ page }) => {
    const email = 'test.user@justice.gov.uk'
    await emailInput.fill(email)

    await basePage.clickContinue()

    if (process.env.SKIP_VERIFICATION === 'true') {
      await expect(page).toHaveTitle(/Component details - MoJ Design System/)
    }
  })
})
