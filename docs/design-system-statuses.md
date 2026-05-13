---
layout: layouts/content.njk
subsection: About the Design System
title: Building block statuses
lede: Every building block on the MOJ Design System has a status. Learn more about what this means and how to use them.
eleventyNavigation:
  key: Building block statuses
  parent: About the Design System
  order: 20
---

## Overview

There are 4 building blocks statuses. These are to help you understand how to use building blocks, and what issues there might be. The statuses are:

- ‘Official’
- ‘To be reviewed’
- ‘Experimental’
- ‘Archived’   

## How to use building blocks based on their status <span class="govuk-tag govuk-tag--green"  style="vertical-align:middle;" aria-hidden="true">Official</span>

<table class="govuk-table">
  <thead class="govuk-table__head">
    <tr class="govuk-table__row">
      <th scope="col" class="govuk-table__header">Status</th>
      <th scope="col" class="govuk-table__header">Use in live services</th>
      <th scope="col" class="govuk-table__header">Accessibility</th>
      <th scope="col" class="govuk-table__header">Figma design and code</th>
      <th scope="col" class="govuk-table__header">Status they could move to</th>
    </tr>
  </thead>
  <tbody class="govuk-table__body">
    <tr class="govuk-table__row">
      <td class="govuk-table__cell">Official</td>
      <td class="govuk-table__cell">Yes</td>
      <td class="govuk-table__cell">High</td>
      <td class="govuk-table__cell">Yes</td>
      <td class="govuk-table__cell">Archived</td>
    </tr>
    <tr class="govuk-table__row">
      <td class="govuk-table__cell">To be reviewed</td>
      <td class="govuk-table__cell">Yes</td>
      <td class="govuk-table__cell">Variable</td>
      <td class="govuk-table__cell">Yes</td>
      <td class="govuk-table__cell">Official, Archived</td>
    </tr>
    <tr class="govuk-table__row">
      <td class="govuk-table__cell">Experimental</td>
      <td class="govuk-table__cell">
        In <a class="govuk-link" href="/design-system-statuses/#how-to-use-experimental-building-blocks">some cases</a>
      </td>
      <td class="govuk-table__cell">Variable</td>
      <td class="govuk-table__cell">Sometimes</td>
      <td class="govuk-table__cell">Official</td>
    </tr>
  </tbody>
</table>

Do not use building blocks with an ‘archived’ status. They're not being supported by the Design System team.

### ‘Official’ building blocks <span class="govuk-tag govuk-tag--green"  style="vertical-align:middle;" aria-hidden="true">Official</span>

You can use ‘official’ building blocks in every product phase. They’re fully accessible, and will be supported and maintained in the long term.

Some official building blocks are only for use in particular areas, for example the Probation Digital Services (PDS) platform. This will be stated clearly on the documentation, MOJ Frontend and in Figma.

#### How 'official' building blocks have been developed

'Official' building blocks usually start as ‘experimental’ or ‘to be reviewed’. They're then developed through:

- a comprehensive discovery
- multidisciplinary team input
- accessibility testing
- thorough documentation

They've been added to the MOJ Figma Kit and MOJ Frontend. 

### ‘To be reviewed’ building blocks <span class="govuk-tag govuk-tag--orange"  style="vertical-align:middle;" aria-hidden="true">To be reviewed</span>

You can use ‘to be reviewed’ building blocks in every product phase.

However, there may be issues with them (not all of which are known). This is because they've not been reviewed or developed recently. [View feedback in the Github discussions](https://github.com/ministryofjustice/moj-frontend/discussions/categories/released-components-pages-and-patterns).

#### How ‘to be reviewed’ building blocks have been developed

‘To be reviewed’ building blocks were added for use by everyone at MOJ. They've been added to the MOJ Figma Kit and MOJ Frontend. 

### ‘Experimental’ building blocks <span class="govuk-tag govuk-tag--experimental" style="vertical-align:middle;" aria-hidden="true">Experimental</span>

You can use ‘experimental’ building blocks:
- in prototypes 
- in testing (such as alpha and beta phases)
- as a starting point or idea

Do not add them straight into a live service. This is because they may not have been accessibility tested or considered for use beyond the service they were built for.

If they have been a part of a service in earlier testing (like an alpha or beta phase) they can stay in for the live phase if both of the following apply:
- they worked well during the testing
- they're fully accessible

[View feedback in the Github discussions](https://github.com/ministryofjustice/moj-frontend/discussions/categories/released-components-pages-and-patterns).

#### How ‘experimental’ building blocks have been developed

‘Experimental’ building blocks have usually been developed within a product team and then submitted to the Design System. Anyone at MOJ can do this. They're then given a brief sense check by the Design System team before being published. The [new features banner component](/components/new-features-banner) is an example.

Find out [how to submit an ‘experimental’ building block](/contribute/add-new-component/start). 

### ‘Archived’ building blocks <span class="govuk-tag govuk-tag--grey"  style="vertical-align:middle;" aria-hidden="true">Archived</span>

Do not use ‘archived’ building blocks. They're no longer being supported.

#### How archiving works

A building block will be archived if it’s no longer needed. This is usually because the need has been met by the [GOV.UK Design System](https://design-system.service.gov.uk/), which we do not want to duplicate.