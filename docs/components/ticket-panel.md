---
layout: layouts/component.njk
title: Ticket Panel
---

{% lastUpdated "ticket-panel" %}

{% example "/examples/ticket-panel", 300 %}

## When to use

TBC

## When not to use

TBC

## How to use

This component accepts the following arguments.

### Container

|Name|Type|Required|Description|
|---|---|---|---|
|classes|string|No|Classes to add to the ticket panel's container.|
|attributes|object|No|HTML attributes (for example data attributes) to add to the ticket panel's container.|

### Items

|Name|Type|Required|Description|
|---|---|---|---|
|text|string|Yes|If `html` is set, this is not required. Text to use within the item. If `html` is provided, the `text` argument will be ignored.|
|html|string|Yes|If `text` is set, this is not required. HTML to use within the item. If `html` is provided, the `text` argument will be ignored.|
|classes|string|No|Classes to add to the ticket panel's container.|
|attributes|object|No|HTML attributes (for example data attributes) to add to the ticket panel's container.|

### Classes

|Name|
|---|
|moj-ticket-panel__content--blue|
|moj-ticket-panel__content--red|
|moj-ticket-panel__content--yellow|
|moj-ticket-panel__content--green|
|moj-ticket-panel__content--purple|
|moj-ticket-panel__content--orange|
