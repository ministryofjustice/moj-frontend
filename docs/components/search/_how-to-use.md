---
title: How to use
order: 20
tags: 'search'
permalink: false
eleventyComputed:
  override:eleventyNavigation: false
---

## How to use

Learn how to design the search component to help users find an item. 

### Choosing a button  

You can add 1 of 2 GOV.UK button types to the search component:

- text (usually with the wording 'search')
- icon (featuring a magnifying glass icon)

<div class="govuk-inset-text">
  Do not add the icon button to the stacked layout. It can only be added to the inline layout.
</div>

#### Primary and secondary buttons

You can use the [primary button component](https://design-system.service.gov.uk/components/button/#default-buttons) or [secondary button component](https://design-system.service.gov.uk/components/button/#secondary-buttons).

Which one you choose depends on the design of the rest of the page. Avoid using more than 1 primary button on a page -- view [GOV.UK guidance on primary and secondary button components](https://design-system.service.gov.uk/components/button/#:~:text=the%20Nunjucks%20macro.-,Default%20buttons,-Use%20a%20default). 

#### The magnifying glass icon

The magnifying glass icon is a widely used and recognised design for search. It's used in this component to save space on busy user interfaces. Button text is clearer and more accessible, so only use the icon in the inline layout if you're short of space. 

There's a [Nielsen Norman Group article on the magnififying glass icon](https://www.nngroup.com/articles/magnifying-glass-icon/ ). 

### Writing content  

You can add the following content to the component:

- a label -- to state what the user is searching for, for example a person, event or course
- hint text -- to state what the user is searching by, for example name or reference number (you do not always need to add hint text)

#### Avoid placeholder text 

Avoid adding placeholder text. It makes the component harder for some people to use, and it may not be accessible. You can read [GOV.UK guidance on avoiding placeholder text](https://design-system.service.gov.uk/components/text-input/#avoid-placeholder-text).  

It's always better to use a visible label or hint text than placeholder text. 

### Designing the page and onward journey

Understand how to design your page effectively, and show users the results of their search. 

#### Where to add it 

Place the search component either:

- under a clearly labelled heading (typically above a table, such as a case list)
- at the top of the page (for site search), like in the [primary navigation component](/components/primary-navigation/) or the [GOV.UK service navigation component](https://design-system.service.gov.uk/components/service-navigation/)

Do not add the component to the [MOJ header component](/components/moj-header/). There's not enough space in the header, and doing this would make the use of both components inconsistent.

#### Filtering results

The search component should only have 1 input field. If users need help refining their search, consider using the [filter component](/components/filter/). 

#### Adding multiple search components to a page  

If you add the search component to a page more than once you'll need to add a unique accessible name to each one, using `aria-label` or `aria-labelledby`. This is because each instance of the component creates a search landmark.

You can read [guidance on using landmarks on the DigitalA11y site](https://www.digitala11y.com/from-headers-to-footers-creating-accessible-experience-with-landmarks/). 

#### Showing search results

You’ll need to show the user the outcome of their search. Display the results near the search button, with [pagination](/components/pagination) if appropriate. 

There’s a:

- [content pattern for showing results](/content-standards/style-guide/#Results-(from-search))
- [content pattern for showing no results](/content-standards/style-guide/#no-results-from-search)

You can view an [example of how to show search results](/components/search/#examples-tab). 