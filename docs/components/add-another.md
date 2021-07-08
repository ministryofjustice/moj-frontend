---
layout: layouts/component.njk
title: Add another
---

{% lastUpdated "add-another" %}

{% example "/examples/add-another", 664 %}
## When to use

Use this component when users need to add similar information a couple of times, such as several names for a single application.


## When not to use

Do not use this pattern when users need to add different kinds of information that do not relate to each other.

If users need to add information many times, it may cause performance and validation issues as the page will get very long. In this case, you should use [add to a list](../../patterns/add-to-a-list).

## How to use

The add another component uses JavaScript. When JavaScript is not available, the page will reload with the additional form elements added to the page.

## Research

This component has been tested in prototypes of several citizen and internal products, including:

- Claim fees for Crown court defence (Legal Aid Agency)
- Moving People Safely (Her Majesty’s Prison and Probation Service)
