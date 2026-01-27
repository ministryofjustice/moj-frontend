---
title: Code
order: 40
tags: 'report-a-problem'
permalink: false
eleventyComputed:
  override:eleventyNavigation: false
---
Code has been added for this component. There may be other code blocks in the [‘report a problem’ Github discussion]({{ githuburl }}).


### Code block 1: HTML

<div class="app-example__code" data-module="app-copy">

```HTML
{% raw %}
<app-support-widget class="support-widget">
  <div class="govuk-width-container">
    <div class="support-widget__inner">
      <span class="support-widget__prompt">Is this page not working correctly?</span>
      <button type="button" class="support-widget__button" data-support-toggle="" aria-expanded="true" aria-controls="support-widget-content">
        Report a problem with this page
      </button>
    </div>
    <div class="support-widget__content" id="support-widget-content" data-support-content="">
      <div class="support-widget__panels">
        <div class="support-widget__panel support-widget__panel--left">
          <h3 class="govuk-heading-s govuk-!-margin-bottom-2">Report a problem</h3>
          <p class="govuk-body-s govuk-!-margin-bottom-3">
            If you are having problems with this page, you can report it using our <a href="#" class="govuk-link">ServiceNow form</a>.
          </p>
          <p class="govuk-body-s govuk-!-margin-bottom-0">
            Please provide the request details shown here, along with a description of the issue you experienced.
          </p>
        </div>
        <div class="support-widget__panel support-widget__panel--right">
          <dl class="support-widget__data">
            <div class="support-widget__data-row">
              <dt>Your diagnostic here</dt>
              <dd>Your value here</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  </div>
</app-support-widget>
{% endraw %}
```

</div>

#### How to use the code

Add this as a component that sits directly above your footer. Leave no spacing between the two, as the component is intended to sit flush on top of the footer.


### Code block 2: JavaScript

<div class="app-example__code" data-module="app-copy">

```JavaScript
{% raw %}
// index.js
import { SupportWidget } from './support-widget.mjs'

customElements.define('app-support-widget', SupportWidget)

---
// SupportWidget.mjs
export class SupportWidget extends HTMLElement {
  constructor() {
    super()

    this.$button = this.querySelector('[data-support-toggle]')
    this.$content = this.querySelector('[data-support-content]')

    if (!this.$button || !this.$content) return

    this.$content.hidden = true
    this.$button.setAttribute('aria-expanded', 'false')
    this.$button.setAttribute('aria-controls', this.$content.id)

    this.$button.addEventListener('click', () => this.toggle())
  }

  toggle() {
    const isExpanded = this.$button.getAttribute('aria-expanded') === 'true'

    this.$button.setAttribute('aria-expanded', !isExpanded)
    this.$content.hidden = isExpanded
  }
}


{% endraw %}
```

</div>

#### How to use the code

Add this code to your assets bundle by initialising it in your `index.js`



## Contribute code for this component

If you have code that is relevant to this component you can add it to the [Github discussion]({{ githuburl }}). This helps other people to use it in their service.