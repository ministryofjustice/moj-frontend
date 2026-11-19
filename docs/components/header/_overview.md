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

## Option 1

## When to use

Use the header component on internal and external-facing services on the MOJ domain (`[myservice].justice.service.gov.uk`).

## When not to use

Do not use this component on:

- public-facing services on the GOV.UK domain -- use the [GOV.UK header](https://design-system.service.gov.uk/components/header/)
- DPS (Digital Prisons Services) -- use the [DPS header component (opens in Figma)](https://www.bbc.co.uk/news)
- services on the Probation Digital Services (PDS) platform - use the [PDS header component](/probation/components/pds-header/)

If you need help choosing a header for an MOJ service, you can [contact the MOJ Design System team](https://design-patterns.service.justice.gov.uk/help/). 

## Option 2

## Choosing a header to use for your service

Which header your service needs depends on your service's:

- domain, for example `[myservice].service.gov.uk` or `[myservice].justice.service.gov.uk`
- organisation or platform, for example DPS (Digital Prisons Services)

{{ govukTable({
  head: [
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
        text: "\[myservice\].justice.service.gov.uk"
      },
      {
        text: "Any apart from DPS and Probation Digital Services"
      },
      {
        text: "Header"
      }
    ],
    [
      {
        text: "\[myservice\].justice.service.gov.uk"
      },
      {
        text: "DPS"
      },
      {
        html: '<a class="govuk-link" href="https://www.bbc.co.uk/news">DPS header (in Figma)</a>'
      }
    ],
    [
      {
        text: "\[myservice\].justice.service.gov.uk"
      },
      {
        text: "Legal Aid Agency (LAA)"
      },
      {
        html: '<a class="govuk-link" href="https://www.bbc.co.uk/news">LAA header and navigation pattern (in Figma)</a>'
      }
    ],
    [
      {
        text: "gov.uk/\[myservice\], \[myservice\].service.gov.uk or \[myblog\].blog.gov.uk"
      },
      {
        text: "Any"
      },
      {
        html: '<a class="govuk-link" href="https://service.gov.uk">GOV.UK header</a>'
      }
    ],
    [
      {
        text: "\[myservice\].justice.service.gov.uk"
      },
      {
        text: "Probation Digital Services (PDS)"
      },
      {
        html: '<a class="govuk-link" href="https://www.bbc.co.uk/news">PDS header</a>'
      }
    ]
  ]
}) }}

If you need help choosing a header for an MOJ service, you can [contact the MOJ Design System team](https://design-patterns.service.justice.gov.uk/help/). 

### Similar or linked components

There’s also the:

- [GOV.UK generic header](https://design-system.service.gov.uk/components/generic-header/)
- [GOV.UK service navigation](https://design-system.service.gov.uk/components/service-navigation/)
- [Legal Aid Agency (LAA) header and navigation pattern (opens in Figma)](https://www.bbc.co.uk/news) for internal LAA services
