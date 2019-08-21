# Task list

- [Guidance](https://moj-design-system.herokuapp.com/components/task-list)
- [Preview](https://moj-frontend.herokuapp.com/components/task-list)

## Example

```
{{ mojTaskList({
  sections: [
    {
      heading: {
        text: 'Section 1'
      },
      items: [{
        text: 'Item 1.1',
        href: '#',
        complete: true
      }, {
        text: 'Item 1.2',
        href: '#'
      }, {
        text: 'Item 1.3',
        href: '#'
      }]
    },
    {
      heading: {
        text: 'Section 2'
      },
      items: [{
        text: 'Item 2.1',
        href: '#'
      }, {
        text: 'Item 2.2',
        href: '#'
      }, {
        text: 'Item 2.3',
        href: '#'
      }]
    }
  ]
}) }}
```

## Arguments

This component accepts the following arguments.

### Container

|Name|Type|Required|Description|
|---|---|---|---|
|sections|array|No|An array of section objects containing task list items. See [sections](#sections).|
|classes|string|No|Classes to add to the `nav` container.|
|attributes|object|No|HTML attributes (for example data attributes) to add to the `ol` container.|

### Sections

|Name|Type|Required|Description|
|---|---|---|---|
|items|array|Yes|An array of task list item objects. See [items](#items).|
|heading|object|Yes|See [heading](#headings)|
|attributes|object|No|HTML attributes (for example data attributes) to add to the section `li`.|

#### Headings

|Name|Type|Required|Description|
|---|---|---|---|
|headingLevel|numeric|No|A number for the heading level. Defaults to 2 (`<h2>`)|
|text|string|Yes|If `html` is set, this is not required. Text to use within the heading. If `html` is provided, the `text` argument will be ignored.|
|html|string|Yes|If `text` is set, this is not required. HTML to use within the heading. If `html` is provided, the `text` argument will be ignored.|
|classes|string|No|Classes to add to the heading.|
|attributes|object|No|HTML attributes (for example data attributes) to add to the item anchor.|

#### Items

|Name|Type|Required|Description|
|---|---|---|---|
|href|string|Yes|URL of the item anchor. Both href and text attributes for items need to be provided to create an item.|
|text|string|Yes|If `html` is set, this is not required. Text to use within the anchor. If `html` is provided, the `text` argument will be ignored.|
|html|string|Yes|If `text` is set, this is not required. HTML to use within the anchor. If `html` is provided, the `text` argument will be ignored.|
|complete|boolean|No|Flag to mark the item as complete or not. Defaults to `false`.|
|attributes|object|No|HTML attributes (for example data attributes) to add to the item anchor.|


*Warning: If you’re using Nunjucks macros in production be aware that using HTML arguments, or ones ending with `.html` can be at risk from [cross-site scripting](https://en.wikipedia.org/wiki/Cross-site_scripting) attacks. More information about security vulnerabilities can be found in the [Nunjucks documentation](https://mozilla.github.io/nunjucks/api.html#user-defined-templates-warning).*