---
title: Mini profile
tabs: true
status: Experimental
statusDate: September 2025
excerpt: ""
lede: ""
githuburl: https://github.com/ministryofjustice/moj-frontend/discussions/categories/experimental-components-pages-and-patterns
contributorName: James McKechnie
contributorTeam: HMPPS 
---

{% tabs "paginate" %}
{% tab "Overview" %}

<div class="img-container">
  <img src="/assets/images/submission-1756983462677/mini-profile.png" alt="Mini profile" />
</div>

## Overview
The mini profile shows key information about a prisoner at the top of a question or transactional service page. This helps to:

* reassure users that they’re looking at the correct record
* provide relevant key information throughout a journey (such as prison number or location)

The mini profile is a variation of the design used on the DPS prisoner profile.

### How the component is currently used

https://court-cases-release-dates-design.hmpps.service.justice.gov.uk/components/mini-profile/

### Contribute to this component
You can help develop this component by adding information to the [Mini profile Github discussion]({{ githuburl }}). This helps other people to use it in their service.

{% endtab %}

{% tab "Designs" %}

## Designs

A Figma design was not included when this component was added.

      There may be more information in the [Mini profile Github discussion]({{ githuburl }}). You can also view the component image in the overview.

## Contribute a Figma link

      If you have a Figma link for this component (or a component like it) you can add it to [Github discussion]({{ githuburl }}). This helps other people to use it in their service.

{% endtab %}

{% tab "Accessibility" %}

## Accessibility

No accessibility findings were included when this component was added. There may be more information in the [Mini profile Github discussion]({{ githuburl }}).
## Contribute accessibility findings

    If you have accessibility findings that are relevant to this component you can add them to the [Github discussion]({{ githuburl }}). This helps other people to use it in their service.

{% endtab %}

{% tab "Code" %}

## Code

Code has been added for this component. There may be other code blocks in the [Mini profile Github discussion]({{ githuburl }}).


### Code block 1: html

<div class="app-example__code" data-module="app-copy">

```html
{% raw %}
<div class="mini-profile govuk-!-margin-top-7">
	<div class="mini-profile-inner">
		<div class="mini-profile-left">
			<img class="mini-profile-person-img" src="/assets/images/prisoner-profile-image.png" alt="Image of Last, First" loading="lazy" />
		</div>
		<div class="mini-profile-right">
			<ul class="mini-profile-info">
				<li>
					<p class="govuk-heading-s govuk-!-margin-bottom-1">
						<a id="mini-profile-link" class="govuk-link--no-visited-state" href="#" target="_blank">Last, First</a>
					</p>
					<span class="govuk-body">A1234BC</span>
				</li>
				<li><span class="govuk-heading-s govuk-!-margin-bottom-0 govuk-!-padding-0">Date of birth</span><span class="govuk-body">27/09/1998</span></li>
				<li><span class="govuk-heading-s govuk-!-margin-bottom-0 govuk-!-padding-0">Establishment</span><span class="govuk-body">HMP Prison</span></li>
				<li><span class="govuk-heading-s govuk-!-margin-bottom-0 govuk-!-padding-0">Cell number</span><span class="govuk-body">A-1-1</span></li>
				<li><span class="govuk-heading-s govuk-!-margin-bottom-0 govuk-!-padding-0">Status</span><span class="govuk-body">Released</span></li>
			</ul>
		</div>
	</div>
</div>

{% endraw %}
```

</div>



### Code block 2: css

<div class="app-example__code" data-module="app-copy">

```css
{% raw %}
.mini-profile {
    margin: 0 0 30px 0;
    position: relative;
    box-sizing: border-box;
    display: flex;
    align-items: center
}

.mini-profile-inner {
    background-color: #f3f2f1 !important;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    box-sizing: border-box;
    padding: 20px
}

.mini-profile-left {
    margin-right: 15px;
    box-sizing: border-box
}

.mini-profile-person-img {
    width: 100px;
    height: 130px;
    box-sizing: border-box
}

.mini-profile-right {
    flex: 1
}

.mini-profile-info {
    padding: 0 !important;
    margin: 0;
    list-style: none;
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap
}

.mini-profile-info li {
    margin-right: 25px;
    color: #0b0c0c
}

@media(max-width: 768px) {
    .mini-profile-info li {
        margin-right:10px
    }
}
{% endraw %}
```

</div>




## Contribute code for this component

If you have code that is relevant to this component you can add it to the [Github discussion]({{ githuburl }}). This helps other people to use it in their service.

{% endtab %}

{% endtabs %}
