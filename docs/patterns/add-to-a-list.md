---
layout: layouts/patterns.njk
title: Add to a list
---

{% banner "Other departments have a similar patterns" %}
[Add to a list](https://design.tax.service.gov.uk/hmrc-design-patterns/add-to-a-list/) in HMRC Design Patterns and [add multiple things](https://design.homeoffice.gov.uk/patterns/add-multiple-things) in the Home Office Design System have a similar function and visual design to this pattern.

This pattern is in the GOV.UK Design System [community backlog](https://github.com/alphagov/govuk-design-system-backlog/issues/21) for review.
{% endbanner %}

<div class="govuk-form-group">
    <img alt="A three step process: Ask the user for information, view a summary of that information and ask if they want to add more of the same type of information, if they do it will take them back to the first step to ask the user for information again." src="../../assets/images/add-to-a-list-05.png" width="100%">
</div>

## When to use

Use this pattern when users need to add similar information many times, and check and add more if needed.

## When not to use

Do not use this pattern when users need to add different kinds of information that do not relate to each other.

If users only need to add information a couple of times, consider using [add another](../../components/add-another). 

## How to use

<div class="govuk-form-group">
    <img alt="Example of adding things to a list which includes adding the name and date of birth of a dependant and their relationship to the client making the application, with a button to save and continue to the next page." src="../../assets/images/add-to-a-list-04.png" width="100%">
</div>

### Add things to the list

<div class="govuk-form-group">
    <img alt="Example of adding things to a list which includes adding the name and date of birth of a dependant and their relationship to the client making the application, with a button to save and continue to the next page." src="../../assets/images/add-to-a-list-01.png" width="40%">
</div>

Use a [question page](https://design-patterns.service.justice.gov.uk/patterns/question-pages/) to ask users for information you need within your service. This is the information that users may need to add many times.

Use components that best suit the information you're asking for, such as [text inputs](https://design-system.service.gov.uk/components/text-input/) or [radios](https://design-system.service.gov.uk/components/radios/).

### View a summary of what they have added to the list

<div class="govuk-form-group">
    <img alt="Example of a summary of information the was added to the list which includes the name of a dependent and the ability to change or remove them from the list. Has a question if they wanto to add more dependents, and a button to save and continue to the next page." src="../../assets/images/add-to-a-list-02.png" width="40%">
</div>

Use [summary list](https://design-system.service.gov.uk/components/summary-list/) to let users view a summary of what they have added to the list. 

Use [radios](https://design-system.service.gov.uk/components/radios/) to ask users if they want to add more things to the list. Use their answer to take users to the original question page to add similar information, or move to the next question.

You may want to add these links to the summary list:

- 'Change' link to change things on the list 
- 'Remove' link to remove things from the list

If you use a 'Remove' link, you should ask the user to confirm they want to remove something from the list.

<div class="govuk-form-group">
    <img alt="Example of a warning screen asking if the user is sure they want to remove a dependent from the list with yes or no options, and a button to save and continue." src="../../assets/images/add-to-a-list-03.png" width="40%">
</div>

## Research

This pattern:

- has been usability tested
- has had an external accessibility audit with Digital Accessibility Centre (DAC)
- is working in a live service (Apply for legal aid)

## Contribute 

[Join the discussion](https://github.com/ministryofjustice/moj-frontend/discussions/203) on GitHub.

### Things we don't know enough about 

- On the list page, should we have the page title large and the question small or the page title small and the question large. 