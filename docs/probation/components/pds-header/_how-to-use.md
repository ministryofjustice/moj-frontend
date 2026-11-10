---
title: How to use
order: 20
tags: 'pds-header'
permalink: false
eleventyComputed:
  override:eleventyNavigation: false
---

## How to use

Do not add your service name to the header. It should only contain ‘Probation Digital Services’ to create a consistent experience for users.

Add your service name to the main navigation component. It should also be added to the breadcrumbs component, if used.

See the [probation page template](https://design-patterns.service.justice.gov.uk/probation/styles/pds-page-template/) for more guidance on adding your service name to the navigation.

### Links

The MOJ crown logo and ‘Probation Digital Services’ text link to either:

* Manage people on probation (MPoP), for users with access to it
* your service's homepage, for users with no access to MPoP

MPoP is the Probation Digital Services homepage.

The 'Account' text links to the 'Your account details' page on HMPPS Auth.

### Location
The location (for example, 'North Wales PDU') is fixed  and cannot be changed by the user.

The header fetches the location data from NDelius. If the data is not found, it will display 'location unavailable'.

On smaller screens, the location will stack above the account and navigation menus.

### Using the header component in production

The [Probation Digital Services GitHub repository](https://github.com/ministryofjustice/hmpps-probation-frontend-component-api) contains a readme file with instructions on how to implement the component in your service.

