| Name         | Type   | Required | Description                                                                                                                      |
| ------------ | ------ | -------- | -------------------------------------------------------------------------------------------------------------------------------- |
| heading       | string | Yes      | The heading for the component                |
| primaryAction | object | Yes      | The properties for the primary action. See [Primary action](#primary-action)                |
| secondaryAction | object | No      | The properties for the secondary action. See [Secondary action](#secondary-action)                |

### Primary action

| Name         | Type   | Required | Description                                                                                                                      |
| ------------ | ------ | -------- | -------------------------------------------------------------------------------------------------------------------------------- |
| text         | string | yes      |  The label for the action |
| href         | string | yes      |  The URL that the action should link to. |
| style        | string | no       |  Provide `"link"` to have the action be styled as a text link, any other value will result in a visual button style.  |

You can also pass any other arguments accepted by the [button component](https://design-system.service.gov.uk/components/button/) in the GOV.UK Design System.

### Secondary action

| Name         | Type   | Required | Description                                                                                                                      |
| ------------ | ------ | -------- | -------------------------------------------------------------------------------------------------------------------------------- |
| text         | string | yes      |  The label for the action |
| href         | string | yes      |  The URL that the action should link to. |
| style        | string | no       |  Provide "button" to have the action be styled as a button, any other value will result in a text link style.  |

You can also pass any other arguments accepted by the [button component](https://design-system.service.gov.uk/components/button/) in the GOV.UK Design System.
