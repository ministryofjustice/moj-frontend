import { test, expect } from '@playwright/test';

test('component details', async ({ page }) => {
  await page.goto('start');
  await page.waitForLoadState();
  await page.getByRole('button', { name: 'Continue' }).click();

  await expect(page).toHaveTitle(/Component details - MoJ Design System/);

  await page.getByRole('button', { name: 'Continue' }).click();

  const errorSummary = page.locator('.govuk-error-summary')

  await expect(errorSummary).toBeVisible()
  await expect(errorSummary).toBeFocused()
  await expect(errorSummary).toContainText('Enter the name of the component')
  await expect(errorSummary).toContainText('Enter a description of the component')
  await expect(errorSummary).toContainText('Enter an answer for how the component is being used')

  await page.getByLabel('What’s the name of the component?').fill('Accordion')
  await page.getByLabel('Describe the component').fill('It expands and contracts')
  await page.getByLabel('How is the component being used?').fill('To hide and show content')

  await page.getByRole('button', { name: 'Continue' }).click();

  await expect(page).toHaveURL(`${process.env.APP_URL}/contribute/add-new-component/component-image`);
});
