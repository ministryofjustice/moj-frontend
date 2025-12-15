---
title: Overview
order: 10
tags: 'pagination'
permalink: false
eleventyComputed:
  override:eleventyNavigation: false
---

{% example template="examples/default", colocated=true, height=125 %}

## Overview

The pagination component helps users to navigate between pages. It reduces the page load for long tables and lists (including search results and filtered lists). 

The component has 2 parts:
- the [GOV.UK pagination component](https://design-system.service.gov.uk/components/pagination/) (the 'pagination controls')
- a results count 

The pagination controls will not show if there's only 1 page of results, but you can still set the results count to show. 

### The results count

The results count has 4 variants. These are the:  

- results range for the current page, and total results
- results range for the current page 
- total results  
- current and total pages

INSERT CODED EXAMPLE 

The results count is aligned to the left under the pagination controls. This is to help magnifier users. 

You can read [guidance on choosing a results count](/components/pagination/#how-to-use-tab).

### When to use

This pagination component helps users:

- navigate long lists of results
- identify how many results there are
- know where they are in the results

Use pagination instead of automatically loading more results when the user reaches the bottom of the page (infinite scroll). Infinite scroll introduces usability problems, including making it hard for users to reach the page footer. 

### When not to use

Do not use this component:
- to help users navigate between content pages &ndash; use the [GOV.UK 'block' style of pagination](https://design-system.service.gov.uk/components/pagination/#for-navigating-between-content-pages) instead
- if the results count is not needed &ndash; just use the [GOV.UK pagination component](https://design-system.service.gov.uk/components/pagination/) on its own

### Things to consider

You'll probably need to combine pagination with other ways of helping users find items from very long lists. Consider the:
- [search component](/components/search/)
- [filter component](/components/filter/)
- [sortable table component](/components/sortable-table/)

People with dyscalculia may find pagination difficult to use, especially when it's used to display a large amount of results. Try:

- having more results per page (to reduce the number of pages)
- creating context by giving 'results' a more meaningful name, such as cases, people or referrals

Please add any feedback on improving this component for people with dyscalculia to the [pagination discussion on Github](https://github.com/ministryofjustice/moj-frontend/discussions/708).

### Similar or linked components

- [Filter a list pattern](/patterns/filter-a-list/)
- [Multi select component](/components/multi-select/)
- [Sortable table component](/components/sortable-table/)
