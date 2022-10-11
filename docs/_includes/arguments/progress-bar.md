### Container

|Name|Type|Required|Description|
|---|---|---|---|
|attributes|object|No|HTML attributes (for example data attributes) to add to the progress bars's container.|
|items|object|Yes|Items to add to the progress bar.|

### Items

|Name|Type|Required|Description|
|---|---|---|---|
|id|string|No|Gives each step a unique id for rendering purposes. If not set then one will be created for you.|
|active|boolean|No|Sets the item as the currently active step. Only one item in the list should have this set to true.|
|complete|boolean|No|Sets the item to the completed state so the user is aware of progress in that section.|
|label->text|string|Yes|If `html` is set, this is not required. Text to use within the item. If `html` is provided, the `text` argument will be ignored.|
|label->html|string|Yes|If `text` is set, this is not required. HTML to use within the item. If `html` is provided, the `text` argument will be ignored.|
|classes|string|No|Classes to add to the ticket panel's container.|                                    |

_Warning: If you’re using Nunjucks macros in production be aware that using HTML arguments, or ones ending with `.html` can be at risk from [cross-site scripting](https://en.wikipedia.org/wiki/Cross-site_scripting) attacks. More information about security vulnerabilities can be found in the [Nunjucks documentation](https://mozilla.github.io/nunjucks/api.html#user-defined-templates-warning)._
