---
title: PDS footer
tabs: true
status: Official
statusDate: July 2025
excerpt: "Use the PDS footer component to display a footer in Probation Digital Services."
lede: "The PDS footer component is used for services on the Probation Digital Services (PDS) platform, and contains links to statements such as accessibility and cookies."
---

{% tabs "paginate" %}
{% tab "Overview" %}

{% example template="/examples/domain-specific/probation/footer", height=540 %}

## Overview

The PDS footer sits at the bottom of every page in services on the Probation Digital Services (PDS) platform, and contains links to accessibility, cookies, and privacy policies.

### Links

#### Accessibility

The PDS footer links to an accessibility hub page, which then links out to the individual services' accessibility statements.

#### Cookies and privacy policies 

The footer links to overarching cookies and privacy policies that cover all services on the Probation Digital Services platform. You do not need to publish separate statements.

#### When to use

Use this footer for internal probation services on the Probation Digital Services platform.

#### When not to use

Do not use for services not on the Probation Digital Services platform.

{% endtab %}

{% tab "How to use" %}

## How to use

### If you have an accessibility statement published 

Before implementing the footer, email a copy of your accessibility statement to [design-system@justice.gov.uk](mailto:design-system@justice.gov.uk).

It will be converted to Markdown and uploaded to the Probation Digital Services GitHub.

### Using the footer component in production

The [Probation Digital Services GitHub](https://github.com/ministryofjustice/hmpps-probation-frontend-component-api) contains a readme file with instructions on how to implement the component in your service. 
Once you've added the component, update the [Probation Digital Services tracker](https://justiceuk.sharepoint.com/:x:/s/ConnectedServices/EcsTWxDo-SlPn1meS7APMQEBXqmhy-DWPfuYNTdFjY7cyg?e=o4fP0w) with your service name and the date. 

### To update your accessibility statement  

You can submit a pull request with the updated content to the [Probation Digital Services GitHub](https://github.com/ministryofjustice/hmpps-probation-frontend-component-api), or email your content changes to [design-system@justice.gov.uk](mailto:design-system@justice.gov.uk). 

{% endtab %}

{% tab "Examples" %}

## Examples

### PDS footer with service statements

The PDS footer in Manage People on Probation, showing the links to accessibility, cookies, and privacy policies.

<p><img src="{{ 'assets/images/pds-footer-manage-people-on-probation.png' | rev | url }}" alt="An MoJ webpage showing the PDS footer in Manage People on Probation"></p>

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
