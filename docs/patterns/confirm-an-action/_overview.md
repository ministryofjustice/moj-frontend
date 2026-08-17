---
title: Overview
order: 10
tags: 'confirm-an-action'
permalink: false
eleventyComputed:
  override:eleventyNavigation: false
---

<div class="img-container">
  <img src="/assets/images/submission-1783074553746/confirm-action-screen.png" alt="Screenshot of a Legal Aid Agency confirmation page asking the user to confirm an action. The page displays key application details, including assignee, client name, application type, submission date, reference number and status, before the user submits the action" />
</div>

## Overview

Use this pattern to help users confirm an action. It consists of:

- a 'confirm action' screen
- a 'success' screen

You can [view all the 'confirm an action' pattern variations](/patterns/confirm-an-action/#designs-tab).

Not all actions need a 'confirm an action' pattern. Use this pattern when:

- the action cannot be undone (or not undone easily)
- the consequences of the action need to be called out to the user 
- users may need to provide further information about the action

The same action may need a confirmation in one service but not in another. This depends on the user needs of the service.

### How the pattern is being used

This pattern is being used for the following actions (for an application, case or claim):
- assign  
- remove  
- reassign  
- delete  

### How to use

There are 4 pattern variations: 

- 'Success' screen only   
- 'Confirm action' screen with details in a [GOV.UK summary list](https://design-system.service.gov.uk/components/summary-list/)
- 'Confirm action' screen with details in a [GOV.UK summary list](https://design-system.service.gov.uk/components/summary-list/) and [GOV.UK textarea](https://design-system.service.gov.uk/components/) for users to explain more
- 'Confirm action' screen with details in a [GOV.UK summary list](https://design-system.service.gov.uk/components/summary-list/), [GOV.UK radios](https://design-system.service.gov.uk/components/radios/) and a [GOV.UK textarea](https://design-system.service.gov.uk/components/textarea/) conditionally revealed for users to explain more

View the ['confirm an action' pattern variations](/patterns/confirm-an-action/#designs-tab).

You may need to create further variations depending on user needs. For example, in the 'Non-standard crime claims (NSCC)' service in LAA there's a variation of a confirmation screen with details in a summary list, checkboxes for the user to select multiple options, and a textarea for users to provide further explanation.

#### Designing the pattern

Use a static heading, because dynamic headings can have an unpredictable length. 

Show the important details to the user when asking them to confirm the action. This is to reassure them that they have the correct thing.  

Use a [GOV.UK summary list](https://design-system.service.gov.uk/components/summary-list/) or [GOV.UK summary card](https://design-system.service.gov.uk/components/summary-list/#:~:text=Nunjucks-,Summary%20cards,-If%20you%E2%80%99re%20showing) to display the relevant details.

The calls to action can be:
- the primary action
- a way back
- the [GOV.UK warning button](https://design-system.service.gov.uk/components/button/#:~:text=buttons%20together.-,Warning%20buttons,-Warning%20buttons%20are)  

The notification banner tells the user what effect the action has had. If the action does not need a confirmation screen, this notification is shown immediately after the action. 

### Research on this pattern

There are no known issues. This pattern is being used in several live LAA services.

### Contribute to this pattern

You can help develop this pattern by adding information to the [‘confirm an action’ Github discussion]({{ githuburl }}). This helps other people to use it in their service.
