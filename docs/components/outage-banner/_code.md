---
title: Code
order: 40
tags: 'outage-banner'
permalink: false
eleventyComputed:
  override:eleventyNavigation: false
---

## Code

Code has been added for this component. There may be other code blocks in the [‘Outage banner’ Github discussion]({{ githuburl }}).


### Code block 1: Nunjucks

<div class="app-example__code" data-module="app-copy">

```njk
{% raw %}
{%- from "govuk/macros/attributes.njk" import govukAttributes -%}

<div class="moj-outage-banner" {{ govukAttributes(params.attributes) }}>
  <div class="govuk-width-container moj-outage-banner__inner">
    {{- params.html | safe if params.html else params.text -}}
  </div>
</div>
{% endraw %}
```

</div>



### Code block 2: CSS

<div class="app-example__code" data-module="app-copy">

```CSS
{% raw %}
@use "sass:color";
@use "../../vendor/govuk-frontend" as *;

$moj-outage-banner-background: color.mix(govuk-colour('red'), #fff, $weight: 20%) !default;
$moj-outage-banner-colour: $govuk-text-colour !default;

.moj-outage-banner {
  min-height: 70px;
  background-color: $moj-outage-banner-background;
}

.moj-outage-banner__inner {
  @include govuk-font($size: 19);
  padding: 22px 0;
  color: $moj-outage-banner-colour;

  p:last-child {
    margin-bottom: 0;
  }

  a:link, a:visited {
    color: $moj-outage-banner-colour;
  }
}
```
{% endraw %}
</div>




## Contribute code for this component

If you have code that is relevant to this component you can add it to the [Github discussion]({{ githuburl }}). This helps other people to use it in their service.
