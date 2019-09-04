# Supporting Internet Explorer 8

If you are including MOJ Frontend as part of your application's stylesheets then you'll need to do some additional work to support Internet Explorer 8 (IE8).

## Before you start

Before reading the rest of these guides, you should first follow [GOV.UK Frontend's setup instructions](https://github.com/alphagov/govuk-frontend/blob/master/docs/installation/supporting-internet-explorer-8.md#transforming-the-generated-stylesheet-using-oldie) for supporting Internet Explorer 8.

All the instructions are the same except that in the Bundling an IE8-specific stylesheet step you also need to at MOJ Frontend as follows:

```scss

// application.scss

@import "govuk-frontend/frontend/all";
@import "@ministryofjustice/frontend/all";

.example {
  // example application style
}

// application-ie8.scss

$govuk-is-ie8: true;

@import "application";
```