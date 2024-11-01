---
layout: layouts/component.njk
isArchive: true
title: Form validator
---

{% banner "This component is archived" %}

This component is not sufficiently accessible to be used in live services.

You must validate forms on the server-side. If you require client-side validation, start with [native browser form validation](https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation#using_built-in_form_validation).
For more complex validation, use an accessible validation library.
{% endbanner %}

{% lastUpdated "form-validator" %}

{% example "/examples/form-validator", 1000 %}

## When to use

Use the form validator component to validate forms without a server-side round-trip while also conforming to the established standards set out in the [GOV.UK Design System](https://design-system.service.gov.uk/).

## How to use

In alignment with established GOV.UK Design System standards:

- validation is performed on submit. Forms should never be validated as the user types or blurs the field.
- when the form is submitted with errors, focus moves to the error summary; errors are shown above the field and the `<title>` is prefixed with the error count.
- submit buttons are never disabled.
