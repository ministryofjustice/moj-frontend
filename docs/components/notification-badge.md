---
title: Notification badge
tabs: true
status: Official
statusDate: September 2025
githuburl: https://github.com/ministryofjustice/moj-frontend/discussions/706
excerpt: "Use the notification badge to display a count of items that need the user’s attention."
lede: "Use the notification badge to display a count of items that need the user’s attention."
---
{% from "govuk/components/pagination/macro.njk" import govukPagination %}

{% tabs "paginate" %}
{% tab "Overview" %}

{% example "/examples/notification-badge", 590 %}

## Overview

The notification badge component shows users that there are items that need their attention in a service. It displays the number of items.

This component needs to be attached to a link.

### When to use

You could use the notification badge to tell a user about a:
- new case, referral or application
- change to an appointment or booking, for example a cancellation
- new or unread message

This component is best used in navigation links but may be OK to use in some other parts of a service.

### When not to use

Research will help you work out if the notification badge should be used.

Use the notification badge sparingly to reduce visual clutter, especially in complex interfaces.

Do not use this component:
- for a standard list of tasks before a linear journey, use the [GOV.UK completing multiple tasks pattern](https://design-system.service.gov.uk/patterns/complete-multiple-tasks/) for this
- to just display a ‘count’ if there’s nothing for the user to do or know

To display a count, add the number in plain text next to the item. Putting the number in brackets may be clearer, especially if the title includes a number.

<p><img src="{{ 'assets/images/notification-badge-example-count.png' | rev | url }}" alt="xxx"></p>

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

### In navigation

The notification badge is best used in a navigation. This means it:

- can be reliably detected by screen reader users
- is in the most prominent position for sighted users

Using it only in the navigation makes it the most useful and accessible for everyone. This is because it’s being used consistently.

The navigation components are:
- [GOV.UK service navigation](https://design-system.service.gov.uk/components/service-navigation/)
- [GOV.UK tabs](https://design-system.service.gov.uk/components/tabs/)
- [primary navigation](https://design-patterns.service.justice.gov.uk/components/primary-navigation/)
- [side navigation](https://design-patterns.service.justice.gov.uk/components/side-navigation/)
- [sub navigation](https://design-patterns.service.justice.gov.uk/components/sub-navigation/)

### In page headers

The notification badge can be placed in a header if the colour contrast is accessible. The colour contrast of the notification badge and the [MoJ header](https://design-patterns.service.justice.gov.uk/components/header/) is accessible, but not the [GOV.UK header](https://design-system.service.gov.uk/components/header/). Do not change the component or header colour to make this possible.  

If your users are switching between MoJ and GOV.UK services consider whether seeing the component being used in different will be confusing.

### Position in the link text

Put the notification badge on the right of the link that the items relate to. It needs to be in the same container, so that it’s included in the accessible name.

{% example "/examples/notification-badge-primary-nav", 590 %}

### Link text content

Label the title clearly so that the user knows what the item is. You may need to reorganise your tabs to do this.

<p><img src="{{ 'assets/images/notification-badge-example-link-text-content.png' | rev | url }}" alt="xxx"></p>

Consider the following for titles:

- ‘Tasks’, ‘My tasks’ or ‘To do’ for lower priority items for the user to do
- ‘Notifications’ for a range of items
- an envelope icon for messages
- ‘Alerts’ to give flexibility for a range of medium to high-importance items (but not in HMPPS)

<div class="govuk-inset-text">
    <a href="content-standards/style-guide/#alerts-(dps-only)">‘Alerts’ has a specific meaning in DPS</a> and HMPPS. Do not use this term as a title to refer to other types of notifications.
</div>

### Hidden text

You need to 'pass' (add) hidden text to the code to help non-sighted users understand what the notification badge number relates to.

This is an example:  

```html
<a href="">Messages
    <span class="moj-notification-badge">5
        <span class="govuk-visually-hidden">unread</span>
    </span>
</a>
```

### After the user has selected the title link

The notification badge navigates the user where the items are. The items should be easy to find once the user has selected the link.  

Once you’ve used the notification badge in a navigation link, do not use it again within that section.  

This may confuse or frustrate users, particularly because it does not give any meaningful information about what the item is. Instead, you could add:

- the [GOV.UK tag component](https://design-system.service.gov.uk/components/tag/)
- the [badge component](https://design-patterns.service.justice.gov.uk/components/badge/)
- a section called ‘Actions’ or ‘Tasks’

#### Example: notification inbox

<p><img src="{{ 'assets/images/notification-badge-example-inbox-1.png' | rev | url }}" alt="xxx"></p>

1. The user sees they have 8 unread messages.

<p><img src="{{ 'assets/images/notification-badge-example-inbox-2.png' | rev | url }}" alt="xxx"></p>

2. The user views a list of unread messages, selects 3 and clicks 'Mark selected as read'.

<p><img src="{{ 'assets/images/notification-badge-example-inbox-3.png' | rev | url }}" alt="xxx"></p>

3. The user receives feedback that three messages have been marked as read, and the number on the notification badge changes from 8 to 5.

### Using other notifications

The notification badge is only shown when a user is logged in and viewing the service in a browser.

This means you may need to send a notification (for example an email) if either:
- the task is urgent or important
- some users do not log in very often

Carry out research to find out if this will be useful.

### Displaying the number of items

The notification badge will display either:

- the number of tasks if there are 98 or fewer items
- 99+ if there are 99 or more items

### When there are no items

The notification badge will not show when there are no items.  

If there are no items on the page the title links to, you may want to add an empty state. This:

- confirms that there are no items (and that the page has loaded correctly)
- helps people understand where they can find items (which is particularly helpful for a new service, or new users)

### When the number changes

The notification badge number will only update when the page loads. It’s not 'dynamic'. If you want to change this, you’ll need to consider accessibility.  

If an item is cleared by an interaction in the service, give the user info so that they know this has happened. Do not rely on the badge changing numbers.  

#### Example:

A manager is triaging new cases in a service. Next to their ‘new cases’ tab is a notification badge showing the number 15. They select the tab and view a list of new cases. They select the case (can’t be within the tab) and allocate it to a colleague. They are then returned to the new cases tab where the [success alert](https://design-patterns.service.justice.gov.uk/components/alert/#success-alert) is displayed. Emphasise do not rely.

### Component and background colour and shape

The notification badge is red and this should not be changed. Red is commonly used to attract people’s attention. DON’T CHANGE THE SHAPE because ux.  

This component can be used on backgrounds other than white if the colour contrast is accessible.  

MAKE SURE IT’S CONSISTENT

### How often to use it

x


{% endtab %}

{% tab "Examples" %}

## Examples

### Within MoJ primary navigation

{% example "/examples/notification-badge-primary-nav", 590 %}

### Within MoJ side navigation

{% example "/examples/notification-badge-side-nav", 590 %}

### Within MoJ sub navigation

{% example "/examples/notification-badge-sub-nav", 590 %}

### Within GOV.UK Tabs

{% example "/examples/notification-badge-tabs", 590 %}

### Within GOV.UK Service Navigation

{% example "/examples/notification-badge-service-nav", 590 %}

### Within MoJ Header

{% example "/examples/notification-badge-header", 590 %}
{% endtab %}

{% tab "Get help and contribute" %}
{% include "layouts/partials/get-help-and-contribute.njk" %}
{% endtab %}
{% endtabs %}
