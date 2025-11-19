---
layout: layouts/content.njk
subsection: About the Design System
title: Impact of the Design System
lede: Read how the MOJ Design System has reduced costs and helped users in MOJ (and beyond) by providing reusable building blocks to solve common problems.
eleventyNavigation:
  key: Impact
  parent: About the Design System
  order: 10
  excerpt: "Read how the MOJ Design System has reduced costs and helped users in MOJ (and beyond) by providing reusable building blocks to solve common problems."
---

<!-- Updated date -->
  {% set spendLastUpdated = "19 November 2025" %}
  {% set peopleLastUpdated = "19 November 2025" %}
  {% set whatsNewLastUpdated = "19 November 2025" %}

<!-- User satisfaction -->
  {% set overallSatisfaction = 3.7 %}
  {% set easeOfUse = 3.9 %}
  {% set supportSatisfaction = 4.3 %}
  {% set outOf = 5 %}

<!-- Adoption and sentiment -->
  {% set useFrequency = 86 %}
  {% set improvement = 100 %}
  {% set timeSaving = 98.6 %}

<div class="specify">

  <h2 class="govuk-heading-l govuk-!-margin-bottom-2">The impact on spending</h2>
  <p class="secondary">
    Last updated: {{ spendLastUpdated }}
  </p>

  It costs £5,000 (on average) for the Design System team to develop a reusable component. 

  Design System components are used 2,481 times in MOJ services.

  This counts the first time each component is used in a service. So if a service uses the button menu 50 times, for example, it'll be counted just once.

  Multiplied, this tells us the impact on spending.

  <div class="govuk-grid-row govuk-body govuk-!-margin-bottom-5 govuk-!-margin-top-8">
    <div class="headline-container govuk-grid-column-two-thirds govuk-!-margin-bottom-0">
        <div class="callout-card">
          <span class="big-number">
            £12.4M
          </span>
          <p class="lead">
            extra would have been spent without the MOJ Design System
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
        £5,000 is the average cost for a team to create a component, as estimated by the <a href="https://design-system.dwp.gov.uk/">DWP Design System</a> team. This includes discovery, design, development and QA/testing, as well as delivering the component for use across a large organisation.
      </p>
      <p><strong>How many times components are used across MOJ services</strong></p>
      <p>
        Access to detailed data about the use of components is limited, so we took a sample to estimate how many times they're likely to be used across all MOJ digital services.
      </p>
      <p>
        From a code search, we can understand the total amount of times a component appears in code across MOJ services​, and details of a sample of results, including whether the service is live or a prototype.
      </p>
      <p>
        This allows us to determine what percentage of the sample are live services​, and apply this percentage to the total amount of times a component appears in code​ to estimate of the total amount of times a component appears in a live service​.
      </p>
      <p>
        We only counted the first usage of each component in a service. This is because if a team had developed a component themselves it could be reused in the same way.
      </p>
    </div>
  </details>

  <hr style="border:none">

  <h2 class="govuk-heading-l govuk-!-margin-bottom-2">The impact on people</h2>
  <p class="impact secondary">
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


  ### Users' views

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

  ### User satisfaction scores (averages)

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
          when asked how satisfied they were with the support they got from the MOJ Design System team.
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
  <p class="impact secondary">
    Last updated: {{ whatsNewLastUpdated }}
  </p>

  ### Anyone at MOJ can now submit a component
  If an MOJ colleague uses the [submit a component](/contribute/add-new-component) form, their contribution will be added as an 'experimental' component and be available for reuse by others within 10 days.

  ### 4 'experimental' components added

  - [Calendar](/components/calendar)
  - [Inset text (highlighted)](/components/inset-text-highlighted)
  - [New features banner](/components/new-features-banner)
  - [Progress tracker](/components/progress-tracker)

  ### 3 components improved to 'official' status

  - [PDS (Probation Digital Services) header](/probation/components/pds-header/)
  - [PDS (Probation Digital Services) footer](/probation/components/pds-footer)
  - [Notification badge](/components/notification-badge)

  <hr style="border:none">

  ## Wider adoption

  The Design System is used by multiple other public sector organisations, including:

  <div class="govuk-grid-row govuk-body govuk-!-margin-top-8">
    <div class="govuk-grid-column-one-quarter specify">
      <img src="/assets/images/dept-logos/logo-desnz.png" class="logo" alt="Department for Energy Security and Net Zero logo">
    </div>
    <div class="govuk-grid-column-one-quarter specify">
      <img src="/assets/images/dept-logos/logo-dvsa.png" class="logo" alt="Driver and Vehicle Standards Agency logo">
    </div>
    <div class="govuk-grid-column-one-quarter specify">
      <img src="/assets/images/dept-logos/logo-dwp.png" class="logo" alt="Department for Work and Pensions logo">
    </div>
    <div class="govuk-grid-column-one-quarter specify">
      <img src="/assets/images/dept-logos/logo-defra.png" class="logo" alt="Department for Environment Food and Rural Affairs logo">
    </div>
  </div>
  <div class="govuk-grid-row govuk-body govuk-!-margin-top-8">
    <div class="govuk-grid-column-one-quarter specify">
      <img src="/assets/images/dept-logos/logo-mhclg.png" class="logo" alt="Ministry of Housing, Communitieis and Local Government logo">
    </div>
    <div class="govuk-grid-column-one-quarter specify">
      <img src="/assets/images/dept-logos/logo-dfe.png" class="logo" alt="Department for Education logo">
    </div>
    <div class="govuk-grid-column-one-quarter specify">
      <img src="/assets/images/dept-logos/logo-hmcts.png" class="logo" alt="HM Courts and Tribunals Service logo">
    </div>
    <div class="govuk-grid-column-one-quarter specify">
      <img src="/assets/images/dept-logos/logo-ukef.png" class="logo" alt="UK Export Finance logo">
    </div>
  </div>
  <div class="govuk-grid-row govuk-body govuk-!-margin-top-8">
    <div class="govuk-grid-column-one-quarter specify">
      <img src="/assets/images/dept-logos/logo-companies-house.png" class="logo" alt="Companies House logo">
    </div>
  </div>

</div>
