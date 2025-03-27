# Rich text editor (Archived)

- [Guidance](https://design-patterns.service.justice.gov.uk/archive/rich-text-editor)

## Example

```mjs
import { RichTextEditor } from '@ministryofjustice/frontend'

const $richTextEditor = document.querySelector(
  '[data-module="moj-rich-text-editor"]'
)

new RichTextEditor($richTextEditor, {
  toolbar: {
    bold: true,
    italic: true,
    underline: true,
    bullets: true,
    numbers: true
  }
})
```
