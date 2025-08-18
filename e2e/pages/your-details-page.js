import { ContributionsPage } from './contributions-page.js'

export class YourDetailsPage extends ContributionsPage {
  constructor(page) {
    super(page)

    this.url = 'your-details'
    this.title = 'Your details'

    this.nameInput = this.page.getByLabel('Full name')
    this.teamInput = this.page.getByLabel(
      'What team were you in when this component was created?'
    )

    this.shareNameCheckbox = this.page.getByLabel(
      'Add my name to the component page'
    )
    this.shareTeamCheckbox = this.page.getByLabel(
      'Add my team name to the component page'
    )
  }
}
