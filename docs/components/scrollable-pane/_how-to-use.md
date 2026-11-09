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

This component works best on a white background.

If you need to, you can change the component's background colour by setting the `--moj-scrollable-pane-background-colour`custom property in your CSS or by using a `style` attribute on the element.

```html
<div class="moj-scrollable-pane" style="--moj-scrollable-pane-background-colour: #f4f8fb;" role="region" tabindex="0" aria-label="Establishments">
 [pane content]
</div>
```
