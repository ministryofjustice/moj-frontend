---
title: PDS header
tabs: true
status: Official
statusDate: October 2025
githuburl: https://github.com/ministryofjustice/moj-frontend/discussions/1948
excerpt: "Use this header component for services on the Probation Digital Services (PDS) platforms."
lede: "The PDS header component is at the top of every page, and tells users they're on the Probation Digital Services (PDS) platform."
---

{% set figmaTabContent = '<p>Use this component from the ‘Assets’ tab in the PDS Figma Kit.</p><p>You can also view this component in the <a href="https://www.figma.com/design/AT9lj3HbJj6lYKrZLeM8CN/PDS--Probation--Figma-Kit?m=auto&node-id=13811-30&t=3DUOBhW36cfeUWtG-1" target="_blank">PDS Figma Kit (opens in a new tab).</a></p>' %}

{% tabs "paginate" %}
{% tab "Overview" %}

{% example template="/examples/domain-specific/probation/header", figmaTabContent=figmaTabContent, height=540 %}

## Overview

The PDS header  allows users to access and navigate between services on the Probation Digital Services (PDS) platform. 
The header displays the name of the platform, and features account and global navigation menus.

### Account menu

The account menu allows users to view their account details, and sign in or out.

### Global navigation menu

The global navigation menu contains links to probation services. Users will only see links to services they have permission to access. 

### When to use

Use this header for internal probation services on the Probation Digital Services platform.

### When not to use

Do not use for services not on the Probation Digital Services platform.

Use the [MOJ header component](/components/header) instead.

{% endtab %}

{% tab "How to use" %}

## How to use

Do not add your service name to the header. It should only contain ‘Probation Digital Services’ to create a consistent experience for users.

You can add your service name as a heading, or as a caption to the existing heading. It should also be added to the breadcrumbs component, if used.

### Links

The MOJ crown logo and ‘Probation Digital Services’ text both link to Manage People on Probation, the Probation Digital Services homepage. 

### Using the header component in production

The [Probation Digital Services GitHub repository](https://github.com/ministryofjustice/hmpps-probation-frontend-component-api) contains a readme file with instructions on how to implement the component in your service.

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
{% include "layouts/partials/get-help-and-contribute.njk" %}
{% endtab %}
{% endtabs %}
