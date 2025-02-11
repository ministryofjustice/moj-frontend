---
layout: layouts/component.njk
title: Alert
type: component
githuburl: https://github.com/ministryofjustice/moj-frontend/discussions/835
eleventyNavigation:
  key: Alert
  parent: Components
  excerpt: "Use the alert component to display a prominent message and related actions to take."
---

<span class="govuk-caption-xl">The alert is a flexible component. It uses a visual design to display a notification to users.</span>

{% tabs "Contents" %}

{% tab "Overview" %}

{% example "/examples/alert" %}

## Overview

The alert component presents 1 of 4 types of alerts to a user. It can persist on the page or be dismissed by the user.  

As a leaner component, it’s ideal for dashboards, internal services and other complex user interfaces.  

There are 4 variants of the alert:

1. [Information alert](#information-alert)
2. [Warning alert](#warning-alert)
3. [Error alert](#error-alert)
4. [Success alert](#success-alert)

### Information alert

{% example "/examples/alert-information" %}

The information alert draws a user's attention to something important about a page or service. It has a blue border and an information icon.

#### When to use
Use the information alert sparingly. This makes users more likely to notice and engage with them. If a lot of information alerts are emerging in a service, it might be a sign that a journey need redesigning.

The information alert can tell a user about:

- unfinished tasks, linking to where to complete them
- a major change to a service, until it becomes familiar
- service downtime  

The information alert can be combined with other alert variants. For linear services or to display the 'Important' heading, use the <a href="https://design-system.service.gov.uk/components/notification-banner">GOV.UK notification banner component</a>.

#### When not to use

You may not want to use this component for a serious issue or to prevent something going wrong. Use the warning alert for this.

### Warning alert

{% example "/examples/alert-warning" %}

The warning alert tells users about something to prevent them from making a mistake. Use it sparingly to avoid alert fatigue. It has an orange border and an icon.  

#### When to use

A warning alert can be used when something:

- is missing but the user can access it another way, for example in a legacy system or on paper
- has not been updated recently but may still be of use, for example a risk assessment
- has become more urgent or important, for example because a deadline is approaching

If you want to add your message to the body copy or do not want a coloured border and icon, use the [GOV.UK inset text component](https://design-system.service.gov.uk/components/inset-text/) or the [GOV.UK warning text component](https://design-system.service.gov.uk/components/warning-text/).

#### When not to use

Do not use this component if the information is about something other than a warning. Select the [information alert](#information-alert) instead.

### Error alert

{% example "/examples/alert-error" %}

The error alert shows the user that something has gone wrong. It pauses the user without interrupting them. It can appear before or after a user input. It has a red border and an icon.  

<div class="govuk-warning-text">
  <span class="govuk-warning-text__icon" aria-hidden="true">!</span>
  <strong class="govuk-warning-text__text">
    <span class="govuk-visually-hidden">Warning</span>
      Do not use the error alert for validation errors. Continue to use the <a href="https://design-system.service.gov.uk/components/error-message/">GOV.UK error message</a> for this.</strong>
</div>

#### When to use

The error alert can be displayed when something:

- has changed significantly since the user’s last session, for example, a person has been released from prison or an appointment is now double booked
- changed between the user opening the page and interacting with it, for example a case was deleted or assigned to someone else
- has to be done before this task, for example removing bookings from a property they're archiving

If the user needs to resolve the error, the alert should help them understand how.

#### When not to use

This alert draws the user’s attention to the message without interrupting them. Use the [interruption card component](/components/interruption-card/) if the user must do something before moving on in their journey.

### Success alert

{% example "/examples/alert-success" %}

The success alert displays a single message after a user has completed something. It has a green border and an icon.

This alert can be displayed at the top of the page or on the next page (if their task moves them through the service). Adding the alert to existing pages shortens user journeys. This is useful in non-linear services and services where users complete repetitive tasks.

#### When to use

The success banner can be used to show that something has:

- been uploaded or added, such as a file or record
- changed status, for example allocated to someone or moved to another stage in an application process
- been cancelled, deleted or another type of destructive action
- been changed or deleted from a table using the [multi-select component](/components/multi-select/)

If you need to display more information or want a more prominent component, consider the [success variation of the GOV.UK notification banner](https://design-system.service.gov.uk/components/notification-banner/#reacting-to-something-the-user-has-done).

#### When not to use

Do not show the success alert to a user who has completed something more significant (such as a whole application) or reached the end of a service. Select the [GOV.UK confirmation page](https://design-system.service.gov.uk/patterns/confirmation-pages/) instead.

You may not need to display the alert if something else confirms success, for example the [GOV.UK task list component](https://design-system.service.gov.uk/components/task-list/) or the user progressing to another page.

### Things to consider

This alert pauses the user with a prominent message. This prioritisation should match the alert's message and its relevance to the user.

An alert needs a title, which does not need to be displayed as a heading. The title gives each alert a unique label and helps screenreaders to identify the alert. It does not have to be read out.

{% endtab %}

{% tab "How to use" %}

## How to use

The alert works best when it contains a single, succinct message. Do not use it to display large amounts of content. This reduces the prominence of the component and pushes other content down the page too much. If you cannot communicate your message in under 3 sentences, select a different component.

### What to add to it

The alert contains an icon and is surrounded by a border. It needs to contain body copy, with a full stop at the end of each sentence.

The alert needs a title, which does not need to be shown on the page. It gives each alert a unique and accessible label and can be read out to screenreader users.

You can add 1 heading (but no more) to the body copy. The heading level should follow its position on the page. For example, an alert heading would be an H2 if placed under a main page heading (H1).

You can also add bullet points and links, if needed.

The alert content needs to make sense on its own. This ensure that the message does not rely on the colour and icon too much, as they're not accessible to everyone.

### Dismissing the alert

{% example "/examples/alert-dismissible" %}

The alert can be made to be persistent or dismissable (by the user selecting 'dismiss'). Dismissing it is particularly helpful for the success alert, where there's nothing more for the user to do. It can help users to manage tasks and keep their interfaces clear.

<div class="govuk-warning-text">
  <span class="govuk-warning-text__icon" aria-hidden="true">!</span>
  <strong class="govuk-warning-text__text">
    <span class="govuk-visually-hidden">Warning</span>
    Do not make the alert auto-dismiss, for example, to disappear after a few seconds or when the user interacts with the page. This is not accessible.
  </strong>
</div>

### Height and width

The alert has no minimum or maximum height – it resizes to the contents. It should not be used to display a lot of content, though.

The alert will take the width of the container, and will automatically adjust for readability.

### How often to use it

When considering an alert in a specific case, think about the maximum number of alerts or banners a user might view in a journey or on a page.  

If a lot of information and warning alerts are emerging in a service (for example, on every page) it might be a sign of a wider problem. This could be fixed through service design.

#### Stacking alerts

It's OK to present more than 1 alert on a page – they'll stack. When developing your alert strategy, consider:

- separating alerts that do not involve anything further for a user do – these can be easily dismissed
- combining instances of the warning, error and information states to reduce the number of alerts
- that the 'alert role' that's read out to screenreader users should only be applied to one of the alerts  

### Where to add it

An alert can be displayed globally or in context, depending on the type of message.

A global alert is shown on all pages (or any page) and is about the service as a whole, for example service downtime. It can also be displayed on a home page to draw the user’s attention to new issues. A contextual alert is shown in a particular section, and is about that section.

Place alerts about a whole service or page at the top of the page above the main heading and below the back link (if there is one). An alert can also be positioned under a relevant heading, but should not be added to body copy.

### Alert colours and icons

The link text colour matches the variant. Each alert has an icon, which must not be removed. Removing the icon makes each alert too reliant on colour, which cannot be accessed by everyone. Do not change the colours.

#### Alert usage on coloured backgrounds

The alert is accessible on a `govuk-colour("white")` or `govuk-colour("light-grey")` background.

An alert should not be placed on a coloured background because:

- the colour contrast between the border and page may not be accessible
- it may distract from the border colour and change the emphasis of the message  

{% endtab %}

{% tab "Examples" %}

## Examples

### Alerts in a case management system

An error and success alert under an H1 shows a user that one of their tasks failed, and another was successful. It can be shown on the dashboard rather than another page.

<p><img src="{{ 'assets/images/alert-example-case-management.png' | rev | url }}" alt="A Ministry of Justice website with the heading 'Hearing outcomes'. An error alert with a heading which reads 'A case could not be assigned to you' and body content which reads 'Zayn Bennett’s case could not be assigned to you because it has already been assigned to someone else.' is below the heading. A success alert which reads 'Case assigned to Jane Doe' is below the error alert. Below the alert are tabs with the titles 'Cases to review (3)', 'In progress (137)' and 'Reviewed cases'. The 'cases to review' tab is active and contains a table where each row gives details of a case. Rows can be selected with a checkbox and there is a button menu with the label 'Actions' in the upper right corner of the table."></p>

### Error alert under a subheading

Alerts positioned inline with other content help people to understand what the message relates to. In this example the heading level of the alert component should be changed to H3 as it appears within an H2 heading.

<p><img src="{{ 'assets/images/alert-example-contextual.png' | rev | url }}" alt="A Ministry of Justice website with the heading 'Work items'. The subheading 'Cost type totals' has a table of costs within it and a total. A second subheading reads 'All work items' and has an alert component underneath it with the heading: 'Some work items didn't import correctly'. The body content of the alert says 'You need to manually update work item 1 before submitting this claim.'"></p>

{% endtab %}

{% endtabs %}

<hr />
