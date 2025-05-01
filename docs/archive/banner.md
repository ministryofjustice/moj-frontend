---
layout: layouts/archive.njk
title: Banner
status: Archived
statusDate: February 2025
type: component
redirect_from: components/banner
githuburl: https://github.com/ministryofjustice/moj-frontend/discussions/835
excerpt: "Use the banner component to display a prominent message and related actions to take."
---

{% banner "This component is archived" %}

Use the [alert](/components/alert) to display a notification to users.
{% endbanner %}

{% example "/examples/banner", 225 %}

## When to use

Use the banner component to display a prominent message and related actions to take.

Use this component when users might be performing an action repeatedly. For example, when a judge creates a batch of questions for sending to the citizen.

## When not to use

For rarely performed or important actions, you should use the [Confirmation Page](https://design-system.service.gov.uk/patterns/confirmation-pages/) pattern in the GOV.UK Design System.

## How to use

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
