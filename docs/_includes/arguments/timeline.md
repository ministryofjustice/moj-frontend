### Container

| Name         | Type    | Required | Description                                                                       |
| ----------   | ------  | -------- | --------------------------------------------------------------------------------- |
| classes      | string  | No       | Classes to add to the timeline's container.                                       |
| attributes   | object  | No       | HTML attributes (for example data attributes) to add to the timeline's container. |
| headingLevel | numeric | No       | A number for the heading level. Defaults to 2 (`<h2>`).                           |

### Items

| Name       | Type   | Required | Description                                                                                                                      |
| ---------- | ------ | -------- | -------------------------------------------------------------------------------------------------------------------------------- |
| label      | object | Yes      | See [item label](#itemlabel).                                                                                                    |
| text       | string | Yes      | If `html` is set, this is not required. Text to use within the item. If `html` is provided, the `text` argument will be ignored. |
| html       | string | Yes      | If `text` is set, this is not required. HTML to use within the item. If `html` is provided, the `text` argument will be ignored. |
| datetime   | object | No       | See [item date and time](#itemdatetime).                                                                                         |
| byline     | object | No       | See [item byline](#itembyline).                                                                                                  |
| classes    | string | No       | Classes to add to the timeline's items container.                                                                                |
| attributes | object | No       | HTML attributes (for example data attributes) to add to the timeline's items container.                                          |

#### Item label

| Name | Type   | Required | Description                                                                                                                            |
| ---- | ------ | -------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| text | string | Yes      | If `html` is set, this is not required. Text to use within the item label. If `html` is provided, the `text` argument will be ignored. |
| html | string | Yes      | If `text` is set, this is not required. HTML to use within the item label. If `html` is provided, the `text` argument will be ignored. |

#### Item datetime

| Name      | Type   | Required | Description                                                                                                                                                                                                                             |
| --------- | ------ | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| timestamp | string | Yes      | A valid datetime string to be formatted. For example: `1970-01-01T11:59:59.000Z`                                                                                                                                                        |
| type      | string | Yes      | If `format` is set, this is not required. The standard date format to use within the item. If `type` is provided, the `format` argument will be ignored. Values include: `datetime`, `shortdatetime`, `date`, `shortdate` and `time`    |
| format    | string | Yes      | If `type` is set, this is not required. The user-defined date format to use within the item. If `type` is provided, the `format` argument will be ignored. See the [Moment.js document on display formats](https://momentjs.com/docs/). |

#### Item byline

| Name | Type   | Required | Description                                                                                                                             |
| ---- | ------ | -------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| text | string | Yes      | If `html` is set, this is not required. Text to use within the item byline. If `html` is provided, the `text` argument will be ignored. |
| html | string | Yes      | If `text` is set, this is not required. HTML to use within the item byline. If `html` is provided, the `text` argument will be ignored. |

_Warning: If you’re using Nunjucks macros in production be aware that using HTML arguments, or ones ending with `.html` can be at risk from [cross-site scripting](https://en.wikipedia.org/wiki/Cross-site_scripting) attacks. More information about security vulnerabilities can be found in the [Nunjucks documentation](https://mozilla.github.io/nunjucks/api.html#user-defined-templates-warning)._
