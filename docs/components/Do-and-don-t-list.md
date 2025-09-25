---
title: Do and don't list
tabs: true
status: Experimental
statusDate: September 2025
excerpt: ""
lede: ""
githuburl: https://github.com/ministryofjustice/moj-frontend/discussions/categories/experimental-components-pages-and-patterns
contributorName: Rebecca Gorton
contributorTeam: CAS-2 Short term accommodation for bail
---

{% tabs "paginate" %}
{% tab "Overview" %}

<div class="img-container">
  <img src="/assets/images/submission-1756981444296/do-and-dont-list.png" alt="Do and don't list" />
</div>

## Overview
Do and don't list are a set of panels that list out 'do' and 'do not' criteria using check marks and crosses as icons instead of bullet points. This component is derived from the NHS equivalent https://service-manual.nhs.uk/design-system/components/do-and-dont-lists

### How the component is currently used

We used this component in our service to support users with more visual guidance to help them check if a conviction should be added to the service

### Contribute to this component
You can help develop this component by adding information to the [Do and don't list Github discussion]({{ githuburl }}). This helps other people to use it in their service.

{% endtab %}

{% tab "Designs" %}

## Designs

A Figma design was not included when this component was added.

      There may be more information in the [Do and don't list Github discussion]({{ githuburl }}). You can also view the component image in the overview.

## Contribute a Figma link

      If you have a Figma link for this component (or a component like it) you can add it to [Github discussion]({{ githuburl }}). This helps other people to use it in their service.

{% endtab %}

{% tab "Accessibility" %}

## Accessibility

No accessibility findings were included when this component was added. There may be more information in the [Do and don't list Github discussion]({{ githuburl }}).
## Contribute accessibility findings

    If you have accessibility findings that are relevant to this component you can add them to the [Github discussion]({{ githuburl }}). This helps other people to use it in their service.

{% endtab %}

{% tab "Code" %}

## Code

Code has been added for this component. There may be other code blocks in the [Do and don't list Github discussion]({{ githuburl }}).


### Code block 1: nunjucks

<div class="app-example__code" data-module="app-copy">

```njk
{% raw %}
{% from "govuk/components/details/macro.njk" import govukDetails %}
<div class="nhsuk-do-dont-list">
	<h2 class="nhsuk-do-dont-list__label govuk-!-font-size-19">Add any unspent convictions that meet one or more of the following criteria:</h2>
	<ul class="nhsuk-list nhsuk-list--tick">
		<li>
			
				
			
			they are relevant to the charges the applicant is being held for
		</li>
		<li>
			
				
			
			they relate to the following categories:
			<ul>
				<li>arson</li>
				<li>domestic abuse</li>
				<li>drugs</li>
				<li>hate-related attitudes</li>
				<li>stalking and harassment</li>
				<li>violence</li>
				<li>weapons and firearms</li>
			</ul>
		</li>
		<li>
			
				
			
			they might raise concerns towards other adults and children
		</li>
		<li>
			
				
			
			where the applicant is currently serving a sentence
		</li>
	</ul>
</div>
<div class="nhsuk-do-dont-list">
	<h2 class="nhsuk-do-dont-list__label govuk-!-font-size-19">Do not add any:</h2>
	<ul class="nhsuk-list nhsuk-list--cross">
		<li>
			
				
				
			
			<span class="govuk-!-font-weight-bold">spent</span> convictions
		</li>
		<li>
			
				
				
			
			unspent convictions that do not meet any of the criteria listed
		</li>
	</ul>
	{{ govukDetails({ summaryText: 'How to check if a conviction is spent', html: '
	<p>
		You can
		<a class="govuk-link" href="https://www.gov.uk/tell-employer-or-college-about-criminal-record/check-your-conviction-caution" target="_blank">check if the applicant's convictions or cautions are spent (opens in a new tab).</a>
	</p>
	', classes: "govuk-!-margin-top-4" }) }}
</div>

{% endraw %}
```

</div>

#### How to use the code

We are about to roll off the project and didn't want to create a new dependency on another design system before doing so, so we used the HTML rather than the Nunjucks component, and manually copied the styles in from the NHS design system stylesheet.



## Contribute code for this component

If you have code that is relevant to this component you can add it to the [Github discussion]({{ githuburl }}). This helps other people to use it in their service.

{% endtab %}

{% endtabs %}
