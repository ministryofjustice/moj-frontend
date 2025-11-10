# Component API definition and use

We have chosen as Nunjucks as the templating language for MOJ Frontend components. We expose those templates as reusable chunks of code: macros. Developers import macros into their application, call them as per documentation and provide data to its options.

To provide a level of consistency for developers we have standardised option names, their expected input, use and placement. There are exceptions, and if so they are documented accordingly.

## Specifying content

When providing _content_ to a macro, say for a label or a button, we accept two options:

- `text` accepts a plain string and is the default way of passing content
- `html` accepts html markup. In the template we will not escape html so it will be rendered. In a scenario where both text and html are set, html option will take precedence over text.

Example:

```njk
{{ mojAlert({ text: "Alert text" }) }}
```

```njk
{{ mojAlert({ html: "Alert <span class='bold'>text</span>" }) }}
```

Example of implementing logic in a component template:

```njk
{{ params.html | safe if params.html else params.text }}
```

Example shows that if `html` and `text` options are present, then `html` takes precedence over `text` and we are not escaping it.

## Naming options

We should use **camelCase** for naming options.

If a component depends on another component, we group the options for the dependent component inside an object, where the name of the object is the name of the component using **camelCase** convention. In case of ambiguity we prefix the component name.

Example of a component depending on two other components

```njk
{{ mojDatepicker({
  label: {
    text: "Label text"
  },
  errorMessage: {
    text: "Error message"
  }
}) }}
```

## Mimic HTML attribute names

When there is a need to specify html attributes, such as _checked, disabled, id, name_, etc, and they map directly, we use the same option name. We use boolean value to check and render the attribute.

Example:

```njk
{{ govukButton({ disabled: true }) }}
```

```njk
{{ govukCheckbox({ checked: true }) }}
```

## Defining additional HTML attributes

When there is a need to add additional attributes to the component, we accept an **_"attributes"_** object with key : value pairs for each attribute.

You cannot use this to set attributes that are already defined, such as class – use the classes option instead.

Example:

```njk
{{ govukButton({
  attributes: {
    "data-target": "contact-by-text",
    "aria-labelledby": "error-summary-heading-example-1",
    "tabindex": "-1"
  }
}) }}
```

## Specifying multiple items

When a component accepts a _single array of items_ for an output, such as checkboxes or radios, we accept an **_"items"_** array of objects. Table component is an exception is it can contain multiple array for rows, head, footer where there is need to for more specific names.

Example:

```njk
{{ govukCheckbox({
   items: [
   {
      value: "checkbox value",
      text: "Checkbox text"
    },
    {
      value: "checkbox value 2",
      text: "Checkbox text 2"
    }
  ]
}) }}
```

