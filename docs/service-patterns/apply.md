---
<<<<<<< new-docs-tabs
layout: layouts/content.njk
tabs: true
title: ‘Apply’ service pattern prototype
=======
layout: layouts/service-patterns.njk
title: ‘Apply’ service pattern proof of concept
>>>>>>> main
---

{% tabs "Contents" %}
{% tab "Overview" %}

## Overview

A cross-government team has developed 2 service patterns to help teams design ‘apply’ and ‘appointments’ journeys. These are proofs of concept that have been built to test their usefulness.

They contain some reusable parts that can be used to build services. This is the service pattern for ‘apply’. There's also the [service pattern for ‘appointments’](/service-patterns/appointment).

These service patterns are based on examples from across government. Those services were designed for different users and contexts, but the proof of concept shows some of the common and reusable parts.

The proof of concept covers:

- user needs for applying, and for teams managing applications
- sub-patterns (for the 2 sets of users)
- user scenarios

Service pattern parts are described as either:

- ‘more common’ if at least half of the contributors agreed it was relevant
- ‘less common’ if fewer than half of contributors agreed it was relevant

This is a guide. All parts of the pattern were relevant to 2 or more contributors.


### How to use service patterns

Service patterns are starting points. They give you some user needs for your team to explore and validate. You still need to do research and design - service patterns do not replace any of these activities.

We’ll share case studies and examples of this service pattern in use.

{% endtab %}
{% tab "User needs" %}

## User needs

The cross-government work to identify an ‘apply’ service pattern followed a user needs approach.

### User needs for applying

#### More common:

- I need to be treated with respect, feel understood and not judged throughout the process.
- I need the process to be suitable for my language and/or communication needs.
- I need to easily understand the whole process, know what I need to do at each stage, how long it might take and what relevant information I need to provide.
- I need to know how to get access to help or support if I need it during the application process.
- I need to enter information as few times as possible to avoid repeating my story.
- I need to trust that any third party will act in a way that does not leave me vulnerable (to fraud).
- I need to know I can save my application progress and return to it.
- I need to have clear questions to enable me to understand things and provide the correct supporting evidence.
- I need to get confirmation of submission of my application and know what the next steps are and when they will happen.
- I need my completed application and supporting information to be saved for future reference.
- I need to trust that the data I provide will be stored securely, kept safe and only used for the specific application.
- I need to trust that the right decision will be made based on my individual circumstances and the information I've provided.
- I need to get reassurance of progress.

#### Less common:

- I need to apply with a channel and format that suits me and my circumstances.
- I need the service to look and feel official.
- As a third party, I need to be able to upload and receive correspondence for the claimant.
- As a third party, I need to easily be able to review information to help the claimant.
- I need to know a third party will be able to act on my behalf if needed.
- I need to be kept safe throughout the ‘apply’ process (for example, if I'm a victim of domestic abuse).

### User needs for managing applications

#### More common:

- I need to easily view relevant information about the applicant so that I can understand the full picture.
- I need to be able to access other systems that might be helpful so that I can determine eligibility for the application.
- I need information to be in as few places as possible so that I do not have to move between systems.
- I need to feel confident in the systems that I'm using and the questions that I'm asking so that I can advise my claimants accurately.

#### Less common:

- I need a clear and consistent process to follow so that I can ensure all applicants have the same experience and I can ask for help when needed.
- I need to feel valued and supported so that I can perform at my best and give applicants a quality experience.
- I need to communicate effectively and in a way that suits the applicant so that I can feel confident.
- I need to be empathetic and sensitive to applicants so they trust me and know I’m listening.
- I need to be able to verify an applicant’s identity so that I can progress.
- I need the systems I use to be efficient and reliable so that there are no delays.
- I need to accurately capture applicant information so that there are no mistakes.
- I need to ensure I only ask relevant questions to applicants so that I can collect the right information.
- I need a clear list of supporting evidence (where necessary) so that I can easily validate and know information is correct.
- I need to make sure sensitive information is only seen by relevant people so that the department meets GDPR standards.
- I need to know that the information we hold about an applicant is up-to-date so that I can advise on next steps appropriately.
- I need an efficient way of communicating personal data changes across products so that it saves time.
- I need to be confident the data I'm accessing is accurate and up-to-date.
- I need to have confidence that users have access to relevant guidance to make a decision because I cannot advise them on their specific circumstances.

{% endtab %}
{% tab "Sub-patterns" %}

## Sub-patterns

Service patterns can be broken down into sub-patterns, for example prepare to apply. Each sub-pattern contains tasks, for example find the right application form. You do not need to use all of these. Consider which are appropriate for your service.

### People applying: sub-patterns and tasks

#### 1. Prepare to apply

- Find the right application form
- Get reassurance about application process
- Check eligibility (less common)

#### 2. Submit application

- Enter application information
- Enter third party information
- Get help
- Pause application
- Return to application
- Finish and submit application
- Accept declaration and privacy policy (less common)
- Check existing information (less common)
- Get application fee request (less common)
- Pay fee (less common)

#### 3. Give supporting evidence

- Get notification that supporting evidence is needed
- Gather supporting evidence
- Give supporting evidence
- Get confirmation that evidence has been submitted

#### 4. Await outcome

- View application
- Get progress updates

### Organisations managing applications: sub-patterns and tasks

#### 1. Prepare for application

- Access reference materials

#### 2. Meet the person applying

- Confirm user's identity
- Confirm user's eligibility

#### 3. Assess applications

- Establish third party information
- View application information
- Ask questions
- Capture application information
- Capture citizen information change
- Play back application
- Resume application

#### 4. Collect supporting evidence

- Understand the purpose of supporting evidence
- Communicate the purpose of supporting evidence
- Capture supporting evidence

#### 5. Finish application

- Receive application
- Communicate next steps
- Share citizen information change

{% endtab %}
{% tab "User scenarios" %}

## User scenarios

These are some scenarios you may have to design for your service.

### Happy paths:

- Individual applying for themselves
- Individual applying on behalf of someone else
- Business or organisation applying for themselves
- Business or organisation applying on behalf of someone else
- Staff user applying for something on behalf of an individual, business or organisation
- Multiple user types contributing to the same application

### Alternatives:

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
{% tab "Give feedback" %}

### Give feedback  

We’d like some feedback on the usefulness of the proof of concept.

Please complete the [apply pattern survey](https://forms.office.com/Pages/ResponsePage.aspx?id=KEeHxuZx_kGp4S6MNndq2ML_UAYVtf1Jv53R4CVxx1hURFpPVDhUQVJVNkQxMzQyODRON0kzVVpKUi4u).

Or you can email your responses to the 3 questions:

1. Would you find this concept useful for designing services?
2. Would this help you design an apply journey in your current role?
3. What else would you value in a service pattern like this?

Send your answers to [servicepatterns@justice.gov.uk](mailto:servicepatterns@justice.gov.uk)

### Contributing to other service patterns

You'll likely design multiple instances of potential service patterns when you develop new products or services.

Contact [servicepatterns@justice.gov.uk](mailto:servicepatterns@justice.gov.uk) if you have a service pattern idea or want to help us work on others.

We welcome feedback from everyone, including from people outside of the Ministry of Justice.

{% endtab %}
{% endtabs %}
