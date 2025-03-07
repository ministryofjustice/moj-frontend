---
layout: layouts/get-started.njk
subsection: Setup for production
title: Import MoJ Frontend CSS
eleventyNavigation:
  key: Import CSS
  parent: Setup for production
  order: 50
  excerpt: "To load the CSS from MoJ Frontend, you can either add MoJ Frontend and GOV.UK Frontend’s CSS files to your HTML or load the CSS into your own Sass file."
---

To use the CSS from MoJ Frontend and GOV.UK Frontend, you can either:

- add MoJ Frontend and GOV.UK Frontend’s CSS files to your HTML
- load the CSS files into your own Sass file

## Add the CSS file to your HTML

If you decide to add the CSS to your HTML, you can do one of the following:

- serve the CSS files from the combined stylesheets folders – recommended
- copy the CSS files into your application

## Serve the CSS files from the combined stylesheets folders – recommended

Set up your routing so requests for the CSS files in `<YOUR-SITE-URL>/stylesheets` are served from both `/node_modules/govuk-frontend/dist/govuk` and `/node_modules/@ministryofjustice/frontend/moj`.

For example if you’re using [express.js](https://expressjs.com/), add the following to your `app.js` file:

```js
router.use('/stylesheets', [
  express.static('node_modules/@ministryofjustice/frontend/moj'),
  express.static('node_modules/govuk-frontend/dist/govuk')
])
```

Then link the CSS files inside the `<head>` tag of your HTML page or page template.

```html
<head>
  <!-- // ... -->
  <link rel="stylesheet" href="/stylesheets/govuk-frontend.min.css">
  <link rel="stylesheet" href="/stylesheets/moj-frontend.min.css">
  <!-- // ... -->
</head>
```

## Copy the CSS files into your application

If you decide to copy the CSS files instead, copy both `/node_modules/@ministryofjustice/frontend/moj/moj-frontend.min.css` and `/node_modules/govuk-frontend/dist/govuk/govuk-frontend.min.css` into `<YOUR-APP>/stylesheets` and link the CSS files using the example above.

You should use an automated task or your build pipeline to copy the files, so your project folder stays up to date when updates to MoJ Frontend and GOV.UK Frontend are released.

## Load using Sass

To load all the Sass rules from both MoJ Frontend and GOV.UK Frontend, add the following to your Sass file:

```scss
@use "node_modules/govuk-frontend/dist/govuk" as *;
@forward "node_modules/@ministryofjustice/frontend/moj/all";
```

If you use a different folder structure than `<YOUR-APP>/assets/images` and `<YOUR-APP>/assets/fonts`, see [If you have your own folder structure](/production/import-font-and-image-assets/#if-you-have-your-own-folder-structure) for how to configure Sass variables:

```scss
@use "node_modules/govuk-frontend/dist/govuk" as * with (
  $govuk-assets-path: "/<YOUR-ASSETS-FOLDER>/"
);

// Share config with MOJ Frontend
@forward "node_modules/@ministryofjustice/frontend/moj/all" with (
  $moj-assets-path: $govuk-assets-path
);
```

## Load an individual component’s CSS using a single Sass forward

You can also load a component and all its dependencies without loading `node_modules/@ministryofjustice/frontend/moj/all` first.

To load the button menu component for example, add the following to your Sass file:

```scss
@forward "node_modules/@ministryofjustice/frontend/moj/components/button-menu/button-menu";
```

## Simplify Sass load paths

If you want to make Sass load paths shorter, add both `node_modules/@ministryofjustice/frontend` and `node_modules/govuk-frontend/dist` to either your:

- [Sass load paths](https://sass-lang.com/documentation/at-rules/import#finding-the-file)
- [assets paths](http://guides.rubyonrails.org/asset_pipeline.html#search-paths) if you use Ruby in your project

For example, using the Sass compiler:

```js
compile('src/stylesheets/application.scss', {
  loadPaths: [
    'node_modules/@ministryofjustice/frontend',
    'node_modules/govuk-frontend/dist',
  ],
  quietDeps: true
})
```

You can then load stylesheets without using `node_modules/@ministryofjustice/frontend` and `node_modules/govuk-frontend/dist` in your paths:

```scss
@use "govuk" as *;
@forward "moj/all";
```

## Override with your own CSS

If you want to override MoJ Frontend’s styles with your own styles, `@forward` MoJ Frontend’s styles before your own Sass rules.

## Silence deprecation warnings from dependencies in Dart Sass

You may see deprecation warnings when compiling your Sass. For example:

```console
DEPRECATION WARNING: Using / for division is deprecated and will be removed in Dart Sass 2.0.0.
```

We’re currently unable to fix deprecation warnings from MoJ Frontend. However, you can silence the warnings by following the [Silence deprecation warnings from dependencies in Dart Sass](https://frontend.design-system.service.gov.uk/import-css/#simplify-sass-import-paths) guidance from GOV.UK Frontend.
