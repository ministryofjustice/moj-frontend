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

The ‘add another’ component allows users to add similar information a few times without moving on to another page. 

## When to use

The ‘add another’ component works best as a slim component for entering brief information. This could include:

-	dates
-	expenses and their amounts
-	text fields, for example names of offences, programmes or people

The fieldsets must be related information. 

## When not to use

Do not use this component to gather information that is:

-	lengthy   
-	complex, especially using multiple components like radio buttons and checkboxes 
-	entered many times, for example from a spreadsheet
- unrelated, because it’s not ‘another’ thing
-	for categories and sub-categories (this is not accessible) 

This is because	items are only saved when the user selects a primary green button (for example ‘submit’ or ‘save and continue’). If they refresh the page, all the data will be lost. 

Users may also find it hard to review what they've added on long pages, especially if they're checking it against a paper form

Use the [‘add to a list’ pattern](/patterns/add-to-a-list/) for these scenarios.

## Choosing a variant

There are 3 variants of this component:

1. [Stacked](#stacked)
2. [Inline](#inline)
3. [Magnifying glass](#magnifying-glass)

### Stacked

Use this variant for deeper or wider fieldsets. This will help users to:
- scan the page more easily (especially if they’ve added a few fieldsets)
- enter and edit content in the correct fieldset
- remove the correct fieldset  

#### Screen A: The landing screen. The fieldset is numbered (‘Person 1’). A line is under the fieldset. 

#### Screen B: When the ‘Add another’ button is selected, the fieldset titles change from 'Person 1' to 'Person 1 of 2’. A red remove button appears under each fieldset, with the same labelling as the fieldset (‘Remove person 1’). 

The form fields have hidden unique labels. This enables screenreader users to navigate the component. You can read more about how to 

#### Inline

Coded example

### Magnifying glass

Coded example

### Things to consider

When testing if this component is appropriate for your use case, consider where the fieldset data is coming from (for example paper, a spreadsheet or legacy software). This may affect how people will want to use it. 

### Similar or linked components

The ‘add another’ component is similar to the [‘add to a list’ pattern](/patterns/add-to-a-list/). You can read more about [when to use ‘Add to a list’].