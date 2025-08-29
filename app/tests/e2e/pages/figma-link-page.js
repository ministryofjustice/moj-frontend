import { ContributionsPage } from './contributions-page.js'

export class FigmaLinkPage extends ContributionsPage {
  constructor(page) {
    super(page)

    this.url = 'figma-link'
    this.title = 'Figma design details'

    this.linkInput = this.page.getByLabel(
      'Add a link to a Figma design file showing the component'
    )
  }
}
