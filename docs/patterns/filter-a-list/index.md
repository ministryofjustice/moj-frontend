---
title: Filter a list
status: To be reviewed
statusDate: June 2021
lede: "Use this pattern to help users refine a set of items either in a list or a set of search results."
---

{% example template="examples/default", colocated=true, height=1050 %}

## When to use

Use this pattern to help users refine a set of items either in a list or a set of search results. This pattern should be used instead of advanced search.

## When not to use

Don't use this pattern if there aren't many items to filter.

## How to use

The list should first appear unfiltered. After selecting one or more filters, the user submits the form which filters the list.

By default, filters should not persist across sessions or navigation. Where there's a clear user need, you can specify which filters should persist and for how long.

The filters can be any form control, including date inputs, checkboxes, free text and radio buttons. Use the appropriate form control for the type of attribute being filtered on.

### Similar or linked components

You can use the filter a list pattern with the:

- [search component](/components/search/) 
- [scrollable pane component](/components/scrollable-pane/)

With the search component the flow should be:

1. Type a search term and submit the search form.
2. See a search results page with filters.
3. Users can then filter the search results page further or search again starting from step 1.

Use it with the scrollable pane component if the content unavoidably overflows the page. 