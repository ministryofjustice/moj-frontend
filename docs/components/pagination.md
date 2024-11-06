---
layout: layouts/component.njk
title: Pagination
type: component
githuburl: https://github.com/ministryofjustice/moj-frontend/discussions/708
eleventyNavigation:
  key: Pagination
  parent: Components
  excerpt: "Use this component when users need to add similar information a couple of times, such as several names for a single application."
---

{% banner "The GOV.UK Design System has a similar component" %}
The [Pagination component](https://design-system.service.gov.uk/components/pagination/) in the GOV.UK Design System has a similar function and visual design to this component.

You should use the GOV.UK version if it fits your needs.
{% endbanner %}

{% lastUpdated "pagination" %}

{% example "/examples/pagination", 125 %}

## When to use

Use the pagination component to let users browse through a long list.

## How to use

The component can be configured to hide or show the result count, previous and next buttons, ellipses or numbers.

Don't show pagination if there's only one page.

### Just previous and next buttons

{% example "/examples/pagination-prev-next", 125 %}
