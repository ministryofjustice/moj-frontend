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

<span class="govuk-caption-xl">The alert is a flexible set of components. It uses a visual design to display a notification to users.</span>

{% tabs "Contents" %}

{% tab "Overview" %}

{% example "/examples/alert" %}

## Overview

The alert component presents one of 4 types of alerts to a user. It persists on the page but can be altered so that users can close (dismiss) it.

As a leaner component, it’s ideal for dashboards, internal services and other complex user interfaces.  

There are 4 variations of the alert:

1. [Information alert](#information-alert)
2. [Warning alert](#warning-alert)
3. [Error alert](#error-alert)
4. [Success alert](#success-alert)

### Information alert

{% example "/examples/alert-information" %}

The information alert draws a user's attention to something important about a page or service. It has a blue border and an information icon.

#### When to use
Use the information alert sparingly. People often miss banners and alerts, and using them too often is likely to make this worse. If a lot of information alerts are emerging in a service, it might be a sign that journeys need redesigning.

The information alert can tell a user about:

- unfinished tasks, directing people to where to do them
- significant changes to a service, until the change become familiar
- service downtime  

#### When not to use

<div class="govuk-inset-text">
The information alert can be combined with other alerts on a page or in a service. Use the [GOV.UK Design System notification banner component](https://design-system.service.gov.uk/components/notification-banner/) for linear services or if you do not intend to use the warning and alert banners.</div>

The information alert can tell a user about:
- unfinished tasks, directing people to where to do them
- significant changes to a service (until people familiarise themselves with the change becomes)
- service downtime (shown globally)

Use this alert sparingly. People often miss banners and alerts, and using them too often is likely to make this worse. If a lot of information alerts are emerging in a service, it might be a sign that a journey needs redesigning.

An information alert is low to medium priority. If the issue is more severe, or you want to prevent something going wrong, use the warning alert.

### Warning alert

{% example "/examples/alert-warning" %}

The warning alert tells users about something to prevent them from making a mistake. It tells the user that they need to be careful about something. Use it sparingly to help avoid alert fatigue.

It has an orange border and an icon.  

#### When to use

A warning alert can be used when, for example:

- information is missing, for example because data integration has not worked properly (but the user can access the information another way)
- a record has not been updated recently, but may still be of use
- something has become more urgent or important, for example because a deadline is approaching
- a user should not be prevented from doing their task but need to know that it affects something else, for example they’re booking the last wheelchair accessible room and they might want to use it for someone else

#### When not to use

If the warning alert feels too severe for the context, use the information alert.  

If you want to add your message to the body copy or do not want a coloured border and icon, use the [GOV.UK Design System inset text component](https://design-system.service.gov.uk/components/inset-text/) or the [GOV.UK Design System warning text component](https://design-system.service.gov.uk/components/warning-text/).

### Error alert

{% example "/examples/alert-error" %}

The error alert shows the user that something has gone wrong. It pauses the user without interrupting them. It can appear before or after a user input. It has a red border and an icon.  

#### When to use

The error alert can be displayed when, for example:

- something significant has changed since the user’s last session - for example, a person has been released from prison or an appointment is now double booked
- a user cannot complete their task because something has changed since they opened the page, for example a case was deleted or assigned to someone else
- the user needs to do something before this task, for example remove bookings from a property they’re archiving

The alert should help the user understand what they need to do to resolve the error.

#### When not to use

%  Do not use the error alert for validation errors. Continue to use the [GOV.UK Design System error message](https://design-system.service.gov.uk/components/error-message/) for this. %

This alert draws the user’s attention to the message without interrupting them. Use the [MoJ Design System interruption card component](https://design-patterns.service.justice.gov.uk/components/interruption-card/) to pause a user’s journey.

### Success alert

{% example "/examples/alert-success" %}

The success alert displays a single message after a user has completed something. It has a green border and an icon.

This alert can be displayed at the top of the page they were on or on the next page (if their task moves them through the service). Adding the alert to existing pages shortens user journeys. This is useful in non-linear services and services where users complete repetitive tasks.

#### When to use

The success banner can be used to show information that has:

- been uploaded or added, such as a file or record
- changed status, for example it has been allocated to a person or moved to another stage or status in an application process
- been cancelled, deleted or another type of destructive action
- been changed or deleted from a table using the [MoJ Design System multi-select component](https://design-patterns.service.justice.gov.uk/components/multi-select/)

#### When not to use

You may not need to display the alert if something else confirms success, for example the [GOV.UK Design System task list component](https://design-system.service.gov.uk/components/task-list/) or the user progressing to another page.

[inset] If you need to display more information or want a more prominent component, consider the [GOV.UK Design System success banner component](https://design-system.service.gov.uk/components/notification-banner/).

If the user has completed something more significant (such as a whole application) or reached the end of a service, use the [GOV.UK Design System confirmation page](https://design-system.service.gov.uk/patterns/confirmation-pages/).

### Things to consider

This alert interrupts the user and is placed in a prominent position on a page. This prioritisation should match the message of the alert and its relevance to the user.

{% endtab %}

{% tab "How to use" %}

## How to use

The alert works best when it contains a single, succinct message. Do not use any variation of the alert to display large amounts of content. This reduces the prominence of the component and pushes other content down the page too much.

### What to add to it

The alert contains an icon and is surrounded by a border. It may contain:

- 1 heading (but no more)
- bullet points (if absolutely necessary)
- links (in addition to the dismiss link)

Add a full stop to the end of each sentence. The heading hierarchy can be an H2 of H3 depending on the rest of the page.  

### Alert content

The alert content needs to make sense in isolation, to make sure that the colour and icon are not relied upon too much. They are not accessible to everyone.

If you cannot communicate your message in under 3 sentences, select a different component.

### Dismissing the alert

{% example "/examples/alert-dismissible" %}

The alert persists on the page by default.

It can be configured to enable the user to hide it by using a 'dismiss' link. This is particularly helpful for the success alert, where there's nothing more for the user to do. This can help users to manage tasks and keep their interfaces clear

<div class="govuk-warning-text">
  <span class="govuk-warning-text__icon" aria-hidden="true">!</span>
  <strong class="govuk-warning-text__text">
    <span class="govuk-visually-hidden">Warning</span>
    Do not implement the alert to auto-dismiss, for example, to disappear after a few seconds or when the user interacts with the page. This is not accessible.
  </strong>
</div>

### Height and width

The alert has no minimum or maximum height - it resizes to the contents. It should not be used to display a lot of content, though.

The alert width is not set, but full page width is recommended. It will automatically adjust for readability.

### How often to use it

When considering an alert in a specific case, think about the maximum number of alerts or banners a user might view in a journey and on a page.  

If a lot of information and warning alerts are emerging in a service (for example, on every page) it might be a sign of another problem. This could be fixed through service design.

#### Stacking alerts

It's OK to present more than 1 alert on a single page. The alerts will stack. Here are some useful things to consider for showing multiple alerts:

- separating alerts which have no further tasks for a user, so that they can be easily dismissed
- combining warning states to reduce the number of banners
- using the [MoJ Design System interruption card component](https://design-patterns.service.justice.gov.uk/components/interruption-card/) for a journey

### Where to add it

An alert can be displayed globally or in context, depending on the type of message.

A global alert is shown on all pages (or any page) and is about the service as a whole, for example a downtime message. It can also be displayed on a home page to draw the user’s attention to new issues.  

A contextual alert is shown in a particular section, and is about a task or part of that section.

Display the alert at the top of the page above the main heading and below the back link (if there is one). Place it under the relevant heading.

### Alert colours and icons

The link text colour matches each variant. Do not change the colours.

Each alert has an icon. Do not remove the icon, as it makes each alert too reliant on colour, which cannot be accessed by everyone.

#### Alerts on coloured background

The alert will be accessible on govuk-colour("white") or govuk-colour("light-grey") backgrounds.

They should not be placed on a coloured background because:

- the colour contrast between the border and page may not be  accessible
- sighted users may not be able to identify the border colour, for example a success alert on a blue background might look like an information alert

All variants will be accessible on backgrounds that are govuk-colour("white") or govuk-colour("light-grey"){% endtab %}

{% tab "Examples" %}

## Examples

### Within a case management system

<p><img src="{{ 'assets/images/alert-example-case-management.png' | rev | url }}" alt="A Ministry of Justice website with the heading 'Hearing outcomes'. A success alert which reads 'Case assigned to Jane Doe' is below the heading. Below the alert are tabs with the titles 'Cases to review (3)', 'In progress (137)' and 'Reviewed cases'. The 'cases to review' tab is active and contains a table where each row gives details of a case. Rows can be selected with a checkbox and there is a button menu with the label 'Actions' in the upper right corner of the table."></p>

### Error alert under a subheading

Alerts positioned inline with other content help people to understand what the message relates to. In this example the heading level of the alert component should be changed to H3 as it appears within an H2 heading.

<p><img src="{{ 'assets/images/alert-example-contextual.png' | rev | url }}" alt="A Ministry of Justice website with the heading 'Work items'. The subheading 'Cost type totals' has a table of costs within it and a total. A second subheading reads 'All work items' and has an alert component underneath it with the heading: 'Some work items didn't import correctly'. The body content of the alert says 'You need to manually update work item 1 before submitting this claim.'"></p>

{% endtab %}

{% endtabs %}

<hr />
