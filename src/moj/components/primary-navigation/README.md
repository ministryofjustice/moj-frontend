# Primary navigation

- [Guidance](https://design-patterns.service.justice.gov.uk/components/primary-navigation)

## Example

```
{{ mojPrimaryNavigation({
  label: 'Primary navigation',
  items: [{
    text: 'Nav item 1',
    href: '#1',
    active: true
  }, {
    text: 'Nav item 2',
    href: '#2'
  }, {
    text: 'Nav item 3',
    href: '#3'
  }]
}) }}
```

## Arguments

This component accepts the following arguments.

### Container

| Name             | Type   | Required | Description                                                                  |
| ---------------- | ------ | -------- | ---------------------------------------------------------------------------- |
| label            | string | No       | The `aria-label` to add to the navigation container.                         |
| items            | array  | Yes      | An array of navigation item objects. See [items](#items).                    |
| searchHtml       | sting  | No       |                                                                              |
| containerClasses | string | No       | Classes to add to the parent `div` container.                                |
| classes          | string | No       | Classes to add to the `nav` container.                                       |
| attributes       | object | No       | HTML attributes (for example data attributes) to add to the `nav` container. |

### Items

| Name       | Type    | Required | Description                                                                                                                        |
| ---------- | ------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| href       | string  | Yes      | URL of the navigation item anchor. Both href and text attributes for navigation items need to be provided to create an item.       |
| text       | string  | Yes      | If `html` is set, this is not required. Text to use within the anchor. If `html` is provided, the `text` argument will be ignored. |
| html       | string  | Yes      | If `text` is set, this is not required. HTML to use within the anchor. If `html` is provided, the `text` argument will be ignored. |
| active     | boolean | No       | Flag to mark the navigation item as active or not. Defaults to `false`.                                                            |
| attributes | object  | No       | HTML attributes (for example data attributes) to add to the navigation item anchor.                                                |

_Warning: If you’re using Nunjucks macros in production be aware that using HTML arguments, or ones ending with `.html` can be at risk from [cross-site scripting](https://en.wikipedia.org/wiki/Cross-site_scripting) attacks. More information about security vulnerabilities can be found in the [Nunjucks documentation](https://mozilla.github.io/nunjucks/api.html#user-defined-templates-warning)._
