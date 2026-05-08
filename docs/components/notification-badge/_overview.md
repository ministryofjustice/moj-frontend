---
title: Overview
order: 10
tags: 'notification-badge'
permalink: false
eleventyComputed:
  override:eleventyNavigation: false
---

{% example template="examples/default", colocated=true, height=81 %}

## Overview

The notification badge component shows users that there are items in a service that need their attention.

It displays the number of items, and needs to be added to a link.

### When to use

You could use the notification badge to tell a user about a:
- new case, referral or application
- change to an appointment or booking, for example a cancellation
- new or unread message

This component is best used in a navigation link but may be OK in some other parts of a service.

#### An example of the notification badge showing 3 case updates in the [primary navigation](/components/primary-navigation):

<p><img src="{{ 'assets/images/notification-badge-example-count.png' | rev | url }}" alt="A red notification badge sits next to the active 'Cases' link in the primary navigation. A white number 3 sits inside the round badge. The page shows a table of cases. The first 3 rows have a status of 'To be reviewed'."></p>

### When not to use

Research will help you work out when the notification badge should be used.

Do not use this component:
- for a standard list of tasks before a linear journey, use the [GOV.UK completing multiple tasks pattern](https://design-system.service.gov.uk/patterns/complete-multiple-tasks/) instead
- to just display a 'count' if there’s nothing for the user to do or know

To display a count, add the number in plain text next to the item. Putting the number in brackets may be clearer, especially if the title includes a number.

### Things to consider

Some internal users are logged in to a service for most of the day. If they work through items in a service as a main part of their job, the notification badge may not help them.

Consider also whether the component would be a good experience for people who will not usually be able to clear items, for example because they’re very busy.

### Similar or linked components

There’s also the:

- [GOV.UK notification banner](https://design-system.service.gov.uk/components/notification-banner/)
- [GOV.UK tag](https://design-system.service.gov.uk/components/tag/)
- [MOJ alert](/components/alert/)
- [MOJ badge](/components/badge/)

