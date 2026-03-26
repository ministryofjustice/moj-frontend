---
title: Overview
order: 10
tags: 'alert'
permalink: false
eleventyComputed:
  override:eleventyNavigation: false
---
{% example template="examples/default", colocated="true", height=540 %}

## Overview

The alert component presents 1 of 4 types of alerts to a user. It can stay on the page or be dismissed by the user.

As a leaner component, it’s ideal for internal services and complex user interfaces (such as dashboards and case management systems).

There are 4 variants of the alert:

1. [Information alert](#information-alert)
2. [Success alert](#success-alert)
3. [Warning alert](#warning-alert)
4. [Error alert](#error-alert)

### Information alert

{% example template="examples/information", colocated="true", height=150 %}

The information alert draws a user's attention to something important about a page or service. It has a blue border, and an information icon made up of a blue circle with a white letter 'i'.

#### When to use

Use the information alert sparingly. This makes users more likely to notice and engage with it. If a lot of information alerts are emerging in a service, it might be a sign that a journey needs redesigning.

The information alert can tell a user about:

- unfinished tasks, linking to where to complete them
- a major change to a service, until it becomes familiar
- service downtime

The information alert can be combined with other alert variants. For linear services, or to display the 'Important' heading, use the [GOV.UK notification banner component](https://design-system.service.gov.uk/components/notification-banner/).

If you want to add your message to the body copy or do not want a coloured border and icon, use the [GOV.UK inset text component](https://design-system.service.gov.uk/components/inset-text/).

#### When not to use

Do not use this component for a serious issue or to prevent something going wrong. Use the warning alert for this.

### Success alert

{% example template="examples/success", colocated="true", height=150 %}

The success alert displays a single message after a user has completed a task. It has a green border, and a success icon made up of a green tick.

This alert can be displayed at the top of the page or on the next page (if their task moves them through the service). Adding the alert to existing pages shortens the user journey. This is useful in non-linear services and services where users complete repetitive tasks.

#### When to use

The success banner can be used to show that something has:

- been uploaded or added, such as a file or record
- changed status, for example allocated to someone or moved to another stage in an application process
- been cancelled, deleted or another type of destructive (negative) action
- been changed or deleted from a table using the [multi select component](/components/multi-select/)

If you need to display more information or want a more prominent component, consider the [success variation of the GOV.UK notification banner](https://design-system.service.gov.uk/components/notification-banner/#reacting-to-something-the-user-has-done).

#### When not to use

Do not show the success alert to a user who has completed something more significant (such as a whole application) or reached the end of a service. Select the [GOV.UK confirmation page](https://design-system.service.gov.uk/patterns/confirmation-pages/) instead.

You may not need to display the alert if something else confirms success, for example the [GOV.UK task list component](https://design-system.service.gov.uk/components/task-list/) or the user progressing to another page.

### Warning alert

{% example template="examples/warning", colocated="true", height=150 %}

The warning alert tells users about something to prevent them from making a mistake. Use it sparingly to avoid alert fatigue. It has an orange border, and a warning icon made up of an orange triangle with a white exclamation mark.

#### When to use

A warning alert can be used when something:

- is missing but the user can access it another way, for example in a legacy system or on paper
- has not been updated recently but may still be of use, for example an assessment
- has become more urgent or important, for example because a deadline is approaching

If you want to add your message to the body copy or do not want a coloured border and icon, use the [GOV.UK inset text component](https://design-system.service.gov.uk/components/inset-text/) or the [GOV.UK warning text component](https://design-system.service.gov.uk/components/warning-text/).

#### When not to use

Do not use this component if the information is about something other than a warning. Select the [information alert](#information-alert) instead.

### Error alert

{% example template="examples/error", colocated="true", height=150 %}

The error alert shows the user that something has gone wrong. It pauses the user without interrupting them. It can appear before or after a user input. It has a red border, and an error icon made up of a red octagon with a white 'X'.

<div class="govuk-warning-text">
  <span class="govuk-warning-text__icon" aria-hidden="true">!</span>
  <strong class="govuk-warning-text__text">
    <span class="govuk-visually-hidden">Warning</span>
    Do not use the error alert for validation errors. Continue to use the <a href="https://design-system.service.gov.uk/components/error-message">GOV.UK error message</a> for this.
  </strong>
</div>

#### When to use

The error alert can be displayed when something:

- has changed significantly since the user’s last session, for example, a person has been released from prison or an appointment is now double-booked
- changed between the user opening the page and interacting with it, for example a case was deleted or assigned to someone else
- has to be done before this task, for example removing bookings from a property they're archiving

If the user needs to resolve the error, the alert should help them understand how.

#### When not to use

This alert draws a user’s attention to a message, without preventing them from doing other tasks on the page. Use the [interruption card component](/components/interruption-card/) if the user needs to acknowledge something before they continue on their journey.

### Things to consider

This alert pauses the user with a prominent message. This prioritisation should match the alert message and its relevance to the user.

An alert needs a title, which does not need to be displayed as a heading. The title gives each alert a unique label and helps screenreaders to identify the alert. It does not have to be read out.


