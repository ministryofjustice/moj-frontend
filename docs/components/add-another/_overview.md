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

The ‘add another’ component works best as a slim component for entering brief information. This information could include:

-	dates
-	content such as the names of offences, programmes or people through the [GOV.UK text input component](https://design-system.service.gov.uk/components/text-input/)
-	expenses and their amounts

The fieldsets must relate to one another. 

## When not to use

Do not use this component to gather information that is:

-	lengthy   
-	complex, especially if you need to use multiple components like radio buttons and checkboxes to get it
-	entered many times, for example from a spreadsheet
- unrelated, because it’s not ‘another’ thing
-	for categories and sub-categories (this is not accessible) 

Use the [‘add to a list’ pattern](/patterns/add-to-a-list/) for these scenarios.

The component should not be used in this way because items that are added to the add another component are only saved when the user submits the page. If they refresh the page all the data will be lost. 

Users may also find it hard to review what they've added on long pages, especially if they're checking it against a paper form. Very long pages may also cause performance issues (plain English way of saying this!) 

## Choosing a variant

There are 3 variants of this component:

[Stacked](#stacked)
[Inline](#inline)
[Magnifying glass](#magnifying-glass)

### Stacked

Use this variant for deeper or wider fieldsets. This will help users to:
- scan the page more easily (especially if they’ve selected 'add another' a few times)
- enter and edit content in the correct fieldset
- remove the correct fieldset  

#### Screen 1: The landing screen. The fieldset is numbered (‘Person 1’). A line is under the fieldset. 


#### Screen 2: When the ‘Add another’ button is selected, the fieldset titles change from 'Person 1' to 'Person 1 of 2’. A red remove button appears under each fieldset, with the same labelling as the fieldset (‘Remove person 1’). 


The form fields have hidden unique labels. This enables screenreader users to navigate the component. You can read [how to write content for the labels]. 

### Inline

This is a lean variant with a remove button in line. It works well for fieldsets with 2 narrow fields. The heading's unique label is hidden. 

You can add text fields and the date input but not checkboxes or radios. 

Guidance on width?

#### Screen 1: The landing screen. The fieldset label is in hidden text. 

#### Screen 2: When the ‘Add another’ button is selected, the fieldset label needs unique hidden text. A red remove button appears to the right of the last field. It also needs unique hidden text.

### Magnifying glass

The magnifying glass offers a stronger visual design. It saves space and may be better for text-heavy user interfaces. The magnifying glass is a widespread and recognised design for search. There's a [Nielsen Norman Group article on the magnififying glass icon](https://www.nngroup.com/articles/magnifying-glass-icon/). 

### Things to consider

When you consider whether this component is appropriate for your use case, consider where the information is coming from that people are entering. For example a paper form, notes, a spreadsheet or legacy software. This may affect how people will want to use it. 

### Similar or linked components

The ‘add another’ component is similar to the [‘add to a list’ pattern](/patterns/add-to-a-list/). 