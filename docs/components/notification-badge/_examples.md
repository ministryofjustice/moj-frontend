---
title: Examples
order: 30
tags: 'notification-badge'
permalink: false
eleventyComputed:
  override:eleventyNavigation: false
---
## Examples

### The onward journey

The notification badge shows a user where the items are. The items should be easy to find once the user has selected the link.  

#### Step 1: The user sees that they have 8 notifications

<p><img src="{{ 'assets/images/notification-badge-example-inbox-1.png' | rev | url }}" alt="A red notification badge sits next to the 'Notifications' link in the GOV.UK service navigation component. A white number 8 sits inside the round badge. (The 'Home' link is active and shows a heading with empty card components.)"></p>

#### Step 2: They select the link to view their notifications

<p><img src="{{ 'assets/images/notification-badge-example-inbox-2.png' | rev | url }}" alt="The 'Notifications' link is active. The notification badge with the number 8 is part of the active link. The page shows a table with 8 new notifications. The last three rows of the table are selected and there is a 'Mark selected as read' button and a 'Clear selection' link."></p>

More meaningful information is given about the item using a [GOV.UK tag component](https://design-system.service.gov.uk/components/tag/).  

You could also use the [badge component](/components/badge/), or a section called 'Tasks'. Do not use the notification badge component again within a section.  

The user selects 3 and then 'Mark selected as read'.

#### Step 3: They receive feedback that 3 messages have been marked as read. The number on the notification badge changes from 8 to 5.

<p><img src="{{ 'assets/images/notification-badge-example-inbox-3.png' | rev | url }}" alt="The 'Notifications' page has changed: A success message confirms that 3 notifications have been marked as read. The notification badge number is updated to 5 and the table shows 5 remaining notifications."></p>

The number has changed because the page loaded. It’s not 'dynamic'.

#### The notification badge in other components

The notification badge component can be used with other components on the MOJ and GOV.UK Design Systems. 

#### GOV.UK service navigation component

{% example template="examples/service-nav", colocated=true, height=590 %}

#### Side navigation component

{% example template="examples/side-nav", colocated=true, height=590 %}

#### Sub navigation component

{% example template="examples/sub-nav", colocated=true, height=590 %}

### GOV.UK tabs component

{% example template="examples/tabs", colocated=true, height=590 %}

### MOJ header component

{% example template="examples/header", colocated=true, height=590 %}
