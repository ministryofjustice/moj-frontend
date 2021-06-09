### Container

| Name       | Type   | Required | Description                                                                      |
| ---------- | ------ | -------- | -------------------------------------------------------------------------------- |
| items      | array  | Yes      | An array of message item objects. See [items](#items).                           |
| classes    | string | No       | Classes to add to the messages's container.                                      |
| attributes | object | No       | HTML attributes (for example data attributes) to add to the message's container. |

### Items

| Name      | Type   | Required | Description                                                                                                                                                                 |
| --------- | ------ | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| id        | string | No       | The unique ID of the item                                                                                                                                                   |
| text      | string | Yes      | If `html` is set, this is not required. Text to use within the item. If `html` is provided, the `text` argument will be ignored.                                            |
| html      | string | Yes      | If `text` is set, this is not required. HTML to use within the item. If `html` is provided, the `text` argument will be ignored.                                            |
| type      | string | Yes      | Used to show sent or received messages. Sent messages are blue and aligned to the right, received messages are grey and aligned to the left. Options: `sent` or `received`. |
| sender    | string | Yes      | The thing that created the message.                                                                                                                                         |
| timestamp | string | Yes      | A valid datetime string to be formatted. For example: `1970-01-01T11:59:59.000Z`                                                                                            |

_Warning: If you’re using Nunjucks macros in production be aware that using HTML arguments, or ones ending with `.html` can be at risk from [cross-site scripting](https://en.wikipedia.org/wiki/Cross-site_scripting) attacks. More information about security vulnerabilities can be found in the [Nunjucks documentation](https://mozilla.github.io/nunjucks/api.html#user-defined-templates-warning)._
