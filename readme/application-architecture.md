# Application architecture

MOJ Frontend is both a frontend component library and the application that
documents and maintains that library. The source of truth is `src/`; the
published package, distributable archive and documentation site are built from
that source and from the files in `docs/`.

## Repository structure

- `src/`

  Source files for the MOJ Frontend package.

  - `moj/components/` contains component Sass, Nunjucks templates, fixtures and
    component-specific JavaScript.
  - `moj/all.scss` and `moj/all.mjs` are the aggregate package entry points.
  - `moj/assets/` contains images and other package assets.
  - `moj/core/`, `moj/settings/`, `moj/objects/`, `moj/helpers/` and
    `moj/utilities/` contain shared styles and utilities.
  - `moj/vendor/govuk-frontend/` contains the integration with GOV.UK
    Frontend.

- `package/` **contains auto-generated files**

  The npm package output. Gulp copies package templates and assets from
  `src/`, compiles each JavaScript and Sass module, and creates bundled and
  minified entry points. Only package metadata and documentation intended for
  npm consumption should be edited directly; rebuild the rest with
  `npm run build:package`.

- `dist/` **contains auto-generated files**

  A standalone distribution of MOJ Frontend. It contains compiled,
  versioned JavaScript and CSS, assets and `release.zip`, and is built with
  `npm run build:dist`.

- `docs/`

  Source for the MOJ Pattern Library documentation site. Markdown files define pages, guidance and component documentation.

  - `components/` contains guidance and examples on the design system components.
  - `patterns/` contains guidance and examples on the design system patterns.
  - `pages/` contains guidance and examples on the design system pages.
  - `assets/` contains documentation-site images and other assets.
  - `_data/` contains Eleventy global data files used to render the site.
  - `_includes/` contains Eleventy layouts, partials and documentation macros.
  - `stylesheets/` and `javascripts/` contain documentation-site assets.
  - `11ty` contains the Eleventy configuration, filters and shortcodes used to
    render the site.

- `public/` **contains auto-generated files**

  The built documentation site and its static assets. Eleventy renders
  `docs/` here, while Gulp compiles and copies the stylesheets, JavaScript and
  assets. Asset revisioning writes hashed filenames and a manifest during
  `npm run build:docs`.

- `app/`

  An Express application used to collect new
  component contributions. It configures Nunjucks, sessions, security
  middleware, static files and the contribution routes.

  - `app/views/` contains application pages and shared templates.
  - `app/routes/add-component.js` implements the contribution journey.
  - `app/schema/` defines Joi validation for form pages.
  - `app/helpers/` contains navigation, session and form helpers.
  - `app/middleware/` handles validation, file processing, documentation
    generation, GitHub integration, email notifications and virus scanning.
  - `app/tests/` contains end-to-end tests for the express application.

- `gulp/`

  Gulp tasks for building the npm package, standalone distribution and
  documentation assets. Rollup bundles JavaScript, Sass/PostCSS compiles
  stylesheets, and the tasks also copy assets and compress images.

- `submissions/`

  Component code examples produced by the contribution flow. A submission is
  stored under a generated submission reference and is included in the pull
  request created for the contributor.

- `tests/`

   End-to-end tests for the documentation site. Used to ensure that the
   documentation site renders correctly and that the components behave as
   expected.

- `readme/`

  Maintainer and contributor documentation, including coding standards and
  this architecture overview.

## Build and runtime relationships

The main build flows are:

```text
src/ ──Gulp──> package/ ──> npm package
  │
  ├──Gulp──> dist/ ──> standalone release.zip
  │
  └──> docs/ + 11ty/ ──Eleventy/Gulp──> public/ ──> documentation site
```

The documentation site consumes the built MOJ package and GOV.UK Frontend
assets. The Express app loads Nunjucks templates from `app/views`, `src/` and
the GOV.UK Frontend distribution, and serves the generated `public/` files.
During development, package and documentation watchers rebuild these inputs as
they change.

The principal commands are:

- `npm run build:package` builds the npm package output.
- `npm run build:dist` builds the standalone distribution.
- `npm run build:docs` builds the documentation site.
- `npm run build` builds the distribution and documentation site.
- `npm run start` runs the package, documentation and application watchers.

## Component architecture

Components are implemented in `src/moj/components/<component>/`. A typical
component has:

- a Sass entry point;
- `macro.njk`, which exposes the public Nunjucks macro;
- `template.njk`, which renders the component;
- `README.md` and, where applicable, `fixtures.yaml`;
- JavaScript and unit/browser tests when it has interactive behaviour.

New Sass components must be forwarded from
[`src/moj/components/_all.scss`](../src/moj/components/_all.scss). Components
with JavaScript behaviour must also be included in
[`src/moj/all.mjs`](../src/moj/all.mjs) when they need package-wide
initialisation. The build preserves individual modules and also creates
bundles for consumers that need a single browser asset.

## Contribution flow

The contribution app exposes the add-component journey at
`/contribute/add-new-component`. The journey is configuration-driven:
`app/config.js` defines the pages and their conditional relationships, while
the schemas validate each page. Session data is stored in Redis when
configured; uploaded files are held in Redis and processed separately from
the form values.

On submission, the route:

1. removes or masks personal data according to the contributor's choices;
2. generates component Markdown and Eleventy data files;
3. retrieves uploaded files and prepares component assets under
   `docs/assets/images/`;
4. writes supplied code examples under `submissions/<submission-reference>/`;
5. pushes the generated files to GitHub, creates a pull request and review
   issue, and sends notifications.

## Testing and quality checks

Tests are split by the surface they exercise:

- `npm run test:components` runs component and package tests.
- `npm run test:helpers` and `npm run test:middleware` run application unit
  tests.
- `npm run test:e2e` runs Playwright browser tests for the contribution flow.
- `npm run test:scss` checks that the aggregate Sass compiles.
- `npm run lint` runs TypeScript, JavaScript, Sass and formatting checks.

Generated directories should be rebuilt rather than edited manually. When
changing source files, run the smallest relevant build and test commands, then
run `npm run lint` before submitting the change.
