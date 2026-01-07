---
title: Overview
order: 10
tags: 'pds-footer'
permalink: false
eleventyComputed:
  override:eleventyNavigation: {}
---

{% set figmaTabContent %}
  <p>This component is in the ‘Assets’ tab in the PDS Figma Kit.</p>

  <p class="govuk-!-margin-0">
If you work for MOJ, you can view this component in the <a href="{{ figma_link }}" target="_blank">PDS Figma Kit.</a></p>
<p></p>
<p class="govuk-!-margin-0">
If you work outside MOJ, read the guidance on <a href="https://design-patterns.service.justice.gov.uk/prototyping/setting-up-figma-prototypes/#non-moj-staff-tab" target="_blank">setting up Figma prototypes for non-MOJ staff.</a></p>

{% endset %}

{% example template="examples/default", figmaTabContent=figmaTabContent, colocated=true, height=540 %}

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
