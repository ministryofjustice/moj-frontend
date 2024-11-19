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
contributors: xxx
basedon: xxx
basedonurl: xxx
---

<span class="govuk-caption-xl">The interruption card component stops users in a flow with important information.</span>

{% example "/examples/interruption-card", 740 %}


## Overview

The interruption card uses visual prominence to draw attention to something important. The user has to acknowledge it to continue.

### When to use

The interruption card helps users understand possible errors and prevent mistakes (especially serious ones).

This component should be used specifically and sparingly. It has 5 use cases:

1. Possible errors
2. ‘Are you sure?’ content  
3. Non-contextual errors
4. More varied application outcomes  
5. Showing important content ahead of a task

#### 1. Possible errors

The interruption card can be shown to a user after they've entered something which might be a mistake.

It gives the user contextual or detailed information about why their answer is unexpected. They can still continue with their answer, unlike with a validation error.

#### 2. ‘Are you sure?’ content

Sometimes users need to be asked if they're sure they want to do something.  

This aims to prevent people from doing serious things by accident, such as deleting or cancelling something. If the action does not have serious consequences - and the content is just ‘good to know’ - consider the standard colour palette.

This type of interruption card is a part of everyone's journey, because it's about the task itself not something which has been entered.

#### 3. Non-contextual errors

A non-contextual error happens when there’s a conflict between 2 or more parts of a service. The error is with the application as a whole, not a specific field. This means a message cannot be shown next to the source of the error, unlike with a [GOV.UK Design System error message](https://design-system.service.gov.uk/components/error-message/).

Service design should prevent these errors. However, they can happen if a user edits an early part of a form (via a [Check answers pattern page](https://design-system.service.gov.uk/patterns/check-answers/)) in a way that affects later parts. For example, if a person’s income has changed since the application was started, other sections might need to be deleted or redone.

The user may want to copy answers before they’re removed, and also needs to know that they’ll need to re-enter other sections.

#### 4. More varied application outcomes

The interruption card can be used for application outcomes which are different to a straightforward success, rejection or completion.

This might be needed when the user:

- has met all the success criteria, and they can finish the rest of the application later
- needs to do something after completing the service, for example contact a solicitor
- needs to complete a task in another service

#### 5. Showing important content ahead of a task

As well as responding to an input, an interruption card can tell a user about a task they’re about to start.

Users need to confirm that they understand something, and then they're allowed to continue. By confirming or continuing, the user is not declaring anything. Declarations , which is usually used to confirm that the information they've submitted is correct. They are part of the flow and therefore not an interruption.

Start with the inset or warning text components. If they do not work (or something is very important), use the interruption card. This prevents overuse.

### When not to use

Do not use the interruption card for anything outside of the 5 use cases. It should also not be used:

- to emphasise large amounts of content on a page, as it will lose its impact
- to offer options other than continue and go back, because adding form elements (such as radio buttons) to is not accessible  

### Things to consider

An alert is not read out to screenreader users when they interact with the page (unlike with the warning text and inset text components). Therefore, the heading needs to clearly convey the purpose of the page and that the user is being interrupted, for example with ‘Before you continue’.   

The interruption card uses a non-standard colour palette for impact in a user journey. When considering the impact, consider other blue parts of the page, for example the header, person identifiers and phase banners.

### Similar or linked components

There’s also the:

- [GOV.UK Design System warning text component](https://design-system.service.gov.uk/components/error-message/)
- [GOV.UK Design System error message](https://design-system.service.gov.uk/components/error-message/)
- [GOV.UK Design System panel](https://design-system.service.gov.uk/components/panel/)
- [GOV.UK Design System notification banner](https://design-system.service.gov.uk/components/notification-banner/)

## How to use

### What to add to it

The interruption card should only contain:

- a heading
- paragraph content (with bullets but no other styling)
- a button (or link) to continue
- a button (or link) to go back

Do not add form elements (such as radio buttons) to it, as this is not accessible.

There’s not enough research to determine whether images should be included in interruption cards. There's [GOV.UK Design System guidance on images](https://design-system.service.gov.uk/styles/images/).

### Colours

The component follows the [GOV.UK Design System colour palette](https://design-system.service.gov.uk/styles/colour/):

- the background is gov.uk-colour (‘blue’)
- the text is gov.uk-colour (‘white’)
- buttons and links use the [GOV.UK Design System inverse modifier class](https://design-system.service.gov.uk/styles/links/#links-on-dark-backgrounds)

No other button colours should be used, for example those for [GOV.UK Design System secondary or warning buttons](https://design-system.service.gov.uk/components/button/#secondary-buttons).

### Height and width

The interruption card has no minimum or maximum height - it resizes to its contents. It works well with fairly short, concise content. Adding a lot of content will reduce its impact.

On a desktop view, present it at full width with the content spanning two-thirds width. For mobile devices, the content is also full width.

### Other parts of the page

The interruption card should be the only body content on a page. The only other elements can be the header, footer, phase banner, person profile, breadcrumb or back link (which are all persistent).

Do not add form elements such as radio buttons underneath the component. This is not accessible, and also turns it into a banner (risking the content being missed).

### How often to use it

This interruption card works well when used sparingly. This maintains its significance and keeps it distinct from standard service pattern pages.

When considering it in a specific case, think about:

- how many other interruption cards there are in the service
- the maximum number of cards a user might view in a single journey    
- whether a user would ever view 2 cards in a row (and how that could be prevented)

If a lot of interruption cards are emerging in a service, it might be a sign that the journey needs redesigning.

#### Repetitive journeys

Users completing the same journey multiple times in a service will become overexposed to a particular interruption card. This could be a poor user experience if the card is used to highlight something important and the user has seen it several times.

Consider limiting the amount of times a particular interruption card is shown to users at the same stage of the journey.

## Examples

### A more varied application outcome

The user learns that they've entered enough for an application outcome to be worked out.

<p><img src="/assets/images/interruption-card-example-application-outcome.png" alt="x"></p>

### Showing important content ahead of a task

People visiting prisoners are informed that their visit will be closed. This helps manage expectations.

<p><img src="/assets/images/interruption-card-example-book-visit.png" alt="x"></p>
