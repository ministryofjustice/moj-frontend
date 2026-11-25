---
title: Overview
order: 10
tags: 'header'
permalink: false
eleventyComputed:
  override:eleventyNavigation: false
---

{% from "govuk/components/table/macro.njk" import govukTable %}

{% example template="examples/default", colocated=true, height=81 %}

## Overview

The header component tells users that they're using an MOJ service. Add it to the top of each page in your service. 

The header component has 3 layouts. These enable you to add items to your header whilst keeping good spacing. The layouts are: 

- 'custom' links
- 'accounts area' links
- 'flexible (or mixed)' links

View [guidance on choosing a layout](/components/header/#how-to-use-tab).

## When to use

Use the header component on some internal and external-facing services on the MOJ domain (\[myservice\].justice.service.gov.uk`).

## When not to use

Do not use this component on:

- public-facing services on the GOV.UK domain -- use the [GOV.UK header](https://design-system.service.gov.uk/components/header/)
- DPS (Digital Prisons Services) -- use the [DPS header component (opens in Figma)](https://www.bbc.co.uk/news)
- services on the Probation Digital Services (PDS) platform - use the [PDS header component](/probation/components/pds-header/)

There's also the [Legal Aid Agency (LAA) header and navigation pattern (opens in Figma)](https://www.bbc.co.uk/news) for internal LAA services.

If you need help choosing a header for an MOJ service, you can [contact the MOJ Design System team](https://design-patterns.service.justice.gov.uk/help/). 

### Similar or linked components

The header component:

- is commonly used with the [GOV.UK service navigation component](https://design-system.service.gov.uk/components/service-navigation/)
- can be used with the [notification badge component](/components/notification-badge/)
- can be used instead of the [GOV.UK generic header component](https://design-system.service.gov.uk/components/generic-header/) 
