const fs = require('fs')
const path = require('path')

module.exports.runTest = async (page) => {
  console.log('Verifying Accessibility Findings Page...')

  // Ensure we're on the Accessibility Findings page
  await page.waitForSelector('h1', { visible: true })

  // Verify heading
  const heading = await page.$eval('h1', (el) => el.textContent.trim())

  if (heading === 'Accessibility findings') {
    console.log('Passed: Correct Page Loaded')
  } else {
    console.error(
      `Failed: Expected "Accessibility Findings" but got "${heading}"`
    )
    return
  }

  // Click "Continue" button before selecting radio buttons to trigger validation errors
  console.log(
    "Clicking 'Continue' without selecting radio buttons to trigger validation errors..."
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
    'Select yes if you had an external audit',
    'Select yes if you had an internal audit',
    'Select yes if you had tested using assistive technology'
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

  // Select "Yes" for all radio button groups
  console.log("Selecting 'Yes' for all radio button groups...")

  const radioNames = [
    'hasComponentBeenTestedExternalAccessibility',
    'hasComponentBeenTestedInternalAudit',
    'hasComponentBeenTestedUsingAssistiveTechnology'
  ]

  for (const name of radioNames) {
    await page.evaluate((name) => {
      const noRadio = document.querySelector(
        `input[name="${name}"][value="yes"]`
      )
      if (noRadio) {
        noRadio.click()
      }
    }, name)
    console.log(`Selected 'yes' for: ${name}`)
  }

  // Ensure the screenshots folder exists
  const screenshotsDir = 'tests/e2e/screenshots'
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true })
  }

  // Save screenshot after selecting radio buttons
  const filledScreenshotPath = `${screenshotsDir}/4a_accessibility-findings.png`
  await page.screenshot({ path: filledScreenshotPath, fullPage: true })

  console.log(`Screenshot saved: ${filledScreenshotPath}`)

  // Click "Continue" button again to move forward
  console.log("Clicking 'Continue' after selecting radio buttons...")

  const buttonHandleAfterSelection = await page.evaluateHandle(() => {
    return [...document.querySelectorAll('button')].find(
      (btn) => btn.innerText.trim() === 'Continue'
    )
  })

  if (!buttonHandleAfterSelection) {
    console.error('Continue button not found after selecting radio buttons!')
    return
  }

  await Promise.all([
    page.waitForNavigation({ waitUntil: 'domcontentloaded', timeout: 10000 }),
    page.evaluate((el) => el.click(), buttonHandleAfterSelection)
  ])

  console.log('Successfully moved to the next step!')
}
