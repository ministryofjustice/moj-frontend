---
title: Overview
order: 10
tags: 'confirm-an-action'
permalink: false
eleventyComputed:
  override:eleventyNavigation: false
---
<div class="img-container">
  <img src="/assets/images/submission-1783074553746/Carry-out-an-action-(with-optional-confirmation).png" alt="confirm an action" />
</div>

## Overview

Use this pattern to help users confirm and confirm an action. Not all actions need a confirmation screen.  

A confirmation screen is needed when the:
- action cannot be undone (or not undone easily)
- consequences of the action need to be called out to the user 
- user may need to provide further information about the action

The same action may need a confirmation in one service but not in another. This depends on the user needs of the service.

### How to use 

Use a static heading, becayse dynamic headings can have an unpredictable length. 

Show the important details to the user when asking them to confirm the action. This is to reassure them that they have the correct thing.  

Use a [GOV.UK summary list](https://design-system.service.gov.uk/components/summary-list/) or [GOV.UK summary card](https://design-system.service.gov.uk/components/summary-list/#:~:text=Nunjucks-,Summary%20cards,-If%20you%E2%80%99re%20showing) to display the relevant details.

The calls to action can be:
- the primary action
- a way back
- the [GOV.UK warning button](https://design-system.service.gov.uk/components/button/#:~:text=buttons%20together.-,Warning%20buttons,-Warning%20buttons%20are) (if appropriate)

The notification gives the user feedback about what effect the action has had. If the action does not need a confirmation screen, this notification is shown immediately after the action. 

### Research on this pattern

There are no known issues. This pattern is in use in several live LAA services.

### How the component is being used

This pattern is being used to apply the following actions to an application, case or claim:
- assign  
- remove  
- reassign  
- delete  

There are the following pattern variations: 

- no confirmation 
- a confirmation screen with details in a [GOV.UK summary list](https://design-system.service.gov.uk/components/summary-list/)
- a confirmation screen with details in a [GOV.UK summary list](https://design-system.service.gov.uk/components/summary-list/) and [GOV.UK textarea](https://design-system.service.gov.uk/components/textarea/) for users to provide further explanation
- a confirmation screen with details in a [GOV.UK summary list](https://design-system.service.gov.uk/components/summary-list/), [GOV.UK radios](https://design-system.service.gov.uk/components/radios/) and a [GOV.UK textarea](https://design-system.service.gov.uk/components/textarea/) conditionally revealed for users to explain more

You may need to create further variations depending on user needs. For example, in the 'Non-standard crime claims (NSCC)' service in LAA there's a variation of a confirmation screen with details in summary list, checkboxes for user to select multiple options, and a textarea for users to provide further explanation.

### Contribute to this component
You can help develop this component by adding information to the [‘confirm an action’ Github discussion]({{ githuburl }}). This helps other people to use it in their service.
