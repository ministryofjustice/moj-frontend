const fs = require('fs')

module.exports.runTest = async (page) => {
  console.log('Verifying Component Code Link Page...')

  // Ensure we're on the Accessibility Findings page
  await page.waitForSelector('h1', { visible: true })

  // Verify heading
  const heading = await page.$eval('h1', (el) => el.textContent.trim())

  if (heading !== 'Component code') {
    throw new Error(`Failed: Expected "Component code" but got "${heading}"`)
  }

  console.log('Passed: Correct Page Loaded')

  const buttonHandle = await page.evaluateHandle(() => {
    return [...document.querySelectorAll('button')].find(
      (btn) => btn.innerText.trim() === 'Continue'
    )
  })

  if (!buttonHandle) {
    throw new Error('Continue button not found!')
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
    'Enter the name of the language the code is written in'
  ]

  const allErrorsPresent = expectedErrors.every((error) =>
    errors.includes(error)
  )

  if (!allErrorsPresent) {
    throw new Error(
      `Some expected errors are missing.\nReceived: ${JSON.stringify(errors, null, 2)}`
    )
  }
  console.log('Passed: All expected errors are displayed')

  // Fill out the input fields

  console.log('Entering code language into input field')

  await page.type('#component-code-language', 'JavaScript')

  // Ensure the screenshots folder exists
  const screenshotsDir = 'tests/e2e/screenshots'
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true })
  }

  // Save screenshot before clicking Continue
  const screenshotPath = `${screenshotsDir}/7b-component-code-link.png`
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
    throw new Error('Continue button not found!')
  }

  // Click the button and wait for navigation
  await Promise.all([
    page.waitForNavigation({ waitUntil: 'domcontentloaded', timeout: 10000 }),
    button.click()
  ])

  console.log('Successfully moved to the next step!')
}
