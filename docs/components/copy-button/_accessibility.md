---
title: Accessibility
order: 30
tags: 'copy-button'
permalink: false
eleventyComputed:
  override:eleventyNavigation: false
---
Accessibility findings have been added for this component. There may be more findings in the [‘copy button’ Github discussion]({{ githuburl }}).


### Internal review

* By: LAA Apply and review team
* Date: 29 July 2025

#### Review findings

During exploration using Figma plugins to do the accessibility checks only this component had passed the Accessibility: WCAG contrast guidelines on the coloured background. One of the concerns raised was by external team member that The button’s position on the far right might be missed by users who are zoomed in, so we may want to bring it closer to the content. However the copy button is in a summary card with a line outlining the row, this line is often enough prompt for users who are zoomed in. This positioning is how things are done with change links on check your answer pages and on summary list and cards in the GOV design system. Based on this the component passes the WCAG guidelines.


## Contribute accessibility findings

If you have accessibility findings that are relevant to this component you can add them to the [Github discussion]({{ githuburl }}). This helps other people to use it in their service.