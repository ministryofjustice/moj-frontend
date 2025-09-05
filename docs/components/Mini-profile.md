---
title: Mini profile
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
  <img src="/assets/images/submission-1757080089009/Screenshot-2025-09-05-at-14.45.26.png" alt="Mini profile" />
</div>

## Overview
The mini profile displays key information about a prisoner at the top of a service page, particularly within question-and-answer or transactional journeys. Its purpose is to reassure users that they are viewing the correct record and to provide essential details, such as prison number or current location, throughout the journey.

This component is a variation of the profile design used in the DPS prisoner profile but is adapted for use within transactional contexts. It is flexible and can be customised to include details that are most relevant to the service, for example a prisoner’s CSRA level, security category, or incentive level.

The mini profile can be displayed with or without a photograph, depending on the needs of the service. It can also include links, such as those used in the non-associations service. Design considerations include ensuring photographs have appropriate alternative text and that any links are clearly marked if they open in a new tab.

### How the component is currently used

The mini profile is used when services display information about a prisoner within a transactional flow. Its primary value is helping users to confirm they are entering or viewing information against the correct record, reducing errors and increasing confidence in the process.

In addition, it provides quick access to important contextual information that staff need during their tasks. For example, it may show a prisoner’s identifying details alongside security or behavioural information relevant to the service. This avoids the need for users to switch back and forth between different screens or profiles.

The component supports flexibility, allowing services to decide what information is most useful for their context. It has been used in multiple services, such as non-associations, where links are embedded directly into the profile for easy navigation.

By ensuring accessibility requirements are met, including meaningful alt text for images and clarity around link behaviour, the mini profile ensures that essential information about individuals in prison is available in a way that is reliable, usable, and accessible to all staff.

### Contribute to this component
You can help develop this component by adding information to the [Mini profile Github discussion]({{ githuburl }}). This helps other people to use it in their service.

{% endtab %}

{% tab "Designs" %}

## Designs

A Figma design has been added for this component. There may be more links and resources in the [Mini profile Github discussion]({{ githuburl }}).


### Figma

      [View the Mini profile component in the MoJ Figma Kit (opens in a new tab)]()


### Contribute prototypes and Figma links

      If you have design files that are relevant to this component you can add them to the [Github discussion]({{ githuburl }}). This helps other people to use it in their service.

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
<dl>
    <dt class="govuk-visually-hidden">Prisoner</dt>
    <dd>
      
        <a href="https://digital-dev.prison.service.justice.gov.uk/prisoner/G6804VG">
          <strong>
            Bucholtz, Darrick
          </strong>
        </a>
      
      <br />
      G6804VG
    </dd>
  </dl>

  <dl>
    <dt>Location</dt>
    <dd>
      4-2-027
    </dd>
  </dl>

  <dl>
    <dt>CSRA</dt>
    <dd>
      High
    </dd>
  </dl>
  
  
    
{% endraw %}
```

</div>



### Code block 2: css

<div class="app-example__code" data-module="app-copy">

```css
{% raw %}

.dps-mini-profile-header {
    display: flex;
    flex-direction: row;
    align-items: start;
    background: #f3f2f1
}

.dps-mini-profile-header .app-prisoner-photo--small {
    margin-right: 30px
}

.dps-mini-profile-header dl {
    margin-right: 60px
}

.dps-mini-profile-header dl:last-child {
    margin-right: 0
}

.dps-mini-profile-header .dps-mini-profile-header--align-right {
    align-self: center;
    margin-left: auto
}

.dps-mini-profile-header .dps-mini-profile-header--align-right .govuk-button,.dps-mini-profile-header .dps-mini-profile-header--align-right .hmpps-action-button {
    margin-bottom: 0
}

@media(max-width: 40.0525em) {
    .dps-mini-profile-header {
        display:block
    }

    .dps-mini-profile-header .app-prisoner-photo--small {
        margin-bottom: 20px
    }

    .dps-mini-profile-header dl {
        margin-right: 0
    }

    .dps-mini-profile-header dl:last-child {
        margin-bottom: 0
    }

    .dps-mini-profile-header dl:last-child dd {
        margin-bottom: 0
    }
}

.app-prisoner-photo,.app-prisoner-photo--large,.app-prisoner-photo--small {
    width: 90px
}

.app-prisoner-photo--small {
    width: 80px
}

.app-prisoner-photo--large {
    width: 120px
}

dl dt {
    font-weight: bold
}

dl dd {
    margin-left: 0
}

.govuk-\!-padding-3,.dps-mini-profile-header {
    padding: 15px !important;
}

dl dd,dl,p,.govuk-body,.govuk-body-m {
    margin-top: 0;
    /* margin-bottom:15px; */
}       
{% endraw %}
```

</div>




## Contribute code for this component

If you have code that is relevant to this component you can add it to the [Github discussion]({{ githuburl }}). This helps other people to use it in their service.

{% endtab %}

{% endtabs %}
