# Date picker

- [Guidance](https://design-patterns.service.justice.gov.uk/components/date-picker)

## Example

```njk
{{ mojDatePicker({
  id: "appointment-date",
  name: "appointment-date"
  label: "Appointment date"
  hint: For example, 17/5/2024.
}) }}
```

## Arguments

This component accepts the following arguments.

| Name         | Type   | Required | Description                                                                                                                                                                                                                                                                                                            |
| ------------ | ------ | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| id           | string | Yes      | The ID of the input.                                                                                                                                                                                                                                                                                                   |
| name         | string | Yes      | The name of the input, which is submitted with the form data.                                                                                                                                                                                                                                                          |
| value        | string | No       | Optional initial value of the input.                                                                                                                                                                                                                                                                                   |
| formGroup    | object | No       | Additional options for the form group containing the text input component. See [formGroup](#options-date-picker-form-group).                                                                                                                                                                                           |
| label        | object | Yes      | The label used by the text input component. See [GOV.UK text input documentation](https://design-system.service.gov.uk/components/text-input/) for label options.                                                                                                                                                      |
| hint         | object | No       | Can be used to add a hint to a text input component. See [GOV.UK text input documentation](https://design-system.service.gov.uk/components/text-input/) for hint options.                                                                                                                                              |
| errorMessage | object | No       | Can be used to add an error message to the text input component. The error message component will not display if you use a falsy value for `errorMessage`, for example `false` or `null`. See [GOV.UK text input documentation](https://design-system.service.gov.uk/components/text-input/) for errorMessage options. |
| minDate      | string | No       | Earliest date that can be selected (format dd/mm/yyyy)                                                                                                                                                                                                                                                                 |
| maxDate      | string | No       | Latest date that can be selected (format dd/mm/yyyy)                                                                                                                                                                                                                                                                   |
| exludedDates | string | No       | String of pace separated dates that cannot be selected                                                                                                                                                                                                                                                                 |
| excludedDays | string | No       | String of space separated days of the week that cannot be selected                                                                                                                                                                                                                                                     |
| weekStartDay | string | No       | Day of the week the calendar starts on. Either 'monday' or 'sunday'. Defaults to 'monday'                                                                                                                                                                                                                              |
