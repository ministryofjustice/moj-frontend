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

- inline layout (with 3 button options) 
- stacked layout

### When to use

Use the search component to help users search a large amount of information for something, for example a person, case, application or location. 

The user needs to know the categories they’re searching in, and have at least 1 piece of identifying information.

This component can also be used to [search a whole service using the primary navigation component](https://design-patterns.service.justice.gov.uk/components/primary-navigation/).

### When not to use

Do not use this component:

- if users do not know what search term to add
- if content already has a clear hierarchy, for example a side navigation or table of contents
- to replace good information architecture
- for users to search the contents of a linear service

Some users may prefer to look for items in other ways, such as:

- reading a short list
- searching on screen using Ctrl + F (Windows) or Cmd + F (Mac)   

Do user research if you’re not sure.

### Similar and linked components 

There’s also the:

- [filter component](/components/filter/)
- [primary navigation component](/components/primary-navigation/)
- [sortable table component](/components/sortable-table/)


## How to use

You can configure the search form to be inversed on black, and to hide and show labels and hints depending on your use case. You can view examples of this in the [primary navigation component documentation](/components/primary-navigation/).

### Showing no results 

Follow the [content pattern for showing no results after a search](https://design-patterns.service.justice.gov.uk/content-standards/style-guide/#no-results-from-search). 

## Accessibility issues

There’s an accessibility issue with the search component. If you’re using it in your service, you need to add these issue details to your accessibility statement.

### Screen reader and keyboard users cannot clear the text entry field

Screen reader and keyboard users cannot access the ‘x’ button to remove text from the search text entry field. This fails the following requirements:

- [WCAG 2.2 success criterion 2.1.1 (Keyboard)](https://www.w3.org/TR/WCAG22/#keyboard)
- [WCAG 2.2 success criterion 2.4.3 (Focus order)](https://www.w3.org/TR/WCAG22/#focus-order)
- [WCAG 2.2 success criterion 2.4.7. (Focus visible)](https://www.w3.org/TR/WCAG22/#focus-visible)

We’re aware of this issue and plan to implement a fix by June 2026.
