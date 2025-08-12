import { ContributionsPage } from "./contributions-page";

export class AccessibilityFindingsPage extends ContributionsPage {

  constructor(page) {
    super(page)

    this.url = 'accessibility-findings'
    this.title = 'Accessibility findings'

    this.externalAuditFieldset = page.getByRole('group', {name: 'Has the component been tested in an external accessibility audit?'})
    this.internalReviewFieldset = page.getByRole('group', {name: 'Has the component been reviewed internally?'})
    this.assistiveTechFieldset = page.getByRole('group', {name: 'Has the component been tested with assistive technology?'})
  }

  async setExternalAudit(radioLabel) {
    await this.externalAuditFieldset.getByLabel(radioLabel).click()
  }
  async setInternalReview(radioLabel) {
    await this.internalReviewFieldset.getByLabel(radioLabel).click()
  }
  async setAssistiveTech(radioLabel) {
    await this.assistiveTechFieldset.getByLabel(radioLabel).click()
  }

}
