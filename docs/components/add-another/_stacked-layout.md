---
title: Stacked layout
order: 14
tags: 'add-another'
permalink: false
eleventyComputed:
  override:eleventyNavigation: false
---
## Setting up the stacked layout

The stacked (or vertical) layout is the default for this component. It helps users to enter more information than the other layout (inline), for example from a more varied range of components.

<div class="govuk-inset-text">
The 'Add another' component has 2 layouts - view <a href="#choosing-a-layout-tab">guidance on choosing a layout</a>.
</div>

{% example template="examples/default", colocated="true", height=540 %}

1. [Create an item name](#create-an-item-name)
2. [Choose what to put in your 'add another' component](#choose-what-to-put-in-your-add-another-component)
3. [Write and size the form field labels](#write-and-size-the-form-field-labels)
4. [Write and implement error messages](#write-and-implement-error-messages)
5. [Set up for use without JavaScript](#set-up-for-use-without-javascript)

You can also view:

- how to [design the page and onward journey](#design-the-page-and-onward-journey)
- an [example of the stacked layout with radio buttons](#example-of-the-stacked-layout-with-radio-buttons)

### Create an item name

Give each component a short and succinct item name. For example 'person', 'offence', 'income', 'application' or 'session'. The item name will be used in the following visible parts of the component:

- item legend (in sentence case) 
- button labels (in lower case) 
- error messages (in lower case)

The item names are numbered 1, 2, 3 and so on.  

### Choose what to put in your 'add another' component

Add a small number of fields to the stacked layout, from the following 6 components. These are called the 'preferred instances' in Figma:

- [GOV.UK checkboxes](https://design-system.service.gov.uk/components//checkboxes)
- [GOV.UK date input](https://design-system.service.gov.uk/components/textarea)
- [GOV.UK radios](https://design-system.service.gov.uk/components/radios)
- [GOV.UK select](https://design-system.service.gov.uk/components/select)
- [GOV.UK textarea](https://design-system.service.gov.uk/components/radios)
- [GOV.UK text input](https://design-system.service.gov.uk/components/text-input)

You can view [GOV.UK guidance on sizing text inputs](https://design-system.service.gov.uk/components/text-input/#use-appropriately-sized-text-inputs).

The component works best in a shallow layout, for example with the heading and 'add another' button on the same screen. This may also help users to check the data they've added to the component before submitting it. 

#### Using Figma slots to add components to it

Each 'add another' component contains a 'slot' where you put the component's contents. Slots are a Figma feature, introduced in Spring 2026 to make components more flexible. 

A component keep its default width after you add it to a slot, rather than filling the available space. This means it might be too narrow or overflow the container. To fix this, you can either:

- set all components to 'Fill' in Figma, so that they share the available width evenly
- manually set the width of each component, following the [GOV.UK grid system](https://design-system.service.gov.uk/styles/layout/#using-the-grid-system) where possible

You can do all of these tasks without detaching it from the instance of the component. 


#### Write and size your form field labels

<div class="govuk-inset-text">
If you're using Figma, you may need to change the legend size of some GOV.UK components for this component. Change them to 'body (paragraph)' to follow <a href="https://design-system.service.gov.uk/get-started/labels-legends-headings/">GOV.UK guidance on label and legend headings</a>.
</div>

Visually hidden text is added to the end of the component labels. This is to help screen reader users know which item they are editing or removing. In the example, it adds the content in brackets to these field labels:

- full name (for participant 1)
- date of birth (for participant 1)

This visually hidden text is automatically added by JavaScript. If you add the text to the HTML template, the component will be accessible without JavaScript (progressive enhancement). 

### Write and implement error messages  

Visually hidden text is added to the item name to help users find the error.

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

Follow the [GOV.UK guidance on error messages](https://design-system.service.gov.uk/components/error-message/).

#### Showing errors  

{% example template="examples/stacked-errors", colocated="true", height=590 %}

In the example, both items contain an error. In the first item, a year is missing from the date of birth field. In the second item, the 'full name' is missing. 

Show errors for 1 item at a time using the [GOV.UK error summary](https://design-system.service.gov.uk/components/error-summary/). 

Once the user has resolved all the errors in the first item, display the errors for the next item. Do this until they're all resolved. This ensures that users can identify errors when an item is added or removed. 

### Set up for use without JavaScript

This component relies on JavaScript. To make it work without JavaScript, you need to make sure that when the 'Add another' and 'Remove' buttons are selected, the form submits and the page reloads with the changes.  

### Designing the page and onward journey

#### Heading

Add a heading that describes the task, for example 'Add a participant'. This is not part of the component.

#### Using multiple components on a page

Do not add the stacked layout:

- to a page more than once
- to a page with the inline layout already on it 
- inside another 'Add another' component to create a subsection -- screenreaders may not announce it, and it may make the page harder to use for everyone

#### The ‘Remove’ button

Do not change the button position, as this may make it harder for zoom users to use the component.

#### Other parts of the page

When users interact with this component, pages will get longer and more complex. Keep the rest of the page lean. This will also help users to identify -- and recover from -- errors.

#### Screens after the component  

This component creates another item on the page. All the data remains on the page until the user submits it, for example with a ‘Save and continue’ button.   

Users can edit their items after submitting them using the [GOV.UK ‘check answers’ pattern](https://design-system.service.gov.uk/patterns/check-answers/).

### Example of the stacked layout with radio buttons

<p><img src="{{ 'assets/images/add-another-stacked.png' | rev | url }}" alt="A screen showing an MOJ header and footer. The page contains a caption with some personal identifiers, including date of birth. The H1 is 'Tom Walker' and the H2 is 'Add a course'. Then there's the heading 'Course 1' and 2 field labels. They are 'Enter the course name' and 'Enter the course provider'. Underneath the fields is a question 'How long does the course last?' with 4 radio options. There's a horizontal line and then a grey button with the content 'Add another course'."></p>
