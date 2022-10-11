# Button menu

- [Guidance](https://design-patterns.service.justice.gov.uk/components/button-menu)

## Examples

### Example 1

The macro

```
{{ mojButtonGroup({
  items: [{
    text: 'Archive',
    classes: 'govuk-button--secondary',
    href: '#'
  }, {
    text: 'Reassign',
    classes: 'govuk-button--secondary',
    href: '#'
  }, {
    text: 'Delete',
    classes: 'govuk-button--secondary',
    href: '#'
  }]
}) }}
```

The JavaScript

```
new MOJFrontend.ButtonGroup({
  container: $('.moj-button-group'),
  mq: '(min-width: 45em)',
  buttonText: 'Actions'
});
```

## Arguments

### Container

| Name          | Type   | Required | Description                                                               |
| ------------- | ------ | -------- | ------------------------------------------------------------------------- |
| items         | array  | Yes      | An array of button item objects. See [items](#items).                     |
| buttonClasses | String | No       | Classes to add to the button items.                                       |
| attributes    | Object | No       | HTML attributes (for example data attributes) to add to the button group. |

### Items

See the [button component](https://design-system.service.gov.uk/components/button/) in the GOV.UK Design System for more details.

| Name               | Type    | Required | Description                                                                                                                                                                                                                                                                                                |
| ------------------ | ------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| element            | String  | No       | Whether to use an `input`, `button` or `a` element to create the button. In most cases you will not need to set this as it will be configured automatically if you use `href` or `html`.                                                                                                                   |
| text               | String  | Yes      | If `html` is set, this is not required. Text for the button or link. If `html` is provided, the `text` argument will be ignored and `element` will be automatically set to `button` unless `href` is also set, or it has already been defined. This argument has no effect if `element` is set to `input`. |
| html               | String  | Yes      | If `text` is set, this is not required. HTML for the button or link. If `html` is provided, the `text` argument will be ignored and element will be automatically set to `button` unless `href` is also set, or it has already been defined. This argument has no effect if `element` is set to `input`.   |
| name               | String  | Yes      | Name for the `input` or `button`. This has no effect on `a` elements.                                                                                                                                                                                                                                      |
| type               | String  | Yes      | Type of `input` or `button`. The options are `button`, `submit` or `reset`. Defaults to `submit`. This has no effect on `a` elements.                                                                                                                                                                      |
| value              | String  | Yes      | Value for the `button` tag. This has no effect on `a` or `input` elements.                                                                                                                                                                                                                                 |
| disabled           | Boolean | No       | Whether the button should be disabled. For button and input elements, `disabled` and `aria-disabled` attributes will be set automatically.                                                                                                                                                                 |
| href               | String  | No       | The URL that the button should link to. If this is set, `element` will be automatically set to `a` if it has not already been defined.                                                                                                                                                                     |
| classes            | String  | No       | Classes to add to the button component.                                                                                                                                                                                                                                                                    |
| attributes         | Object  | No       | HTML attributes (for example data attributes) to add to the button component.                                                                                                                                                                                                                              |
| preventDoubleClick | Boolean | No       | Prevent accidental double clicks on submit buttons from submitting forms multiple times.                                                                                                                                                                                                                   |
