---
title: Code
order: 40
tags: 'progress-tracker'
permalink: false
eleventyComputed:
  override:eleventyNavigation: false
---
Code has been added for this component. There may be other code blocks in the [‘progress tracker’ Github discussion]({{ githuburl }}).

### Code block 1: HTML

<div class="app-example__code" data-module="app-copy">

```html
{% raw %}
<div id="progress" class="app-progress-bar">
  <ol class="app-progress-bar__list">
    <li class="app-progress-bar__item">
      <span class="app-progress-bar__icon app-progress-bar__icon--complete"></span>
      <span class="app-progress-bar__label">
        First step<span class="govuk-visually-hidden"> completed</span>
      </span>
    </li>
    <li class="app-progress-bar__item">
      <span class="app-progress-bar__icon app-progress-bar__icon--complete"></span>
      <span class="app-progress-bar__label">
        Second step<span class="govuk-visually-hidden"> completed</span>
      </span>
    </li>
    <li class="app-progress-bar__item">
      <span class="app-progress-bar__icon"></span>
      <span class="app-progress-bar__label">
        Third step<span class="govuk-visually-hidden"> not completed</span>
      </span>
    </li>
  </ol>
</div>
{% endraw %}
```

</div>



### Code block 2: CSS

<div class="app-example__code" data-module="app-copy">

```css
{% raw %}
$govuk-assets-path: "/static/assets/";

.app-progress-bar {
  margin-bottom: govuk-spacing(7);
}

.app-progress-bar__list {
  font-size: 0; // Stop the connecting line from extending past the last item
  list-style: none;
  padding: 0;
  position: relative;

  &::before {
    border-left: 6px solid govuk-colour("green");
    content: "";
    left: 13px;
    position: absolute;
    height: 100%;
  }

}

.app-progress-bar__item {
  @include govuk-font(19);
  display: flex;
  position: relative;
  flex-wrap: nowrap;
  padding-bottom: 0.3rem;

  &:first-child {
    &::before {
      border-left: 6px solid govuk-colour("green");
      content: "";
      position: absolute;
    }
  }

  &:last-child {
    &::before {
      border-left: 6px solid govuk-colour("white"); // Stop the connecting line from extending past the last item
      content: "";
      left: 13px;
      position: absolute;
      height: 100%;
    }
  }
}

.app-progress-bar__icon {
  position: relative;
  background-color: govuk-colour("white");
  border: 6px solid govuk-colour("green");
  border-radius: 50%;
  box-sizing: border-box;
  height: 32px;
  width: 32px;
  min-width: 32px;
  min-height: 32px;
  margin-right: 0.5rem;
}

.app-progress-bar__icon--complete {
  background-color: govuk-colour("green");
  background-image: url(#{$govuk-assets-path}images/icon-progress-tick.svg);
  background-position: 50% 50%;
  background-repeat: no-repeat;
}

.app-progress-bar__label {
  @include govuk-font(19);
  display: flex;
  font-weight: inherit;
  flex-wrap: wrap;
  align-content: center;
}
{% endraw %}
```

</div>



### Code block 3: SVG

<div class="app-example__code" data-module="app-copy">

```
{% raw %}
<svg xmlns="http://www.w3.org/2000/svg" width="18" height="15"><path fill="#fff" d="M5.9 9.6 2.5 6.1 0 8.7l5.9 6.1L18 2.7 15.5.2 5.9 9.6z"/></svg>

{% endraw %}
```

</div>

Save the SVG to `static/assets/images/icon-progress-tick.svg` before using it in your project.  If it's saved somewhere else you'll need to modify the path in the CSS code.


## Contribute code for this component

If you have code that is relevant to this component you can add it to the [Github discussion]({{ githuburl }}). This helps other people to use it in their service.


