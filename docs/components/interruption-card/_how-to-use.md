---
title: How to use
order: 20
tags: 'interruption-card'
permalink: false
eleventyComputed:
  override:eleventyNavigation: false
---

## How to use

### What to add to it

The interruption card should only contain:

- a heading
- paragraph content (with bullets but no other styling)
- 1 button (or link) to continue
- 1 button (or link) to go back

The only button that can be used is the [GOV.UK Design System button on a dark background](https://design-system.service.gov.uk/components/button/#buttons-on-dark-backgrounds).

Do not add form elements (such as radio buttons). A red error message would appear on the blue background, which is not accessible.

There’s not enough research on the use of images in interruption cards. The [GOV.UK Design System guidance on images](https://design-system.service.gov.uk/styles/images/) may help with this.

### Colours

The component follows the [GOV.UK Design System colour palette](https://design-system.service.gov.uk/styles/colour/):

- the background is `govuk-colour("blue")`
- the text is `govuk-colour("white")`
- [links use the inverse modifier class](https://design-system.service.gov.uk/styles/links/#links-on-dark-backgrounds)
- [buttons use the inverse modifier class](https://design-system.service.gov.uk/components/button/#buttons-on-dark-backgrounds)

No other button colours should be used. Do not use the [GOV.UK Design System secondary or warning buttons](https://design-system.service.gov.uk/components/button/#secondary-buttons), for example.

### Height and width

The interruption card has no minimum or maximum height – it resizes to the contents. It works well with fairly short, concise content. Adding a lot of content will reduce its impact.

The component is set to full width on desktop and mobile and should not be changed. The content width will automatically adjust for readability.

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

Users completing the same journey multiple times in a service will become overexposed to a particular interruption card. This could be a poor user experience if the card is used to highlight something important and the user has already seen it several times.

Consider limiting the amount of times a particular interruption card is shown to users at the same stage of the journey.

