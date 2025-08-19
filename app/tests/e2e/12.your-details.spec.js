import { test, expect } from '@playwright/test'

import { CheckYourAnswersPage } from './pages/check-your-answers-page.js'
import { YourDetailsPage } from './pages/your-details-page.js'

let testPage

test.beforeEach(async ({ page }) => {
  testPage = new YourDetailsPage(page)
  await testPage.goTo()
})

test('empty state', async () => {
  await testPage.clickContinue()

  await testPage.expectErrorSummaryWithMessages([
    'Enter your full name',
    'Enter the team you were in when this component was created'
  ])

  await expect(testPage.errorMessages).toHaveCount(2)
  await expect(testPage.errorMessages).toContainText([
    'Enter your full name',
    'Enter the team you were in when this component was created'
  ])
})

test('only first name', async () => {
  await testPage.nameInput.fill('Murdock')
  await testPage.teamInput.fill('The A Team')
  await testPage.clickContinue()

  await testPage.expectErrorSummaryWithMessages([
    'Enter your full name with at least two words'
  ])

  await expect(testPage.errorMessages).toHaveCount(1)
  await expect(testPage.errorMessages).toContainText([
    'Enter your full name with at least two words'
  ])
})

test('all ok', async () => {
  await testPage.nameInput.fill('B.A. Baracus')
  await testPage.teamInput.fill('The A Team')
  await testPage.clickContinue()

  await expect(testPage.page).toHaveTitle(
    /Check your answers - MoJ Design System/
  )
})

test.describe('check your details', async () => {
  let cyaPage

  test.beforeEach(async ({ page }) => {
    cyaPage = new CheckYourAnswersPage(page)
    await testPage.nameInput.fill('B.A. Baracus')
    await testPage.teamInput.fill('The A Team')
  })

  test('share no details', async () => {
    await testPage.clickContinue()

    await expect(testPage.page).toHaveTitle(cyaPage.fullTitle)

    await expect(cyaPage.yourDetailsCard).toBeVisible()
    await expect(cyaPage.yourDetailsCard).toContainText('B.A. Baracus')
    await expect(cyaPage.yourDetailsCard).toContainText('The A Team')
    await expect(cyaPage.yourDetailsCard).toContainText(
      'Do not share my details'
    )
  })

  test('only share name', async () => {
    await testPage.shareNameCheckbox.check()
    await testPage.shareTeamCheckbox.uncheck()
    await testPage.clickContinue()

    await expect(testPage.page).toHaveTitle(cyaPage.fullTitle)

    await expect(cyaPage.yourDetailsCard).toBeVisible()
    await expect(cyaPage.yourDetailsCard).toContainText('B.A. Baracus')
    await expect(cyaPage.yourDetailsCard).toContainText('The A Team')
    await expect(cyaPage.yourDetailsCard).toContainText(
      'Add my name to the component page'
    )
    await expect(cyaPage.yourDetailsCard).toContainText(
      'Do not add my team name to the component page'
    )
  })

  test('only share team', async () => {
    await testPage.shareNameCheckbox.uncheck()
    await testPage.shareTeamCheckbox.check()
    await testPage.clickContinue()

    await expect(testPage.page).toHaveTitle(cyaPage.fullTitle)

    await expect(cyaPage.yourDetailsCard).toBeVisible()
    await expect(cyaPage.yourDetailsCard).toContainText('B.A. Baracus')
    await expect(cyaPage.yourDetailsCard).toContainText('The A Team')
    await expect(cyaPage.yourDetailsCard).toContainText(
      'Do not add my name to the component page'
    )
    await expect(cyaPage.yourDetailsCard).toContainText(
      'Add my team name to the component page'
    )
  })

  test('share all details', async () => {
    await testPage.shareNameCheckbox.check()
    await testPage.shareTeamCheckbox.check()
    await testPage.clickContinue()

    await expect(testPage.page).toHaveTitle(cyaPage.fullTitle)
    await expect(cyaPage.yourDetailsCard).toContainText('B.A. Baracus')
    await expect(cyaPage.yourDetailsCard).toContainText('The A Team')
    await expect(cyaPage.yourDetailsCard).toContainText(
      'Add my name to the component page'
    )
    await expect(cyaPage.yourDetailsCard).toContainText(
      'Add my team name to the component page'
    )
  })
})
