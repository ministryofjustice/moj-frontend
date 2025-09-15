import { test, expect } from '@playwright/test'

import { FigmaPage } from './pages/figma-page.js'

let testPage

test.beforeEach(async ({ page }) => {
  testPage = new FigmaPage(page)
  await testPage.goTo()
})

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
  await testPage.expectPageTitle('Your details')
  await testPage.clickBack()
  await testPage.expectPageTitle('Figma design')
})

test('code available', async () => {
  await testPage.checkRadioWithLabel('Yes')
  await testPage.clickContinue()
  await testPage.expectPageTitle('Figma design details')

  await testPage.clickBack()
  await testPage.expectPageTitle('Figma design')
})
