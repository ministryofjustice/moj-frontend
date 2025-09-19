import { expect } from '@playwright/test'

export class ContributionsPage {
  constructor(page) {
    this.page = page

    this.continueButton = page.getByRole('button', { name: 'Continue' })
    this.errorSummary = page.locator('.govuk-error-summary')
    this.errorMessages = page.locator('.govuk-error-message')
    this.backLink = page.getByRole('link', { name: 'Back' })
    this.successAlert = page.getByRole('alert')
    this.main = page.locator('#main-content')
  }

  get fullTitle() {
    return `${this.title} - Submit a component - MoJ Design System`
  }

  async goTo() {
    // Email verification steps
    await this.page.goto('start')
    await this.page.waitForLoadState()
    await this.continueButton.click()
    await this.page.waitForLoadState()
    await this.page
      .getByLabel('Enter your MoJ email address')
      .fill('test.user@justice.gov.uk')
    await this.continueButton.click()
    await this.expectPageTitle('Component details')

    // Now we can navigate to any page in the flow
    await this.page.goto(this.url)
    await this.expectPageTitle(this.title)
  }

  async clickContinue() {
    await this.continueButton.click()
  }

  async clickBack() {
    await this.backLink.click()
  }

  async checkRadioWithLabel(label, fieldsetLabel) {
    if (fieldsetLabel) {
      await this.page
        .getByRole('group', { name: fieldsetLabel })
        .getByLabel(label)
        .check()
    } else {
      await this.page.getByLabel(label).check()
    }
  }

  async expectErrorSummaryWithMessages(messages) {
    await expect(this.errorSummary).toBeVisible()
    await expect(this.errorSummary).toBeFocused()
    await expect(this.errorSummary.getByRole('listitem')).toHaveText(messages)
  }

  async expectErrorSummaryContaining(message) {
    await expect(this.errorSummary).toBeVisible()
    await expect(this.errorSummary).toBeFocused()
    await expect(this.errorSummary).toContainText(message)
  }

  async expectSuccessAlert(message) {
    await expect(this.successAlert).toBeVisible()
    await expect(this.successAlert).toBeFocused()
    await expect(this.successAlert).toContainText(message)
  }

  async exepctAllLinksToHaveGovUkLinkClass() {
    const links = await this.main.locator('a')
    const count = await links.count()

    // Check each link has the expected class
    for (let i = 0; i < count; i++) {
      await expect(links.nth(i)).toHaveClass('govuk-link')
    }
  }

  async expectPageTitle(title) {
    // Full title of page we want to navigate to
    const re = new RegExp(`${title} - Submit a component - MoJ Design System`)
    await expect(this.page).toHaveTitle(re)
  }
}
