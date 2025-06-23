---
layout: layouts/service-patterns.njk
title: "‘Appointments’ service pattern proof of concept"
---
{% tabs "Contents" %}
{% tab "Overview" %}

## Overview

A cross-government team has developed 2 service patterns to help teams design ‘apply’ and ‘appointments’ journeys. These are proofs of concept that have been built to test their usefulness.

They contain some reusable parts that can be used to build services. This is the service pattern for ‘appointments’. There's also the [service pattern for ‘apply’](/service-patterns/apply).

These service patterns are based on examples from across government. Those services were designed for different users and contexts, but the proof of concept shows some of the common and reusable parts.

The proof of concept covers:

- user needs for people attending appointments, and for teams managing appointments
- sub-patterns (for the 2 sets of users)
- user scenarios

Service pattern parts are described as either:

- ‘more common’ if at least half of the contributors agreed it was relevant
- ‘less common’ if fewer than half of contributors agreed it was relevant

This is a guide. All parts of the pattern were relevant to 2 or more contributors.

### How to use service patterns

Service patterns are starting points. They provide some user needs for your team to explore and validate. You still need to do research and design -- service patterns do not replace any of these activities.

We’ll share case studies and examples of this service pattern in use.

{% endtab %}
{% tab "User needs" %}

## User needs

The cross-government work to identify an 'appointments' service pattern followed a user needs approach.  

### User needs for people attending appointments

#### More common

- I need information about the appointment in the right channel, format and language.
- I need to be able to select an appointment time and location that fits my situation.
- I need to be able to change the appointment time and location.
- I need enough information to make me feel more at ease and help me prepare for my appointment.
- I need to know what evidence or information I'll need to provide.
- In the appointment, I need to be able to refer to information I've provided.
- I need to not have to repeat my story in different appointments.
- I need to feel heard and understood throughout my appointment.

#### Less common

- I need reassurance that the appointment will run on time.
- I need to know that I can bring another person to the appointment who can speak on my behalf.

### User needs for managing appointments

#### More common

For people acting on behalf of users:

- I need to information or reminders about the appointment.
- I need to be able to book or reschedule an appointment on behalf of someone else.

#### Less common

- I need to know the rules for helping the person during the appointment.

### User needs for internal services

#### More common

- I need fast, integrated and easy-to-use systems so that I can do my job efficiently.
- I need to be able to book, reschedule, send appointment reminders and cancel appointments.
- I need to have access to the person's information and history.
- I need to be able to change the time and location of the appointment to help the person.
- I need to accommodate reasonable adjustments or special needs (and know about these before the appointment).
- I need things to be resourced correctly, so that I have enough time to do my job and the person feels they have the experience they deserve.
- I need to know about third parties or supporters that are attending so that they can be briefed accordingly.

#### Less common

- I need to understand about any deadlines to complete tasks
- I need to know about any concerns about the person so that I can keep myself and other staff safe.
- I need the right training so that I can feel confident about doing my job.
- I need to identify safeguarding issues so that I can protect the public.
- I need to communicate with empathy during the appointment, so that people feel listened to.
- I need to know why people have not attended so that l can reschedule appropriately.
- I need to communicate with people in the right channel, format and language.

{% endtab %}
{% tab "Sub-patterns" %}

## Sub-patterns

Service patterns can be broken down into sub-patterns, for example prepare to book an appointment. Each sub-pattern contains tasks, for example check eligibility. You do not need to use all of these. Consider which are appropriate for your service.

### People arranging, managing and attending appointments: sub-patterns and tasks

#### 1. Prepare to book appointment

- Work out eligibility for appointment (less common)
- View guidance (less common)

#### 2. Book appointment

- Get notification to make appointment
- View available appointments (less common)
- Select appointment (less common)
- Confirm appointment
- Get information about what to expect at appointment (less common)
- Get appointment notifications
- Specify reasonable adjustments
- Request third party help
- Change or cancel appointment
- Get notifications about appointment changes (less common)

#### 3. Prepare for appointment

- Understand appointment process
- Gather evidence (less common)
- Prepare with third party (less common)
- Refer to published information
- Request financial support or expenses (less common)
- Pay for appointment (less common)
- Do pre-appointment tasks (less common)

#### 4. Attend appointment

- Confirm identity at appointment (less common)
- People attending the appointment meet one another
- Submit evidence
- Get help (less common)

#### 5. After appointment

- Get appointment outcome (less common)
- Know how to complain or challenge the outcome (less common)
- Get support after the appointment (less common)

### Organisations managing appointments: sub-patterns and tasks

#### 1. Book appointment

- Understand the person's details
- Understand the appointment details (less common)
- Contact the person
- Arrange the appointment
- Allocate appointment to an owner (less common)
- Arrange reasonable adjustments (less common)
- Arrange translator or chaperone (less common)
- Notify the person of appointment details and how to prepare
- Change or cancel appointment

#### 2. Prepare for appointment

- Communicate availability for appointments
- View upcoming appointments
- Understand the person's details
- Understand details of a claim or application (less common)
- Arrange safeguarding (less common)
- Check the person has confirmed the appointment (less common)
- Review technical requirements of appointment (less common)
- View their information and history (less common)
- Send reminders (less common)

#### 3. Attend appointment

- Verify person's identity (less common)
- Register them for appointment (less common)
- Brief the third party (less common)
- Carry out appointment
- Record attendance (less common)
- Defer appointment (less common)

#### 4. After the appointment

- Write up outcome (less common)
- Send outcome and any next steps (less common)
- Give support (less common)

{% endtab %}
{% tab "User scenarios" %}

## User scenarios

These are some scenarios you may have to design for your service.

### Happy paths:

- Person books the appointment themselves
- Someone else books it for them
- The person is invited to book it by a service provider
- People get appointment reminders
- Someone else books it for them, for example a service provider
- The person is invited to book it by a service provider
- User requests and receives assistance or adjustments to book or attend an appointment
- The appointment happens at the right place, on time and runs to time
- User or service provider can view information about the outcome of the appointment

### Alternatives:

- The user and service provider need to agree a mutually suitable appointment
- The user needs to change the appointment, with enough notice (such as time and location)
- The provider needs to change the appointment, with enough notice (such as time and location)
- The appointment was rearranged due to conflict between multiple attendees, with enough notice
- The user cancels the appointment
- Additional information is provided before the appointment
- Additional information can be viewed before the appointment
- The user can be communicated with before or after the appointment
- The appointment needs to be recorded
- A tentative or pending appointment is confirmed
- The user or provider needs to save progress part way through booking an appointment
- The appointment is booked via a third party
- An emergency or short notice appointment is needed
- The user or provider needs an assisted digital appointment path
- An appointment is requested via a referral
- A follow-up appointment is needed
- A payment is needed to book an appointment

### Unhappy paths:

 - There are no suitable appointments  
 - The user cannot book the appointment themselves

The appointment cannot go ahead (or be completed) because:

 - The user does not get the right information about their appointment
 - The user is late, does not attend or cancels at short notice
 - The provider is late, does not attend or cancels at short notice
 - There are technical issues or another problem during the appointment
 - There are scheduling issues with multiple attendees  
 - The user does not meet essential requirements, for example bringing evidence
 - The appointment is not paid for

{% endtab %}
{% tab "Give feedback" %}

### Give feedback

We’d like some feedback on the usefulness of the proof of concept.

Please complete the [appointment pattern survey](https://forms.office.com/Pages/ResponsePage.aspx?id=KEeHxuZx_kGp4S6MNndq2ML_UAYVtf1Jv53R4CVxx1hURFpPVDhUQVJVNkQxMzQyODRON0kzVVpKUi4u).

Or you can email your responses to the 3 questions:

1. Would you find this concept useful for designing services?
2. Would this proof of concept help you design an appointment journey in your current role?
3. What else would you value in a service pattern like this?

Send your answers to [servicepatterns@justice.gov.uk](mailto:servicepatterns@justice.gov.uk).

### Contributing to other MoJ service patterns

You'll likely design multiple instances of potential service patterns when you develop new products or services.

Contact [servicepatterns@justice.gov.uk](mailto:servicepatterns@justice.gov.uk) if you have a service pattern idea or want to help us work on others.

We welcome feedback from everyone, including from people outside of the Ministry of Justice.

{% endtab %}
{% endtabs %}
