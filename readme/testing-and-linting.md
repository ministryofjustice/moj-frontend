# Testing and linting

GitHub Actions lints Sass and JavaScript, runs unit and functional tests with Node.js.


## Testing terminology

We use different types of tests to check different areas of our code are working as expected.

Unit tests are small, modular tests that verify a "unit" of code. We write unit tests to check our JavaScript logic, particularly 'background logic' that does not heavily rely on [Document Object Model (DOM)](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction) interaction (where functional tests may be better suited).

Functional tests verify the output of an action and do not check the intermediate states of the system when performing that action. We write functional tests to check component interactions have the expected results, so we also refer to these as component tests. We also write functional tests to check that our Nunjucks code outputs expected HTML, and we refer to these as our Nunjucks tests.

## Running linting and tests

### Running all tests locally

To test the whole codebase, run:

```shell
npm test
```

This will compile JavaScript and Sass, including documentation, then trigger [Jest](https://github.com/facebook/jest) and [Playwright](https://playwright.dev/) for our testing.

See [Tasks](../tasks.md) for details of what `npm test` does.

### Running individual tests

You can run a subset of the test suite that only tests specific components by running:

```shell
npx jest src/moj/components/alert
```

Note: There's a watch mode that keeps a testing session open waiting for changes that can be used with:

```shell
npx jest --watch src/moj/components/alert
```

### Running all linting checks locally

To lint the whole codebase, run:

```shell
npm run lint
```

This will run the following checks:

2. [Prettier](https://prettier.io)
3. [ESLint](https://eslint.org) (using [JavaScript Standard Style](https://standardjs.com))
4. [Stylelint](https://stylelint.io) (using [GDS Stylelint Config](https://github.com/alphagov/stylelint-config-gds))

### Running only Prettier linting

```shell
npm run lint:prettier
```

See [.prettierrc.js](/.prettierrc.js) for details.

### Running only Sass linting

```shell
npm run lint:scss
```

See [CSS Coding Standards](/docs/contributing/coding-standards/css.md#linting) for details.

### Running only JavaScript linting

```shell
npm run lint:js
```

See [JavaScript Coding Standards](/docs/contributing/coding-standards/js.md#formatting-and-linting) for details.

## Unit and functional tests with Node.js

We use [Jest](https://jestjs.io/), an automated testing platform with an assertion library, and [Playwright](https://playwright.dev/) that is used to control [headless Chrome](https://developers.google.com/web/updates/2017/04/headless-chrome).

Tests should be written using ES modules (`*.mjs`) by default, but use CommonJS modules (`*.js`) for tests using browser [`import()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import) in Playwright. 

### Component tests

We write functional tests for every component to check the output of our Nunjucks code. These are found in `[component-name].nunjucks.spec.js` files in each component directory. These Nunjucks tests render the component examples defined in the component yaml files, and assert that the HTML tags, attributes and classes are as expected. For example: checking that when you pass in an `id` to the component using the Nunjucks macro, it outputs the component with an `id` attribute equal to that value.

If a component uses JavaScript, we also write functional tests in a `[component name].playwright.spec.js` file, for example [add-another.playwright.spec.js](/src/moj/components/add-another/add-another.js.spec.js). These component tests check that interactions, such as a mouse click, have the expected result.

If you want to inspect a test that's running in the browser, configure Playwright in non-headless mode with the environment variable `HEADLESS=false`.

```shell
HEADLESS=false npx playwright test --headed src/moj/components/add-another/add-another.playwright.spec.js
```

You should also test component Javascript logic with unit tests, in a `[component name].js.test.mjs` file. These tests are better suited for testing behind-the-scenes logic, or in cases where the final output of some logic is not a change to the component markup.

### Conventions

We aim to write the test descriptions in everyday language. For example, "back-link component fails to render if the required fields are not included".

Keep all tests separate from each other. It should not matter the order or amount of tests you run from a test suite.

Try and keep assertions small, so each test only checks for one thing. This makes tests more readable and makes it easier to see what's happening if a test is failing.

