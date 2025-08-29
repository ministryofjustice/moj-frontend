import path from 'path'

import { test as setup, expect } from '@playwright/test'

const sessionFile = path.join(
  __dirname,
  '../../../playwright/.state/session.json'
)

setup('session', async ({ page }) => {
  // Perform authentication steps. Replace these actions with your own.
  await page.goto('start')

  // Alternatively, you can wait until the page reaches a state where all cookies are set.
  await expect(page.getByRole('button', { name: 'Continue' })).toBeVisible()
  await page.waitForLoadState('networkidle')
  // End of authentication steps.
  await page.context().storageState({ path: sessionFile })
})
