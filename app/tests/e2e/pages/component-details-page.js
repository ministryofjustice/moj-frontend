import { ContributionsPage } from './contributions-page.js'

export class ComponentDetailsPage extends ContributionsPage {
  constructor(page) {
    super(page)

    this.url = 'component-details'
    this.title = 'Component details'

    this.nameInput = this.page.getByLabel('What’s the name of the component?')
    this.descriptionInput = this.page.getByLabel('Describe the component')
    this.usageInput = this.page.getByLabel('How is the component being used?')
  }
}
