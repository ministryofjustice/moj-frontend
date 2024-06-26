## params

id
classes (these are for the container)
name
value
minDate
maxDate

label {
    html
    text
    classes
    attributes
}
hint {
    classes
    attributes
    html
    text
}
errorMessage {
    html
    text
    classes
    attributes
    visuallyHiddenText
}


## Questions / Issues

### Input width
Possibly need a param to set the width (govuk-width-class) of the text input?
The css has classes for a --fixed class.
This is tricky in terms of API vs what exists. For consistency we could have an
`input` param, but currently all the attrs for the input are not namespaced (id,
value, name), but the non-prefixed `classes` param gets assigned to the container
not the input.
A 'breaking' change would be to use the `classes` param on the input, allowing
users to assign any of the govuk input width modifier classes. And then have a
`containerClasses` param for the container element.
A non-breaking solution would be to have a new param.  e.g. `width` but this is
confusing if we expect a css class string. Could have `widthClass` or
`inputWidthClass`... none of these feel ideal though.

### Header abbreviations
Currently the calendar headers contain abbreviated days (e.g. Mo, Tu) and have
an `abbr` attribute set with the full text.  Technically this should be the
other way round, the `abbr` attribute should be for the short version. Need to
check screen reader handling here.  Alternative would be an `aria-label` with
the full name.

### Translations
Do we have a standardised way of doing this yet?
We need welsh days of the week and months - these are static and shouldn;t need
to be provided by the user, so I guess we should pick them up from the `lang`
attribute.

### Width
Current component is 300px wide (280px + padding)
this matches old iPhone small screens
Figma component is 354px which is probably a more modern 
smallest screen size...
Days in Figma are 44px wide - presume WCAG improvemnt? (nope 24*24 is minumum)

### Label
Label takes the param 'isPageHeading' 
