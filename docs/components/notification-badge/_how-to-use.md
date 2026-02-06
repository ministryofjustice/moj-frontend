---
title: How to use
order: 20
tags: 'notification-badge'
permalink: false
eleventyComputed:
  override:eleventyNavigation: false
---

## How to use

Use the notification badge sparingly to reduce visual clutter, especially in complex interfaces.

### In navigation

The notification badge is best used in a navigation. In that position it:  

- can be reliably detected by screen reader users
- is most prominent for sighted users

Reserving the component for the navigation (and not using it elsewhere) is the most useful and accessible for everyone. This is because it’s being used consistently.

You can view [how to use the notification badge in navigation](/components/notification-badge/#examples-tab).

### In page headers

The notification badge can be placed in a header if the colour contrast is accessible. It's accessible when used with the [MOJ header](/components/moj-header/), but not the [GOV.UK header](https://design-system.service.gov.uk/components/header/). Do not change the component or header colour to make this possible.  

If your users are switching between MOJ and GOV.UK services consider whether seeing the component being used in different ways will be confusing.

### Colour and shape

The notification badge colour and shape should not be changed.

Red circles are commonly used to attract attention, and as a way of alerting or notifying a user in a service.  

You can use this component on backgrounds other than white if the colour contrast is accessible.  

### Link text

#### Position of the component

The notification badge goes on the right of the link that the items relate to, in the same container:

{% example template="examples/link", height=81, colocated=true, showTab="html" %}

Put the code `<span class="moj-notification-badge">` after the link text, on the same line. Do not add a space between them. This will keep the formatting correct.

#### Content

Label the link text clearly so that the user knows what the item is. You may need to reorganise your tabs to do this.  

Consider the following for link text:

- 'Tasks', 'My tasks' or 'To do' for lower priority items
- 'Notifications' for a range of items
- an envelope icon for messages
- 'Alerts' to give flexibility for a range of medium to high-importance items (but not in HMPPS)

<div class="govuk-inset-text">
    <a href="/content-standards/style-guide/#alerts-(dps-only)">'Alert' has a specific meaning in DPS</a> and HMPPS. Only use this link text in HMPPS if you're referring to an alert produced by NOMIS, DPS or NDelius.
</div>

#### In this example, the user can view notifications from the [primary navigation](/components/primary-navigation/):

<p><img src="{{ 'assets/images/notification-badge-example-inbox-1.png' | rev | url }}" alt="A red notification badge sits next to the ‘Notifications’ link in the primary navigation. A white number 8 sits inside the round badge. (The ‘Home’ link is active and shows a heading with empty card components.)"></p>

#### Hidden text

You need to 'pass' (add) visually hidden text to the code to help non-sighted users understand what the notification badge number is for.

In the example, the hidden text is 'unread':  

```html
<a href="">Messages
    <span class="moj-notification-badge">5<span class="govuk-visually-hidden">unread</span>
    </span>
</a>
```

### The component number

#### When the number changes

The notification badge number will only update when the page loads. It’s not 'dynamic'. If you want to change this, you’ll need to consider accessibility.  

If an item is cleared by an interaction in the service, help the user know that this has happened. Do not rely on the badge changing numbers.

You can view an [example of how to design the onward journey](#examples-tab).

#### Displaying the number of items  

The notification badge will either display:

- the number of tasks if there are 98 or less items
- 99+ if there are 99 or more items

#### Displaying no items

The notification badge will not show unless there are items. You may want to add an empty state to the relevant section to:

- confirm that there are no items (and reassure the user that the page has loaded correctly)
- help people understand where they'll usually find items (which is helpful for a new service or for new users)

Example of the notification badge when there are no items:

{% example template="examples/no-items", colocated=true, height=81, showTab="nunjucks" %}

### Using other notifications

The notification badge is only shown when a user is logged in and viewing the service in a browser.

This means you may need to send a notification (for example an email) if either:
- the task is urgent or important
- some users do not log in very often

Carry out research to find out if this will be helpful.
