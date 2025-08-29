import { test, expect } from '@playwright/test'

import { CheckYourAnswersPage } from './pages/check-your-answers-page.js'
import { ComponentDetailsPage } from './pages/component-details-page.js'

let testPage
let cyaPage

test.beforeEach(async ({ page }) => {
  testPage = new ComponentDetailsPage(page)
  cyaPage = new CheckYourAnswersPage(page)
  await testPage.goTo()
})

test('validation', async () => {
  await testPage.clickContinue()

  await testPage.expectErrorSummaryWithMessages([
    'Enter the name of the component',
    'Enter a description of the component',
    'Enter an answer for how the component is being used'
  ])

  await expect(testPage.errorMessages).toHaveCount(3)
  await expect(testPage.errorMessages).toContainText([
    'Enter the name of the component',
    'Enter a description of the component',
    'Enter an answer for how the component is being used'
  ])
})

test('component details', async ({ page }) => {
  await testPage.nameInput.fill('Accordion')
  await testPage.descriptionInput.fill('It expands and contracts')
  await testPage.usageInput.fill('To hide and show content')

  await testPage.clickContinue()

  await expect(page).toHaveTitle(/Component image - MoJ Design System/)
})

test('check your answers', async ({ page }) => {
  await testPage.nameInput.fill('Accordion')
  await testPage.descriptionInput.fill('It expands and contracts')
  await testPage.usageInput.fill('To hide and show content')

  await testPage.clickContinue()
  await expect(page).toHaveTitle(/Component image - MoJ Design System/)

  await cyaPage.goTo()
  await expect(page).toHaveTitle(cyaPage.fullTitle)
  await expect(cyaPage.componentDetailsCard).toBeVisible()
  await expect(cyaPage.componentDetailsCard).toContainText('Accordion')
  await expect(cyaPage.componentDetailsCard).toContainText(
    'It expands and contracts'
  )
  await expect(cyaPage.componentDetailsCard).toContainText(
    'To hide and show content'
  )

  await expect(
    cyaPage.componentDetailsCard.getByRole('link', { name: 'Change' })
  ).toBeVisible()
  await expect(
    cyaPage.componentDetailsCard.getByRole('link', { name: 'Remove' })
  ).not.toBeVisible()

  await cyaPage.componentDetailsCard
    .getByRole('link', { name: 'Change' })
    .click()
  await expect(page).toHaveTitle(testPage.fullTitle)
})
