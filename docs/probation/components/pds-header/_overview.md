---
title: Overview
order: 10
tags: 'pds-header'
permalink: false
eleventyComputed:
  override:eleventyNavigation: false
---
{% set figmaTabContent = '<p>Use this component from the ‘Assets’ tab in the PDS Figma Kit.</p><p class="govuk-!-margin-0">You can also view this component in the <a href="{{ figma_link }}" target="_blank">PDS Figma Kit (opens in a new tab).</a></p>' %}

{% example template="examples/default", figmaTabContent=figmaTabContent, colocated=true, height=540 %}

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

Use the [MOJ header component](/components/moj-header) instead.


