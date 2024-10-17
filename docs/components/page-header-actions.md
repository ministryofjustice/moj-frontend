---
layout: layouts/component.njk
title: Page header actions
type: component
githuburl: https://github.com/ministryofjustice/moj-frontend/discussions/707
---

{% lastUpdated "page-header-actions" %}

{% example "/examples/page-header-actions", 150 %}

## When to use

Use the page header actions component for certain actions.

Use this when:

- the content of the page is so long that users have to scroll past it to see actions. For example, having a “Create case” button underneath a long list of cases.
- the action is applied to the page item and not one specific part of the content. For example, in a user profile page, it could make sense to put the “Suspend user” action in the header.

## When not to use

Don’t place buttons next to the header when they are specific to a component within the page.

## How to use

The component ensures the buttons are aligned right in line with the heading. On small screens the buttons tuck underneath the heading.
