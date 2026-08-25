---
title: Overview
order: 10
tags: 'search'
permalink: false
eleventyComputed:
  override:eleventyNavigation: false
---

## Overview

The search component enables users to look for an item using a word or phrase. 

It has 2 layouts:

- inline   
- stacked 

There are 2 button types. You can view [guidance on choosing a button](#how-to-use-tab).  

### Inline layout with the text button

The inline layout can be used with the [GOV.UK primary or secondary button component](https://design-system.service.gov.uk/components/button/). 

{% example template="examples/default", colocated=true, height=125 %}

### Inline layout with the icon button

{% example template="examples/icon-button", colocated=true, height=125 %}

### Stacked layout  

{% example template="examples/stacked", colocated=true, height=125 %}

### When to use

Use this component to help users search a large amount of information for something, for example a person, case, application or location. 

Users need to have at least 1 piece of identifying information, for example a reference number.

This component can also be used in the [primary navigation component to search a whole service](https://design-patterns.service.justice.gov.uk/components/primary-navigation/).

### When not to use

Do not use the search component:

- if users will be unsure about what search term to add
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