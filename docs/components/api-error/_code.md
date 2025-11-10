---
title: Code
order: 40
tags: 'api-error'
permalink: false
eleventyComputed:
  override:eleventyNavigation: false
---

## Code

Code has been added for this component. There may be other code blocks in the [‘API error’ Github discussion]({{ githuburl }}).


### Code block 1: Nunjucks

<div class="app-example__code" data-module="app-copy">

```njk
{% raw %}
{%- from "govuk/macros/attributes.njk" import govukAttributes -%}

{%- if params.inset %}
  <p class="moj-inset-api-error" {{ govukAttributes(params.attributes) }}>
    {%- if params.html %}
      {{- params.html | safe -}}
    {%- elif params.text %}
      {{- params.text -}}
    {%- else %}
      This information is currently unavailable. Try again later.
    {% endif -%}
  </p>
{%- else %}
  <div class="moj-api-error" {{ govukAttributes(params.attributes) }}>
    {%- if params.html %}
      {{- params.html | safe -}}
    {%- elif params.text %}
      {{- params.text -}}
    {%- else %}
      <p>Sorry, there is a problem with the service</p>
      <p>Some information on this page may be unavailable. Try again later.</p>
    {% endif -%}
  </div>
{%- endif %}
{% endraw %}
```

</div>



### Code block 2: CSS

<div class="app-example__code" data-module="app-copy">

```CSS
{% raw %}
@use "../../vendor/govuk-frontend" as *;

.moj-api-error {
  padding: 16px 22px;
  background-color: govuk-colour('light-grey');
  border-left: 8px solid govuk-colour('red');

  p {
    @include govuk-font($size: 19, $weight: 'bold');
    color: govuk-colour('black');
    margin: 5px 0;
  }

  p + p {
    @include govuk-font($size: 19);
    margin-top: 0;
  }
}

.moj-inset-api-error {
  @include govuk-font($size: 16);
  padding: 4px 8px;
  border-left: $govuk-border-width solid govuk-colour('red');
  margin-bottom: 4px;
}
{% endraw %}
```

</div>




## Contribute code for this component

If you have code that is relevant to this component you can add it to the [Github discussion]({{ githuburl }}). This helps other people to use it in their service.
