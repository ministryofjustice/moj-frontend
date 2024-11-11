---
layout: layouts/archive.njk
title: Currency input
type: component
eleventyNavigation:
  key: Currency input
  parent: Archive
  excerpt: "The currency input component helped users enter an amount of money in a specified currency."
---

{% banner "This component is archived" %}

You should use [prefixes and suffixes](https://design-system.service.gov.uk/components/text-input/#prefixes-and-suffixes) in the GOV.UK Design System to help users enter things like currencies.
{% endbanner %}

{% example "/examples/currency-input", 200 %}

## When to use

Use the currency input component to help users enter an amount of money in a specified currency.

Use the currency input component when you need users to tell you an amount of money in a particular currency, for example pounds sterling, euros or dollars.

## How to use

The component uses `type="text"` rather than `type="number"` to ensure that all users can enter the decimal symbol. The pattern attribute is used to trigger a numeric keypad on iOS devices.

The input does not prevent users from typing invalid numbers because that makes the interface seem unresponsive. Instead rely on clear labels, hints and error messages.

The currency symbol is styled differently to the input so that users don't confuse it with the input's value.

## Research

The design, code and guidance here are based on [recommendations from the community](https://github.com/alphagov/govuk-design-system-backlog/issues/68).

This component has been used successfully in the following services:

- Claim fees for Crown court defence (Legal Aid Agency)
