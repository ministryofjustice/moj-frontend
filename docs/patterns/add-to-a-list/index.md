---
title: Add to a list
status: To be reviewed
statusDate: July 2021
excerpt: "Use this pattern when users need to add similar information many times, and check and add more if needed."
---

{% banner "Other departments have similar patterns" %}
The [HMRC 'Add to a list' pattern](https://design.tax.service.gov.uk/hmrc-design-patterns/add-to-a-list/) and the [Home Office 'Add multiple things' pattern](https://design.homeoffice.gov.uk/design-system/patterns/help-users-to/add-multiple-things) have a similar function and visual design.

This pattern is in the [GOV.UK community backlog](https://github.com/alphagov/govuk-design-system-backlog/issues/21) for review.
{% endbanner %}

<div class="govuk-form-group">
    <img alt="A three step process: Ask the user for information, view a summary of that information and ask if they want to add more of the same type of information, if they do it will take them back to the first step to ask the user for information again." src="{{ 'assets/images/add-to-a-list-05-2024.png' | rev | url }}" width="100%">
</div>

## When to use

Use this pattern when users need to add similar information many times, and check and add more if needed.

## When not to use

Do not use this pattern when users need to add different kinds of information that do not relate to each other.

If users only need to add information a couple of times, consider using the [add another component](/components/add-another/).

## How to use

<div class="govuk-form-group">
    <img alt="Example of adding things to a list which includes adding the name and date of birth of a dependant and their relationship to the client making the application, with a button to save and continue to the next page." src="{{ 'assets/images/add-to-a-list-04.png' | rev | url }}" width="100%">
</div>

## Add things to the list

<div class="govuk-form-group">
    <img alt="Example of adding things to a list which includes adding the name and date of birth of a dependant and their relationship to the client making the application, with a button to save and continue to the next page." src="{{ 'assets/images/add-to-a-list-01.png' | rev | url }}" width="40%">
</div>

Use a [GOV.UK 'question page' pattern ](https://design-system.service.gov.uk/patterns/question-pages/) to ask users for information you need within your service. This is the information that users may need to add many times.

### View a summary of what they've added to the list

<div class="govuk-form-group">
    <img alt="Example of a summary of information the was added to the list which includes the name of a dependent and the ability to change or remove them from the list. Has a question if they wanto to add more dependents, and a button to save and continue to the next page." src="{{ 'assets/images/add-to-a-list-02.png' | rev | url }}" width="40%">
</div>

Use the [GOV.UK summary list component](https://design-system.service.gov.uk/components/summary-list/) to let users view a summary of what they've added to the list.

Use [radios](https://design-system.service.gov.uk/components/radios/) to ask users if they want to add more things to the list. Use their answer to take users to the original question page to add similar information, or move to the next question.

You may want to add 'change' and 'remove' links to the summary list.

If you use a 'remove' link, you should ask the user to confirm they want to remove something from the list.

<div class="govuk-form-group">
    <img alt="Example of a warning screen asking if the user is sure they want to remove a dependent from the list with yes or no options, and a button to save and continue." src="{{ 'assets/images/add-to-a-list-03.png' | rev | url }}" width="40%">
</div>

## Research

This pattern:

- has been usability tested
- has had an external accessibility audit with Digital Accessibility Centre (DAC)
- is working in a live service (Apply for legal aid)

## Things we don't know enough about

- On the list page, should we have the page title large and the question small or the page title small and the question large.
