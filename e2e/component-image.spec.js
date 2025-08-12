import { test, expect } from '@playwright/test';
import path from 'path';

test.beforeEach(async ({ page }) => {
  console.log(`Running ${test.info().title}`);
  await page.goto('start');
  await page.waitForLoadState();
  await page.getByRole('button', { name: 'Continue' }).click();
  await page.waitForLoadState();

  await page.goto('component-image')
  await expect(page).toHaveTitle(/Component image - MoJ Design System/);
});

test('no file', async ({ page }) => {
  const uploadButton = page.getByRole('button', { name: 'Upload', exact: true })
  const errorSummary = page.locator('.govuk-error-summary')

  await uploadButton.click();
  await expect(errorSummary).toBeVisible()
  await expect(errorSummary).toBeFocused()
  await expect(errorSummary).toContainText('Select an image to upload')
})

test('file too large', async ({ page }) => {
  const uploadButton = page.getByRole('button', { name: 'Upload', exact: true })
  const errorSummary = page.locator('.govuk-error-summary')

  await page.getByLabel('Upload a file').setInputFiles(path.join(__dirname, 'test-files/test-image-too-large.png'))
  await uploadButton.click();

  await expect(errorSummary).toBeVisible()
  await expect(errorSummary).toBeFocused()
  await expect(errorSummary).toContainText('The selected file must be smaller than 10MB')
})

test('file ok', async ({ page }) => {
  const filename = 'test-image.png'
  const fileInput = page.getByLabel('Upload a file')
  const uploadButton = page.getByRole('button', { name: 'Upload', exact: true })
  const continueButton = page.getByRole('button', { name: 'Continue' })
  const successAlert = page.getByRole('alert')
  const summaryList = page.locator('.govuk-summary-list')
  const removeLink = summaryList.getByRole('link', { name: 'Remove' } )

  await fileInput.setInputFiles(path.join(__dirname, `test-files/${filename}`))
  await uploadButton.click();

  await expect(page).toHaveURL(`${process.env.APP_URL}/contribute/add-new-component/component-image`);
  await expect(successAlert).toBeVisible()
  await expect(successAlert).toBeFocused()
  await expect(successAlert).toContainText(`File ‘${filename}’ has been uploaded.`)

  await expect(summaryList).toBeVisible()
  await expect(summaryList).toContainText(`${filename}`)
  await expect(removeLink).toHaveCount(1)
  await expect(continueButton).toBeVisible();
})

test('removing file', async ({ page }) => {
  const filename = 'test-image.png'
  const fileInput = page.getByLabel('Upload a file')
  const uploadButton = page.getByRole('button', { name: 'Upload', exact: true })
  const continueButton = page.getByRole('button', { name: 'Continue' })
  const successAlert = page.getByRole('alert')
  const summaryList = page.locator('.govuk-summary-list')
  const removeLink = summaryList.getByRole('link', { name: 'Remove' } )

  // await fileInput.setInputFiles(path.join(__dirname, `test-files/${filename}`))
  // await uploadButton.click();

  await expect(removeLink).toBeVisible()

  await removeLink.click()

  await expect(successAlert).toBeVisible()
  await expect(successAlert).toBeFocused()
  await expect(successAlert).toContainText(`File ‘${filename}’ has been removed.`)

  await expect(fileInput).toBeVisible()
  await expect(uploadButton).toBeVisible()
  await expect(continueButton).not.toBeVisible();

})
