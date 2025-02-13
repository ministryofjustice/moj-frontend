| Name                | Type    | Required | Description                                                                         |
| ------------------- | ------- | -------- | ----------------------------------------------------------------------------------- |
| text                | string  | Yes      | The text that displays in the alert. Any string can be used. If you set `html`, this option is not required and is ignored. |
| html                | string  | Yes      | The HTML to use in the alert. Any string can be used with this. If you set `html`, `text` is not required and is ignored.|
| title               | string  | Yes      | A short title for Each alert, used as a unique accessible label. Can be displayed as a heading in the alert using showTitleAsHeading. |
| showTitleAsHeading  | boolean | No       | Set to true to display the `title` as a heading. The default is `false`. |
| titleTag            | string  | No       | The HTML tag used for the heading if `showTitleAsHeading` is true. You can only use the values "h2", "h3", or "h4". The default is "h2".|
| variant             | string  | No       | The alert variant being used; "information", "success", "warning", or "error". The default is "information".                                                    |
| role                | string  | No       | Overrides the value of the role attribute for the alert. Defaults to "region". |
| disableAutoFocus    | boolean | No       | If `role` is set to "alert", JavaScript moves the keyboard focus to the alert when the page loads. To disable this behaviour, set `disableAutoFocus` to `true`.|
| dismissible         | boolean | No       | Set to `true` to allow the alert to be dismissed. The default is `false`. |
| dismissText         | string  | No       | The text label for the dismiss button. The default is "Dismiss". |
| classes             | string  | No       | The classes that you want to add to the alert. |
| attributes          | object  | No       | The HTML attributes that you want to add to the alert, for example, data attributes. |
