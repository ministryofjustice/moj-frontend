const fs = require('fs')
const path = require('path')

module.exports.runTest = async (page) => {
  console.log('Verifying Prototype Designs Link Page...')

  // Ensure we're on the Prototype Designs page
  await page.waitForSelector('h1', { visible: true })

  // Verify heading
  const heading = await page.$eval('h1', (el) => el.textContent.trim())

  if (heading === 'Prototype designs') {
    console.log('Passed: Correct Page Loaded')
  } else {
    console.error(`Failed: Expected "Prototype designs" but got "${heading}"`)
    return
  }

  const buttonHandle = await page.evaluateHandle(() => {
    return [...document.querySelectorAll('button')].find(
      (btn) => btn.innerText.trim() === 'Continue'
    )
  })

  if (!buttonHandle) {
    console.error('Continue button not found!')
    return
  }

  await Promise.all([
    page.waitForSelector('.govuk-error-summary__list', {
      visible: true,
      timeout: 5000
    }),
    page.evaluate((el) => el.click(), buttonHandle)
  ])

  console.log('Validation errors displayed.')

  // Verify error messages
  const errors = await page.$$eval(
    '.govuk-error-summary__list li',
    (elements) => elements.map((el) => el.textContent.trim())
  )

  const expectedErrors = ['Enter the prototype link']

  const allErrorsPresent = expectedErrors.every((error) =>
    errors.includes(error)
  )

  if (allErrorsPresent) {
    console.log('Passed: All expected errors are displayed')
  } else {
    console.error('Failed: Some expected errors are missing', errors)
    return
  }

  // Fill out the input fields

  console.log('Entering prototype link into input field')

  await page.type('#prototype-url', 'https://www.test-moj.com')

  // Ensure the screenshots folder exists
  const screenshotsDir = 'tests/e2e/screenshots'
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true })
  }

  // Save screenshot before clicking Continue
  const screenshotPath = `${screenshotsDir}/5b-prototype-designs-link.png`
  await page.screenshot({ path: screenshotPath, fullPage: true })

  console.log(`Screenshot saved: ${screenshotPath}`)

  // Click "Continue" button to move forward
  console.log("Clicking 'Continue'...")

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
