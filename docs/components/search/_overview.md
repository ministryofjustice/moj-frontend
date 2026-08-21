---
title: Overview
order: 10
tags: 'search'
permalink: false
eleventyComputed:
  override:eleventyNavigation: false
---

{% example template="examples/default", colocated=true, height=125 %}

## Overview

This component enables users to search for an item using a word or phrase. 

There are 2 variants:

- inline layout  
- stacked layout

### When to use

Use the search component to help users search a large amount of information for something, for example a person, case, application or location. 

The user needs to know what categories they’re searching in, for example a reference number. They need to have at least 1 piece of identifying information.

This component can also be used to [search a whole service in the primary navigation component](https://design-patterns.service.justice.gov.uk/components/primary-navigation/).

### When not to use

Do not use this component:

- if users will not know what search term to add
- if content already has a clear hierarchy, for example a side navigation or table of contents
- to replace good information architecture
- for users to search the contents of a linear service

Some users may prefer to look for items in other ways, such as:

- reading a short list
- searching on screen, for example using Ctrl + F   

Do research with users if you’re not sure how to help them find what they're looking for.

### Similar and linked components 

There’s also the:

- [filter component](/components/filter/)
- [primary navigation component](/components/primary-navigation/)
- [sortable table component](/components/sortable-table/)