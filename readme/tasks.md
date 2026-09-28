# npm and Gulp tasks

This document describes the npm scripts and Gulp tasks used to build the MOJ
Frontend package, standalone distribution and documentation site, and to run
the Express contribution app.

Commands should be run from the repository root. Install dependencies first
with `npm run setup`.

## npm script aliases

npm scripts are defined in [`package.json`](../package.json). npm lifecycle
scripts run automatically before or after scripts with the corresponding
name.

### Setup and development

**`npm run setup`** will:

- install the exact dependency versions from `package-lock.json` with
  `npm ci`;
- use the HMPPS npm script allowlist to only run whitelisted postinstall scripts.

**`npm start`** runs the `prestart` lifecycle script, then starts the
development watchers:

- `prestart` builds the npm package and performs the initial Gulp
  documentation-asset build;
- `watch:11ty` watches `docs/` and rebuilds `public/` with Eleventy;
- `watch:package` runs the Gulp package and documentation-asset watchers;
- `watch:app` starts the Express app with Nodemon and restarts it when
  application files change.

**`npm run start:e2e`** starts the Express app with `ENV=test` and Nodemon.
This is used by Playwright to run tests against the application.

### Builds

**`npm run build`** runs `prebuild`, then builds the standalone distribution
and documentation site concurrently. `prebuild` runs
`npm run build:package` first because both the distribution and documentation
builds consume package output.

**`npm run build:package`** runs the `build:package` Gulp task. Its
`postbuild:package` lifecycle script then validates the generated package with
`govuk-prototype-kit validate-plugin package`.

**`npm run build:dist`** runs the `build:dist` Gulp task to create the
standalone distribution in `dist/`.

**`npm run build:docs`** runs the `build:docs` Gulp task and then runs Eleventy
to render `docs/` into `public/`.

### Tests

**`npm test`** runs the test scripts matching `npm:test:*` concurrently:

- `test:components` runs Jest tests under `src/`;
- `test:helpers` runs Jest tests under `helpers/`;
- `test:middleware` runs Jest tests under `middleware/`;
- `test:scss` compiles the aggregate `src/moj/all.scss` stylesheet;
- `test:e2e` runs the Playwright test suite.

Individual test groups can be run directly. For example:

```sh
npm run test:components
npm run test:e2e -- app/tests/e2e/02.component-details.spec.js
```

### Linting and type checking

**`npm run lint`** runs all checks:

- `lint:types` runs the TypeScript project build;
- `lint:js` runs ESLint against JavaScript, Markdown and related source files;
- `lint:scss` runs Stylelint against Sass files;
- `lint:prettier` checks supported source formats with Prettier.

The individual checks can be run separately:

```sh
npm run lint:types
npm run lint:js
npm run lint:scss
npm run lint:prettier
```

**`npm run lint:fix`** runs the type check and applies automatic fixes for
JavaScript, Sass and Prettier checks. The lower-level `lint:js:fix`,
`lint:scss:fix` and `lint:prettier:fix` scripts can be run independently.

The `*:cli` scripts expose the underlying tool command and are useful when
passing a narrower file or directory selection, for example:

```sh
npm run lint:js:cli -- readme/tasks.md
```

### Release and container tasks

**`npm run ci:release`** runs semantic-release in CI mode.

**`npm run ci:dryrun`** runs semantic-release in CI dry-run mode without
publishing a release.

## Gulp tasks

Gulp tasks are registered by [`gulpfile.js`](../gulpfile.js), which loads task
definitions from [`gulp/`](../gulp). List the available tasks with:

```sh
npx gulp --tasks
```

The task names below can be run directly with `npx gulp <task>`.

### Package tasks

**`build:package`** rebuilds the npm package in this order:

1. `build:clean`
2. `build:copy`
3. `build:javascripts`
4. `build:javascripts-minified`
5. `build:stylesheets`
6. `build:stylesheets-minified`
7. `build:compress-images`

**`build:clean`** removes generated files from `package/`, preserving
`package.json`, `govuk-prototype-kit.config.json` and `README.md`.

**`build:copy`** runs these tasks in parallel:

- `build:copy-assets` copies `src/moj/assets/`;
- `build:copy-templates` copies Nunjucks and Markdown files from `src/moj/`;
- `build:copy-others` copies filters, vendor files, initialisation files and
  the package README.

**`build:javascripts`** finds component JavaScript modules and builds each
  module with Rollup into:

- preserved ECMAScript modules;
- bundled ECMAScript modules;
- Universal Module Definition bundles for browser script usage.

It also builds the `moj/helpers.mjs` and `moj/all.mjs` entry points. GOV.UK
Frontend modules remain external where appropriate.

**`build:javascripts-minified`** creates the minified ES module bundle
`package/moj/moj-frontend.min.js`.

**`build:stylesheets`** compiles every Sass module under `src/moj/` to the
matching location under `package/`, applying the configured PostCSS
transforms.

**`build:stylesheets-minified`** compiles the aggregate
`src/moj/all.scss` entry point to `package/moj/moj-frontend.min.css`.

**`build:compress-images`** optimises PNG, JPEG and SVG images in
`package/moj/assets/images/`.

### Standalone distribution tasks

**`build:dist`** rebuilds the standalone distribution in this order:

1. `dist:clean`
2. `dist:javascripts`
3. `dist:stylesheets`
4. `dist:assets`
5. `dist:zip`

**`dist:clean`** removes generated files from `dist/`.

**`dist:javascripts`** creates the versioned, minified ES module bundle
`dist/moj-frontend-<version>.min.js`.

**`dist:stylesheets`** creates the versioned, minified stylesheet
`dist/moj-frontend-<version>.min.css`.

**`dist:assets`** copies package assets into `dist/assets/`.

**`dist:zip`** packages the contents of `dist/` into `dist/release.zip`.

### Documentation tasks

**`build:docs`** rebuilds the initial documentation assets in this order:

1. `docs:clean`
2. `docs:copy`
3. `docs:stylesheets` and `docs:javascripts` in parallel
4. `docs:revision`

Eleventy is run separately by `npm run build:docs` to render the documentation
pages.

**`docs:clean`** removes generated files from `public/`.

**`docs:copy`** runs these tasks in parallel:

- `docs:copy-assets` copies documentation, MOJ Frontend and GOV.UK Frontend
  assets into `public/assets/`;
- `docs:copy-stylesheets` copies the minified MOJ Frontend stylesheet into
  `public/stylesheets/`;
- `docs:copy-javascripts` copies the minified MOJ Frontend and GOV.UK Frontend
  JavaScript into `public/javascripts/`.

**`docs:stylesheets`** compiles the documentation stylesheets
`application.scss`, `example.scss` and `govuk-frontend.scss` into minified
files under `public/stylesheets/`.

**`docs:javascripts`** bundles `docs/javascripts/application.mjs` as
`public/javascripts/application.min.js`.

**`docs:revision`** applies content hashes to cacheable CSS, JavaScript and
asset files, writes source maps for CSS and JavaScript, and creates the
revision manifest in `public/`.

### Watch tasks

**`watch`** runs all package and documentation watchers in parallel:

The Eleventy and Express watchers used by `npm start` are npm scripts rather
than Gulp tasks:

- `watch:11ty` watches and renders the documentation pages;
- `watch:app` runs the Express application with Nodemon;
- `watch:package` runs the Gulp `watch` task.
