---
title: Writing content 
order: 25
tags: 'add-another'
permalink: false
eleventyComputed:
  override:eleventyNavigation: false
---

## Writing content 

You need to create a heading and item name for each 'add another' component.

### Heading

Create a heading that describes what the user is doing, for example 'Add a participant'. Add it above the component (it's not a part of the component). This will label each item accessibly using `aria-labelledby`. 

You can view [page layout examples of the 'add another' component](/components/add-another/#examples-tab). 

### Item name

Give the item a short and succinct name. For example person, room, date, income or session. The item name will be used in the:

- item label (in sentence case) 
- form field labels (in hidden text)
- button text (in lower case) 
- error messages (in lower case)

The item names are numbered 1,2,3 and so on.  

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

INSERT ANNOTATED DIAGRAM

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

INSERT ANNOTATED DIAGRAM
