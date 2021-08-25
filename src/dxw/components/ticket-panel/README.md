# Ticket Panel

- [Guidance](https://moj-design-system.herokuapp.com/components/ticket-panel)
- [Preview](https://moj-frontend.herokuapp.com/components/ticket-panel)

## Example
Below is a typical example of the timeline component in use.

```
{{ mojTicketPanel({
  attributes: {
    'aria-label': 'Sub navigation 1'
  },
  items: [{
    html: ' <h2 class="govuk-heading-m govuk-!-margin-bottom-2">This is a heading 2</h2>
    <p class="govuk-body">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
    <a class="govuk-button govuk-!-margin-bottom-1" data-module="govuk-button">
      Save and continue
    </a>',
    attributes: {
      'aria-label': 'Section 1'
    }
  }]
}) }}
```

## Arguments

This component accepts the following arguments.

### Container

|Name|Type|Required|Description|
|---|---|---|---|
|classes|string|No|Classes to add to the timeline's container.|
|attributes|object|No|HTML attributes (for example data attributes) to add to the timeline's container.|

### Items

|Name|Type|Required|Description|
|---|---|---|---|
|text|string|Yes|If `html` is set, this is not required. Text to use within the item. If `html` is provided, the `text` argument will be ignored.|
|html|string|Yes|If `text` is set, this is not required. HTML to use within the item. If `html` is provided, the `text` argument will be ignored.|
|classes|string|No|Classes to add to the timeline's container.|
|attributes|object|No|HTML attributes (for example data attributes) to add to the timeline's container.|
