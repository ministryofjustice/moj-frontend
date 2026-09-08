# Components

You can find components in `src/moj/components`.

## Name your components

Generally, folder and file names should be singular, for example ‘accordion’, ‘backlink’, ‘button’. Only use plural names when the component is usually used in groups, for example ‘breadcrumbs’, ‘checkboxes’, ‘radios’.

## Structure your component folder

When creating your component, you should create the following files in the component’s folder:

- `README.md` - Summary documentation with links to the installation instructions and component documentation on <https://design-system.service.gov.uk/>
- `_[component-name].scss` - The main Sass entry point for the component. 
- `fixtures.yaml` - Lists examples using all the component options. The examples are used to test component behaviour.
- `macro.njk` - The main entry point for rendering the component. It provides a `moj[ComponentName](params)` macro, delegating render to the `template.njk` file
- `template.njk` - The template used for rendering the component using any `params` provided to the macro
- `[component-name].spec.js` - Tests to ensure the component renders as intended with its various options

If your component uses JavaScript, you must also create the following files in the component’s folder:

- `[component-name].mjs` - A JavaScript module with the implementation of any behaviour needed by the component. See the [JavaScript documentation]('./js.md#skeleton) for a skeleton and more details on that file's structure
- `[component-name].js.spec.mjs` - Unit tests to verify any component-specific lower-level logic.
- `[component-name].playwright.spec.js` - Functional tests to verify the behaviour of the whole component in a browser.
- `[component-name].accessibility.playwright.spec.js` - Tests to verify the basic accessibility of the component in a browser. (Manual accessibility testing is still required to ensure the component meets all accessibility standards).

## Building your components

To help you build and initialise your own JavaScript components, GOV.UK Frontend provides some of its internal features for you to reuse. Follow our guidance on [building JavaScript components](https://frontend.design-system.service.gov.uk/building-your-own-javascript-components/#building-your-own-javascript-components) to use these features.

Learn more about styling components in our [CSS style guide](./css.md). Our [JavaScript style guide](./js.md) has more information on coding components.

If you need help building a component, [contact the MOJ Design System team](https://design-patterns.service.justice.gov.uk/help/) and we'll support you.
