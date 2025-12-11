---
title: How to use
order: 20
tags: 'pagination'
permalink: false
eleventyComputed:
  override:eleventyNavigation: false
---


## How to use

You can read [guidance on using the GOV.UK pagination component](https://design-system.service.gov.uk/components/pagination/), which is a part of this component.

If there's only one page of items, gov pag will not SHOW. You can still set the RESULTS count to show though. DO CODED EXAMPLES.  

### Using the pagination controls

You can change the numbers that are passed in to the component. For example, for alphabetised lists you could replace the numbers with letters. CODED EXAMPLE HERE.  

### Using the results count variant

INSERT IMAGE OF THE SEARCH RESULTS

When choosing a results count for the pagination component consider:
- information that's already on the page, for example the number of results in a heading
- what's relevant to the user, for example whether the results range means anything to them

The results count variant is under the pagination controls. Do not move it, because this may cause issues for magnifier users. 

### Setting results per page

 Results per page are controlled in a table or list component, rather than by pagination. When choosing the amount per page consider:

- if research shows that users want to browse or compare results (rather than look for a particular one)
- the time users will have to spend navigating between pages
- the row height of each result 
- the cognitive load of the page

### Results-only pages

If the results are the only content on the page, add the amount of results to the title and h1. This improves accessibility. 
