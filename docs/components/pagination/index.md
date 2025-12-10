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

The pagination component helps users to navigate between pages. It reduces the page load for long tables and lists (including search results and filtered lists). 

The component contains:
- a results count 
- the [GOV.UK pagination component](https://design-system.service.gov.uk/components/pagination/)

The results count has 4 variants. These are the:  

- results range on the current page, and total results
- results range on the current page 
- total results  
- current and total page numbers

You can read [guidance on choosing a results count](/components/pagination/#how-to-use-tab).

### When to use

This pagination component can help users:
- navigate large amounts of results
- identify how many results there are
- know where they are in the results

Use pagination instead of automatically loading more results when the user reaches the bottom of the page (infinite scroll). Infinite scroll introduces usability problems, including making it challenging for a user ro 

### When not to use

Do not use this component:
- if there's only one page of results (set it to not show)
- to help users navigate between content pages - use the [GOV.UK 'block' style of pagination](https://design-system.service.gov.uk/components/pagination/#for-navigating-between-content-pages) for that
- just for pagination - use the [GOV.UK pagination component](https://design-system.service.gov.uk/components/pagination/) instead

### Things to consider

You'll probably need to combine pagination with other ways of helping users find items from long lists. Consider the:
- [search component](/components/search/)
- [filter component](/components/filter/)
- [sortable table component](/components/sortable-table/)

People with dyscalculia may find pagination challenging, especially when it's used to display a large amount of results. Try:

- having more results per page (to reduce the number of pages)
- choosing a results count that front loads the most important number
- giving 'results' a more meaningful name, such as cases, people or referrals (this helps create context) 

Research will confirm the right approach for your service. 

### Similar or linked components

- [Filter a list](/patterns/filter-a-list/)
- [Multi select](/components/multi-select/)
- [Sortable table](/components/sortable-table/)

## How to use

You can read [guidance on using the GOV.UK pagination component](https://design-system.service.gov.uk/components/pagination/), which is a part of this component.

### Position on the page

ENTER CONTENT.

### Full pages of results - MOVE THIS, BUT WHERE?

If the results are the entire content of the page, add the amount of results to the title and h1. This improves accessibility. 

### Choosing a results count variant

INSERT IMAGE OF THE SEARCH RESULTS

When choosing a results count for the pagination component consider:
- information that's already on the page, for example the number of results in a heading
- what's relevant to the user and their task, for example a  results range  11-20 mean anything to them

### Setting results per page

 Results per page are controlled in a table or list component, rather than by pagination. When choosing the amount per page consider:

- if research shows that users want to browse or compare results(rather than look for a particular one)
- the time users will have to spend navigating between pages
- the depth of results (for example if they take more than 1 row)  
- the cognitive load of the page

{% example template="examples/prev-next", colocated=true, height=125 %}

## EXAMPLES

USE THEM TO EXPLAIN THE RESULTS CONTENT.


