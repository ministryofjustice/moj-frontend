---
title: Overview
order: 10
tags: 'multi-select'
permalink: false
eleventyComputed:
  override:eleventyNavigation: false
---

{% example template="examples/default", colocated=true, height=650 %}

## Overview

The multi select component helps users select (and deselect) all the items in a table. It uses a single [GOV.UK checkbox](https://design-system.service.gov.uk/components/checkboxes/) at the top of the first column.

The items could be cases, applications, referrals or accommodation. 

### When to use

Use the multi select component to help users save time when they're applying an action to 2 or more items in a table, for example a case list.

These actions could be 'assign', 'delete', 'mark as read' or 'edit'. 

You can use this component with the [sortable table component](https://design-patterns.service.justice.gov.uk/components/sortable-table/), but if the table is paginated items will only be selected on the first page.   

### When not to use

Do not use the multi select component outside of a table, for example applied to checkboxes in a question on a linear service.  

### Similar or linked components

There's also the:

- [GOV.UK checkbox component](https://design-system.service.gov.uk/components/checkboxes/)
- [sortable table component](/components/sortable-table/)
- [GOV.UK button component](https://design-system.service.gov.uk/components/button/)  
- [button menu component](/components/button-menu/) 

