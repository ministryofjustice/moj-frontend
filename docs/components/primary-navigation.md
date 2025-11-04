---
title: Primary navigation
status: To be reviewed
statusDate: June 2021
githuburl: https://github.com/ministryofjustice/moj-frontend/discussions/710
excerpt: "Use the primary navigation component to let users navigate and search your service."
---

{% example template="/examples/primary-navigation", height=150 %}

## When to use

Use the primary navigation component to let users navigate and search your service.

## How to use

You must use this component with the [header](/components/moj-header/) component.

### Links

You must only include links to top level sections within your service.

Do not put calls to action in the primary navigation. For example, ‘Create case’ should be an action from within the ‘cases’ section and not a link inside the primary navigation.

### New or unread items

You can use the [notification badge component](/components/notification-badge/) to show that there are new or unread items in the sections.

### Inline search

If your service can search anything, use an inline search form.

{% example template="/examples/primary-navigation-inline-search", height=180 %}

### Toggle search

If your service can only search for certain things, use a toggle search form.

You must tell users what they are searching for in the form hint text, and how they can search using the `data-toggle-button.text` attribute.

{% example template="/examples/primary-navigation-toggle-search", height=250 %}
