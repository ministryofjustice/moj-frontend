---
title: Code
order: 40
tags: 'inset-text-highlighted'
permalink: false
eleventyComputed:
  override:eleventyNavigation: false
---

## Code

Code has been added for this component. There may be other code blocks in the [‘inset text (highlighted)’ Github discussion]({{ githuburl }}).

### Code block 1: Nunjucks

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

### Code block 2: CSS

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

