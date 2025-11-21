---
title: Overview
order: 10
tags: 'copy-button'
permalink: false
eleventyComputed:
  override:eleventyNavigation: false
---
<div class="img-container">
  <img src="/assets/images/submission-1763752744791/Screenshot-2025-11-21-at-17.54.04.png" alt="copy button" />
</div>

## Overview
This simple ‘copy button’ component allows users to quickly and accurately copy important information — for example dates of birth, reference numbers and National Insurance numbers — with a single click. A similar pattern exists in the GOV.UK Design System as a secondary CTA, but this version has been adapted to work accessibly within panels and interruption card components. This functionality is not currently available in the MoJ Design System, and there is a demonstrated user need for it. The pattern has been tested with users and received strong positive feedback.

### How the component is currently used

The default state of this component follows the GOV.UK secondary CTA style, with the label ‘Copy’. On hover, the button background darkens to the standard GOV.UK hover grey. When the user clicks, the button enters its focus state with the GOV.UK focus yellow, and the label changes to ‘Copied’. The button background also adapts to match the background of the component it sits within (for example a summary card, panel, or interruption card), improving accessibility when used on coloured backgrounds. The non-interactive ‘Copied’ state lasts for 4 seconds before returning to the default state.

### Contribute to this component
You can help develop this component by adding information to the [‘copy button’ Github discussion]({{ githuburl }}). This helps other people to use it in their service.