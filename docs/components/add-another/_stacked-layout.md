---
title: Stacked layout
order: 14
tags: 'add-another'
permalink: false
eleventyComputed:
  override:eleventyNavigation: false
---
## Stacked layout

The stacked (or vertical) layout is the default for this component. It helps users to enter more information than the other layout (inline), for example in up to 4 fields. 

^ The 'Add another' component has 2 layouts -- view [guidance on choosing a layout](/components/add-another/#choosing-a-layout-tab).

{% example template="examples/default", colocated="true", height=540 %}

### Content 

#### Item name

Give each component a short and succinct item name. For example 'person', 'offence', 'income', 'application' or 'session'. The item name will be used in the following visible parts of the component:

- item label (in sentence case) 
- button label (in lower case) 
- error messages (in lower case)

The item names are numbered 1, 2, 3 and so on.  

#### Form field labels

Hidden text is added to the end of the component labels. This is to help screen reader users know which item they are editing or removing. In the example, it adds the content in brackets to these field labels:

- full name (for participant 1)
- date of birth (for participant 1)

This hidden text is automatically added by JavaScript. If you add the text to the HTML template, the component will be accessible without JavaScript (progressive enhancement). 

### What to add to it

Add no more than 4 fields to the stacked layout (this does not include the ‘remove’ button). This keeps it is easy to use. The layout follows the [GOV.UK grid system](https://design-system.service.gov.uk/styles/layout/#using-the-grid-system), which limits the component to 4 fields.

You can view [GOV.UK Design System guidance on sizing text inputs](https://design-system.service.gov.uk/components/text-input/#use-appropriately-sized-text-inputs).

### The ‘Remove’ button

The 'Remove' button is a [GOV.UK warning button](https://design-system.service.gov.uk/components/button/#warning-buttons). This distinguishes it from the ‘Add another' button, which it is sometimes next to. Do not change the button colour. 

Do not change the button position, as this may make it harder for zoom users to use the component.

### Error messages

Hidden text is added to the item name to help users find the error.

<table class="govuk-table">
  <thead class="govuk-table__head">
    <tr class="govuk-table__row">
      <th scope="col" class="govuk-table__header">Error state</th>
      <th scope="col" class="govuk-table__header">Error message</th>
    </tr>
  </thead>
  <tbody class="govuk-table__body">
    <tr class="govuk-table__row">
      <th scope="row" class="govuk-table__header">No value is added to a field</th>
      <td class="govuk-table__cell">Enter a name for participant 1</td>
    </tr>
    <tr class="govuk-table__row">
      <th scope="row" class="govuk-table__header">No values are added to an item</th>
      <td class="govuk-table__cell">Enter details for participant 1</td>
    </tr>
  </tbody>
</table>

Follow the [GOV.UK Design System guidance on error messages](https://design-system.service.gov.uk/components/error-message/).

#### Showing multiple errors  

{% example template="examples/stacked-errors", colocated="true", height=590 %}

Show errors for 1 item at a time using the [GOV.UK error summary](https://design-system.service.gov.uk/components/error-summary/).

Once the user has resolved errors in the first item, display the errors for the next item until they're all resolved. This ensures that users can identify errors when an item is added or removed. 

### JavaScript

This component relies on JavaScript. To make it work without JavaScript, you need to make sure that when the 'Add another' and 'Remove' buttons are selected, the form submits and the page reloads with the changes.  

### Designing the page and onward journey

#### Heading

Add a heading that describes the task, for example 'Add a participant'. This is not part of the component.

#### Using multiple components on a page

Do not add the stacked layout:

- to a page more than once
- to a page with the inline layout already on it 
- inside another 'Add another' component to create a subsection -- screenreaders may not announce it, and it may make the page harder to use for everyone

#### Other parts of the page

When users interact with this component, pages will get longer and more complex. Keep the rest of the page lean. This will also help users to identify -- and recover from -- errors.

#### Screens after the component  

This component creates another item on the page. All the data remains on the page until the user submits it, for example with a ‘Save and continue’ button.   

Users can edit their items after submitting them using the [GOV.UK ‘check answers’ pattern](https://design-system.service.gov.uk/patterns/check-answers/).

### Example of the stacked layout with radio buttons

<p><img src="{{ 'assets/images/add-another-stacked.png' | rev | url }}" alt="A screen showing an MOJ header and footer. The page contains a caption with some personal identifiers, including date of birth. The H1 is 'Tom Walker' and the H2 is 'Add a course'. Then there's the heading 'Course 1' and 2 field labels. They are 'Enter the course name' and 'Enter the course provider'. Underneath the fields is a question 'How long does the course last?' with 4 radio options. There's a horizontal line and then a grey button with the content 'Add another course'."></p>

