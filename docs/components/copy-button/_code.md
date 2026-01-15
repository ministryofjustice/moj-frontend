---
title: Code
order: 40
tags: 'copy-button'
permalink: false
eleventyComputed:
  override:eleventyNavigation: false
---

## Code

Code has been added for this component. There may be other code blocks in the [‘copy button’ Github discussion]({{ githuburl }}).


### Code block 1: HTML

<div class="app-example__code" data-module="app-copy">

```HTML
{% raw %}
<span id="copy-alert" class="govuk-visually-hidden" aria-live="polite"><span>
<p>Your application reference is: <span id="reference-number">A12-345-X</span>
<button class="govuk-button govuk-button--secondary copy-button" id="copy-reference-number">Copy reference</button>
</p>
{% endraw %}
```

</div>

### Code block 2: CSS

<div class="app-example__code" data-module="app-copy">

```CSS
{% raw %}
// Hide copy text links if Javascript is disabled
.copy-button { display: none }

body.js-enabled {
  .copy-button { display: inline }

  @media print {
    .copy-button { display: none }
  }
}

.disable-click {
  pointer-events: none;
  background-color: transparent;
  box-shadow: none;
}
{% endraw %}
```

</div>

### Code block 3: JavaScript

<div class="app-example__code" data-module="app-copy">

```JS
{% raw %}
/**
* @param {string} textElementId - Id of the element whose text will be copied
* @param {string} copyElementId - Id of the copy button element
* @param {string} screenReaderAlertText - text that will be added into live region for screen reader users
* @param {string} originalCopyText - original text of copy button element
**/
function copyText(textElementId, copyElementId, screenReaderAlertText, originalCopyText = 'Copy') {
  let textElement = document.querySelector(textElementId);
  let copyElement = document.querySelector(copyElementId);
  let screenReaderAlert = document.getElementById("copy-alert");

  if (textElement && copyElement) {
    copyElement.addEventListener('click', (e) => {
      e.preventDefault();

      let text = textElement.textContent.trim();
      window.navigator.clipboard.writeText(text);
      screenReaderAlert.textContent = screenReaderAlertText;
      copyElement.classList.add('disable-click');
      copyElement.textContent = "Copied";

      setTimeout(() => {
        screenReaderAlert.textContent = "";
        copyElement.classList.remove('disable-click');
        copyElement.textContent = originalCopyText;
      }, 4000);

      copyElement.blur();
      return true;
    });
  }
}

copyText('#reference-number','#copy-reference-number', 'Reference copied', 'Copy reference')
{% endraw %}
```

</div>



