---
layout: layouts/component.njk
title: Progress Bar
---

{% lastUpdated "progress-bar" %}

{% example "/examples/progress-bar", 300 %}

## When to use

TBC

## When not to use

TBC

## How to use

This component can be used by passing an array of items to render progress on a multistep form.

Using the [arguments table below as a reference](#arguments) you can set the completed, active and current step of the user through their journey.

## Research on this component

This component is marked as experimental because it needs more research.

If you have used the progress bar component, get in touch to share your research findings.

## Arguments

### Container

|Name|Type|Required|Description|
|---|---|---|---|
|attributes|object|No|HTML attributes (for example data attributes) to add to the progress bars's container.|
|items|object|Yes|Items to add to the progress bar.|

### Items

|Name|Type|Required|Description|
|---|---|---|---|
|id|string|No|Gives each step a unique id for rendering purposes. If not set then one will be created for you.|
|active|boolean|No|Sets the item as the currently active step. Only one item in the list should have this set to true.|
|complete|boolean|No|Sets the item to the completed state so the user is aware of progress in that section.|
|label->text|string|Yes|If `html` is set, this is not required. Text to use within the item. If `html` is provided, the `text` argument will be ignored.|
|label->html|string|Yes|If `text` is set, this is not required. HTML to use within the item. If `html` is provided, the `text` argument will be ignored.|
|classes|string|No|Classes to add to the ticket panel's container.|
