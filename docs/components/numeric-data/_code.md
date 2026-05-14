---
title: Code
order: 40
tags: 'numeric-data'
permalink: false
eleventyComputed:
  override:eleventyNavigation: false
---

## Code

Code has been added for this component. There may be other code blocks in the [‘numeric data’ Github discussion]({{ githuburl }}).

### Code block 1: HTML
<div class="app-example__code" data-module="app-copy">

```html
{% raw %}
<div class="numeric-data">
    <span class="numeric-data__item govuk-heading-xl govuk-!-margin-bottom-0">1,062</span>
    <p class="numeric-data__item govuk-body">Active cases</p>
</div>
{% endraw %}
```

</div>


### Code block 2: CSS

<div class="app-example__code" data-module="app-copy">

```CSS
{% raw %}
.numeric-data {
    padding-right: 3em;

    .numeric-data__item {
        margin-bottom: 0;

        &:first-of-type {
            padding-right: 10px;
        }
    }
}
{% endraw %}
```

</div>

