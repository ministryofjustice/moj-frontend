---
title: How to use
order: 20
tags: 'add-another'
permalink: false
eleventyComputed:
  override:eleventyNavigation: false
---

## How to use

Do not place an 'add another' component inside another one, for example to get users to add something to a subsection of a wider category.

### Writing content and hidden text

You need to create th following unique content:

- visible labels for all ‘remove’ buttons (this is ‘Remove person 1’ in the example)
-	hidden labels for all form fields (these are ‘first name’ and ‘last name’ in the example)

Unique labels will tell screenreader users:
-	which item they’re removing
- which form field they're focused on
-	that a item has been added or removed
-	about errors  

Add the unique label to each item. Code example:

### Other parts of the page

When people start to add items using this component, it will increase the length and complexity of a page. This is especially true if it's placed on the page more than once. Therefore it’s best to not add too much else to the page. A leaner page will also makes it easier for users to identify and recover from errors.

### Screens after the component  

The add another component creates another item on a page. The data is submitted when the user submits the page, for example with a 'save and continue’ button.   

The component does not offer the user a way to edit what they’ve entered. If you would like to offer this consider the:
-	[GOV.UK ‘check answers’ pattern](https://design-system.service.gov.uk/patterns/check-answers/)
-	[‘add to a list’ pattern](/patterns/add-to-a-list/)

You may want to confirm to users on the next screen that what they've entered worked. You could do this with the [success alert](/components/alert/#success-alert). 

### Use with JavaScript

[what do teams need to do or know here?]

The add another component relies on JavaScript. When JavaScript is not available, your page should reload with the additional form elements if the 'Add another' button is selected.

### Number of items

[To be decided: add some content if we’re enabling teams to add a limit to the total number of items].

### Error messages

#### Example of error messages 

[Screenshot example to show the error behaviour]

Follow the [GOV.UK Design System guidance on error messages](https://design-system.service.gov.uk/components/error-message/).

Each text field needs its own error summary and message (even if the error is the same).

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

### The 'remove' button

The 'remove' button is a [GOV.UK warning button](https://design-system.service.gov.uk/components/button/#warning-buttons). Do not change the button colour.

Do not change the button position, as this may make it difficult for zoom users to use the component.
