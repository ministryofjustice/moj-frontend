---
layout: layouts/get-started.njk
subsection: Setup for production
title: Import MoJ Frontend font and image assets
eleventyNavigation:
  key: Import font and image assets
  parent: Setup for production
  order: 60
  excerpt: "To use the font and image assets from MoJ Frontend and GOV.UK Frontend, you can either serve the assets from the combined assets folders or copy the font and image files into your application"
---

To use the font and image assets from MoJ Frontend and GOV.UK Frontend, you can either:

- serve the assets from the combined assets folders – recommended
- copy the font and image files into your application

## Serve the assets from the combined assets folders – recommended

Set up your routing so requests for files in `<YOUR-SITE-URL>/assets` are served from both `/node_modules/govuk-frontend/dist/govuk/assets` and `/node_modules/@ministryofjustice/frontend/moj/assets`.

For example if you’re using [express.js](https://expressjs.com/), add the following to your `app.js` file:

```js
router.use('/assets', [
  express.static('node_modules/@ministryofjustice/frontend/moj/assets'),
  express.static('node_modules/govuk-frontend/dist/govuk/assets')
])
```

## Copy the font and image files into your application

If you decide to copy the assets instead, copy the:

- `/node_modules/@ministryofjustice/frontend/moj/assets/images` contents to `<YOUR-APP>/assets/images`
- `/node_modules/govuk-frontend/dist/govuk/assets/images` contents to `<YOUR-APP>/assets/images`
- `/node_modules/govuk-frontend/dist/govuk/assets/fonts` contents to `<YOUR-APP>/assets/fonts`

You should use an automated task or your build pipeline to copy the files, so your project folder stays up to date when updates to MoJ Frontend and GOV.UK Frontend are released.

### If you have your own folder structure

If you use a different folder structure than `<YOUR-APP>/assets/images` and `<YOUR-APP>/assets/fonts`, you can set Sass variables so that Sass builds the CSS to point to your folders.

Set one of the following with a `@use` line in your Sass file:

- `$govuk-assets-path`
- `$govuk-images-path` and `$govuk-fonts-path`

Set the `$govuk-assets-path` variable if your `font` and `image` folders have the same parent folder. For example:

```scss
@use "node_modules/govuk-frontend/dist/govuk" as * with (
  $govuk-assets-path: "/<YOUR-ASSETS-FOLDER>/"
);

// Share config with MOJ Frontend
@forward "node_modules/@ministryofjustice/frontend/moj/all" with (
  $moj-assets-path: $govuk-assets-path
);
```

Set the `$govuk-images-path` and `$govuk-fonts-path` variables if your `font` and `image` folders have different parent folders. For example:

```scss
@use "node_modules/govuk-frontend/dist/govuk" as * with (
  $govuk-images-path: "/<YOUR-IMAGES-FOLDER>/",
  $govuk-fonts-path: "/<YOUR-FONTS-FOLDER>/"
);

// Share config with MOJ Frontend
@forward "node_modules/@ministryofjustice/frontend/moj/all" with (
  $moj-images-path: $govuk-images-path,
  $moj-fonts-path: $govuk-fonts-path
);
```
