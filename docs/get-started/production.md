---
layout: layouts/get-started.njk
subsection: How we work
title: Production
---

This guide explains how to set up your project so you can start using the styles and coded examples in the MOJ Design System in production.

## Before you start

First you must have followed the [GOV.UK Design System production setup guide](https://design-system.service.gov.uk/get-started/production/).

## Include the MOJ Frontend in your project

To start using MOJ styles, components and patterns contained here, you’ll need to include MOJ Frontend in your project.

We recommend [installing MOJ Frontend using npm](https://github.com/ministryofjustice/moj-frontend/blob/main/docs/installation/installing-with-npm.md). Using this option, you will be able to:

- selectively include the CSS or JavaScript for individual components
- build your own styles or components based on the palette or typography and spacing mixins
- customise the build (for example, overriding colours or enabling global styles)
- use the component Nunjucks templates

You will also need to [set up JavaScript](../setting-up-javascript) if you want to use any interactive components.
