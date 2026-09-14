const path = require('path')

const { test, expect } = require('@playwright/test')

const { bundleComponent } = require('../../lib/bundle.js')
const { render, getExamples } = require('../../lib/components.js')

let bundledComponent
let componentStyles

const initialiseDatePickers = () => {
  document
    .querySelectorAll('[data-module="moj-date-picker"]')
    .forEach(($datePicker) => {
      /* eslint-disable no-new, no-undef */
      // @ts-expect-error DatePicker is in page scope, not test scope
      new DatePicker($datePicker)
    })
}

async function setupPage(page, examples, exampleName) {
  await page.setContent(render('date-picker', examples[exampleName], true))
  await page.addStyleTag({ content: componentStyles })
  await page.addScriptTag({ content: bundledComponent, type: 'module' })
  // @ts-expect-error DatePicker is in page scope, not test scope
  await page.waitForFunction(() => typeof DatePicker !== 'undefined')
  await page.evaluate(initialiseDatePickers)
}

test.describe('date picker', () => {
  let examples

  test.beforeAll(async () => {
    examples = await getExamples('date-picker')
    bundledComponent = await bundleComponent(
      path.join(__dirname, 'date-picker.mjs'),
      'DatePicker'
    )
    componentStyles = (
      await require('sass-embedded').compile(
        path.join(__dirname, '_date-picker.scss'),
        {
          loadPaths: [path.join(__dirname, '../../../../')],
          quietDeps: true
        }
      )
    ).css
  })

  test.afterEach(async ({ page }) => {
    await page.setContent('')
  })

  test('initialises the default fixture', async ({ page }) => {
    await setupPage(page, examples, 'default')

    const component = page.locator('.moj-datepicker')
    await expect(component.getByLabel('Appointment date')).toBeVisible()
    await expect(
      component.getByRole('button', { name: 'Choose date' })
    ).toBeVisible()
  })

  test('opens and closes the calendar', async ({ page }) => {
    await setupPage(page, examples, 'default')

    const component = page.locator('.moj-datepicker')
    const calendar = component.getByRole('dialog')
    const toggle = component.getByRole('button', { name: 'Choose date' })

    await expect(calendar).toBeHidden()
    await toggle.click()
    await expect(calendar).toBeVisible()
    await expect(calendar.getByRole('heading', { level: 2 })).toBeVisible()
    await toggle.click()
    await expect(calendar).toBeHidden()
  })

  test('preserves macro options for the initialized component', async ({
    page
  }) => {
    await setupPage(page, examples, 'with leading zeros and Sunday week start')

    const component = page.locator('.moj-datepicker')
    const input = component.getByLabel('Appointment date')
    await component.getByRole('button', { name: 'Choose date' }).click()
    await page.pause() // Wait for the calendar to render
    await expect(component.locator('thead th').first()).toHaveAccessibleName(
      'Sunday'
    )
    await component.locator('tbody').getByRole('button').first().click()
    await expect(input).toHaveValue(/^\d{2}\/\d{2}\/\d{4}$/)
  })

  test('renders initial values and error messages', async ({ page }) => {
    await setupPage(page, examples, 'with value')
    await expect(page.getByLabel('Appointment date')).toHaveValue('17/5/2024')

    await setupPage(page, examples, 'with error')
    await expect(page.locator('.govuk-error-message')).toContainText(
      'Enter an appointment date'
    )
  })
})
