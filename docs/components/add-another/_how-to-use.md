---
title: How to use
order: 20
tags: 'add-another'
permalink: false
eleventyComputed:
  override:eleventyNavigation: false
---

## How to use

### Number of items

[Add some content if we’re enabling teams to add a limit to the total number of items].

Do not move the ‘remove’ buttons in any of the variants. This may make the component less accessible to zoom users.

### Colours

The remove button is xx red on xx background. Keep this colour to encourage consistent use of the component and to keep it accessible.

Do not change the background colour? 

### Other things on the page

Because this component can increase the length and complexity of a page, it’s best not to add too much extra to it. This also makes it easier for users to recover from errors.

### Writing content and hidden text

You need to create unique labels for the following elements:

•	‘remove’ buttons (visible text, this is ‘Remove person 1’ in the example)
•	form fields (hidden text, these are ‘first name’ and ‘last name’ in the example)

This tells screenreader users:
-	which fieldset they’re removing
-	that a fieldset has been added or removed
-	about errors (read more in the error section) 

Add the unique label to each fieldset. Code example:

### Error messages

### Screens after the component  
The data is submitted when the ‘continue’, ‘save and continue’ or ‘save’ button is selected.   
The ‘add another’ component duplicates the text inputs on a page. It does not include a way to edit what they’ve entered. Users can edit what they have entered with the:
-	GOV.UK ‘check answers’ pattern
-	‘add to a list’ pattern
You may want to confirm to users on the next screen that what they have uploaded worked. You could do this with the success alert. 





