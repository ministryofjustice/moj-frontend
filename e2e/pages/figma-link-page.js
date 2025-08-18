import { ContributionsPage } from "./contributions-page";

export class FigmaLinkPage extends ContributionsPage {
  constructor(page) {
    super(page)

    this.url = 'figma-link'
    this.title = 'Figma design details'

    this.linkInput = this.page.getByLabel('Add a link to a Figma design file showing the component')
    this.infoInput = this.page.getByLabel('Add information about the Figma design file (optional)')
    this.countMessage = this.page.locator('.govuk-character-count__message[aria-hidden]') // there is also a matching element for assistive tech

  }
}

