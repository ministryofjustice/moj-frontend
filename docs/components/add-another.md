---
layout: layouts/component.njk
title: Add another
tier: Due for review
tierMessage: October 2025
type: component
githuburl: https://github.com/ministryofjustice/moj-frontend/discussions/686
eleventyNavigation:
  parent: Components
  key: Add another
  excerpt: "Use this component when users need to add similar information a couple of times, such as several names for a single application."
---

{% example "/examples/add-another", 664 %}

## When to use

Use this component when users need to add similar information a couple of times, such as several names for a single application.

## When not to use

Do not use this pattern when users need to add different kinds of information that do not relate to each other.

If users need to add information many times, it may cause performance and validation issues as the page will get very long. In this case, you should use [add to a list](/patterns/add-to-a-list/).

## How to use

The add another component relies on JavaScript. When JavaScript is not available, your page should reload with the additional form elements if the "Add another" button is pressed.

By default the component adds a H2 to the page. Make sure a H1 is also present to provide a clear heading structure.

## Research

This component has been tested in prototypes of several citizen and internal products, including:

- Claim fees for Crown court defence (Legal Aid Agency)
- Moving People Safely (His Majesty’s Prison and Probation Service)

## Accessibility issues

Some people who use assistive technology will find it hard to identify form items that are added. This is because the form labels this component creates are given the same ID when added to the page. [A fix for this has been proposed on GitHub.](https://github.com/ministryofjustice/moj-frontend/issues/160) This has been raised in an external audit under Web Content Accessibility Guidelines (WCAG) 2.4.6 Headings and Labels (Level AA). If you use this component without addressing this issue, you must list it in the accessibility statement.

People with low vision have also reported difficulty interacting with the remove button. This is because by default it is aligned to the right of the page away from their main focus.
