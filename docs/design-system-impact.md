---
layout: layouts/content.njk
subsection: About the Design System
title: Impact of the Design System
lede: Read how the MOJ Design System has impacted spend, users, and other government departments by providing reusable building blocks that solve common problems.
eleventyNavigation:
  key: Impact
  parent: About the Design System
  order: 10
  excerpt: "xxx."
---

<!-- Updated date -->
  {% set spendLastUpdated = "XX October 2025" %}
  {% set peopleLastUpdated = "XX October 2025" %}
  {% set whatsNewLastUpdated = "XX October 2025" %}

<!-- User satisfaction -->
  {% set overallSatisfaction = 3.7 %}
  {% set easeOfUse = 3.9 %}
  {% set supportSatisfaction = 4.3 %}
  {% set outOf = 5 %}

<!-- Adoption and sentiment -->
  {% set useFrequency = 86 %}
  {% set improvement = 100 %}
  {% set timeSaving = 98.6 %}

<h2 class="govuk-heading-l govuk-!-margin-bottom-2">The impact on spending</h2>
<p class="secondary">
  Last updated: {{ spendLastUpdated }}
</p>

The average cost of developing a reusable component is £5,000.

The amount of times Design System components are initially used in MOJ services is 2,481.

This does not count multiple uses of the same component in a single service. For example, if a service uses the Date picker component 50 times, only 1 instance is counted.

Multiplied, this tells us the impact on spending.

<div class="govuk-grid-row govuk-body govuk-!-margin-bottom-5 govuk-!-margin-top-8">
  <div class="headline-container govuk-grid-column-two-thirds govuk-!-margin-bottom-0">
      <div class="callout-card">
        <span class="big-number">
          £12.4M
        </span>
        <p class="lead">
          additional spend would have been necessary for services to arrive at the same point, without the MOJ Design System
        </p>
      </div>
    </div>
  </div>

<details class="govuk-details">
  <summary class="govuk-details__summary">
    <span class="govuk-details__summary-text">
      How was this calculated?
    </span>
  </summary>
  <div class="govuk-details__text">
    <p><strong>The average cost of developing a reusable component</strong></p>
    <p>
      £5,000 is the average cost for a team to create a component, as estimated by the <a href="https://design-system.dwp.gov.uk/">DWP Design System</a> team. This includes the necessary discovery, design, development, and QA/testing, as well as delivering the component to the required standard for use across a large organisation.
    </p>
    <p><strong>How many times components are used across MOJ services</strong></p>
    <p>
      Access to detailed data about the use of components is limited, so a sample was used to infer the likely implementation of components across all MOJ digital services.
    </p>
    <p>
      From a code search, we can understand the total amount of times a component appears in code across MOJ services​, and details of a sample of results, including whether the service is live or a prototype.
    </p>
    <p>
      This allows us to determine what percentage of the sample are live services​, and apply this percentage to the total amount of times a component appears in code​ to estimate of the total amount of times a component appears in a live service​.
    </p>
    <p>
      If a service uses a component multiple times, only the first time is counted as this is the one that would have prevented additional spend by the team.
    </p>
  </div>
</details>

<hr style="border:none">

<h2 class="govuk-heading-l govuk-!-margin-bottom-2">The impact on people</h2>
<p class="secondary">
  Last updated: {{ peopleLastUpdated }}
</p>

### Adoption

<div class="govuk-grid-row govuk-body govuk-!-margin-bottom-5">
  <div class="headline-container govuk-grid-column-two-thirds">
    <div class="callout-card">
      <span class="medium-number">
        {{ useFrequency }}%
      </span>
      <p class="govuk-!-margin-bottom-0">
        of those asked use the Design System daily or a few times a week.
      </p>
    </div>
  </div>
</div>


### User sentiment

<div class="govuk-grid-row govuk-body govuk-!-margin-bottom-5">
  <div class="headline-container govuk-grid-column-one-half">
    <div class="callout-card">
      <span class="medium-number">
        {{ improvement }}%
      </span>
      <p class="govuk-!-margin-bottom-0">
        of those asked agreed or strongly agreed that the Design System improves the quality of their work and makes services more consistent and accessible.
      </p>
    </div>
  </div>
  <div class="headline-container govuk-grid-column-one-half">
    <div class="callout-card">
      <span class="medium-number">
        {{ timeSaving }}%
      </span>
      <p class="govuk-!-margin-bottom-0">
        of those asked agreed or strongly agreed that the Design System saves them time.
      </p>
    </div>
  </div>
</div>

### User satisfaction averages

<div class="govuk-grid-row govuk-body govuk-!-margin-bottom-5">
  <div class="headline-container govuk-grid-column-one-third">
    <div class="callout-card">
      <span class="medium-number">
        {{ overallSatisfaction }}<span class="out-of">/{{ outOf }}</span>
      </span>
      <p class="govuk-!-margin-bottom-0">
        when asked how satisfied they were overall with the Design System.
      </p>
    </div>
  </div>
  <div class="headline-container govuk-grid-column-one-third">
    <div class="callout-card">
      <span class="medium-number">
        {{ easeOfUse }}<span class="out-of">/{{ outOf }}</span>
      </span>
      <p class="govuk-!-margin-bottom-0">
        when asked how easy it was to use the Design System.
      </p>
    </div>
  </div>
  <div class="headline-container govuk-grid-column-one-third">
    <div class="callout-card">
      <span class="medium-number">
        {{ supportSatisfaction }}<span class="out-of">/{{ outOf }}</span>
      </span>
      <p class="govuk-!-margin-bottom-0">
        when asked how satisfied they were with support received from the MOJ Design System team.
      </p>
    </div>
  </div>
</div>

### User feedback

Users of the Design System were asked what they would like to see more of.

<blockquote>For departments to collaborate [...] and
share research</blockquote>

<blockquote>Making visible the research and data that fed into the component and
what services are using it</blockquote>

<blockquote>More components and patterns</blockquote>

<hr style="border:none">

<h2 class="govuk-heading-l govuk-!-margin-bottom-2">What's new</h2>
<p class="secondary">
  Last updated: {{ whatsNewLastUpdated }}
</p>

{% include "docs/whats-new.md" %}

<hr style="border:none">

## Wider adoption

The Design System is used by multiple other public sector organisations, including:

<!-- 3 line logos -->
<div class="govuk-grid-row govuk-body govuk-!-margin-top-8">
  <div class="govuk-grid-column-one-quarter">
    <img src="/assets/images/dept-logos/logo-desnz.svg" class="three-line logo" alt="">
  </div>
  <div class="govuk-grid-column-one-quarter">
    <img src="/assets/images/dept-logos/logo-dvsa.svg" class="three-line logo" alt="">
  </div>
  <div class="govuk-grid-column-one-quarter">
    <img src="/assets/images/dept-logos/logo-dwp.svg" class="three-line logo" alt="">
  </div>
  <div class="govuk-grid-column-one-quarter">
    <img src="/assets/images/dept-logos/logo-defra.svg" class="three-line logo" alt="">
  </div>
</div>
<div class="govuk-grid-row govuk-body govuk-!-margin-top-8">
  <div class="govuk-grid-column-one-quarter">
    <img src="/assets/images/dept-logos/logo-mhclg.svg" class="three-line logo" alt="">
  </div>
  <div class="govuk-grid-column-one-quarter">
    <img src="/assets/images/dept-logos/logo-dfe.svg" class="two-line logo" alt="">
  </div>
  <div class="govuk-grid-column-one-quarter">
    <img src="/assets/images/dept-logos/logo-hmcts.svg" class="two-line logo" alt="">
  </div>
  <div class="govuk-grid-column-one-quarter">
    <img src="/assets/images/dept-logos/logo-ukef.svg" class="two-line logo" alt="">
  </div>
</div>

<!-- 2 line logos -->
<div class="govuk-grid-row govuk-body govuk-!-margin-top-8">
</div>

<!-- 1 line logos -->
<div class="govuk-grid-row govuk-body govuk-!-margin-top-8">
  <div class="govuk-grid-column-one-third">
    <img src="/assets/images/dept-logos/logo-companies-house.svg" class="one-line logo" alt="">
  </div>
</div>

<!-- ALBs -->
<!-- <div class="govuk-grid-row govuk-body govuk-!-margin-top-8 alb">
  <div class="govuk-grid-column-one-third">
    <img src="/assets/images/dept-logos/logo-hmlr.svg" class="logo" alt="">
  </div>
  <div class="govuk-grid-column-one-third">
    <img src="/assets/images/dept-logos/logo-nhs.jpg" class="logo" alt="">
  </div>
  <div class="govuk-grid-column-one-third">
    <img src="/assets/images/dept-logos/logo-uk-space-agency.svg" class="logo" alt="">
  </div>
</div> -->


