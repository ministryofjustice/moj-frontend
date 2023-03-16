---
layout: layouts/get-started.njk
subsection: How we work
title: Prototyping
---

This guide explains how to create prototypes using the MOJ Pattern Library and GOV.UK Prototype Kit.

## Use a template from Cloud Platform

You can follow the [MOJ Cloud Platform guide](https://user-guide.cloud-platform.service.justice.gov.uk/documentation/getting-started/prototype-kit.html) to automatically set up a GitHub repository containing the GOV.UK Prototype Kit and a hosting environment.

This template comes with the MOJ Pattern Library pre-installed so you don't need to set it up manually. However you may need to update it using [the instructions below](#updating-moj-frontend).

## Manual installation

You can also install the GOV.UK Prototype Kit and MOJ Pattern Library manually. You must follow the [GOV.UK Design System prototype setup guide](https://design-system.service.gov.uk/get-started/prototyping/) first.

You then need to install the NPM package for the MOJ Pattern Library:

1. Open a command prompt application (e.g. Terminal on MacOS)
2. Change the directory to your prototype's directory. For example, `cd path/to/prototype`
3. Run `npm install @ministryofjustice/frontend --save`

If you're using version 13 or later of the GOV.UK Prototype Kit, the components of the MOJ Pattern Library will now be available to you.

<details class="govuk-details">
  <summary class="govuk-details__summary">
    <span class="govuk-details__summary-text">
      For older versions of the GOV.UK Prototype Kit
    </span>
  </summary>
  <div class="govuk-details__text">

If you're using a version of the GOV.UK Prototype Kit before 13, you need to take additional steps to use the MOJ Pattern Library in your prototype:

1. Open `app/assets/javascripts/application.js`
2. Add `window.MOJFrontend.initAll()` below the line that does the same for `GOVUKFrontend`

  </div>
</details>

## Updating MOJ Frontend

The current version of MOJ Frontend is **{% version %}**.

You can check which version your prototype is running by opening `package.json` in the root folder of your prototype. Look for `"@ministryofjustice/frontend"` under `"dependencies"`.

To update your prototype to the latest version of MOJ Frontend:

1. Open `package.json` in the root folder of your prototype in a text editor
2. Under `dependencies`, update the reference to MOJ Frontend to `"@ministryofjustice/frontend": "{% version %}",`
3. Save `package.json`
4. Open a command prompt application (e.g. Terminal on MacOS)
5. Change the directory to your prototype's directory. For example, `cd path/to/prototype`
6. Run `npm install`
