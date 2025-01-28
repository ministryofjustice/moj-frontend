| Name            | Type   | Required | Description                                                                         |
| --------------- | ------ | -------- | ----------------------------------------------------------------------------------- |
| heading         | string | Yes      | The heading for the component.                                                      |
| primaryAction   | object | Yes      | The properties for the primary action. See [Primary action](#primary-action).       |
| secondaryAction | object | No       | The properties for the secondary action. See [Secondary action](#secondary-action). |

### Primary action

| Name  | Type   | Required | Description                                                                                                      |
| ----- | ------ | -------- | ---------------------------------------------------------------------------------------------------------------- |
| text  | string | Yes      | The label for the action.                                                                                        |
| href  | string | Yes      | The URL that the action should link to.                                                                          |
| style | string | No       | Provide `"link"` to have the action styled as a text link. Any other value will result in a visual button style. |

You can also pass any other arguments accepted by the [button component from the GOV.UK Design System](https://design-system.service.gov.uk/components/button/).

### Secondary action

| Name  | Type   | Required | Description                                                                                               |
| ----- | ------ | -------- | --------------------------------------------------------------------------------------------------------- |
| text  | string | Yes      | The label for the action.                                                                                 |
| href  | string | Yes      | The URL that the action should link to.                                                                   |
| style | string | No       | Provide "button" to have the action styled as a button. Any other value will result in a text link style. |

You can also pass any other arguments accepted by the [button component from the GOV.UK Design System](https://design-system.service.gov.uk/components/button/).
