---
layout: layouts/component.njk
title: Sortable table
type: component
githuburl: https://github.com/ministryofjustice/moj-frontend/discussions/269
eleventyNavigation:
  key: Sortable table
  parent: Components
  excerpt: "Use the sortable table component to let users sort columns in ascending or descending order."
---

{% lastUpdated "sortable-table" %}

{% example "/examples/sortable-table", 450 %}

## When to use

Use the sortable table component to let users sort columns in ascending or descending order.

Use this component when sorting is needed to help find data within a large table of data. This might be useful in combination with the [filter](../../patterns/filter-a-list) pattern.

## How to use

If you are using [Nunjucks](https://mozilla.github.io/nunjucks/) or the [GOV.UK Prototype Kit](https://govuk-prototype-kit.herokuapp.com/), you can use the Nunjucks [table macro](https://design-system.service.gov.uk/components/table/).
