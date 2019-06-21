# Timeline

- [Guidance](https://mojdt-design-system.herokuapp.com/components/timeline)
- [Preview](https://mojdt-frontend.herokuapp.com/components/timeline)

## Example

```
{{ mojTimeline({
  items: [
    {
      label: {
        text: "Application requires confirmation"
      },
      html: confirmationHtml,
      timestamp: "Friday, 14 June 2019 at 2:01 PM",
      byline: {
        text: "Joe Bloggs"
      }
    },
    {
      label: {
        text:  "Application review in progress"
      },
      text: "Your application is being reviewed by one of our case workers.",
      timestamp: "Friday, 7 June 2019 at 12:32 PM",
      byline: {
        text: "Caseworker 1"
      }
    },
    {
      label: {
        text:  "Application received"
      },
      text: "Your application has been received – reference MOJ-1234-5678",
      timestamp: "Thursday, 6 June 2019 at 9:12 AM",
      byline: {
        text: "Caseworker 1"
      }
    },
    {
      label: {
        text:  "Application submitted"
      },
      html: detailsHtml,
      timestamp: "Tuesday, 28 May 2019 at 10:45 AM",
      byline: {
        text: "Joe Bloggs"
      }
    },
    {
      label: {
        text:  "Application started"
      },
      html: listHtml,
      timestamp: "Tuesday, 21 May 2019 at 2:15 PM",
      byline: {
        text: "Joe Bloggs"
      }
    }
  ]
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
|label|object|Yes|See [item label](#itemlabel).|
|text|string|Yes|If `html` is set, this is not required. Text to use within the item. If `html` is provided, the `text` argument will be ignored.|
|html|string|Yes|If `text` is set, this is not required. HTML to use within the item. If `html` is provided, the `text` argument will be ignored.|
|byline|object|No|See [item byline](#itembyline).|
|timestamp|string|No|The timestamp for the item.|
|classes|string|No|Classes to add to the timeline's items container.|
|attributes|object|No|HTML attributes (for example data attributes) to add to the timeline's items container.|


#### Item label

|Name|Type|Required|Description|
|---|---|---|---|
|text|string|Yes|If `html` is set, this is not required. Text to use within the item label. If `html` is provided, the `text` argument will be ignored.|
|html|string|Yes|If `text` is set, this is not required. HTML to use within the item label. If `html` is provided, the `text` argument will be ignored.|


#### Item byline

|Name|Type|Required|Description|
|---|---|---|---|
|text|string|Yes|If `html` is set, this is not required. Text to use within the item byline. If `html` is provided, the `text` argument will be ignored.|
|html|string|Yes|If `text` is set, this is not required. HTML to use within the item byline. If `html` is provided, the `text` argument will be ignored.|
