import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('start');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Before you start - MoJ Design System/);

  await page.getByRole('button', { name: 'Continue' }).click();

  await page.waitForURL('/contribute/add-new-component/component-details');

  await expect(page).toHaveTitle(/Component details - MoJ Design System/);

});

