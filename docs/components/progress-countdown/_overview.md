---
title: Overview
order: 10
tags: 'progress-countdown'
permalink: false
eleventyComputed:
  override:eleventyNavigation: false
---
<div class="img-container">
  <img src="/assets/images/submission-1792499107293/Progress-Countdown-image.png" alt="progress countdown" />
</div>

## Overview
A dynamic countdown of a fixed period of time.

Unlike the progress tracker which shows the checkpoints of a multi-step process, the progress countdown visualises linear time-based progress. We hypothesise that the progress tracker cannot communicate both how much has been completed and how much is left at the same time because it uses predefined checkpoints to record outcomes. 

Users have told us they would take encouragement from tracking a dynamic countdown. This progress countdown tested well and especially with users that are neurodiverse. They remarked that seeing the information update alongside the passage of time was beneficial as opposed to static, unchanged data. 

Non-sighted users can still understand its' use because of the accompanying ‘completed’ and ‘remaining’ labels which also provide percentage calculations.  

### How the component is currently used

Probation Accounts uses the progress countdown to display:

- progress made against an overall order or sentence using start and end dates
- progress made against requirements and conditions using total expected hours, days or months and what’s been completed
- Time completed and remaining is displayed in years, months, days and hours

### Contribute to this component
You can help develop this component by adding information to the [‘progress countdown’ Github discussion]({{ githuburl }}). This helps other people to use it in their service.