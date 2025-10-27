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
  {% set lastUpdated = "XX October 2025" %}

<!-- User satisfaction -->
  {% set overallSatisfaction = 3.8 %}
  {% set easeOfUse = 4 %}
  {% set supportSatisfaction = 4.3 %}
  {% set outOf = 5 %}

<!-- Adoption and sentiment -->
  {% set useFrequency = 83 %}
  {% set improvement = 50 %}

<!-- Achievements this quarter -->

  {% set componentsArchived = 0 %}
  {% set componentsImproved = 2 %}
  {% set componentsAdded = 6 %}

<!-- Total components BEFORE these changes -->
  {% set totalComponents = 24 %} 

<!-- Prefix for change in available components -->
  {% if (componentsAdded - componentsArchived) > 0 %}
  {% set prefix = "+" %}
  {% else %}
  {% set prefix = "" %}
  {% endif %}

<!-- Percentage change in available components -->
  {% set changeAvailableComponents = (((componentsAdded - componentsArchived) / totalComponents) * 100) | round(1) %}
  {% set changeImprovedComponents = ((componentsImproved / totalComponents) * 100) | round(1) %}





<p>
  Last updated: {{ lastUpdated }}
</p>

<hr style="border:none">

## The impact on spending

The average cost of developing a reusable component is £5,000.

The amount of times Design System components are initially used in MOJ services is 2,481.

This does not count multiple uses of the same component in a single service. For example, if a service uses the Date picker component 50 times, only 1 instance is counted.

<!-- £5,000 is the average cost of developing a reusable component.

2,481 is the amount of times Design System components are initially used in MOJ services. This does not count multiple uses of the same component in a single service. -->

Multiplied, this tells us the impact on spending.

<div class="govuk-grid-row govuk-body govuk-!-margin-bottom-5 govuk-!-margin-top-8">
  <div class="headline-container govuk-grid-column-two-thirds govuk-!-margin-bottom-0">
      <div class="callout-card">
        <!-- <p class="lead">
          £5,000 &times; 2,481 &equals;
        </p> -->
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

## The impact on people

### User satisfaction

<div class="govuk-grid-row govuk-body govuk-!-margin-bottom-5">
  <div class="headline-container govuk-grid-column-one-third">
    <div class="callout-card">
      <span class="medium-number">
        {{ overallSatisfaction }}<span class="out-of">/{{ outOf }}</span>
      </span>
      <p class="govuk-!-margin-bottom-0">
        overall satisfaction
      </p>
    </div>
  </div>
  <div class="headline-container govuk-grid-column-one-third">
    <div class="callout-card">
      <span class="medium-number">
        {{ easeOfUse }}<span class="out-of">/{{ outOf }}</span>
      </span>
      <p class="govuk-!-margin-bottom-0">
        ease of use
      </p>
    </div>
  </div>
  <div class="headline-container govuk-grid-column-one-third">
    <div class="callout-card">
      <span class="medium-number">
        {{ supportSatisfaction }}<span class="out-of">/{{ outOf }}</span>
      </span>
      <p class="govuk-!-margin-bottom-0">
        support satisfaction
      </p>
    </div>
  </div>
</div>

### Adoption and sentiment

<div class="govuk-grid-row govuk-body govuk-!-margin-bottom-5">
  <div class="headline-container govuk-grid-column-one-third">
    <div class="callout-card">
      <span class="medium-number">
        {{ useFrequency }}%
      </span>
      <p class="govuk-!-margin-bottom-0">
        asked use the MOJ Design System daily, or a few times a week.
      </p>
    </div>
  </div>
  <div class="headline-container govuk-grid-column-two-thirds">
    <div class="callout-card">
      <span class="medium-number">
        {{ improvement }}%
      </span>
      <p class="govuk-!-margin-bottom-0">
        asked strongly agreed that the MOJ Design System saves them time and improves the quality of their work, and makes services more consistent and accessible.
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

## Achievements this quarter

<div class="govuk-grid-row govuk-body govuk-!-margin-bottom-5">
  <div class="headline-container govuk-grid-column-full">

### Product improvements

<div class="headline-container callout-card">
  <p class="lead">
    Anyone at MOJ can now <a href="/contribute/add-new-component/start">submit a component</a> and see it in the Design System within 10 days.
  </p>
</div>

### Components

<div class="govuk-grid-row govuk-body govuk-!-margin-bottom-5">
  <div class="headline-container govuk-grid-column-one-half">
    <div class="callout-card">
      <span class="medium-number">      
        {{ prefix }}{{ changeAvailableComponents }}%
      </span>
      <p>
        <strong>change in components available</strong>
      </p>
      <p class="govuk-!-margin-bottom-0">({{ componentsAdded }} components added, {{ componentsArchived }} components archived)</p>
    </div>
  </div>
  <div class="headline-container govuk-grid-column-one-half">
    <div class="callout-card">
      <span class="medium-number">
        +{{ changeImprovedComponents }}%
      </span>
      <p>
        <strong>increase in components improved</strong>
      </p>
      <p class="govuk-!-margin-bottom-0">({{ componentsImproved }} components improved to 'Official' status)</p>
    </div>
  </div>
</div>

<hr style="border:none">

## Wider adoption

The Design System is used by multiple other public sector organisations, including:

<div class="logo-grid">
  <div class="logo-item">
    <img src="/assets/images/dept-logos/logo-companies-house.svg" alt="">
  </div>
  <div class="logo-item">
    <img src="/assets/images/dept-logos/logo-cps.svg" alt="">
  </div>
  <div class="logo-item">
    <img src="/assets/images/dept-logos/logo-defra.png" alt="">
  </div>
  <div class="logo-item">
    <img src="/assets/images/dept-logos/logo-desnz.svg" alt="">
  </div>
  <div class="logo-item">
    <img src="/assets/images/dept-logos/logo-dfe.png" alt="">
  </div>
  <div class="logo-item">
    <img src="/assets/images/dept-logos/logo-dvsa.svg" alt="">
  </div>
  <div class="logo-item">
    <img src="/assets/images/dept-logos/logo-dwp.svg" alt="">
  </div>
  <div class="logo-item">
    <img src="/assets/images/dept-logos/logo-hmcts.png" alt="">
  </div>
  <div class="logo-item">
    <img src="/assets/images/dept-logos/logo-hmlr.svg" alt="">
  </div>
  <div class="logo-item">
    <img src="/assets/images/dept-logos/logo-mhclg.png" alt="">
  </div>
  <div class="logo-item">
    <img src="/assets/images/dept-logos/logo-nhs.jpg" alt="">
  </div>
  <div class="logo-item">
    <img src="/assets/images/dept-logos/logo-ofqual.png" alt="">
  </div>
  <div class="logo-item">
    <img src="/assets/images/dept-logos/logo-tpr.svg" alt="">
  </div>
  <div class="logo-item">
    <img src="/assets/images/dept-logos/logo-uk-space-agency.png" alt="">
  </div>
  <div class="logo-item">
    <img src="/assets/images/dept-logos/logo-ukef.png" alt="">
  </div>
</div>


---

1. £5,000 is the average cost for a team to create a component, as estimated by the DWP Design System team. This includes the necessary discovery, design, development, and QA/testing, as well as delivering the component to the required standard for use across a large organisation.​

2. From a code search, we can understand the total amount of times a component appears in code across MOJ services​, and details of a sample of results, including whether the service is live or a prototype. With this information, we can then determine what percentage of the sample are live services​, and apply this percentage to the total amount of times a component appears in code​ to estimate of the total amount of times a component appears in a live service​

<!-- **83%** of users asked use the MOJ Design System **daily**, or **a few times a week**

**50%** of users asked **strongly agreed** that the MOJ Design System saves them time and **improves the quality of their work**, and makes services more **consistent and accessible**. -->

<!-- Calcs -->

<!-- {% set total = 0 %}
{% for name, stats in impact %}
  {% set total = total + stats.hours_saved %}
{% endfor %}
**Total Hours Saved: {{ total | round(2) }}**

Date Picker prod usage: **{{ impact.date_picker.prod_usage }}** -->

