---
title: Inline layout
order: 16
tags: 'add-another'
permalink: false
eleventyComputed:
  override:eleventyNavigation: false
---
## Inline layout

The inline (or horizontal) layout is a lean design for up to 3 fields. 

^ The 'Add another' component has 2 layouts -- view [guidance on choosing a layout](/components/add-another/#choosing-a-layout-tab).

{% example template="examples/inline-accounts", colocated="true", height=540 %}

### Content

#### Item name

Give each component a short and succinct item name. For example 'person', 'offence', 'income', 'application' or 'session'. 

The item name will be used in lower case in the following visible parts of the component:

- 'Add another' button text  
- 'Remove' button text  
- error messages  

The item names are numbered 1, 2, 3 and so on.

#### Form field labels

Hidden text is added to the end of the component labels. This is to help screen reader users know which item they are editing or removing. In the example, it adds the content in brackets to these field labels:

- bank name (for account 1)
- funds (for account 1)
- remove (account 1), for the 'Remove' button

This hidden text is automatically added by JavaScript. If you add the text to the HTML template, the component will be accessible without JavaScript (progressive enhancement). 

### What to add to it

Add no more than 3 fields to the inline layout (this does not include the ‘remove’ button). This keeps it is easy to use. The layout follows the [GOV.UK grid system](https://design-system.service.gov.uk/styles/layout/#using-the-grid-system), which limits the component to 4 fields.

You can add only 2 types of components to it. These are the:

- [GOV.UK text input](https://design-system.service.gov.uk/components/text-input/)
- [GOV.UK select component](https://design-system.service.gov.uk/components/select/)

Do not add [GOV.UK radios](https://design-system.service.gov.uk/components/radios/) to it.

All the items and field labels need to fit on 1 line. You can view [GOV.UK Design System guidance on sizing text inputs](https://design-system.service.gov.uk/components/text-input/#use-appropriately-sized-text-inputs).

### The ‘Remove’ button

The 'Remove' button is a [GOV.UK warning button](https://design-system.service.gov.uk/components/button/#warning-buttons). This distinguishes it from the ‘Add another' button, which it is sometimes next to. Do not change the button colour. 

Do not change the button position, as this may make it harder for zoom users to use the component.

### Error messages

{% example template="examples/inline-errors", colocated="true", height=540 %}

Errors can find their errors with:

- a red error border on the whole item  
- hidden text that's added to the item name  

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
      <td class="govuk-table__cell">Enter a sentence type for offence 1</td>
    </tr>
    <tr class="govuk-table__row">
      <th scope="row" class="govuk-table__header">No values are added to an item</th>
      <td class="govuk-table__cell">Enter details for offence 1</td>
    </tr>
  </tbody>
</table>

Follow the [GOV.UK Design System guidance on error messages](https://design-system.service.gov.uk/components/error-message/).

#### Showing multiple errors

Show errors for 1 item at a time using the [GOV.UK error summary](https://design-system.service.gov.uk/components/error-summary/). 

Once the user has resolved errors in the first item, display the errors for the next item until they're all resolved. This ensures that users can identify errors when an item is added or removed. 

### JavaScript

This component relies on JavaScript. To make it work without JavaScript, you need to make sure that when the 'Add another' and 'Remove' buttons are selected, the form submits and the page reloads with the changes.  

### Designing the page and onward journey

#### Heading

Add a heading that describes the task, for example 'Add a participant'. This is not part of the component.

#### Placing multiple ‘add another‘ components on a page

You can place the inline layout on a page more than once, but be aware of how this will affect the page length and complexity. Users may lose their position on the page, enter data in the wrong place, or delete the wrong item.

Do not put the inline layout:

- on the same page as the stacked layout
- inside another ‘Add another’ component to create a subsection -- screen readers may not announce this, and it may make the page harder to use for everyone

#### Other parts of the page

When users interact with this component, pages will get longer and more complex. Therefore it’s best to keep the rest of the page fairly simple. A leaner page will also make it easier for users to identify – and recover from – errors.

#### Screens after the component

The 'Add another' component creates another item on the page. The data remains on the page until the user submits it, for example with a ‘Save and continue’ button.

Users can edit their items after submitting them, using the [GOV.UK ‘check answers’ pattern](https://design-system.service.gov.uk/patterns/check-answers/).

### Example of using the inline variant more than once on a page

<p><img src="{{ 'assets/images/add-another-example-inline.png' | rev | url }}" alt="A screen showing an MOJ header and footer. The page contains a heading, 2 questions with radio buttons. Underneath the 2 questions are 2 add another components in the inline layout. The first component has the heading 'Add gifts information' with the field labels 'Gift description' and 'value'. There is a red 'remove button' to the right. The second component has the heading 'Add loans information' with the field labels 'Loan description' and 'value'. There is a red 'remove button' to the right". A green submit button is at the bottom of the screen.></p>
