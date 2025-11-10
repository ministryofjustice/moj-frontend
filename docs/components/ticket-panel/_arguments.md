### Container

| Name       | Type   | Required | Description                                                                       |
| ---------- | ------ | -------- | --------------------------------------------------------------------------------- |
| classes    | string | No       | Classes to add to the timeline's container.                                       |
| attributes | object | No       | HTML attributes (for example data attributes) to add to the timeline's container. |

### Items

| Name       | Type   | Required | Description                                                                                                                      |
| ---------- | ------ | -------- | -------------------------------------------------------------------------------------------------------------------------------- |
| text       | string | Yes      | If `html` is set, this is not required. Text to use within the item. If `html` is provided, the `text` argument will be ignored. |
| html       | string | Yes      | If `text` is set, this is not required. HTML to use within the item. If `html` is provided, the `text` argument will be ignored. |
| classes    | string | No       | Classes to add to the timeline's container.                                                                                      |
| attributes | object | No       | HTML attributes (for example data attributes) to add to the timeline's container.                                                |

_Warning: If you’re using Nunjucks macros in production be aware that using HTML arguments, or ones ending with `.html` can be at risk from [cross-site scripting](https://en.wikipedia.org/wiki/Cross-site_scripting) attacks. More information about security vulnerabilities can be found in the [Nunjucks documentation](https://mozilla.github.io/nunjucks/api.html#user-defined-templates-warning)._
