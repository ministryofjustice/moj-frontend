---
title: Notification badge
tabs: true
status: Official
statusDate: September 2025
githuburl: https://github.com/ministryofjustice/moj-frontend/discussions/706
excerpt: "Use the notification badge to display a count of new or unread items."
lede: "Use the notification badge to display a count of new or unread items."
---
{% from "govuk/components/pagination/macro.njk" import govukPagination %}

{% tabs "paginate" %}
{% tab "Overview" %}

{% example template="/examples/notification-badge", height=81 %}

## Overview

The notification badge component shows users that there are items in a service that need their attention.

It displays the number of items and needs to be attached to a link.

### When to use

You could use the notification badge to tell a user about a:
- new case, referral or application
- change to an appointment or booking, for example a cancellation
- new or unread message

This component is best used in navigation link but may be OK in some other parts of a service.

The component showing 3 case updates in the <a href="/components/primary-navigation/primary navigation>primary navigation</a>.  

<p><img src="{{ 'assets/images/notification-badge-example-count.png' | rev | url }}" alt="xxx"></p>

### When not to use

Research will help you work out if the notification badge should be used.

Do not use this component:
- for a standard list of tasks before a linear journey, use the [GOV.UK completing multiple tasks pattern](https://design-system.service.gov.uk/patterns/complete-multiple-tasks/) instead
- to just display a ‘count’ if there’s nothing for the user to do or know

To display a count, add the number in plain text next to the item. Putting the number in brackets may be clearer, especially if the title includes a number.

### Things to consider

Some internal users are logged in to a service for most of the day. If they work through items in a service as a main part of their job, the notification badge may not help them.

Consider also whether the component would be a good experience for people who will not usually be able to clear items, for example because they’re very busy.

### Similar or linked components

There’s also the:

- [GOV.UK notification banner](https://design-system.service.gov.uk/components/notification-banner/)
- [MoJ alert](https://design-patterns.service.justice.gov.uk/components/alert/)
- [MoJ badge](https://design-patterns.service.justice.gov.uk/components/badge/)

{% endtab %}

{% tab "How to use" %}

## How to use

Use the notification badge sparingly to reduce visual clutter, especially in complex interfaces.

### In navigation

The notification badge is best used in a navigation. This means it:

- can be reliably detected by screen reader users
- is in the most prominent position for sighted users

Reserving the component for the navigation (and not using it elsewhere) is the most useful and accessible for everyone. This because it’s being used consistently.

You can view how to [use the notification badge in navigation components](/components/notification-badge/#examples-tab).

### In page headers

The notification badge can be placed in a header if the colour contrast is accessible. The colour contrast of the notification badge with the [MoJ header](https://design-patterns.service.justice.gov.uk/components/header/) is accessible, but not with the [GOV.UK header](https://design-system.service.gov.uk/components/header/). Do not change the component or header colour to make this possible.  

If your users are switching between MoJ and GOV.UK services consider whether seeing the component being used in different ways will be confusing.

### The title link

#### Position

The notification badge goes on the right of the link that the items relate to, in the same container:

{% example template="/examples/notification-badge-primary-nav", height=125,
showTab="html" %}

#### Content

Label the title clearly so that the user knows what the item is. You may need to reorganise your tabs to do this.

<p><img src="{{ 'assets/images/notification-badge-example-link-text-content.png' | rev | url }}" alt="xxx"></p>

Consider the following for titles:

- ‘Tasks’, ‘My tasks’ or ‘To do’ for lower priority items
- ‘Notifications’ for a range of items
- an envelope icon for messages
- ‘Alerts’ to give flexibility for a range of medium to high-importance items (but not in HMPPS)

<div class="govuk-inset-text">
    <a href="content-standards/style-guide/#alerts-(dps-only)">‘Alerts’ has a different meaning in DPS</a> and HMPPS. Do not use this term for anything apart from this meaning in HMPPS services.
</div>

#### Hidden text

You need to 'pass' (add) visually hidden text to the code to help non-sighted users understand what the notification badge number is for.

This is an example:  

```html
<a href="">Messages
    <span class="moj-notification-badge">5
        <span class="govuk-visually-hidden">unread</span>
    </span>
</a>
```

### Component and background colour and shape

The notification badge colour and shape should not be changed.

The colour red is commonly used to attract attention, and as a way of alerting or notifying a user. The circle draws the user's attention to the number.  

You can use this component on backgrounds other than white if the colour contrast is accessible.  

### The component number

#### When the number changes

The notification badge number will only update when the page loads. It’s not 'dynamic'. If you want to change this, you’ll need to consider accessibility.  

If an item is cleared by an interaction in the service, give the user info so that they know this has happened. Do not rely on the badge changing numbers.

#### Displaying the number of items (or no items)

The notification badge will:

- display the number of tasks if there are 98 or less items
- display 99+ if there are 99 or more items
- not show if there are no items

#### Empty states when there are no items

You may want to add an empty state to:

- confirm that there are no numbers (and reassure that the page has loaded correctly)
- help people understand where they'll usually find items (particularly helpful for a new service or for new users)

### Using other notifications

The notification badge is only shown when a user is logged in and viewing the service in a browser.

This means you may need to send a notification (for example an email) if either:
- the task is urgent or important
- some users do not log in very often

Carry out research to find out if it will be helpful.

{% endtab %}

{% tab "Examples" %}

## Examples

### Within MoJ primary navigation

{% example template="/examples/notification-badge-primary-nav", height=590 %}

### Within MoJ side navigation

{% example template="/examples/notification-badge-side-nav", height=590 %}

### Within MoJ sub navigation

{% example template="/examples/notification-badge-sub-nav", height=590 %}

### Within GOV.UK tabs

{% example template="/examples/notification-badge-tabs", height=590 %}

### Within GOV.UK service navigation

{% example template="/examples/notification-badge-service-nav", height=590 %}

### Within MoJ header

{% example template="/examples/notification-badge-header", height=590 %}

### Task: showing tasks after the component

The notification badge shows a user where the items are. The items should be easy to find once the user has selected the link.  

<p><img src="{{ 'assets/images/notification-badge-example-inbox-1.png' | rev | url }}" alt="xxx"></p>

S1. The user sees they have 8 notifications.

<p><img src="{{ 'assets/images/notification-badge-example-inbox-2.png' | rev | url }}" alt="xxx"></p>

S2. After selecting the link, they view their notifications

The status of the notification is shown in a [GOV.UK tag component](https://design-system.service.gov.uk/components/tag/). This shows more meaningful information about the item.

You could also use the [badge component](https://design-patterns.service.justice.gov.uk/components/badge/), or a section called ‘Tasks’.

Once you’ve used the notification badge in a link, do not use it again within that section.  

The user selects 3 and clicks 'Mark selected as read'.

<p><img src="{{ 'assets/images/notification-badge-example-inbox-3.png' | rev | url }}" alt="xxx"></p>

S3. The user receives feedback that three messages have been marked as read, and the number on the notification badge changes from 8 to 5.


{% endtab %}

{% tab "Get help and contribute" %}
{% include "layouts/partials/get-help-and-contribute.njk" %}
{% endtab %}
{% endtabs %}
