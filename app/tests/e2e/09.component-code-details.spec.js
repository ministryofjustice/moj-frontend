import { test, expect } from '@playwright/test'

import { CheckYourAnswersPage } from './pages/check-your-answers-page.js'
import { ComponentCodeDetailsPage } from './pages/component-code-details-page.js'
import { ComponentCodePage } from './pages/component-code-page.js'

let testPage

test.describe('validations', async () => {
  test.beforeEach(async ({ page }) => {
    testPage = new ComponentCodeDetailsPage(page)
    await testPage.goTo()
  })
  test('default empty state', async () => {
    await testPage.clickContinue()

    await testPage.expectErrorSummaryWithMessages([
      'Select a code language from the list',
      'Enter the code for the component'
    ])

    await expect(testPage.errorMessages).toHaveCount(2)
    await expect(testPage.errorMessages).toContainText([
      'Select a code language from the list',
      'Enter the code for the component'
    ])
  })

  test('no other code language', async () => {
    await testPage.checkRadioWithLabel('Other')
    await expect(testPage.otherLanguageInput).toBeVisible()

    await testPage.clickContinue()

    await testPage.expectErrorSummaryContaining(
      'Enter the language the code is written in'
    )

    await expect(testPage.errorMessages).toContainText([
      'Enter the language the code is written in'
    ])
  })

  test('too much code', async () => {
    await expect(testPage.countMessages).toHaveCount(2)
    await expect(testPage.codeCountMessage).toContainText(
      'You have 10,000 characters remaining'
    )

    await testPage.codeInput.pressSequentially('12345')
    await expect(testPage.codeCountMessage).toContainText(
      'You have 9,995 characters remaining'
    )

    const chars = 'a'.repeat(10001)
    await testPage.codeInput.fill(chars)
    await expect(testPage.codeCountMessage).toContainText(
      'You have 1 character too many'
    )
  })

  test('how to use too long', async () => {
    await expect(testPage.countMessages).toHaveCount(2)
    await expect(testPage.usageCountMessage).toContainText(
      'You have 250 words remaining'
    )

    await testPage.usageInput.pressSequentially('word word word ')
    await expect(testPage.usageCountMessage).toContainText(
      'You have 247 words remaining'
    )

    const words = 'word '.repeat(251)
    await testPage.usageInput.fill(words)
    await expect(testPage.usageCountMessage).toContainText(
      'You have 1 word too many'
    )
  })
})

test.describe('navigation', async () => {
  let codePage

  test.beforeEach(async ({ page }) => {
    codePage = new ComponentCodePage(page)
    testPage = new ComponentCodeDetailsPage(page)
    await codePage.goTo()
  })

  test('add single code example', async () => {
    await codePage.checkRadioWithLabel('Yes')
    await codePage.clickContinue()

    await testPage.checkRadioWithLabel('HTML')
    await testPage.codeInput.fill('<p>test</p>')
    await testPage.usageInput.fill('test')

    await testPage.clickContinue()
    await testPage.expectPageTitle('Figma design')

    await testPage.clickBack()
    await testPage.expectPageTitle('Component code details')
  })

  test('add multiple code examples', async () => {
    await codePage.checkRadioWithLabel('Yes')
    await codePage.clickContinue()

    await testPage.checkRadioWithLabel('HTML')
    await testPage.codeInput.fill('<p>test</p>')
    await testPage.usageInput.fill('test')

    await testPage.addAnotherButton.click()
    await testPage.expectPageTitle('Component code details')
    await testPage.expectSuccessAlert('Code block 1 added')

    await expect(testPage.codeInput).toHaveValue('')
    await expect(testPage.usageInput).toHaveValue('')
  })
})

test.describe('check your answers', async () => {
  let codePage
  let cyaPage

  test.beforeEach(async ({ page }) => {
    testPage = new ComponentCodeDetailsPage(page)
    codePage = new ComponentCodePage(page)
    cyaPage = new CheckYourAnswersPage(page)
    await codePage.goTo()
  })

  test('check your answers', async ({ page }) => {
    // Test no code
    await codePage.setCodeAvailable('No')

    await codePage.clickContinue()
    await testPage.expectPageTitle('Figma design')

    await page.goto(cyaPage.url)
    await testPage.expectPageTitle('Check your answers')

    await expect(cyaPage.codeBlockCards).toHaveCount(1)
    await expect(cyaPage.codeBlockCards.first()).toBeVisible()
    await expect(cyaPage.codeBlockCards.first()).toContainText('None')
    await expect(
      cyaPage.codeBlockCards.first().getByRole('link', { name: 'Change' })
    ).toBeVisible()
    await expect(
      cyaPage.codeBlockCards.first().getByRole('link', { name: 'Remove' })
    ).not.toBeVisible()

    // Change and complete external audit section
    await cyaPage.codeBlockCards
      .first()
      .getByRole('link', { name: 'Change' })
      .click()
    await testPage.expectPageTitle('Component code')

    await codePage.setCodeAvailable('Yes')
    await codePage.clickContinue()
    await testPage.expectPageTitle('Component code details')

    await testPage.checkRadioWithLabel('HTML')
    await testPage.codeInput.fill('<p>content</p>')
    await testPage.usageInput.fill('Use it')
    await testPage.clickContinue()
    await testPage.expectPageTitle('Figma design')
    // await expect(page).toHaveTitle(/Check your answers - MoJ Design System/)

    await page.goto(cyaPage.url)
    await expect(cyaPage.codeBlockCards).toHaveCount(1)
    await expect(cyaPage.codeBlockCards.first()).toBeVisible()
    await expect(cyaPage.codeBlockCards.first()).toContainText('Code block')
    await expect(cyaPage.codeBlockCards.first()).toContainText('HTML')
    await expect(cyaPage.codeBlockCards.first()).toContainText('Code provided')
    await expect(cyaPage.codeBlockCards.first()).toContainText('Use it')
    await expect(
      cyaPage.codeBlockCards
        .first()
        .getByRole('link', { name: 'View and Change' })
    ).toBeVisible()
    await expect(
      cyaPage.codeBlockCards.first().getByRole('link', { name: 'Remove' })
    ).toBeVisible()

    // Add another code block
    await cyaPage.codeBlockCards
      .first()
      .getByRole('link', { name: 'View and Change' })
      .click()
    await testPage.expectPageTitle('Component code details')

    await testPage.addAnotherButton.click()

    await testPage.checkRadioWithLabel('CSS')
    await testPage.codeInput.fill('p { color: red; }')
    await testPage.usageInput.fill('Copy and paste')
    await testPage.clickContinue()

    await testPage.expectPageTitle('Figma design')
    // await expect(page).toHaveTitle(/Check your answers - MoJ Design System/)
    await page.goto(cyaPage.url)

    await expect(cyaPage.codeBlockCards).toHaveCount(2)
    await expect(cyaPage.codeBlockCards.first()).toContainText('Code block 1')
    await expect(cyaPage.codeBlockCards.last()).toContainText('Code block 2')
    await expect(cyaPage.codeBlockCards.last()).toContainText('CSS')
    await expect(cyaPage.codeBlockCards.last()).toContainText('Code provided')
    await expect(cyaPage.codeBlockCards.last()).toContainText('Copy and paste')
    await expect(
      cyaPage.codeBlockCards
        .last()
        .getByRole('link', { name: 'View and Change' })
    ).toBeVisible()
    await expect(
      cyaPage.codeBlockCards.last().getByRole('link', { name: 'Remove' })
    ).toBeVisible()

    // Remove code block
    await cyaPage.codeBlockCards
      .last()
      .getByRole('link', { name: 'Remove' })
      .click()
    await expect(page).toHaveTitle(
      /Are you sure you want to remove this information?/
    )
    await expect(page.getByText('css')).toBeVisible()
    await expect(page.getByText('p { color: red; }')).toBeVisible()
    await expect(page.getByText('Copy and paste')).toBeVisible()
    await page.getByRole('button', { name: 'Delete answers' }).click()

    await testPage.expectPageTitle('Check your answers')
    await expect(cyaPage.codeBlockCards).toHaveCount(1)
    await expect(cyaPage.codeBlockCards.first()).toContainText('Code block')
  })
})
