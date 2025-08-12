import { expect } from '@playwright/test';

export const goToPage = async ({url,title,page}) => {
  await page.goto('start');
  await page.waitForLoadState();
  await page.getByRole('button', { name: 'Continue' }).click();
  await page.waitForLoadState();

  const re = new RegExp(`${title}`)
  await page.goto(url)
  await expect(page).toHaveTitle(re);
}
