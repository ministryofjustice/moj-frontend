---
layout: layouts/component.njk
title: Filter
---

{% lastUpdated "filter" %}

{% example "/examples/filter", 1000 %}

## When to use

Use the filter component to let users filter a large list of items.

## How to use

You should use this component with the filter layout as shown in the [filter a list](../../patterns/filter-a-list) pattern.

The filter component can consist of any form control like radio buttons, checkboxes, date inputs and text boxes.

Users can select 1 or more filters and submit the form. The page refreshes to show the items that match the filters. The selected filters are also marked at the top of the filter to let users see what they've selected and remove them easily.

Clicking on a selected filter, refreshes the page and removes the filter.

## Contribute

[Discuss filters on GitHub](https://github.com/ministryofjustice/moj-frontend/discussions/197)