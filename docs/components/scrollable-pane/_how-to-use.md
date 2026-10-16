---
title: How to use
order: 20
tags: 'scrollable-pane'
permalink: false
eleventyComputed:
  override:eleventyNavigation: false
---

## Adding an accessible name

Give the container an accessible name by adding a `label` or `labelledBy` attribute. Doing this will:
- identify it as a region to screen readers
- add the container to the keyboard tab order, allowing keyboard users to focus on the pane and use the arrow keys to scroll through its content

## Changing the background colour

This component works on a white background, where it works best.

To add it to a different coloured background change the component's background colour by setting the `--moj-scrollable-pane-background-colour` custom property in your CSS or by using a `style` attribute on the element.
