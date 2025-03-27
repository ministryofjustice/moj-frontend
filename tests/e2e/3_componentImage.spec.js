const fs = require('fs')
const path = require('path')

module.exports.runTest = async (page) => {
  console.log('Verifying Component Image Page...')

  // Ensure we're on the Component Image page
  await page.waitForSelector('h1', { visible: true })

  // Verify heading
  const heading = await page.$eval('h1', (el) => el.textContent.trim())

  if (heading !== 'Upload an image of the component') {
    throw new Error(
      `Failed: Expected "Upload an image of the component" but got "${heading}"`
    )
  }

  console.log('Passed: Correct Page Loaded')

  // Locate the file input field
  const fileInputSelector = 'input[type="file"]'
  await page.waitForSelector(fileInputSelector)

  // Define the test image path
  const imagePath = path.resolve(__dirname, 'test-files/test-image.png')

  if (!fs.existsSync(imagePath)) {
    console.error('Test image not found at path:', imagePath)
    return
  }

  // Upload the file
  const inputElement = await page.$(fileInputSelector)
  await inputElement.uploadFile(imagePath)

  console.log('File uploaded successfully!')

  // Ensure the screenshots folder exists
  const screenshotsDir = 'tests/e2e/screenshots'
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true })
  }

  // Save screenshot after upload
  const screenshotPath = `${screenshotsDir}/3_component-image.png`
  await page.screenshot({ path: screenshotPath, fullPage: true })

  console.log(`Screenshot saved: ${screenshotPath}`)

  // Click "Continue" button
  console.log("Clicking 'Continue'...")

  const button = await page.evaluateHandle(() => {
    return [...document.querySelectorAll('button')].find(
      (btn) => btn.innerText.trim() === 'Continue'
    )
  })

  if (!button) {
    throw new Error('Continue button not found!')
  }

  await Promise.all([
    page.waitForNavigation({ waitUntil: 'domcontentloaded', timeout: 50000 }),
    button.click()
  ])
  console.log('Successfully moved to the next step!')
}
