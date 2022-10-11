# Header

- [Guidance](https://design-patterns.service.justice.gov.uk/components/header)

## Examples

```
{{ mojHeader({
  organisationLabel: {
    text: 'Organisation name',
    href: '#'
  },
  serviceLabel: {
    text: 'Service name',
    href: '#'
  },
  navigation: {
    label: 'Account navigation',
    items: [{
      text: 'Account name',
      href: '#',
      active: true
    }, {
      text: 'Sign out',
      href: '#'
    }]
  }
}) }}
```

## Arguments

This component accepts the following arguments.

### Container

| Name              | Type   | Required | Description                                                                                   |
| ----------------- | ------ | -------- | --------------------------------------------------------------------------------------------- |
| organisationLabel | object | Yes      | An object containing the organisation's details. See [organisationLabel](#organisationlabel). |
| serviceLabel      | object | Yes      | An object containing the service's details. See [serviceLabel](#servicelabel).                |
| navigation        | array  | No       | An array of navigation item objects. See [navigation](#navigation).                           |
| containerClasses  | string | No       | Classes for the container, useful if you want to make the header fixed width.                 |
| classes           | string | No       | Classes to add to the `header` container.                                                     |
| attributes        | object | No       | HTML attributes (for example data attributes) to add to the header container.                 |

### organisationLabel

| Name | Type   | Required | Description                                                                                                         |
| ---- | ------ | -------- | ------------------------------------------------------------------------------------------------------------------- |
| text | string | Yes      | Header title that is placed next to the crest. Used for organisation names (e.g., CICA, HMCTS, HMPPS, LAA and OPG). |
| href | string | Yes      | URL for the organisation name anchor.                                                                               |

### serviceLabel

| Name | Type   | Required | Description                                                                                                                                            |
| ---- | ------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| text | string | Yes      | Header title that is placed next to the organisation name. Used for service names (e.g., Claim fees for Crown court defence; Send money to prisoners). |
| href | string | Yes      | URL for the service name anchor.                                                                                                                       |

### Navigation

| Name       | Type    | Required | Description                                                                                                                        |
| ---------- | ------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| href       | string  | Yes      | URL of the navigation item anchor. Both href and text attributes for navigation items need to be provided to create an item.       |
| text       | string  | Yes      | If `html` is set, this is not required. Text to use within the anchor. If `html` is provided, the `text` argument will be ignored. |
| html       | string  | Yes      | If `text` is set, this is not required. HTML to use within the anchor. If `html` is provided, the `text` argument will be ignored. |
| active     | boolean | No       | Flag to mark the navigation item as active or not. Defaults to `false`.                                                            |
| attributes | object  | No       | HTML attributes (for example data attributes) to add to the navigation item anchor.                                                |

_Warning: If you’re using Nunjucks macros in production be aware that using HTML arguments, or ones ending with `.html` can be at risk from [cross-site scripting](https://en.wikipedia.org/wiki/Cross-site_scripting) attacks. More information about security vulnerabilities can be found in the [Nunjucks documentation](https://mozilla.github.io/nunjucks/api.html#user-defined-templates-warning)._
