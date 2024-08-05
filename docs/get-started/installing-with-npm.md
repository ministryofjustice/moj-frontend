---
layout: layouts/get-started.njk
title: Installing MoJ Frontend with NPM
eleventyNavigation:
  key: Install with NPM
  parent: Setup for production
  order: 0
---

## Requirements

To use MoJ Frontend with NPM you must:

1. Install the long-term support (LTS) version of [Node.js](https://nodejs.org/en/), which includes NPM. The minimum version of Node required is 4.2.0.

(We recommend using [`nvm`](https://github.com/creationix/nvm) for managing versions of Node.)

2. Create a [package.json file](https://docs.npmjs.com/files/package.json) if you don’t already have one. You can create a default `package.json` file by running `npm init` from the root of your application.

3. Install [jQuery](https://jquery.com/), which is required by the MoJ Frontend JavaScript

```
npm install jquery --save
```

1. If you want to use the MoJ Frontend Nunjucks macros, install Nunjucks - the minimum version required is 3.0.0.

```
npm install nunjucks --save
```

## Installation

To install, run:

```
npm install --save @ministryofjustice/frontend
```

After you have installed MoJ Frontend the `@ministryofjustice/frontend` package will appear in your `node_modules` folder.

## Importing styles

You need to import the MoJ Frontend styles into the main Sass file in your project. You should place the below code before your own Sass rules (or Sass imports) if you want to override MoJ Frontend with your own styles.

1. To import all components, add the below to your Sass file:

```CSS
@import "node_modules/@ministryofjustice/frontend/moj/all";
```

2. To import an individual component (for example a button), add the below to your Sass file:

```CSS
@import "node_modules/@ministryofjustice/frontend/moj/components/button/button";
```

### Optional: Resolving SCSS import paths

If you wish to resolve the above `@import` paths in your build (in order to avoid prefixing paths with `node_modules`), you should add `node_modules` to
your [Sass include paths](https://github.com/sass/node-sass#includepaths) (in Ruby, they should be added to [assets paths](http://guides.rubyonrails.org/asset_pipeline.html#search-paths)).

For example, if your project uses Gulp, you would add the Sass include paths to your Gulp configuration file (for example `gulpfile.js`) with [gulp-sass](https://www.npmjs.com/package/gulp-sass). Below is an example:

```JS
gulp.task('sass', function () {
  return gulp.src('./sass/**/*.scss')
    .pipe(sass({
      includePaths: 'node_modules'
     }))
    .pipe(gulp.dest('./css'));
});
```

If you compile Sass to CSS in your project, your build tasks will already include something similar to the above task - in that case, you will just need
to include add `includePaths` to it.

After resolving the import paths you can import MoJ Frontend by using:

```CSS
@import "@ministryofjustice/frontend/moj/components/button/button";
```

## Importing assets

In order to import MoJ Frontend images and fonts to your project, you should configure your application to reference or copy the relevant MoJ Frontend assets.

Follow either [Recommended solution](#recommended-solution) or [Alternative solution](#alternative-solution).

### Recommended solution

Make `/node_modules/@ministryofjustice/frontend/moj/assets` available to your project by routing requests for your assets folder there.

For example, if your project uses [express.js](https://expressjs.com/), below is a code sample you could add to your configuration:

```JS
app.use('/assets', express.static(path.join(__dirname, '/node_modules/@ministryofjustice/frontend/moj/assets')))
```

### Alternative solution

Manually copy the images and fonts from `/node_modules/@ministryofjustice/frontend/moj/assets` into a public facing directory in your project. Ideally copying the files to your project should be an automated task or part of your build pipeline to ensure that the MoJ Frontend assets stay up-to-date.

The default paths used for assets are `assets/images` and `assets/fonts`. **If your asset folders follow this structure, you will not need to complete the following steps.**

To use different asset paths, set `$govuk-assets-path`, `$govuk-images-path` and `$govuk-fonts-path` in your project Sass file to point to the relevant directories in your project (this will override the defaults set in `/node_modules/@ministryofjustice/frontend/moj/settings/_assets.scss`). Make sure you do this in Sass before importing `@ministryofjustice/frontend` into your project - see [Importing styles](#importing-styles).

Example 1:

```SCSS
// Include images from /application/assets/images and fonts from /application/assets/fonts
$moj-assets-path: ‘/application/assets’;

@import “@ministryofjustice/frontend/moj/all”;
```

Example 2:

```SCSS
// Include images from /images/@ministryofjustice/frontend and fonts from /fonts
$moj-images-path: “/images/@ministryofjustice/frontend/moj/”;
$moj-fonts-path: “/fonts/”;

@import “@ministryofjustice/frontend/moj/all”;
```

## Importing JavaScript

_See [Setting up JavaScript](../../get-started/setting-up-javascript) for information on how to install, configure and use JavaScript_

## Include CSS and JavaScript

Add the CSS and JavaScript code to your HTML template:

```html
<!DOCTYPE html>
  <head>
    <title>Example</title>
    <link rel="stylesheet" href="assets/application.css">
  </head>
  <body>
    <!-- Copy and paste component HTML-->
    <button class="govuk-button">This is a button component</button>
    <script src="assets/jquery.js"></script>
    <script src="assets/application.js"></script>
  </body>
</html>
```
