const fs = require('fs')

module.exports.runTest = async (page) => {
  console.log('Verifying Accessibility External Audit Page...')

  // Ensure we're on the Accessibility Findings page
  await page.waitForSelector('h1', { visible: true })

  // Verify heading
  const heading = await page.$eval('h1', (el) => el.textContent.trim())

  if (heading !== 'Accessibility findings') {
    throw new Error(
      `Failed: Expected "Accessibility Findings" but got "${heading}"`
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

  const expectedErrors = [
    'Enter the name of the organisation who conducted the external audit',
    'The date of the external audit must include a day'
  ]

  const allErrorsPresent = expectedErrors.every((error) =>
    errors.includes(error)
  )

  if (!allErrorsPresent) {
    throw new Error('Failed: Some expected errors are missing', errors)
  }

  console.log('Passed: All expected errors are displayed')

  console.log('Entering mandatory input fields.')

  // Enter mandatory inputs
  await page.type(
    '#external-organisation',
    'organisation who conducted external audit.'
  )
  await page.type('#audit-date-day', '01')
  await page.type('#audit-date-month', '01')
  await page.type('#audit-date-year', '2025')

  // Ensure the screenshots folder exists
  const screenshotsDir = 'tests/e2e/screenshots'
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true })
  }

  // Save screenshot after selecting radio buttons
  const filledScreenshotPath = `${screenshotsDir}/4b_accessibility-external-audit.png`
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
    console.error('Continue button not found after entering input fields!')
    return
  }

  await Promise.all([
    page.waitForNavigation({ waitUntil: 'domcontentloaded', timeout: 10000 }),
    page.evaluate((el) => el.click(), buttonHandleAfterSelection)
  ])

  console.log('Successfully moved to the next step!')
}
