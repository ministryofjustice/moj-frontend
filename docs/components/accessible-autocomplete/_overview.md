---
title: Overview
order: 10
tags: 'accessible-autocomplete'
permalink: false
eleventyComputed:
  override:eleventyNavigation: false
---

<div class="img-container">
  <img src="/assets/images/submission-1762947168818/137123399-80bfcbd5-a090-4005-b24d-7b71931ec904.png" alt="accessible autocomplete" />
</div>

## Overview
The user types a search term, and the results are returned with the search term(s) highlighted.

### How the component is currently used

Hovering over an item highlights the row. The user can then select a proceeding type using the radio buttons, and click the 'Save and continue' button. This component is used in conjunction with the add another pattern. The user is taken to the next page which asks them if they would like to add another proceeding. If they select 'Yes' they are taken back to the search page to add a further proceeding type.

Search results return once a user has entered more than 2 characters, and update automatically following further typing or removal of characters.

There is a visually hidden element which informs users that results will return automatically. There is also an aria-live region which is updated when the search results are returned with a message notifying the user that results have returned, along with the number of results. The results section behaves the same as a normal radio button group. Tabbing takes you into the group, and the up/down arrows are used to navigate between results and select an item. Tabbing again then takes you out of the group and moves focus to the 'Save and continue' button.

### Contribute to this component
You can help develop this component by adding information to the [‘accessible autocomplete’ Github discussion]({{ githuburl }}). This helps other people to use it in their service.

