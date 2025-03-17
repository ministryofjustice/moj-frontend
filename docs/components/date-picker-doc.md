---
layout: layouts/component.njk
title: Date picker
---

<span class="govuk-caption-xl">The date picker component allows users to pick a date by entering a date or choosing from a calendar.</span>

{% example "/examples/search", 200 %}

## When to use

A date picker helps users choose a date by using a calendar view. This may help users to choose:
- a relative date - for example, last Tuesday or next Wednesday
- a date they don’t commonly use
- today’s date
- available dates only

The calendar view is not mandatory - users can still input a date into the text field.

## When not to use

Do not use if users need to enter a memorable date (e.g. their date of birth) or a date they can easily look up (e.g. an appointment date on a letter they have received). Instead, use the [date input component](https://design-system.service.gov.uk/components/date-input/) from the GOV.UK Design System.

## Similar or linked components

The GOV.UK Design System has a [date input component](https://design-system.service.gov.uk/components/date-input/) and a [pattern for asking users for dates](https://design-system.service.gov.uk/patterns/dates/).

## Date ranges and disabled dates

You can set allowed date ranges if you need a user to pick a date within a date range. Individual dates and date ranges can also be disabled in the calendar view.

Users may type unavailable or disabled dates in the input field, so error messages will be necessary.

{% example "/examples/search", 200 %}

## From and to dates

Allow users to pick to and from dates by stacking 2 date pickers together.

When stacking 2 date pickers horizontally or vertically, apply padding that is consistent with the rest of your product.

### Vertically stacked

Multiple date picker components can be vertically stacked. This is useful when used in vertical filters or forms.

{% example "/examples/search", 200 %}

### Horizontally stacked

Multiple date picker components can be horizontally displayed. This is useful when used in horizontal filters.

{% example "/examples/search", 200 %}

## Errors

Follow the guidance in the [GOV.UK Design System](https://design-system.service.gov.uk/components/error-message/) for error messages.

{% example "/examples/search", 200 %}

### Error messages in English and Welsh

<table class="govuk-table">
  <thead class="govuk-table__head">
    <tr class="govuk-table__row">
      <th scope="col" class="govuk-table__header">Error state</th>
      <th scope="col" class="govuk-table__header">English error message</th>
      <th scope="col" class="govuk-table__header">Welsh error message</th>
    </tr>
  </thead>
  <tbody class="govuk-table__body">
    <tr class="govuk-table__row">
      <th scope="row" class="govuk-table__header">If no date is entered or picked from the calendar</th>
      <td class="govuk-table__cell">Enter or pick a date</td>
      <td class="govuk-table__cell">Nodwch neu dewiswch ddyddiad</td>
    </tr>
    <tr class="govuk-table__row">
      <th scope="row" class="govuk-table__header">If the date entered is in the wrong format</th>
      <td class="govuk-table__cell">Enter the date in the correct format, for example, 17/5/2024</td>
      <td class="govuk-table__cell">Rhowch y dyddiad yn y fformat cywir, er enghraifft, 17/5/2024</td>
    </tr>
    <tr class="govuk-table__row">
      <th scope="row" class="govuk-table__header">If the date entered does not exist</th>
      <td class="govuk-table__cell">The date you entered must be a real date</td>
      <td class="govuk-table__cell">Rhaid i'r dyddiad a roesoch fod yn ddyddiad go iawn</td>
    </tr>
    <tr class="govuk-table__row">
      <th scope="row" class="govuk-table__header">If the date entered is incomplete</th>
      <td class="govuk-table__cell">Enter a complete date, for example, 17/5/2024</td>
      <td class="govuk-table__cell">Nodwch ddyddiad cyflawn, er enghraifft, 17/5/2024</td>
    </tr>
  </tbody>
</table>

### If you are using multiple date pickers

Make sure you use error summaries and error messages for each text field. Even if the same errors occur for multiple date pickers.

## Examples

Text

## Considerations

Whilst the date picker is fully navigable using a keyboard, date pickers can be slow and difficult to use for keyboard only users.

Another challenge for users, especially those with poor vision or colour blindness, is seeing the unavailable or disabled dates.

## Contributors

Thanks to **Dom Billington**, **Eddie Shannon**, **David Middleton**, and the **DPS Connect team** for contributing this component.
