---
title: Notification badge
tabs: true
status: Official
statusDate: September 2025
githuburl: https://github.com/ministryofjustice/moj-frontend/discussions/706
excerpt: "xxx."
lede: "Use the notification badge to display a count of items that need the user’s attention."
---
{% from "govuk/components/pagination/macro.njk" import govukPagination %}

{% tabs "paginate" %}
{% tab "Overview" %}

{% example "/examples/notification-badge", 590 %}

## Overview 

xxx
### When to use

xxx

### When not to use

xxx

### Things to consider

xxx

### Similar or linked components

xxx

## Accessibility issues

xxx

{% endtab %}

{% tab "How to use" %}

## How to use 



### Hint text

xxx

### Excluding dates

xxx

### Error messages

xxx


{% endtab %}

{% tab "Examples" %}

## Examples


### Example 1 - MoJ primary navigation

{% example "/examples/notification-badge-primary-nav", 590 %}

### Example 2 - MoJ side navigation

{% example "/examples/notification-badge-side-nav", 590 %}

### Example 3 - MoJ sub navigation

{% example "/examples/notification-badge-sub-nav", 590 %}

### Example 4 - GOV.UK Tabs

{% example "/examples/notification-badge-tabs", 590 %}

### Example 4 - GOV.UK Service Navigation

{% example "/examples/notification-badge-service-nav", 590 %}

### Example 5 - MoJ Header

{% example "/examples/notification-badge-header", 590 %}
{% endtab %}

{% tab "Get help and contribute" %}
{% include "layouts/partials/get-help-and-contribute.njk" %}
{% endtab %}
{% endtabs %}
