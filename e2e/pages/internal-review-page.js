import { ContributionsPage } from "./contributions-page";

export class InternalReviewPage extends ContributionsPage {
  constructor(page) {
    super(page)

    this.url = 'add-internal-audit'
    this.title = 'Internal accessibility review'

    this.organisationInput = this.page.getByLabel('What team did the internal accessibility review?')
    this.dayInput = this.page.getByLabel('Day')
    this.monthInput = this.page.getByLabel('Month')
    this.yearInput = this.page.getByLabel('Year')
    this.issuesInput = this.page.getByLabel('Enter details about issues discovered by the internal review')
    this.countMessage = this.page.locator('.govuk-character-count__message[aria-hidden]') // there is also a matching element for assistive tech
  }
}
