---
title: Notification Banner
tabs: true
status: Experimental
statusDate: July 2025
excerpt: ""
lede: ""
githuburl: https://github.com/ministryofjustice/moj-frontend/discussions/xxx
contributorName: test test
contributorTeam: The A Team
---

{% tabs "paginate" %}
{% tab "Overview" %}

<div class="img-container">
  <img src="/assets/images/submission-1751968711243/Screenshot-2025-04-02-at-22.59.16.png" alt="Notification Banner" />
</div>

## Overview
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam porttitor, turpis eu congue semper, felis purus blandit purus, eu finibus dui orci et augue. 

Vestibulum nec dignissim ante. Sed vehicula sagittis nunc, sed iaculis lorem. Quisque quis lorem non lorem ornare venenatis. Morbi luctus, enim et tincidunt pellentesque, ante justo venenatis nisl, rhoncus lobortis quam nunc in lectus. Nam consectetur sapien sem, quis laoreet mi dapibus sit amet. Nullam consectetur erat ut diam luctus posuere. Duis vulputate turpis vitae magna commodo pharetra. Sed varius pulvinar sapien, nec tempus ante pulvinar sit amet. Sed mauris tortor, dictum tristique aliquam vestibulum, porta et justo.



### How the component is currently used

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam porttitor, turpis eu congue semper, felis purus blandit purus, eu finibus dui orci et augue. 

Vestibulum nec dignissim ante. Sed vehicula sagittis nunc, sed iaculis lorem. Quisque quis lorem non lorem ornare venenatis. Morbi luctus, enim et tincidunt pellentesque, ante justo venenatis nisl, rhoncus lobortis quam nunc in lectus. Nam consectetur sapien sem, quis laoreet mi dapibus sit amet. 

Nullam consectetur erat ut diam luctus posuere. Duis vulputate turpis vitae magna commodo pharetra. Sed varius pulvinar sapien, nec tempus ante pulvinar sit amet. Sed mauris tortor, dictum tristique aliquam vestibulum, porta et justo.



### Contribute to this component
You can help develop this component by adding information to the Github discussion. This helps other people to use it in their service.

{% endtab %}

{% tab "Designs" %}

## Designs

A Figma link has been added for this component. There may be more links and resources in the [Notification-banner Github discussion]({{ githuburl }}).


### Figma link

      [View the Notification-banner in Figma (opens in a new tab)]()

only link
### Contribute prototypes and Figma links

      If you have design files that are relevant to this component you can add them to the [Github discussion]({{ githuburl }}). This helps other people to use it in their service.

{% endtab %}

{% tab "Accessibility" %}

## Accessibility

Accessibility findings have been added for this component. There may be more findings in the [Notification-banner Github discussion]({{ githuburl }}).


### External audit

* Conducted by: DAC
* Date: 1 January 2020

#### Audit findings

In lacus ipsum, molestie nec sapien vitae, tincidunt tristique nisi. Integer a lacus quis nisl mollis fringilla. Nullam blandit imperdiet mauris, ac feugiat ante. 

Vestibulum nec semper nulla, ut ultricies massa. Curabitur lacinia tortor augue, sed varius leo viverra non. Fusce vitae libero ac orci elementum vestibulum eu et libero. 

* sdflkjfsdlkjl sdfsdf lksdfjl kjlsdf
* lsdjflksdfjljdfsl sdflkj lkj  sdflkj lksdfj jl

In rhoncus laoreet nisi, sit amet rutrum tellus. Ut ut dui in metus sodales molestie eu ut purus.

### Internal review

* By: MoJ
* Date: 1 January 2020

#### Review findings

In lacus ipsum, molestie nec sapien vitae, tincidunt tristique nisi. 

Integer a lacus quis nisl mollis fringilla. Nullam blandit imperdiet mauris, ac feugiat ante. Vestibulum nec semper nulla, ut ultricies massa. Curabitur lacinia tortor augue, sed varius leo viverra non. 

Fusce vitae libero ac orci elementum vestibulum eu et libero. In rhoncus laoreet nisi, sit amet rutrum tellus. Ut ut dui in metus sodales molestie eu ut purus.

### Assistive Technology testing

Date: 1 January 2020

#### Testing details

Curabitur
## Contribute accessibility findings

    If you have accessibility findings that are relevant to this component you can add them to the [Github discussion]({{ githuburl }}). This helps other people to use it in their service.

{% endtab %}

{% tab "Code" %}

## Code

Code has been added for this component. There may be other code examples in the [Notification-banner Github discussion]({{ githuburl }}).


### Example 1: nunjucks

<div class="app-example app-example-borders">
{% raw %}
```
{% from "govuk/components/notification-banner/macro.njk" import govukNotificationBanner %}

{% set html %}
  <p>
    You have 7 days left to send your application.
    <a href="#">View application</a>.
  </p>
{% endset %}

{{ govukNotificationBanner({
  html: html
}) }}
```
{% endraw %}
</div>

In lacus ipsum, molestie nec sapien vitae, tincidunt tristique nisi. Integer a lacus quis nisl mollis fringilla. Nullam blandit imperdiet mauris, ac feugiat ante. 

Vestibulum nec semper nulla, ut ultricies massa. Curabitur lacinia tortor augue, sed varius leo viverra non. Fusce vitae libero ac orci elementum vestibulum eu et libero. In rhoncus laoreet nisi, sit amet rutrum tellus. Ut ut dui in metus sodales molestie eu ut purus.




### Example 2: html

<div class="app-example app-example-borders">
{% raw %}
```
<div>
  <div>
    <h2>
      Important
    </h2>
  </div>
  <div>
    <p>
      You have 7 days left to send your application.
      <a href="#">View application</a>.
    </p>
  </div>
</div>
```
{% endraw %}
</div>

Some HTML


### Example 3: css

<div class="app-example app-example-borders">
{% raw %}
```
.govuk-notification-banner {
    font-family: GDS Transport,arial,sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-weight: 400;
    font-size: 1rem;
    line-height: 1.25;
    margin-bottom: 30px;
    border: 5px solid #1d70b8;
    background-color: #1d70b8
}

@media print {
    .govuk-notification-banner {
        font-family: sans-serif
    }
}

@media (min-width: 40.0625em) {
    .govuk-notification-banner {
        font-size:1.1875rem;
        line-height: 1.3157894737
    }
}

@media print {
    .govuk-notification-banner {
        font-size: 14pt;
        line-height: 1.15
    }
}

@media (min-width: 40.0625em) {
    .govuk-notification-banner {
        margin-bottom:50px
    }
}

.govuk-notification-banner:focus {
    outline: 3px solid #fd0
}

.govuk-notification-banner__header {
    padding: 2px 15px 5px;
    border-bottom: 1px solid transparent
}

@media (min-width: 40.0625em) {
    .govuk-notification-banner__header {
        padding:2px 20px 5px
    }
}

.govuk-notification-banner__title {
    font-size: 1rem;
    line-height: 1.25;
    font-weight: 700;
    margin: 0;
    padding: 0;
    color: #fff
}

@media (min-width: 40.0625em) {
    .govuk-notification-banner__title {
        font-size:1.1875rem;
        line-height: 1.3157894737
    }
}

@media print {
    .govuk-notification-banner__title {
        font-size: 14pt;
        line-height: 1.15
    }
}

.govuk-notification-banner__content {
    color: #0b0c0c;
    padding: 15px;
    background-color: #fff
}

@media print {
    .govuk-notification-banner__content {
        color: #000
    }
}

@media (min-width: 40.0625em) {
    .govuk-notification-banner__content {
        padding:20px
    }
}

.govuk-notification-banner__content&gt;* {
    box-sizing: border-box;
    max-width: 605px
}

.govuk-notification-banner__content&gt;:last-child {
    margin-bottom: 0
}

.govuk-notification-banner__heading {
    font-size: 1.125rem;
    line-height: 1.1111111111;
    font-weight: 700;
    margin: 0 0 15px;
    padding: 0
}

@media (min-width: 40.0625em) {
    .govuk-notification-banner__heading {
        font-size:1.5rem;
        line-height: 1.25
    }
}

@media print {
    .govuk-notification-banner__heading {
        font-size: 18pt;
        line-height: 1.15
    }
}

.govuk-notification-banner__link {
    font-family: GDS Transport,arial,sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-decoration: underline;
    text-decoration-thickness: max(1px,.0625rem);
    text-underline-offset: .1578em
}

@media print {
    .govuk-notification-banner__link {
        font-family: sans-serif
    }
}

.govuk-notification-banner__link:hover {
    text-decoration-thickness: max(3px,.1875rem,.12em);
    -webkit-text-decoration-skip-ink: none;
    text-decoration-skip-ink: none;
    -webkit-text-decoration-skip: none;
    text-decoration-skip: none
}

.govuk-notification-banner__link:focus {
    outline: 3px solid transparent;
    background-color: #fd0;
    box-shadow: 0 -2px #fd0,0 4px #0b0c0c;
    text-decoration: none
}

@supports not (text-wrap: balance) {
    .govuk-notification-banner__link:focus {
        -webkit-box-decoration-break:clone;
        box-decoration-break: clone
    }
}

.govuk-notification-banner__link:link,.govuk-notification-banner__link:visited {
    color: #1d70b8
}

.govuk-notification-banner__link:hover {
    color: #003078
}

.govuk-notification-banner__link:active,.govuk-notification-banner__link:focus {
    color: #0b0c0c
}

.govuk-notification-banner--success {
    border-color: #00703c;
    background-color: #00703c
}

.govuk-notification-banner--success .govuk-notification-banner__link:link,.govuk-notification-banner--success .govuk-notification-banner__link:visited {
    color: #00703c
}

.govuk-notification-banner--success .govuk-notification-banner__link:hover {
    color: #004e2a
}

.govuk-notification-banner--success .govuk-notification-banner__link:active {
    color: #00703c
}

.govuk-notification-banner--success .govuk-notification-banner__link:focus {
    color: #0b0c0c
}
```
{% endraw %}
</div>





## Contribute code for this component

If you have code that is relevant to this component you can add it to the [Github discussion]({{ githuburl }}). This helps other people to use it in their service.

{% endtab %}

{% endtabs %}
