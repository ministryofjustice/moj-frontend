---
layout: layouts/archive.njk
title: Password reveal
type: component
redirect_from: /components/password-reveal
githuburl: https://github.com/ministryofjustice/moj-frontend/discussions/709
eleventyNavigation:
  key: Password reveal
  parent: Archive
  excerpt: "Use the password reveal component to let users check their password safely."
---

{% banner "This component is archived" %}

This component was archived because the [GOV.UK Design System Password input](https://design-system.service.gov.uk/components/password-input/) enables users to check their password safely. There’s also the [GOV.UK Design System ‘Ask users for passwords’ pattern](https://design-system.service.gov.uk/patterns/passwords/).
{% endbanner %}


{% example "/examples/password-reveal", 210 %}

## When to use

Use the password reveal component to let users check their password safely.

This component automatically sets the `spellcheck` attribute to `false` to prevent users' passwords being stored in their browsers.
