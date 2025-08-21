---
title: PDS footer
tabs: true
status: Experimental
statusDate: August 2025
excerpt: ""
lede: ""
githuburl: https://github.com/ministryofjustice/moj-frontend/discussions/xxx
contributorName: Stephen Robertson
contributorTeam: MoJ Design System / Probation Connected Services
---

{% tabs "paginate" %}
{% tab "Overview" %}

<div class="img-container">
  <img src="/assets/images/submission-1755772822389/1aee1e24-e157-42a8-a127-c20df9b921dc.png" alt="PDS footer" />
</div>

## Overview
The PDS footer is part of a [library of components](https://dsdmoj.atlassian.net/wiki/spaces/PDS1/pages/5735448595/Components) designed to create a consistent user experience across probation services.

It’s based on the GOV.UK footer component, with changes to meet the needs of internal-facing probation services.

### How the component is currently used

This footer should be used in all internal-facing probation services accessed via the [Probation Digital Services](https://dsdmoj.atlassian.net/wiki/spaces/PDS1/pages/5735481352/The+Probation+Digital+Services+PDS+platform) platform.

### Contribute to this component
You can help develop this component by adding information to the Github discussion. This helps other people to use it in their service.

{% endtab %}

{% tab "Designs" %}

## Designs

A Figma link has been added for this component. There may be more links and resources in the [Pds-footer Github discussion]({{ githuburl }}).


### Figma link

      [View the Pds-footer in Figma (opens in a new tab)]()


### Contribute prototypes and Figma links

      If you have design files that are relevant to this component you can add them to the [Github discussion]({{ githuburl }}). This helps other people to use it in their service.

{% endtab %}

{% tab "Accessibility" %}

## Accessibility

Accessibility findings have been added for this component. There may be more findings in the [Pds-footer Github discussion]({{ githuburl }}).


### Internal review

* By: The MoJ Accessibility Team
* Date: 1 August 2025

#### Review findings

N/A
### Assistive Technology testing

Date: 1 August 2025

#### Testing details

N/A

## Contribute accessibility findings

    If you have accessibility findings that are relevant to this component you can add them to the [Github discussion]({{ githuburl }}). This helps other people to use it in their service.

{% endtab %}

{% tab "Code" %}

## Code

Code has been added for this component. There may be other code blocks in the [Pds-footer Github discussion]({{ githuburl }}).


### Code block 1: nunjucks

<div class="app-example__code" data-module="app-copy">

```njk
{% raw %}
{% block footer %}
  {% if feComponents.footer %}
    {{ feComponents.footer | safe }}
  {% else %}
    {% include "./footer.njk" %}
  {% endif %}
{% endblock %}
{% endraw %}
```

</div>





## Contribute code for this component

If you have code that is relevant to this component you can add it to the [Github discussion]({{ githuburl }}). This helps other people to use it in their service.

{% endtab %}

{% endtabs %}
