---
layout: layouts/component.njk
title: Button menu
---

Use the button menu component to group buttons together in a row or collapsible menu.

{% lastUpdated "button-menu" %}

{% example "/examples/button-menu", 175 %}

## When to use this component

Use this component when the there are a number of possible actions the user can take.

## When not to use this component

Don't use this component when a basic in-page form has multiple actions.

## How it works

There are 2 ways to use the button menu component. You can use HTML or, if you are using [Nunjucks](https://mozilla.github.io/nunjucks/) or the [GOV.UK Prototype Kit](https://govuk-prototype-kit.herokuapp.com/), you can use the Nunjucks macro.

By default this component just groups buttons together to ensure they are spaced correctly. But can be turned into a toggle menu at a configurable screen width that:

- is aligned right or left
- is coloured green (primary) or grey (secondary)

### Left aligned grey toggle menu

Use the grey clour when it's not the main action the user needs to take.

{% example "/examples/button-menu-collapsible", 250 %}

### Right aligned green toggle menu

Use the green colour when it's the main action the user needs to take.

{% example "/examples/button-menu-collapsible-alternative", 250 %}

## Research on this component

We need more research. If you have used the button menu component, get in touch to share your research findings.

## Contribute to this component

You can contribute to this component via the [design system backlog](https://github.com/ministryofjustice/moj-design-system-backlog/issues/39)
