# Timeline

- [Guidance](https://mojdt-design-system.herokuapp.com/components/timeline)
- [Preview](https://mojdt-frontend.herokuapp.com/components/timeline)

## Dependencies

- [Moment.js](https://momentjs.com/)

### Installation

```
npm install moment --save
```

Then in your prototype's `filters.js`, at the top of the file, require `moment`:

```
const moment = require('moment');
```

Inside the `module.exports = function (env) { }` block, include the following script:

```
/* ------------------------------------------------------------------
  date filter for use in Nunjucks
  example: {{ params.date | date("DD/MM/YYYY") }}
  outputs: 01/01/1970
------------------------------------------------------------------ */
filters.date = function(timestamp, format) {
  return moment(timestamp).format(format);
}

/* ------------------------------------------------------------------
  utility functions for use in mojDate function/filter
------------------------------------------------------------------ */
function govDate(timestamp) {
  return moment(timestamp).format('D MMMM YYYY');
}

function govShortDate(timestamp) {
  return moment(timestamp).format('D MMM YYYY');
}

function govTime(timestamp) {
  let t = moment(timestamp);
  if(t.minutes() > 0) {
    return t.format('h:mma');
  } else {
    return t.format('ha');
  }
}

/* ------------------------------------------------------------------
  standard dates for use in Nunjucks,
  example: {{ params.date | mojDate("datetime") }}
  outputs: 1 Jan 1970 at 1:32pm
------------------------------------------------------------------ */
filters.mojDate = function(timestamp, type) {

  switch(type) {
    case "datetime":
      return govDate(timestamp) + " at " + govTime(timestamp);
    case "shortdatetime":
      return govShortDate(timestamp) + " at " + govTime(timestamp);
    case "date":
      return govDate(timestamp);
    case "shortdate":
      return govShortDate(timestamp);
    case "time":
      return govTime(timestamp);
    default:
      return timestamp;
  }

}
```

## Example

```
{{ mojTimeline({
  items: [
    {
      label: {
        text: "Application requires confirmation"
      },
      html: confirmationHtml,
      datetime: {
        timestamp: "2019-06-14T14:01:00.000Z",
        type: "datetime"
      },
      byline: {
        text: "Joe Bloggs"
      }
    },
    {
      label: {
        text:  "Application review in progress"
      },
      text: "Your application is being reviewed by one of our case workers.",
      datetime: {
        timestamp: "2019-06-07T12:32:00.000Z",
        type: "datetime"
      },
      byline: {
        text: "Caseworker 1"
      }
    },
    {
      label: {
        text:  "Application received"
      },
      text: "Your application has been received – reference MOJ-1234-5678",
      datetime: {
        timestamp: "2019-06-06T09:12:00.000Z",
        type: "datetime"
      },
      byline: {
        text: "Caseworker 1"
      }
    },
    {
      label: {
        text:  "Application submitted"
      },
      html: detailsHtml,
      datetime: {
        timestamp: "2019-05-28T10:45:00.000Z",
        type: "datetime"
      },
      byline: {
        text: "Joe Bloggs"
      }
    },
    {
      label: {
        text:  "Documents uploaded"
      },
      html: documentsHtml,
      datetime: {
        timestamp: "2019-05-28T10:15:00.000Z",
        type: "datetime"
      },
      byline: {
        text: "Joe Bloggs"
      }
    },
    {
      label: {
        text:  "Application started"
      },
      html: listHtml,
      datetime: {
        timestamp: "2019-05-21T13:15:00.000Z",
        type: "datetime"
      },
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
|datetime|object|No|See [item date and time](#itemdatetime).|
|byline|object|No|See [item byline](#itembyline).|
|classes|string|No|Classes to add to the timeline's items container.|
|attributes|object|No|HTML attributes (for example data attributes) to add to the timeline's items container.|

#### Item label

|Name|Type|Required|Description|
|---|---|---|---|
|text|string|Yes|If `html` is set, this is not required. Text to use within the item label. If `html` is provided, the `text` argument will be ignored.|
|html|string|Yes|If `text` is set, this is not required. HTML to use within the item label. If `html` is provided, the `text` argument will be ignored.|

#### Item datetime

|Name|Type|Required|Description|
|---|---|---|---|
|timestamp|string|Yes|A valid datetime string to be formatted. For example: `1970-01-01T11:59:59.000Z`|
|type|string|Yes|If `format` is set, this is not required. The standard date format to use within the item. If `type` is provided, the `format` argument will be ignored. Values include: `datetime`, `shortdatetime`, `date`, `shortdate` and `time`|
|format|string|Yes|If `type` is set, this is not required. The user-defined date format to use within the item. If `type` is provided, the `format` argument will be ignored. See the [Moment.js document on display formats](https://momentjs.com/docs/).|

#### Item byline

|Name|Type|Required|Description|
|---|---|---|---|
|text|string|Yes|If `html` is set, this is not required. Text to use within the item byline. If `html` is provided, the `text` argument will be ignored.|
|html|string|Yes|If `text` is set, this is not required. HTML to use within the item byline. If `html` is provided, the `text` argument will be ignored.|
