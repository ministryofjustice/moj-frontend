---
layout: layouts/content.njk
subsection: About the Design System
title: Impact of the Design System
lede: The MOJ Design System has reduced costs and helped teams in MOJ (and beyond) 

spendLastUpdated: 20 February 2026

overallSatisfaction: 3.7
easeOfUse: 3.9
supportSatisfaction: 4.3
outOf: 5

useFrequency: 86
improvement: 100
timeSaving: 98.6

eleventyNavigation:
  key: Impact
  parent: About the Design System
  order: 10
  excerpt: "The MOJ Design System has reduced costs and helped teams in MOJ (and beyond)."
---

<div class="design-system-impact">

  <h2 class="govuk-heading-l govuk-!-margin-bottom-2">How the MOJ Design System saves money</h2>
  <p class="secondary">
    Last updated: {{ spendLastUpdated }}
  </p>

<div class="govuk-grid-row govuk-body govuk-!-margin-bottom-5 govuk-!-margin-top-8">
    <div class="govuk-grid-column-two-thirds govuk-!-margin-bottom-0">
        <div class="callout-card extra">
          <span class="big-number">
            £12.4M
          </span>
          <p class="lead">
            How much MOJ would need to spend if it didn't have a Design System 
          </p>
        </div>
      </div>
    </div>

 MOJ teams have added MOJ Design System components to their services an estimated 2,481 times.  
 
 Without the Design System, teams would have to design and build components themselves every time they were needed. This would cost an estimated £5,000 per component. 
 
 £12.4m is the cost of building each component (£5,000) multiplied by the amount of times they'd be built (2,481).  

  <details class="govuk-details">
    <summary class="govuk-details__summary">
      <span class="govuk-details__summary-text">
        Find out more about the calculation
      </span>
    </summary>
    <div class="govuk-details__text">
      <p><strong>The average cost of developing a reusable component</strong></p>
      <p>
        The <a href="https://design-system.dwp.gov.uk/">DWP Design System</a> team estimated that it costs £5,000 (on average) for a team to develop a component. This is for discovery, design, development, QA/testing, and delivering the component for use.
        </p>
      <p><strong>How many times components are used across MOJ services</strong></p>
      <p>
      There's limited detailed data about component use, so we took a sample to estimate how many times they're likely to be used across all MOJ services.
      </p>
      <p>
      We did a search to view the amount of times a component appears in code across MOJ services​.
      </p>
      <p>
      We determined the sample percentage that were in live services​, and applied that percentage to the total that the component appeared in code. This gave us an estimate of how often a component is in a live service​.
      </p>
      <p>
        We only counted the first time a component was used in a service. This is because when a team develops a component they can use it throughout their service.
      </p>
    </div>
  </details>

  <h2 class="govuk-heading-l govuk-!-margin-bottom-2">The impact on people</h2>
  <p>
    A October 2025 survey asked people how the Design System impacted them.
  </p>

  ### Adoption

  <div class="govuk-grid-row govuk-body govuk-!-margin-bottom-5">
    <div class="govuk-grid-column-two-thirds">
      <div class="callout-card">
        <span class="medium-number">
          {{ useFrequency }}%
        </span>
        <p class="govuk-!-margin-bottom-0">
          use the Design System daily or a few times a week.
        </p>
      </div>
    </div>
  </div>


  ### User views

  <div class="govuk-grid-row govuk-body govuk-!-margin-bottom-5">
    <div class="govuk-grid-column-one-half">
      <div class="callout-card">
        <span class="medium-number">
          {{ improvement }}%
        </span>
        <p class="govuk-!-margin-bottom-0">
          agreed or strongly agreed that the Design System improves the quality of their work and makes services more consistent and accessible.
        </p>
      </div>
    </div>
    <div class="govuk-grid-column-one-half">
      <div class="callout-card">
        <span class="medium-number">
          {{ timeSaving }}%
        </span>
        <p class="govuk-!-margin-bottom-0">
          agreed or strongly agreed that the Design System saves them time.
        </p>
      </div>
    </div>
  </div>

  ### User satisfaction scores  

  <div class="govuk-grid-row govuk-body govuk-!-margin-bottom-5">
    <div class="govuk-grid-column-one-third">
      <div class="callout-card">
        <span class="medium-number">
          {{ overallSatisfaction }}<span class="out-of">/{{ outOf }}</span>
        </span>
        <p class="govuk-!-margin-bottom-0">
          overall satisfaction with the Design System.
        </p>
      </div>
    </div>
    <div class="govuk-grid-column-one-third">
      <div class="callout-card">
        <span class="medium-number">
          {{ easeOfUse }}<span class="out-of">/{{ outOf }}</span>
        </span>
        <p class="govuk-!-margin-bottom-0">
          how easy it is to use the Design System.
        </p>
      </div>
    </div>
    <div class="govuk-grid-column-one-third">
      <div class="callout-card">
        <span class="medium-number">
          {{ supportSatisfaction }}<span class="out-of">/{{ outOf }}</span>
        </span>
        <p class="govuk-!-margin-bottom-0">
          satisfaction with the support from the MOJ Design System team.
        </p>
      </div>
    </div>
  </div>

  ### User feedback

  Design System users were asked what they'd like more of:

  <blockquote>For departments to collaborate [...] and
  share research</blockquote>

  <blockquote>Making visible the research and data that fed into the component and
  what services are using it</blockquote>

  <blockquote>More components and patterns</blockquote>

  <hr style="border:none">
  

  ## Wider adoption

  The Design System is used by many public sector organisations, including:

  <div class="govuk-grid-row govuk-body govuk-!-margin-top-8">
    <div class="govuk-grid-column-one-quarter design-system-impact">
      <img src="/assets/images/dept-logos/logo-desnz.png" class="logo" alt="Department for Energy Security and Net Zero logo">
    </div>
    <div class="govuk-grid-column-one-quarter design-system-impact">
      <img src="/assets/images/dept-logos/logo-dvsa.png" class="logo" alt="Driver and Vehicle Standards Agency logo">
    </div>
    <div class="govuk-grid-column-one-quarter design-system-impact">
      <img src="/assets/images/dept-logos/logo-dwp.png" class="logo" alt="Department for Work and Pensions logo">
    </div>
    <div class="govuk-grid-column-one-quarter design-system-impact">
      <img src="/assets/images/dept-logos/logo-defra.png" class="logo" alt="Department for Environment Food and Rural Affairs logo">
    </div>
  </div>
  <div class="govuk-grid-row govuk-body govuk-!-margin-top-8">
    <div class="govuk-grid-column-one-quarter design-system-impact">
      <img src="/assets/images/dept-logos/logo-mhclg.png" class="logo" alt="Ministry of Housing, Communitieis and Local Government logo">
    </div>
    <div class="govuk-grid-column-one-quarter design-system-impact">
      <img src="/assets/images/dept-logos/logo-dfe.png" class="logo" alt="Department for Education logo">
    </div>
    <div class="govuk-grid-column-one-quarter design-system-impact">
      <img src="/assets/images/dept-logos/logo-hmcts.png" class="logo" alt="HM Courts and Tribunals Service logo">
    </div>
    <div class="govuk-grid-column-one-quarter design-system-impact">
      <img src="/assets/images/dept-logos/logo-ukef.png" class="logo" alt="UK Export Finance logo">
    </div>
  </div>
  <div class="govuk-grid-row govuk-body govuk-!-margin-top-8">
    <div class="govuk-grid-column-one-quarter design-system-impact">
      <img src="/assets/images/dept-logos/logo-companies-house.png" class="logo" alt="Companies House logo">
    </div>
  </div>

</div>
