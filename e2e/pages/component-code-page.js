import { ContributionsPage } from "./contributions-page";

export class ComponentCodePage extends ContributionsPage {
  constructor(page) {
    super(page)

    this.url = 'component-code'
    this.title = 'Component code'
  }

  async setCodeAvailable(label) {
    await this.page.getByLabel(label).check()
  }

}
