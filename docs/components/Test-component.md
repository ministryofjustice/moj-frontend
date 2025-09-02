---
title: Test component
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
  <img src="/assets/images/submission-1756843347709/upscalemedia-transformed.jpeg" alt="Test component" />
</div>

## Overview
it is a made up component to test the submission process

### How the component is currently used

it isn't being used as its only for testing

### Contribute to this component
You can help develop this component by adding information to the [Test component Github discussion]({{ githuburl }}). This helps other people to use it in their service.

{% endtab %}

{% tab "Designs" %}

## Designs

A Figma design has been added for this component. There may be more links and resources in the [Test component Github discussion]({{ githuburl }}).


### Figma

      [View the Test component component in the MoJ Figma Kit (opens in a new tab)]()


### Contribute prototypes and Figma links

      If you have design files that are relevant to this component you can add them to the [Github discussion]({{ githuburl }}). This helps other people to use it in their service.

{% endtab %}

{% tab "Accessibility" %}

## Accessibility

Accessibility findings have been added for this component. There may be more findings in the [Test component Github discussion]({{ githuburl }}).


### External audit

* Conducted by: dac
* Date: 1 February 2020

#### Audit findings

no issues
### Internal review

* By: moj
* Date: 2 March 2023

#### Review findings

lots of issues
### Assistive Technology testing

Date: 5 May 2025

#### Testing details

asddfdf

## Contribute accessibility findings

    If you have accessibility findings that are relevant to this component you can add them to the [Github discussion]({{ githuburl }}). This helps other people to use it in their service.

{% endtab %}

{% tab "Code" %}

## Code

Code has been added for this component. There may be other code blocks in the [Test component Github discussion]({{ githuburl }}).


### Code block 1: html

<div class="app-example__code" data-module="app-copy">

```html
{% raw %}
<div class="govuk-inset-text">
  It can take up to 8 weeks to register a lasting power of attorney if there are no mistakes in the application.
</div>
{% endraw %}
```

</div>



### Code block 2: nunjucks

<div class="app-example__code" data-module="app-copy">

```njk
{% raw %}
{% from "govuk/components/inset-text/macro.njk" import govukInsetText %}

{{ govukInsetText({
  text: "It can take up to 8 weeks to register a lasting power of attorney if there are no mistakes in the application."
}) }}
{% endraw %}
```

</div>



### Code block 3: css

<div class="app-example__code" data-module="app-copy">

```css
{% raw %}
@include govuk-exports("govuk/component/inset-text") {
  .govuk-inset-text {
    @include govuk-font($size: 19);
    @include govuk-text-colour;
    padding: govuk-spacing(3);
    // Margin top intended to collapse
    // This adds an additional 10px to the paragraph above
    @include govuk-responsive-margin(6, "top");
    @include govuk-responsive-margin(6, "bottom");

    clear: both;

    border-left: $govuk-border-width-wide solid $govuk-border-colour;

    > :first-child {
      margin-top: 0;
    }

    > :only-child,
    > :last-child {
      margin-bottom: 0;
    }
  }
}
{% endraw %}
```

</div>




## Contribute code for this component

If you have code that is relevant to this component you can add it to the [Github discussion]({{ githuburl }}). This helps other people to use it in their service.

{% endtab %}

{% endtabs %}
