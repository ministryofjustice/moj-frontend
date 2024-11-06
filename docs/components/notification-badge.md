---
layout: layouts/component.njk
title: Notification badge
type: component
githuburl: https://github.com/ministryofjustice/moj-frontend/discussions/706
eleventyNavigation:
  key: Notification badge
  parent: Components
  excerpt: "Use this component when users need to add similar information a couple of times, such as several names for a single application."
---

{% banner "HMRC Design Patterns has a similar component" %}
[Notification badge](https://design.tax.service.gov.uk/hmrc-design-patterns/notification-badge/) in HMRC Design Patterns has a similar function and visual design to this component, and includes some guidance on when to use it.

This component is in the GOV.UK Design System [community backlog](https://design-system.service.gov.uk/community/backlog/) for review.
{% endbanner %}

{% lastUpdated "notification-badge" %}

{% example "/examples/notification-badge", 125 %}

## When to use

The notification badge lets the user know that there is new information to view, like unread messages, and how many of them there are.

Only use it if the number changes when the user performs an action.
## When not to use

Do not use the notification badge when:

- the number of things is 0
- there is no action

Unless there is a strong user need, only use it as a part of the navigation.

## How to use

Display the notification badge to the right-hand side of the information it refers to.

If the number is more than 99, display ‘99+’.
## Research

Research shows that notification badges are common across online services, smartphones and apps. Usability testing showed:

- users understand what it is for
- it does not distract users from their task
