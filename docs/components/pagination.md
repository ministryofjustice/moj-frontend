---
layout: layouts/component.njk
title: Pagination
---

{% lastUpdated "pagination" %}

{% example "/examples/pagination", 125 %}

## When to use

Use the pagination component to let users browse through a long list.

## How to use

The component can be configured to hide or show the result count, previous and next buttons, ellipses or numbers.

Don't show pagination if there's only one page.

### Just previous and next buttons

{% example "/examples/pagination-prev-next", 125 %}