---
layout: layouts/tabbed-component.njk
title: Progress Bar
type: component
eleventyNavigation:
  key: Progress Bar
  parent: Components
  excerpt: ""
---

{% tabs "Contents" %}

{% tab "Overview" %}

## Overview

The Progress Bar component shows users their place within a multi-step process by highlighting completed, current, and upcoming steps. It's useful for guiding users through tasks

## How the component is currently used

This component can be used by passing an array of items to render progress on a multistep form.

Using the arguments table below as a reference you can set the completed, active and current step of the user through their journey.

{% endtab %}

{% tab "Code" %}

## Help develop existing building blocks in GitHub

After a new building block is published in the design system, you, and other users, have the chance to continue enhancing it. This is done with users adding more information and resources to the component via GitHub.

To do this you should:

- go to the GitHub conversation
- add your comments, information and resources about the building block

## Code



### HTML



<div class="app-example app-example-borders">

```html
<div id="progress" class="moj-progress-bar" aria-label="Progress of your application">
  <ol class="moj-progress-bar__list">
    <li id="progress-item-1" class="moj-progress-bar__item">
      <span class="moj-progress-bar__icon moj-progress-bar__icon--complete"></span>
      <span class="moj-progress-bar__label">
        <p>Your Details</p>
      </span>
    </li>

    <li id="progress-item-2" class="moj-progress-bar__item">
      <span class="moj-progress-bar__icon moj-progress-bar__icon--complete"></span>
      <span class="moj-progress-bar__label">Address</span>
    </li>

    <li id="progress-item-3" class="moj-progress-bar__item" aria-current="step">
      <span class="moj-progress-bar__icon"></span>
      <span class="moj-progress-bar__label">Passport details</span>
    </li>

    <li id="progress-item-4" class="moj-progress-bar__item">
      <span class="moj-progress-bar__icon"></span>
      <span class="moj-progress-bar__label">Review</span>
    </li>

    <li id="progress-item-5" class="moj-progress-bar__item">
      <span class="moj-progress-bar__icon"></span>
      <span class="moj-progress-bar__label">Application Complete</span>
    </li>
  </ol>
</div>

```

</div>


{% endtab %}

{% tab "Accessibility" %}

## Accessibility

If you have had an accessibility audit or tested with users with access needs then you could contribute to this component.
### Internal audit (MoJ Digital Accessibility Team ) - October 2022
Screenreader issues. 
[Download the accessibility report](/uploads/[object Object])


{% endtab %}

{% tab "Links" %}

## Links

No links have been provided for this component. If you have used this component in your service and you have a prototype you can share it here.


{% endtab %}

{% endtabs %}
