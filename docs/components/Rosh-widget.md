---
title: Rosh widget
tabs: true
status: Experimental
statusDate: September 2025
excerpt: ""
lede: ""
githuburl: https://github.com/ministryofjustice/moj-frontend/discussions/categories/experimental-components-pages-and-patterns


---

{% tabs "paginate" %}
{% tab "Overview" %}

<div class="img-container">
  <img src="/assets/images/submission-1757078236496/Screenshot-2025-09-05-at-14.09.41.png" alt="Rosh widget" />
</div>

## Overview
The Risk of Serious Harm (RoSH) widget presents a clear, at-a-glance summary of an individual’s assessed risk. It draws data from the OASys risk assessment system and displays the overall RoSH level (low, medium, high, or very high), the date of the most recent update, and specific risks to different groups in both community and custody contexts.

The information is shown in a simple table format, using both words and colour coding to communicate risk levels consistently. Categories of potential victims include children, the public, known adults, staff, and prisoners. Where a category does not apply, “N/A” is displayed. Variations exist to show risks for community, custody, both contexts, or when risk information is unknown.

The widget includes states for “UNKNOWN LEVEL RoSH” where a summary has not been completed or where information cannot be obtained. Distinct outlines and explanatory text are used to prevent confusion, ensuring users understand whether risk information is missing or unavailable. Accessibility updates have been implemented, including colour contrast compliance and responsive design fixes for magnification. A Figma library of risk components is available for design use.

### How the component is currently used

The RoSH widget is used across multiple HMPPS digital services to support probation and prison staff, as well as third-party service providers. It enables users to quickly understand an individual’s risk level without needing to navigate away from their task, helping them form a picture of risks and needs efficiently.

It is currently live or in public beta in services including Community Payback Assessment, Refer and Monitor an Intervention (Accommodation referral), Manage a Workforce, Deciding if Someone Should be Recalled, Approved Premises, and Manage POM Cases.

The widget helps probation staff, prison staff, and third-party providers by:

quickly showing the overall RoSH score

breaking down risks by group and context (community or custody)

providing a consistent way of displaying risk across services

supporting external providers in assessing new referrals

User research highlighted that “NO RoSH” was being interpreted as “LOW RoSH.” This was updated to “UNKNOWN LEVEL RoSH” with clearer messaging, prompting users to confirm details in OASys when needed. This change improves accuracy and reduces the risk of misinterpretation.

The widget is particularly useful in sidebars, task lists, or documents such as Community Payback Assessment PDFs, where quick reference to risk levels is essential.

### Contribute to this component
You can help develop this component by adding information to the [Rosh widget Github discussion]({{ githuburl }}). This helps other people to use it in their service.

{% endtab %}

{% tab "Designs" %}

## Designs

A Figma design has been added for this component. There may be more links and resources in the [Rosh widget Github discussion]({{ githuburl }}).


### Figma

      [View the Rosh widget component in the MoJ Figma Kit (opens in a new tab)]()


### Contribute prototypes and Figma links

      If you have design files that are relevant to this component you can add them to the [Github discussion]({{ githuburl }}). This helps other people to use it in their service.

{% endtab %}

{% tab "Accessibility" %}

## Accessibility

Accessibility findings have been added for this component. There may be more findings in the [Rosh widget Github discussion]({{ githuburl }}).


### External audit

* Conducted by: DAC
* Date: 28 February 2022

#### Audit findings

N/A
### Assistive Technology testing

Date: 28 February 2022

#### Testing details

N/A

## Contribute accessibility findings

    If you have accessibility findings that are relevant to this component you can add them to the [Github discussion]({{ githuburl }}). This helps other people to use it in their service.

{% endtab %}

{% tab "Code" %}

## Code

Code has been added for this component. There may be other code blocks in the [Rosh widget Github discussion]({{ githuburl }}).


### Code block 1: html

<div class="app-example__code" data-module="app-copy">

```html
{% raw %}
 <div class="govuk-grid-column-one-third">
    <h3 class="govuk-heading-m">Assessment tools</h3>
    <div class="rosh-widget rosh-widget--medium">
      <h3 class="govuk-heading-m"><strong>Medium</strong> RoSH</h3>
      <p class="govuk-body-m">Risk of serious harm
        <br /><span class="govuk-body-s secondary-text-col">Last updated: {{ moment().subtract(5, 'days').format("D MMMM YYYY") }}</span>
        <br /><span class="govuk-body-s secondary-text-col">Update by: Court duty officer</span>
      </p>
      <table class="govuk-table govuk-table-xl">
        <thead class="govuk-table__head">
          <tr class="govuk-table__row">
            <th scope="col" class="govuk-table__header">Risk to</th>
            <th scope="col" class="govuk-table__header">Community</th>
          </tr>
        </thead>
        <tbody class="govuk-table__body">
          <tr class="govuk-table__row">
            <td class="govuk-table__cell">Children</td>
            <td class="govuk-table__cell"><strong>Low</strong></td>
          </tr>
          <tr class="govuk-table__row">
            <td class="govuk-table__cell">Public</td>
            <td class="govuk-table__cell"><strong>Low</strong></td>
          </tr>
          <tr class="govuk-table__row">
            <td class="govuk-table__cell">Known adult</td>
            <td class="govuk-table__cell rosh-widget__risk--medium"><strong>Medium</strong></td>
          </tr>
          <tr class="govuk-table__row">
            <td class="govuk-table__cell">Staff</td>
            <td class="govuk-table__cell rosh-widget__risk--medium"><strong>Medium</strong></td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="rosh-widget rosh-widget--high">
      <h3 class="govuk-heading-m"><strong>High</strong> RSR <span>6.9%</span></h3>
      <p class="govuk-body-m">Risk of serious recidivism
        <br /><span class="govuk-body-s secondary-text-col">Last updated: {{ moment().subtract(320, 'days').format("D MMMM YYYY") }}</span>
        <br /><span class="govuk-body-s secondary-text-col">Update by: Probation practitioner</span>
      </p>
    </div>
    <div class="rosh-widget rosh-widget--medium">
      <h3 class="govuk-heading-m"><strong>Medium</strong> OGRS <span>64%</span></h3>
      <p class="govuk-body-m">Offender group reconviction scale
        <br /><span class="govuk-body-s secondary-text-col">Last updated: {{ moment().subtract(320, 'days').format("D MMMM YYYY") }}</span>
        <br /><span class="govuk-body-s secondary-text-col">Update by: Probation practitioner</span>
      </p>
    </div>
  </div>
{% endraw %}
```

</div>



### Code block 2: css

<div class="app-example__code" data-module="app-copy">

```css
{% raw %}
//
// For guidance on how to add CSS and SCSS see:
// https://prototype-kit.service.gov.uk/docs/adding-css-javascript-and-images
// 

// Add extra styles here


@import "hmpps/global"; // styles that affect all screens - mainly screen width
@import "hmpps/index"; // Prototpye index page styles
@import "hmpps/capacity"; // components used to display capacity info
@import "hmpps/case"; // case-specific styles
@import "hmpps/team-view"; // rules for the team overview screens
@import "hmpps/filter"; // bespoke ules for the team filter
@import "components/summary-card";
@import "components/option-select";
@import "components/cards";
@import "components/filter-cases";

// Risk scores styling from ARN
@import "risk/predictor-scores";
@import "risk/widgets";
@import "risk/timeline";

.gem-c-feedback {
    background: #fff;
    margin-top: 30px
}

@media (min-width: 48.0625em) {
    .gem-c-feedback {
        margin-top:60px
    }
}

@media (max-width: 40.0525em) {
    .gem-c-feedback {
        margin-right:-15px;
        margin-left: -15px
    }
}

@media (min-width: 40.0625em) and (max-width: 48.0525em) {
    .gem-c-feedback {
        margin-right:-30px;
        margin-left: -30px
    }
}

.gem-c-feedback [hidden] {
    display: none !important
}

.gem-c-feedback__prompt {
    background-color: #f3f2f1;
    color: #0b0c0c;
    border-top: 1px solid #b1b4b6;
    outline: 0
}

.gem-c-feedback__prompt-content {
    display: flex;
    flex-direction: column;
    padding: 0 15px
}

@media (min-width: 40.0625em) {
    .gem-c-feedback__prompt-content {
        flex-direction:row;
        align-items: center;
        justify-content: space-between
    }
}

.gem-c-feedback__prompt-questions {
    text-align: left;
    padding: 20px 0
}

@media (min-width: 40.0625em) {
    .gem-c-feedback__prompt-questions {
        margin:0 15px
    }
}

.gem-c-feedback__prompt-questions--something-is-wrong {
    border-top: 1px solid #b1b4b6
}

@media (min-width: 40.0625em) {
    .gem-c-feedback__prompt-questions--something-is-wrong {
        border:0
    }
}

.gem-c-feedback__prompt-question-answer {
    display: flex;
    align-items: center
}

@media (max-width: 19.99em) {
    .gem-c-feedback__prompt-question-answer {
        justify-content:center;
        flex-wrap: wrap
    }
}

.gem-c-feedback__prompt-question,.gem-c-feedback__prompt-success {
    font-family: "GDS Transport",arial,sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-weight: 700;
    font-size: 16px;
    font-size: 1rem;
    line-height: 1.25
}

@media print {
    .gem-c-feedback__prompt-question,.gem-c-feedback__prompt-success {
        font-family: sans-serif
    }
}

@media (min-width: 40.0625em) {
    .gem-c-feedback__prompt-question,.gem-c-feedback__prompt-success {
        font-size:19px;
        font-size: 1.1875rem;
        line-height: 1.3157894737
    }
}

@media print {
    .gem-c-feedback__prompt-question,.gem-c-feedback__prompt-success {
        font-size: 14pt;
        line-height: 1.15
    }
}

@media (min-width: 40.0625em) {
    .gem-c-feedback__prompt-question,.gem-c-feedback__prompt-success {
        font-family:"GDS Transport", arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        font-weight: 700;
        font-size: 14px;
        font-size: .875rem;
        line-height: 1.1428571429
    }
}

@media print and (min-width: 40.0625em) {
    .gem-c-feedback__prompt-question,.gem-c-feedback__prompt-success {
        font-family:sans-serif
    }
}

@media (min-width: 40.0625em) and (min-width: 40.0625em) {
    .gem-c-feedback__prompt-question,.gem-c-feedback__prompt-success {
        font-size:16px;
        font-size: 1rem;
        line-height: 1.25
    }
}

@media print and (min-width: 40.0625em) {
    .gem-c-feedback__prompt-question,.gem-c-feedback__prompt-success {
        font-size:14pt;
        line-height: 1.2
    }
}

.gem-c-feedback__prompt-question {
    margin: 0;
    padding-bottom: 10px
}

.gem-c-feedback__prompt-question:focus {
    outline: 0
}

@media (min-width: 20em) {
    .gem-c-feedback__prompt-question {
        padding-bottom:0;
        margin-right: 10px
    }
}

@media (min-width: 48.0625em) {
    .gem-c-feedback__prompt-question {
        margin-right:20px
    }
}

.gem-c-feedback__prompt-link {
    font-family: "GDS Transport",arial,sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-weight: 400;
    font-size: 16px;
    font-size: 1rem;
    line-height: 1.25;
    background: transparent;
    color: #0b0c0c;
    box-shadow: 0 3px 0 #0b0c0c;
    border: 1px #0b0c0c solid;
    margin-bottom: 0;
    width: 100%
}

@media print {
    .gem-c-feedback__prompt-link {
        font-family: sans-serif
    }
}

@media (min-width: 40.0625em) {
    .gem-c-feedback__prompt-link {
        font-size:19px;
        font-size: 1.1875rem;
        line-height: 1.3157894737
    }
}

@media print {
    .gem-c-feedback__prompt-link {
        font-size: 14pt;
        line-height: 1.15
    }
}

@media (min-width: 40.0625em) {
    .gem-c-feedback__prompt-link {
        font-family:"GDS Transport", arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        font-weight: 400;
        font-size: 14px;
        font-size: .875rem;
        line-height: 1.1428571429
    }
}

@media print and (min-width: 40.0625em) {
    .gem-c-feedback__prompt-link {
        font-family:sans-serif
    }
}

@media (min-width: 40.0625em) and (min-width: 40.0625em) {
    .gem-c-feedback__prompt-link {
        font-size:16px;
        font-size: 1rem;
        line-height: 1.25
    }
}

@media print and (min-width: 40.0625em) {
    .gem-c-feedback__prompt-link {
        font-size:14pt;
        line-height: 1.2
    }
}

.gem-c-feedback__prompt-link:focus,.gem-c-feedback__prompt-link:focus:not(:active):not(:hover) {
    background: #fd0;
    border-color: #0b0c0c;
    box-shadow: 0 5px 0 #0b0c0c
}

.gem-c-feedback__prompt-link:active {
    color: #0b0c0c
}

.gem-c-feedback__prompt-link:hover {
    background: #b1b4b6;
    color: #0b0c0c
}

.gem-c-feedback__prompt-link:link,.gem-c-feedback__prompt-link:visited {
    color: #0b0c0c
}

.gem-c-feedback__prompt-link:link:focus,.gem-c-feedback__prompt-link:link:active,.gem-c-feedback__prompt-link:visited:focus,.gem-c-feedback__prompt-link:visited:active {
    color: #0b0c0c
}

.gem-c-feedback__option-list {
    display: flex;
    list-style-type: none;
    margin: 0;
    padding: 0
}

.gem-c-feedback__option-list-item:last-child {
    margin-left: 10px
}

@media (min-width: 48.0625em) {
    .gem-c-feedback__option-list-item:last-child {
        margin-left:20px
    }
}

.gem-c-feedback__option-list-item .gem-c-feedback__prompt-link {
    min-width: 100px
}

@media (max-width: 48.0525em) {
    .gem-c-feedback__option-list-item .gem-c-feedback__prompt-link {
        min-width:80px
    }
}

.gem-c-feedback__error-summary {
    margin-bottom: 15px;
    padding: 15px;
    border: solid 4px #d4351c;
    clear: both
}

.gem-c-feedback__error-summary:focus {
    outline: solid 3px #fd0
}

@media (min-width: 48.0625em) {
    .gem-c-feedback__error-summary {
        border-width:5px
    }
}

.gem-c-feedback__error-summary h2 {
    color: #0b0c0c;
    font-family: "GDS Transport",arial,sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-weight: 700;
    font-size: 18px;
    font-size: 1.125rem;
    line-height: 1.1111111111;
    margin: 0 0 15px 0
}

@media print {
    .gem-c-feedback__error-summary h2 {
        color: #000
    }
}

@media print {
    .gem-c-feedback__error-summary h2 {
        font-family: sans-serif
    }
}

@media (min-width: 40.0625em) {
    .gem-c-feedback__error-summary h2 {
        font-size:24px;
        font-size: 1.5rem;
        line-height: 1.25
    }
}
{% endraw %}
```

</div>

#### How to use the code

There was a 10,000 character limit on the code so I couldn't paste it all in. This is the first half'ish of the code.


### Code block 3: css

<div class="app-example__code" data-module="app-copy">

```css
{% raw %}
@media print {
    .gem-c-feedback__error-summary h2 {
        font-size: 18pt;
        line-height: 1.15
    }
}

.gem-c-feedback__error-summary p {
    color: #0b0c0c;
    font-family: "GDS Transport",arial,sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-weight: 400;
    font-size: 16px;
    font-size: 1rem;
    line-height: 1.25;
    margin: 0 0 15px 0
}

@media print {
    .gem-c-feedback__error-summary p {
        color: #000
    }
}

@media print {
    .gem-c-feedback__error-summary p {
        font-family: sans-serif
    }
}

@media (min-width: 40.0625em) {
    .gem-c-feedback__error-summary p {
        font-size:19px;
        font-size: 1.1875rem;
        line-height: 1.3157894737
    }
}

@media print {
    .gem-c-feedback__error-summary p {
        font-size: 14pt;
        line-height: 1.15
    }
}

.gem-c-feedback__error-summary a {
    font-family: "GDS Transport",arial,sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-decoration: underline;
    text-decoration-thickness: max(1px, .0625rem);
    text-underline-offset: .1578em
}

@media print {
    .gem-c-feedback__error-summary a {
        font-family: sans-serif
    }
}

.gem-c-feedback__error-summary a:hover {
    text-decoration-thickness: max(3px, .1875rem, .12em);
    -webkit-text-decoration-skip-ink: none;
    text-decoration-skip-ink: none;
    -webkit-text-decoration-skip: none;
    text-decoration-skip: none
}

.gem-c-feedback__error-summary a:focus {
    outline: 3px solid transparent;
    color: #0b0c0c;
    background-color: #fd0;
    box-shadow: 0 -2px #fd0,0 4px #0b0c0c;
    text-decoration: none;
    -webkit-box-decoration-break: clone;
    box-decoration-break: clone
}

.gem-c-feedback__error-summary a:link {
    color: #1d70b8
}

.gem-c-feedback__error-summary a:visited {
    color: #4c2c92
}

.gem-c-feedback__error-summary a:hover {
    color: #003078
}

.gem-c-feedback__error-summary a:active {
    color: #0b0c0c
}

.gem-c-feedback__error-summary a:focus {
    color: #0b0c0c
}

@media print {
    .gem-c-feedback__error-summary a[href^="/"]:after,.gem-c-feedback__error-summary a[href^="http://"]:after,.gem-c-feedback__error-summary a[href^="https://"]:after {
        content: " (" attr(href) ")";
        font-size: 90%;
        word-wrap: break-word
    }
}

.gem-c-feedback__error-message {
    font-family: "GDS Transport",arial,sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-weight: 700;
    font-size: 16px;
    font-size: 1rem;
    line-height: 1.25;
    display: block;
    padding: 4px 0 0;
    color: #d4351c
}

@media print {
    .gem-c-feedback__error-message {
        font-family: sans-serif
    }
}

@media (min-width: 40.0625em) {
    .gem-c-feedback__error-message {
        font-size:19px;
        font-size: 1.1875rem;
        line-height: 1.3157894737
    }
}

@media print {
    .gem-c-feedback__error-message {
        font-size: 14pt;
        line-height: 1.15
    }
}

.gem-c-feedback__form {
    padding: 15px;
    border-top: 1px solid #b1b4b6
}

@media (min-width: 40.0625em) {
    .gem-c-feedback__form {
        padding:30px
    }
}

.gem-c-feedback__form-heading {
    color: #0b0c0c;
    font-family: "GDS Transport",arial,sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-weight: 700;
    font-size: 18px;
    font-size: 1.125rem;
    line-height: 1.1111111111;
    margin: 0 0 15px 0
}

@media print {
    .gem-c-feedback__form-heading {
        color: #000
    }
}

@media print {
    .gem-c-feedback__form-heading {
        font-family: sans-serif
    }
}

@media (min-width: 40.0625em) {
    .gem-c-feedback__form-heading {
        font-size:24px;
        font-size: 1.5rem;
        line-height: 1.25
    }
}

@media print {
    .gem-c-feedback__form-heading {
        font-size: 18pt;
        line-height: 1.15
    }
}

.gem-c-feedback__form-paragraph {
    color: #0b0c0c;
    font-family: "GDS Transport",arial,sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-weight: 400;
    font-size: 16px;
    font-size: 1rem;
    line-height: 1.25;
    margin: 0 0 30px 0
}

@media print {
    .gem-c-feedback__form-paragraph {
        color: #000
    }
}

@media print {
    .gem-c-feedback__form-paragraph {
        font-family: sans-serif
    }
}

@media (min-width: 40.0625em) {
    .gem-c-feedback__form-paragraph {
        font-size:19px;
        font-size: 1.1875rem;
        line-height: 1.3157894737
    }
}

@media print {
    .gem-c-feedback__form-paragraph {
        font-size: 14pt;
        line-height: 1.15
    }
}

.gem-c-feedback__form-label {
    font-family: "GDS Transport",arial,sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-weight: 400;
    font-size: 14px;
    font-size: .875rem;
    line-height: 1.1428571429;
    display: block;
    padding-bottom: 15px
}

@media print {
    .gem-c-feedback__form-label {
        font-family: sans-serif
    }
}

@media (min-width: 40.0625em) {
    .gem-c-feedback__form-label {
        font-size:16px;
        font-size: 1rem;
        line-height: 1.25
    }
}

@media print {
    .gem-c-feedback__form-label {
        font-size: 14pt;
        line-height: 1.2
    }
}

.gem-c-feedback__close {
    margin: 0 10px
}

@media (max-width: 40.0525em) {
    .gem-c-feedback__close {
        margin:20px 0 0
    }
}

.gem-c-feedback__email-link {
    display: inline-block;
    margin-top: 20px
}

@media (min-width: 48.0625em) {
    .gem-c-feedback__email-link {
        margin-top:10px
    }
}

.gem-c-feedback__email-link:focus,.gem-c-feedback__email-link:active {
    color: #0b0c0c
}

.gem-c-feedback .gem-c-input[type="text"] {
    font-family: "GDS Transport",arial,sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-weight: 400;
    font-size: 16px;
    font-size: 1rem;
    line-height: 1.25;
    margin: 0;
    padding: 5px;
    border: 2px solid #0b0c0c
}

@media print {
    .gem-c-feedback .gem-c-input[type="text"] {
        font-family: sans-serif
    }
}

@media (min-width: 40.0625em) {
    .gem-c-feedback .gem-c-input[type="text"] {
        font-size:19px;
        font-size: 1.1875rem;
        line-height: 1.3157894737
    }
}

@media print {
    .gem-c-feedback .gem-c-input[type="text"] {
        font-size: 14pt;
        line-height: 1.15
    }
}

.gem-c-feedback .gem-c-input[type="text"]:focus {
    outline: 3px solid #fd0
}

.-margin-bottom-20  {
    margin-bottom: 20px;
}

// Building interrupt component stylign

.interrupt {

    background-color: #005EA5;
    text-align: left;

    h2 {
        color: white;
    }
    p {
        color: white;
    }
    a {
        color: white;
    }
    .govuk-button {
        background-color: white;
        color:  #005EA5;
        font-weight:600;
        margin-bottom: 0px;
    }
    .govuk-details__summary {
        display: inline-block;
        position: relative;
        margin-bottom: 5px;
        padding-left: 25px;
        color: #fff;
        cursor: pointer;
    }
    .govuk-details__text {
        padding-top: 15px;
        padding-bottom: 15px;
        padding-left: 20px;
        border-left: 5px solid #b1b4b6;
        background-color: white;

        p {
            color: black;
        }
    }
}
p.capacity-notes-screen {
    padding-bottom: 50px;
}
.-margin-top-40 {
    margin-top: 40px;
}

.-margin-bottom-40 {
    margin-bottom: 40px;
}
{% endraw %}
```

</div>

#### How to use the code

This is the second half of the code.



## Contribute code for this component

If you have code that is relevant to this component you can add it to the [Github discussion]({{ githuburl }}). This helps other people to use it in their service.

{% endtab %}

{% endtabs %}
