---
layout: layouts/component.njk
title: Identity bar
---

{% lastUpdated "identity-bar" %}

{% example "/examples/identity-bar", 150 %}

## When to use

Use the identity bar component to give users context of where they are within a service such as viewing a case.

This component is helpful when an entity consists of additional [sub sections](../sub-navigation).

## When not to use

Don't use this component if there's only one details page. For example, clicking a case in a case list and seeing a single page of information about the case.

## How to use

### Action menu

You can optionally configure the component to display actions that the user can take from within any sub section.

{% example "/examples/identity-bar-menu", 150 %}

### Drop down action menu

The action menu uses the [menu](../button-menu) component which can be configured to show as a drop down menu.

{% example "/examples/identity-bar-menu-toggle", 300 %}

### Primary button plus secondary action menu

This [menu](../button-menu) is made up of multiple menus. The first consists of just one button and is exposed because it's a primary action. The second menu consists of two secondary options, which are placed within a drop down menu.

{% example "/examples/identity-bar-secondary-toggle", 300 %}
