---
title: How to use
order: 20
tags: 'add-another'
permalink: false
eleventyComputed:
  override:eleventyNavigation: false
---

## How to use

The ['add another' component](/components/add-another/#overview-tab) has 2 layouts -- stacked and inline. The stacked layout is the default, so you'll need to pass the inline layout to use it.   

### Writing content

You need to give each 'add another' component an H2 and item name.

#### H2 heading

Add an H2 above the component to give your page the correct heading structure. You can view [page layout examples with the 'add another' component](/components/add-another/#examples-tab). 

#### Item names

The item name should be short and succinct. For example person, room, date, income or session. 

This name will be used in the:

- item title (in sentence case) 
- form field titles (in hidden text)
- button (in lower case) 
- error messages (in lower case)

The items are numbered 1,2,3,4 and so on.  

<table class="govuk-table">
  <caption class="govuk-table__caption govuk-table__caption--m">Content for the item name 'referral'</caption>
  <thead class="govuk-table__head">
    <tr class="govuk-table__row">
      <th scope="col" class="govuk-table__header">Part of the component</th>
      <th scope="col" class="govuk-table__header">Variant</th>
      <th scope="col" class="govuk-table__header">Label type</th>
      <th scope="col" class="govuk-table__header">Title in example</th>

    </tr>
  </thead>
  <tbody class="govuk-table__body">
    <tr class="govuk-table__row">
       <tr class="govuk-table__row">
      <th scope="row" class="govuk-table__header">Item title</th>
      <td class="govuk-table__cell">Stacked</th>
      <td class="govuk-table__cell">Visible</td>
      <td class="govuk-table__cell">Referral 1</td>
    </tr>
     <tr class="govuk-table__row">
      <th scope="row" class="govuk-table__header">Item title</th>
      <td class="govuk-table__cell">Inline</th>
      <td class="govuk-table__cell">Hidden</td>
      <td class="govuk-table__cell">Referral 1</td>
    </tr>
    <tr class="govuk-table__row">
      <th scope="row" class="govuk-table__header">All form fields</th>
      <td class="govuk-table__cell">Both variants</th>
      <td class="govuk-table__cell">Hidden</td>
      <td class="govuk-table__cell">Step 1, date 1</td>
    </tr>
    <tr class="govuk-table__row">
      <th scope="row" class="govuk-table__header">'Remove' button</th>
      <td class="govuk-table__cell">Stacked</th>
      <td class="govuk-table__cell">Visible</td>
      <td class="govuk-table__cell">Remove referral 1</td>
    </tr>
    <tr class="govuk-table__row">
      <th scope="row" class="govuk-table__header">'Remove' button</th>
      <td class="govuk-table__cell">Inline</th>
      <td class="govuk-table__cell">Hidden</td>
      <td class="govuk-table__cell">Remove referral 1</td>
    </tr>
     <tr class="govuk-table__row">
      <th scope="row" class="govuk-table__header">Error message</th>
      <td class="govuk-table__cell">Both</th>
      <td class="govuk-table__cell">Visible</td>
      <td class="govuk-table__cell">'Add a name for referral 1' (for example)</td>
    </tr>
  </tbody>
</table> 

### The 'remove' button

The 'remove' button is a [GOV.UK warning button](https://design-system.service.gov.uk/components/button/#warning-buttons). Do not change the button colour as users may confuse it with the 'add another' button (which it is sometimes next to). 

Do not change the button position, as this may make it harder for zoom users to use the component.

### Inline layout

You should add no more than 3 fields to the inline layout (the remove button is not included in the 3 items). This is because the layout follows the [GOV.UK grid system](https://design-system.service.gov.uk/styles/layout/#using-the-grid-system). 

All the items and field labels need to fit on 1 line. You can read [GOV.UK guidance on sizing text inputs](https://design-system.service.gov.uk/components/text-input/#use-appropriately-sized-text-inputs). 

Code example:

### Use with JavaScript

The add another component relies on JavaScript.  

Set up your service that if JavaScript is not available the page will reload with the additional form elements after the 'Add another' button is selected. 

### Error messages

Follow the [GOV.UK Design System guidance on error messages](https://design-system.service.gov.uk/components/error-message/).

#### Showing multiple errors  

[Coded example to show the multiple error behaviour]

Show errors for 1 item at a time using the [GOV.UK error summary](https://design-system.service.gov.uk/components/error-summary/). Once the user has resolved all the errors in the first item, display the next set. This should continue until all the errors are resolved.  

This set-up ensures that users can still identify their errors if an item is added or removed. 

{% example template="examples/error", colocated="true", height=590 %}

<table class="govuk-table">
  <thead class="govuk-table__head">
    <tr class="govuk-table__row">
      <th scope="col" class="govuk-table__header">Error state</th>
      <th scope="col" class="govuk-table__header">Error message</th>
    </tr>
  </thead>
  <tbody class="govuk-table__body">
    <tr class="govuk-table__row">
      <th scope="row" class="govuk-table__header">No value is entered to a field</th>
      <td class="govuk-table__cell">Enter a name for Person 1</td>
    </tr>
    <tr class="govuk-table__row">
      <th scope="row" class="govuk-table__header">No values are entered to an item</th>
      <td class="govuk-table__cell">Enter details for Person 1</td>
    </tr>
  </tbody>
</table>

### Using multiple 'add another' components

You can put more than 1 add another on a page but be aware of how this will affect the length and complexity of the page. 

However do not put an 'add another' component inside another one, for example to enable users to add items to subsections. Screenreaders may not announce that another component has been added, and it may maker the page harder to use for everyone. 

### Other parts of the page

When people use this component, it will make pages longer and more complex. Therefore it’s best to not add too much else to the page. A leaner page will also make it easier for users to identify -- and recover from -- errors.

### Screens after the component  

The add another component creates another item on a page. The data remains on the page until the user submits it, for example with a 'save and continue’ button.   

The component does not allow users to edit the items after submitting them. This can be done using the [GOV.UK ‘check answers’ pattern](https://design-system.service.gov.uk/patterns/check-answers/).

[screenshot example]