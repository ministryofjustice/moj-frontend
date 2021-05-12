# Supporting Internet Explorer 8

If you are including MOJ Frontend as part of your application's stylesheets then you'll need to do some additional work to support Internet Explorer 8 (IE8).

The first thing you need to do is follow [GOV.UK Frontend's setup instructions](https://github.com/alphagov/govuk-frontend/blob/main/docs/installation/supporting-internet-explorer-8.md#transforming-the-generated-stylesheet-using-oldie) for supporting Internet Explorer 8.

In [Bundling an IE8-specific stylesheet](https://github.com/alphagov/govuk-frontend/blob/main/docs/installation/supporting-internet-explorer-8.md#bundling-an-ie8-specific-stylesheet) you also need to add MOJ Frontend as shown below.

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

That's it.
