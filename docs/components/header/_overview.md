---
title: Overview
order: 10
tags: 'header'
permalink: false
eleventyComputed:
  override:eleventyNavigation: false
---

{% example template="examples/default", colocated=true, height=81 %}

## Overview

The header component tells users that they're using an MOJ service. 

## Option 1

## When to use

Use the header component on some MOJ services for internal users.

## When not to use

Do not use this component on:

- public-facing services -- use the [GOV.UK header](https://design-system.service.gov.uk/components/header/)
- internal LAA services - use the [LAA header component (opens in Figma)](https://www.bbc.co.uk/news)
- DPS -- use the [DPS header component (opens in Figma)](https://www.bbc.co.uk/news)
- services on the Probation Digital Services (PDS) platform - use the [PDS header component](/probation/components/pds-header/) 

## Choosing a header to use for your service

Every MOJ service needs a header, which shuold be used at the top of every page. 

Which header you service need depends on the:
- audience -- whether it's for MOJ staff (internal) or the public 
- domain -- for example [myservice].service.gov.uk or [myservice].justice.service.gov.uk
- organisation or platform the service is a part of, for example DPS (Digital Prisons Services)

{{ govukTable({
  head: [
    {
      text: "Audience"
    },
    {
      text: "Domain"
    },
    {
      text: "Platform or organisation"
    },
    {
      text: "Header you should use"
    }
  ],
  rows: [
    [
      {
        text: "Internal"
      },
      {
        text: "\[myservice\].justice.service.gov.uk"
      },
      {
        text: "Any apart from DPS, LAA and Probation Digital Services"
      },
      {
        text: "MOJ header"
      }
    ],
    [
      {
        text: "Internal"
      },
      {
        text: "\[myservice\].justice.service.gov.uk"
      },
      {
        text: "DPS"
      },
      {
        text: "\[DPS header (in Figma)\](https://www.bbc.co.uk/news)"
      },
    ],
    [
      {
        text: "Internal"
      },
      {
        text: "\[myservice\].justice.service.gov.uk"
      },
      {
        text: "Any apart from DPS and Probation Digital Services"
      },
      {
        text: "MOJ header"
      }
    ], 
[
      {
        text: "Internal"
      },
      {
        text: "\[myservice\].justice.service.gov.uk"
      },
      {
        text: "Legal Aid Agency (LAA)"
      },
      {
        text: "\[LAA header and navigation pattern (in Figma)\](https://www.bbc.co.uk/news)"
      }
    ],
       [
      {
        text: "Public"
      },
      {
        text: "gov.uk/\[myservice\] or \[myservice\].service.gov.uk"
      },
      {
        text: "Any"
      },
      {
        text: "\[GOV.UK header\](https://design-system.service.gov.uk/components/header/)"
      }
    ],
  ]
  }) 
}}


### Things to consider

XYZ

### Similar or linked components

There’s also the:

- [GOV.UK generic header](https://design-system.service.gov.uk/components/generic-header/)
- [GOV.UK service navigation](https://design-system.service.gov.uk/components/service-navigation/) 