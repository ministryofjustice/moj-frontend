---
layout: layouts/service-patterns.njk
title: "‘Appointments’ service patterns: proof of concept"
---

{% tabs "Contents" %}
{% tab "Overview" %}

## Overview

A cross-government team has developed 2 service patterns to help teams design ‘apply’ and ‘appointments’ journeys. These are proofs of concept that have been built to test their usefulness.

They contain some reusable parts that can be used to build services. This is the service pattern for ‘appointments’. You can also [view the service pattern for ‘apply’](/service-patterns/apply).

These service patterns are based on examples from across government. Those services were designed for different users and contexts, but the proof of concept shows some of the common and reusable parts.

The proof of concept has 3 parts:

- user needs for people attending appointments, and for teams managing appointments
- sub-patterns (for the 2 sets of users)
- user scenarios

Parts of the service pattern are described as ‘higher confidence’ and ‘lower confidence’. Higher confidence means at least half of the contributors agreed it was relevant to services they provided. ‘Lower confidence’ means less than half of contributors agreed it was relevant to their services. This is a guide. All parts of the pattern were relevant to 2 or more contributors.

### How to use service patterns

Service patterns are starting points. They give you some user needs for your team to explore and validate. You still need to do research and design - service patterns do not replace any of these activities.

We’ll share case studies and examples of this service pattern in use.

### How to give feedback

We’d like some feedback on the usefulness of the prototype.

Please complete the [appointment pattern survey](https://forms.office.com/Pages/ResponsePage.aspx?id=KEeHxuZx_kGp4S6MNndq2ML_UAYVtf1Jv53R4CVxx1hURFpPVDhUQVJVNkQxMzQyODRON0kzVVpKUi4u) by the end of September 2025.

Or you can email your responses to the 3 questions:

1. Would you find this concept useful for designing services?
2. Would this prototype help you design appointments journeys in your current role?
3. What else would you value in a service pattern like this?

Send your answers to [servicepatterns@justice.gov.uk](mailto:servicepatterns@justice.gov.uk)

## User needs

The cross-government work to identify an 'appointments' service pattern followed a user needs approach. Some of the user needs are low confidence. We’re looking for feedback to validate whether these should be accepted.

### User needs for public-facing services

#### Higher confidence

For people having appointments:

- I need information about the appointment in the right channel, format and language.
- I need to be able to select an appointment time and location that fits my situation.
- I need to be able to change the appointment time and location.
- I need enough information to make me feel more at ease and help me prepare for my appointment.
- I need to know what evidence or information I'll need to provide.
- In the appointment, I need to be able to refer to information I've provided.
- I need to not have to repeat my story across multiple appointments.
- I need to feel heard and understood throughout my appointment.

For people managing appointments:

- I need to get information or reminders about the appointment.
- I need to be able to book or reschedule an appointment on behalf of the person applying.

#### Lower confidence:

For people having appointments:

- I need reassurance that the appointment will run on time.
- I need to know I can bring another person to the appointment who can speak on my behalf if needed.

For people managing appointments:

- I need to know the rules for helping the person during the appointment.

### User needs for internal services

#### Higher confidence:

- I need fast, integrated and easy-to-use systems so that I can do my job efficiently.
- I need to be able to easily book, reschedule, send appointment reminders and cancel appointments.
- I need to have access to the person's information and history.
- I need to be able to change the time and location of the appointment to help the person.
- I need to accommodate reasonable adjustments or special needs (and know about these before the appointment).
- I need things to be resourced correctly, so that I have enough time to do my job and the person feels they have the experience they deserve.
- I need to know about third parties or supporters that are attending so that they can be briefed accordingly.

#### Lower confidence:

- I need to understand about any deadline to complete tasks
- I need to know about any concerns about the person so that I can keep myself and other staff safe.
- I need the right training so that I can feel confident in doing my job.
- I need to identify safeguarding issues so that I can take protect the public.
- I need to communicate with empathy during the appointment, so that people feel listened to.
- I need to know why people have not attended so that l can reschedule appropriately.
- I need to communicate with people in the right channel, format and language.

{% endtab %}
{% tab "Sub-patterns" %}

Service patterns can be broken down into service sub-patterns, for example prepare to apply. Each sub-pattern has steps, for example check eligibility.
You do not need to use all of the sub-patterns and steps. Consider which are appropriate for your service.

### People arranging, managing and attending appointments: sub-patterns and steps

#### 1. Prepare to book appointment

- Work out eligibility for appointment (lower confidence)
- View guidance (lower confidence)

#### 2. Book appointment

- Get notification to make appointment  
- Confirm appointment
- Get information about what to expect at appointment (lower confidence)
- Get appointment notifications
- Specify reasonable adjustments
- Request third party help
- Change or cancel appointment
- Get notifications about appointment changes (lower confidence)
- View available appointments (lower confidence)
- Book appointment (lower confidence)

#### 3. Prepare for appointment

- Understand appointment process
- Gather evidence (lower confidence)
- Prepare with third party (lower confidence)
- Refer to published information
- Request financial support or expenses (lower confidence)
- Pay for appointment (lower confidence)
- Fulfil pre-appointment requirements (lower confidence)

4. Attend appointment

- Confirm identity at appointment (lower confidence)
- People attending the appointment meet one another  
- Submit evidence
- Get help (lower confidence)

5. After appointment

- Get appointment outcome(lower confidence)
- Know how to complain or challenge the outcome (lower confidence)
- Get support after the appointment (lower confidence)

### Organisations managing applications: sub-patterns and steps

#### 1. Book appointment

- Understand the person's details
- Understand details of a claim or application (lower confidence)
- Contact the person
- Arrange the appointment
- Allocate appointment to an owner (lower confidence)
- Arrange reasonable adjustments (lower confidence)
- Arrange translator or chaperone (lower confidence)
- Notify the person of appointment details and how to prepare
- Change or cancel appointment

#### 2. Prepare for appointment

- Communicate availability for appointments
- View upcoming appointments
- Understand the person's details
- Understand details of a claim or application (lower confidence)
- Arrange safeguarding (lower confidence)
- Check the person has confirmed the appointment (lower confidence)
- Review technical requirements of appointment (lower confidence)
- View their information and history (lower confidence)
- Send reminders (lower confidence)

#### 3. Attend appointment

- Verify person's identity (lower confidence)
- Register them for appointment (lower confidence)
- Brief the third party (lower confidence)
- Carry out appointment
- Record attendance (lower confidence)
- Defer appointment (lower confidence)

4. After the appointment

- Write up outcome (lower confidence)
- Send outcome and any next steps (lower confidence)
- Give support (lower confidence)

{% endtab %}
{% tab "User scenarios" %}

## User scenarios

These are some scenarios you may have to design for your service.

### Happy paths:

- Person books the appointment themselves
- Someone else books it for them, for example a service provider  
- The person is invited to book it by a service provider
- People get appointment reminders  
- User requests and receives assistance or adjustments to book or attend an appointment

The appointment happens at the right place, on time and runs to time

User or service provider can view information about the outcome of the appointment

#### Alternatives:

- Additional application information is needed before it can be processed
- Evidence in support of application needs to be resent because it's deemed unsuitable
- User decides they want to withdraw their application
- User information changes between starting application and completion
- Eligibility to apply changes while applying
- User pauses application and returns to it
- User switches channel during application
- On checking their answers, user changes something which significantly affects subsequent answers
- User requires point of contact for support

### Unhappy Paths:

- User does not understand what they need to complete application
- User does not meet the eligibility threshold or criteria
- User cannot find the application form
- Application is missing information or contains the wrong information
- User did not receive receipt notification
- Third party does not complete their part of the application
- Time limit elapse (for example, SLA for response)
- Application window closes
- User is logged out of the service part way through their application due to time out

{% endtab %}
{% tab "Contribute" %}

### How to give feedback on the apply prototype

We’d like some feedback on the usefulness of the prototype.

Please complete the [apply pattern prototype survey](https://forms.office.com/Pages/ResponsePage.aspx?id=KEeHxuZx_kGp4S6MNndq2ML_UAYVtf1Jv53R4CVxx1hURFpPVDhUQVJVNkQxMzQyODRON0kzVVpKUi4u) by the end of April 2025.

Or you can email your responses to the 3 questions:

1. Would you find this concept useful for designing services?
2. Would this prototype help you design an apply journey in your current role?
3. What else would you value in a service pattern like this?

Send your answers to [servicepatterns@justice.gov.uk](mailto:servicepatterns@justice.gov.uk).

### Contributing to other MoJ service patterns

You'll likely design multiple instances of potential service patterns when you develop new products or services.

Contact [servicepatterns@justice.gov.uk](mailto:servicepatterns@justice.gov.uk) if you have a service pattern idea or want to help us work on others.

We welcome feedback from everyone, including from people outside of the Ministry of Justice.

{% endtab %}
{% endtabs %}
