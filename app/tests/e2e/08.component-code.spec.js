import { test, expect } from '@playwright/test'

import { ComponentCodePage } from './pages/component-code-page.js'

let testPage

test.beforeEach(async ({ page }) => {
  testPage = new ComponentCodePage(page)
  await testPage.goTo()
})

test('validation', async () => {
  await testPage.clickContinue()
  await testPage.expectErrorSummaryWithMessages([
    'Select yes if you have code for the component'
  ])
  await expect(testPage.errorMessages).toHaveCount(1)
  await expect(testPage.errorMessages).toContainText([
    'Select yes if you have code for the component'
  ])
})

test('code not available', async () => {
  await testPage.setCodeAvailable('No')
  await testPage.clickContinue()
  await testPage.expectPageTitle('Figma design')

  await testPage.clickBack()
  await testPage.expectPageTitle('Component code')
})

test('code available', async () => {
  await testPage.setCodeAvailable('Yes')
  await testPage.clickContinue()
  await testPage.expectPageTitle('Component code details')

  await testPage.clickBack()
  await testPage.expectPageTitle('Component code')
})
