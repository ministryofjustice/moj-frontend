import { test, expect } from '@playwright/test'

import { FigmaLinkPage } from './pages/figma-link-page.js'
import { FigmaPage } from './pages/figma-page.js'

let testPage

test.beforeEach(async ({ page }) => {
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

    await testPage.expectErrorSummaryWithMessages([
      'Add a link to a Figma design file'
    ])

    await expect(testPage.errorMessages).toHaveCount(1)
    await expect(testPage.errorMessages).toContainText([
      'Add a link to a Figma design file'
    ])
  })
})

test.describe('navigation', async () => {
  let figmaPage

  test.beforeEach(async ({ page }) => {
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
