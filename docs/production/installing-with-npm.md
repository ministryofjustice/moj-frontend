---
layout: layouts/get-started.njk
subsection: Production
title: Install MoJ Frontend with Node.js package manager (npm)
redirect_from: /get-started/installing-with-npm
eleventyNavigation:
  key: Install with Node.js package manager (npm)
  parent: Production
  order: 20
  excerpt: "We recommend installing MoJ Frontend using npm."
---

## Requirements

To use MoJ Frontend with npm you must:

1. Install the long-term support (LTS) version of [Node.js](https://nodejs.org/en/), which includes npm. The minimum version of Node.js required is 12.17.0 to support ECMAScript (ES) modules.

   (We recommend using [`nvm`](https://github.com/creationix/nvm) for managing versions of Node.)

2. Create a [package.json file](https://docs.npmjs.com/files/package.json) if you don’t already have one. You can create a default `package.json` file by running `npm init` from the root of your application.

You can also install [Nunjucks v3.0.0 or later](https://www.npmjs.com/package/nunjucks) if you want to use either [GOV.UK Frontend’s Nunjucks macros](https://frontend.design-system.service.gov.uk/use-nunjucks/) or [MoJ Frontend’s Nunjucks macros](/production/use-nunjucks/).

## Install dependencies

To install, run:

```shell
npm install @ministryofjustice/frontend govuk-frontend moment --save
```

When the installation finishes, the `@ministryofjustice/frontend` package and other dependencies will be in your `node_modules` folder.

## Get the CSS, Assets and JavaScript working

Add the HTML for a component to your application. We recommend the accordion component as this makes it easier to spot if JavaScript is not working.

Go to the [example accordion component](https://design-system.service.gov.uk/components/accordion/#accordion-example) on the GOV.UK Design System website, then copy the HTML.

Paste the HTML into a page or template in your application.

### Get the CSS working

1. Copy both `/node_modules/@ministryofjustice/frontend/moj/moj-frontend.min.css` and `/node_modules/govuk-frontend/dist/govuk/govuk-frontend.min.css` into your application.

2. Add your CSS files to your page layout if you need to. For example:

```html
<head>
  <!-- // ... -->
  <link rel="stylesheet" href="/stylesheets/govuk-frontend.min.css">
  <link rel="stylesheet" href="/stylesheets/moj-frontend.min.css">
  <!-- // ... -->
</head>
```

3. Run your application and check that the accordion displays correctly.

The accordion will use a generic font until you get the font and images working, and will not be interactive until you get the JavaScript working.

There are also different ways you can [import CSS](/production/import-css/), including into your project's main Sass file:

```scss
@use "node_modules/govuk-frontend/dist/govuk" as *;
@forward "node_modules/@ministryofjustice/frontend/moj/all";
```

### Get the font and images working

Your component will not use the right font or images until you've added GOV.UK Frontend's assets to your application.

1. Copy the:

- `/node_modules/@ministryofjustice/frontend/moj/assets/images` contents to `<YOUR-APP>/assets/images`
- `/node_modules/govuk-frontend/dist/govuk/assets/images` contents to `<YOUR-APP>/assets/images`
- `/node_modules/govuk-frontend/dist/govuk/assets/fonts` contents to `<YOUR-APP>/assets/fonts`

2. Run your application, then use [the Fonts tab in Firefox Page Inspector](https://developer.mozilla.org/en-US/docs/Tools/Page_Inspector/How_to/Edit_fonts#The_Fonts_tab) to check the accordion is using the GDS Transport font.

In your live application, we recommend [serving the font and image assets directly](/production/import-font-and-image-assets/#serve-the-assets-from-the-combined-assets-folders-%E2%80%93-recommended).

### Get the JavaScript working

1. Add the following to the top of the `<body class="govuk-template__body">` section of your page template:

   ```html
   <script>document.body.className += ' js-enabled' + ('noModule' in HTMLScriptElement.prototype ? ' govuk-frontend-supported' : '');</script>
   ```

2. Copy both `/node_modules/@ministryofjustice/frontend/moj/moj-frontend.min.js` and `/node_modules/govuk-frontend/dist/govuk/govuk-frontend.min.js` files into your application.

3. Import the files before the closing `</body>` tag of your page template, then run the `initAll` functions to initialise all the components. For example:

   ```html
   <body class="govuk-template__body">
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

4. Run your application and check it works the same way as the Design System accordion example, by selecting the buttons and checking the accordion shows and hides sections.

In your live application, we recommend:

- [serving the JavaScript files directly](/production/import-javascript/#serve-the-javascript-files-from-the-combined-javascripts-folders-%E2%80%93-recommended) instead of copying the files manually
- importing only the components your application uses and [initialising all their instances](/production/import-javascript/#initialise-individual-components) on the page

Make sure you import all the components used throughout your application or some components will not work correctly for disabled users who use assistive technologies.

Once your testing is complete you can use the full code for page layouts and other components from the [GOV.UK Design System](https://design-system.service.gov.uk/) and [MoJ Design System website](/).
