---
layout: layouts/component.njk
title: Date picker
---

<span class="govuk-caption-xl">The date picker component enables users to select a date from a calendar.  </span>

{% example "/examples/date-picker", 590 %}

## Overview

When users first open the date picker's calendar it'll show today's date. Users do not have to use the calendar view to select a date - they can also enter one directly into the text field.

### When to use

Users might want to use the calendar view:

- for a relative date or one they need to look up, for example last Thursday or next Wednesday
- to enter today's date more quickly
- for available dates only, for example for prison visits

### When not to use

Do not use the date picker:

- for a memorable date, for example a user's date of birth
- for a date that users know or can easily look up, for example an appointment on a letter
- when only a rough date is needed, for example a month and year

Use the [GOV.UK Design System's date input component](https://design-system.service.gov.uk/components/date-input/) instead.

### Things to consider

Date pickers are fully navigable using a keyboard, but can be slow for keyboard-only and screen reader users.

### Similar or linked components

There's also the ['Ask users for dates' pattern in the GOV.UK Design System](https://design-system.service.gov.uk/patterns/dates/).

## How to use

### Hint text

The date picker hint text is set to 17/5/2024. This can be changed to a more helpful date, for example the start of a scheme. Add a full stop at the end.

### Excluding dates

<!-- You can set allowed date ranges if you need a user to pick a date within a date range. Individual dates and date ranges can also be disabled in the calendar view.

Users may type unavailable or disabled dates in the input field, so error messages will be necessary.

{% example "/examples/date-picker-min-max", 590 %} -->

You can exclude (or disable) specific dates and days of the week from the date picker, for example bank holidays or every weekend.

{% example "/examples/date-picker-disabled-dates", 590 %}

{% example "/examples/date-picker-disabled-days", 590 %}

Excluded dates have the right visual contrast but may be harder to view for users with low vision or colour blindness.

If there are a lot of unavailable dates, users will have to navigate through a lot of months to find a date. If there are only a few available dates (for example for an appointment) consider showing them in a list with radio buttons.

### Error messages

Follow the [GOV.UK Design System guidance on error messages](https://design-system.service.gov.uk/components/error-message/).

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

If you're using more than one date picker, give each text field its own error summary and message (even if the error is the same).

## Examples

### Filtering information with a date picker

<p><img src="/assets/images/date-picker-filter-example.svg" alt="A screenshot with the title 'Attended appointments'. In a grey box is the title Filter, underneath is the title Date and then a text input field. The calendar icon and a green 'Apply filter' button is on the right. Below this element is the text '7 appointments'. Details of these appointments are shown."></p>

### Asking a question with a date picker

<p><img src="/assets/images/date-picker-question-example.svg" alt="#"></p>

## Future changes

In future versions of this documentation, there will be:

- guidance on using date ranges with this component
- Welsh language content for the designs, including error messages

## Contributors

Thanks to Dom Billington, Eddie Shannon, David Middleton, and the DPS Connect team for contributing this component.

This component was based on the [Scottish Government Design System date picker](https://designsystem.gov.scot/components/date-picker).
