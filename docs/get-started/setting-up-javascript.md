---
layout: layouts/get-started.njk
subsection: How to guides
title:  Setting up JavaScript
---

Several MOJ Design System components use JavaScript to provide interactive features. In order to fully use these components you will need to add some code to your service to set up the JavaScript.

You can either

- include the MOJ Design System's JavaScript code directly in your HTML templates
- import the JavaScript using a bundler like Webpack

## Add the JavaScript file to your HTML

To include the code directly in a template, first either:

- set up your routing so that requests for the JavaScript file are served from `node_modules/@ministryofjustice/frontend/moj/all.js`
- copy the `node_modules/@ministryofjustice/frontend/moj/all.js` file into your application

Then import the JavaScript file before the closing `</body>` tag of your HTML page or page template, and run the `initAll` function to initialise the components.

```html
<body>
...
  <script src="<YOUR-APP>/<YOUR-JS-FILE>.js"></script>
  <script>
    window.MOJFrontend.initAll()
  </script>
</body>
```

**Some components cannot be initialised by this method** and this is noted on their individual documentation pages. For more details, [see below](#initialize-individual-components).

## Import using a bundler

If you decide to import using a bundler, use `import` to import all of design systems’s components, then run the `initAll` function to initialise them:

```javascript
import { initAll } from '@ministryofjustice/frontend'
initAll()
```

## Initialize individual components

Rather than using `initAll`, you can initialise individual components by identifying them with their `data-module` attribute. For example, to initialise just the [Password reveal](../../components/password-reveal) component:

```html
<script>
var PasswordReveal = window.MOJFrontend.PasswordReveal
var $passwordReveal = document.querySelector('[data-module="moj-password-reveal"]')
if ($passwordReveal) {
    new PasswordReveal($passwordReveal)
}
</script>
```

This approach is necessary for the following components because they require manual configuration. There is more detail on each of their documentation pages:

- [Button menu](../../components/button-menu)
- [Filter toggle button](../../components/filter)
- [Form validator](../../components/form-validator)
- [Multi-file upload](../../components/multi-file-upload)
