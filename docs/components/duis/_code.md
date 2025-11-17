---
title: Code
order: 40
tags: 'duis'
permalink: false
eleventyComputed:
  override:eleventyNavigation: false
---
Code has been added for this component. There may be other code blocks in the [‘duis’ Github discussion]({{ githuburl }}).


### Code block 1: Nunjucks

<div class="app-example__code" data-module="app-copy">

```njk
{% raw %}
{% from "govuk/components/notification-banner/macro.njk" import govukNotificationBanner %}

{% set html %}
  <p class="govuk-notification-banner__heading">
    You have 7 days left to send your application.
    <a class="govuk-notification-banner__link" href="#">View application</a>.
  </p>
{% endset %}

{{ govukNotificationBanner({
  html: html
}) }}
{% endraw %}
```

</div>

#### How to use the code

In lacus ipsum, molestie nec sapien vitae, tincidunt tristique nisi. Integer a lacus quis nisl mollis fringilla. Nullam blandit imperdiet mauris, ac feugiat ante. Vestibulum nec semper nulla, ut ultricies massa. Curabitur lacinia tortor augue, sed varius leo viverra non. Fusce vitae libero ac orci elementum vestibulum eu et libero. In rhoncus laoreet nisi, sit amet rutrum tellus. Ut ut dui in metus sodales molestie eu ut purus.




### Code block 2: HTML

<div class="app-example__code" data-module="app-copy">

```HTML
{% raw %}
<div class="govuk-notification-banner" role="region" aria-labelledby="govuk-notification-banner-title" data-module="govuk-notification-banner">
  <div class="govuk-notification-banner__header">
    <h2 class="govuk-notification-banner__title" id="govuk-notification-banner-title">
      Important
    </h2>
  </div>
  <div class="govuk-notification-banner__content">
    <p class="govuk-notification-banner__heading">
      You have 7 days left to send your application.
      <a class="govuk-notification-banner__link" href="#">View application</a>.
    </p>
  </div>
</div>
{% endraw %}
```

</div>

#### How to use the code

Some HTML


### Code block 3: CSS

<div class="app-example__code" data-module="app-copy">

```CSS
{% raw %}
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

.govuk-notification-banner__content>* {
    box-sizing: border-box;
    max-width: 605px
}

.govuk-notification-banner__content>:last-child {
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
{% endraw %}
```

</div>

#### How to use the code

Some CSS



## Contribute code for this component

If you have code that is relevant to this component you can add it to the [Github discussion]({{ githuburl }}). This helps other people to use it in their service.