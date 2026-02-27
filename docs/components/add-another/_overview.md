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

The ‘add another’ component works best as a shallow component for entering brief information, ideally in no more than 3 or 4 fields. 

This information could include:

-	dates
-	content such as the names of offences, programmes or people through the [GOV.UK text input component](https://design-system.service.gov.uk/components/text-input/)
-	expenses and their amounts

The component reproduces the field labels and so the items should relate to one another. 

## When not to use

Do not use this component to gather information that is:

-	lengthy   
-	complex, especially if you need to use multiple components like radio buttons and checkboxes to get it
-	entered many times, for example from a spreadsheet
- unrelated, because it’s not ‘another’ thing
 
The component should not be used in this way because items that are added to the add another component are only saved when the user submits the page. If they refresh the page all the data will be lost. 

Users may also find it hard to review what they've added on long pages, especially if they're checking it against a paper form. Very long pages may also cause performance issues (plain English way of saying this!) 

Use the [‘add to a list’ pattern](/patterns/add-to-a-list/) for these scenarios.

## Choosing a variant

There are 2 variants of this component:

- [Stacked](#stacked)
- [Inline](#inline)

### Stacked

The stacked variant has vertical fields, for deeper fieldsets. This will help users to:
- scan the page more easily (especially if they have a few items on the page)
- enter and edit content in the correct fieldset
- remove the correct fieldset  

#### Screen 1: The landing screen. The item is numbered (‘Person 1’) and there's a line under it.  

[coded example]

#### Screen 2: When the ‘Add another’ button is selected, the item title changes from 'Person 1' to 'Person 1 of 2’. A red remove button appears under each item, with the same labelling (‘Remove person 1’). 

[coded example with it open]

The fields have hidden unique labels. This enables screenreader users to navigate the component. You can read [how to write content for the labels]. 

### Inline

This is a lean variant where the fields are arranged horizontally to save vertical space. It has an inline 'remove' button. 

It works best with 3 or fewer fields. 

The heading's unique label is hidden. 

Guidance on width?

#### Screen 1: The landing screen. The fieldset label is in hidden text. 

#### Screen 2: When the ‘Add another’ button is selected, the fieldset label needs unique hidden text. A red remove button appears to the right of the last field. It also needs unique hidden text.

 

### Things to consider

When you consider whether this component is appropriate for your use case, consider where the information is coming from that people are entering. For example a paper form, notes, a spreadsheet or legacy software. This may affect how people will want to use it. 

### Similar or linked components

The ‘add another’ component is similar to the [‘add to a list’ pattern](/patterns/add-to-a-list/). 