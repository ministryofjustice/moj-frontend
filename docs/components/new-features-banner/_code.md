---
title: Code
order: 40
tags: 'new-features-banner'
permalink: false
eleventyComputed:
  override:eleventyNavigation: false
---
Code has been added for this component. There may be other code blocks in the [‘new features banner’ Github discussion]({{ githuburl }}).


### Code block 1: HTML

<div class="app-example__code" data-module="app-copy">

```HTML
{% raw %}
<div class="govuk-grid-row technical-updates-banner" id="technical-updates-banner" data-banner-version="30 May 2025">
  <div class="govuk-grid-column-full">
    <div class="govuk-width-container govuk-body technical-updates-container">
      <div class="technical-updates-content">
        <strong class="technical-updates-whats-new">New features</strong>
        <span>
            We’re updating the service all the time, <a class="govuk-link govuk-link--inverse" href="/whats-new">find out more on the What’s new page.</a>
        </span>
      </div>
      <a id="hide-message" class="technical-updates-hide-message govuk-link govuk-link--inverse" href="#" aria-current="page">Hide message</a>
    </div>
  </div>
</div>
{% endraw %}
```

</div>

#### How to use the code

We use the "Hide message" link to remove the banner. If they click the link to see what the updates are, this also should remove the banner from the rest of the site.

### Code block 2: CSS

<div class="app-example__code" data-module="app-copy">

```CSS
{% raw %}
.technical-updates-banner {
    background-color: #44247b;
    padding: 10px 0 10px 0;
}

.govuk-grid-row {
    margin-right: -15px;
    margin-left: -15px;
}

.technical-updates-container {
    color: #fff;
}

.technical-updates-content {
    float: left;
}
{% endraw %}
```

</div>


## Contribute code for this component

If you have code that is relevant to this component you can add it to the [Github discussion]({{ githuburl }}). This helps other people to use it in their service.

