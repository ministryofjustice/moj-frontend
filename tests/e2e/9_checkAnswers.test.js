const fs = require('fs')

module.exports.runTest = async (page) => {
  console.log('Verifying Check your answers before submitting Page...')

  // Ensure we're on the Check your answers page
  await page.waitForSelector('h1', { visible: true })

  // Verify heading
  const heading = await page.$eval('h1', (el) => el.textContent.trim())

  if (heading === 'Check your answers before submitting the component') {
    console.log('Passed: Correct Page Loaded')
  } else {
    console.error(`Failed: Expected "Your details" but got "${heading}"`)
    return
  }

  // Ensure the screenshots folder exists
  const screenshotsDir = 'tests/e2e/screenshots'
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true })
  }

  // Save screenshot before clicking Continue
  const screenshotPath = `${screenshotsDir}/9-check-answers.png`
  await page.screenshot({ path: screenshotPath, fullPage: true })

  console.log(`Screenshot saved: ${screenshotPath}`)

  console.log('Final test complete. Closing Puppeteer...')
  await page.browser().close()
}
