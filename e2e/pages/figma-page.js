import { ContributionsPage } from "./contributions-page";

export class FigmaPage extends ContributionsPage {
  constructor(page) {
    super(page)

    this.url = 'figma'
    this.title = 'Figma design'
  }

}
