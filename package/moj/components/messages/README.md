# Messages

- [Guidance](https://moj-design-system.herokuapp.com/components/messages)
- [Preview](https://moj-frontend.herokuapp.com/components/messages)

### Installation

You will need to install the following code at the bottom of `server.js`, just above `module.exports = app;`

```
// Add filters from MOJ Frontend
let mojFilters = require('./node_modules/@ministryofjustice/frontend/filters/all')();
mojFilters = Object.assign(mojFilters);
Object.keys(mojFilters).forEach(function (filterName) {
  nunjucksAppEnv.addFilter(filterName, mojFilters[filterName])
});
```

## Example
Below is a typical example of the timeline component in use.

```
{{ mojMessages({
  items: [
    {
      id: 1,
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      type: 'sent',
      timestamp: '2018-10-16T10:50:00.000Z',
      sender: 'Person A'
    },
    {
      id: 2,
      text: 'Nullam vestibulum lorem vulputate velit euismod luctus.',
      type: 'received',
      timestamp: '2018-10-17T10:51:00.000Z',
      sender: 'Person B'
    },
    {
      id: 3,
      text: 'Fusce et vulputate justo. Integer suscipit felis non urna lobortis, vel finibus sem tristique.',
      type: 'sent',
      timestamp: '2018-10-19T10:53:00.000Z',
      sender: 'Person A'
    },
    {
      id: 4,
      text: 'Mauris tincidunt feugiat orci et convallis. Nam efficitur gravida justo non lobortis. Aliquam velit ante, lobortis eu venenatis sit amet, semper sit amet justo.',
      type: 'sent',
      timestamp: '2018-10-19T10:55:00.000Z',
      sender: 'Person A'
    },
    {
      id: 5,
      text: 'Proin dapibus, nisl id ultricies ultricies, erat magna pulvinar risus, sit amet commodo nunc purus eu nulla. Aliquam erat volutpat. Vestibulum in ante interdum, elementum arcu vel, viverra nibh. Etiam ultrices urna at suscipit sollicitudin. Nulla non lectus magna. Curabitur vel vestibulum lorem. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.',
      type: 'received',
      timestamp: '2018-10-21T11:56:00.000Z',
      sender: 'Person B'
    }
  ]
}) }}
```

## Arguments

This component accepts the following arguments.

### Container

|Name|Type|Required|Description|
|---|---|---|---|
|items|array|Yes|An array of message item objects. See [items](#items).|
|classes|string|No|Classes to add to the messages's container.|
|attributes|object|No|HTML attributes (for example data attributes) to add to the message's container.|

### Items

|Name|Type|Required|Description|
|---|---|---|---|
|id|string|No|The unique ID of the item|
|text|string|Yes|If `html` is set, this is not required. Text to use within the item. If `html` is provided, the `text` argument will be ignored.|
|html|string|Yes|If `text` is set, this is not required. HTML to use within the item. If `html` is provided, the `text` argument will be ignored.|
|type|string|Yes|Used to show sent or received messages. Sent messages are blue and aligned to the right, received messages are grey and aligned to the left. Options: `sent` or `received`.|
|sender|string|Yes|The thing that created the message.|
|timestamp|string|Yes|A valid datetime string to be formatted. For example: `1970-01-01T11:59:59.000Z`|
