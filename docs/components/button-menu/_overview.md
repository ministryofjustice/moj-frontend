---
title: Overview
order: 10
tags: 'button-menu'
permalink: false
eleventyComputed:
  override:eleventyNavigation: false
---

{% example template="examples/default", colocated="true", height=250 %}

## Overview

Use the button menu to display multiple actions to a user. They open it with the menu title button.

### When to use

To show multiple tasks to users, start with the [GOV.UK Design System button group](https://design-system.service.gov.uk/components/button/#grouping-buttons). This helps users to find what they need.

Consider the MOJ Design System button menu instead if the buttons:

- have long titles or there’s a lack of space to display them, for example in a complex interface
- are variations on a theme, for example ‘Print options’
- are for fairly unrelated tasks, for example ‘Actions’
- are lower priority and do not need visual prominence
- need to change in number, for example with new functionality or according to permissions 

### When not to use

Do not use the button menu:

- as navigation or to link to a page for the sole purpose of viewing it, for example a booking (this is an accessibility issue and counts as a WCAG failure)
- for items in a [GOV.UK Design System summary list](https://design-system.service.gov.uk/components/summary-list/) - add link text to each row
- to display options like on a [GOV.UK Design System question page](https://design-system.service.gov.uk/patterns/question-pages/) - list them as bullets
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

