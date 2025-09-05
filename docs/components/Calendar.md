---
title: Calendar
tabs: true
status: Experimental
statusDate: September 2025
excerpt: ""
lede: ""
githuburl: https://github.com/ministryofjustice/moj-frontend/discussions/categories/experimental-components-pages-and-patterns


---

{% tabs "paginate" %}
{% tab "Overview" %}

<div class="img-container">
  <img src="/assets/images/submission-1757077008432/ds-calendar-1.png" alt="Calendar" />
</div>

## Overview
The calendar component allows users to select a date and then choose from relevant times associated with that date, supporting tasks such as making bookings. It presents available dates in a calendar format covering a set time period (for example, the next 28 days). When a user selects a date, the available time slots for that day are shown below the calendar, enabling them to proceed directly to booking.

The component has been developed with accessibility at the forefront. It passed a recent accessibility audit, which highlighted that screen reader users receive clear information about the date in focus, including the day of the week and the number of available time slots. When a date is selected, focus automatically shifts to the time slots, so users do not need to tab through the rest of the calendar.

Additionally, after selecting a date, users are provided with a link labelled “Choose a different date above.” This returns them to the top of the calendar, making it easier to adjust their choice without needing to navigate backwards. This design ensures the interaction is efficient and user-friendly for a wide range of users.

### How the component is currently used

The calendar component has been implemented in the public-facing “Book a prison visit” service. It supports users in selecting an appropriate visit date and booking a specific time slot. The design has streamlined the process of choosing dates and times, making it clear, efficient, and accessible.

Feedback from accessibility testing confirmed the design works particularly well for screen reader users. The automatic shift of focus to available slots and the shortcut for re-selecting dates were noted as features that made the process straightforward and less burdensome. This improves the overall booking experience, especially for users with access needs.

In the context of “Book a prison visit,” the component helps users navigate availability, manage constraints around visiting hours, and complete their booking without confusion. The approach could be adapted for other services where date and time selection is a key user journey, particularly when accessibility and efficiency are critical.

### Contribute to this component
You can help develop this component by adding information to the [Calendar Github discussion]({{ githuburl }}). This helps other people to use it in their service.

{% endtab %}

{% tab "Designs" %}

## Designs

A Figma design has been added for this component. There may be more links and resources in the [Calendar Github discussion]({{ githuburl }}).


### Figma

      [View the Calendar component in the MoJ Figma Kit (opens in a new tab)]()


### Contribute prototypes and Figma links

      If you have design files that are relevant to this component you can add them to the [Github discussion]({{ githuburl }}). This helps other people to use it in their service.

{% endtab %}

{% tab "Accessibility" %}

## Accessibility

Accessibility findings have been added for this component. There may be more findings in the [Calendar Github discussion]({{ githuburl }}).


### External audit

* Conducted by: Not sure
* Date: 1 January 2025

#### Audit findings

N/A
### Assistive Technology testing

Date: 1 January 2025

#### Testing details

N/A

## Contribute accessibility findings

    If you have accessibility findings that are relevant to this component you can add them to the [Github discussion]({{ githuburl }}). This helps other people to use it in their service.

{% endtab %}

{% tab "Code" %}

## Code

No code was included when this contribution was added.

You can use the [Calendar Github discussion]({{ githuburl }}) to:

* view other code blocks
* add relevant code

{% endtab %}

{% endtabs %}
