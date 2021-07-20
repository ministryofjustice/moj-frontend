---
layout: layouts/component.njk
title: Filter
---

{% banner "A similar component exists" %}
[Option select](https://finder-frontend.herokuapp.com/component-guide/option-select) in the GOV.UK Finder Frontend Component Guide has a similar function and visual design to this component.

The filter component is being discussed in the [GOV.UK Design System community backlog](https://github.com/alphagov/govuk-design-system-backlog/issues/21), and in the [Home Office Design System backlog](https://github.com/UKHomeOffice/design-system/issues/264).
{% endbanner %}

{% lastUpdated "filter" %}

{% example "/examples/filter", 1000 %}
## When to use

Use the filter component to help users filter a list of items, such as a list of cases or search results.

You should only provide users with filters they really need.
## How to use

You should use this component with the [filter a list](../../patterns/filter-a-list) pattern to allow the component to be shown with a list.

Users can select 1 or more filters. When the user clicks 'Apply filters' the page refreshes to show the items that match the filters. 

The selected filters are displayed at the top to let users see what they've selected and remove them easily. Clicking on a selected filter refreshes the page and removes the filter.
### Types of filters

You can use form elements such as [radios](https://design-system.service.gov.uk/components/radios/) and [checkboxes](https://design-system.service.gov.uk/components/checkboxes/) to let users filter the list. Follow guidance on how to [ask users for dates](https://design-system.service.gov.uk/patterns/dates/). 

User research will tell you the best order of filters.
### Navigating filters
#### Show and hide individual filters

If you're providing multiple ways of filtering, you may want to let users show and hide filters as needed.

<div class="govuk-form-group">
<table>
    <tr>
        <td>
            <img src="../../assets/images/filters-01.png" alt="" width="100%">
        </td>
        <td>
            <img src="../../assets/images/filters-02.png" alt="" width="100%">
        </td>
        <td>
            <img src="../../assets/images/filters-03.png" alt="" width="100%">
        </td>
    </tr>
</table>
</div>

User research will tell you if users need filters they have opened to stay open when they return to the page.

If you're letting users show and hide individual filters you must:

- use clear labels to help users understand what options are in the filter
- allow the user to navigate with a keyboard
- inform the user where they are and when content changes

If you struggle to come up with clear labels, it might be because the way you’ve separated the content is not clear.

#### Reducing the list of filter options

If a filter has a long list of options, use an [accessible autocomplete](https://github.com/alphagov/accessible-autocomplete) (type ahead) to let users narrow down the options before making a selection.

You should only show options if they match what the user has typed, of if they are already selected.

You should make it easier for users to narrow the options by:

- making it case insensitive
- stripping out punctuation characters and duplicate whitespace
- seeing ‘&’ and ‘and’ as the same

<div class="govuk-form-group">
<table>
    <tr>
        <td>
            <img src="../../assets/images/filters-04.png" alt="" width="100%">
        </td>
        <td>
            <img src="../../assets/images/filters-05.png" alt="" width="100%">
        </td>
    </tr>
</table>
</div>

## Research

This component:

- has been usability tested
- is working in a live service (Sirius for Office of the Public Guardian)

Users don't always see they can filter. Some users try to filter from the columns headings Sirius for OPG and Manage Offenders in Custody for HMPPS)

<div class="govuk-form-group">
<table>
    <tr>
        <td>
            <img src="../../assets/images/filters-06.png" alt="" width="100%">
        </td>
        <td>
            <img src="../../assets/images/filters-07.png" alt="" width="100%">
        </td>
    </tr>
</table>
</div>

## Contribute

[Discuss filters on GitHub](https://github.com/ministryofjustice/moj-frontend/discussions/197)

### Things we don't know enough about

- Guidance on when to use an alternative to search, such as 'search' or 'sort by'

- How to alleviate confusion between filter and sorting columns.

- When to use a horizontal layout for filters

- More detailed guidance on accessibility 

- How to deal with inter-dependent filters

- Technical implementation to ensure all pages are filtered not just the current page

- Whether the ability to filter should be emphasised, for example changing the colour of the 'open filter' button, or having the filter open when the page is first loaded

- Whether selected filters should be visible at all times above the list of items, like the [GOV.UK search results](https://www.gov.uk/search/all?keywords=test&content_purpose_supergroup%5B%5D=services&content_purpose_supergroup%5B%5D=news_and_communications&order=relevance)
