---
title: Overview
order: 10
tags: 'pds-header'
permalink: false
eleventyComputed:
  override:eleventyNavigation: false
---
{% set figmaTabContent %}
  <p>This component is in the ‘Assets’ tab in the PDS Figma Kit.</p>

  <p class="govuk-!-margin-0">
If you work for MOJ, you can view this component in the <a href="{{ figma_link }}">PDS Figma Kit.</a></p>
<p></p>
<p class="govuk-!-margin-0">
If you work outside MOJ, read the guidance on <a href="https://design-patterns.service.justice.gov.uk/prototyping/setting-up-figma-prototypes/#non-moj-staff-tab">setting up Figma prototypes for non-MOJ staff.</a></p>

{% endset %}

{% example template="examples/default", figmaTabContent=figmaTabContent, colocated=true, height=540 %}

## Overview

The PDS header  allows users to access and navigate between services on the Probation Digital Services (PDS) platform. 

The header displays the:

- platform name ('Probation Digital Services')
- account menu (where users access their account details, and sign in or out)
- global navigation menu (with links to probation services the user has access to)
- work location, for example 'North Wales PDU'

### When to use

Use this header for internal probation services on the Probation Digital Services platform.

### When not to use

Do not use this component in:

- MOJ services not on the Probation Digital Services platform – use the [MOJ header component](/components/moj-header)
- Digital Prison Services (DPS) – use the DPS header component

View the [DPS header component](https://www.figma.com/design/DhGdok6Nx5UKK9dAKZq6Ay/DPS--Prison--Figma-Kit?node-id=3316-752&t=J7aF1RqaiaGSZtdR-1) in Figma.