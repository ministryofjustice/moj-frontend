### Container

| Name          | Type   | Required | Description                                                               |
| ------------- | ------ | -------- | ------------------------------------------------------------------------- |
| items         | Array  | Yes      | An array of button item objects. See [items](#items).                     |
| button        | Object | No       | Properties of the menu title button. See [button](#button).                                   |
| attributes    | Object | No       | HTML attributes (for example data attributes) to add to the button menu container. |

### Button

| Name          | Type   | Required | Description                                                               |
| ------------- | ------ | -------- | ------------------------------------------------------------------------- |
| text          | String | Yes      | Text for the menu title button.                                           |
| classes       | String | No       | Classes to add to the menu title button.                                  |


### Items

See the [button component](https://design-system.service.gov.uk/components/button/) in the GOV.UK Design System for more details.

| Name               | Type    | Required | Description                                                                                                                                                                                                                                                                                                |
| ------------------ | ------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| element            | String  | No       | Whether to use a `button` or `a` element to create the button. In most cases you will not need to set this as it will be configured automatically if you use `href` or `html`.                                                                                                                   |
| text               | String  | Yes      | If `html` is set, this is not required. Text for the button or link. If `html` is provided, the `text` argument will be ignored and `element` will be automatically set to `button` unless `href` is also set, or it has already been defined. |
| html               | String  | Yes      | If `text` is set, this is not required. HTML for the button or link. If `html` is provided, the `text` argument will be ignored and element will be automatically set to `button` unless `href` is also set, or it has already been defined.  |
| name               | String  | Yes      | Name for the `button`. This has no effect on `a` elements.                                                                                                                                                                                                                                      |
| type               | String  | Yes      | Type of `button`. The options are `button`, `submit` or `reset`. This will always be `button` in the button menu component. This has no effect on `a` elements.                                                                                                                                                                      |
| value              | String  | Yes      | Value for the `button` tag. This has no effect on `a` elements.                                                                                                                                                                                                                                 |
| disabled           | Boolean | No       | Whether the button should be disabled. For `button` elements, `disabled` and `aria-disabled` attributes will be set automatically.                                                                                                                                                                 |
| href               | String  | No       | The URL that the button should link to. If this is set, `element` will be automatically set to `a` if it has not already been defined. The `a` tag will be given the `role` of `button`.                                                                                                                                                                  |
| classes            | String  | No       | Classes to add to the button component.                                                                                                                                                                                                                                                                    |
| attributes         | Object  | No       | HTML attributes (for example data attributes) to add to the button.                                                                                                                                                                                                                              |
| preventDoubleClick | Boolean | No       | Prevent accidental double clicks on submit buttons from submitting forms multiple times.                                                                                                                                                                                                                   |

_Warning: If you’re using Nunjucks macros in production be aware that using HTML arguments, or ones ending with `.html` can be at risk from [cross-site scripting](https://en.wikipedia.org/wiki/Cross-site_scripting) attacks. More information about security vulnerabilities can be found in the [Nunjucks documentation](https://mozilla.github.io/nunjucks/api.html#user-defined-templates-warning)._
