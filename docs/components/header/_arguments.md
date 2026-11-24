### Container

| Name              | Type   | Required | Description                                                                                                     |
| ----------------- | ------ | -------- | --------------------------------------------------------------------------------------------------------------- |
| organisationLabel | object | No       | Organisation name and link. See [organisationLabel](#organisationlabel).                                       |
| serviceLabel      | object | No       | Service name and link. See [serviceLabel](#servicelabel).                                                       |
| logoType          | string | No       | MOJ logo to display. Set to `crown` to display the crown logo; otherwise the MOJ crest is displayed.            |
| tag               | object | No       | A [GOV.UK tag](https://design-system.service.gov.uk/components/tag/) to display next to the organisation and service names. See [tag](#tag).|
| account           | object | No       | Account details and links. See [account](#account). Ignored if `slots.end` is provided.                                                           |
| navigation        | object | No       | Navigation label and items. See [navigation](#navigation). Ignored if `account` or `slots.end` is provided.                                                    |
| slots             | object | No       | Custom HTML for the end of the header. See [slots](#slots). If `slots.end` is provided, it is displayed instead of the account or navigation content.                                                    |
| classes           | string | No       | Classes to add to the `header` element.                                                                         |
| containerClasses  | string | No       | Classes to add to the inner header container.                                                                        |
| attributes        | object | No       | HTML attributes (for example, data attributes) to add to the `header` element.                                 |

### organisationLabel

| Name | Type   | Required | Description                                                                                         |
| ---- | ------ | -------- | --------------------------------------------------------------------------------------------------- |
| text | string | Yes      | Text for the organisation name. Ignored if `html` is provided.                          |
| html | string | Yes      | HTML for the organisation name. If provided, `text` is ignored.                         |
| href | string | No       | URL to link the organisation name to. If omitted, the name is displayed as text.                   |

### serviceLabel

| Name | Type   | Required | Description                                                                  |
| ---- | ------ | -------- | ---------------------------------------------------------------------------- |
| text | string | Yes      | Text for the service name. Ignored if `html` is provided.                   |
| html | string | Yes      | HTML for the service name. If provided, `text` is ignored.                  |
| href | string | No       | URL to link the service name to. If omitted, the name is displayed as text. |

### account

| Name        | Type   | Required | Description                                                                                         |
| ----------- | ------ | -------- | --------------------------------------------------------------------------------------------------- |
| label       | string | Yes      | Accessible name for the account navigation. Rendered as the navigation's `aria-label`.             |
| username    | string | No       | User name or email                                                                    |
| manageLink  | object | No       | Link to manage user details. See [account links](#account-links).                                  |
| signOutLink | object | No       | Sign-out link. See [account links](#account-links).                                                 |
| classes     | string | No       | Classes to add to the account navigation.                                                          |
| attributes  | object | No       | HTML attributes (for example, data attributes) to add to the account navigation.                   |

### account links

| Name | Type   | Required | Description                                                 |
| ---- | ------ | -------- | ----------------------------------------------------------- |
| href | string | Yes      | URL for the link. |
| text | string | No       | Text for the link. Ignored if `html` is provided. |
| html | string | No       | HTML for the link. If provided, `text` is ignored.          |

### navigation

| Name       | Type   | Required | Description                                                                                         |
| ---------- | ------ | -------- | --------------------------------------------------------------------------------------------------- |
| label      | string | Yes       | Accessible name for the navigation. Rendered as the navigation's `aria-label`.                     |
| items      | array  | Yes      | Navigation items. See [navigation items](#navigation-items).                                       |
| classes    | string | No       | Classes to add to the navigation.                                                                   |
| attributes | object | No       | HTML attributes (for example, data attributes) to add to the navigation.                            |

### navigation items

| Name       | Type    | Required | Description                                                                                                                        |
| ---------- | ------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| href       | string  | No       | URL for the navigation link. If omitted, the item is displayed as text.                                                            |
| text       | string  | Yes      | Text to use within the navigation item. Ignored if `html` is provided.                                               |
| html       | string  | Yes      | HTML to use within the navigation item. If provided, `text` is ignored.                                              |
| active     | boolean | No       | Whether the navigation item is the current page. If `true`, it is marked with `aria-current="page"`.                              |
| attributes | object  | No       | HTML attributes (for example, data attributes) to add to the navigation link.                                                     |

### slots

| Name | Type   | Required | Description                                                  |
| ---- | ------ | -------- | ------------------------------------------------------------ |
| end  | string | No       | Custom HTML to display at the end of the header, instead of account or navigation content. |

### tag

| Name       | Type   | Required | Description                                                                                                                        |
| ---------- | ------ | -------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| text       | string | Yes      | If `html` is set, this is not required. Text to use within the tag component. If `html` is provided, the `text`option will be ignored.                                     |
| html       | string | Yes      | If `text` is set, this is not required. HTML to use within the tag component. If `html` is provided, the `text` option will be ignored.                                                |
| classes    | string | No       | Classes to add to the tag.                                                                                                         |
| attributes | object | No       | HTML attributes (for example data attributes) to add to the tag.                                                                   |

_If you're using Nunjucks macros in production with `html` options, or ones ending with `html`, you must sanitise the HTML to protect against [cross-site scripting exploits](https://developer.mozilla.org/en-US/docs/Glossary/Cross-site_scripting)._
