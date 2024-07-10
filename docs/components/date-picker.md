---
layout: layouts/component.njk
title: Date picker
---

<span class="govuk-caption-xl">The date picker component allows users to pick a date by entering a date or choosing from a calendar.</span>

{% example "/examples/date-picker", 590 %}

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

## Hint text
ADD SOMETHING HERE === The date picker default hint text is 17/05/2024. Always include a full-stop at the end.

ADD SOMETHING HERE === If using hint text that is different from the default date, use a date that is within the context of your service. And, consider using numbers that are visually different to avoid confusion for some users. For example, 08/03/2023 can be confusing for some users.

## Disabled dates

You can set allowed date ranges if you need a user to pick a date within a date range. Individual dates and date ranges can also be disabled in the calendar view.

Users may type unavailable or disabled dates in the input field, so error messages will be necessary.

{% example "/examples/date-picker-min-max", 590 %}

ADD SOMETHING HERE === You can disable specific dates (e.g. 17/10/2024, 18/10/2024, 19/10/2024).

{% example "/examples/date-picker-disabled-dates", 590 %}

ADD SOMETHING HERE === You can disable days of the week (e.g. every Saturday and Sunday).

{% example "/examples/date-picker-disabled-days", 590 %}

ADD SOMETHING HERE === Date pickers with lots of disabled dates isn't a good experience for a user. For example, if using a date picker to book an appointment, it may be easier for users to show them a list of available appointments as radio buttons.

## From and to dates

Allow users to pick to and from dates by stacking 2 date pickers together.

When stacking 2 date pickers horizontally or vertically, apply padding that is consistent with the rest of your product.

### Vertically stacked

Multiple date picker components can be vertically stacked. This is useful when used in vertical filters or forms.

{% example "/examples/date-picker-vertical-pair", 650 %}

### Horizontally stacked

Multiple date picker components can be horizontally displayed. This is useful when used in horizontal filters.

{% example "/examples/date-picker-horizontal-pair", 590 %}

## Errors

Follow the guidance in the [GOV.UK Design System](https://design-system.service.gov.uk/components/error-message/) for error messages.

{% example "/examples/date-picker", 590 %}

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
    <tr class="govuk-table__row">
      <th scope="row" class="govuk-table__header">If the date entered is a disabled date</th>
      <td class="govuk-table__cell">ADD SOMETHING HERE</td>
      <td class="govuk-table__cell">Nodwch ddyddiad cyflawn, er enghraifft, 17/5/2024</td>
    </tr>
  </tbody>
</table>

### If you are using multiple date pickers

Make sure you use error summaries and error messages for each text field. Even if the same errors occur for multiple date pickers.

## Examples

### Filtering information with a date picker

<p><img src="/assets/images/date-picker-filter-example.svg" alt="#"></p>

Date pickers can be used as a way to filter information on a page.

Use one date picker to show information related to a single date, or use two date pickers to show information within a date range.

[View example](#)

### Asking a question with a date picker

<p><img src="/assets/images/date-picker-question-example.svg" alt="#"></p>

Date pickers can be used within the conventional one-question-per-page approach for GOV.UK services.

There are a number of ways that dates can be asked for and provided, inc. using a date input field, a date picker, or even as a list of radio buttons.

Test your product or service with users to see which work best for their needs.

[View example](#)

## Considerations

Whilst the date picker is fully navigable using a keyboard, date pickers can be slow and difficult to use for keyboard only users.

Another challenge for users, especially those with poor vision or colour blindness, is seeing the unavailable or disabled dates.

## Contributors

Thanks to **Dom Billington**, **Eddie Shannon**, **David Middleton**, and the **DPS Connect team** for contributing this component.
