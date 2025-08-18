import { test, expect } from '@playwright/test'

import { FigmaLinkPage } from './pages/figma-link-page.js'
import { FigmaPage } from './pages/figma-page.js'

let testPage

test.beforeEach(async ({ page }) => {
  console.log(`Running ${test.info().title}`)
  testPage = new FigmaLinkPage(page)
  await testPage.goTo()
})

test.describe('validations', async () => {
  test('empty state', async () => {
    await testPage.clickContinue()

    await testPage.expectErrorSummaryWithMessages([
      'Enter the link to the Figma design file'
    ])

    await expect(testPage.errorMessages).toHaveCount(1)
    await expect(testPage.errorMessages).toContainText([
      'Enter the link to the Figma design file'
    ])
  })

  test('non figma link', async () => {
    await testPage.linkInput.fill('https://google.com')
    await testPage.clickContinue()

    await testPage.expectErrorSummaryWithMessages([
      'Add a link to a Figma design file'
    ])

    await expect(testPage.errorMessages).toHaveCount(1)
    await expect(testPage.errorMessages).toContainText([
      'Add a link to a Figma design file'
    ])
  })

  test('invalid url', async () => {
    await testPage.linkInput.fill('not a url')
    await testPage.clickContinue()

    await testPage.expectErrorSummaryWithMessages(['Add a real URL'])

    await expect(testPage.errorMessages).toHaveCount(1)
    await expect(testPage.errorMessages).toContainText(['Add a real URL'])
  })

  test.describe('character count', async () => {
    test.beforeEach(async () => {
      await testPage.linkInput.fill('https://figma.com/design')
    })

    test('remaining count visible', async () => {
      await expect(testPage.countMessage).toBeVisible()
      await expect(testPage.countMessage).toHaveText(
        'You have 250 words remaining'
      )
    })

    test('count reduces', async () => {
      await testPage.infoInput.pressSequentially('word word word ')
      await expect(testPage.countMessage).toHaveText(
        'You have 247 words remaining'
      )
    })

    test('content too long', async () => {
      const words = 'word '.repeat(251)
      await testPage.infoInput.fill(words)
      await expect(testPage.countMessage).toHaveText('You have 1 word too many')

      await testPage.clickContinue()

      await testPage.expectErrorSummaryWithMessages(['Enter 250 words or less'])

      await expect(testPage.errorMessages).toHaveCount(2) // Includes the countMessage as well as validation error
      await expect(testPage.errorMessages).toContainText([
        'Enter 250 words or less'
      ])
    })
  })
})

test.describe('navigation', async () => {
  let figmaPage

  test.beforeEach(async ({ page }) => {
    console.log(`Running ${test.info().title}`)
    figmaPage = new FigmaPage(page)
    testPage = new FigmaLinkPage(page)
    await figmaPage.goTo()
  })

  test('next page', async () => {
    await figmaPage.checkRadioWithLabel('Yes')
    await figmaPage.clickContinue()

    await testPage.linkInput.fill('https://figma.com/awesome-component')
    await testPage.clickContinue()

    await expect(testPage.page).toHaveTitle(/Your details - MoJ Design System/)
  })
})
