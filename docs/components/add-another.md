---
layout: layouts/component.njk
title: Add another
status: To be reviewed
statusDate: June 2021
type: component
githuburl: https://github.com/ministryofjustice/moj-frontend/discussions/686
eleventyNavigation:
  parent: Components
  key: Add another
  excerpt: "Use this component when users need to add similar information a couple of times, such as several names for a single application."
---

{% example "/examples/add-another", 664 %}

## When to use

Use this component when users need to add similar information a couple of times, such as several names for a single application.

## When not to use

Do not use this pattern when users need to add different kinds of information that do not relate to each other.

If users need to add information many times, it may cause performance and validation issues as the page will get very long. In this case, you should use [add to a list](/patterns/add-to-a-list/).

## How to use

The add another component relies on JavaScript. When JavaScript is not available, your page should reload with the additional form elements if the "Add another" button is pressed.

By default the component adds a H2 to the page. Make sure a H1 is also present to provide a clear heading structure.

## Research

This component has been tested in prototypes of several citizen and internal products, including:

- Claim fees for Crown court defence (Legal Aid Agency)
- Moving People Safely (His Majesty’s Prison and Probation Service)

## Accessibility issues

### Identifying form items

Some people who use assistive technology will find it hard to identify new form items (for example ‘first name’) that are created when they use the ‘add another’ button. This is because the form labels all have the same label text.

If you’re using this component in your service you need to add these issue details to your accessibility statement:

#### Assistive technology users will find it difficult to identify form items

When navigating this service with assistive technology, users will find it hard to identify new form items that are created when they use the ‘add another’ button. This fails WCAG success criteria 2.4.6 Headings and Labels (Level AA) and 3.3.2 Labels & Instructions (Level A). We're aware of this issue and plan to review the component, and implement a fix by November 2025.

### Adding another before resolving errors

When a user selects ‘add another’ before resolving a validation error, the error will also be shown in the new field set. If you’re using this component in your service you need to add these issue details to your accessibility statement:

#### Form submission errors are duplicated when a new field set is created using the ‘add another’ button

If someone uses the ‘add another’ button whilst there are unaddressed errors in an existing field set these errors will be duplicated into the new field set. This fails WCAG success criteria 3.3.1 Error identification (Level A), 3.3.3 Error Suggestion (Level AA). We're aware of this issue and plan to review the component, and implement a fix by November 2025.
