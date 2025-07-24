---
title: Test component
tabs: true
status: Experimental
statusDate: July 2025
excerpt: ""
lede: ""
githuburl: https://github.com/ministryofjustice/moj-frontend/discussions/xxx
contributorName: Murray Lippiatt
contributorTeam: Design System team
---

{% tabs "paginate" %}
{% tab "Overview" %}

<div class="img-container">
  <img src="/assets/images/submission-1753359907132/moj-frontend-pr-1429.apps.live.cloud-platform.service.justice.gov.uk_contribute_add-new-component_your-details.png" alt="Test component" />
</div>

## Overview
This is a test

### How the component is currently used

This is also a test

### Contribute to this component
You can help develop this component by adding information to the Github discussion. This helps other people to use it in their service.

{% endtab %}

{% tab "Designs" %}

## Designs

A Figma link has been added for this component. There may be more links and resources in the [Test-component Github discussion]({{ githuburl }}).


### Figma link

      [View the Test-component in Figma (opens in a new tab)]()

Here is some information about how to use this Figma file.
### Contribute prototypes and Figma links

      If you have design files that are relevant to this component you can add them to the [Github discussion]({{ githuburl }}). This helps other people to use it in their service.

{% endtab %}

{% tab "Accessibility" %}

## Accessibility

Accessibility findings have been added for this component. There may be more findings in the [Test-component Github discussion]({{ githuburl }}).


### External audit

* Conducted by: DAC
* Date: 1 January 2020

#### Audit findings

They found some issues
### Internal review

* By: MoJ Accessibility Team
* Date: 1 January 2020

#### Review findings

Ben found some issues
### Assistive Technology testing

Date: 1 January 2020

#### Testing details

Used Dragon to assess component

## Contribute accessibility findings

    If you have accessibility findings that are relevant to this component you can add them to the [Github discussion]({{ githuburl }}). This helps other people to use it in their service.

{% endtab %}

{% tab "Code" %}

## Code

Code has been added for this component. There may be other code examples in the [Test-component Github discussion]({{ githuburl }}).


### Example 1: html

```html
{% raw %}
<div>

  <div>
    
      Date
    

    <div>
      For example, 17/5/2024.
    </div>

    

  </div>

</div>
{% endraw %}
```

This is what you paste into the HTML


### Example 2: nunjucks

```njk
{% raw %}
{%- from "moj/components/date-picker/macro.njk" import mojDatePicker -%}

{{ mojDatePicker({
  id: "date",
  name: "date",
  label: {
    text: "Date"
  },
  hint: {
    text: "For example, 17/5/2024."
  }
}) }}
{% endraw %}
```

There are lots of nunjucks macro options


### Example 3: Another language

```
{% raw %}
here is some code in a totally different language.
{% endraw %}
```





## Contribute code for this component

If you have code that is relevant to this component you can add it to the [Github discussion]({{ githuburl }}). This helps other people to use it in their service.

{% endtab %}

{% endtabs %}
