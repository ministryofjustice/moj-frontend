import { test, expect } from '@playwright/test'

import { AccessibilityFindingsPage } from './pages/accessibility-findings-page.js'

let testPage

test.beforeEach(async ({ page }) => {
  testPage = new AccessibilityFindingsPage(page)
  await testPage.goTo()
})

test('validation', async () => {
  await testPage.clickContinue()

  await testPage.expectErrorSummaryWithMessages([
    'Select yes if there was an external audit',
    'Select yes if it was internally reviewed',
    'Select yes if it was tested with assistive technology'
  ])
})

test('assistive technology', async ({ page }) => {
  await testPage.setExternalAudit('No')
  await testPage.setInternalReview('No')
  await testPage.setAssistiveTech('Yes')

  await testPage.clickContinue()
  await expect(page).toHaveTitle(
    /Testing with assistive technology - MoJ Design System/
  )

  await testPage.backLink.click()
  await expect(page).toHaveTitle(/Accessibility findings - MoJ Design System/)
})

test('internal review', async ({ page }) => {
  await testPage.setExternalAudit('No')
  await testPage.setInternalReview('Yes')
  await testPage.setAssistiveTech('No')

  await testPage.clickContinue()
  await expect(page).toHaveTitle(
    /Internal accessibility review - MoJ Design System/
  )

  await testPage.clickBack()
  await expect(page).toHaveTitle(/Accessibility findings - MoJ Design System/)
})

test('external audit', async ({ page }) => {
  await testPage.setExternalAudit('Yes')
  await testPage.setInternalReview('No')
  await testPage.setAssistiveTech('No')

  await testPage.clickContinue()
  await expect(page).toHaveTitle(
    /External accessibility audit - MoJ Design System/
  )

  await testPage.clickBack()
  await expect(page).toHaveTitle(/Accessibility findings - MoJ Design System/)
})
