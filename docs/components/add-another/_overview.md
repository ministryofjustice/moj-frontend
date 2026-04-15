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

The ‘add another’ component allows users to add more than 1 instance of related information to a page. It does this by reproducing the field labels.

## When to use

This component works best in a shallow layout for users to enter brief information, ideally only a few times. 

The things that people add ('items') could be:

-	dates
-	the names of people, programmes, events or offences
- numbers, for example payments and their amounts

There's guidance on [how to write content for the component](/components/add-another/#write-content-tab). 

## When not to use

Do not use the 'add another' component to collect lengthy or complex data. This is because:

- the items are only saved when the user submits the page (they'll lose them if they refresh the page or close it)
- users may find it hard to check what they've entered, for example against a paper form or spreadsheet 
- very long pages can cause performance issues

Use the [‘add to a list’ pattern](/patterns/add-to-a-list/) for these scenarios.

## Choosing a layout

The 'add another' component has 2 layouts:

- [stacked](#stacked)
- [inline](#inline)

### Stacked

The stacked (or vertical) layout is the default for this component. It helps users to enter more information, for example into 4 or more fields.

The stacked layout has visible labels and hidden text.

Visible labels help users:

- scan the page more easily (especially if they've added a few items to the page)
- enter and edit content in the correct item
- remove the correct item

Hidden text in the labels helps screenreader users to navigate the component. 

#### How labels change after the 'Add another' button is selected

When the ‘Add another’ button is selected, the title changes from 'Participant 1' to ‘Participant 1 of 2’. A red 'Remove' button with the same labelling (‘Remove Participant 1’) appears under the item. 

{% example template="examples/stacked", colocated="true", height=540 %}

### Inline

The inline (or horizontal) layout is a lean design for up to 3 fields. You might want to use this layout if:

- you need to save vertical space on the page 
- users need to add a lot of items
- the component needs to be placed in multiple areas of the page 
- it'd help users to view their items in a rows and columns

The input labels are visible, and the item number (for example 'Account 1') is in hidden text.   

After the ‘Add another’ button is selected, a red 'Remove' button appears to the right of the last field.  

The fields will stack vertically on smaller screens. 

{% example template="examples/inline-accounts", colocated="true", height=540 %}

### Things to consider

Find out where the information is coming from that people will enter into the component. For example a paper form, notes, a spreadsheet or legacy software. This will affect how people need to use it. 

The [‘add to a list’ pattern](/patterns/add-to-a-list/) is similar to the 'add another' component. The pattern is more appropriate for users who need to add a lot of items. If you expect that users will need to add more items later on it might be better to start with the ‘add to a list’ pattern. Switching from the 'add another' component to the pattern involves redesigning the user journey.

### Similar or linked components

The ‘add another’ component is similar to the [‘add to a list’ pattern](/patterns/add-to-a-list/). 
