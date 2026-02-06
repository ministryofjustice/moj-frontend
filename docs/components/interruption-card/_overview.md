---
title: Overview
order: 10
tags: 'interruption-card'
permalink: false
eleventyComputed:
  override:eleventyNavigation: false
---

{% example template="examples/default", colocated=true, height=590 %}

## Overview

The interruption card uses visual prominence to draw a user's attention to something important. The user has to acknowledge it to continue.

### When to use

The interruption card helps users to understand possible errors and avoid mistakes (especially serious ones).

This component should be used specifically and sparingly. It has 5 use cases:

1. [Possible errors](#1.-possible-errors)
2. [‘Are you sure?’ content](#2.-%E2%80%98are-you-sure%3F%E2%80%99-content)
3. [Non-contextual errors](#3.-non-contextual-errors)
4. [More varied application outcomes](#4.-more-varied-application-outcomes)
5. [Showing important content ahead of a task](#5.-showing-important-content-ahead-of-a-task)

#### 1. Possible errors

A possible error is something which is quite likely to be a mistake.

An interruption card gives the user more detailed or contextual information about why their answer is unexpected. They can continue without changing their answer, unlike with a validation error.

Example of a possible error:

<p><img src="{{ 'assets/images/interruption-card-example-possible-error.png' | rev | url }}" alt="A screen showing an MOJ header and footer. There's a back link above the card. The rest of the page is a blue interruption card. The card contains a heading, paragraph content, a button and a link. The interruption card is  used to question whether the user has entered the correct salary. Under the text is a white button with blue text: 'Yes, this is correct'. To the right of it is the link text 'Go back to income details'."></p>

#### 2. ‘Are you sure?’ content

Sometimes a user needs to know something important about a task they've started, and confirm that they want to continue. This can stop them from doing something serious by accident, such as a deletion or cancellation.

This type of interruption card is shown to everyone on a particular user journey, because it's about the task itself.

If the outcome is less serious, and the information is just 'good to know', consider removing the content from the interruption card and using standard colour styling.

Example of ‘Are you sure?’ content:

<p><img src="{{ 'assets/images/interruption-card-example-are-you-sure.png' | rev | url }}" alt="A screen showing an MOJ header and footer. There's a back link above the card. The rest of the page is a blue interruption card. The card contains a heading, paragraph content, a button and a link. The card is used to confirm whether the user wants to cancel this referral, because it'll remove the person from a waiting list. The user can proceed via a white button with blue text or cancel via a link link, with text 'Go back to application'."></p>

#### 3. Non-contextual errors

A non-contextual error happens when there’s a conflict between 2 or more parts of a service. The error is with the application as a whole, not a specific part. This means that a message cannot be shown next to the source of the error, such as with a [GOV.UK Design System error message](https://design-system.service.gov.uk/components/error-message/).

Service design should prevent these errors. However, they can happen if a user edits an early part of a form (via a [GOV.UK Design System Check answers pattern page](https://design-system.service.gov.uk/patterns/check-answers/)) in a way that affects later parts. For example, if a person’s income has changed since an application was started, they might need to answer different sections.

The interruption card tells users how to resolve the error, for example by answering some sections again or agreeing to delete sections. The user may also want to copy the answers they've given before they’re deleted.

Example of a non-contextual error:

<p><img src="{{ 'assets/images/interruption-card-example-non-contextual-error.png' | rev | url }}" alt="A screen showing an MOJ header and footer. The rest of the page is a blue interruption card. The card contains a heading, paragraph content, a button and a link. The card is used to explain that a new answer affects other sections of the application. Under the text is a white button with blue text: 'Continue to other sections'. To the right of it is the link text 'Go back to application'."></p>

#### 4. More varied application outcomes

The interruption card can be used for application outcomes which are different to a straightforward success, rejection or completion.

This might be needed when the user:

- has met all the success criteria, and can finish the rest of the application later
- needs to do something else after the application, for example contact a solicitor
- needs to go to another service for a task

Example of a more varied application outcome:

<p><img src="{{ 'assets/images/interruption-card-example-varied-outcome.png' | rev | url }}" alt="A screen showing an MOJ header and footer. The rest of the page is a blue interruption card. The card contains a heading, paragraph content, a button and a link. The card is used to explain that the user is eligible for a payment, can submit their application but may need to provide more information later.' The user can submit using the button and enter more information using the link."></p>

#### 5. Showing important content ahead of a task

It can be helpful to show a user important information before they start a task, particularly if the content has been missed elsewhere (for example, on a start page).

To prevent the interruption card being overused, start with the [GOV.UK Design System inset text component](https://design-system.service.gov.uk/components/inset-text/) or the [GOV.UK Design System warning text component](https://design-system.service.gov.uk/components/warning-text/). If neither work (or something is very important) try the interruption card.

The user can continue once they have acknowledged the content in the interruption card. They are not declaring anything, though. Declarations are for users to confirm that they've understood information they've been given or agree to something. This is not an interruption because it's part of the flow.

Example of showing important content ahead of a task:

<p><img src="{{ 'assets/images/interruption-card-example-important-content.png' | rev | url }}" alt="A screen showing an MOJ header and footer. The rest of the page is a blue interruption card. The card contains a heading, paragraph content, a button and a link. The card is used to explain that the prison visit is closed and that there can no physical contact. The user can continue or go back."></p>

### When not to use

Do not use the interruption card for anything outside of the 5 use cases. It should also not be used to:

- emphasise large amounts of content on a page (as the impact will be lost)
- show form elements such as radio buttons (a red error message on the blue background is not accessible)
- make a heading more visually prominent
- display an empty state for the user to resolve (if it's within a list) &ndash; use the [GOV.UK Design System tasklist component](https://design-system.service.gov.uk/components/task-list/) instead

### Things to consider

The card is not announced to screen reader users when they interact with the page, so the heading needs to clearly convey that the user is being interrupted. This can be done with content such as ‘Before you continue’.

The interruption card uses a non-standard colour palette for emphasis in a user journey. Other blue parts of a page, such as a header, person identifier or phase banner, will affect how much impact it has.

### Similar or linked components

There’s also the:

- [GOV.UK Design System warning text component](https://design-system.service.gov.uk/components/warning-text/)
- [GOV.UK Design System error message](https://design-system.service.gov.uk/components/error-message/)
- [GOV.UK Design System panel](https://design-system.service.gov.uk/components/panel/)
- [GOV.UK Design System notification banner](https://design-system.service.gov.uk/components/notification-banner/)

