---
layout: layouts/component.njk
title: Date picker
type: component
githuburl: https://github.com/ministryofjustice/moj-frontend/discussions/703
eleventyNavigation:
  key: Date picker
  parent: Components
  excerpt: "The date picker component enables users to select a date from a calendar."
---

<span class="govuk-caption-xl">The date picker component enables users to select a date from a calendar.  </span>

{% tabs "Contents" %}

{% tab "Overview" %}

{% example "/examples/date-picker", 590 %}

## Overview

When users first open the date picker's calendar it'll show today's date. Users do not have to use this calendar view to select a date - they can also enter one directly into the text field.

### When to use

Users might want to use the calendar view:

- for a relative date or one they need to look up, for example last Thursday or next Wednesday
- to enter today's date more quickly
- for available dates only, such as for prison visits

### When not to use

Do not use the date picker:

- for a memorable date, such as a user's date of birth
- for a date that users know or can easily look up, like an appointment date on a letter
- when only a rough date is needed, for example just a month and year

Use the [GOV.UK Design System's date input component](https://design-system.service.gov.uk/components/date-input/) instead.

### Things to consider

Date pickers are fully navigable using a keyboard, but can be slow for keyboard-only and screen reader users.

### Similar or linked components

There's also the ['Ask users for dates' pattern in the GOV.UK Design System](https://design-system.service.gov.uk/patterns/dates/).

{% endtab %}

{% tab "Accessibility issues" %}

## Accessibility issues

There’s an accessibility issue with the date picker component. If you’re using it in your service you need to add these issue details to your accessibility statement.

### No focus indicator shown when navigating between dates (NVDA only)

When people use the screen reader software NVDA, no focus indicator is displayed when they navigate between dates. This only happens with NVDA software. This fails [WCAG 2.2 success criterion 2.4.7 (Focus visible)](https://www.w3.org/TR/WCAG22/#focus-visible). We’re aware of this issue and plan to implement a fix by April 2025. 

{% endtab %}

{% tab "How to use" %}

## How to use

### Hint text

The date picker hint text is set to 17/5/2024. This can be changed to a more helpful date, for example the start of a scheme or a future date. Add a full stop at the end.

### Excluding dates

You can exclude (or disable) options from the date picker, such as:
- days of the week or every weekend
- specific dates, such as bank holidays  
- past or future dates

{% example "/examples/date-picker-excluded-dates", 590 %}

You need to add server-side validation for when users enter an unavailable date directly into the text field (rather than use the calendar). This will show them an error message.

Excluded dates have the correct colour contrast ratio with the date text and calendar background. This is WCAG 2.2 compliant. However, these dates may be harder to view for users with low vision or colour blindness, so there’s also a strikethrough. Numbers with a strikethrough can be harder for people with dyscalculia to read, which may be an issue if there are lots of excluded dates.

If there are not many available dates, users will have to navigate a lot to find one. Consider showing these dates in a list with radio buttons instead.

### Error messages

Follow the [GOV.UK Design System guidance on error messages](https://design-system.service.gov.uk/components/error-message/).

{% example "/examples/date-picker-error", 590 %}

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

###  Using multiple date pickers

If you're using more than one date picker, give each text field its own error summary and message (even if the error is the same).

{% endtab %}

{% tab "Examples" %}

## Examples

### Filtering information with a date picker

<p><img src="{{ 'assets/images/date-picker-filter-example-2024.png' | rev | url }}" alt="A screenshot with the title 'Attended appointments'. In a grey box is the title Filter, underneath is the title Date and then a text input field. The calendar icon and a green 'Apply filter' button is on the right. Below this element is the text '7 appointments'. Details of these appointments are shown."></p>

### Asking a question with a date picker

<p><img src="{{ 'assets/images/date-picker-question-example-2024.png' | rev | url }}" alt="A screenshot with the title 'What date do you want to view appointments for?' Underneath is the title 'Date' and then a text input field with the calendar icon. Underneath that is a green 'Continue' button."></p>

{% endtab %}

{% endtabs %}

<hr />