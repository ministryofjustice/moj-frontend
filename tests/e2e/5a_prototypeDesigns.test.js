const fs = require('fs')

module.exports.runTest = async (page) => {
  console.log('Verifying Prototype Designs Page...')

  // Ensure we're on the Prototype Designs page
  await page.waitForSelector('h1', { visible: true })

  // Verify heading
  const heading = await page.$eval('h1', (el) => el.textContent.trim())

  if (heading !== 'Prototype designs') {
    throw new Error(`Failed: Expected "Prototype designs" but got "${heading}"`)
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
    'Select yes if you have a prototype link for the component'
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

  // Select "Yes" for all radio button groups
  console.log("Selecting 'Yes' for all radio button groups...")

  const radioNames = ['componentPrototypeUrl']

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

  // Save screenshot before clicking Continue
  const screenshotPath = `${screenshotsDir}/5a-prototype-designs.png`
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
