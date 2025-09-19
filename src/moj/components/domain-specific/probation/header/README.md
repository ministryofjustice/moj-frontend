# PDS Header

## Examples

```njk
{{ pdsHeader({
  environmentName: 'DEV',
  environmentNameColour: 'govuk-tag--green',
  name: 'Account name',
  manageDetailsLink: '#'
}) }}
```

## Arguments

This component accepts the following arguments.

### Container

| Name              | Type   | Required | Description                                                                                   |
| ----------------- | ------ | -------- | --------------------------------------------------------------------------------------------- |
| environmentName | string | No      | Tag label showing the current environment. Hidden if value is `PRODUCTION`. |
| environmentNameColour      | string | No      | Custom colour for the environment tag, overriding the default.                |
| name        | string  | Yes       | The display name of the user.                           |
| manageDetailsLink  | string | Yes       | URL linking to the user account management page.   |


_Warning: If you’re using Nunjucks macros in production be aware that using HTML arguments, or ones ending with `.html` can be at risk from [cross-site scripting](https://en.wikipedia.org/wiki/Cross-site_scripting) attacks. More information about security vulnerabilities can be found in the [Nunjucks documentation](https://mozilla.github.io/nunjucks/api.html#user-defined-templates-warning)._
