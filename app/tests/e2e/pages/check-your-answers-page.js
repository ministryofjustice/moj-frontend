import { ContributionsPage } from './contributions-page.js'

export class CheckYourAnswersPage extends ContributionsPage {
  constructor(page) {
    super(page)

    this.url = 'check-your-answers'
    this.title = 'Check your answers'

    this.summaryCards = this.page.locator('.govuk-summary-card')
    this.componentDetailsCard = this.summaryCards.filter({
      has: page.getByRole('heading', { name: 'Component details' })
    })
    this.componentImageCard = this.summaryCards.filter({
      has: page.getByRole('heading', { name: 'Component image' })
    })
    this.externalAuditCard = this.summaryCards.filter({
      has: page.getByRole('heading', { name: 'External accessibility audit' })
    })
    this.internalReviewCard = this.summaryCards.filter({
      has: page.getByRole('heading', { name: 'Internal accessibility review' })
    })
    this.assistiveTechCard = this.summaryCards.filter({
      has: page.getByRole('heading', {
        name: 'Testing with assistive technology'
      })
    })
    this.codeBlockCards = this.summaryCards.filter({ hasText: /Code block/ })
    this.figmaCard = this.summaryCards.filter({
      has: page.getByRole('heading', { name: 'Figma design details' })
    })
    this.yourDetailsCard = this.summaryCards.filter({
      has: page.getByRole('heading', { name: 'Your details' })
    })
  }
}
