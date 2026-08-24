| Name         | Type    | Required | Description                                                                                                                                                                                              |
| ------------ | ------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| action       | string  | Yes      | The URL the form submits to.                                                                                                                                                                             |
| method       | string  | No       | The HTTP method used to submit the form. Defaults to `get`.                                                                                                                                              |
| csrf         | object  | No       | A CSRF token to include as a hidden input in the form. [See options for csrf](#{{id}}-csrf).                                                                                                             |
| input        | object  | Yes      | The search input. [See options for input](#{{id}}-input).                                                                                                                                                |
| button       | object  | Yes      | The search button. [See options for button](#{{id}}-button).                                                                                                                                             |
| label        | object  | No       | The label for the search input. [See options for label](#{{id}}-label).                                                                                                                                  |
| hint         | object  | No       | A hint for the search input. [See options for hint](#{{id}}-hint).                                                                                                                                       |
| layout       | string  | No       | Set to `stacked` to place the button below the input.                                                                                                                                                    |
| iconButton   | boolean | No       | Set to `true` to render the button as an icon-only magnifying glass button. Accessible button text is set via `button.text`. If `layout` is set to `stacked`, the `iconButton` option will be ignored.   |
| classes      | string  | No       | Classes to add to the search container.                                                                                                                                                                  |
| attributes   | object  | No       | HTML attributes (for example data attributes) to add to the search element.                                                                                                                              |

### Options for the `input` component [#{{id}}-input]

| Name       | Type   | Required | Description                                                                |
| ---------- | ------ | -------- | -------------------------------------------------------------------------- |
| id         | string | Yes      | The ID of the input.                                                       |
| name       | string | Yes      | The name of the input, submitted with the form data.                       |
| classes    | string | No       | Classes to add to the input element.                                       |
| attributes | object | No       | HTML attributes (for example data attributes) to add to the input element. |

### Options for the `button` component [#{{id}}-button]

| Name               | Type    | Required | Description                                                                                                                                                                                                                              |
| ------------------ | ------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| text               | string  | Yes      | If `html` is set, this is not required. Text for the button. When `iconButton` is `true`, this text is visually hidden and used as the accessible label. If `html` is provided, the `text` option will be ignored.                       |
| html               | string  | Yes      | If `text` is set, this is not required. HTML for the button. If `html` is provided, the `text` option will be ignored. If `iconButton` is `true` the `html` option will be ignored.                                                      |
| id                 | string  | No       | The ID of the button.                                                                                                                                                                                                                    |
| name               | string  | No       | Name of the button, sent when a form is submitted. This has no effect if `href` is set.                                                                                                                                                  |
| value              | string  | No       | Value of the button, sent when a form is submitted. This has no effect if `href` is set.                                                                                                                                                 |
| classes            | string  | No       | Classes to add to the button.                                                                                                                                                                                                            |
| attributes         | object  | No       | HTML attributes (for example data attributes) to add to the button.                                                                                                                                                                      |
| preventDoubleClick | boolean | No       | Prevent accidental double clicks on submit buttons from submitting forms multiple times.                                                                                                                                                 |

### Options for the `label` component [#{{id}}-label]

| Name       | Type   | Required | Description                                                                                                                     |
| ---------- | ------ | -------- | ------------------------------------------------------------------------------------------------------------------------------- |
| text       | string | Yes      | If `html` is set, this is not required. Text to use within the label. If `html` is provided, the `text` option will be ignored. |
| html       | string | Yes      | If `text` is set, this is not required. HTML to use within the label. If `html` is provided, the `text` option will be ignored. |
| classes    | string | No       | Classes to add to the label tag.                                                                                                |
| attributes | object | No       | HTML attributes (for example data attributes) to add to the label tag.                                                          |

### Options for the `hint` component [#{{id}}-hint]

| Name       | Type   | Required | Description                                                                                                                    |
| ---------- | ------ | -------- | ------------------------------------------------------------------------------------------------------------------------------ |
| text       | string | Yes      | If `html` is set, this is not required. Text to use within the hint. If `html` is provided, the `text` option will be ignored. |
| html       | string | Yes      | If `text` is set, this is not required. HTML to use within the hint. If `html` is provided, the `text` option will be ignored. |
| id         | string | No       | Optional ID attribute to add to the hint span tag.                                                                             |
| classes    | string | No       | Classes to add to the hint span tag.                                                                                           |
| attributes | object | No       | HTML attributes (for example data attributes) to add to the hint span tag.                                                     |

### Options for the `csrf` object [#{{id}}-csrf]

| Name  | Type   | Required | Description                                                          |
| ----- | ------ | -------- | -------------------------------------------------------------------- |
| value | string | Yes      | The CSRF token value to include in the hidden input.                 |
| name  | string | No       | The name attribute for the hidden CSRF input. Defaults to 'csrf'. |
