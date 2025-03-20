---
layout: layouts/get-started.njk
subsection: Setup for production
title: Import MoJ Frontend CSS
eleventyNavigation:
  key: Import CSS
  parent: Setup for production
  order: 50
  excerpt: "To use the CSS from MoJ Frontend and GOV.UK Frontend, you can either add MoJ Frontend and GOV.UK Frontend’s CSS files to your HTML or load the CSS files into your own Sass file."
---

To use the CSS from MoJ Frontend and GOV.UK Frontend, you can either:

- add MoJ Frontend and GOV.UK Frontend’s CSS files to your HTML
- load the CSS files into your own Sass file

## Add the CSS files to your HTML

If you decide to add the CSS to your HTML, you can do one of the following:

- set up your routing so requests for the CSS files in `<YOUR-SITE-URL>/stylesheets` are served from both `/node_modules/govuk-frontend/dist/govuk` and `/node_modules/@ministryofjustice/frontend/moj`
- copy the CSS files instead, copy both `/node_modules/@ministryofjustice/frontend/moj/moj-frontend.min.css` and `/node_modules/govuk-frontend/dist/govuk/govuk-frontend.min.css` into your application

Then link the CSS files inside the `<head>` tag of your HTML page or page template.

```html
<head>
  <!-- // ... -->
  <link rel="stylesheet" href="/stylesheets/govuk-frontend.min.css">
  <link rel="stylesheet" href="/stylesheets/moj-frontend.min.css">
  <!-- // ... -->
</head>
```

If you’re using [express.js](https://expressjs.com/), request routing could be set up as follows:

```js
router.use('/stylesheets', [
  express.static('node_modules/@ministryofjustice/frontend/moj'),
  express.static('node_modules/govuk-frontend/dist/govuk')
])
```

## Load using your own Sass file

To load all the Sass rules from both MoJ Frontend and GOV.UK Frontend, add the following to your Sass file:

```scss
@use "node_modules/govuk-frontend/dist/govuk" as *;
@forward "node_modules/@ministryofjustice/frontend/moj/all";
```

Sass load paths must be configured by either:

- calling the Sass compiler from the command line with the `--load-path .` flag
- using the JavaScript API with `loadPaths: ['.']` in the `options` object

For more details, see how to [simplify Sass load paths](#simplify-sass-load-paths) or [silence deprecation warnings from dependencies](#silence-deprecation-warnings-from-dependencies-in-dart-sass) below.

### Load an individual component’s CSS using a single Sass forward

You can also import a component and all its dependencies without loading `node_modules/@ministryofjustice/frontend/moj/all` first.

To load the button menu component for example, add the following to your Sass file:

```scss
@forward "node_modules/@ministryofjustice/frontend/moj/components/button-menu/button-menu";
```

### Simplify Sass load paths

If you want to make Sass load paths shorter, add both `node_modules/@ministryofjustice/frontend` and `node_modules/govuk-frontend/dist` to either your:

- [Sass load paths](https://sass-lang.com/documentation/at-rules/import#finding-the-file)
- [assets paths](http://guides.rubyonrails.org/asset_pipeline.html#search-paths) if you use Ruby in your project

You can then load stylesheets without using `node_modules/@ministryofjustice/frontend` and `node_modules/govuk-frontend/dist` in your paths:

```scss
@use "govuk" as *;
@forward "moj/all";
```

For example, using the Sass compiler:

```js
compile('src/stylesheets/application.scss', {
  loadPaths: [
    '.',
    'node_modules/@ministryofjustice/frontend',
    'node_modules/govuk-frontend/dist',
  ],
  quietDeps: true
})
```

### If you have your own folder structure

If you use a different folder structure than `<YOUR-APP>/assets/images` and `<YOUR-APP>/assets/fonts`, you can set Sass variables so that Sass builds the CSS to point to your folders.

Set one of the following with a `@use` line in your Sass file:

- `$govuk-assets-path`
- `$govuk-images-path` and `$govuk-fonts-path`

Set the `$govuk-assets-path` variable if your `font` and `image` folders have the same parent folder. For example:

```scss
@use "govuk" as * with (
  $govuk-assets-path: "/<YOUR-ASSETS-FOLDER>/"
);

// Share config with MOJ Frontend
@forward "moj/all" with (
  $moj-assets-path: $govuk-assets-path
);
```

Set the `$govuk-images-path` and `$govuk-fonts-path` variables if your `font` and `image` folders have different parent folders. For example:

```scss
@use "govuk" as * with (
  $govuk-images-path: "/<YOUR-IMAGES-FOLDER>/",
  $govuk-fonts-path: "/<YOUR-FONTS-FOLDER>/"
);

// Share config with MOJ Frontend
@forward "moj/all" with (
  $moj-images-path: $govuk-images-path,
  $moj-fonts-path: $govuk-fonts-path
);
```

### Override with your own CSS

If you want to override MoJ Frontend’s styles with your own styles, `@forward` MoJ Frontend’s styles before your own Sass rules.

### Silence deprecation warnings from dependencies in Dart Sass

You may see deprecation warnings when compiling your Sass. For example:

```console
DEPRECATION WARNING: Using / for division is deprecated and will be removed in Dart Sass 2.0.0.
```

We’re currently unable to fix deprecation warnings from MoJ Frontend. However, you can silence the warnings by following the [Silence deprecation warnings from dependencies in Dart Sass](https://frontend.design-system.service.gov.uk/import-css/#simplify-sass-import-paths) guidance from GOV.UK Frontend.
