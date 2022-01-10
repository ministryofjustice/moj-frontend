---
layout: layouts/get-started.njk
subsection: How we work
title: Production
---

This guide explains how to set up your project so you can start using the styles and coded examples in the MOJ Pattern Library in production.

## Before you start

First you must have followed the [GOV.UK Design System production setup guide](https://design-system.service.gov.uk/get-started/production/).

## Include the MOJ Frontend in your project

To start using MOJ styles, components and patterns contained here, you’ll need to include MOJ Frontend in your project.

### Option 1: install using npm

We recommend [installing MOJ Frontend using npm](../installing-with-npm). Using this option, you will be able to:

- selectively include the CSS or JavaScript for individual components
- build your own styles or components based on the palette or typography and spacing mixins
- customise the build (for example, overriding colours or enabling global styles)
- use the component Nunjucks templates

You will also need to [set up JavaScript](../setting-up-javascript) if you want to use any interactive components.

### Option 2: include compiled files

If your project does not use npm, or if you want to try out MOJ Frontend in your project without installing it through npm, you can [download and include compiled stylesheets, JavaScript and the asset files](../installing-compiled).

Using this option, you will be able to include all the CSS and JavaScript of GOV.UK Frontend in your project.

You will not be able to:

- selectively include the CSS or JavaScript for individual components
- build your own styles or components based on the palette or typography and spacing mixins
- customise the build, for example, overriding colours or enabling global styles
- use the component Nunjucks templates
