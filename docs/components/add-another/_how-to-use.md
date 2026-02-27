---
title: How to use
order: 20
tags: 'add-another'
permalink: false
eleventyComputed:
  override:eleventyNavigation: false
---

## How to use

### Use with JavaScript

[what do teams need to do or know here?]

The add another component relies on JavaScript. When JavaScript is not available, your page should reload with the additional form elements if the 'Add another' button is selected.

### Number of items

[To be decided: add some content if we’re enabling teams to add a limit to the total number of items].

### Error messages

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
      <th scope="row" class="govuk-table__header">No values are entered for a fieldset</th>
      <td class="govuk-table__cell">Enter details for Person 1</td>
    </tr>
     <tr class="govuk-table__row">
      <th scope="row" class="govuk-table__header">No values are entered for a fieldset</th>
      <td class="govuk-table__cell">Enter details for Person 1</td>
    </tr>
  </tbody>
</table>

There are also [error messages for the date picker component](/components/date-picker/#error-messages). 

### Buttons

Do not change the position of the ‘remove’ buttons in any of the variants. This may make the component less accessible to zoom users.

### Colours

The 'remove' button follows the [GOV.UK Design System colour palette](https://design-system.service.gov.uk/styles/colour/):

- the background is `govuk-colour("red")`
- the text is `govuk-colour("white")`

No other button colours should be used.

### Other parts of the page

The add another component can increase the length and complexity of a page, especially if it's placed on the page more than once. Therefore it’s best not to add too many other parts to the page. This will also makes it easier for users to identify and recover from errors.

The fieldset heading is an H2 and so you need to add an H1 for the page. 

### Writing content and hidden text

You need to create unique labels for the following:

•	‘remove’ buttons (visible text, this is ‘Remove person 1’ in the example)
•	form fields (hidden text, these are ‘first name’ and ‘last name’ in the example)

Unique labels will tell screenreader users:
-	which fieldset they’re removing
- which form field they're focused on
-	that a fieldset has been added or removed
-	about errors  

Add the unique label to each fieldset. Code example:

### Screens after the component  

The ‘add another’ component duplicates the fieldset on a page. The data is submitted when the user selects the ‘continue’, ‘save and continue’ or ‘save’ button.   

The component does not offer the user a way to edit what they’ve entered. If you would like to offer users a way to review and edit what they have entered consider the:
-	[GOV.UK ‘check answers’ pattern](https://design-system.service.gov.uk/patterns/check-answers/)
-	[‘add to a list’ pattern](/patterns/add-to-a-list/)

You may want to confirm to users on the next screen that what they have entered worked. You could do this with The [success alert](/components/alert/#success-alert). 





