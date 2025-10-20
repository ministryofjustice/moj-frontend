---
name: Experimental Building Block
about: Checklist when reviewing Experimental building blocks.
---
## Submission details

[View the pull request](__URL__)

[View preview](https://moj-frontend-pr-__NUMBER__.apps.live.cloud-platform.service.justice.gov.uk)

## Action list

- [ ] Create a GitHub Discussion thread for the component and reference it on the component page
- [ ] CD: Write a `lede` and add it to the PR. Check with the submitter that they are happy with the description (TBC)
- [ ] IxD: Update the alt text for the component image on the overview tab
- [ ] IxD: Create a thumbnail for the '[View all components](https://design-patterns.service.justice.gov.uk/components)' page
    - [ ] The format should be `png`, the size `528x311px`, on a white background with no border
    - [ ] It should be named `thumb-[component-name].png` and added to `docs/assets/images/thumbs`
- [ ] IxD: Add Figma design (if supplied) to central ‘MOJ Figma kit’ library and add the link on the component page
    - [ ] Create a new page with named `EXPERIMENTAL: [Component name]`
    - [ ] Add the release date
    - [ ] Add the guidance URL
    - [ ] Copy and paste the component out of the supplied Figma file, and ensure it is set up as a component.
    - [ ] Ensure any building blocks (subcomponents of the main component) are set to not publish.

## Checklist

### Overall Experimental building block documentation

### Overview page
- [ ] Is the building block name accurate and unique?
- [ ] Does the image show the building block (accurately and with nothing else)?

### Code tab (if applicable)

- [ ] Does the code work?
- [ ] Does the code match the specified languages?
- [ ] Does the code visually match the building block image?
- [ ] Is it free from 3rd party dependencies?
- [ ] Is it free from external requests?


### Accessibility tab (if applicable)

- [ ] Are the accessibility issues relevant to the building block?
      
### Designs tab (if applicable)

- [ ] Do the Figma links work and go to where expected?
- [ ] Is the link free of password protection?

## Decision point

- [ ] Has the checklist been completed?

If NO → Stop and notify contributors of all outstanding issues. 
If YES → Proceed to the next step. 

## Release

- [ ] Dev: Merge the [pull request](__URL__) and check deployment
- [ ] IxD: Publish updates to the MOJ Figma Kit
- [ ] DM/PM: Inform the contributor and the community via email and Slack, referencing the GitHub Discussion
- [ ] DM/PM: Add a tab in the analytics dashboard for the new building block
