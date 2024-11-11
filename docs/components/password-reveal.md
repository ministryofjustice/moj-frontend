---
layout: layouts/component.njk
title: Password reveal
type: component
githuburl: https://github.com/ministryofjustice/moj-frontend/discussions/709
eleventyNavigation:
  key: Password reveal
  parent: Components
  excerpt: "Use the password reveal component to let users check their password safely."
---

{% example "/examples/password-reveal", 175 %}

## When to use

Use the password reveal component to let users check their password safely.

This component automatically sets the `spellcheck` attribute to `false` to prevent users' passwords being stored in their browsers.
