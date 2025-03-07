---
layout: layouts/get-started.njk
subsection: Setup for production
title: Import MoJ Frontend JavaScript
redirect_from: /get-started/setting-up-javascript
eleventyNavigation:
  key: Import JavaScript
  parent: Setup for production
  order: 70
  excerpt: "Several MoJ Design System components use JavaScript to provide interactive features. In order to fully use these components you will need to add some code to your service to set up the JavaScript."
---

Several MoJ Design System components use JavaScript to provide interactive features. In order to fully use these components you will need to add some code to your service to set up the JavaScript.

You can either

- include MoJ Frontend JavaScript code directly in your HTML templates
- import the JavaScript using a bundler like [Rollup](https://rollupjs.org/) or [webpack](https://webpack.js.org/)

## Add the JavaScript file to your HTML

If you decide to add the JavaScript to your HTML, you can do one of the following:

- serve the JavaScript files from the combined javascripts folders – recommended
- copy the JavaScript files into your application

## Serve the JavaScript files from the combined javascripts folders – recommended

Set up your routing so requests for the JavaScript files in `<YOUR-SITE-URL>/javascripts` are served from both `/node_modules/govuk-frontend/dist/govuk` and `/node_modules/@ministryofjustice/frontend/moj`.

For example if you’re using [express.js](https://expressjs.com/), add the following to your `app.js` file:

```js
router.use('/javascripts', [
  express.static('node_modules/@ministryofjustice/frontend/moj'),
  express.static('node_modules/govuk-frontend/dist/govuk')
])
```

You will also need to install and serve [jQuery](https://jquery.com/).

Then import the JavaScript files before the closing `</body>` tag of your HTML page or page template, and run the `initAll` functions to initialise all the components.

```html
<body class="govuk-template__body">
  <script>document.body.className += ' js-enabled' + ('noModule' in HTMLScriptElement.prototype ? ' govuk-frontend-supported' : '');</script>

  <!-- // ... -->

  <script type="module" src="/javascripts/jquery.min.js"></script>
  <script type="module" src="/javascripts/govuk-frontend.min.js"></script>
  <script type="module" src="/javascripts/moj-frontend.min.js"></script>

  <script type="module">
    import * as GOVUKFrontend from '/javascripts/govuk-frontend.min.js'

    window.GOVUKFrontend = GOVUKFrontend
    window.GOVUKFrontend.initAll()
    window.MOJFrontend.initAll()
  </script>
</body>
```

**Some components cannot be initialised by this method** and this is noted on their individual documentation pages. For more details, [see below](#initialise-individual-components).

## Import using a bundler

If you decide to import using a bundler, use `import` to import jQuery and all of the design systems’s components, then run the `initAll` functions to initialise them:

```mjs
import * as MOJFrontend from '@ministryofjustice/frontend'
import * as GOVUKFrontend from 'govuk-frontend'
import $ from 'jquery'

window.$ = $
GOVUKFrontend.initAll()
MOJFrontend.initAll()
```

## Initialise individual components

Rather than using `initAll`, you can initialise individual components by identifying them with their `data-module` attribute. For example, to initialise just the [Password reveal](/components/password-reveal/) component:

```html
<script>
  var PasswordReveal = window.MOJFrontend.PasswordReveal
  var $passwordReveal = document.querySelector(
    '[data-module="moj-password-reveal"]'
  )
  if ($passwordReveal) {
    new PasswordReveal($passwordReveal)
  }
</script>
```

This approach is necessary for the following components because they require manual configuration. There is more detail on each of their documentation pages:

- [Button menu](/components/button-menu/)
- [Filter toggle button](/components/filter/)
- [Multi-file upload](/components/multi-file-upload/)
