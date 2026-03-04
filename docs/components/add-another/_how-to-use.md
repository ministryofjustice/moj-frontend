---
title: How to use
order: 20
tags: 'add-another'
permalink: false
eleventyComputed:
  override:eleventyNavigation: false
---

## How to use

Do not place an 'add another' component inside another one, for example to get users to add an item to a subsection of another category.

### Writing content and hidden text

Unique labels will tell screenreader users:

-	which item they’re removing
- which form field they're focused on
-	that an item has been added or removed
-	about errors  

### Stacked layout

The stacked layout is the default layout. This means that  

You need to create the following unique content for it:

<table class="govuk-table">
  <caption class="govuk-table__caption govuk-table__caption--m">Content for the stacked layout</caption>
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

Code example:

#### The 'remove' button

The 'remove' button is a [GOV.UK warning button](https://design-system.service.gov.uk/components/button/#warning-buttons).  

Do not change the button colour to grey, as it may be confused with the 'add another' button and selected in error. Do not change the button position, as this may make it harder for zoom users to use the component.

### Inline layout

You can add up to 4 items to the inline layout (not including the remove button). This is because it follows the [GOV.UK grid system](https://design-system.service.gov.uk/styles/layout/#using-the-grid-system). All the items need to fit onto 1 line. 

You need to create unique hidden labels for all items, form fields and buttons for the inline layout. Field labels need to fit on one line.   

Code example:

#### The 'remove' button

The 'remove' button is a [GOV.UK secondary button](https://design-system.service.gov.uk/components/button/#secondary-buttons) in this layout. Do not change the button colour.

Do not change the button position, as this may make it difficult for zoom users to use the component.

### Use with JavaScript

[what do teams need to do or know here?]

The add another component relies on JavaScript. When JavaScript is not available, your page should reload with the additional form elements if the 'Add another' button is selected.

### Error messages

[Coded example to show the error behaviour]

The[GOV.UK error summary](https://design-system.service.gov.uk/components/error-summary/) displays errors for 1 item at a time. Once the user has resolved the first set of errors, the next set of errors will be displayed (until they're all resolved).  

Follow the [GOV.UK Design System guidance on error messages](https://design-system.service.gov.uk/components/error-message/).

Each text field needs its own error summary and message (even if the error is the same). [Do we need to say this?]

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
      <th scope="row" class="govuk-table__header">No value is entered</th>
      <td class="govuk-table__cell">Enter a name for Person 1</td>
    </tr>
    <tr class="govuk-table__row">
      <th scope="row" class="govuk-table__header">No values are entered for an item</th>
      <td class="govuk-table__cell">Enter details for Person 1</td>
    </tr>
  </tbody>
</table>

There are also [error messages for the date picker component](/components/date-picker/#error-messages), which can be used if . 

### Other parts of the page

When people start to add items using this component, it will increase the length and complexity of a page. This is especially true if the component is placed on the page more than once. Therefore it’s best to not add too much else to the page. A leaner page will also makes it easier for users to identify -- and recover from -- errors.

### Screens after the component  

The add another component creates another item on a page. The data is submitted when the user submits the page, for example with a 'save and continue’ button.   

The component does not offer the user a way to edit what they’ve entered once it's been submitted. This can be done using the:
-	[GOV.UK ‘check answers’ pattern](https://design-system.service.gov.uk/patterns/check-answers/)
-	[‘add to a list’ pattern](/patterns/add-to-a-list/)

You may want to confirm to users on the next screen that what they've entered worked. You could do this with the [success alert](/components/alert/#success-alert). 