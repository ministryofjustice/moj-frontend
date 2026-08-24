---
title: How to use
order: 20
tags: 'search'
permalink: false
eleventyComputed:
  override:eleventyNavigation: false
---

## How to use

Learn how  search component 

### Buttons and the magnifying glass icon

The search component has 3 button types:

- [GOV.UK primary button](https://design-system.service.gov.uk/components/button/#default-buttons)
- [GOV.UK secondary button](https://design-system.service.gov.uk/components/button/#secondary-buttons)
- magnifying glass icon

Which button you add to the component depends on your layout. Use:

- any of the 3 button types for the inline layout 
- only the GOV.UK buttons for the stacked layout (not the magnifying glass icon)

Avoid using more than 1 primary button on a page. View [GOV.UK guidance on primary and secondary buttons](https://design-system.service.gov.uk/components/button/#:~:text=the%20Nunjucks%20macro.-,Default%20buttons,-Use%20a%20default). 

The magnifying glass icon is a widely used and recognised design for search. 

The magnifying glass icon is for saving space on text-heavy user interfaces. Button text is clearer and more accessible, so only use the icon on the inline layout if there's not enough space for the GOV.UK button. 

There's a [Nielsen Norman Group article on the magnififying glass icon](https://www.nngroup.com/articles/magnifying-glass-icon/ ). 

### Writing content  

You can add the following content to the component:

- a label -- to state what the user is searching for, for example a person, event or course
- hint text -- to state what the user is searching by, for example name or reference number (you do not always need to add hint text)

#### Avoid placeholder text 

Avoid adding placeholder text to the component, unless it's to help people use the autocompete component. 

Placeholder text will make it harder for some people to use the component, and may not be accessible. You can read [GOV.UK guidance on avoiding placeholder text](https://design-system.service.gov.uk/components/text-input/#avoid-placeholder-text).  

It's always better to use a visible label or hint text. 

### Designing the page and onward journey

Understand how to design your page effectively, and show users the results of their search. 

#### Where to add it 

Place the search component either:

- under a clearly labelled heading (typically above a table, such as a case list)
- at the top of the page (for site search), like in the [primary navigation component](/components/primary-navigation/) or [GOV.UK service navigation](https://design-system.service.gov.uk/components/service-navigation/). 

Do not add the component to the [MOJ header](/components/moj-header/). There's not enough space in the header, and doing this would make the component's use inconsistent.

#### Filtering results

The search component should only have 1 input field. If you need to help users refine their search, add the [filter component](https://design-patterns.service.justice.gov.uk/components/filter/). 

#### Adding multiple search components to a page  

If you add the search component to a page more than once you'll need to add a unique accessible name using either `aria-label` or `aria-label-by`. This is because each instance of the component creates a search landmark.

You can read [guidance on using landmarks on the DigitalA11y site](https://www.digitala11y.com/from-headers-to-footers-creating-accessible-experience-with-landmarks/). 

#### Showing search results

You’ll need to show the user the outcome of their search. Display the results near the search button, with [pagination](/components/pagination) if appropriate. 

There’s a:

- [content pattern for showing results](/content-standards/style-guide/#Results-(from-search))
- [content pattern for showing no results](/content-standards/style-guide/#no-results-from-search)

You can view an [example of how to show search results](/components/search/#examples-tab). 