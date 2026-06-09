---
title: How to use
order: 20
tags: 'multi-select'
permalink: false
eleventyComputed:
  override:eleventyNavigation: false
---

## How to use

### Helping users carry out the action

Use other build blocks with the multi select component to enable users to apply an action to multiple items. You can use the [button menu component](/components/button-menu/) or [GOV.UK button component](https://design-system.service.gov.uk/components/button/) for the task.

There's guidance on using the [GOV.UK table component](https://design-system.service.gov.uk/components/table/). 

### Destructive actions

If the user is applying a destructive action to items (for example deleting, withdrawing or archiving), add an extra step in the journey for them to confirm it. This will make sure that they meant to select this option, and are fully informed. 

### Error messages 

If the user selects a bulk acton button after no items have been selected, show an error message. 

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

