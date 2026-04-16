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

View [guidance on choosing a layout](/components/add-another/#choosing-layout-tab).