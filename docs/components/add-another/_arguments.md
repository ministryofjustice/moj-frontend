| Name                   | Type    | Required | Description                                                                                                                                                     |
| ---------------------- | ------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| id                     | string  | Yes      | The ID of the input.  |
| itemLabel              | string  | Yes      | The label for each item. Should be title case. Defaults to ‘Item’.                    |
| items                  | array   | Yes      | The items within the ‘add another’ component. [See macro options for items](#items).  |
| layout                 | string  | No       | Can be ‘stacked’ or ‘inline’. Defaults to stacked. |
| classes                | string  | No       | Classes to add to the container. |
| attributes             | object  | No       | HTML attributes (for example data attributes) to add to the container.|

### items

| Name                   | Type    | Required | Description                                                                                                                                                     |
| ---------------------- | ------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| fieldset               | object  | Yes      | [See macro options for fieldset](#fieldset). |
| errorMessage           | object  | No       | Used to display errors for the ‘inline’ layout. [See options for errorMessage](#errormessage). |
| removeButton           | object  | No       | [See options for removeButton](#removebutton). |
| classes                | string  | No       | Classes to add to the item container. |

### errorMessage

| Name                   | Type    | Required | Description                                                                                                                                                     |
| ---------------------- | ------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| text                   | string  | Yes      | If `html` is set, this is not required. Text to use within the error message. If `html` is provided, the `text` option will be ignored.                                     |
| html                   | string  | Yes      | If `text` is set, this is not required. HTML to use within the error message. If `html` is provided, the `text` option will be ignored.                                    |
| classes                | string  | No       | Classes to add to the error message ‘<p>’ tag. |
| attributes             | object  | No       | HTML attributes (for example data attributes) to add to the error message ‘<p>’ tag. |
| visuallyHiddenText     | string  | No       | A visually hidden prefix used before the error message. Defaults to ‘Error’. |

### removeButton
| Name                   | Type    | Required | Description                                                                                                                                                     |
| ---------------------- | ------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| name                   | string  | Yes      | Name of the button, sent when a form is submitted. |
| value                  | string  | Yes      | Value of the button, sent when a form is submitted. |

### fieldset
| Name                   | Type    | Required | Description                                                                                                                                                     |
| ---------------------- | ------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| describedBy            | string  | No       | One or more element IDs to add to the `aria-describedby` attribute, used to provide additional descriptive information for screen reader users. |
| legend                 | object  | No       | Required for ‘stacked’ layout. [See macro options for legend](#legend). |
| html                   | string  | Yes      | HTML to use or render within the fieldset element.|
| classes                | string  | No       | Classes to add to the fieldset container. |
| role                   | string  | No       | Optional ARIA role attribute. |
| attributes             | string  | No       | HTML attributes (for example data attributes) to add to the fieldset container.  

For the ‘inline’ layout, the attributes must contain an `aria-labelledby` attribute with an element ID. |

### legend
| Name                   | Type    | Required | Description
| ---------------------- | ------- | -------- |---------------------------------------------------------------------------------------------------------------------------------------------------------------|
| text                   | string  | Yes      | If `html` is set, this is not required. Text to use within the legend. If `html` is provided, the `text` option will be ignored. |
| html                   | string  | Yes      | If `text` is set, this is not required. HTML to use within the legend. If `html` is provided, the `text` option will be ignored. |
| classes                | string  | No       | Classes to add to the legend. |

