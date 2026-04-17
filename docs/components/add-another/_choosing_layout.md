---
title: Choosing a layout
order: 12
tags: 'add-another'
permalink: false
eleventyComputed:
  override:eleventyNavigation: false
---
## Choosing a layout

The 'add another' component has 2 layouts:

- [stacked](#stacked)
- [inline](#inline) 

### The stacked layout

{% example template="examples/default", colocated="true", height=540 %}

The stacked (or vertical) layout is the default for this component. It can be used to collect information:

- from up to 4 fields
- using a wider range of components, for example the [GOV.UK date input](https://design-system.service.gov.uk/components/date-input/) and [GOV.UK radios](https://design-system.service.gov.uk/components/radios/)

View [how to use the stacked layout](/components/add-another/#stacked-layout-tab). 

### Inline

{% example template="examples/inline-accounts", colocated="true", height=540 %}

The inline (or horizontal) layout is a lean design for up to 3 fields. Use this layout:

- to save vertical space on the page 
- if users need to add more items
- if you need to place the component on the page multiple times 
- if users to view their items in rows and columns

The fields will stack vertically on smaller screens. 

View [how to use the inline layout](/components/add-another/#inline-layout-tab).
