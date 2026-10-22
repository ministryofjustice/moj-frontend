---
title: Overview
order: 10
tags: 'scrollable-pane'
permalink: false
eleventyComputed:
  override:eleventyNavigation: false
---

{% example template="examples/default", colocated=true, height=470 %}

Use the scrollable pane component for content that is unavoidably overflowing on the page. 

It allows users to scroll horizontally to view content that is wider than the available space. Shadows at the edges show that there's more content. 

## When to use

Use on tables where data is on a single line. 

It can be used in the: 
- [filter a list pattern](/patterns/filter-a-list/) -- because the filter takes up additional horizontal space, causing the pane holding the table to shrink
- [sortable table component](/components/sortable-table/)

## When not to use

Only use this component if you cannot display the content to fit into the page. 

This is because users should be able to see all page content without needing to scroll.

Do not use this component on tables with data on multi lines. The component will not allow the content to overflow vertically.
