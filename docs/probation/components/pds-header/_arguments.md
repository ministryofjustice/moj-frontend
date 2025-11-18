### Container

| Name              | Type   | Required | Description                                                                                   |
| ----------------- | ------ | -------- | --------------------------------------------------------------------------------------------- |
| environmentName | string | No      | Tag label showing the current environment. Hidden if value is `PRODUCTION`. |
| environmentNameColour      | string | No      | Custom colour for the environment tag, overriding the default.                |
| name        | string  | Yes       | The display name of the user.                           |
| manageDetailsLink  | string | Yes       | URL linking to the user account management page.   |
| servicesLink  | string | No | URL linking to a services page when JavaScript is disabled |
| services | list | Yes | List of services. See [services](#services) |
| titleLink  | string | No       | The URL that clicking on the title should point to.   |

### services

| Name              | Type   | Required | Description                                                                                   |
| ----------------- | ------ | -------- | --------------------------------------------------------------------------------------------- |
| href | string | Yes      | URL linking to the service |
| heading      | string | Yes      | The service's label |
| target | string | No | The link's target |

_Warning: If you’re using Nunjucks macros in production be aware that using HTML arguments, or ones ending with `.html` can be at risk from [cross-site scripting](https://en.wikipedia.org/wiki/Cross-site_scripting) attacks. More information about security vulnerabilities can be found in the [Nunjucks documentation](https://mozilla.github.io/nunjucks/api.html#user-defined-templates-warning)._
