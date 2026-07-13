---
title: How to use
order: 20
tags: 'multi-select'
permalink: false
eleventyComputed:
  override:eleventyNavigation: false
---

## How to use

Use the multi select component with a table, for example the [GOV.UK table component](https://design-system.service.gov.uk/components/table/). 

### Helping users carry out the action

Combine the multi select component with other building blocks to enable users to apply an action to multiple items. For example, the [GOV.UK button component](https://design-system.service.gov.uk/components/button/) or [button menu component](/components/button-menu/). 

### Destructive actions

If the user is applying a destructive action to items (for example deleting, withdrawing or archiving), add an extra step in the journey for them to confirm they want to do this.  

### Error messages 

If the user selects a bulk action button without selecting any items, show an error message. 

<table class="govuk-table">
  <thead class="govuk-table__head">
    <tr class="govuk-table__row">
      <th scope="col" class="govuk-table__header">Error state</th>
      <th scope="col" class="govuk-table__header">Error message</th>
    </tr>
  </thead>
  <tbody class="govuk-table__body">
    <tr class="govuk-table__row">
      <th scope="row" class="govuk-table__header">No item has been selected from the table</th>
      <td class="govuk-table__cell">Select an item for this task</td>
    </tr>
  </tbody>
</table>

