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

The ‘add another’ component allows users to add similar information a few times whilst staying on the same page. 

## When to use

This component works best as a shallow layout for users to enter brief information about items, ideally only a few times. 

The items could be:

-	dates
-	the names of offences, programmes or people  
-	payments and their amounts

The component reproduces the field labels and so the items need to relate to one another. 

## When not to use

Do not use the 'add another' component to collect lengthy or complex data, especially if it needs multiple components to collect it. 

Lengthy or complex data entered into the 'add another' component will create a very long page. This could be a problem because:

- the items are only saved when the user submits the page (they'l lose it if they refresh the page or accidentally close it)
- users may find it hard to check what they've entered against a paper form or spreadsheet 
- very long pages may cause performance issues

Use the [‘add to a list’ pattern](/patterns/add-to-a-list/) for these scenarios.

## Choosing a layout

The component has 2 layouts:

- [Stacked](#stacked)
- [Inline](#inline)

### Stacked

The stacked (or vertical) layout is the default for this component. It helps users enter information into deeper items. 

This layout has visible labels to helps users:

- scan the page more easily (especially if they've added a few items on the page)
- enter and edit content in the correct item
- remove the correct item

#### When the ‘Add another’ button is selected, the title changes from 'Room 1' to 'Room 1 of 2’. A red remove button with the same labelling (‘Remove room 1’) appears under each item. 

[coded example with it open]

The fields have hidden unique labels. This enables screenreader users to navigate the component. Read [how to write content for the labels](/components/add-another/#how-to-use-tab). 

### Inline

The inline (or horizontal) layout is a lean design to save vertical space. This layout:

- has an inline 'remove' button 
- has hidden unique labels 
- can contain up to 4 form fields  

#### Screen 1: The landing screen. The fieldset label is in hidden text. 

#### Screen 2: When the ‘Add another’ button is selected, the fieldset label needs unique hidden text. A red remove button appears to the right of the last field. It also needs unique hidden text.


### Things to consider

When you're considering the 'add another' component, find out where the information is coming from that people are entering. For example a paper form, notes, a spreadsheet or legacy software. This may affect how people will need to use it. 

Switching from this component to the [‘add to a list’ pattern](/patterns/add-to-a-list/) later on will involve redesigning the user journey. If 

### Similar or linked components

The ‘add another’ component is similar to the [‘add to a list’ pattern](/patterns/add-to-a-list/). 