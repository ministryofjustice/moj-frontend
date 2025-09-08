---
title: Inset text (highlighted)
tabs: true
status: Experimental
statusDate: September 2025
excerpt: ""
lede: ""
githuburl: https://github.com/ministryofjustice/moj-frontend/discussions/1777
contributorName: Rebecca Gorton
contributorTeam: ‘CAS2 Short term accommodation for bail’
---

{% tabs "paginate" %}
{% tab "Overview" %}

<div class="img-container">
  <img src="/assets/images/submission-1756982092471/guidance-inset-text.png" alt="A block of black text with a light blue background and a thick blue left border, meant to draw attention to the content. There are two paragraphs and a GOV.UK details component about matching applicants to suitable available rooms." />
</div>

## Overview
A blue variable version of the inset text component

### How the component is currently used

To highlight guidance to internal users as part of a service. We hypothesised that the warning component felt too urgent and the inset text could be easily missed or ignored in this context. Users are timepoor and expected to read through a fair bit of guidance. This component was being used by the DVLA to highlight content to users. This guidance inset has tested well and especially with users with access needs, they remarked that it helped them break down the content visually to process the content easier.

### Contribute to this component
You can help develop this component by adding information to the [Inset text (highlighted) Github discussion]({{ githuburl }}). This helps other people to use it in their service.

{% endtab %}

{% tab "Designs" %}

## Designs

A Figma design was not included when this component was added.

      There may be more information in the [Inset text (highlighted) Github discussion]({{ githuburl }}). You can also view the component image in the overview.

## Contribute a Figma link

      If you have a Figma link for this component (or a component like it) you can add it to [Github discussion]({{ githuburl }}). This helps other people to use it in their service.

{% endtab %}

{% tab "Accessibility" %}

## Accessibility

Accessibility findings have been added for this component. There may be more findings in the [Inset text (highlighted) Github discussion]({{ githuburl }}).


### External audit

* Conducted by: User Vision
* Date: 5 May 2025

#### Audit findings

No issues reported
### Assistive Technology testing

Date: 6 March 2025

#### Testing details

No issues discovered

## Contribute accessibility findings

    If you have accessibility findings that are relevant to this component you can add them to the [Github discussion]({{ githuburl }}). This helps other people to use it in their service.

{% endtab %}

{% tab "Code" %}

## Code

Code has been added for this component. There may be other code blocks in the [Guidance inset text Github discussion]({{ githuburl }}).


### Code block 1: nunjucks

<div class="app-example__code" data-module="app-copy">

```njk
{% raw %}
{% call govukInsetText({ classes: "govuk-!-margin-0 guidance-panel" }) %}
   <p>To apply for short-term accommodation (CAS2) for bail, the applicant must:</p>
   <h2 class="govuk-heading-s govuk-!-margin-0">Be:</h2>
   <ul class="govuk-list govuk-list--bullet">
     <li>18 years old or older</li>
     <li>able to live independently in shared accommodation
     </li>
   </ul>
   <h2 class="govuk-heading-s govuk-!-margin-0">Not:</h2>
   <ul class="govuk-list govuk-list--bullet">
     <li>be currently charged with, or have any past convictions or cautions, or current allegations of any sexual offences in Schedule 3 of the Sexual Offences Act 2003</li>
     <li>have breached immigration law (other than overstaying an approved period of leave to enter or remain in the UK)</li>
     <li>have the 'no recourse to public funds' (NRPF) condition applied to their permission to enter or stay in the UK</li>
     <li>be assessed as at high or very high risk of serious harm on OASys (Offender Assessment System)</li>
  </ul>
{% endcall %}


{% endraw %}
```

</div>

#### How to use the code

Add class 'guidance-panel' to the govukInsetText component.


### Code block 2: css

<div class="app-example__code" data-module="app-copy">

```css
{% raw %}
.guidance-panel {
    border-left-color: govuk-colour('blue');
    background-color: #eaf4f9;
}
{% endraw %}
```

</div>




## Contribute code for this component

If you have code that is relevant to this component you can add it to the [Github discussion]({{ githuburl }}). This helps other people to use it in their service.

{% endtab %}

{% endtabs %}
