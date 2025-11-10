---
title: Accessibility
order: 30
tags: 'timeout-warning'
permalink: false
eleventyComputed:
  override:eleventyNavigation: false
---
Accessibility findings have been added for this component. There may be more findings in the [‘timeout warning’ Github discussion]({{ githuburl }}).


### External audit

* Conducted by: User Vision
* Date: 24 July 2023

#### Audit findings

There's an issue when content is added using the `data-timer-extra-text` attribute after the timer countdown. The content is hidden from screenreaders and not announced. This counts as a WCAG fail.

However if the `aria-hidden attribute` is removed from this content it'll then be announced on every update of the timer, which would not be a good user experience.

To resolve this issue you need to do one of the following:
- adjust the content of the warning modal to not need the additional content
- adapt the code to fix the duplicated announcement

### Assistive Technology testing

Date: 15 April 2023

#### Testing details

The component was tested with keyboard and screenreaders.  No issues were
discovered.

## Contribute accessibility findings

If you have accessibility findings that are relevant to this component you can add them to the [Github discussion]({{ githuburl }}). This helps other people to use it in their service.
