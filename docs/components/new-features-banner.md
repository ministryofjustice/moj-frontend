---
title: New features banner
tabs: true
status: Experimental
statusDate: October 2025
excerpt: "Use the new features banner component to highlight updates to a service, and link to a page with more information."
lede: "Use the new features banner component to highlight updates to a service, and link to a page with more information."
githuburl: https://github.com/ministryofjustice/moj-frontend/discussions/1870
contributorName: Leigh Christie

---

{% tabs "paginate" %}
{% tab "Overview" %}

<div class="img-container">
  <img src="/assets/images/submission-1759330464350/New-features-banner.png" alt="Purple banner with 'New features' in white bold text, a link to 'find out more on the What's new page', and a 'Hide message' link." />
</div>

## Overview
Banner that appears below the header and above any navigation that allows users to click into a subsequent page that informs them of changes, fixes and updates to the product they're using.

### How the component is currently used

It is currently being used in 'Allocate a Person on Probation' (APoP) and it is going to be implemented in 'Manage a Person on Probation' (MPoP) soon too, to announce changes to our users in a consistent way.

### Contribute to this component
You can help develop this component by adding information to the [‘new features banner’ Github discussion]({{ githuburl }}). This helps other people to use it in their service.

{% endtab %}

{% tab "Designs" %}

## Designs

A Figma design has been added for this component. There may be more links and resources in the [‘new features banner’ Github discussion]({{ githuburl }}).


### Figma

If you work for MOJ, [View the ‘new features banner’ component in the MOJ Figma Kit](https://www.figma.com/design/N2xqOFkyehXwcD9DxU1gEq/MoJ-Figma-Kit?node-id=13264-60).

If you work outside MOJ, go to the [MOJ Figma Kit on the Figma community platform](https://www.figma.com/community/file/1543193133973726850/moj-design-system-figma-kit).

### Contribute prototypes and Figma links

If you have design files that are relevant to this component you can add them to the [Github discussion]({{ githuburl }}). This helps other people to use it in their service.

{% endtab %}

{% tab "Accessibility" %}

## Accessibility

Accessibility findings have been added for this component. There may be more findings in the [‘new features banner’ Github discussion]({{ githuburl }}).


### Internal review

* By: Manage a workforce
* Date: 25 January 2023

#### Review findings

I'm not sure of the exact date but it's been live since Jan 23. I'm not sure if it's explicitly had an external review. We reviewed it internally at the time, but it's heavily influenced by other banners in use.

## Contribute accessibility findings

    If you have accessibility findings that are relevant to this component you can add them to the [Github discussion]({{ githuburl }}). This helps other people to use it in their service.

{% endtab %}

{% tab "Code" %}

## Code

Code has been added for this component. There may be other code blocks in the [‘new features banner’ Github discussion]({{ githuburl }}).


### Code block 1: HTML

<div class="app-example__code" data-module="app-copy">

```HTML
{% raw %}
<div class="govuk-grid-row technical-updates-banner" id="technical-updates-banner" data-banner-version="30 May 2025">
  <div class="govuk-grid-column-full">
    <div class="govuk-width-container govuk-body technical-updates-container">
      <div class="technical-updates-content">
        <strong class="technical-updates-whats-new">New features</strong>
        <span>
            We’re updating the service all the time, <a class="govuk-link govuk-link--inverse" href="/whats-new">find out more on the What’s new page.</a>
        </span>
      </div>
      <a id="hide-message" class="technical-updates-hide-message govuk-link govuk-link--inverse" href="#" aria-current="page">Hide message</a>
    </div>
  </div>
</div>
{% endraw %}
```

</div>

#### How to use the code

We use the "Hide message" link to remove the banner. If they click the link to see what the updates are, this also should remove the banner from the rest of the site.

### Code block 2: CSS

<div class="app-example__code" data-module="app-copy">

```CSS
{% raw %}
.technical-updates-banner {
    background-color: #44247b;
    padding: 10px 0 10px 0;
}

.govuk-grid-row {
    margin-right: -15px;
    margin-left: -15px;
}

.technical-updates-container {
    color: #fff;
}

.technical-updates-content {
    float: left;
}
{% endraw %}
```

</div>


## Contribute code for this component

If you have code that is relevant to this component you can add it to the [Github discussion]({{ githuburl }}). This helps other people to use it in their service.

{% endtab %}

{% endtabs %}
