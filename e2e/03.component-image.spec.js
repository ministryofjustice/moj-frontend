import { test, expect } from '@playwright/test'

import { CheckYourAnswersPage } from './pages/check-your-answers-page.js'
import { ComponentImagePage } from './pages/component-image-page.js'

let testPage
let cyaPage

test.beforeEach(async ({ page }) => {
  console.log(`Running ${test.info().title}`)
  testPage = new ComponentImagePage(page)
  cyaPage = new CheckYourAnswersPage(page)
  await testPage.goTo()
})

test('no file', async () => {
  await testPage.clickUpload()
  await testPage.expectErrorSummaryWithMessages(['Select an image to upload'])
})

test('file too large', async () => {
  await testPage.uploadFile('test-image-too-large.png')
  await testPage.clickUpload()

  await testPage.expectErrorSummaryWithMessages([
    'The selected file must be smaller than 10MB'
  ])
})

test('file ok', async () => {
  const filename = 'test-image.png'

  await testPage.uploadFile(filename)
  await testPage.clickUpload()

  await expect(testPage.page).toHaveTitle(testPage.fullTitle)
  await testPage.expectSuccessAlert(`File ‘${filename}’ has been uploaded.`)

  await expect(testPage.summaryList).toBeVisible()
  await expect(testPage.summaryList).toContainText(`${filename}`)
  await expect(testPage.removeLink).toHaveCount(1)
  await expect(testPage.continueButton).toBeVisible()
})

test('removing file', async () => {
  const filename = 'test-image.png'

  await expect(testPage.removeLink).toBeVisible()

  await testPage.removeLink.click()
  await testPage.expectSuccessAlert(`File ‘${filename}’ has been removed.`)

  await expect(testPage.fileInput).toBeVisible()
  await expect(testPage.uploadButton).toBeVisible()
  await expect(testPage.continueButton).not.toBeVisible()
})

test('check your answers', async ({ page }) => {
  const filename = 'test-image.png'

  await testPage.uploadFile(filename)
  await testPage.clickUpload()
  await page.waitForLoadState()

  await page.goto(cyaPage.url)
  await expect(page).toHaveTitle(cyaPage.fullTitle)
  await expect(cyaPage.componentImageCard).toBeVisible()
  await expect(cyaPage.componentImageCard).toContainText(filename)

  await expect(
    cyaPage.componentImageCard.getByRole('link', { name: 'Change' })
  ).toBeVisible()
  await expect(
    cyaPage.componentImageCard.getByRole('link', { name: 'Remove' })
  ).not.toBeVisible()

  await cyaPage.componentImageCard.getByRole('link', { name: 'Change' }).click()
  await expect(page).toHaveTitle(testPage.fullTitle)
})
