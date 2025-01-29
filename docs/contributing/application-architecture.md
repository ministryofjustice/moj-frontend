# Application architecture

- `app/`

  [Express](https://github.com/expressjs/express) application to preview components; also referred to as _preview app_.

  - `assets/`

    App-specific assets.

  - `views/`

    App-specific [Nunjucks](https://github.com/mozilla/nunjucks) template files.

    - `components/`

      Examples of components usage in various contexts. You can access these examples from the home page of the preview app.

    - `layouts/`

      Generic layout templates used to render preview app pages.

- `bin/`

  Binary/executable files (i.e. bash scripts) mainly used in the [publishing process](publishing.md).

- `docs/`

  Documentation files.

- `package/` **contains auto-generated files**

  package published on npm.
  Consume all of @ministryofjustice/frontend through a single package.

- `src/`

  Source files. See README.md in the src directory for details.

### Auto-generated directories

- `public/`

  Assets built for the preview app.
