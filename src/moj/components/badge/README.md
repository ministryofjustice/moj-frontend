# Badge

- [Guidance](https://design-patterns.service.justice.gov.uk/components/badge)

## Example

```
{{ mojBadge({
  text: "Status text",
  classes: "moj-badge--blue"
}) }}
```

## Arguments

This component accepts the following arguments.

| Name       | Type   | Required | Description                                                                                                                      |
| ---------- | ------ | -------- | -------------------------------------------------------------------------------------------------------------------------------- |
| text       | string | Yes      | If `html` is set, this is not required. Text to use within the span. If `html` is provided, the `text` argument will be ignored. |
| html       | string | Yes      | If `text` is set, this is not required. HTML to use within the span. If `html` is provided, the `text` argument will be ignored. |
| classes    | string | Yes      | Classes to add to the `span` container. See available [classes](#classes).                                                       |
| label      | string | No       | The `aria-label` to add to the `span` container.                                                                                 |
| attributes | object | No       | HTML attributes (for example data attributes) to add to the `span` container.                                                    |

### Classes

| Name                     | Colour code | Colour contrast |
| ------------------------ | ----------- | --------------- |
| moj-badge--purple        | #2e358b     | Pass            |
| moj-badge--light-purple  | #6f72af     | Fail            |
| moj-badge--bright-purple | #912b88     | Pass            |
| moj-badge--pink          | #d53880     | Fail            |
| moj-badge--light-pink    | #f499be     | Fail            |
| moj-badge--red           | #b10e1e     | Pass            |
| moj-badge--orange        | #f47738     | Fail            |
| moj-badge--brown         | #b58840     | Fail            |
| moj-badge--yellow        | #ffbf47     | Fail            |
| moj-badge--light-green   | #85994b     | Fail            |
| moj-badge--green         | #006435     | Pass            |
| moj-badge--turquoise     | #28a197     | Fail            |
| moj-badge--light-blue    | #2b8cc4     | Fail            |
| moj-badge--blue          | #005ea5     | Pass            |
| moj-badge--black         | #0b0c0c     | Pass            |
| moj-badge--dark-grey     | #6f777b     | Pass            |
| moj-badge--mid-grey      | #bfc1c3     | Fail            |
| moj-badge--light-grey    | #dee0e2     | Fail            |
| moj-badge--light-grey    | #f8f8f8     | Fail            |
| moj-badge--white         | #ffffff     | Fail            |
