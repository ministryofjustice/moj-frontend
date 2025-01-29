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

{% example "/examples/sortable-table", 450 %}

## When to use

Use the sortable table component to let users sort columns in ascending or descending order.

Use this component when sorting is needed to help find data within a large table of data. This might be useful in combination with the [filter](/patterns/filter-a-list/) pattern.

## How to use

If you are using [Nunjucks](https://mozilla.github.io/nunjucks/) or the [GOV.UK Prototype Kit](https://govuk-prototype-kit.herokuapp.com/), you can use the Nunjucks [table macro](https://design-system.service.gov.uk/components/table/).

## Accessibility issues

There’s an accessibility issue with the sortable table component. If you’re using it in your service you need to add these issue details to your accessibility statement.

### The sorting icons are read out in a confusing way

The sorting icons are read out to screen reader users, but without meaningful information. This fails [WCAG 2.2 success criterion 1.1.1 (Non-text content)](https://www.w3.org/TR/WCAG22/#non-text-content) and [WCAG 2.2 success criterion 1.3.1 (Info and relationships)](https://www.w3.org/TR/WCAG22/#info-and-relationships). We’re aware of this issue and plan to implement a fix by April 2025.
