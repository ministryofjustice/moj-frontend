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

The component contains:
- the [GOV.UK pagination component](https://design-system.service.gov.uk/components/pagination/), the 'pagination controls'
- a results count 

### The results count

The results count has 4 variants. These are the:  

- results range for the current page, and total results
- results range for the current page 
- total results  
- current and total pages

The results count is aligned on the left under the pagination controls. This is to help magnifier users. 

You can read [guidance on choosing a results count](/components/pagination/#how-to-use-tab).

### When to use

This pagination component can help users:
- navigate large amounts of results
- identify how many results there are
- know where they are in the results

Use pagination instead of automatically loading more results when the user reaches the bottom of the page (infinite scroll). Infinite scroll introduces usability problems, including making it challenging for a user to reach the page footer. 

### When not to use

Do not use this component:
- to help users navigate between content pages - use the [GOV.UK 'block' style of pagination](https://design-system.service.gov.uk/components/pagination/#for-navigating-between-content-pages) for that
- if you do not need the results count - use the [GOV.UK pagination component](https://design-system.service.gov.uk/components/pagination/) instead

### Things to consider

You'll likely need to combine pagination with other ways of helping users find items from very long lists. Consider the:
- [search component](/components/search/)
- [filter component](/components/filter/)
- [sortable table component](/components/sortable-table/)

People with dyscalculia may find pagination challenging, especially when it's used to display a large amount of results. Try:

- having more results per page (to reduce the number of pages)
- giving 'results' a more meaningful name, such as cases, people or referrals (to create context) 

IF YOU HAVE feedback on improving this for people with dyscalculia LINK TO GET HELP AND CONTRIBUTE.  

### Similar or linked components

- [Filter a list pattern](/patterns/filter-a-list/)
- [Multi select component](/components/multi-select/)
- [Sortable table component](/components/sortable-table/)
