import { test, expect, describe } from '@playwright/test'
import { ContributionsPage } from './pages/contributions-page'

let basePage
let emailInput

test.beforeEach(async ({ page }) => {
  console.log(`Running ${test.info().title}`)
  basePage = new ContributionsPage(page)
  await page.goto('start')
  await basePage.clickContinue()
  await expect(page).toHaveTitle(
    /Verify that you work for MoJ - MoJ Design System/
  )

  emailInput = page.getByLabel('Enter your justice.gov.uk email address')
})

describe('validation', async () => {
  test('empty state', async ({ page }) => {
    await basePage.exepctAllLinksToHaveGovUkLinkClass()

    await basePage.clickContinue()
    await basePage.expectErrorSummaryWithMessages(['Enter your email address'])

    await expect(basePage.errorMessages).toHaveCount(1)
    await expect(basePage.errorMessages).toContainText([
      'Enter your email address'
    ])
  })

  test('invalid email', async ({ page }) => {
    await emailInput.fill('not an email address')

    await basePage.clickContinue()
    await basePage.expectErrorSummaryWithMessages([
      'Enter an email address in the format: name@justice.gov.uk'
    ])

    await expect(basePage.errorMessages).toHaveCount(1)
    await expect(basePage.errorMessages).toContainText([
      'Enter an email address in the format: name@justice.gov.uk'
    ])
  })

  test('non justice domain email', async ({ page }) => {
    const email = 'bob@notinjustice.com'
    await emailInput.fill(email)

    await basePage.clickContinue()
    await expect(page).toHaveTitle(
      /You did not enter an MoJ email address - MoJ Design System/
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
