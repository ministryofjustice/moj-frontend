import { test } from '@playwright/test'

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

test('assistive technology', async () => {
  await testPage.setExternalAudit('No')
  await testPage.setInternalReview('No')
  await testPage.setAssistiveTech('Yes')

  await testPage.clickContinue()
  await testPage.expectPageTitle('Testing with assistive technology')

  await testPage.backLink.click()
  await testPage.expectPageTitle('Accessibility findings')
})

test('internal review', async () => {
  await testPage.setExternalAudit('No')
  await testPage.setInternalReview('Yes')
  await testPage.setAssistiveTech('No')

  await testPage.clickContinue()
  await testPage.expectPageTitle('Internal accessibility review')

  await testPage.clickBack()
  await testPage.expectPageTitle('Accessibility findings')
})

test('external audit', async () => {
  await testPage.setExternalAudit('Yes')
  await testPage.setInternalReview('No')
  await testPage.setAssistiveTech('No')

  await testPage.clickContinue()
  await testPage.expectPageTitle('External accessibility audit')

  await testPage.clickBack()
  await testPage.expectPageTitle('Accessibility findings')
})
