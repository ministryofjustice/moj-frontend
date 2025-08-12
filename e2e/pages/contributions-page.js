import { expect } from '@playwright/test';

export class ContributionsPage {
  constructor(page) {
    this.page = page;

    this.continueButton = page.getByRole('button', { name: 'Continue' })
    this.errorSummary = page.locator('.govuk-error-summary')
    this.backLink = page.getByRole('link', { name: 'Back' })
  }

  get fullTitle() {
    return `${this.title} - MoJ Design System`
  }

  async goTo() {
    await this.page.goto('start');
    await this.page.waitForLoadState();
    await this.continueButton.click();
    await this.page.waitForLoadState();

    const re = new RegExp(`${this.fullTitle}`)
    await this.page.goto(this.url)
    await expect(this.page).toHaveTitle(re);
  }
}
