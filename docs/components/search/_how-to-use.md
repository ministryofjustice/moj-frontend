---
title: How to use
order: 20
tags: 'search'
permalink: false
eleventyComputed:
  override:eleventyNavigation: false
---

## How to use

Intro text. 

### Buttons and the magnifying glass icon

The search component has 3 button types:

- GOV.UK primary button
- GOV.UK secondary button
- magnifying glass icon

Which one you add to the component depends on your layout. Use:

- any of the 3 button types with the inline layout 
- the 2 GOV.UK buttons with the stacked layout (do not use the magnifying glass icon with the stacked layout)

Avoid using more than 1 primary button on a page. View [GOV.UK guidance on primary and secondary buttons](https://design-system.service.gov.uk/components/button/#:~:text=the%20Nunjucks%20macro.-,Default%20buttons,-Use%20a%20default). 

The magnifying glass icon is a stronger visual design to save space on text-heavy user interfaces. It's a widely used and recognised design for search. There's a [Nielsen Norman Group article on the magnififying glass icon](https://www.nngroup.com/articles/magnifying-glass-icon/ ).

However, button text is clearer and more accessible, so only use the magnifying glass icon if there's no space for the button. 

### Writing content  

You can add the following content to the component:

- a label -- to state what the user is searching for, for example a person, event or course
- hint text - to state what the user is searching by, for example name or reference number (although you do not always need to add hint text)

#### Avoid placeholder text 

Avoid adding placeholder text to the component, unless it's to help people use the autocompete component. 

Placeholder text will make it harder for some people to use the component, and may not be accessible. You can read [GOV.UK guidance on avoiding placeholder text](https://design-system.service.gov.uk/components/text-input/#avoid-placeholder-text).  

It's always preferrable to use visible label or hint text. 

### Designing the page and onward journey

#### Position on the page  

Place the search component either:

- under a clearly labelled heading (typically above a table, such as a case list)
- at the top of the page (for site search), like in the MOJ primary navigation component

Do not add the component to the MOJ header. There isn’t space in the header, and doing this would make the component's use inconsistent.

ADD THIS TO MOJ HEADER GUIDANCE

#### Filtering results

The search component should only have 1 field because xxx. 

Add the [MOJ filter component](https://design-patterns.service.justice.gov.uk/components/filter/) to help users refine their search results. 

#### Adding multiple search components to a page  

If you can add the search component to a page more than once you'll need to add a unique accessible name using either `aria-label` or `aria-label-by`. This is because each instance of the component creates a search landmark.

You can read more about [creating accessible landmarks on the Mozilla Developer site]. 

Coded example

#### Showing search results

You’ll need to show the user the outcome of their search. The results should be shown near the search button and you can use [pagination](/components/pagination) to display them. 

There’s a:

- [content pattern for showing results](/content-standards/style-guide/#Results-(from-search))
- [content pattern for showing no results](/content-standards/style-guide/#no-results-from-search)

You can view an [example of how to show search results](/components/search/#examples-tab). 