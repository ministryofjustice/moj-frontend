---
layout: layouts/component.njk
title: Add another
---

Use the add another component to let users add multiple items of the same thing.

{% lastUpdated "add-another" %}

{% example "/examples/add-another", 664 %}

## When to use this component

Use the add another component when you need to let users enter variations of information multiple times, such as several names for a single application.

## When not to use this component

Don’t use the add another component if you need to let users enter information which varies differently or is not similar. Or if one field is dependent on the answer to the previous.

## How it works

There are 2 ways to use the add another component. You can use HTML or, if you are using [Nunjucks](https://mozilla.github.io/nunjucks/) or the [GOV.UK Prototype Kit](https://govuk-prototype-kit.herokuapp.com/), you can use the Nunjucks macro.

The add another component uses JavaScript. When JavaScript is not available, the page will reload with the additional form elements added to the page.

## Research on this component

This component has been tested in prototypes of several citizen and internal products, including:

- Claim fees for Crown court defence (Legal Aid Agency)
- Moving People Safely (Her Majesty’s Prison and Probation Service)

## Contribute to this component

You can contribute to this component via the design system backlog
