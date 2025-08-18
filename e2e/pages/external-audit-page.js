import { ContributionsPage } from "./contributions-page";

export class ExternalAuditPage extends ContributionsPage {
  constructor(page) {
    super(page)

    this.url = 'add-external-audit'
    this.title = 'External accessibility audit'

    this.organisationInput = this.page.getByLabel('Which organisation did the external accessibility audit?')
    this.dayInput = this.page.getByLabel('Day')
    this.monthInput = this.page.getByLabel('Month')
    this.yearInput = this.page.getByLabel('Year')
    this.issuesInput = this.page.getByLabel('Enter details about issues discovered by the external audit')
    this.countMessage = this.page.locator('.govuk-character-count__message[aria-hidden]') // there is also a matching element for assistive tech
  }
}
