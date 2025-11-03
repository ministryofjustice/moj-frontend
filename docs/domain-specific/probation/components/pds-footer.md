---
title: PDS footer
tabs: true
status: Official
statusDate: October 2025
githuburl: https://github.com/ministryofjustice/moj-frontend/discussions/1949
excerpt: "Use this footer component for services on the Probation Digital Services (PDS) platforms."
lede: "The PDS footer component is used for services on the Probation Digital Services (PDS) platform, and contains links to statements such as accessibility and cookies."
---

{% set figmaTabContent = '<p>Use this component from the ‘Assets’ tab in the PDS Figma Kit.</p><p>You can also view this component in the <a href="https://www.figma.com/design/AT9lj3HbJj6lYKrZLeM8CN/PDS--Probation--Figma-Kit?m=auto&node-id=7346-1848&t=196DhA9xjg7xpL9b-1" target="_blank">PDS Figma Kit (opens in a new tab).</a></p>' %}

{% tabs "paginate" %}
{% tab "Overview" %}

{% example template="/examples/domain-specific/probation/footer", figmaTabContent=figmaTabContent, height=540 %}

## Overview

The PDS footer sits at the bottom of every page in services on the Probation Digital Services (PDS) platform, and contains links to accessibility, cookies, and privacy policies.

### Links

#### Accessibility

The PDS footer links to an accessibility hub page, which then links out to the individual services' accessibility statements.

Users will only see accessibility statements for services they have permission to access.

<p><img src="{{ 'assets/images/accessibility-statements-page.png' | rev | url }}" alt="An MOJ webpage showing the probation accessibility statements page"></p>

#### Cookies and privacy policies 

All the services on the Probation Digital Services platform share the same cookies and privacy policies. The footer links out to these. You do not need to publish separate statements.

Probation Digital Services cookies policy:

<p><img src="{{ 'assets/images/cookies-policy-page.png' | rev | url }}" alt="An MOJ webpage showing the probation cookies policy page"></p>

Probation Digital Services privacy policy:

<p><img src="{{ 'assets/images/privacy-policy-page.png' | rev | url }}" alt="An MOJ webpage showing the probation privacy policy page"></p>

#### When to use

Use this footer for internal probation services on the Probation Digital Services platform.

#### When not to use

Do not use for services not on the Probation Digital Services platform.

{% endtab %}

{% tab "How to use" %}

## How to use

### If you have an accessibility statement published 

Before implementing the footer, email a copy of your accessibility statement to [design-system@justice.gov.uk](mailto:design-system@justice.gov.uk).

It will be reviewed, converted to Markdown and uploaded to the Probation Digital Services GitHub repository.

#### To update your accessibility statement

You can submit a pull request with the updated content to the [Probation Digital Services GitHub repository](https://github.com/ministryofjustice/hmpps-probation-frontend-component-api), or email your content changes to <design-system@justice.gov.uk>.

The Design System team will send out an annual reminder to do an accessibility review and update your accessibility statement if necessary. 

### Using the footer component in production

The [Probation Digital Services GitHub repository](https://github.com/ministryofjustice/hmpps-probation-frontend-component-api) contains a readme file with instructions on how to implement the component in your service. 

{% endtab %}

{% tab "Examples" %}

## Examples

### PDS footer with links to service statements

The PDS footer in Manage People on Probation, showing the links to accessibility, cookies, and privacy policies.

<p><img src="{{ 'assets/images/pds-footer-manage-people-on-probation.png' | rev | url }}" alt="An MOJ webpage showing the PDS footer in Manage People on Probation"></p>

{% endtab %}

{% tab "Get help and contribute" %}
{% include "layouts/partials/get-help-and-contribute.njk" %}
{% endtab %}
{% endtabs %}
