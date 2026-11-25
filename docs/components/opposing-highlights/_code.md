---
title: Code
order: 40
tags: 'opposing-highlights'
permalink: false
eleventyComputed:
  override:eleventyNavigation: false
---
Code has been added for this component. There may be other code blocks in the [‘opposing highlights’ Github discussion]({{ githuburl }}).


### Code block 1: CSS

<div class="app-example__code" data-module="app-copy">

```CSS
{% raw %}
@use "govuk-frontend/dist/govuk" as govuk;
.moj-highlight {
  display: inline;
  padding: 0;
  line-height: inherit;
  box-decoration-break: clone;
  -webkit-box-decoration-break: clone;
}
/*
* AI suggestion
*/
.moj-highlight--ai-suggestion {
  background: govuk.govuk-colour(
    "blue",
    $variant: "tint-80"
  );
  text-decoration-line: underline;
  text-decoration-style: wavy;
  text-decoration-color: govuk.govuk-colour("blue");
  text-decoration-skip-ink: auto;
}
/*
* Redaction
*/
.moj-highlight--redaction {
  background: govuk.govuk-colour(
    "orange",
    $variant: "tint-80"
  );
  border-top: 2px solid govuk.govuk-colour("orange");
  border-right: 0;
  border-bottom: 2px solid govuk.govuk-colour("orange");
  border-left: 0;
}
{% endraw %}
```

</div>



### Code block 2: HTML

<div class="app-example__code" data-module="app-copy">

```HTML
{% raw %}
<p class="govuk-body">
  Example text
  <span class="govuk-visually-hidden">AI suggestion start </span>
  <span class="moj-highlight moj-highlight--ai-suggestion">
    example AI suggestion
  </span>
  <span class="govuk-visually-hidden"> AI suggestion end</span>
  example text.
</p>
{% endraw %}
```

</div>

#### How to use the code

This is an example of an 'AI suggestion' highlight.


### Code block 3: HTML

<div class="app-example__code" data-module="app-copy">

```HTML
{% raw %}
<p class="govuk-body">
  Example text
  <span class="govuk-visually-hidden">Redaction start </span>
  <span class="moj-highlight moj-highlight--redaction">
    example redaction
  </span>
  <span class="govuk-visually-hidden">AI suggestion start </span>
  <span
    class="moj-highlight moj-highlight--redaction moj-highlight--ai-suggestion"
  >
    example AI suggestion
  </span>
  <span class="govuk-visually-hidden"> AI suggestion end</span>
  <span class="moj-highlight moj-highlight--redaction">
    example redaction
  </span>
  <span class="govuk-visually-hidden"> Redaction end</span>
  example text.
</p>
{% endraw %}
```

</div>

#### How to use the code

This is an example of an AI suggestion highlight with redactions overlaid.



## Contribute code for this component

If you have code that is relevant to this component you can add it to the [Github discussion]({{ githuburl }}). This helps other people to use it in their service.