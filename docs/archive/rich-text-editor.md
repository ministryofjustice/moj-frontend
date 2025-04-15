---
layout: layouts/archive.njk
title: Rich text editor
status: Archived
type: component
statusDate: April 2022
redirect_from: /components/rich-text-editor
excerpt: "The rich text editor component allowed users to format their input in a text area."
---

{% banner "This component is archived" %}

This component is not sufficiently accessible to be used in live services.

You should use an accessible rich text editor.
{% endbanner %}

{% example "/examples/rich-text-editor", 300 %}

## When to use

Use the rich text editor component to let users format their input in a textarea.

## When not to use

Don't use this if the user only needs to send a short, simple message.

## How to use

### Customise formatting options

By default, the toolbar has bullet and numbered list buttons. You can turn these off if you don't need them.

You can also add bold, underline and italic buttons but these styles should be used with caution because:

- underlined text can be confused with links
- bold and italic should be used sparingly

You can customise the formatting options shown in the toolbar with the `data-toolbar` attribute.

{% example "/examples/rich-text-editor-formatting", 300 %}
