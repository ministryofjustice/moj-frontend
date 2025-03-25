const fs = require('fs')

module.exports.runTest = async (page, hostUrl) => {
  console.log('Navigating to Start Page...')
  await page.setViewport({ width: 1920, height: 1080 }) // Full HD
  await page.goto(`${hostUrl}/contribute/add-new-component/start`, {
    waitUntil: 'networkidle0'
  })

  await page.waitForSelector('h1', { visible: true })

  // Verify "Before you start" heading
  const heading = await page.$eval('h1', (el) => el.textContent.trim())
  if (heading === 'Before you start') {
    console.log('Passed: Correct Page Loaded')
  } else {
    console.error(`Failed: Expected "Before you start" but got "${heading}"`)
    return
  }
  // Ensure the screenshots folder exists
  const screenshotsDir = 'tests/e2e/screenshots'
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true })
  }

  // Save screenshot of Start Page
  const screenshotPath = `${screenshotsDir}/1_start.png`
  await page.screenshot({ path: screenshotPath, fullPage: true })

  console.log(`Screenshot saved: ${screenshotPath}`)

  // Click "Continue" button to move forward
  console.log("Clicking 'Continue'...")

  // Find the button using text content (ensures correct button)
  const button = await page.evaluateHandle(() => {
    return [...document.querySelectorAll('button')].find(
      (btn) => btn.innerText.trim() === 'Continue'
    )
  })

  if (!button) {
    console.error('Continue button not found!')
    return
  }

  // Click the button and wait for navigation
  await Promise.all([
    page.waitForNavigation({ waitUntil: 'domcontentloaded', timeout: 10000 }),
    button.click()
  ])

  console.log('Successfully moved to the next step!')
}
