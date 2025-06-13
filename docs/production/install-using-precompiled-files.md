---
layout: layouts/content.njk
subsection: Production
showHelp: true
title: Try MoJ Frontend using precompiled files
redirect_from:
  - /get-started/installing-compiled
  - /production/installing-compiled
eleventyNavigation:
  key: Try MoJ Frontend using precompiled files
  parent: Production
  order: 30
  excerpt: "If your project does not use npm (or you want to try out MoJ Frontend without installing it through npm) download and include compiled stylesheets."
---

You can install MoJ Frontend using the compiled files released with each version.

However, by doing so, you will **not** be able to:

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

Open the [latest MoJ Frontend release notes](https://github.com/ministryofjustice/moj-frontend/releases/latest) then:

1. Download and unzip the link `release-<VERSION-NUMBER>.zip` file.
2. Copy the `assets` folder to the root of your project’s public folder, so that for example `<YOUR-SITE-URL>/assets/images/moj-logotype-crest.png` shows the `images/moj-logotype-crown.png` image in your users’ browsers.
3. Copy the `.css` file to a stylesheets folder in the root of your project’s public folder, so that for example `<YOUR-SITE-URL>/stylesheets/moj-frontend-<VERSION-NUMBER>.min.css` shows the CSS file in your users’ browsers.
4. Copy the `.js` file to a JavaScripts folder in the root of your project’s public folder, so that for example `<YOUR-SITE-URL>/javascripts/moj-frontend-<VERSION-NUMBER>.min.js` shows the JavaScript file in your users’ browsers.

## Set up and extend GOV.UK Frontend

Next, follow [the instructions for installing GOV.UK Frontend](https://frontend.design-system.service.gov.uk/install-using-precompiled-files/) and continue to:

1. Add another `link` tag for MoJ Frontend styles following GOV.UK Frontend styles in the `head`:

   ```html
   <link rel="stylesheet" href="/stylesheets/govuk-frontend-<VERSION-NUMBER>.min.css" />
   <link rel="stylesheet" href="/stylesheets/moj-frontend-<VERSION-NUMBER>.min.css">
   ```

2. Add `script` tags for MoJ Frontend JavaScript alongside GOV.UK Frontend scripts at the bottom of the `body`. This includes jQuery, which is a dependency of MoJ Frontend.

   ```html
   <script type="module" src="/javascripts/govuk-frontend-<VERSION-NUMBER>.min.js"></script>
   <script type="module" src="/javascripts/moj-frontend-<VERSION-NUMBER>.min.js"></script>

   <script type="module">
     import * as GOVUKFrontend from '/javascripts/govuk-frontend-<VERSION-NUMBER>.min.js'
     import * as GOVUKFrontend from '/javascripts/moj-frontend-<VERSION-NUMBER>.min.js'

     GOVUKFrontend.initAll()
     MOJFrontend.initAll()
   </script>
   ```

## Update your example page to check for errors

1. Update the example page in your project to match the following HTML (in your live application, you should use the [MoJ Frontend page template](/use-nunjucks/#set-up-nunjucks-and-use-the-page-template) instead):

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

       <script type="module" src="/javascripts/govuk-frontend-<VERSION-NUMBER>.min.js"></script>
       <script type="module" src="/javascripts/moj-frontend-<VERSION-NUMBER>.min.js"></script>

       <script type="module">
         import * as GOVUKFrontend from '/javascripts/govuk-frontend-<VERSION-NUMBER>.min.js'
         import * as MOJFrontend from '/javascripts/moj-frontend-<VERSION-NUMBER>.min.js'

         GOVUKFrontend.initAll()
         MOJFrontend.initAll()
       </script>
     </body>
   </html>
   ```

2. Replace `<VERSION-NUMBER>` so the 6 filenames match the files you [copied from MoJ Frontend and GOV.UK Frontend’s GitHub repos](#copy-and-install-the-precompiled-files).

3. Go to the [add another component](/components/add-another/) on the Design System website and copy the HTML from the first example.

4. Replace `<!-- component HTML -->` with the add another HTML you copied.

5. Run your application - you can check it works the same way as the [add another component example](/examples/add-another/) by clicking the "Add another person" button.
