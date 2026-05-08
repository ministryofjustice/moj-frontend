---
title: How to use
order: 20
tags: 'pagination'
permalink: false
eleventyComputed:
  override:eleventyNavigation: false
---

## How to use

The component has 2 parts:
- the [GOV.UK pagination component](https://design-system.service.gov.uk/components/pagination/) (the 'pagination controls')
- a results count 

The pagination controls will not show if there's only 1 page of results, but you can still set the results count to show. 

### Using the pagination controls

You can read [guidance on using the GOV.UK pagination component](https://design-system.service.gov.uk/components/pagination/) or 'pagination controls'. This is a part of this component.

### Using the results count

You can choose how to display the results using 1 of the 4 result count variants.

#### Results range for the current page, and total results

{% example template="examples/results-range-and-total", colocated=true, height=125 %}

#### Results range for the current page

{% example template="examples/results-range", colocated=true, height=125 %}

#### Total results

{% example template="examples/results-total", colocated=true, height=125 %}

#### Current and total pages

{% example template="examples/results-pages", colocated=true, height=125 %}


When choosing a variant consider:

- information that's already on the page, for example the number of results in a heading
- what's relevant to the user, for example whether the results range means anything to them

The results count is aligned to the left under the pagination controls. Do not move it, because this may cause issues for magnifier users. 

### The number of results on each page

 The number of results on each page is controlled by a table or list component, rather than by pagination. When choosing the amount per page consider:

- if research shows that users want to browse or compare results (rather than look for a particular one)
- the time users will have to spend navigating between pages
- the height of each result 
- the page's cognitive load 

### Results-only pages

If the results are the only content on the page, add the amount of results to the title and h1. This improves accessibility. 
