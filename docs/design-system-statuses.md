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

There are 4 building blocks statuses:

- Official
- To be reviewed
- Experimental
- Archived   

| Status | Use in live services | Accessibility standard | Figma design | Code | Status they could move to
| -------- | ------- |
| Official | Yes | High | Yes | Yes | Yes | Archived
| To be reviewed | Yes | Variable | Yes  | Yes | Official, Archived
| Experimental  | Only in [specific cases](/design-system-statuses/#how-to-use-experimental-building-blocks) | Variable | Sometimes | Sometimes | Official

Do not use building blocks with an ‘Archived’ status. They're not being supported by the Design System team.

## How to use ‘Official’ status building blocks <span class="govuk-tag govuk-tag--green"  style="vertical-align:middle;" aria-hidden="true">Official</span>

You can use ‘official’ building blocks in every product phase. They’re fully accessible, and will be supported and maintained in the long term.

Some official building blocks are only for use in particular areas, for example the Probation Digital Services (PDS) platform. This will be stated clearly on the documentation, MOJ Frontend and in Figma.

### How 'Official' building blocks have been developed

'Official' building blocks usually start as ‘experimental’ or ‘to be reviewed’. They're then developed through:

- a comprehensive discovery
- multidisciplinary team input
- accessibility testing
- thorough documentation

They've been added to the MOJ Figma Kit and MOJ Frontend. 

## How to use ‘Experimental’ status building blocks <span class="govuk-tag govuk-tag--experimental" style="vertical-align:middle;" aria-hidden="true">Experimental</span>

You can use ‘experimental’ building blocks:
- in prototypes 
- in testing (such as alpha and beta phases)
- as a starting point or idea

Do not add them straight into a live service. This is because they may not have been accessibility tested or considered for use beyond the service they were built for.

If they have been a part of a service in earlier testing (like an alpha or beta phase) they can stay in for the live phase if both of the following apply:
- they worked well during the testing
- they're fully accessible

[View feedback in the Github discussions](https://github.com/ministryofjustice/moj-frontend/discussions/categories/released-components-pages-and-patterns).

### How ‘Experimental’ building blocks have been developed

‘Experimental’ building blocks have usually been developed within a product team and then submitted to the Design System. Anyone at MOJ can do this. They're then given a brief sense check by the Design System team before being published. The [new features banner component](/components/new-features-banner) is an example.

Find out [how to submit an ‘experimental’ building block](/contribute/add-new-component/start). 

## How to use ‘To be reviewed’ building blocks <span class="govuk-tag govuk-tag--orange"  style="vertical-align:middle;" aria-hidden="true">To be reviewed</span>

You can use ‘to be reviewed’ building blocks in every product phase.

However, there may be issues with them (not all of which are known). This is because they've not been reviewed or developed recently. [View feedback in the Github discussions](https://github.com/ministryofjustice/moj-frontend/discussions/categories/released-components-pages-and-patterns).

### How ‘to be reviewed’ building blocks have been developed

‘To be reviewed’ building blocks were added for use by everyone at MOJ. They've been added to the MOJ Figma Kit and MOJ Frontend. 

## How to use ‘Archived’ building blocks <span class="govuk-tag govuk-tag--grey"  style="vertical-align:middle;" aria-hidden="true">Archived</span>

Do not use ‘Archived’ building blocks. They're no longer being supported.

### How archiving works

A building block is archived when it’s no longer needed. This is usually because the need has been met by the [GOV.UK Design System](https://design-system.service.gov.uk/), which we do not want to duplicate.