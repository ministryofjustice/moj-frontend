---
layout: layouts/get-started.njk
title: Supporting Internet Explorer 8
---

If you are including MoJ Frontend as part of your application's stylesheets then you'll need to do some additional work to support Internet Explorer 8 (IE8).

The first thing you need to do is follow [GOV.UK Frontend's setup instructions](https://frontend.design-system.service.gov.uk/supporting-ie8/) for supporting Internet Explorer 8.

When [generating your IE8-specific stylesheet](https://frontend.design-system.service.gov.uk/supporting-ie8/#2-generate-an-ie8-specific-stylesheet), your `application.scss` will also include the MoJ Frontend import:

```scss
// application.scss

@import "govuk-frontend/dist/frontend/all";
@import "@ministryofjustice/frontend/all";

.example {
  // example application style
}

// application-ie8.scss

$govuk-is-ie8: true;

@import "application";
```
