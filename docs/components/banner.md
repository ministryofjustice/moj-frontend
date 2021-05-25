---
layout: layouts/component.njk
title: Banner
---

{% banner "The GOV.UK Design System has a similar component" %}
The [Notification banner component](https://design-system.service.gov.uk/components/notification-banner/) in the GOV.UK Design System has a similar function and visual design to this component.

You should consider using the GOV.UK version if it fits your needs.
{% endbanner %}

Use the banner component to display a prominent message and related actions to take.

{% example "/examples/banner", 225 %}

## When to use this component

Use this component when users might be performing an action repeatedly. For example, when a judge creates a batch of questions for sending to the citizen.

## When not to use this component

For rarely performed or important actions, you should use the [Confirmation Page](https://design-system.service.gov.uk/patterns/confirmation-pages/) pattern.

## How it works

There are 2 ways to use the banner component. You can use HTML or, if you are using [Nunjucks](https://mozilla.github.io/nunjucks/) or the [GOV.UK Prototype Kit](https://govuk-prototype-kit.herokuapp.com/), you can use the Nunjucks macro.

The banner should be displayed at the top of the page above the main heading and below the back link if there is one.

It can be configured with and without icons and in different colours for success, warning and information message types.

### Success

This is the default style and should be used when the user performs an action successfully.

{% example "/examples/banner-success", 175 %}

### Warning

Use this variant when you want to warn the user that something went wrong.

{% example "/examples/banner-warning", 175 %}

### Information

Use this variant when you want to tell users some information.

{% example "/examples/banner-information", 175 %}

## Research on this component

This component is marked as experimental because it needs more research.

If you have used the banner component, get in touch to share your research findings.

## Contribute to this component

You can contribute to this component via the [design system backlog](https://github.com/ministryofjustice/moj-design-system-backlog/issues/36)
