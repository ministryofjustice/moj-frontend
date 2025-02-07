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

<span class="govuk-caption-xl">The alert is a flexible component that uses a visual design to display a notification to users.</span>

{% tabs "Contents" %}

{% tab "Overview" %}

{% example "/examples/alert" %}

## Overview

The alert component presents one of 4 types of alerts to a user. It persists on the page but can be altered to be dismissable.

As a leaner component, it's ideal for dashboards, internal services and other complex user interfaces.

### When to use

There are 4 variations of the alert: 

1. [Information alert](#information-alert)
2. [Warning alert](#warning-alert)
3. [Error alert](#error-alert)
4. [Success alert](#success-alert)


#### Information alert

{% example "/examples/alert-information" %}

The information alert draws a user's attention to something important about a page or service. It has a blue border and an information icon.

<div class="govuk-inset-text">
For an alert about something unrelated to the page, use the <a href="https://design-system.service.gov.uk/components/notification-banner/">GOV.UK Design System notification banner component</a>.
</div>

The information alert can tell a user about:
- unfinished tasks, directing people to where to do them
- significant changes to a service (until people familiarise themselves with the change becomes)
- service downtime (shown globally)

Use this alert sparingly. People often miss banners and alerts, and using them too often is likely to make this worse. If a lot of information alerts are emerging in a service, it might be a sign that a journey needs redesigning.

An information alert is low to medium priority. If the issue is more severe, or you want to prevent something going wrong, use the warning alert. 

#### Warning alert

{% example "/examples/alert-warning" %}

The warning alert tells users about something that will prevent them from making a mistake. It has an orange border and a warning icon.

A warning alert can be used when:
- data integration has not worked properly and information is missing
- a record or assessment has not been updated recently 
- something has to be done before they interacting with the page - for example, calling a solicitor or removing duplicate records in another system
- something significant has changed since their last session - for example, someone has been released from prison or an appointment has a clash
- something that was optional now needs to be done - for example, because a deadline is approaching

If the warning alert feels too severe for these contexts, use the information alert.  

If you want to add your message to the body copy or do not want a coloured border and icon, use the [GOV.UK Design System inset text component](https://design-system.service.gov.uk/components/inset-text/) or the [GOV.UK Design System warning text component](https://design-system.service.gov.uk/components/warning-text/).

#### Error alert

{% example "/examples/alert-error" %}

The error alert shows the user that something has gone wrong. It can appear before or after a user input. It has a red border and a warning icon.

<div class="govuk-inset-text">
The error alert must not be used for validation errors. Continue to use the <a href="https://design-system.service.gov.uk/components/error-message/">GOV.UK Design System error message</a> for this.
</div>

The error alert can be displayed when:
- something went wrong after a user input, such as a system error (not caused by the user) 
- a user cannot complete their task because something changed since they opened the page, for example a case was deleted or assigned to someone else
- the user needs to do something else to unblock the task, for example remove bookings from a property they're archiving
- the user's task is allowed but has triggered a related issue (for example, it's taken something to capacity) 
- there's a conflict between 2 or more parts of a service, meaning that an error message cannot be shown next to the source

The alert should help the user understand what they need to do to resolve the error. 

This alert draws the user's attention to the message without interrupting them. If they cannot continue with what they're doing, use the IC. 

#### Success alert

{% example "/examples/alert-success" %}

The success alert is shown after a user has completed something. It has a green border and a tick icon.

It can be displayed at the top of the page they were on or the next page (if their task moves them through the service). This alert helps shorten user journeys because it removes the need for a page dedicated to the task happening.

[inset] If you'd like a banner without a user needs more information, for example to complete a task, consider the gov success banner. This is more prominent, and also helps if you do not need the icon.

The success banner can be used to show information that has:
- been uploaded or added, such as a file or record
- changed status, for example it has been allocated to a person or moved to another stage in its application process
- been cancelled, deleted or another type of destructive action
- been changed or deleted from a table using the [MoJ DS multi-select component](https://design-patterns.service.justice.gov.uk/components/multi-select/)

The success alert shows straightforward completion. If the user's task has triggered an issue somewhere or needs anything else to be done next,  

You may not need to display the alert if something else confirms success, for example the [GOV.UK Design System task list component](https://design-system.service.gov.uk/components/task-list/) or the user progressing to another page.

The success alert is a lean component for a single message. Displaying it on the page the user is on shortens their journey. This is useful in non-linear services and services where users complete repetitive tasks.

If the user has completed something more significant (such as a whole application) or reached the end of a service, use the [GOV.UK Design System confirmation page](https://design-system.service.gov.uk/patterns/confirmation-pages/).

### When not to use

The variations have specific guidance on when not to use. 

Do not use any version of the alert to display large amounts of content. This reduces the prominence of the component and pushes other content down the page too much. 

### Things to consider

This alert interrupts the user and is placed in a prominent position on a page. This should match the message of the alert and its relevance to the user. 

Accessibility: They're not aria live. An 'alert' role can be read out. You may not want to add this if there are other more significant things xx. 

{% endtab %}

{% tab "How to use" %}

## How to use

The alert works best when it contains a single, succinct message.

### What to add to it

The alert contains an icon and is surrounded by a border. It may contain:
- 1 heading 
- bullet points (if absolutely necessary)
- links (in addition to the dismiss link)

Add a full stop to the end of each sentence.

### Alert content

The alert content needs to make sense in isolation. This ensures that the colour and icon are not relied on. They are not accessible to everyone. 

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

The variations have different guidance. The information and warning alerts work best when used sparingly. This keeps them significant. 

When considering a alert in a specific case, think about the maximum number of alerts or banners a user might view on a single page, and on a journey. This will particularly help users making repetitive journeys. 

If a lot of information and warning alerts are emerging in a service (for example, on every page) it might be a sign of another problem. This could be fixed through service design.

#### Stacking alerts

A user may be presented with multiple alerts on a single page. Useful stuff when considering your alert strategy:
- separating alerts with a simple success message from those with things for users makes it easier to dismiss
- combining warning states  
- using the IC before a journey if there are too many alerts


### Where to add it

A alert can be displayed globally or in context, depending on the type of message.

A global alert is shown on all pages (or any page) and is about the service as a whole, for example a downtime message. It can also be displayed on a home page to draw the user's attention to new issues.  

A contextual alert is shown in a particular section, and is about a task or part of that section.

Display the alert at the top of the page above the main heading and below the back link (if there is one). Place it under relevant heading. 

### Alert colours and icons

Links are coloured to match each variant. Do not change the colours.

Each alert has an icon. Do not remove the icon, as it makes each alert too reliant on colour, which cannot be accessed by everyone. 

#### Alerts on coloured background

The alert will be accessible on `govuk-colour("white")` or `govuk-colour("light-grey")` backgrounds. 

Do not place them on a coloured background. This is because:
- the colour contrast between the border colour and the background may not be  accessible
- sighted users may not be able to identify the border colour, for example a - success alert on a blue background might look like an information alert

All variants will be accessible on backgrounds that are `govuk-colour("white")` or `govuk-colour("light-grey")`


{% endtab %}

{% tab "Examples" %}

## Examples

### Within a case management system

<p><img src="{{ 'assets/images/alert-example-case-management.png' | rev | url }}" alt="A Ministry of Justice website with the heading 'Hearing outcomes'. A success alert which reads 'Case assigned to Jane Doe' is below the heading. Below the alert are tabs with the titles 'Cases to review (3)', 'In progress (137)' and 'Reviewed cases'. The 'cases to review' tab is active and contains a table where each row gives details of a case. Rows can be selected with a checkbox and there is a button menu with the label 'Actions' in the upper right corner of the table."></p>

### Error alert underneath a subheading

Alerts positioned inline with other content help people to understand what the message relates to. In this example the heading level of the alert component should be changed to H3 as it appears within an H2 heading.

<p><img src="{{ 'assets/images/alert-example-contextual.png' | rev | url }}" alt="A Ministry of Justice website with the heading 'Work items'. The subheading 'Cost type totals' has a table of costs within it and a total. A second subheading reads 'All work items' and has an alert component underneath it with the heading: 'Some work items didn't import correctly'. The body content of the alert says 'You need to manually update work item 1 before submitting this claim.'"></p>

{% endtab %}

{% endtabs %}

<hr />
