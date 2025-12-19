---
title: Overview
order: 10
tags: 'api-error'
permalink: false
eleventyComputed:
  override:eleventyNavigation: false
---
<div class="img-container">
  <img src="/assets/images/submission-1764263405136/DPS-API-error.png" alt="api error" />
</div>

## Overview

This component is used when data cannot be displayed from the API that it's pulling it from. It alerts the user that there is some information missing from the page.

### How the component is currently used

The component can be used as a standalone error. An example of this is the DPS homepage when a service cannot be displayed in the services section.

It can also be used in conjunction with a card-level error. An example of this is the DPS Prisoner profile overview page where data is being pulled from many APIs. 

The API error will display at the top of the page to alert the user that some information is missing. We also alert the user with a smaller error displayed in the card the information is missing from, then the specific pieces of data that cannot be displayed are marked as 'Unavailable'.

### Contribute to this component
You can help develop this component by adding information to the [‘api error’ Github discussion]({{ githuburl }}). This helps other people to use it in their service.