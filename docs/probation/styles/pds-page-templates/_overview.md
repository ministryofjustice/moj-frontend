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

1. The service template, for top-level pages
2. The case template, for pages displaying a case or case details

The templates show the page design and components needed for pages in an internal probation service. The common components are:

- [PDS header](/probation/components/pds-header/) and [PDS footer](/probation/components/pds-footer/) 
- [primary navigation](/components/primary-navigation/)
- [new features banner](/components/new-features-banner/) (if used) and [GOV.UK phase banner](/components/phase-banner/)
- [GOV.UK breadcrumbs](https://design-system.service.gov.uk/components/breadcrumbs/) and [GOV.UK back link](https://design-system.service.gov.uk/components/back-link/)

### Using the page templates

The templates are held in the [PDS Figma Kit](https://www.figma.com/design/AT9lj3HbJj6lYKrZLeM8CN/PDS--Probation--Figma-Kit?node-id=20-17040&p=f&t=eUOs0YqLBeNOKDFO-0). 

Detach the template instance before adding your content. 
