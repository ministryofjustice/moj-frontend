---
name: Experimental Building Block
about: Checklist for reviewing Experimental building blocks.
---
## Submission details

[View the pull request](__URL__)

[View preview](https://moj-frontend-pr-__NUMBER__.apps.live.cloud-platform.service.justice.gov.uk/__SLUG__)

## 1. Initial review

- [ ] Add a screenshot of the [preview](https://moj-frontend-pr-__NUMBER__.apps.live.cloud-platform.service.justice.gov.uk/__SLUG__) into a miro frame on the review board 
    - anyone
- [ ] Async review: add comments on stickies
    - [@helennickols](https://github.com/helennickols), [@lewislankshear](https://github.com/lewislankshear), [@chrispymm](https://github.com/chrispymm)
- [ ] In 30min call: review comments, define queries (if any)
    - [@helennickols](https://github.com/helennickols), [@lewislankshear](https://github.com/lewislankshear) [@chrispymm](https://github.com/chrispymm),  

## 2. Decision point

- [ ] The component **does not** meet the criteria - contact the contributor to explain 
    - Decide in weekly call who does this 
- [ ] The component meets the criteria - go to section 3 

## 3. Queries (if any)

- [ ] There **are** queries for the contributor - contact the contributor  
    - Decide in weekly call who does this
- [ ] There **are not** queries for the contributor - go to section 4

## 4. Before release date is set

[@helennickols](https://github.com/helennickols):
- [ ] Content: Write a `lede` and `summary` and add to the [pull request](__URL__)
- [ ] Content: Write release notes
- [ ] Write alt text for contributed image
- [ ] Image: Is the image free of confidential data, e.g. prison procedures?
- [ ] Image: Is the image free of PII?
- [ ] Image: Does the image show the component clearly?

[@chrispymm](https://github.com/chrispymm) (delete section if not applicable):
- [ ] Code: Does the code look ok?
- [ ] Code: Does it match the language(s)?
- [ ] Code: Will the code produce something that looks like the image?
- [ ] Code: Is it free of 3rd party dependencies?
- [ ] Code: Is it free of external requests?
      
[@lewislankshear](https://github.com/lewislankshear) (delete section if not applicable):
- [ ] A11y: Do the a11y comments relate to the component?
- [ ] Thumbnail: Create a thumbnail and add to [pull request](__URL__)

[@lewislankshear](https://github.com/lewislankshear) (delete section if not applicable):
- [ ] Figma: Does the Figma component look like the image?
- [ ] Figma: Add component to MOJ Figma Kit in new branch

## 5. Set release date

- [ ] Set the release date
    - [@helennickols](https://github.com/helennickols), [@lewislankshear](https://github.com/lewislankshear), [@chrispymm](https://github.com/chrispymm), [@asma-ban](https://github.com/asma-ban)
- [ ] Add release date to the team calendar
    - Team

## 6. Tasks to be done **in order** after the release date is set

[@lewislankshear](https://github.com/lewislankshear):
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

[@deliverymanager01](https://github.com/DeliveryManager01)
- [ ] 9. Add to analytics spreadsheet
