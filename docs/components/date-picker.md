---
layout: layouts/component.njk
title: Date picker
---

<span class="govuk-caption-xl">The date picker component enables users to select a date from a calendar.  </span>

{% example "/examples/date-picker", 590 %}

## About the date picker

When users first open the calendar view it'll show today's date. This is the calendar view.

Users do not have to use the calendar view. They can also enter a date directly into the text field.

## When to use

The date picker enables users to select a date from a calendar. This may help them to select:

- a relative date or one they need to look up, for example last Thursday or next Wednesday
- today's date, more quickly
- available dates only

## When not to use

Do not use the date picker:

- for a memorable date, for example a user's date of birth
- for a date that users know or can easily look up, for example an appointment on a letter
- when only an approximate date is needed, for example month and year

Instead use the [date input component](https://design-system.service.gov.uk/components/date-input/) from the GOV.UK Design System.

## Considerations

Users with poor vision or colour blindness may find it harder to see disabled dates. This does not affect the performance of the component.

Whilst the date picker is fully navigable using a keyboard, date pickers can be slow and difficult to use for keyboard only users.

Another great challenge for users, especially those with poor vision or colour blindness, is seeing the unavailable or disabled dates.

## Similar or linked components

The GOV.UK Design System has a [date input component](https://design-system.service.gov.uk/components/date-input/) and a [pattern for asking users for dates](https://design-system.service.gov.uk/patterns/dates/).

## Hint text

The date picker hint text is set to 17/5/2024. It can be changed if another date would help users, for example the date of the start of a scheme. Add a full-stop at the end.

## Disabled dates

<!-- You can set allowed date ranges if you need a user to pick a date within a date range. Individual dates and date ranges can also be disabled in the calendar view.

Users may type unavailable or disabled dates in the input field, so error messages will be necessary.

{% example "/examples/date-picker-min-max", 590 %} -->

You can disable specific dates and days of the week, for example bank holidays or every weekend.

{% example "/examples/date-picker-disabled-dates", 590 %}

{% example "/examples/date-picker-disabled-days", 590 %}

Disabled states:

- are not focusable
- are not read by screen readers
- do not need the right visual contrast

This means they are not accessible should they be needed for anything.

If there are a lot of unavailable dates, the date picker may not provide a good user experience. This is because users will have to navigate through a lot of months to find a date, for example for an appointment. If there are only a few available dates, consider showing them in a list with radio buttons.

## Error messages

Follow the guidance in the [GOV.UK Design System](https://design-system.service.gov.uk/components/error-message/) for error messages.

{% example "/examples/date-picker-error", 590 %}

### Error messages

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
      <th scope="row" class="govuk-table__header">The date is disabled</th>
      <td class="govuk-table__cell">Select an available date from the calendar</td>
    </tr>
  </tbody>
</table>

###  Using multiple date pickers

Each text field needs its own error summary and message. This applies even if the error is the same.

## Examples

### Filtering information with a date picker

<p><img src="/assets/images/date-picker-filter-example.svg" alt="#"></p>

[View example](#) (opens in a new window).

### Asking a question with a date picker

<p><img src="/assets/images/date-picker-question-example.svg" alt="#"></p>

[View example](#) (opens in a new window).

## Future changes

In future versions of this documentation, there will be:

- Guidance examples on using this component for date ranges
- Welsh content for the designs, including error messages

## Contributors

Thanks to Dom Billington, Eddie Shannon, David Middleton, and the DPS Connect team for contributing this component. This component was based on the date picker in the Scottish Government Design System.
