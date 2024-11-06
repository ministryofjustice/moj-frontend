---
layout: layouts/component.njk
title: Side navigation
type: component
githuburl: https://github.com/ministryofjustice/moj-frontend/discussions/713
eleventyNavigation:
  key: Side navigation
  parent: Components
  excerpt: "Use the side navigation component to let users navigate sub sections in a system or service."
---

{% lastUpdated "side-navigation" %}

{% example "/examples/side-navigation", 250 %}

## When to use

Use the side navigation component to let users navigate sub sections in a system or service.

Use this component when you have a second level of navigation. See also the [sub navigation](../sub-navigation) component

## When not to use

Do not use this component for primary level items or global navigation items.

## How to use

The component can be configured to group navigation items into sections

### Sections

{% example "/examples/side-navigation-sections", 480 %}

## Accessibility issues

By default, the section headings use the H4 heading size. This can create an illogical structure if higher heading levels are missing from the page. For some assistive technology users that navigate using heading structures this may cause difficulties.

When viewed on smaller screens and when there are more than three links, users will have to scroll horizontally as well as vertically to see all the content.  This has been raised in an external audit under Web Content Accessibility Guidelines (WCAG) 1.4.10 Reflow (Level AA). If you use this component without addressing this issue, you must list it in the accessibility statement.
