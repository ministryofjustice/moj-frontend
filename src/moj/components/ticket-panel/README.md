# Timeline

- [Guidance](https://moj-design-system.herokuapp.com/components/ticket-panel)
- [Preview](https://moj-frontend.herokuapp.com/components/ticket-panel)

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
{{ mojTicketPanel({
  })  }}
```

## Arguments

This component accepts the following arguments.

### Container

|Name|Type|Required|Description|
|---|---|---|---|
|classes|string|No|Classes to add to the timeline's container.|
|attributes|object|No|HTML attributes (for example data attributes) to add to the timeline's container.|
