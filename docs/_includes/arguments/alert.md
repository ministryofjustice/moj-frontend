| Name                | Type    | Required | Description                                                                         |
| ------------------- | ------- | -------- | ----------------------------------------------------------------------------------- |
| text                | string  | Yes      | The text that displays in the notification banner. You can use any string with this option. If you set `html`, this option is not required and is ignored. |
| html                | string  | Yes      | The HTML to use within the notification banner. You can use any string with this option. If you set `html`, `text` is not required and is ignored.|
| title               | string  | Yes      | A short title for the alert, used for providing a unique accessible label for the alert. Can also optionally be displayed as a heading within the alert.                                                      |
| showTitleAsHeading  | boolean | No       | Set to true to display the `title` as a visible heading. The default is `false`. |
| titleTag            | string  | No       | The HTML tag used for the heading if `showTitleAsHeading` is true. You can only use the values "h2", "h3", or "h4". The default is "h2".|
| variant             | string  | No       | The desired variant of alert. Should be "information", "success", "warning", or "error". The default is "information".                                                    |
| role                | string  | No       | Overrides the value of the role attribute for the notification banner. Defaults to "region" |
| disableAutoFocus    | boolean | No       | If you set `role` to "alert", JavaScript moves the keyboard focus to the alert when the page loads. To disable this behaviour, set `disableAutoFocus` to `true`.|
| dismissible         | boolean | No       | Set to `true` to allow the alert to be dismissed. The default is `false`. |
| dismissText         | string  | No       | The text label for the dismiss button. The default is "Dismiss". |
| classes             | string  | No       | The classes that you want to add to the notification banner. |
| attributes          | object  | No       | The HTML attributes that you want to add to the notification banner, for example, data attributes. |
