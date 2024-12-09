---
layout: layouts/component.njk
title: Interruption card
type: component
githuburl: https://github.com/ministryofjustice/moj-frontend/discussions/421
eleventyNavigation:
  key: Interruption card
  parent: Components
  excerpt: "The interruption card component stops users in a flow with important information.
"
contributors: Anne Walker, James McKechnie, Lizzie Goddard, Jonathan Porton, Rachel Ricks, Mary Bowden, Louise Jones, Ed Marshall, Quay Pho, Sara Yassine and Deb Gilkes
basedon: interruption card discussion on the GOV.UK Design System backlog
basedonurl: https://github.com/alphagov/govuk-design-system-backlog/issues/27
---

<span class="govuk-caption-xl">The interruption card component pauses a user’s journey with important information.</span>

{% example "/examples/interruption-card", 590 %}

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

An interruption card gives the user more detailed or contextual information about why their answer is unexpected. They can still continue with their answer, unlike with a validation error.

Example of a possible error:

<p><img src="{{ 'assets/images/interruption-card-example-possible-error.png' | rev | url }}" alt="A screen showing an MoJ header and footer. There's a back link above the card. The rest of the page is a blue interruption card. The card contains a heading, paragraph content, a button and a link. The heading is: 'Is this the correct annual salary?' The paragraph text is: 'You entered £349,630.00 as your client’s annual salary before tax. This is higher than expected.' Under the text is a white button with blue text: 'Yes, this is correct'. To the right of it is the link text 'Go back to income details'."></p>

#### 2. ‘Are you sure?’ content

Sometimes a user needs to know something important about a task they've started, and confirm that they want to continue. This can stop them from doing something serious by accident, such as a deletion or cancellation.

This type of interruption card is shown to everyone on a particular user journey, because it's about the task itself.

If the mistakes are less significant, consider removing the content from the interruption card and using standard colour styling.

Example of ‘Are you sure?’ content:

<p><img src="{{ 'assets/images/interruption-card-example-are-you-sure.png' | rev | url }}" alt="A screen showing an MoJ header and footer. There's a back link above the card. The rest of the page is a blue interruption card. The card contains a heading, paragraph content, a button and a link. The heading is: 'Are you sure you want to cancel this referral?' The paragraph text is: 'Cancelling this referral will remove Simon Ball from the programme waiting list. You’ll also not be able to view the referral. This cannot be undone. If you want to continue with the application, you can go back.' Under the text is a white button with blue text: 'Yes, I want to cancel'. To the right of it is the link text 'Go back to application'."></p>

#### 3. Non-contextual errors

A non-contextual error happens when there’s a conflict between 2 or more parts of a service. The error is with the application as a whole, not a specific part. This means that a message cannot be shown next to the source of the error, such as with a [GOV.UK Design System error message](https://design-system.service.gov.uk/components/error-message/).

Service design should prevent these errors. However, they can happen if a user edits an early part of a form (via a [GOV.UK Design System Check answers pattern page](https://design-system.service.gov.uk/patterns/check-answers/)) in a way that affects later parts. For example, if a person’s income has changed since an application was started, they might need to answer different sections.

The interruption card tells users how to resolve the error, for example by answering some sections again or agreeing to delete sections. The user may also want to copy the answers they've given before they’re deleted.

Example of a non-contextual error:

<p><img src="{{ 'assets/images/interruption-card-example-non-contextual-error.png' | rev | url }}" alt="A screen showing an MoJ header and footer. The rest of the page is a blue interruption card. The card contains a heading, paragraph content, a button and a link. The heading is: 'Your new answer affects other sections of this application'. The paragraph text is: 'Question: Where is Andy Cooke located? Previous answer: Probation. New answer: Custody You need to:
- enter their custody information
- update the licence conditions section.' Under the text is a white button with blue text: 'Continue to other sections'. To the right of it is the link text 'Go back to application'."></p>

#### 4. More varied application outcomes

The interruption card can be used for application outcomes which are different to a straightforward success, rejection or completion.

This might be needed when the user:

- has met all the success criteria, and can finish the rest of the application later
- needs to do something else after completing the service, for example contact a solicitor
- needs to complete a task in another service

Example of a more varied application outcome:

<p><img src="{{ 'assets/images/interruption-card-example-varied-outcome.png' | rev | url }}" alt="A screen showing an MoJ header and footer. The rest of the page is a blue interruption card. The card contains a heading, paragraph content, a button and a link. The heading is: 'You’re eligible for a payment and can submit your application'. The paragraph text is: 'You’ve entered enough evidence to qualify for a payment. You might also need to provide financial information if we ask for it at a later date, or you can enter it now.' Under the text is a white button with blue text: 'Submit application'. To the right of it is the link text 'Enter financial information'."></p>

#### 5. Showing important content ahead of a task

It can be helpful to show a user important information before they start a task, particularly if the content has been missed elsewhere (for example, on a start page).

To prevent the interruption card being overused, start with the [GOV.UK Design System inset text component](https://design-system.service.gov.uk/components/inset-text/) or the [GOV.UK Design System warning text component](https://design-system.service.gov.uk/components/warning-text/). If neither work - or something is very important - try the interruption card.

The user can continue once they have acknowledged the content in the interruption card. This is not a declaration, though. Declarations are for users to confirm that they have understood information they've been given or agree to something. This is part of the flow and therefore not an interruption.

Example of showing important content ahead of a task:

<p><img src="{{ 'assets/images/interruption-card-example-important-content.png' | rev | url }}" alt="A screen showing an MoJ header and footer. The rest of the page is a blue interruption card. The card contains a heading, paragraph content, a button and a link. The heading is: 'This will be a closed visit'. The paragraph text is: 'On a closed visit, the prisoner and visitors cannot have any physical contact or pass any items.' Under the text is a white button with blue text: 'Book this visit'. To the right of it is the link text 'Go back'."></p>

### When not to use

Do not use the interruption card for anything outside of the 5 use cases. It should also not be used to:

- emphasise large amounts of content on a page (as the impact will be lost)
- show form elements such as radio buttons (a red error message on the blue background is not accessible)
- make a heading more visually prominent
- display an empty state for the user to resolve (if it's within a list) - use the [GOV.UK Design System tasklist component](https://design-system.service.gov.uk/components/task-list/) instead

### Things to consider

The card is not announced to screen reader users when they interact with the page. Therefore, the heading needs to clearly convey the purpose of the page and that the user is being interrupted, for example with ‘Before you continue’.   

The interruption card uses a non-standard colour palette for emphasis in a user journey. Other blue parts of a page, such as a header, person identifier or phase banner, will affect how much impact it has.

### Similar or linked components

There’s also the:

- [GOV.UK Design System warning text component](https://design-system.service.gov.uk/components/warning-text/)
- [GOV.UK Design System error message](https://design-system.service.gov.uk/components/error-message/)
- [GOV.UK Design System panel](https://design-system.service.gov.uk/components/panel/)
- [GOV.UK Design System notification banner](https://design-system.service.gov.uk/components/notification-banner/)

## How to use

### What to add to it

The interruption card should only contain:

- a heading
- paragraph content (with bullets but no other styling)
- 1 button (or link) to continue
- 1 button (or link) to go back

The only button that can be used is the [GOV.UK Design System button on a dark background](https://design-system.service.gov.uk/components/button/#buttons-on-dark-backgrounds).

Do not add form elements (such as radio buttons). A red error message would appear on the blue background, which is not accessible.

There’s not enough research to determine whether images should be included in interruption cards. The [GOV.UK Design System guidance on images](https://design-system.service.gov.uk/styles/images/) may help with this.

### Colours

The component follows the [GOV.UK Design System colour palette](https://design-system.service.gov.uk/styles/colour/):

- the background is `govuk-colour("blue")`
- the text is `govuk-colour("white")`
- [links use the inverse modifier class](https://design-system.service.gov.uk/styles/links/#links-on-dark-backgrounds)
- [buttons use the inverse modifier class](https://design-system.service.gov.uk/components/button/#buttons-on-dark-backgrounds)

No other button colours should be used. Do not use the [GOV.UK Design System secondary or warning buttons](https://design-system.service.gov.uk/components/button/#secondary-buttons), for example.

### Height and width

The interruption card has no minimum or maximum height - it resizes to its contents. It works well with fairly short, concise content. Adding a lot of content will reduce its impact.

On a desktop view, present it at full width with the content spanning two-thirds width. For mobile devices, the content is also full width.

### Other parts of the page

The interruption card should be the only body content on a page. The only other elements can be the header, footer, phase banner, person profile, breadcrumb or back link (which are all persistent).

Do not add form elements (such as radio buttons) underneath the component.

### How often to use it

This interruption card works well when used sparingly. This is to keep it significant, and distinct from standard service pattern pages.

When considering it in a specific case, think about:

- how many other interruption cards there are in the service
- the maximum number of cards a user might view in a single journey    
- whether a user would ever view 2 cards in a row (and how that could be prevented)

If a lot of interruption cards are emerging in a service, it might be a sign that the journey needs redesigning.

#### Repetitive journeys

Users completing the same journey multiple times in a service will become overexposed to a particular interruption card. This could be a poor user experience if the card is used to highlight something important and the user has seen it several times.

Consider limiting the amount of times a particular interruption card is shown to users at the same stage of the journey.
