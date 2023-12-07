---
layout: layouts/get-started.njk
title: Installing MoJ Frontend using compiled files
---

You can install MoJ Frontend using the compiled files released with each version. However, by doing so, you will **not** be able to:

- selectively include the CSS or JavaScript for individual components
- build your own styles or components based on the palette or typography and spacing mixins
- customise the build, for example, overriding colours or enabling global styles
- use the component Nunjucks templates

In a live application, we recommend that you [install with npm](../installing-with-npm) instead. This will allow you to better integrate the library and more easily upgrade.

## Copy the files

1. Download the `release-<VERSION-NUMBER>.zip` file at the bottom of the [latest MoJ Frontend release note](https://github.com/ministryofjustice/moj-frontend/releases/latest).
2. Unzip the zip file.
3. Copy the `assets` folder to the root of your project’s public folder, so that for example `<YOUR-SITE-URL>/assets/images/moj-logotype-crest.png` shows the `images/moj-logotype-crown.png` image in your users’ browsers.
4. Copy the 2 `.css` files to a stylesheets folder in the root of your project’s public folder, so that for example `<YOUR-SITE-URL>/stylesheets/moj-frontend.min.css` shows the CSS file in your users’ browsers.
5. Copy the `.js` file to a JavaScript folder in the root of your project’s public folder, so that for example `<YOUR-SITE-URL>/javascript/moj-frontend.min.js` shows the JavaScript file in your users’ browsers.

## Check an example page

### With the GOV.UK Design System

1. Follow [the instructions for installing the GOV.UK Design System](https://frontend.design-system.service.gov.uk/install-using-precompiled-files/)
2. Add `link` tags for the MoJ Frontend CSS, alongside the GOV.UK ones in the `head`:
   ```html
   <!--[if !IE 8]><!-->
   <link rel="stylesheet" href="/stylesheets/moj-frontend.min.css" />
   <!--<![endif]-->
   <!--[if IE 8]>
     <link rel="stylesheet" href="/stylesheets/moj-frontend-ie8.min.css" />
   <![endif]-->
   ```
3. Add `script` tags for the MoJ Frontend JavaScript, alongside the GOV.UK at the bottom of the `body`. This includes jQuery, which is a dependency of MoJ Frontend.
   ```html
   <script
     src="https://code.jquery.com/jquery-3.6.0.min.js"
     integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4="
     crossorigin="anonymous"
   ></script>
   <script src="/javascript/moj-frontend.min.js"></script>
   <script>
     window.MOJFrontend.initAll();
   </script>
   ```

### Without the GOV.UK Design System

It is unlikely that you would ever want to install the MoJ Design System alone, but if so you can follow the guide below to check that it is working.

1. Create a page in your project using the following HTML (in your live application, you should use the [Design System page template](https://design-system.service.gov.uk/styles/page-template/) instead):

   ```html
   <!DOCTYPE html>
   <html lang="en" class="govuk-template ">
     <head>
       <title>Example - MoJ Frontend</title>
       <meta
         name="viewport"
         content="width=device-width, initial-scale=1, viewport-fit=cover"
       />
       <!--[if !IE 8]><!-->
       <link rel="stylesheet" href="/stylesheets/moj-frontend.min.css" />
       <!--<![endif]-->
       <!--[if IE 8]>
         <link rel="stylesheet" href="/stylesheets/moj-frontend-ie8.min.css" />
       <![endif]-->
     </head>
     <body>
       <!-- component HTML -->
       <script
         src="https://code.jquery.com/jquery-3.6.0.min.js"
         integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4="
         crossorigin="anonymous"
       ></script>
       <script src="/javascript/moj-frontend.min.js"></script>
       <script>
         window.MOJFrontend.initAll();
       </script>
     </body>
   </html>
   ```

2. Go to the [Add another component](../components/add-another/) on the Design System website and copy the HTML from the first example.

3. Replace `<!-- component HTML -->` with the accordion HTML you copied.

4. Run your application - you can check it works the same way as the [Add another component example](../examples/add-another/) by clicking the "Add another person" button.
