---
title: PDS header
tabs: true
status: Official
statusDate: July 2025
excerpt: "Use the PDS header component to display a header in Probation Digital Services."
lede: "The PDS header component sits at the top of every page, and tells users they're on the Probation Digital Services (PDS) platform."
---

{% tabs "paginate" %}
{% tab "Overview" %}

{% example template="/examples/domain-specific/probation/header", height=540 %}

## Overview

The PDS header component allows users to access and navigate between probation services. 
The header displays the name of the platform, and has an account menu and global navigation menu on the right.

### Account menu

The account menu allows users to view their account details, and sign in or out.

### Global navigation menu

The global navigation menu contains links to probation services. Users will only see links to services they have permission to access. 

### When to use

Use this header for internal probation services on the Probation Digital Services (PDS) platform.

### When not to use

Do not use for services not on the Probation Digital Services platform. 
Use the [MOJ header component](/components/header) instead.

{% endtab %}

{% tab "How to use" %}

## How to use

Do not add your service name to the header. It should only contain ‘Probation Digital Services’ to create a consistent experience for users.

You can add your service name as a heading, or as a caption to the existing heading. It should also be added to the breadcrumbs component, if used.

### Links

The MOJ crown logo and ‘Probation Digital Services’ text both link to the Probation Digital Services (PDS) homepage. 

### Using the header component in production

The [Probation Digital Services GitHub](https://github.com/ministryofjustice/hmpps-probation-frontend-component-api) contains a readme file with instructions on how to implement the component in your service. 
Once you've added the component, update the [Probation Digital Services tracker](https://justiceuk.sharepoint.com/:x:/s/ConnectedServices/EcsTWxDo-SlPn1meS7APMQEBXqmhy-DWPfuYNTdFjY7cyg?e=o4fP0w) with your service name and the date.

{% endtab %}

{% tab "Examples" %}

## Examples

### PDS header with account menu open

The PDS header in Manage People on Probation, showing the account menu options.

<p><img src="{{ 'assets/images/pds-header-account-menu-open.png' | rev | url }}" alt="An MoJ webpage showing the PDS header in Manage People on Probation with the account menu open"></p>

### PDS header with global navigation menu open

The PDS header in Manage People on Probation, showing the service links in the global navigation menu.

<p><img src="{{ 'assets/images/pds-header-global-nav-open.png' | rev | url }}" alt="An MoJ webpage showing the PDS header in Manage People on Probation with the global navigation menu open"></p>

{% endtab %}

{% tab "Get help and contribute" %}

## Get help

For help or support using this component, contact the Design System team.

Message the team:
* on the [moj-design-system-support Slack channel](https://moj.enterprise.slack.com/archives/CH5RUSB27)
* by email [design-system@justice.gov.uk](mailto:design-system@justice.gov.uk)

## Talk to us about this component

The Design System team would like to hear:
* questions about implementing this component in your service
* feedback about its usage, for example accessibility, or ideas for improvements

{% endtab %}
{% endtabs %}
