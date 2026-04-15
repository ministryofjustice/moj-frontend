---
title: Inline layout
order: 27
tags: 'add-another'
permalink: false
eleventyComputed:
  override:eleventyNavigation: false
---

## Using the inline layout

<div class="govuk-inset-text">
  The 'add another' component has 2 layouts -- stacked and inline. You can view 
  <a href="components/add-another/#stacked-layout-tab">guidance on the stacked layout</a>. 
</div>

### Creating content 

You need to create the following content for each stacked layout:

- a heading
- an item name

#### Heading

Add a heading that describes the task, for example 'Add a participant'. This is not a part of the component. It labels each item accessibly using `aria-labelledby`. 

#### Item name

Give the item a short and succinct name. For example person, room, date, income or session. The item name will be used in the following visible parts of the component:

- button text (in lower case) 
- error messages (in lower case)

The item names are numbered 1,2,3 and so on.  

#### Hidden text 

Hidden text is added to the end of the component labels. In the example, they will be:

- bank name for account 1
- funds in account for account 1
- remove account 1 (for the remove button)

### Designing the inline layout

Add no more than 3 fields to the inline layout (the 'remove' button is extra). This keeps it is easy to use. The layout follows the [GOV.UK grid system](https://design-system.service.gov.uk/styles/layout/#using-the-grid-system), which cannot contain more than 4 fields.

You can add only 2 different types of components to it. These are the:

- [GOV.UK text input](https://design-system.service.gov.uk/components/text-input/)
- [GOV.UK select component](https://design-system.service.gov.uk/components/select/) 

Do not add radio buttons to it.

All the items and field labels need to fit on 1 line. You can view [GOV.UK guidance on sizing text inputs](https://design-system.service.gov.uk/components/text-input/#use-appropriately-sized-text-inputs). 

{% example template="examples/inline-offences", colocated="true", height=540 %}

### The ‘Remove’ button

The remove button is a [GOV.UK warning button](https://design-system.service.gov.uk/components/button/#warning-buttons). This distinguishes it from the ‘Add another' button, which it's sometimes next to. Do not change the button colour. 

Do not change the button position, as this may make it harder for zoom users to use the component.

### Error messages

The red error border is attached to the whole item rather than the location of the error. This is to help users find the error. 

Follow the [GOV.UK Design System guidance on error messages](https://design-system.service.gov.uk/components/error-message/).

INSERT CODED EXAMPLE  

#### Showing multiple errors  

Show errors for 1 item at a time using the [GOV.UK error summary](https://design-system.service.gov.uk/components/error-summary/). Once the user has resolved all the errors in the first item, display the next set. This should continue until all the errors are resolved and should ensure that users can still find errors after an item is added or removed. 

<table class="govuk-table">
  <thead class="govuk-table__head">
    <tr class="govuk-table__row">
      <th scope="col" class="govuk-table__header">Error state</th>
      <th scope="col" class="govuk-table__header">Error message</th>
    </tr>
  </thead>
  <tbody class="govuk-table__body">
    <tr class="govuk-table__row">
      <th scope="row" class="govuk-table__header">No value is added to a field</th>
      <td class="govuk-table__cell">Enter a xx for xx 1</td>
    </tr>
    <tr class="govuk-table__row">
      <th scope="row" class="govuk-table__header">No values are added to an item</th>
      <td class="govuk-table__cell">Enter details for xx 1</td>
    </tr>
  </tbody>
</table>

### Designing the page and onward journey

#### Placing multiple ‘add another‘ components on a page

You can place the inline layout on a page more than once, but be aware of how this will affect the page length and complexity. Users may lose their position on the page, enter data in the wrong place or delete the wrong item.  

Do not put it:

- on the same page as the stacked layout
- inside another 'add another' component, for example to create subsections (screenreaders may not announce it, and it may make the page harder to use for everyone)

#### Other parts of the page

When users interact with this component, pages will get longer and more complex. Therefore it’s best to keep the rest of the page fairly simple. A leaner page will also make it easier for users to identify -- and recover from -- errors.

#### Screens after the component  

The add another component creates another item on a page. The data remains on the page until the user submits it, for example with a ‘save and continue’ button.   

Users can edit their items after submitting them using the [GOV.UK ‘check answers’ pattern](https://design-system.service.gov.uk/patterns/check-answers/).

### Using with JavaScript

The 'add another' component relies on JavaScript.  

Set up your service so that when JavaScript is not available, the page will reload with the additional form elements after the ‘add another’ button is selected. 