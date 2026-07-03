---
title: Overview
order: 10
tags: 'pds-page-templates'
permalink: false
eleventyComputed:
  override:eleventyNavigation: {}
---

{% set figmaTabContent %}
  <p>This component is in the ‘Assets’ tab in the PDS Figma Kit.</p>

  <p class="govuk-!-margin-0">
If you work for MOJ, you can view this component in the <a href="{{ figma_link }}" >PDS Figma Kit.</a></p>
<p></p>
<p class="govuk-!-margin-0">
If you work outside MOJ, read the guidance on <a href="https://design-patterns.service.justice.gov.uk/prototyping/setting-up-figma-prototypes/#non-moj-staff-tab" ">setting up Figma prototypes for non-MOJ staff.</a></p>

{% endset %}

{% example template="examples/default", figmaTabContent=figmaTabContent, colocated=true, height=540 %}

## Overview

There are 2 page templates: 

- the service template, for top-level pages 

- the case template, for pages displaying a case or case details

The templates show the page design and components needed for pages in an internal probation service. The common components are:

- PDS header and PDS footer 

- MOJ primary navigation

- new features banner (if used) and GOV.UK phase banner

- GOV.UK breadcrumbs and GOV.UK back link
