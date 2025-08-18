import { test, expect, describe } from '@playwright/test'
import { AccessibilityFindingsPage } from './pages/accessibility-findings-page'
import { ExternalAuditPage } from './pages/external-audit-page'
import { CheckYourAnswersPage } from './pages/check-your-answers-page'
import dayjs from 'dayjs'

let testPage

test.beforeEach(async ({ page }) => {
  console.log(`Running ${test.info().title}`)
  testPage = new ExternalAuditPage(page)
  await testPage.goTo()
})

test('empty validation', async () => {
  await testPage.clickContinue()

  await testPage.expectErrorSummaryWithMessages([
    'Enter the name of the organisation that did the external audit',
    'The date of the external audit must include a day',
    'Enter details about issues discovered by the external audit'
  ])

  await expect(testPage.errorMessages).toHaveCount(3)
  await expect(testPage.errorMessages).toContainText([
    'Enter the name of the organisation that did the external audit',
    'The date of the external audit must include a day',
    'Enter details about issues discovered by the external audit'
  ])
})

describe('date validation', async () => {
  test.beforeEach(async () => {
    await testPage.organisationInput.fill('DAC')
  })

  test('empty month', async () => {
    await testPage.dayInput.fill('20')
    await testPage.clickContinue()

    await testPage.expectErrorSummaryContaining(
      'The date of the external audit must include a month'
    )

    await expect(testPage.errorMessages.first()).toContainText(
      'The date of the external audit must include a month'
    )
  })

  test('empty year', async () => {
    await testPage.dayInput.fill('20')
    await testPage.monthInput.fill('7')
    await testPage.clickContinue()

    await testPage.expectErrorSummaryContaining(
      'The date of the external audit must include a year'
    )

    await expect(testPage.errorMessages.first()).toContainText(
      'The date of the external audit must include a year'
    )
  })

  test('future date', async () => {
    const futureDate = dayjs().add(7, 'day')
    await testPage.dayInput.fill(`${futureDate.date()}`)
    await testPage.monthInput.fill(`${futureDate.month() + 1}`)
    await testPage.yearInput.fill(`${futureDate.year()}`)

    await testPage.clickContinue()

    await testPage.expectErrorSummaryContaining([
      'The date of the external audit must be today or in the past'
    ])

    await expect(testPage.errorMessages.first()).toContainText(
      'The date of the external audit must be today or in the past'
    )
  })

  test('date too early', async () => {
    const earlyDate = dayjs('2010-04-13 19:18')
    await testPage.dayInput.fill(`${earlyDate.date()}`)
    await testPage.monthInput.fill(`${earlyDate.month() + 1}`)
    await testPage.yearInput.fill(`${earlyDate.year()}`)

    await testPage.clickContinue()

    await testPage.expectErrorSummaryContaining([
      'The date must be on or after 1 4 2011'
    ])

    await expect(testPage.errorMessages.first()).toContainText(
      'The date must be on or after 1 4 2011'
    )
  })

  test('invalid date', async () => {
    await testPage.dayInput.fill('45')
    await testPage.monthInput.fill('23')
    await testPage.yearInput.fill(`3`)

    await testPage.clickContinue()

    await testPage.expectErrorSummaryContaining([
      'The date of the external audit must be a real date'
    ])

    await expect(testPage.errorMessages.first()).toContainText(
      'The date of the external audit must be a real date'
    )
  })
})

describe('issues discovered validation', async () => {
  test.beforeEach(async () => {
    await testPage.organisationInput.fill('DAC')
    await testPage.dayInput.fill(`${dayjs().date()}`)
    await testPage.monthInput.fill(`${dayjs().month() + 1}`)
    await testPage.yearInput.fill(`${dayjs().year()}`)
  })

  test('word count present', async () => {
    await expect(testPage.countMessage).toBeVisible()
    await expect(testPage.countMessage).toContainText('You have 250 words remaining')
  })

  test('word count reduces', async () => {
    await testPage.issuesInput.pressSequentially('word word word ')
    await expect(testPage.countMessage).toContainText(
      'You have 247 words remaining'
    )
  })

  test('too many words', async () => {
    const words = 'word '.repeat(251)

    await testPage.issuesInput.fill(words)
    await expect(testPage.countMessage).toContainText(
      'You have 1 word too many'
    )

    await testPage.clickContinue()
    await testPage.expectErrorSummaryContaining(['Enter 250 words or less'])

    await expect(testPage.errorMessages.first()).toContainText(
      'Enter 250 words or less'
    )
  })
})

describe('successful navigation', async () => {
  let accessibilityPage

  test.beforeEach(async ({ page }) => {
    accessibilityPage = new AccessibilityFindingsPage(page)
    await accessibilityPage.goTo()
  })

  test('all ok', async ({ page }) => {
    await accessibilityPage.setExternalAudit('Yes')
    await accessibilityPage.setInternalReview('No')
    await accessibilityPage.setAssistiveTech('No')

    await accessibilityPage.clickContinue()

    await testPage.organisationInput.fill('DAC')
    await testPage.dayInput.fill(`${dayjs().date()}`)
    await testPage.monthInput.fill(`${dayjs().month() + 1}`)
    await testPage.yearInput.fill(`${dayjs().year()}`)
    await testPage.issuesInput.fill('No issues')

    await testPage.clickContinue()
    await expect(page).toHaveTitle(/Component code - MoJ Design System/)
  })
})

describe('check your answers', async () => {
let accessibilityPage
  let cyaPage

  test.beforeEach(async ({ page }) => {
    accessibilityPage = new AccessibilityFindingsPage(page)
    cyaPage = new CheckYourAnswersPage(page)
    await accessibilityPage.goTo()
  })

  test('check your answers', async ({page}) => {
    // Test no External Audit
    await accessibilityPage.setExternalAudit('No')
    await accessibilityPage.setInternalReview('No')
    await accessibilityPage.setAssistiveTech('No')

    accessibilityPage.clickContinue()
    await expect(page).toHaveTitle(/Component code - MoJ Design System/)

    await page.goto(cyaPage.url)
    await expect(page).toHaveTitle(cyaPage.fullTitle)

    await expect(cyaPage.externalAuditCard).toBeVisible()
    await expect(cyaPage.externalAuditCard).toContainText('None')
    await expect(cyaPage.externalAuditCard.getByRole('link', {name: 'Change'})).toBeVisible()
    await expect(cyaPage.externalAuditCard.getByRole('link', {name: 'Remove'})).not.toBeVisible()

    // Change and complete external audit section
    await cyaPage.externalAuditCard.getByRole('link', {name: 'Change'}).click()
    await expect(page).toHaveTitle(/Accessibility findings - MoJ Design System/)

    await accessibilityPage.setExternalAudit('Yes')
    accessibilityPage.clickContinue()

    await expect(page).toHaveTitle(testPage.fullTitle)
    await testPage.organisationInput.fill('DAC')
    await testPage.dayInput.fill(`${dayjs().date()}`)
    await testPage.monthInput.fill(`${dayjs().month() + 1}`)
    await testPage.yearInput.fill(`${dayjs().year()}`)
    await testPage.issuesInput.fill('No issues')

    await testPage.clickContinue()

    await page.goto(cyaPage.url)
    await expect(page).toHaveTitle(cyaPage.fullTitle)

    await expect(cyaPage.externalAuditCard).toBeVisible()
    await expect(cyaPage.externalAuditCard).toContainText('DAC')
    await expect(cyaPage.externalAuditCard).toContainText(`${dayjs().format('D MMMM YYYY')}`)
    await expect(cyaPage.externalAuditCard).toContainText('No issues')
    await expect(cyaPage.externalAuditCard.getByRole('link', {name: 'Change'})).toBeVisible()
    await expect(cyaPage.externalAuditCard.getByRole('link', {name: 'Remove'})).toBeVisible()

    // Remove external audit section
    await cyaPage.externalAuditCard.getByRole('link', {name: 'Remove'}).click()
    await expect(page).toHaveTitle(/Are you sure you want to remove this information?/)
    await expect(page.getByText('DAC')).toBeVisible()
    await expect(page.getByText(`${dayjs().format('D MMMM YYYY')}`)).toBeVisible()
    await expect(page.getByText('No issues')).toBeVisible()

    await page.getByRole('button', {name: 'Delete answers'}).click()

    await expect(page).toHaveTitle(cyaPage.fullTitle)
    await expect(cyaPage.externalAuditCard).toBeVisible()
    await expect(cyaPage.externalAuditCard).toContainText('None')
  })
})
