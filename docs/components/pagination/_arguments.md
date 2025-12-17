| Name          | Type   | Required | Description                                                                                                             |
| ------------- | ------ | -------- | ----------------------------------------------------------------------------------------------------------------------- |
| items         | array  | Yes      | An array of pages to display. See [items](#items).                                                                      |
| previous      | object | No       | A link to the previous page. See [link](#link).                                                                         |
| next          | object | No       | A link to the next page. See [link](#link).                                                                         |
| results       | object | No       | Optional object describing the total number of results and which ones are on the current page. See [results](#results). |
| landmarkLabel | string | No       | The label for the navigation landmark that wraps the pagination. Defaults to "Pagination".                              |
| classes       | string | No       | Any additional classes that you want to add to the pagination.                                                          |

### items

| Name     | Type    | Required | Description                                              |
| -------- | ------- | -------- | -------------------------------------------------------- |
| text     | string  | No       | The link text - usually a page number.                   |
| href     | string  | No       | The link URL.                                            |
| selected | boolean | No       | Set to `true` to indicate the currently selected page.   |
|visuallyHiddenText  | string | No | The visually hidden label for the pagination item, which will be applied to an aria-label and announced by screen readers on the pagination item link. Should include page number. Defaults to, for example “Page 1”. |
| type     | string  | No       | Set to `dots` to show ellipses instead of a page number. |
| attributes    | object  | No       | The HTML attributes (for example, data attributes) you want to add to the anchor. |

### results

| Name  | Type   | Required | Description                                                             |
| ----- | ------ | -------- | ----------------------------------------------------------------------- |
| count | number | Yes      | The total number of items.                                              |
| from  | number | Yes      | The number of the first item on the page.                               |
| to    | number | Yes      | The number of the last item on the page.                                |
| text  | string | No       | A label describing the items. Defaults to "results".                    |
| pages | object | No       | If present, the results will show page information. See [pages](#pages).|

### pages

| Name    | Type   | Required | Description                                          |
| ------- | ------ | -------- | ---------------------------------------------------- |
| count   | number | Yes      | The total number of pages.                           |
| current | number | Yes      | The current page number.                             |

### link

| Name | Type   | Required | Description                            |
| ---- | ------ | -------- | -------------------------------------- |
| text | string | No       | The link text - usually a page number. |
| href | string | No       | The link URL.                          |
