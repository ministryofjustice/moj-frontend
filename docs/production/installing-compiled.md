---
layout: layouts/get-started.njk
subsection: Setup for production
title: Try MoJ Frontend using precompiled files
redirect_from: /get-started/installing-compiled
eleventyNavigation:
  key: Try MoJ Frontend using precompiled files
  parent: Setup for production
  order: 30
  excerpt: "If your project does not use npm (or you want to try out MoJ Frontend without installing it through npm) download and include compiled stylesheets."
---

You can install MoJ Frontend using the compiled files released with each version. However, by doing so, you will **not** be able to:

- selectively include the CSS or JavaScript for individual components
- build your own styles or components based on the palette or typography and spacing mixins
- customise the build, for example, overriding colours or enabling global styles
- use the component Nunjucks templates

<div class="govuk-warning-text">
  <span class="govuk-warning-text__icon" aria-hidden="true">!</span>
  <strong class="govuk-warning-text__text">
    <span class="govuk-visually-hidden">Warning</span>
    In your live application, you should <a href="/production/installing-with-npm/">install with Node.js package manager (npm)</a> instead.
  </strong>
</div>

## Copy and install the precompiled files

1. Follow [the instructions for installing the GOV.UK Design System](https://frontend.design-system.service.gov.uk/install-using-precompiled-files/)
2. Download the `release-<VERSION-NUMBER>.zip` file at the bottom of the [latest MoJ Frontend release note](https://github.com/ministryofjustice/moj-frontend/releases/latest).
3. Unzip the zip file.
4. Copy the `assets` folder to the root of your project’s public folder, so that for example `<YOUR-SITE-URL>/assets/images/moj-logotype-crest.png` shows the `images/moj-logotype-crown.png` image in your users’ browsers.
5. Copy the `.css` file to a stylesheets folder in the root of your project’s public folder, so that for example `<YOUR-SITE-URL>/stylesheets/moj-frontend.min.css` shows the CSS file in your users’ browsers.
6. Copy the `.js` file to a JavaScript folder in the root of your project’s public folder, so that for example `<YOUR-SITE-URL>/javascripts/moj-frontend.min.js` shows the JavaScript file in your users’ browsers.

## Update your example page to check for errors

1. Update the example page in your project to match the following HTML (in your live application, you should use the [GOV.UK Design System page template](https://design-system.service.gov.uk/styles/page-template/) instead):

   ```html
   <!DOCTYPE html>
   <html lang="en" class="govuk-template">
     <head>
       <title>Example - MoJ Frontend</title>
       <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
       <link rel="stylesheet" href="/stylesheets/govuk-frontend-<VERSION-NUMBER>.min.css" />
       <link rel="stylesheet" href="/stylesheets/moj-frontend-<VERSION-NUMBER>.min.css">
     </head>
     <body class="govuk-template__body">
       <script>document.body.className += ' js-enabled' + ('noModule' in HTMLScriptElement.prototype ? ' govuk-frontend-supported' : '');</script>

       <!-- component HTML -->

       <script type="module" src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
       <script type="module" src="/javascripts/govuk-frontend-<VERSION-NUMBER>.min.js"></script>
       <script type="module" src="/javascripts/moj-frontend-<VERSION-NUMBER>.min.js"></script>

       <script type="module">
         import * as GOVUKFrontend from '/javascripts/govuk-frontend-<VERSION-NUMBER>.min.js'

         window.GOVUKFrontend = GOVUKFrontend
         window.GOVUKFrontend.initAll()
         window.MOJFrontend.initAll()
       </script>
     </body>
   </html>
   ```

2. Replace `<VERSION-NUMBER>` so the 5 filenames match the files you [copied from MoJ Frontend and GOV.UK Frontend's GitHub repos](#copy-and-install-the-precompiled-files).

3. Go to the [add another component](/components/add-another/) on the Design System website and copy the HTML from the first example.

4. Replace `<!-- component HTML -->` with the add another HTML you copied.

5. Run your application - you can check it works the same way as the [add another component example](/examples/add-another/) by clicking the "Add another person" button.
