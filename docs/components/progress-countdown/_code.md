---
title: Code
order: 40
tags: 'progress-countdown'
permalink: false
eleventyComputed:
  override:eleventyNavigation: false
---
Code has been added for this component. There may be other code blocks in the [‘progress countdown’ Github discussion]({{ githuburl }}).


### Code block 1: HTML

<div class="app-example__code" data-module="app-copy">

```HTML
{% raw %}
<div class="pop-progress__row">

<div class="pop-progress__bar-area" data-percent="59" role="progressbar" aria-valuenow="59" aria-valuemin="0" aria-valuemax="100" aria-label="59% complete" style="--pop-progress-pct: 59%;">
  <div class="pop-progress__track"></div>
  <div class="pop-progress__fill"></div>
  <div class="pop-progress__marker" role="presentation" aria-hidden="true">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" width="30" height="30" focusable="false">
      <circle cx="15" cy="15" r="15" fill="#1d70b8"></circle>
      <path d="M9 15.5L13 19.5L21 10.5" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" fill="none"></path>
    </svg>
  </div>
  
    <p class="pop-progress__completed">Completed: 10 months, 19 days (59%)</p>
  
</div>

  <p class="pop-progress__remaining">Remaining: <br class="pop-progress__remaining-break">7 months, 12 days (41%)</p>


          </div>
{% endraw %}
```

</div>



### Code block 2: CSS

<div class="app-example__code" data-module="app-copy">

```CSS
{% raw %}
.pop-progress__row {
    display: block
}

.pop-progress__title {
    font-family: GDS Transport,arial,sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale
}

@media print {
    .pop-progress__title {
        font-family: sans-serif
    }
}

.pop-progress__title {
    font-weight: 700;
    font-size: 1.1875rem;
    line-height: 1.3157894737
}

@media print {
    .pop-progress__title {
        font-size: 14pt;
        line-height: 1.15
    }
}

.pop-progress__title {
    margin-bottom: 10px
}

.pop-progress__bar-area {
    position: relative;
    width: 100%;
    height: 65px
}

.pop-progress__bar-area--bar-only {
    height: 30px
}

.pop-progress__track {
    position: absolute;
    left: 0;
    right: 0;
    top: 8px;
    height: 15px;
    background-color: #d9d9d9
}

.pop-progress__fill {
    position: absolute;
    left: 0;
    top: 8px;
    height: 15px;
    width: var(--pop-progress-pct, 0%);
    background-color: #1d70b8
}

.pop-progress__marker {
    position: absolute;
    top: 0;
    left: max(15px,var(--pop-progress-pct, 0%));
    transform: translate(-50%);
    line-height: 0
}

.pop-progress__completed {
    font-family: GDS Transport,arial,sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale
}

@media print {
    .pop-progress__completed {
        font-family: sans-serif
    }
}

.pop-progress__completed {
    font-weight: 400;
    font-size: 1rem;
    line-height: 1.25
}

@media print {
    .pop-progress__completed {
        font-size: 14pt;
        line-height: 1.2
    }
}

.pop-progress__completed {
    position: absolute;
    top: 44px;
    left: 0;
    right: 0;
    margin: 0;
    white-space: normal
}

.pop-progress__remaining {
    font-family: GDS Transport,arial,sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale
}

@media print {
    .pop-progress__remaining {
        font-family: sans-serif
    }
}

.pop-progress__remaining {
    font-weight: 400;
    font-size: 1rem;
    line-height: 1.25
}

@media print {
    .pop-progress__remaining {
        font-size: 14pt;
        line-height: 1.2
    }
}

.pop-progress__remaining {
    display: block;
    margin: 0;
    padding-top: 10px;
    text-align: left;
    white-space: normal
}

.pop-progress__remaining-break {
    display: none
}
{% endraw %}
```

</div>




## Contribute code for this component

If you have code that is relevant to this component you can add it to the [Github discussion]({{ githuburl }}). This helps other people to use it in their service.