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

### Using the pagination controls

You can read [guidance on using the GOV.UK pagination component](https://design-system.service.gov.uk/components/pagination/) or 'pagination controls'. This is a part of this component.

You can change the way that results are displayed in the pagination controls. For example, for alphabetised lists you could replace the numbers with letters. 

ADD CODED EXAMPLE.  

### Using the results count

This pagination component has 4 variants of the results count. 

ADD CODED EXAMPLE.  

When choosing your variant consider:

- information that's already on the page, for example the number of results in a heading
- what's relevant to the user, for example whether the results range means anything to them

The results count is under the pagination controls. Do not move it, because this may cause issues for magnifier users. 

### Setting results per page

 Results per page are controlled in a table or list component, rather than by pagination. When choosing the amount per page consider:

- if research shows that users want to browse or compare results (rather than look for a particular one)
- the time users will have to spend navigating between pages
- the height of each result 
- the page's cognitive load 

### Results-only pages

If the results are the only content on the page, add the amount of results to the title and h1. This improves accessibility. 
