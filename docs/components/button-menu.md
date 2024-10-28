---
layout: layouts/component-no-feedback.njk
title: Button menu
githuburl: https://github.com/ministryofjustice/moj-frontend/discussions/685
---

<span class="govuk-caption-xl">The button menu is a versatile component that allows users to view tasks as buttons in a collapsible menu.</span>

{% example "/examples/button-menu", 250 %}


## Overview

Use the button menu to display multiple actions to a user. They open it with the menu title button.

### When to use

To show multiple tasks to users, start with the [GOV.UK Design System button group](https://design-system.service.gov.uk/components/button/#grouping-buttons). This helps users to find what they need.

Consider the MoJ Design System button menu instead if the buttons:

- have long titles or there’s a lack of space to display them, for example in a complex interface
- are variations on a theme, for example ‘Print options’
- are for fairly unrelated tasks, for example ‘Actions’
- are lower priority and do not need visual prominence
- need to change in number, for example with new functionality or according to permissions 

### When not to use

Do not use the button menu:

- as navigation or to link to a page for the sole purpose of viewing it, for example a booking (this is an accessibility issue and counts as a WCAG failure)
- for items in a [GOV.UK Design System summary list](https://design-system.service.gov.uk/components/summary-list/) - add link text to each row
- to display options like on a [GOV.UK Design System question page](https://design-system.service.gov.uk/patterns/question-pages/)  - list them as bullets
- for warning or inactive (disabled) buttons

### Things to consider

When deciding on the menu length consider that:

- without JavaScript, all the menu items will appear as a row
- very long button menus can be a sign that the page needs to be simplified or the journey split over multiple pages

### Similar or linked components

There’s also the:

- [button component on the GOV.UK Design System](https://design-system.service.gov.uk/components/button/)
- [page header actions component](/components/page-header-actions/)
- [summary list component on the GOV.UK Design System](https://design-system.service.gov.uk/components/summary-list/)
- [identity bar component](/components/identity-bar/)

## How to use

### Position on the page

Place the button menu near the heading that the tasks relate to. If you want to add it next to a heading, put it in the same container. To add it to an H1 use the [page header actions component](https://design-patterns.service.justice.gov.uk/components/page-header-actions/).

For tabbed content, adding it within the tabs may help users to understand:

- what the menu items relate to
- if (and how) the menu items change when the user moves between tabs

You can place it on the left or right. Match the alignment of the buttons with the menu: place them on the left of a left-aligned menu, and on the right of a right-aligned menu.

Screen magnification users may not find a right-aligned menu if:

- content is spread all over the page
- there’s a lot of whitespace around the menu
- the button menu is a long way from the heading

Placing the menu on the right may stop it from obscuring other items on the screen, such as a case list or side navigation.

### Left-aligned menu items

{% example "/examples/button-menu-left-aligned", 275 %}

### Right-aligned menu items

{% example "/examples/button-menu-right-aligned", 275 %}

### Grouping buttons

You can add a button menu alongside a link or GOV.UK button. This code has correct spacing and creates a better user experience for people on mobile devices.

{% example "/examples/button-menu-grouped", 275 %}

### Button colour

All the menu items are grey. The colour of the menu title button follows the [GOV.UK Design System guidance on button colours](https://design-system.service.gov.uk/components/button/#default-buttons). It's set to green (the default button colour) but you can change it.

Keep it green:

- if the user’s primary task on a page is to use the button menu
- to give it more visual prominence

Make it grey if:

- the menu items are less common tasks
- there’s already a green button on the screen

#### Colour on a dark background

Follow the [GOV.UK Design System guidance on buttons on dark backgrounds](https://design-system.service.gov.uk/components/button/#buttons-on-dark-backgrounds).

### Button content

Labelling the button menu accurately helps users to identify its contents. Group similar items together. Consider:

- ‘Print options’ or ‘Save options’ for variations on a theme  
- ‘Actions’ to cover a diverse range of tasks

Users may believe that menu buttons with the same title (particularly generic titles like ‘Actions’) contain the same items.  

Content can run into a second line.

## Examples

### Within a case management system

The location of the buttons helps users to know what the tasks relate to.

<p><img src="/assets/images/button-menu-case-management-example.png" alt="An example of a button menu used next to a GOV.UK default button on a Ministry of Justice webpage. The grey button menu is to the right of the green GOV.UK button. Both are to the right of an H2 called 'Case management'. This is all below an H1 called 'Tom Smith'. The green button reads 'Record review' and the button menu has 'Print options' as a title, and contains the items: Print case, Print review, Print investigation and Print referral."></p>

### Within the multi select component

Adding a button menu to the multi select component helps users complete common tasks quickly, for example assigning cases.

<p><img src="/assets/images/button-menu-multi-select-example.png" alt="An example of a button menu and GOV.UK default button on a Ministry of Justice webpage. The grey button menu is to the right of the green button. This is next to the H2 title 'Case management'. Both are below the H1 title 'Case management'. The title of the green button is 'Record review' and the button menu is 'Print options', which contains: Print case, Print review, Print investigation and Print referral."></p>

## Get help and contribute

### Get help

You can [contact the MoJ Design System team for help or support using this component](https://design-patterns.service.justice.gov.uk/community/help-and-feedback/).

### Help improve this component

The MoJ Design System team would like to hear:
* how you have used this component in your service
* any feedback you have about its usage, for example accessibility or ideas for improvement

Add these comments to the <a href='{{ githuburl }}'>{{ title }} discussion on Github</a>.

### Contributors

Thanks to Stephen Robertson, Rich Cooley, Al Laing, Jo Dimbleby, Dave Evans, Jim Bailey, Thomas Geraghty and Andy Keen for giving feedback on this component.
