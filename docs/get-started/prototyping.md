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

Alternatively, you can install the GOV.UK Prototype Kit and MOJ Pattern Library manually. You must follow the [GOV.UK Design System prototype setup guide](https://design-system.service.gov.uk/get-started/prototyping/) first. Once you've done that, continue below.

### Installing MOJ Frontend

The MOJ Pattern Library uses MOJ Frontend. To install it, run these steps:

1. open Terminal
2. change the directory to your prototype. For example, `cd path/to/prototype`
3. run `npm install @ministryofjustice/frontend --save`
4. add `window.dxwFrontend.initAll()` to `app/assets/javascripts/application.js` below the line doing the same for `GOVUKFrontend`

## Updating MOJ Frontend

The current version of MOJ Frontend is **0.2.1**.

You can check which version your prototype is running by opening `package.json` in the root folder of your prototype. Look for `"@ministryofjustice/frontend"` under `"dependencies"`.

To update your prototype to the latest version of MOJ Frontend:

1. open `package.json` in the root folder of your prototype in a text editor
2. Under `dependencies`, update the reference to MOJ Frontend to `"@ministryofjustice/frontend": "0.2.1",`
3. save `package.json`
4. open Terminal/command line
5. change the directory to your prototype's directory. For example, `cd path/to/prototype`
6. run `npm install`
