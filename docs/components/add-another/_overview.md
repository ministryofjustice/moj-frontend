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

The ‘add another’ component works best as a shallow component for entering brief information about items, ideally in no more than 3 or 4 fields. 

The items could be:

-	dates
-	the names of offences, programmes or people  
-	payments and their amounts

The component reproduces the field labels and so the items should relate to one another. 

## When not to use

It should not be used to collect complex data, especially if it needs multiple components like radio buttons and checkboxes to get it

Do not use this component to gather information that is:

- lengthy 
- complex, especially if it needs multiple components such as radios and checkboxes to get it
-	entered many times, for example from a spreadsheet

The component should not be used in this way because information that's added to this component is only saved when the user submits the page. If they refresh the page, they will lose all their data. 

Users may also find it hard to review a page if they have selected the 'add another' button many times. This is especially the case if they are checking their entries against a paper form or spreadsheet. Very long pages may also cause performance issues. 

Use the [‘add to a list’ pattern](/patterns/add-to-a-list/) for these scenarios.

## Choosing a layout

The component has 2 layouts:

- [Stacked](#stacked)
- [Inline](#horizontal)

### Stacked

The 'add another' component's default layout is 'stacked' (or vertical). The stacked layout of the  help users to:

- enter data into deeper items
- scan the page more easily (especially if they have a few items on the page)
- enter and edit content in the correct item
- remove the correct item

#### When the ‘Add another’ button is selected, the title changes from 'Room 1' to 'Room 1 of 2’. A red remove button appears under each item, with the same labelling (‘Remove room 1’). 

[coded example with it open]

The fields have hidden unique labels. This enables screenreader users to navigate the component. You can read [how to write content for the labels]. 

### Inline

The inline (or horizontal) layout is a lean design to save vertical space. The inline layout:

- has an inline 'remove' button 
- has hidden unique labels 
- can have a maximum of 4 form fields in it

If you expect users to enter more detailed information into an item, 
#### Screen 1: The landing screen. The fieldset label is in hidden text. 

#### Screen 2: When the ‘Add another’ button is selected, the fieldset label needs unique hidden text. A red remove button appears to the right of the last field. It also needs unique hidden text.

 

### Things to consider

When you're considering this component, find out where the information is coming from that people are entering. For example a paper form, notes, a spreadsheet or legacy software. This may affect how people will want to use it. 

If you add a lot of 'add another' components to a page it may become complex and you might want to switch to the [‘add to a list’ pattern](/patterns/add-to-a-list/). It is not possible to do this 


### Similar or linked components

The ‘add another’ component is similar to the [‘add to a list’ pattern](/patterns/add-to-a-list/). 