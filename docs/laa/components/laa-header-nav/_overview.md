---
title: Overview
order: 10
tags: 'laa-header-nav'
permalink: false
eleventyComputed:
  override:eleventyNavigation: false
---
{% example template="examples/default", colocated="true", height=590 %}

## Overview

The 'LAA header and navigation' component helps users to understand that they're using a service from the Legal Aid Agency (LAA). 

It contains the:

- LAA header
- [GOV.UK service navigation component](https://design-system.service.gov.uk/components/service-navigation/)
- [GOV.UK phase banner component](https://design-system.service.gov.uk/components/phase-banner/)
- [GOV.UK back link component](https://design-system.service.gov.uk/components/back-link/)
- English/Welsh language switcher

### The LAA header

The LAA header is based on the [MOJ header](https://design-patterns.service.justice.gov.uk/components/moj-header/). It displays:

- the Legal Aid Agency crest and organisation name
- the user's email address 
- a link to sign out

### When to use

Use the 'LAA header and navigation' component for internal services for legal aid providers and caseworkers.

### When not to use

Do not use this component on public-facing LAA services -- use the [GOV.UK header component](https://design-system.service.gov.uk/components/header/) instead. Public-facing LAA services are:

- 'Check if you can get legal aid'
- 'Find a legal aid adviser or family mediator' 
 
If you're not sure which header and navigation you should use, contact xxx.  
 
### Similar or linked components

There's also the:

 - [MOJ header component](/components/moj-header/)
 - [PDS (Probation Digital Services) header component](/probation/components/pds-header/)
 - [GOV.UK header component](https://design-system.service.gov.uk/components/header/)