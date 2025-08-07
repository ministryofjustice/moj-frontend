---
title: Progress tracker
tabs: true
status: Experimental
statusDate: August 2025
excerpt: ""
lede: ""
githuburl: https://github.com/ministryofjustice/moj-frontend/discussions/xxx
contributorName: test number 6000
contributorTeam: dream team
---

{% tabs "paginate" %}
{% tab "Overview" %}

<div class="img-container">
  <img src="/assets/images/submission-1754578003415/FireShot-Capture-102---Check-the-progress-of_anonymous.png" alt="Progress tracker" />
</div>

## Overview
A visual representation of steps in a process that have and/or must be completed to achieve an outcome.

### How the component is currently used

When a user is subject to steps in a process outside of their responsibility or control, a progress tracker/checklist supports or replaces a task list by giving a different overview on progress and outcomes. This differs from a timeline in that it does not log events and grow. It is a pre-fixed set of finite steps. Steps may/may not be completed in any order depending on the process, but the order of the tracker stays fixed. On the Make and register LPA product we support the tracker with banners above detailing connected events and directions to dated comms from Notify.

### Contribute to this component
You can help develop this component by adding information to the Github discussion. This helps other people to use it in their service.

{% endtab %}

{% tab "Designs" %}

## Designs

A Figma link has been added for this component. There may be more links and resources in the [Progress-tracker Github discussion]({{ githuburl }}).


### Figma link

      [View the Progress-tracker in Figma (opens in a new tab)]()


### Contribute prototypes and Figma links

      If you have design files that are relevant to this component you can add them to the [Github discussion]({{ githuburl }}). This helps other people to use it in their service.

{% endtab %}

{% tab "Accessibility" %}

## Accessibility

Accessibility findings have been added for this component. There may be more findings in the [Progress-tracker Github discussion]({{ githuburl }}).


### External audit

* Conducted by: User Vision
* Date: 22 August 2024

#### Audit findings

No issues returned on this building block.
### Internal review

* By: MOJ Accessibility team
* Date: 30 May 2024

#### Review findings

No issues returned on this building block.

## Contribute accessibility findings

    If you have accessibility findings that are relevant to this component you can add them to the [Github discussion]({{ githuburl }}). This helps other people to use it in their service.

{% endtab %}

{% tab "Code" %}

## Code

Code has been added for this component. There may be other code blocks in the [Progress-tracker Github discussion]({{ githuburl }}).


### Example 1: html

<div class="app-example__code" data-module="app-copy">

```html
{% raw %}
<div id="progress" class="app-progress-bar">
  <ol class="app-progress-bar__list">
    <li class="app-progress-bar__item">
      <span class="app-progress-bar__icon app-progress-bar__icon--complete"></span>
      <span class="app-progress-bar__label">
        First step<span class="govuk-visually-hidden"> completed</span>
      </span>
    </li>
    <li class="app-progress-bar__item">
      <span class="app-progress-bar__icon app-progress-bar__icon--complete"></span>
      <span class="app-progress-bar__label">
        Second step<span class="govuk-visually-hidden"> completed</span>
      </span>
    </li>
    <li class="app-progress-bar__item">
      <span class="app-progress-bar__icon"></span>
      <span class="app-progress-bar__label">
        Third step<span class="govuk-visually-hidden"> not completed</span>
      </span>
    </li>
  </ol>
</div>
 

{% endraw %}
```

</div>




## Contribute code for this component

If you have code that is relevant to this component you can add it to the [Github discussion]({{ githuburl }}). This helps other people to use it in their service.

{% endtab %}

{% endtabs %}
