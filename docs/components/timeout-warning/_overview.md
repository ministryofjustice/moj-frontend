---
title: Overview
order: 10
tags: 'timeout-warning'
permalink: false
eleventyComputed:
  override:eleventyNavigation: false
---
<div class="img-container">
  <img src="/assets/images/submission-1763680654726/timeout-warning.png" alt="A window over a tinted grey background that tells the user 'Your form is about to be reset' with detail about why in the body content. A button labelled 'Continue with form' is below, and an 'x' close button is to the top right." />
</div>

## Overview

The component uses the [modal dialog component](/components/modal-dialog) to show a timeout warning to inform users when they have a limited amount of time to complete their current activity.  The modal contains a button which allows users to extend the time they have to complete the task.  This is important because whenever a process has a time restriction of less than 20 hours to complete a process users must be given a way to turn off, adjust, or extend the time limit in order to satisfy WCAG SC 2.2.1 Timing Adjustable (Level A).

After a configurable amount of time without user interaction, the timeout warning modal will show. This will display a countdown of the time remaining.  The modal contains a button that when pressed will make a request to a URL which will extend the length of their session (this behaviour needs to be developed in the backend of the application).  If no action is taken before the end of the countdown, the user will be redirected to another page.  This page should explain to the user that their session has been ended to keep their data secure, and that they will need to restart the process.

The component works with screenreaders, announcing the time remaining every 15 seconds up until the final 20 seconds which will be announced every second.

### How the component is currently used

The component is used within forms published using the MOJ Forms platform.  For data security sessions are limited to 30 minutes per page.  The timeout warning shows after 25 minutes, giving users a 5 minute window to extend their session before their session is ended and their data cleared.

### Contribute to this component
You can help develop this component by adding information to the [‘timeout warning’ Github discussion]({{ githuburl }}). This helps other people to use it in their service.
