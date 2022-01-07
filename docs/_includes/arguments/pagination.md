| Name     | Type   | Required | Description                                                                                                             |
| -------- | ------ | -------- | ----------------------------------------------------------------------------------------------------------------------- |
| items    | array  | Yes      | An array of pages to display. See [items](#items).                                                                      |
| results  | object | No       | Optional object describing the total number of results and which ones are on the current page. See [results](#results). |
| previous | object | No       | A link to the previous page. See [link](#link).                                                                         |
| next     | object | No       | A link to the previous page. See [link](#link).                                                                         |
| classes  | string | No       | Any additional classes that you want to add to the pagination.                                                          |

### items

| Name     | Type    | Required | Description                                              |
| -------- | ------- | -------- | -------------------------------------------------------- |
| type     | string  | No       | Set to `dots` to show ellipses instead of a page number. |
| text     | string  | No       | The link text - usually a page number.                   |
| href     | string  | No       | The link URL.                                            |
| selected | boolean | No       | Set to `true` to indicate the currently selected page.   |

### results

| Name  | Type   | Required | Description                                          |
| ----- | ------ | -------- | ---------------------------------------------------- |
| count | number | Yes      | The total number of items.                           |
| from  | number | Yes      | The number of the first item on the page.            |
| to    | number | Yes      | The number of the last item on the page.             |
| text  | string | No       | A label describing the items. Defaults to "results". |

### link

| Name | Type   | Required | Description                            |
| ---- | ------ | -------- | -------------------------------------- |
| text | string | No       | The link text - usually a page number. |
| href | string | No       | The link URL.                          |
