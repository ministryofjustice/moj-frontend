---
layout: layouts/component.njk
title: Form validator
---

{% lastUpdated "form-validator" %}

{% example "/examples/form-validator", 1000 %}

## When to use

Use the form validator component to validate forms without a server-side round-trip while also conforming to the established standards set out in the [GOV.UK Design System](https://design-system.service.gov.uk/).

## How to use

In alignment with established GOV.UK Design System standards:

- validation is performed on submit. Forms should never be validated as the user types or blurs the field.
- when the form is submitted with errors, focus moves to the error summary; errors are shown above the field and the `<title>` is prefixed with the error count.
- submit buttons are never disabled.
