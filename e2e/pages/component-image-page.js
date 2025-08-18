import { ContributionsPage } from "./contributions-page";
import path from 'path';

export class ComponentImagePage extends ContributionsPage {

  constructor(page) {
    super(page)

    this.url = 'component-image'
    this.title = 'Component image'

    this.uploadButton = page.getByRole('button', { name: 'Upload', exact: true })
    this.fileInput = page.getByLabel('Upload a file')
    this.summaryList = page.locator('.govuk-summary-list')
    this.removeLink = this.summaryList.getByRole('link', { name: 'Remove' } )
  }

  async clickUpload() {
    await this.uploadButton.click()
  }

  async uploadFile(filename) {
    await this.fileInput.setInputFiles(path.join(__dirname, '../test-files/', filename))
  }
}


