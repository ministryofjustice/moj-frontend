import { ContributionsPage } from "./contributions-page";

export class ComponentCodeDetailsPage extends ContributionsPage {
  constructor(page) {
    super(page)

    this.url = 'component-code-details'
    this.title = 'Component code details'

    this.codeInput = this.page.getByLabel('Add the code')
    this.usageInput = this.page.getByLabel('How do you use the code? (optional)')
    this.otherLanguageInput = this.page.getByLabel('Enter the code language')
    this.addAnotherButton = this.page.getByRole('button', {name: 'Add another code block'})

    this.countMessages = this.page.locator('.govuk-character-count__message[aria-hidden]') // there is also a matching element for assistive tech
    this.codeCountMessage = this.countMessages.first()
    this.usageCountMessage = this.countMessages.last()
  }
}
