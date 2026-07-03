---
title: Overview
order: 10
tags: 'carry-out-an-action'
permalink: false
eleventyComputed:
  override:eleventyNavigation: false
---
<div class="img-container">
  <img src="/assets/images/submission-1783074553746/Carry-out-an-action-(with-optional-confirmation).png" alt="carry out an action" />
</div>

## Overview
/How it works
Carry out an action (with optional confirmation).

Use this pattern to help users carry out and confirm an action.

Some actions can be carried out without the need for a confirmation screen. Other actions require a confirmation.

When a confirmation screen would be required:
- when it is an action that the user either can not undo or can not undo easily
- when consequences of the action need to be called out to the user 
- when the user may need to provide further information about the action

The same action may need a confirmation in one service but not in another, this will depend on the user needs of the service.

/Design thinking

//Heading
- use static heading
- dynamic headings make length unpredictable

//Describe the thing
- reassure user that they have the correct thing
- include the details crucial to the user when confirming the action

Use a summary list or summary card to display the relevant details.

//Calls to action
- the primary action
- a way back
- check GOV design system button guidelines for when the button might use the red warning style

//Notification banner
- the notification gives the user feedback about what effect the action has had
- if the action does not need a confirmation screen notification is shown immediately after action

/Research on this pattern
No known issues - this pattern is currently in use in several live LAA services.

### How the component is currently used

//When to use this pattern
Examples of possible actions:
- assign an application / case / claim to my list 
- remove an application / case / claim from my list
- reassign an application / case / claim to my list
- delete an application / case / claim

//Variations
- No confirmation, user is presented with notification banner of the outcome of the action
- Confirmation screen with details in summary list
- Confirmation screen with details in summary list and textarea for users to provide further explanation
- Confirmation screen with details in summary list, radio buttons for users to select from, and a textarea conditionally revealed for users to provide further explanation

You may need to create further variations depending on your user needs. For example, in the Non-standard crime claims (NSCC) service in LAA there is a variation of a confirmation screen with details in summary list, checkboxes for user to select multiple options, and a textarea for users to provide further explanation.

### Contribute to this component
You can help develop this component by adding information to the [‘carry out an action’ Github discussion]({{ githuburl }}). This helps other people to use it in their service.