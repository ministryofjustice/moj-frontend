---
layout: layouts/component.njk
title: Primary navigation
type: component
githuburl: https://github.com/ministryofjustice/moj-frontend/discussions/710
eleventyNavigation:
  key: Primary navigation
  parent: Components
  excerpt: "Use the primary navigation component to let users navigate and search your service."
---

{% lastUpdated "primary-navigation" %}

{% example "/examples/primary-navigation", 150 %}

## When to use

Use the primary navigation component to let users navigate and search your service.

## How to use

You must use this component with the [header](../header) component.

### Links

You must only include links to top level sections within your service.

Do not put calls to action in the primary navigation. For example, ‘Create case’ should be an action from within the ‘cases’ section and not a link inside the primary navigation.

### Inline search

If your service can search anything, use an inline search form.

{% example "/examples/primary-navigation-inline-search", 180 %}

### Toggle search

If your service can only search for certain things, use a toggle search form.

You must tell users what they are searching for in the form hint text, and how they can search using the `data-moj-search-toggle-text` attribute.

{% example "/examples/primary-navigation-toggle-search", 250 %}
