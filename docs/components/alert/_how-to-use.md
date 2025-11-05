---
title: How to use
order: 20
tags: 'alert'
permalink: false
eleventyComputed:
  override:eleventyNavigation: false
---

## How to use

The alert works best when it contains a single, succinct message.

Do not use it to display large amounts of content. This reduces the prominence of the component and pushes other content down the page. If you cannot communicate your message in under 3 sentences, use a different component.

### What to add to it

The alert contains an icon and is surrounded by a border. It needs to contain body copy, with a full stop at the end of each sentence.

The alert needs a title, which does not need to be shown on the page. The title gives each alert a unique and accessible label, which can be read out to screenreader users.

You can add one heading (but no more) to the body copy. The heading level should follow its position on the page. For example, an alert heading would be an H2 if placed under a main page heading.

You can also add bullet points and links, if needed.

The alert content needs to make sense on its own. This ensures that the message does not rely on the colour and icon, as they're not accessible to everyone.

### Dismissing the alert

{% example template="examples/dismissible", colocated="true", height=150 %}

The alert can stay on the page (be persistent) or be dismissed by the user. Dismissing it helps users to manage tasks and keep their interfaces clear. It's particularly helpful for the success alert, where there's nothing more for the user to do.

<div class="govuk-warning-text">
  <span class="govuk-warning-text__icon" aria-hidden="true">!</span>
  <strong class="govuk-warning-text__text">
    <span class="govuk-visually-hidden">Warning</span>
    Do not set up the alert to auto-dismiss, for example to disappear after a few seconds or when the user interacts with the page. This is not accessible.
  </strong>
</div>

When an alert is dismissed, the focus will go to one of the following:

- the heading above, if there are no more alerts on the page
- the previous or next alert, if there are any more on the page
- the `main` element, if there's no heading above the alert

If you want the focus to go somewhere else, use the `focusOnDismissSelector` Nunjucks macro option. If this does not work, the focus will go to 1 of the 3 options.

### Height and width

The alert has no minimum or maximum height – it resizes to the contents. It should not be used to display a lot of content, though.

The alert will take the width of the container, and will automatically adjust for readability.

### How often to use it

When considering an alert in a specific case, think about the maximum number of alerts or banners a user might view on a page and in a journey.

If a lot of information and warning alerts are emerging in a service (for example, on every page) it might be a sign of a wider problem. This could be fixed through service design.

#### Stacking alerts

It's OK to present more than 1 alert on a page – they'll stack. When developing your alert strategy, consider:

- separating alerts that do not involve anything further for a user do – these can be easily dismissed
- combining instances of the warning, error and information states to reduce the number of alerts
- that the 'alert' read out to screenreader users should only be applied to one alert

### Where to add it

An alert can be displayed globally or in context, depending on the type of message.

A global alert is shown on all pages (or any page) and is about the service as a whole, for example service downtime. It can also be displayed on a homepage to draw the user’s attention to new and unknown issues. A contextual alert is shown in (and is about) a particular section.

Place alerts about a whole service or page at the top of the page above the main heading and below the back link (if there is one). An alert can also be positioned under a relevant heading, but should not be added to body copy.

### Alert colours and icons

The link text colour is the same as the rest of the variant. Each alert has an icon, which must not be removed. Removing the icon makes an alert too reliant on colour, which cannot be accessed by everyone. Do not change the colours.

#### Alert usage on coloured backgrounds

The alert is accessible on a `govuk-colour("white")` or `govuk-colour("light-grey")` background.

An alert should not be placed on a coloured background because:

- the colour contrast between the border and page may not be accessible
- the background may distract from the border colour and change the emphasis of the message


