---
title: Overview
order: 10
tags: 'add-another'
permalink: false
eleventyComputed:
  override:eleventyNavigation: false
---
{% example template="examples/default", colocated="true", height=540 %}

## Overview

The ‘add another’ component allows users to add similar information to a page a few times. 

## When to use

This component works best in a shallow layout for users to enter brief information about items, ideally only a few times. 

The items could be:

-	the names of offences, programmes or people  
-	dates
- numbers, for example payments and their amounts

The component reproduces the field labels and so the items need to relate to one another. 

## When not to use

Do not use the 'add another' component to collect lengthy or complex data. This could be a problem because:

- the items are only saved when the user submits the page (they'll lose them if they refresh the page or close it)
- users may find it hard to check what they've entered, for example against a paper form or spreadsheet 
- very long pages may cause performance issues

Use the [‘add to a list’ pattern](/patterns/add-to-a-list/) for these scenarios.

## Choosing a layout

The component has 2 layouts:

- [Stacked](#stacked)
- [Inline](#inline)

### Stacked

The stacked (or vertical) layout is the default for this component. It helps users enter information into deeper items. 

This layout has visible labels to helps users:

- scan the page more easily (especially if they've added a few items to the page)
- enter and edit content in the correct item
- remove the correct item

#### When the ‘Add another’ button is selected, the title changes from 'Room 1' to 'Room 1 of 2’. A red remove button with the same labelling (‘Remove room 1’) appears under each item. 

[coded example with it open]

The fields have hidden unique labels. This enables screenreader users to navigate the component. There's guidance on [how to write content for the labels](/components/add-another/#how-to-use-tab). 

### Inline

[insert coded example - without button selected]

The inline (or horizontal) layout is a lean design to save vertical space. The inline layout: 

- can be added 2 or more times to a page
- should contain up to 3 fields
- has hidden unique labels 

After the ‘Add another’ button is selected a red 'remove' button appears to the right of the last field.  

### Things to consider

When you're exploring the 'add another' component, find out where the item information is coming from. For example a paper form, notes, a spreadsheet or legacy software. This will affect how people use it. 

The [‘add to a list’ pattern](/patterns/add-to-a-list/) enables users to review the items that they've added. This may more appropriate for helping users to add a lot of items. 

If you expect that later on users will need to add more, complex items (that need reviewing) it might be better to start off using the pattern. Switching from the 'add another' component to the pattern involves redesigning the user journey.

### Similar or linked components

The ‘add another’ component is similar to the [‘add to a list’ pattern](/patterns/add-to-a-list/). 