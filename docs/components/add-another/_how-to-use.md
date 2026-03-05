---
title: How to use
order: 20
tags: 'add-another'
permalink: false
eleventyComputed:
  override:eleventyNavigation: false
---

## How to use


### Fields and button titles

You need to give the item a name, for example person, room, date, income or session.  

The item name will . It will be upper case for the item title and lower case in the button, for example Person 1 and remove person 1.

Unique labels will tell screenreader users:

-	which item they’re removing
- which form field they're focused on
-	that an item has been added or removed
-	about errors  

You need to create the following unique content for each layout. 

<table class="govuk-table">
  <caption class="govuk-table__caption govuk-table__caption--m">Stacked layout content</caption>
  <thead class="govuk-table__head">
    <tr class="govuk-table__row">
      <th scope="col" class="govuk-table__header">Content</th>
      <th scope="col" class="govuk-table__header">Visibility of labels</th>
      <th scope="col" class="govuk-table__header">Title in example</th>

    </tr>
  </thead>
  <tbody class="govuk-table__body">
    <tr class="govuk-table__row">
      <th scope="row" class="govuk-table__header">‘Remove’ buttons</th>
      <td class="govuk-table__cell">Visible</td>
      <td class="govuk-table__cell">Remove room 1</td>
    </tr>
    <tr class="govuk-table__row">
      <th scope="row" class="govuk-table__header">Main item title</th>
      <td class="govuk-table__cell">Visible</td>
      <td class="govuk-table__cell">Room 1</td>
    </tr>
    <tr class="govuk-table__row">
      <th scope="row" class="govuk-table__header">All form fields</th>
      <td class="govuk-table__cell">Hidden</td>
      <td class="govuk-table__cell">First name and last name</td>
    </tr>
  </tbody>
</table>

The stacked layout is the default layout. This means that if you  

### The 'remove' button

The 'remove' button is a [GOV.UK warning button](https://design-system.service.gov.uk/components/button/#warning-buttons). Do not change the button colour, as it may be confused with the 'add another' button and selected in error. 

Do not change the button position, as this may make it harder for zoom users to use the component.

### Inline layout

You can add up to 4 items to the inline layout (not including the remove button). This is because it follows the [GOV.UK grid system](https://design-system.service.gov.uk/styles/layout/#using-the-grid-system). All the items need to fit onto 1 line. 

You need to create unique hidden labels for all items, form fields and buttons for the inline layout. Field labels need to fit on one line.   

Code example:

### Use with JavaScript

The add another component relies on JavaScript.  

You need to set up your service for when JavaScript is not available. The page reloads with the additional form elements after the 'Add another' button is selected. 

### Error messages

[Coded example to show the error behaviour]

Follow the [GOV.UK Design System guidance on error messages](https://design-system.service.gov.uk/components/error-message/).

#### Showing multiple errors  

Show errors for 1 item at a time using the [GOV.UK error summary](https://design-system.service.gov.uk/components/error-summary/). Once the user has resolved all the errors in the first item, you can display the next set. This should continue until they're all resolved.  

This ensures that 

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

There are also [error messages for the date picker component](/components/date-picker/#error-messages), which can be used if . 

### Placing more than 1 'add another' on a page.

You can put more than one add another on a page but be aware of how this will affect the length and complexity of the page. 

However do not put an 'add another' component inside another one, for example for users to add items to a subsection.

This 'nested' approach is bad because xxx. 

### Other parts of the page

When people use this component, it will make pages longer and more complex. Therefore it’s best to not add too much else to the page. A leaner page will also make it easier for users to identify -- and recover from -- errors.

### Screens after the component  

The add another component creates another item on a page. The data remains on the page until the user submits the page, for example with a 'save and continue’ button.   

The component does not offer a way for users to edit what they’ve entered after it's been submitted. This can be done:
-	using the [GOV.UK ‘check answers’ pattern](https://design-system.service.gov.uk/patterns/check-answers/)
-	by switching to the [‘add to a list’ pattern](/patterns/add-to-a-list/)

You may want to confirm to users that their submission worked. You could do this by displaying the [success alert](/components/alert/#success-alert) on the next page. 