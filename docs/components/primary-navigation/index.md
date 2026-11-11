---
title: Primary navigation
status: Archived
statusDate: November 2026
---

{% banner "This component is archived" %}

This component was archived because the [GOV.UK service navigation component](https://design-system.service.gov.uk/components/service-navigation/) includes the service name and  helps users navigate around a service.

If you're using the primary navigation component you need to switch all instances of it to the GOV.UK service navigation component. This will give you accessibility and other improvements. 

{% example template="examples/default", colocated=true, height=150 %}

## When to use

Use the primary navigation component to let users navigate and search your service.

## How to use

You must use this component with the [header component](/components/moj-header/).

### Links

You must only include links to top level sections within your service.

Do not put calls to action in the primary navigation. For example, ‘Create case’ should be an action from within the ‘cases’ section and not a link inside the primary navigation.

### New or unread items

You can use the [notification badge component](/components/notification-badge/) to show that there are new or unread items in the sections.

### Inline search

If your service can search anything, use an inline search form.

{% example template="examples/inline-search", colocated=true, height=180 %}

### Toggle search

If your service can only search for certain things, use a toggle search form.

You must tell users what they are searching for in the form hint text, and how they can search using the `data-toggle-button.text` attribute.

{% example template="examples/toggle-search", colocated=true, height=250 %}
