---
layout: layouts/patterns.njk
title: Get help
type: pattern
githuburl: https://github.com/ministryofjustice/moj-frontend/discussions/718
---

{% example "/examples/patterns/get-help", 250 %}

## When to use

Help users get help from within the digital service.

## How to use

Put the component at the bottom of every page of your service.

Determine which combination of channels are best for your service:

- Telephone
- Email
- Webchat
- Contact form

You'll need to get agreement of where issues will be sent, who will read it and who will respond to it.

Each service will need to determine the best combination of help channels they offer to users. They will also need to determine the response time.
### Contact form

Contact form fields can include:

- What do you need help with (textarea)
- Reference number if applicable (text input)
- Your email address (Email input)
- Your telephone number (Telephone input)

Tell users what the response time before the form and when it's submitted successfully.

The form should also send additional data automatically like:

- page url
- date and time of submission

This will let customer support staff triage the issue and respond quickly.
