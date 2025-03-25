---
layout: layouts/get-started.njk
subsection: Setup for production
title: Import MoJ Frontend JavaScript
redirect_from:
  - /get-started/setting-up-javascript
  - /production/setting-up-javascript
eleventyNavigation:
  key: Import JavaScript
  parent: Setup for production
  order: 70
  excerpt: "Several MoJ Design System components use JavaScript to provide interactive features. In order to fully use these components you will need to add some code to your service to set up the JavaScript."
---

Several MoJ Design System components use JavaScript to provide interactive features. In order to fully use these components you will need to add some code to your service to set up the JavaScript.

Both MoJ Frontend JavaScript and GOV.UK Frontend JavaScript must be run with `<script type="module">`.

This protects older browsers, including all versions of Internet Explorer, from running modern JavaScript that it does not support. Read about [GOV.UK Frontend browser support](https://frontend.design-system.service.gov.uk/browser-support/) for more information.

## Before you start

You’ll need to add the following to the top of the `<body class="govuk-template__body">` section of your page template if you’re not using [GOV.UK Frontend’s Nunjucks macros](https://frontend.design-system.service.gov.uk/use-nunjucks/) or [MoJ Frontend’s Nunjucks macros](/production/use-nunjucks/).

This snippet adds the `.govuk-frontend-supported` class in supported browsers:

```html
<script>document.body.className += ' js-enabled' + ('noModule' in HTMLScriptElement.prototype ? ' govuk-frontend-supported' : '');</script>
```

You should check the GOV.UK Frontend guidance [if the snippet is blocked by a Content Security Policy](#if-our-inline-javascript-snippet-is-blocked-by-a-content-security-policy).

Next, to import the JavaScript from MoJ Frontend and GOV.UK Frontend, you can either:

- add the JavaScript files to your HTML
- Import JavaScript using a bundler

## Add the JavaScript files to your HTML

If you decide to add the JavaScript to your HTML, you can do one of the following:

- serve the JavaScript files from the combined javascripts folders – recommended
- copy the JavaScript files into your application

Then import the JavaScript files before the closing `</body>` tag of your HTML page or page template, and run the `initAll` functions to initialise all the components.

```html
<body class="govuk-template__body">
  <script>document.body.className += ' js-enabled' + ('noModule' in HTMLScriptElement.prototype ? ' govuk-frontend-supported' : '');</script>

  <!-- // ... -->

  <script type="module" src="/javascripts/govuk-frontend.min.js"></script>
  <script type="module" src="/javascripts/moj-frontend.min.js"></script>

  <script type="module">
    import * as GOVUKFrontend from '/javascripts/govuk-frontend.min.js'
    import * as MOJFrontend from '/javascripts/moj-frontend.min.js'

    window.GOVUKFrontend = GOVUKFrontend
    window.MOJFrontend = MOJFrontend

    GOVUKFrontend.initAll()
    MOJFrontend.initAll()
  </script>
</body>
```

**Some components cannot be initialised by this method** and this is noted on their individual documentation pages. For more details, view guidance on [initialising individual components](#initialise-individual-components).

### Serve the JavaScript files from the combined javascripts folders – recommended

Set up your routing so requests for the JavaScript files in `<YOUR-SITE-URL>/javascripts` are served from both `/node_modules/govuk-frontend/dist/govuk` and `/node_modules/@ministryofjustice/frontend/moj`.

If you’re using [express.js](https://expressjs.com/), request routing could be set up as follows:

```js
router.use('/javascripts', [
  express.static('node_modules/@ministryofjustice/frontend/moj'),
  express.static('node_modules/govuk-frontend/dist/govuk'),
])
```

### Copy the JavaScript files into your application

If you decide to copy the JavaScript files instead, copy `/node_modules/@ministryofjustice/frontend/moj/moj-frontend.min.js` and `/node_modules/govuk-frontend/dist/govuk/govuk-frontend.min.js` files into your application.

You should use an automated task or your build pipeline to copy the files, so your project folder stays up to date when updates to MoJ Frontend and GOV.UK Frontend are released.

## Import JavaScript using a bundler

If you decide to import using a bundler like [Rollup](https://rollupjs.org/) or [webpack](https://webpack.js.org/), the bundled JavaScript files must be added using `<script type="module">` in your HTML:

```html
<script type="module" src="/javascripts/application.min.js"></script>
```

We encourage the use of ECMAScript (ES) modules, but you should check your bundler does not unnecessarily downgrade modern JavaScript for unsupported browsers.

If you decide to import using a bundler, use `import` to import jQuery and all of the design systems’s components, then run the `initAll` functions to initialise them:

```mjs
import * as MOJFrontend from '@ministryofjustice/frontend'
import * as GOVUKFrontend from 'govuk-frontend'

GOVUKFrontend.initAll()
MOJFrontend.initAll()
```

### Initialise individual components

Rather than using `initAll`, you can initialise individual components by identifying them with their `data-module` attribute. For example, to initialise just the [Date picker](/components/date-picker/) component:

```mjs
import { DatePicker } from '@ministryofjustice/frontend'

const $datePickers = document.querySelectorAll(
  '[data-module="moj-date-picker"]'
)

$datePickers.forEach(($datePicker) => {
  new DatePicker($datePicker)
})
```

This approach is necessary for the following components because they require manual configuration. There is more detail on each of their documentation pages:

- [Button menu](/components/button-menu/)
- [Filter toggle button](/components/filter/)
- [Multi-file upload](/components/multi-file-upload/)
