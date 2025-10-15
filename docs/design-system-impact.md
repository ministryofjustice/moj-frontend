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

## Additional spend avoided

<div class="headline-container callout-card">
  <span class="big-number">
    £12.4M
  </span>
  <p class="lead">
    additional spending has been avoided to date through teams using components from the MOJ Design System.
  </p>
</div>

<details class="govuk-details">
  <summary class="govuk-details__summary">
    <span class="govuk-details__summary-text">
      How was this calculated?
    </span>
  </summary>
  <div class="govuk-details__text">
    <p><strong>£5,000</strong> is the average cost of developing a reusable component.</p>
    <p><strong>2,481</strong> is the amount of times components are used in live MOJ services.</p>
    <p>Multiplied, this tells us that an additional <strong>£12.4M</strong> would have been spent on making components on a per-service basis, if the Design System did not exist.</p>
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

<ul class="comma-separated govuk-body">
  <li><a href="https://www.gov.uk/government/organisations/department-for-energy-security-and-net-zero">DESNZ</a></li>
  <li><a href="https://www.gov.uk/government/organisations/central-digital-and-data-office">CDDO</a></li>
  <li><a href="https://www.gov.uk/government/organisations/civil-service-hr">Civil Service HR</a></li>
  <li><a href="https://www.gov.uk/government/organisations/companies-house">Companies House</a></li>
  <li><a href="https://www.gov.uk/government/organisations/crown-prosecution-service">Crown Prosecution Service</a></li>
  <li><a href="https://www.gov.uk/government/organisations/department-for-environment-food-rural-affairs">DEFRA</a></li>
  <li><a href="https://www.gov.uk/government/organisations/department-for-education">DFE</a></li>
  <li><a href="https://www.gov.uk/government/organisations/driver-and-vehicle-standards-agency">DVSA</a></li>
  <li><a href="https://www.gov.uk/government/organisations/department-for-work-pensions">DWP</a></li>
  <li><a href="https://www.gov.uk/government/organisations/hm-courts-and-tribunals-service">HMCTS</a></li>
  <li><a href="https://www.gov.uk/government/organisations/land-registry">HMLR</a></li>
  <li><a href="https://www.gov.uk/government/organisations/judicial-appointments-commission">Judicial Appointments Commission UK</a></li>
  <li><a href="https://www.gov.uk/government/organisations/ministry-of-housing-communities-and-local-government">MHCLG</a></li>
  <li><a href="https://www.gov.uk/government/organisations/nhs-business-services-authority">NHS Business Services Authority</a></li>
  <li><a href="https://digital.nhs.uk/">NHS Digital</a></li>
  <li><a href="https://www.gov.uk/government/organisations/ofqual">Ofqual</a></li>
  <li><a href="https://www.gov.uk/government/organisations/planning-inspectorate">Planning Inspectorate</a></li>
  <li><a href="https://www.gov.uk/government/organisations/skills-funding-agency">Skills Funding Agency</a></li>
  <li><a href="https://www.gov.uk/government/organisations/the-pensions-regulator">The Pensions Regulator</a></li>
  <li><a href="https://www.gov.uk/government/organisations/uk-export-finance">UK Export Finance</a></li>
  <li><a href="https://www.gov.uk/government/organisations/office-for-equality-and-opportunity">UK Government Office for Equality and Opportunity</a></li>
  <li><a href="https://www.gov.uk/government/organisations/uk-space-agency">UK Space Agency</a></li>
</ul>

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

