import path from 'path'

import { test as setup, expect } from '@playwright/test'

const sessionFile = path.join(
  __dirname,
  '../../../playwright/.state/session.json'
)

setup('session', async ({ page }) => {
  await page.goto('start')
  await expect(page.getByRole('button', { name: 'Continue' })).toBeVisible()
  await page.getByRole('button', { name: 'Continue' }).click()
  await expect(page).toHaveTitle(/Verify that you work for MOJ/)
  await page.waitForLoadState('networkidle')
  await page.context().storageState({ path: sessionFile })
})
