const fs = require('fs')

module.exports.runTest = async (page) => {
  console.log('Verifying Accessibility Assistive Technology Page...')

  // Ensure we're on the Accessibility Internal Audit page
  await page.waitForSelector('h1', { visible: true })

  // Verify heading
  const heading = await page.$eval('h1', (el) => el.textContent.trim())

  if (heading !== 'Testing with assistive technology') {
    throw new Error(
      `Failed: Expected "Testing with assistive technology" but got "${heading}"`
    )
  }
  console.log('Passed: Correct Page Loaded')
  console.log(
    "Clicking 'Continue' without inputs entered to trigger validation errors..."
  )

  const buttonHandle = await page.evaluateHandle(() => {
    return [...document.querySelectorAll('button')].find(
      (btn) => btn.innerText.trim() === 'Continue'
    )
  })

  if (!buttonHandle) {
    throw new Error('Continue button not found!')
  }

  // Clicking 'Continue' without inputs entered to trigger validation errors...

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

  const expectedErrors = ['The date of the testing must include a day']

  const allErrorsPresent = expectedErrors.every((error) =>
    errors.includes(error)
  )

  if (!allErrorsPresent) {
    throw new Error(
      `Some expected errors are missing.\nReceived: ${JSON.stringify(errors, null, 2)}`
    )
  }
  console.log('Passed: All expected errors are displayed')
  console.log('Entering mandatory input fields.')

  // Enter mandatory inputs
  await page.type('#testing-date-day', '01')
  await page.type('#testing-date-month', '01')
  await page.type('#testing-date-year', '2025')

  // Ensure the screenshots folder exists
  const screenshotsDir = 'tests/e2e/screenshots'
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true })
  }

  // Save screenshot after selecting radio buttons
  const filledScreenshotPath = `${screenshotsDir}/4d_accessibility-assistive-technology.png`
  await page.screenshot({ path: filledScreenshotPath, fullPage: true })

  console.log(`Screenshot saved: ${filledScreenshotPath}`)

  // Click "Continue" button again to move forward
  console.log("Clicking 'Continue' after entering input fields...")

  const buttonHandleAfterSelection = await page.evaluateHandle(() => {
    return [...document.querySelectorAll('button')].find(
      (btn) => btn.innerText.trim() === 'Continue'
    )
  })

  if (!buttonHandleAfterSelection) {
    throw new Error('Continue button not found after entering input fields!')
  }

  await Promise.all([
    page.waitForNavigation({ waitUntil: 'domcontentloaded', timeout: 10000 }),
    page.evaluate((el) => el.click(), buttonHandleAfterSelection)
  ])

  console.log('Successfully moved to the next step!')
}
