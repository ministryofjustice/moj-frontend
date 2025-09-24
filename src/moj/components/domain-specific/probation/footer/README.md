# PDS Header

## Examples

```njk
{{ pdsFooter({
  baseUrl: 'https://probation-frontend-components-dev.hmpps.service.justice.gov.uk'
}) }}
```

## Arguments

This component accepts the following arguments.

### Container

| Name              | Type   | Required | Description                                                                                   |
| ----------------- | ------ | -------- | --------------------------------------------------------------------------------------------- |
| baseUrl | string | Yes      | Base URL for the probation API. |


_Warning: If you’re using Nunjucks macros in production be aware that using HTML arguments, or ones ending with `.html` can be at risk from [cross-site scripting](https://en.wikipedia.org/wiki/Cross-site_scripting) attacks. More information about security vulnerabilities can be found in the [Nunjucks documentation](https://mozilla.github.io/nunjucks/api.html#user-defined-templates-warning)._
