import { ContributionsPage } from './contributions-page.js'

export class AssistiveTechPage extends ContributionsPage {
  constructor(page) {
    super(page)

    this.url = 'add-assistive-tech'
    this.title = 'Testing with assistive technology'

    this.dayInput = this.page.getByLabel('Day')
    this.monthInput = this.page.getByLabel('Month')
    this.yearInput = this.page.getByLabel('Year')
    this.issuesInput = this.page.getByLabel(
      'Enter details about issues discovered by the assistive technology testing'
    )
    this.countMessage = this.page.locator(
      '.govuk-character-count__message[aria-hidden]'
    ) // there is also a matching element for assistive tech
  }
}
