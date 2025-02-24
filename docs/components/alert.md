---
layout: layouts/component.njk
title: Alert
status: Official
statusDate: February 2025
type: component
githuburl: https://github.com/ministryofjustice/moj-frontend/discussions/1163
eleventyNavigation:
  key: Alert
  parent: Components
  excerpt: "Use the alert component to display a prominent message and related actions to take."
---

<span class="govuk-caption-xl">The alert component uses visual design to display a notification to users. It has a range of use cases.</span>

{% tabs "Contents" %}

{% tab "Overview" %}

{% example "/examples/alert" %}

## Overview

The alert component presents 1 of 4 types of alerts to a user. It can stay on the page or be dismissed by the user.  

As a leaner component, it’s ideal for internal services and complex user interfaces (such as dashboards and case management systems).  

There are 4 variants of the alert:

1. [Information alert](#information-alert)
2. [Warning alert](#warning-alert)
3. [Error alert](#error-alert)
4. [Success alert](#success-alert)

### Information alert

{% example "/examples/alert-information" %}

The information alert draws a user's attention to something important about a page or service. It has a blue border, and an information icon made up of a blue circle with a white letter 'i'.

#### When to use
Use the information alert sparingly. This makes users more likely to notice and engage with it. If a lot of information alerts are emerging in a service, it might be a sign that a journey needs redesigning.

The information alert can tell a user about:

- unfinished tasks, linking to where to complete them
- a major change to a service, until it becomes familiar
- service downtime  

The information alert can be combined with other alert variants. For linear services, or to display the 'Important' heading, use the <a href="https://design-system.service.gov.uk/components/notification-banner">GOV.UK notification banner component</a>.

#### When not to use

Do not want use this component for a serious issue or to prevent something going wrong. Use the warning alert for this.

### Warning alert

{% example "/examples/alert-warning" %}

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

{% example "/examples/alert-error" %}

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

### Success alert

{% example "/examples/alert-success" %}

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

### Things to consider

This alert pauses the user with a prominent message. This prioritisation should match the alert message and its relevance to the user.

An alert needs a title, which does not need to be displayed as a heading. The title gives each alert a unique label and helps screenreaders to identify the alert. It does not have to be read out.

{% endtab %}

{% tab "How to use" %}

## How to use

The alert works best when it contains a single, succinct message.

Do not use it to display large amounts of content. This reduces the prominence of the component and pushes other content down the page. If you cannot communicate your message in under 3 sentences, use a different component.

### What to add to it

The alert contains an icon and is surrounded by a border. It needs to contain body copy, with a full stop at the end of each sentence.

The alert needs a title, which does not need to be shown on the page. The title gives each alert a unique and accessible label, which can be read out to screenreader users.

You can add one heading (but no more) to the body copy. The heading level should follow its position on the page. For example, an alert heading would be an H2 if placed under a main page heading.

You can also add bullet points and links, if needed.

The alert content needs to make sense on its own. This ensures that the message does not rely on the colour and icon, as they're not accessible to everyone.

### Dismissing the alert

{% example "/examples/alert-dismissible" %}

The alert can stay on the page (be persistent) or be dismissed by the user. Dismissing it helps users to manage tasks and keep their interfaces clear. It's particularly helpful for the success alert, where there's nothing more for the user to do.

<div class="govuk-warning-text">
  <span class="govuk-warning-text__icon" aria-hidden="true">!</span>
  <strong class="govuk-warning-text__text">
    <span class="govuk-visually-hidden">Warning</span>
    Do not set up the alert to auto-dismiss, for example to disappear after a few seconds or when the user interacts with the page. This is not accessible.
  </strong>
</div>

When an alert is dismissed, the focus will go to one of the following:

- the heading above, if there are no more alerts on the page
- the previous or next alert, if there are any more on the page
- the `main` element, if there's no heading above the alert

If you want the focus to go somewhere else, use the `focusOnDismissSelector` Nunjucks macro option. If this does not work, the focus will go to 1 of the 3 options.

### Height and width

The alert has no minimum or maximum height – it resizes to the contents. It should not be used to display a lot of content, though.

The alert will take the width of the container, and will automatically adjust for readability.

### How often to use it

When considering an alert in a specific case, think about the maximum number of alerts or banners a user might view on a page and in a journey.

If a lot of information and warning alerts are emerging in a service (for example, on every page) it might be a sign of a wider problem. This could be fixed through service design.

#### Stacking alerts

It's OK to present more than 1 alert on a page – they'll stack. When developing your alert strategy, consider:

- separating alerts that do not involve anything further for a user do – these can be easily dismissed
- combining instances of the warning, error and information states to reduce the number of alerts
- that the 'alert' read out to screenreader users should only be applied to one alert  

### Where to add it

An alert can be displayed globally or in context, depending on the type of message.

A global alert is shown on all pages (or any page) and is about the service as a whole, for example service downtime. It can also be displayed on a homepage to draw the user’s attention to new and unknown issues. A contextual alert is shown in (and is about) a particular section.

Place alerts about a whole service or page at the top of the page above the main heading and below the back link (if there is one). An alert can also be positioned under a relevant heading, but should not be added to body copy.

### Alert colours and icons

The link text colour is the same as the rest of the variant. Each alert has an icon, which must not be removed. Removing the icon makes an alert too reliant on colour, which cannot be accessed by everyone. Do not change the colours.

#### Alert usage on coloured backgrounds

The alert is accessible on a `govuk-colour("white")` or `govuk-colour("light-grey")` background.

An alert should not be placed on a coloured background because:

- the colour contrast between the border and page may not be accessible
- the background may distract from the border colour and change the emphasis of the message  

{% endtab %}

{% tab "Examples" %}

## Examples

### Alerts in a case management system

An error and success alert under an H1 shows a user that one of their tasks failed, and another was successful. It can be shown on the dashboard rather than another page.

<p><img src="{{ 'assets/images/alert-example-case-management.png' | rev | url }}" alt="An MoJ webpage showing a success alert positioned below the heading level 1."></p>

### Error alert under a subheading

Alerts positioned inline with other content help people to understand what the message relates to. In this example the heading level of the alert component should be changed to H3 as it appears within an H2 heading.

<p><img src="{{ 'assets/images/alert-example-contextual.png' | rev | url }}" alt="A warning alert with heading level 3 is shown beneath a heading level 2 on an MoJ webpage to highlight the importance of maintaining heading structure.'"></p>

{% endtab %}

{% endtabs %}

<hr />
