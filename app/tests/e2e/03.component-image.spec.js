import { test, expect } from '@playwright/test'

import { CheckYourAnswersPage } from './pages/check-your-answers-page.js'
import { ComponentImagePage } from './pages/component-image-page.js'

let testPage
let cyaPage

test.beforeEach(async ({ page }) => {
  testPage = new ComponentImagePage(page)
  cyaPage = new CheckYourAnswersPage(page)
  await testPage.goTo()
})

test('no file', async () => {
  await testPage.clickUpload()
  await testPage.expectErrorSummaryWithMessages(['Select an image to upload'])
})

test('no file submitted twice keeps a single csrf query token', async ({
  page
}) => {
  await testPage.clickUpload()
  await testPage.expectErrorSummaryWithMessages(['Select an image to upload'])
  expect(new URL(page.url()).searchParams.getAll('_csrf')).toHaveLength(1)

  await testPage.clickUpload()
  await testPage.expectErrorSummaryWithMessages(['Select an image to upload'])
  expect(new URL(page.url()).searchParams.getAll('_csrf')).toHaveLength(1)
})

test('file too large', async () => {
  await testPage.uploadFile('test-image-too-large.png')
  await testPage.clickUpload()

  await testPage.expectErrorSummaryWithMessages([
    'The selected file must be smaller than 10MB'
  ])
})

test('unsupported file type', async () => {
  await testPage.uploadFile('test-image.txt')
  await testPage.clickUpload()

  await testPage.expectErrorSummaryWithMessages([
    'The selected file must be a JPG, BMP, PNG, TIF or PDF'
  ])
})

test('disguised markdown file renamed to jpg', async () => {
  await testPage.uploadFile('test-image-fake.jpg')
  await testPage.clickUpload()

  await testPage.expectErrorSummaryWithMessages([
    'The selected file must be a JPG, BMP, PNG, TIF or PDF'
  ])
})

test('malicious file', async () => {
  test.skip(
    !process.env.CI,
    'Requires a running ClamAV service, which is only available in CI'
  )

  await testPage.uploadFile('test-eicar.pdf')
  await testPage.clickUpload()

  await testPage.expectErrorSummaryWithMessages([
    'The selected file failed a virus scan'
  ])
})

test('file ok', async () => {
  const filename = 'test-image.png'

  await testPage.uploadFile(filename)
  await testPage.clickUpload()

  await testPage.expectPageTitle('Component image')
  await testPage.expectSuccessAlert(`File ‘${filename}’ has been uploaded.`)

  await expect(testPage.summaryList).toBeVisible()
  await expect(testPage.summaryList).toContainText(`${filename}`)
  await expect(testPage.removeLink).toHaveCount(1)
  await expect(testPage.continueButton).toBeVisible()
})

test('continue after upload goes to next page', async () => {
  if (await testPage.fileInput.isVisible()) {
    await testPage.uploadFile('test-image.png')
    await testPage.clickUpload()
  }

  await expect(testPage.continueButton).toBeVisible()
  await testPage.clickContinue()
  await testPage.expectPageTitle('Accessibility findings')
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
  await testPage.expectPageTitle('Check your answers')
  await expect(cyaPage.componentImageCard).toBeVisible()
  await expect(cyaPage.componentImageCard).toContainText(filename)

  await expect(
    cyaPage.componentImageCard.getByRole('link', { name: 'Change' })
  ).toBeVisible()
  await expect(
    cyaPage.componentImageCard.getByRole('link', { name: 'Remove' })
  ).not.toBeVisible()

  await cyaPage.componentImageCard.getByRole('link', { name: 'Change' }).click()
  await testPage.expectPageTitle('Component image')
})
