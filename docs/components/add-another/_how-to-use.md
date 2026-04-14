---
title: How to use
order: 20
tags: 'add-another'
permalink: false
eleventyComputed:
  override:eleventyNavigation: false
---

## How to use

The 'add another' component has 2 layouts -- stacked and inline. 

### Content for the component

You need to create a heading and item name for each 'add another' component.

#### Heading

Create a heading that describes what the user is doing, for example 'Add a participant'. Add it above the component (it's not a part of the component). This will label each item accessibly using `aria-labelledby`. 

You can view [page layout examples of the 'add another' component](/components/add-another/#examples-tab). 

#### Item name

Give the item a short and succinct name. For example person, room, date, income or session. The item name will be used in the:

- item label (in sentence case) 
- form field labels (in hidden text)
- button text (in lower case) 
- error messages (in lower case)

The item names are numbered 1,2,3 and so on.  

#### Stacked variant hidden text  

INSERT ANNOTATED DIAGRAM

<table class="govuk-table">
  <caption class="govuk-table__caption govuk-table__caption--m">Hidden content for the stacked variant</caption>
  <thead class="govuk-table__head">
    <tr class="govuk-table__row">
      <th scope="col" class="govuk-table__header">Part of the component</th>
      <th scope="col" class="govuk-table__header">Title in example (hidden text is in brackets)</th>
    </tr>
  </thead>
  <tbody class="govuk-table__body">
    <tr class="govuk-table__row">
       <tr class="govuk-table__row">
      <th scope="row" class="govuk-table__header">Form field: full name</th>
      <td class="govuk-table__cell">Full name (for participant 1)</th>
    </tr>
     <tr class="govuk-table__row">
      <th scope="row" class="govuk-table__header">Form field: date of birth</th>
      <td class="govuk-table__cell">Date of birth (for participant 1)</th>
    </tr>
  </tbody>
</table> 

#### Inline variant hidden text  

<table class="govuk-table">
  <caption class="govuk-table__caption govuk-table__caption--m">Hidden content for the inline variant</caption>
  <thead class="govuk-table__head">
    <tr class="govuk-table__row">
      <th scope="col" class="govuk-table__header">Item label</th>
      <th scope="col" class="govuk-table__header">Account 1</th>
    </tr>
  </thead>
  <tbody class="govuk-table__body">
    <tr class="govuk-table__row">
       <tr class="govuk-table__row">
      <th scope="row" class="govuk-table__header">Form field: bank name</th>
      <td class="govuk-table__cell">Bank name (for account 1)</th>
    </tr>
     <tr class="govuk-table__row">
      <th scope="row" class="govuk-table__header">Form field: funds in account</th>
      <td class="govuk-table__cell">Funds in account (for account 1)</th>
    </tr>
      <tr class="govuk-table__row">
      <th scope="row" class="govuk-table__header">Remove button</th>
      <td class="govuk-table__cell">Remove (account 1)</th>
    </tr>
  </tbody>
</table> 

### The ‘Remove’ button

The remove button is a [GOV.UK warning button](https://design-system.service.gov.uk/components/button/#warning-buttons). This is to ensure that users do not Do not change the button colour as users may confuse it with the ‘Add another' button (which it's sometimes next to). 

Do not change the button position, as this may make it harder for zoom users to use the component.

### Designing with the inline layout

You should add no more than 3 fields to the inline layout (the 'remove' button is extra). This ensures that the component is easy to use. The layout follows the [GOV.UK grid system](https://design-system.service.gov.uk/styles/layout/#using-the-grid-system), which cannot contain more than 4 fields.

You can only add the following components to the inline layout:

- the [GOV.UK text input](https://design-system.service.gov.uk/components/text-input/)
- the [GOV.UK select component](https://design-system.service.gov.uk/components/select/) 

Do not add radio buttons to it.

All the items and field labels need to fit on 1 line. You can read [GOV.UK guidance on sizing text inputs](https://design-system.service.gov.uk/components/text-input/#use-appropriately-sized-text-inputs). 

{% example template="examples/inline-offences", colocated="true", height=540 %}

### Using with JavaScript

The 'add another' component relies on JavaScript.  

Set up your service so that when JavaScript is not available, the page will reload with the additional form elements after the ‘add another’ button is selected. 

### Error messages

Follow the [GOV.UK Design System guidance on error messages](https://design-system.service.gov.uk/components/error-message/).

#### Inline variant error messages

In the inline variant, the red error border is attached to the whole item rather than a specific label. This is to help users find the error. 

INSERT EXAMPLE SCREENSHOT 

#### Showing multiple errors  

{% example template="examples/stacked-errors", colocated="true", height=590 %}

Multiple errors work in the same way for both variants. 

Show errors for 1 item at a time using the [GOV.UK error summary](https://design-system.service.gov.uk/components/error-summary/). Once the user has resolved all the errors in the first item, display the next set. This should continue until all the errors are resolved.  

This ensures that users can still identify errors when an item is added or removed. 

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
      <td class="govuk-table__cell">Enter a name for Person 1</td>
    </tr>
    <tr class="govuk-table__row">
      <th scope="row" class="govuk-table__header">No values are added to an item</th>
      <td class="govuk-table__cell">Enter details for Person 1</td>
    </tr>
  </tbody>
</table>

### Placing multiple ‘add another‘ components on a page

The only time you can place more than 1 'add another' on a page is with the inline variant. You still need to be aware of how this will affect the length and complexity of the page. 

Placing multiple components on the page will increase page complexity and make it harder for users to complete the forms successfully. User may lose their position on the page, enter data in the wrong place or delete the wrong item.  

Do not place:

- the 'stacked' layout on the page more than once  
- an 'add another' component inside another one, for example to create subsections (screenreaders may not announce it, and it may make the page harder to use for everyone)
- the 'stacked' and 'inline' layout on the same page

### Other parts of the page

When users interact with this component, pages will get longer and more complex. Therefore it’s best to keep the rest of the page fairly simple. A leaner page will also make it easier for users to identify -- and recover from -- errors.

### Screens after the component  

The add another component creates another item on a page. The data remains on the page until the user submits it, for example with a ‘save and continue’ button.   

The component does not allow users to edit the items after submitting them. This can be done using the [GOV.UK ‘check answers’ pattern](https://design-system.service.gov.uk/patterns/check-answers/).

[screenshot example]
