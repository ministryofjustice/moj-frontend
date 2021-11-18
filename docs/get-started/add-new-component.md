---
layout: layouts/get-started.njk
subsection: How to guides
title:  Add a new component
---

Each component is made up of a base template, variations, examples and a template macro function with optional parameters. These help make each component reusable in different locations and use cases. To add a new component and document it you need to create and modify multiple files within the following directories:

## Base files (modify)
A reference to the component's macro function should be included in `app/views/layouts/base.html`.

If there are any scripts required for the components, add the reference to these in
`app/views/includes/scripts.html`.

## Components page layout (modify)
The components page part of dxw Frontend needs to list all the components in the navigation. Modify this file by adding the component's title and relative file path in the list named `appSideNavigation` inside `docs/_includes/layouts/component.njk`.

## Component example documentation (create)
The component's documentation is in markdown format. This should include implementation advice and reference to example implementations `docs/components/example-component.md`.

## Component example template (create)
The component's template for documentation specify where the component's macro is located, example parameters and its title `docs/examples/example-component/index.njk`.

## Sass file and reference (create)
All the component's styling is saved to a corresponding Sass file which needs to be referenced in `_all.scss`.
- `src/dxw/components/example-component/_example-component.scss`
- `src/dxw/components/_all.scss`

## Component directory (create)
The directory for each component where the base template and macro function are placed. The Readme file here is used to provide details of any parameters the template uses.
- `src/dxw/components/example-component/`
- `src/dxw/components/example-component/README.md`
- `src/dxw/components/example-component/macro.njk`
- `src/dxw/components/example-component/template.njk`

## Component parameters (optional create)
If the template uses parameters then, you also need to create a separate markdown file to form the structure of arguments related to the component `docs/_includes/arguments/example-component.md`.