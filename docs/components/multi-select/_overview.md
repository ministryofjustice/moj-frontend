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

The multi select component enables users to select (and deselect) all the items in a table. The items could be cases, applications, referrals or accommodation. 

The items are selected using [GOV.UK checkbox components](https://design-system.service.gov.uk/components/checkboxes/).

## When to use

Use the multi select component to help users save time when they're performing an action on 2 or more items in a table, for example a case list.

These actions could be to 'assign', 'delete', 'mark as read' or 'edit'. 

You can use it with the [sortable table componet](https://design-patterns.service.justice.gov.uk/components/sortable-table/). If the table is paginated, however, the multi select component will only select the items on the first page.   

### When not to use

Do not use the multi select component outside of a table, for example applied to checkboxes in a question in a linear service.  

### Things to consider



### Similar or linked components

There’s also the:



