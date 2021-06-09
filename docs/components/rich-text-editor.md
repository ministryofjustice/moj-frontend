---
layout: layouts/component.njk
title: Rich text editor
---

Use the rich text editor component to let users format their input in a textarea.

{% example "/examples/rich-text-editor", 300 %}

### Customise formatting options

You can customise the formatting options shown in the toolbar with the `data-moj-rich-text-editor-toolbar` attribute.

{% example "/examples/rich-text-editor-formatting", 300 %}

## When not to use this component

Don't use this if the user only needs to send a short, simple message.

## How it works

There are 2 ways to use the rich text editor component. You can use HTML or, if you are using [Nunjucks](https://mozilla.github.io/nunjucks/) or the [GOV.UK Prototype Kit](https://govuk-prototype-kit.herokuapp.com/), you can use the Nunjucks macro.

## Configuration

By default, the toolbar has bullet and numbered list buttons. You can turn these off if you don't need them.

You can also add bold, underline and italic buttons but these styles should be used with caution because:

- underlined text can be confused with links
- bold and italic should be used sparingly

## Research on this component

We need more research. If you have used the rich text editor component, get in touch to share your research findings.

## Contribute to this component

You can contribute to this component via the [design system backlog](https://github.com/ministryofjustice/moj-design-system-backlog/issues/44)
