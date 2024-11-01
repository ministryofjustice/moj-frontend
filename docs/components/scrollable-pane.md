---
layout: layouts/component.njk
title: Scrollable pane
type: component
githuburl: https://github.com/ministryofjustice/moj-frontend/discussions/711
---

{% example "/examples/scrollable-pane", 470 %}

## When to use

Use the scrollable pane component when you have content (typically tables) which unavoidably overflowing the page. It adds scroll shadows to indicate that content overflows the page.

This is often used in the [filter a list](../../patterns/filter-a-list/) pattern as the filter takes up additional horizontal space, causing the pane holding the table to shrink.

## When not to use

Before using this, try to avoid having content that overflows the page at all. Users should be able to see all of the page's content without needing to scroll, so this component should only be used when absolutely necessary.

Do not use this component to contain tables which have multi-line text. It will not allow the content to overflow vertically.
