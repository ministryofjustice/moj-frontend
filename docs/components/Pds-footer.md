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
  <img src="/assets/images/submission-1755786545277/1aee1e24-e157-42a8-a127-c20df9b921dc.png" alt="PDS footer" />
</div>

## Overview
The PDS footer is part of a [library of components](https://dsdmoj.atlassian.net/wiki/spaces/PDS1/pages/5735448595/Components) designed to create a consistent user experience across probation services.

It’s based on the GOV.UK footer component, with changes to meet the needs of internal-facing probation services.

### How the component is currently used

**When to use**

This footer should be used in all internal-facing probation services accessed via the Probation Digital Services platform. 

**When not to use**

Do not use it outside of services on the [Probation Digital Services](https://dsdmoj.atlassian.net/wiki/spaces/PDS1/pages/5735481352/The+Probation+Digital+Services+PDS+platform) platform. 

**How to use**

**If you have an accessibility statement published**

Email a copy of your statement to the Connected Services team: connected-service@justice.gov.uk

**Add the footer component package to your project**

The Probation [Digital Services GitHub](https://github.com/ministryofjustice/hmpps-probation-frontend-component-api) contains a readme file with instructions on how to implement the component.

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



### Code block 2: css

<div class="app-example__code" data-module="app-copy">

```css
{% raw %}
$govuk-page-width: 1170px;

@import "govuk-frontend/dist/govuk/settings/spacing";
@import "govuk-frontend/dist/govuk/helpers/spacing";
@import "govuk-frontend/dist/govuk/objects/width-container";

.probation-common-footer {
  @include govuk-font($size: 16);

  border-top: 1px solid $govuk-border-colour;
  padding: 30px 0;
  color: $govuk-text-colour;
  background: $govuk-template-background-colour;

  a {
    text-underline-offset: 0.23em;
  }

  &amp;__info {
    display: flex;
  }

  h2 {
    font-size: 24px;
    margin-top: 0;
    padding-bottom: 25px;
    border-bottom: 1px solid govuk-colour('dark-grey');
  }

  &amp;__help {
    flex-basis: 50%;
  }

  &amp;__inline-list {
    margin-top: 0;
    margin-bottom: govuk-spacing(3);
    padding: 0;
  }

  &amp;__inline-list-item {
    display: inline-block;
    margin-right: govuk-spacing(3);
    margin-bottom: govuk-spacing(1);
  }

  &amp;__link {
    @include govuk-link-common;
    @include govuk-link-style-text;
  }

  &amp;__services-menu {
    ul {
      width: 100%;
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 15px 15px;
      justify-items: start;
      li a {
        color: $govuk-text-colour;
        font-size: 16px;
      }
    }
  }
}

{% endraw %}
```

</div>



### Code block 3: html

<div class="app-example__code" data-module="app-copy">

```html
{% raw %}
<footer class="probation-common-footer govuk-!-display-none-print">
  <div class="govuk-width-container">
    
    <div class="govuk-grid-row">
      <div class="govuk-grid-column-full">
        <div class="probation-common-footer__support-links">
          <h2 class="govuk-visually-hidden">Support links</h2>

          <ul class="probation-common-footer__inline-list">
            <li class="probation-common-footer__inline-list-item">
              <a class="probation-common-footer__link" href="#">Accessibility</a>
            </li>
            <li class="probation-common-footer__inline-list-item">
              <a class="probation-common-footer__link" href="#">Cookies policy</a>
            </li>
            <li class="probation-common-footer__inline-list-item">
              <a class="probation-common-footer__link" href="#">Privacy policy</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</footer>
{% endraw %}
```

</div>



### Code block 4: nunjucks

<div class="app-example__code" data-module="app-copy">

```njk
{% raw %}
<footer class="probation-common-footer govuk-!-display-none-print">
  <div class="govuk-width-container">
    <div class="govuk-grid-row">
      <div class="govuk-grid-column-full">
        <div class="probation-common-footer__support-links">
          <h2 class="govuk-visually-hidden">Support links</h2>
          <ul class="probation-common-footer__inline-list">
            <li class="probation-common-footer__inline-list-item">
              <a class="probation-common-footer__link" href="#">Accessibility</a>
            </li>
            <li class="probation-common-footer__inline-list-item">
              <a class="probation-common-footer__link" href="#">Cookies policy</a>
            </li>
            <li class="probation-common-footer__inline-list-item">
              <a class="probation-common-footer__link" href="#">Privacy policy</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</footer>
{% endraw %}
```

</div>





## Contribute code for this component

If you have code that is relevant to this component you can add it to the [Github discussion]({{ githuburl }}). This helps other people to use it in their service.

{% endtab %}

{% endtabs %}
