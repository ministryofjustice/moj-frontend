# Currency input

- [Guidance](https://moj-design-system.herokuapp.com/components/currency-input)
- [Preview](https://moj-frontend.herokuapp.com/components/currency-input)

## Dependencies

The currency input component is dependent on the following components from the [GOV.UK Frontend](https://github.com/alphagov/govuk-frontend/):

- [GOV.UK Label component](https://github.com/alphagov/govuk-frontend/tree/main/src/govuk/components/label)
- [GOV.UK Hint component](https://github.com/alphagov/govuk-frontend/tree/main/src/govuk/components/hint)
- [GOV.UK Error message component](https://github.com/alphagov/govuk-frontend/tree/main/src/govuk/components/error-message)

## Examples

```
{{ mojCurrencyInput({
  id: "amount",
  classes: "govuk-input--width-10",
  name: "amount",
  label: {
    text: "Amount",
    classes: 'govuk-!-font-weight-bold'
  },
  hint: {
    text: "Enter the amount you want to exchange"
  }
}) }}
```
### With currency specified
```
{{ mojCurrencyInput({
  id: "amount",
  classes: "govuk-input--width-10",
  name: "amount",
  currencyLabel: {
    text: "&yen;"
  },
  label: {
    text: "Amount",
    classes: 'govuk-!-font-weight-bold'
  },
  hint: {
    text: "Enter the amount you want to exchange"
  }
}) }}
```

## Arguments

### Container
|Name|Type|Required|Description|
|---|---|---|---|
|id|string|Yes|Optional `id` attribute to add to the text input.|
|name|string|Yes|Name attribute for the text input.|
|value|string|No|Optional value of the text input.|
|type|string|No|Type of input control to render. Defaults to text.|
|formGroup|object|No|Options for the form-group wrapper. See [formGroup](#formgroup).|
|label|object|No|Options for the label component (e.g. text). See [label](#label).|
|hint|object|No|Options for the hint component (e.g. text). See [hint](#hint).|
|errorMessage|object|No|Options for the errorMessage component (e.g. text). See [errorMessage](#errormessage).|
|currencyLabel|object|No|Options for the currency label (e.g. text). See [currencyLabel](#currencylabel).|
|classes|string|No|Classes to add to the text input.|
|attributes|object|No|HTML attributes (for example data attributes) to add to the text input.|

### formGroup
|Name|Type|Required|Description|
|---|---|---|---|
|classes|string|No|Classes to add to the form group wrapper.|

### Label
|Name|Type|Required|Description|
|---|---|---|---|
|for|string|Yes|The value of the `for` attribute, the `id` of the `input` the label is associated with.|
|text|string|Yes|If `html` is set, this is not required. Text to use within the label. If `html` is provided, the `text` argument will be ignored.|
|html|string|Yes|If `text` is set, this is not required. HTML to use within the label. If `html` is provided, the `text` argument will be ignored.|
|isPageHeading|boolean|No|Whether the label also acts as the heading for the page.|
|classes|string|No|Classes to add to the label tag.|
|attributes|object|No|HTML attributes (for example data attributes) to add to the label tag.|

### Hint
|Name|Type|Required|Description|
|---|---|---|---|
|id|string|No|Optional `id` attribute to add to the hint span tag.|
|text|string|Yes|If `html` is set, this is not required. Text to use within the hint. If `html` is provided, the `text` argument will be ignored.|
|html|string|Yes|If `text` is set, this is not required. HTML to use within the hint. If `html` is provided, the `text` argument will be ignored.|
|classes|string|No|Classes to add to the hint span tag.|
|attributes|object|No|HTML attributes (for example data attributes) to add to the hint span tag.|

### errorMessage
|Name|Type|Required|Description|
|---|---|---|---|
|id|string|No|Optional `id` attribute to add to the error span tag.|
|text|string|Yes|If `html` is set, this is not required. Text to use within the error. If `html` is provided, the `text` argument will be ignored.|
|html|string|Yes|If `text` is set, this is not required. HTML to use within the error. If `html` is provided, the `text` argument will be ignored.|
|classes|string|No|Classes to add to the error span tag.|
|attributes|object|No|HTML attributes (for example data attributes) to add to the error span tag.|

### currencyLabel
|Name|Type|Required|Description|
|---|---|---|---|
|text|string|Yes|If `html` is set, this is not required. Text to use within the error. If `html` is provided, the `text` argument will be ignored.|
|html|string|Yes|If `text` is set, this is not required. HTML to use within the error. If `html` is provided, the `text` argument will be ignored.|
|classes|string|No|Classes to add to the currency span tag.|

*Warning: If you’re using Nunjucks macros in production be aware that using HTML arguments, or ones ending with `.html` can be at risk from [cross-site scripting](https://en.wikipedia.org/wiki/Cross-site_scripting) attacks. More information about security vulnerabilities can be found in the [Nunjucks documentation](https://mozilla.github.io/nunjucks/api.html#user-defined-templates-warning).*
