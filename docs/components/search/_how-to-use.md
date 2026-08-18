---
title: How to use
order: 20
tags: 'search'
permalink: false
eleventyComputed:
  override:eleventyNavigation: false
---

## How to use

Designing the component (make header consistent with other docs). Do not use the component with autocomplete. Do not use with placeholder text. Do not add another search field to the component. Rationale. 

Do not change the colour or position of any of the buttons. DO NOT ADD THE MAGNIFYING GLASS TO THE STACKED VARIANT. The text label is clearer.

DELETE??
You can configure the search form to be inversed on black, and to hide and show labels and hints depending on your use case. You can view examples of this in the [primary navigation component documentation](/components/primary-navigation/).

### Position on page (check the position and name of this heading in other documentation)

Place the search component either:

- under a clearly labelled heading (typically above a table, such as a case list)
- at the top of the page (for site search), like in the MOJ primary nav component

Do not add the search component to the MOJ header. There isn’t space in the header to add it, and it would make the use inconsistent.

ADD THIS TO MOJ HEADER GUIDANCE

### Showing no results 

Follow the [content pattern for showing no results after a search](/content-standards/style-guide/#no-results-from-search). 

Adding to a page more than once

You can add the search component to a page more than once. Each instance of the component creates a search landmark so you’ll need to add accessible name. 

Coded example

You can read more about creating accessible landmarks on the Mozilla Developer site. 

Writing content  

In the (?legend) state what the user is searching by.  

For example:

For example search by name, prison number or date of birth.

Hint text guidance:

xxx

Search button

This is the GOV.UK button.  

Magnifying glass icon

The magnifying glass is a stronger visual design than the GOV.UK button. It saves space and may be better for text-heavy user interfaces. 

The magnifying glass icon is a widespread and recognised design for search. There's a [Nielsen Norman Group article on the magnififying glass icon](https://www.nngroup.com/articles/magnifying-glass-icon/ ).

Designing the page and onward journey

Filtering results

You may want to provide users with a way to refine their results. Use the moj filter rather than adding anything to the search component. 

Showing search results

You’ll need to show the user the outcome of their search. There’s a:

content pattern for showing results

content pattern for showing no results

You can use pagination to display the results. 

The results should be shown near the search button.  

screenshot example