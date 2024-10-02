---
layout: layouts/component.njk
title: Ticket Panel
---

{% lastUpdated "ticket-panel" %}

{% example "/examples/ticket-panel", 300 %}

Break up content or actions into visually distinct groups of information.

## When to use

Use this component for dashboard level information as a way of breaking up content or actions into visually distinct chunks, specifically for instances where information does not fit comfortably into the table or summary list components.

## When not to use

Don’t use this component if the information you wish to present can fit comfortably in a table or summary list component. Don’t use this component to present important information at the top of a page. Instead, consider using the banner component or the panel component.

## How to use

This component is essentially a container that can hold html, in most cases, a title and some paragraph text. It is intended to be flexible, so can contain columns, buttons, links, and a status badge if required.

The border on the left can be used to reinforce the status when used with a [status tag](https://design-system.service.gov.uk/components/tag/) or [badge](/components/badge/). For example, if the ticket panel contains a red status badge with the text ‘cancelled’, the left border can be made red to draw attention to this information.

It can be used to display information in full width panels or columns of upto four panels per row.

## Accessibility information
There are 2 known usability issues with this component that might get flagged in an accessibility review or audit.

### 1. Overuse of sectioning elements
*Problem:* the current markup uses labelled article and section elements. This creates two landmarks for each ticket panel. This can create too many landmarks on a page, particularly one that uses many ticket panels. Landmarks work best when used sparingly to guide screen reader users to the main sections on a page. When too many are used the benefit of providing quick navigation to larger areas of content is lost.

*Fix* a development fix to streamline the markup is being investigated.

### 2. List markup isn’t used for multiple ticket panels
*Problem:* Lack of list structure when many ticket panels are used. List structures are helpful for providing extra semantics to screen readers such as how many items are in the list.

*Fix:* a development fix to add this markup is being investigated.

## Research on this component

This component is marked as experimental because it needs more research.

If you have used the ticket panel component, get in touch to share your research findings.

## Arguments

### Container

| Name       | Type   | Required | Description                                                                           |
| ---------- | ------ | -------- | ------------------------------------------------------------------------------------- |
| classes    | string | No       | Classes to add to the ticket panel's container.                                       |
| attributes | object | No       | HTML attributes (for example data attributes) to add to the ticket panel's container. |

### Items

| Name       | Type   | Required | Description                                                                                                                      |
| ---------- | ------ | -------- | -------------------------------------------------------------------------------------------------------------------------------- |
| text       | string | Yes      | If `html` is set, this is not required. Text to use within the item. If `html` is provided, the `text` argument will be ignored. |
| html       | string | Yes      | If `text` is set, this is not required. HTML to use within the item. If `html` is provided, the `text` argument will be ignored. |
| classes    | string | No       | Classes to add to the ticket panel's container.                                                                                  |
| attributes | object | No       | HTML attributes (for example data attributes) to add to the ticket panel's container.                                            |

### Classes

| Name                                |
| ----------------------------------- |
| moj-ticket-panel\_\_content--blue   |
| moj-ticket-panel\_\_content--red    |
| moj-ticket-panel\_\_content--yellow |
| moj-ticket-panel\_\_content--green  |
| moj-ticket-panel\_\_content--purple |
| moj-ticket-panel\_\_content--orange |

## Accessibility issues

When several ticket panels are used together, the page structure can become hard to navigate for people who use screen readers. For example, multiple section and article HTML elements are introduced and a list element that could provide some organisation is missing. We are looking into how this could be fixed. This has been raised in an external audit under Web Content Accessibility Guidelines (WCAG) 2.4.4 Link Purpose (In Context) (Level A). If you use this component without addressing this issue, you must list it in the accessibility statement.
