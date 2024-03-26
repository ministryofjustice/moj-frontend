---
layout: layouts/component.njk
title: Password reveal
---

{% banner "The GOV.UK Design System has a similar component" %}
The [Password input component](https://design-system.service.gov.uk/components/password-input/) in the GOV.UK Design System has a similar function and visual design to this component.

You should consider using the GOV.UK version if it fits your needs.
{% endbanner %}

{% lastUpdated "password-reveal" %}

{% example "/examples/password-reveal", 175 %}

## When to use

Use the password reveal component to let users check their password safely.

This component automatically sets the `spellcheck` attribute to `false` to prevent users' passwords being stored in their browsers.
