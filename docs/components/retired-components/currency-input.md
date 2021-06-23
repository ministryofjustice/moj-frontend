---
layout: layouts/retired-components.njk
title: Currency input
---

Use the currency input component to help users enter an amount of money in a specified currency.

{% example "/examples/currency-input", 200 %}

## When to use this component

Use the currency input component when you need users to tell you an amount of money in a particular currency, for example pounds sterling, euros or dollars.

## How it works

There are 2 ways to use the currency input component. You can use HTML or, if you are using [Nunjucks](https://mozilla.github.io/nunjucks/) or the [GOV.UK Prototype Kit](https://govuk-prototype-kit.herokuapp.com/), you can use the Nunjucks macro.

The component uses `type="text"` rather than `type="number"` to ensure that all users can enter the decimal symbol. The pattern attribute is used to trigger a numeric keypad on iOS devices.

The input does not prevent users from typing invalid numbers because that makes the interface seem unresponsive. Instead rely on clear labels, hints and error messages.

The currency symbol is styled differently to the input so that users don't confuse it with the input's value.

## Research on this component

The design, code and guidance here are based on [recommendations from the community](https://github.com/alphagov/govuk-design-system-backlog/issues/68).

This component has been used successfully in the following services:

- Claim fees for Crown court defence (Legal Aid Agency)

## Contribute to this component

You can contribute to this component via the [design system backlog](https://github.com/ministryofjustice/moj-design-system-backlog/issues/9)
