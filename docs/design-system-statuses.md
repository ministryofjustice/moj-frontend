---
layout: layouts/content.njk
subsection: About the Design System
title: Building block statuses
lede: Every building block on the MOJ Design System has a status. Learn more about what this means and how to use them.
showLede: true
eleventyNavigation:
  key: Building block statuses
  parent: About the Design System
  order: 20
---

## Overview

The building block statuses are:

- Experimental
- To be reviewed
- Official
- Archived

## ‘Experimental’ status <span class="govuk-tag govuk-tag--experimental" style="vertical-align:middle;" aria-hidden="true">Experimental</span>

The ‘experimental‘ status launched in September 2025. Building blocks that were submitted before then will be added to the Design System and given this status.

Experimental building blocks:

- are early in development
- may not have been accessibility tested or considered for use beyond a particular service
- can be anything from a screenshot with brief documentation, to something more developed (with code and a Figma design)

Anyone at MOJ can submit one. They're given a brief sense check by the Design System team before being published.

Find out [how to submit an experimental building block](/contribute/add-new-component/start). View an example: the [new features banner component](/components/new-features-banner).

### How to use ‘experimental’ building blocks

Do not use ‘experimental’ building blocks in a live service. This is unless they're already part of the service from earlier testing (like an alpha or beta phase) and:

- they worked well during testing
- any accessibility issues have been fixed (or there were not any)

Teams are encouraged to experiment with them and share findings in the [Github discussions](https://github.com/ministryofjustice/moj-frontend/discussions/categories/experimental-components-pages-and-patterns).  

## ‘To be reviewed’ status <span class="govuk-tag govuk-tag--orange"  style="vertical-align:middle;" aria-hidden="true">To be reviewed</span>

Building blocks with a ‘to be reviewed’ status were added for use by everyone at MOJ, possibly a long time ago. They have not been fully reviewed recently and the work to develop them is not known.  

The Design System team is working to bring them all to ‘official’.  

### How to use ‘to be reviewed’ building blocks

You can use ‘to be reviewed’ building blocks in every product phase.

## ‘Official’ status <span class="govuk-tag govuk-tag--green"  style="vertical-align:middle;" aria-hidden="true">Official</span>

Official building blocks have had:

- a comprehensive discovery
- multidisciplinary team input
- accessibility testing

Usage is thoroughly documented.

They may have started as ‘experimental’ or ‘to be reviewed’.

### How to use ‘official’ building blocks

You can use ‘official’ building blocks in every product phase. They’ll be supported and maintained in the long term.

Some official building blocks are only for use in particular areas, for example the Probation Digital Services (PDS) platform. This will be stated clearly on the documentation, MOJ Frontend and in Figma.

## ‘Archived’ status <span class="govuk-tag govuk-tag--grey"  style="vertical-align:middle;" aria-hidden="true">Archived</span>

A building block is archived when it’s no longer needed. This is usually because the need has been met by the [GOV.UK Design System](https://design-system.service.gov.uk/) (which we do not want to duplicate).

### How to use ‘archived’ building blocks

Do not use ‘archived’ building blocks. They're no longer being supported.
