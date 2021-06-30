---
layout: layouts/component.njk
title: Button menu
---

{% lastUpdated "button-menu" %}

{% example "/examples/button-menu", 175 %}

## When to use

Use the button menu component to group buttons together in a row or collapsible menu.

Use this component when the there are a number of possible actions the user can take.

## When not to use

Don't use this component when a basic in-page form has multiple actions.

## How to use

By default this component just groups buttons together to ensure they are spaced correctly. But can be turned into a toggle menu at a configurable screen width that:

- is aligned right or left
- is coloured green (primary) or grey (secondary)

### Left aligned grey toggle menu

Use the grey clour when it's not the main action the user needs to take.

{% example "/examples/button-menu-collapsible", 250 %}

### Right aligned green toggle menu

Use the green colour when it's the main action the user needs to take.

{% example "/examples/button-menu-collapsible-alternative", 250 %}