| Name       | Type            | Required | Description                                                                                                             |
| ---------- | --------------- | -------- | ----------------------------------------------------------------------------------------------------------------------- |
| label      | string          | Yes      | The text used as the `aria-label` for the pane.                                                                           |
| labelledBy | string          | Yes      | An id reference to be used in the `aria-labelledby` attribute. If you set `label`, this option is not required and is ignored. |
| classes    | string          | No       | Extra classes to add to the `div` container.                                                                              |
| attributes | object          | No       | HTML attributes (for example data attributes) to add to the `div` container.                                               |
| html       | string          | Yes      | HTML content for the pane. If a Nunjucks call block is provided, it takes precedence over this option.                     |
| caller     | nunjucks-block  | No       | Not strictly a parameter but Nunjucks code convention. Using a call block enables you to call a macro with all the text inside the tag. This is helpful if you want to pass a lot of content into a macro. To use it, you will need to wrap the entire panel component in a call block. |

