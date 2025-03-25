const fs = require('fs')

module.exports.runTest = async (page) => {
  console.log('Verifying Accessibility Internal Audit Page...')

  // Ensure we're on the Accessibility Internal Audit page
  await page.waitForSelector('h1', { visible: true })

  // Verify heading
  const heading = await page.$eval('h1', (el) => el.textContent.trim())

  if (heading === 'Internal accessibility audit') {
    console.log('Passed: Correct Page Loaded')
  } else {
    console.error(
      `Failed: Expected "Internal accessibility audit" but got "${heading}"`
    )
    return
  }

  console.log(
    "Clicking 'Continue' without inputs entered to trigger validation errors..."
  )

  const buttonHandle = await page.evaluateHandle(() => {
    return [...document.querySelectorAll('button')].find(
      (btn) => btn.innerText.trim() === 'Continue'
    )
  })

  if (!buttonHandle) {
    console.error('Continue button not found!')
    return
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
    'Enter the name of the organisation who conducted the internal audit',
    'The date of the internal audit must include a day'
  ]

  const allErrorsPresent = expectedErrors.every((error) =>
    errors.includes(error)
  )

  if (allErrorsPresent) {
    console.log('Passed: All expected errors are displayed')
  } else {
    console.error('Failed: Some expected errors are missing', errors)
    return
  }

  console.log('Entering mandatory input fields.')

  // Enter mandatory inputs
  await page.type(
    '#internal-organisation',
    'organisation who conducted internal audit.'
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
  const filledScreenshotPath = `${screenshotsDir}/4c_accessibility-internal-audit.png`
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
