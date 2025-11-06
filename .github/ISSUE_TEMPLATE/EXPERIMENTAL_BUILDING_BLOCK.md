---
name: Experimental Building Block
about: Checklist when reviewing Experimental building blocks.
---
## Submission details

[View the pull request](__URL__)

[View preview](https://moj-frontend-pr-__NUMBER__.apps.live.cloud-platform.service.justice.gov.uk)

## 1. Initial review

- [ ] Add a screenshot of the [preview](https://moj-frontend-pr-__NUMBER__.apps.live.cloud-platform.service.justice.gov.uk) into a miro frame on the review board 
    - [@helennickols](https://github.com/helennickols)
- [ ] Async review: add comments on stickies
    - [@helennickols](https://github.com/helennickols), [@murrlipp](https://github.com/murrlipp), [@chrispymm](https://github.com/chrispymm)
- [ ] Weekly 30min call: review comments, define queries (if any)
    - [@helennickols](https://github.com/helennickols), [@murrlipp](https://github.com/murrlipp), [@chrispymm](https://github.com/chrispymm), [@asma-ban](https://github.com/asma-ban)

## 2. Decision point

- [ ] The component **does not** the criteria - contact the contributor explaining the reasons for rejection 
    - Decide in weekly call who contacts the contributor
- [ ] The component **does** meet the criteria - go to section 3 

## 3. Queries (if any)

- [ ] There **are** queries for the contributor - contact the contributor with queries
    - Decide in weekly call who contacts the contributor
- [ ] There **are no** queries for the contributor - go to section 4

## 4. Tasks to be done before the release date is set

[@helennickols](https://github.com/helennickols):
- [ ] Content: Write a `lede` and `summary` and add to the [pull request](__URL__)
- [ ] Content: Write release notes and share for feedback
- [ ] Image: Is the image free of confidential data, e.g. prison procedures?
- [ ] Image: Is the image free of PII?
- [ ] Image: Does the image show the component clearly?

[@chrispymm](https://github.com/chrispymm):
- [ ] Code: Does the code look ok?
- [ ] Code: Does it match the language(s)?
- [ ] Code: Will the code produce something that looks like the image?
- [ ] Code: Is it free of 3rd party dependencies?
- [ ] Code: Is it free of external requests?

[@murrlipp](https://github.com/murrlipp):
- [ ] A11y: Do the a11y comments relate to the component?
- [ ] A11y: Write alt text for contributed image
- [ ] Thumbnail: Create a thumbnail and add to [pull request](__URL__)
- [ ] Figma: Does the Figma component look like the image?
- [ ] Figma: Add component to MOJ Figma Kit in new branch

## 5. Set release date

- [ ] Set the release date
    - [@helennickols](https://github.com/helennickols), [@murrlipp](https://github.com/murrlipp), [@chrispymm](https://github.com/chrispymm), [@asma-ban](https://github.com/asma-ban)
- [ ] Add release date to the team calendar
    - [@asma-ban](https://github.com/asma-ban)

## 6. Tasks to be done **in order** after the release date is set

[@murrlipp](https://github.com/murrlipp):
- [ ] 1. Add release date to Figma page
- [ ] 2. Merge Figma branch
- [ ] 3. Add Figma link to [pull request](__URL__)
- [ ] 4. Create Github discussion and add link to [pull request](__URL__)
- [ ] 5. Publish Figma kit internally and externally

[@chrispymm](https://github.com/chrispymm):
- [ ] 6. Merge the [pull request](__URL__) and check deployment

[@helennickols](https://github.com/helennickols):
- [ ] 7. Contact contributor
- [ ] 8. Send release notes

[@asma-ban](https://github.com/asma-ban) / [@robertjmccarthy](https://github.com/robertjmccarthy) / [@NatashaMcGuireMOJ](https://github.com/NatashaMcGuireMOJ):
- [ ] 9. Add component to analytics spreadsheet