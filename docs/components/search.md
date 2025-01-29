---
layout: layouts/component.njk
title: Search
type: component
githuburl: https://github.com/ministryofjustice/moj-frontend/discussions/712
eleventyNavigation:
  key: Search
  parent: Components
  excerpt: "Use the search component to let users search by word or phrase."
---

{% example "/examples/search", 200 %}

## When to use

Use the search component to let users search by word or phrase. This can be used within the [Primary Navigation](/components/primary-navigation/) component.

## How to use

You can configure the search form to be inversed on black and to hide and show labels and hints depending on your use case. You'll see examples of this on the [Primary Navigation](/components/primary-navigation) component page.

## Accessibility issues

There’s an accessibility issue with the search component. If you’re using it in your service, you need to add these issue details to your accessibility statement.

### Screen reader and keyboard users cannot clear the text entry field

Screen reader and keyboard users cannot access the ‘x’ button to remove text from the search text entry field. This fails the following requirements:

- [WCAG 2.2 success criterion 2.1.1 (Keyboard)](https://www.w3.org/TR/WCAG22/#keyboard)
- [WCAG 2.2 success criterion 2.4.3 (Focus order)](https://www.w3.org/TR/WCAG22/#focus-order)
- [WCAG 2.2 success criterion 2.4.7. (Focus visible)](https://www.w3.org/TR/WCAG22/#focus-visible)

We’re aware of this issue and plan to implement a fix by April 2025.
