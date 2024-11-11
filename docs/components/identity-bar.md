---
layout: layouts/component.njk
title: Identity bar
type: component
githuburl: https://github.com/ministryofjustice/moj-frontend/discussions/704
eleventyNavigation:
  key: Identity bar
  parent: Components
  excerpt: "Use the identity bar component to give users context of where they are within a service such as viewing a case."
---

{% example "/examples/identity-bar", 150 %}

## Overview

### When to use

Use the identity bar component to give users context of where they are within a service such as viewing a case.

This component is helpful when an entity consists of additional [sub sections](/components/sub-navigation/).

### When not to use

Don't use this component if there's only one details page. For example, clicking a case in a case list and seeing a single page of information about the case.

### Similar or linked components

There's also the:
- [button menu component](/components/button-menu/)
- [page header actions component](/components/page-header-actions/)

## How to use

### Displaying tasks

You can use buttons to display tasks which relate to the identity bar.

{% example "/examples/identity-bar-menu", 150 %}

### Displaying a menu of tasks

You can use the [button menu](/components/button-menu/) to display tasks which relate to the identity bar.  

{% example "/examples/identity-bar-menu-toggle", 300 %}

### Displaying primary and secondary tasks

You can use the [button menu](/components/button-menu/) alongside a [GOV.UK button](https://design-system.service.gov.uk/components/button/) (or link) to show tasks of differing importance which relate to the identity bar. This code has correct spacing and creates a better user experience for people on mobile devices.

{% example "/examples/identity-bar-secondary-toggle", 300 %}
