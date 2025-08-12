import { test, expect } from '@playwright/test';
import { AccessibilityFindingsPage } from './pages/accessibility-findings-page';

let testPage

test.beforeEach(async ({ page }) => {
  console.log(`Running ${test.info().title}`);
  testPage = new AccessibilityFindingsPage(page)
  await testPage.goTo()
});

test('validation', async () => {
  await testPage.continueButton.click();
  await expect(testPage.errorSummary).toBeVisible()

  await expect(testPage.errorSummary).toBeFocused()
  await expect(testPage.errorSummary).toContainText('Select yes if there was an external audit')
  await expect(testPage.errorSummary).toContainText('Select yes if it was internally reviewed')
  await expect(testPage.errorSummary).toContainText('Select yes if it was tested with assistive technology')
})

test('assistive technology', async () => {
  await testPage.setExternalAudit('No')
  await testPage.setInternalReview('No')
  await testPage.setAssistiveTech('Yes')

  await testPage.continueButton.click()
  await expect(page).toHaveTitle(/Testing with assistive technology - MoJ Design System/)

  await testPage.backLink.click()
  await expect(page).toHaveTitle(/Accessibility findings - MoJ Design System/);
})

test('internal review', async () => {
  await testPage.setExternalAudit('No')
  await testPage.setInternalReview('Yes')
  await testPage.setAssistiveTech('No')

  await testPage.continueButton.click()
  await expect(page).toHaveTitle(/Internal accessibility review - MoJ Design System/)

  await testPage.backLink.click()
  await expect(page).toHaveTitle(/Accessibility findings - MoJ Design System/);
})

test('external audit', async () => {
  await testPage.setExternalAudit('Yes')
  await testPage.setInternalReview('No')
  await testPage.setAssistiveTech('No')

  await testPage.continueButton.click()
  await expect(page).toHaveTitle(/External accessibility audit - MoJ Design System/)

  await testPage.backLink.click()
  await expect(page).toHaveTitle(/Accessibility findings - MoJ Design System/);
})
