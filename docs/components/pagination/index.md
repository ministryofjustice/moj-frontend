---
title: Pagination
status: To be reviewed
statusDate: June 2021
excerpt: "Use the pagination component to help people view and navigate long lists of items"
lede: "Use the pagination component to help people view and navigate long lists of items"
---
---

{% example template="examples/default", colocated=true, height=125 %}

## Overview

The pagination component helps users to navigate between multiple pages. CONSIDER RENAMING. 

It adds a results count to the [GOV.UK pagination component](https://design-system.service.gov.uk/components/pagination/). If you do not need a results count, you can use the GOV.UK one. 

YOU CAN FIND OUT HOW TO USE THE GOV PAG. 

The results count can display the:

- results range on the current page, and the total results
- results range on the current page 
- total number of results  
- current and total page numbers

You can read [guidance on choosing a results count](/components/pagination/#how-to-use-tab).

### When to use

can use it for a table, doesn't need to be after a search filter. 

This pagination component can help users:
- navigate large amounts of results
- identify how many results there are
- know where they are in the results

Use pagination rather than automatically loading more results when the user approaches the bottom of the page (infinite scroll). Broader issues - can never get to footer. This causes problems for keyboard users. 

### When to use

Do not use this as a way to navigate between content pages, go straight to go for that. ADD LINK. COME BACK TO THIS. 

### Things to consider

Do not use this component as the only way for people to find things from a very long list. Try adding a search or filter. LINK OFF

People with dyscalculia may find pagination very challenging, especially when it's used to display a large amount of results. You can help make pagination easier to understand by:

- use the elipises to shorten the pagination DISPLAY - QUERY WHETHER THIS MAKES IT EASIER TO UNDERSTAND
- choosing a simpler results count REVISIT
- having more results per page, to reduce the number of pages

### Similar or linked components

- [Filter a list](/patterns/filter-a-list/)
- [Multi select](/components/multi-select/)
- [Sortable table](/components/sortable-table/)

## How to use

LINK TO GOV PAG.
### Selecting results count CONTENT

SHOW IMAGE OF THE SEARCH RESULTS

You need to choose a results count for the pagination component. Consider:
- what information is already on the page, for example the number of search results in a heading
- what users need to know, for example if results 11-20 means anything to them

YOU CAN CHANGE THE WORD 'RESULTS' TO WHATEVER YOU LIKE.

### When to show pagination

Do not show pagination if there's only one page. CAN YOU SET IT SO THAT IT IS INVOKED WHEN IT GOES ABOVE CERTAIN RESULTS? IF SO, HOW?

The component can be configured to hide or show the result count, previous and next buttons, ellipses or numbers.

### Setting the results per page

THE PAG COMPONENT DOESN'T CONTROL THE RESULTS PER PAGE. H/E THESE THINGS ARE USEFUL FROM USABILITY PT OF VIEW. CONSIDER NNN LINK OFF. 

You need to set how many results are shown per page. You may want to choose more per page if:

- research shows that users want to browse or look at more results
- you want to reduce the time people spend navigating between pages
- research shows that users search on screen (ctrl F)

You might want to choose fewer per page if:
- results can be quite deep (takes up more than 1 row) as this will make the page very long
- you want to reduce the cognitive load of a complex interface


{% example template="examples/prev-next", colocated=true, height=125 %}

## EXAMPLES

USE THEM TO EXPLAIN THE RESULTS CONTENT.


