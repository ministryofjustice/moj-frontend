---
layout: layouts/content.njk
subsection: Production
showHelp: true
title: Import MoJ Frontend font and image assets
eleventyNavigation:
  key: Import font and image assets
  parent: Production
  order: 60
  excerpt: "To use the font and image assets from MoJ Frontend and GOV.UK Frontend, you can either serve the assets from the combined assets folders or copy the font and image files into your application"
  lede: "Learn how to use the font and image assets from MoJ Frontend and GOV.UK Frontend."
---

## Overview

You can do this you can either:

- serve the assets from the combined assets folders, which is recommended
- copy the font and image files into your application

## Serve the assets from the combined assets folders – recommended

Set up your routing so requests for files in `<YOUR-SITE-URL>/assets` are served from both `/node_modules/govuk-frontend/dist/govuk/assets` and `/node_modules/@ministryofjustice/frontend/moj/assets`.

If you’re using [express.js](https://expressjs.com/), request routing could be set up as follows:

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
