---
title: Bad component
tabs: true
status: Experimental
statusDate: July 2025
excerpt: ""
lede: ""
githuburl: https://github.com/ministryofjustice/moj-frontend/discussions/xxx


---

{% tabs "paginate" %}
{% tab "Overview" %}

<div class="img-container">
  <img src="/assets/images/submission-1752482939276/Screenshot-2025-04-02-at-22.59.16.png" alt="Bad component" />
</div>

## Overview
Does bad things

### How the component is currently used

for evil

### Contribute to this component
You can help develop this component by adding information to the Github discussion. This helps other people to use it in their service.

{% endtab %}

{% tab "Designs" %}

## Designs

A Figma link was not included when this component was added.

      There may be more information in the [Bad-component Github discussion]({{ githuburl }}). You can also view the component image in the overview.

## Contribute a Figma link

      If you have a Figma link for this component (or a component like it) you can add it to [Github discussion]({{ githuburl }}). This helps other people to use it in their service.

{% endtab %}

{% tab "Accessibility" %}

## Accessibility

No accessibility findings were included when this component was added. There may be more information in the [Bad-component Github discussion]({{ githuburl }}).
## Contribute accessibility findings

    If you have accessibility findings that are relevant to this component you can add them to the [Github discussion]({{ githuburl }}). This helps other people to use it in their service.

{% endtab %}

{% tab "Code" %}

## Code

Code has been added for this component. There may be other code examples in the [Bad-component Github discussion]({{ githuburl }}).


### Example 1: html

```html
{% raw %}

{% endraw %}
```




### Example 2: html

```html
{% raw %}



{% endraw %}
```




### Example 3: html

```html
{% raw %}

{% endraw %}
```




### Example 4: javascript

```javascript
{% raw %}
    const csrf_token = document.querySelector("meta[name='csrf-token']").getAttribute("content");

    const ajaxLoad = () =&gt; {
        // process the URL hash fragment
        const hashFragment = window.location.hash.slice(1);

        // hash fragment should be of the format: /^(get|post);(.*)$/
        // e.g., https://site.com/index/#post;/profile
        if (hashFragment.length &gt; 0 &amp;&amp; hashFragment.includes(';')) {
            const params = hashFragment.match(/^(get|post);(.*)$/);

            if (params &amp;&amp; params.length) {
                const requestMethod = params[1];
                const requestEndpoint = params[3];

                fetch(requestEndpoint, {
                    method: requestMethod,
                    headers: {
                        'X-CSRF-Token': csrf_token,
                        // [...]
                    },
                    // [...]
                })
                .then(response =&gt; { /* [...] */ })
                .catch(error =&gt; console.error('Request failed:', error));
            }
        }
    };

    // trigger the async request on page load - better practice is to use event listeners
    window.addEventListener('DOMContentLoaded', ajaxLoad);
{% endraw %}
```





## Contribute code for this component

If you have code that is relevant to this component you can add it to the [Github discussion]({{ githuburl }}). This helps other people to use it in their service.

{% endtab %}

{% endtabs %}
