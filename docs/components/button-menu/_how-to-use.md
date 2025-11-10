---
title: How to use
order: 20
tags: 'button-menu'
permalink: false
eleventyComputed:
  override:eleventyNavigation: false
---

## How to use

### Position on the page

Place the button menu near the heading that the tasks relate to. If you want to add it next to a heading, put it in the same container. To add it to an H1 use the [page header actions component](/components/page-header-actions/).

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

{% example template="examples/left-aligned", colocated="true", height=275 %}

### Right-aligned menu items

{% example template="examples/right-aligned", colocated="true", height=275 %}

### Grouping buttons

You can add a button menu alongside a link or GOV.UK button. This code has correct spacing and creates a better user experience for people on mobile devices.

{% example template="examples/grouped", colocated="true", height=275 %}

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

