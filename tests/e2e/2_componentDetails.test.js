const fs = require('fs')
const path = require('path')

module.exports.runTest = async (page) => {
  console.log('Verifying Component Details Page...')

  // Ensure we're on the Component Details page
  await page.waitForSelector('h1', { visible: true })

  // Verify heading
  const heading = await page.$eval('h1', (el) => el.textContent.trim())

  if (heading === 'Component details') {
    console.log('Passed: Correct Page Loaded')
  } else {
    console.error(`Failed: Expected "Component Details" but got "${heading}"`)
    return
  }

  // Click "Continue" button before filling out inputs
  console.log(
    "Clicking 'Continue' without entering data to trigger validation errors..."
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
    'Enter the name of the component',
    'Enter an overview description of the component',
    'Enter an answer for how the component is used currently'
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

  // Fill out the input fields
  console.log('Filling out input fields...')
  await page.type('#component-name', 'Test Component', { delay: 0 })
  await page.type(
    '#component-overview',
    'This is a test description for the component.',
    { delay: 0 }
  )
  await page.type(
    '#how-is-the-component-used',
    'This is a test description for how the component is used.',
    { delay: 0 }
  )

  // Ensure the screenshots folder exists
  const screenshotsDir = 'tests/e2e/screenshots'
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true })
  }

  // Save screenshot after filling inputs
  const filledScreenshotPath = `${screenshotsDir}/2_component-details.png`
  await page.screenshot({ path: filledScreenshotPath, fullPage: true })

  console.log(`Screenshot saved: ${filledScreenshotPath}`)

  // Click "Continue" button again to move forward
  console.log("Clicking 'Continue' after filling out the form...")

  const buttonHandleAfterInput = await page.evaluateHandle(() => {
    return [...document.querySelectorAll('button')].find(
      (btn) => btn.innerText.trim() === 'Continue'
    )
  })

  if (!buttonHandleAfterInput) {
    console.error('Continue button not found after filling inputs!')
    return
  }

  await Promise.all([
    page.waitForNavigation({ waitUntil: 'domcontentloaded', timeout: 10000 }),
    page.evaluate((el) => el.click(), buttonHandleAfterInput)
  ])

  console.log('Successfully moved to the next step!')
}
