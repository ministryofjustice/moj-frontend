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

It allows users to scroll horizontally to view content that is wider than the visible area. Shadows at the edges show that there's more content. 

## When to use

It is  usually used in the:
- [filter a list pattern](/patterns/filter-a-list/) -- because the filter takes up additional horizontal space, causing the pane holding the table to shrink
- [sortable table component](/components/sortable-table/)

## When not to use

Ideally users should be able to see all the page content without needing to scroll. Only use this component if you're unable to make the content fit into the page.