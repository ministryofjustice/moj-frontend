---
title: How to use
tags: "date-picker"
order: 20
---

## How to use

### Hint text

The date picker hint text is set to 17/5/2024. This can be changed to a more helpful date, for example the start of a scheme or a future date. Add a full stop at the end.

### Excluding dates

You can exclude (or disable) options from the date picker, such as:

- days of the week or every weekend
- specific dates, such as bank holidays
- past or future dates

{% example template="examples/excluded-dates", colocated="true", height=590 %}

You need to add server-side validation for when users enter an unavailable date directly into the text field (rather than use the calendar). This will show them an error message.

Excluded dates have the correct colour contrast ratio with the date text and calendar background. This is WCAG 2.2 compliant. However, these dates may be harder to view for users with low vision or colour blindness, so there’s also a strikethrough. Numbers with a strikethrough can be harder for people with dyscalculia to read, which may be an issue if there are lots of excluded dates.

If there are not many available dates, users will have to navigate a lot to find one. Consider showing these dates in a list with radio buttons instead.

### Error messages

Follow the [GOV.UK Design System guidance on error messages](https://design-system.service.gov.uk/components/error-message/).

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
      <th scope="row" class="govuk-table__header">No date is entered or selected from the calendar</th>
      <td class="govuk-table__cell">Enter or select a date</td>
    </tr>
    <tr class="govuk-table__row">
      <th scope="row" class="govuk-table__header">The date is in the wrong format</th>
      <td class="govuk-table__cell">Enter the date in the correct format, for example, 17/5/2024</td>
    </tr>
    <tr class="govuk-table__row">
      <th scope="row" class="govuk-table__header">The date does not exist</th>
      <td class="govuk-table__cell">Enter a real date</td>
    </tr>
    <tr class="govuk-table__row">
      <th scope="row" class="govuk-table__header">The date is incomplete</th>
      <td class="govuk-table__cell">Enter a full date, for example 17/5/2024</td>
    </tr>
    <tr class="govuk-table__row">
      <th scope="row" class="govuk-table__header">The date is excluded</th>
      <td class="govuk-table__cell">Select an available date from the calendar</td>
    </tr>
  </tbody>
</table>

### Using multiple date pickers

If you're using more than one date picker, give each text field its own error summary and message (even if the error is the same).
