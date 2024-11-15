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

The interruption card aims to help users understand possible - and complex - errors, and to help prevent mistakes (especially serious ones).

This component should be used specifically and sparingly. It has 5 use cases:

1. Complex errors
2. Non-contextual errors
3. ‘Are you sure?’ content  
4. More varied application outcomes  
5. Showing important content ahead of a task

#### 1. Complex errors

A complex error is not a simple yes or no. It needs a different response because the user:

- might need contextual or detailed information about why their answer is unexpected
- should be able to continue with the answer they’ve given (but need to check it’s not a conscious or unconscious error)

You might ask the user if they’re sure about what they’ve entered. This is slightly different to an ‘are you sure?’ page, which is shown to all users (irrelevant of user inputs).

#### 2. Non-contextual errors

A non-contextual error happens when there’s a conflict between 2 or more parts of a service. The error is with the application as a whole, not a specific field. This means a message cannot be shown next to an error source, as with a GOV.UK Design System error message.

Service design should prevent these errors. However, they can happen if a user edits an early part of a form (via a Check answers page) in a way that affects later parts. For example, if a person’s income has changed since the application was started, other sections might need to be deleted or re-done.

The user may want to copy answers before they’re removed, and also needs to know that they’ll need to re-enter other sections.

#### 3. ‘Are you sure?’ content

‘Are you sure?’ content is shown to all users, asking them to confirm something in their journey.

It’s commonly used for tasks like deleting or cancelling, rather than in response to something irregular the user has entered. If the content is just ‘good to know’, consider the standard colour palette.

#### 4. More varied application outcomes

The interruption card can be used for application outcomes which are different to a straightforward success, rejection or completion.

This might be needed when the user:

- has met all the success criteria, and they can finish the rest of the application later
- needs to do something after completing the service, for example contact a solicitor
- needs to go to another service to apply

#### 5. Showing important content ahead of a task

As well as responding to an input, an interruption card can tell a user about a task they’re about to start.

Start with the inset or warning text components. If they do not work (or something is very important), use the interruption card. This prevents overuse.

Asking users to confirm they understand something via an interruption card is different to a service ‘declaration’, which is part of the flow and therefore not an interruption.

### When not to use

Do not use the interruption card for anything outside of the 5 use cases.  

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

There’s not enough research on including images in interruption cards. There's [GOV.UK Design System guidance on images](https://design-system.service.gov.uk/styles/images/).

### Colours

The component follows the [GOV.UK Design System colour palette](https://design-system.service.gov.uk/styles/colour/):

- the background is gov.uk-colour (‘blue’)
- the text is gov.uk-colour (‘white’)
- buttons and links use the [GOV.UK Design System inverse modifier class](https://design-system.service.gov.uk/styles/links/#links-on-dark-backgrounds)

No other button colours should be used, for example those for [GOV.UK Design System secondary or warning buttons](https://design-system.service.gov.uk/components/button/#secondary-buttons).

### Height and width

The interruption card has no minimum or maximum height - it resizes to its contents. It works well with fairly short, concise content. Adding a lot of content will detract from its impact.

It should always be presented as full width, with the content spanning two-thirds width for content.

### Other parts of the page

The interruption card should be the only body content on a page. Other elements on the page must be persistent, such as the header, footer, phase banner, person profile, breadcrumb or back link.

Do not add form elements such as radio buttons underneath the component. They are not accessible. This would also turn it into a banner, risking the content being missed.

### How often to use it

This interruption card works well when used sparingly. This maintains its significance and keeps it distinct from standard service pattern pages.

When considering it in a specific case, think about:

- how many other interruption cards there are in the service
- the maximum number of cards a user might view in a single journey    
- whether a user would ever view 2 or more cards in a row (and whether that's OK)

If a lot of interruption cards are emerging in a service, it might be a sign that the journey needs redesigning.

#### Repetitive journeys

Users completing a task multiple times in a service can become overexposed to a particular interruption card. This could be a poor user experience if the card is used to highlight something important and the user has seen it several times.

A limit can be set on how many times a user sees the same interruption card.

## Examples

### A more varied application outcome

The user learns that they've entered enough for an application outcome to be worked out.

<p><img src="/assets/images/interruption-card-example-application-outcome.png" alt="x"></p>

### Showing important content ahead of a task

People visiting prisoners are informed that their visit will be closed. This helps manage expectations.

<p><img src="/assets/images/interruption-card-example-book-visit.png" alt="x"></p>
