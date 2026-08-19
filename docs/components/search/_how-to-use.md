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

### Designing the component  

#### Deciding between buttons and the magnifying glass icon

The stacked variant can be used with either the GOV.UK primary button or the GOV.UK secondary button. There should only be 1 GOV.UK primary button on each page, so xxx. 

The inline variant can only be used with the magnifying glass icon. 

It's a stronger visual design to save space on text-heavy user interfaces. It's a widely used and recognised design for search. There's a [Nielsen Norman Group article on the magnififying glass icon](https://www.nngroup.com/articles/magnifying-glass-icon/ ).

However, button text is clearer and more accessible, so only use the magnifying glass icon if there's no space for the button. 

#### Writing content  

In the legend state what the user is searching by. Expand. 

Hint text guidance. Hint text could be 'For example search by name, prison number or date of birth.'

#### Placeholder text 

Do not add placeholder text to the component, unless it's to help people use the autocompete component. 

Placeholder text will make it harder for some people to use the component, and may not be accessible. You can read [GOV.UK guidance on avoiding placeholder text](https://design-system.service.gov.uk/components/text-input/#avoid-placeholder-text).  

If users need guidance on how to perofmr their search, add this content to the hint text instead. 

#### Using autocomplete

The autocomplete component enables users to start typing and then see options.

You can use the component with [search autocomplete from the GOV.UK Publishing Design Guide](https://design-guide.publishing.service.gov.uk/components/search-autocomplete/) and the [GOV.UK accessible autocomplete](https://github.com/alphagov/accessible-autocomplete).

You can view:
- [GOV.UK accessible autocomplete guidance](https://github.com/alphagov/accessible-autocomplete#accessible-autocomplete)
- [GOV.UK accessibile autocomplete examples](https://alphagov.github.io/accessible-autocomplete/examples/)    

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

You can add the search component to a page more than once. If you do this you'll need to:

- add an accessible name (because each instance of the component creates a search landmark)
- ensure that there's no more than 1 GOV.UK primary button

Coded example

You can read more about [creating accessible landmarks on the Mozilla Developer site]. 

#### Showing search results

You’ll need to show the user the outcome of their search. The results should be shown near the search button and you can use [pagination](/components/pagination) to display them. 

There’s a:

- [content pattern for showing results](/content-standards/style-guide/#Results-(from-search))
- [content pattern for showing no results](/content-standards/style-guide/#no-results-from-search)

You can view an [example of how to show search results](/components/search/#examples-tab). 

### Clearing the search field

anything to go here?