---
title: Scrollable pane
status: To be reviewed
statusDate: November 2022
statusAction: Updated
lede: "Use the scrollable pane component when you have content (typically a table) which unavoidably overflows the page."
---

{% example template="examples/default", colocated=true, height=470 %}

## When to use

Use the scrollable pane component when you have content (typically a table) which unavoidably overflows the page. It adds scroll shadows to indicate that content overflows the page.

This is often used in the [filter a list](/patterns/filter-a-list/) pattern as the filter takes up additional horizontal space, causing the pane holding the table to shrink.

## When not to use

Before using this, try to avoid having content that overflows the page at all. Users should be able to see all of the page's content without needing to scroll, so this component should only be used when absolutely necessary.

Do not use this component to contain tables which have multi-line text. It will not allow the content to overflow vertically.

## How to use

In order to be accessible the scrollable pane must have a `role` of `region` and `tabindex="0"`. This
allows it to be focused using the keyboard and scrolled using the arrow keys.
All focusable elements need an accessible name, so you must also add an `aria-label`
or `aria-labelledby` attribute.
