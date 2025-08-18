import { test, expect } from '@playwright/test';
import { FigmaPage } from './pages/figma-page';

let testPage

test.beforeEach(async ({ page }) => {
  console.log(`Running ${test.info().title}`);
  testPage = new FigmaPage(page)
  await testPage.goTo()
});

test('validation', async () => {
  await testPage.clickContinue()
  await testPage.expectErrorSummaryWithMessages([
    'Select yes if you have a link to a Figma design file'
  ])
  await expect(testPage.errorMessages).toHaveCount(1)
  await expect(testPage.errorMessages).toContainText([
    'Select yes if you have a link to a Figma design file'
  ])
})

test('figma not available', async () => {
  await testPage.checkRadioWithLabel('No')
  await testPage.clickContinue()
  await expect(testPage.page).toHaveTitle(/Your details - MoJ Design System/)

  await testPage.clickBack()
  await expect(testPage.page).toHaveTitle(/Figma design - MoJ Design System/)
})

test('code available', async () => {
  await testPage.checkRadioWithLabel('Yes')
  await testPage.clickContinue()
  await expect(testPage.page).toHaveTitle(/Figma design details - MoJ Design System/)

  await testPage.clickBack()
  await expect(testPage.page).toHaveTitle(/Figma design - MoJ Design System/)
})

