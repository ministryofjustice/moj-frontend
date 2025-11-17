---
title: Overview
order: 10
tags: 'contextual-date'
permalink: false
eleventyComputed:
  override:eleventyNavigation: false
---

<div class="img-container">
  <img src="/assets/images/submission-1762946660930/147359799-4eebf319-25d3-45e3-b080-7ae7909055aa.png" alt="A sortable multi-select table. In the 'due date' column are dates in bold, with a status such as 'overdue' written in smaller plain text underneath and a coloured bar to the left to signify the status." />
</div>

## Overview
Use the contextual date pattern to indicate important information about a date in a table to make it easier to scan, interpret and action where required.

### How the component is currently used

Writing content:
The date can be written as DD/MM/YY or DD Month YYYY, depending on the use case of the system

The label should be short and succinct. Recommend no more than 20 characters.

Never use this component without a label - the label provides the context to the visual highlight for accessibility.

Making sure it’s accessible:
- Recommended typography is standard black text
  - Bold 19px for the date
  - Regular 16px for the context
- The highlight line should have appropriate colour contrast
- When using for to communicate more than one context the highlight line should use colours that are not too close to each other for most differentiation
- Never use this component without a label - the label provides the context to the visual highlight for accessibility.

### Contribute to this component
You can help develop this component by adding information to the [‘contextual date’ Github discussion]({{ githuburl }}). This helps other people to use it in their service.

