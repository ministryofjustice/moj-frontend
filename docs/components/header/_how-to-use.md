---
title: How to use
order: 20
tags: 'header'
permalink: false
eleventyComputed:
  override:eleventyNavigation: false
---

## How to use

Add the header to the top of each page in your service. 

You can view [guidance on choosing a header](/components/header/#overview-tab).

The header component has 3 layouts. These enable you to add items to your header whilst keeping good spacing. The layouts are: 

- 'custom' links
- 'accounts area' links
- 'flexible (or mixed)' links

### Header contents 

Screenshot example 

The header must contain the:

- crest
- organisation or service name

#### Crest

The crest is the government's Royal Coat of Arms. Do not remove the crest, or replace it with another brand logo. 

You can read [branding guidance on the Royal Coat of Arms](https://www.communications.gov.uk/publication/branding/). 

#### Organisation or service name

The header can contain 1 of the following 3 options:

- your organisation name
- your service name
- your organisation name and your service name

The name (or names) go on the left hand side of the header. The name next to the crest is bolded, but not any others. 

You may want to add a link from the organisation and service name, for example to the service homepage, but you do not need to. Users may expect these names to be a link, depending on the type of product. Do user research if you're not sure. 

#### Example of the service name in the service navigation component

Add screenshot example 

Add your service name to the [GOV.UK service navigation component](https://design-system.service.gov.uk/components/service-navigation/) unless at least one of the following apply:

- there's no room
- there's no organisation name in the header (and therefore the header area next to the crest would be blank)

Do not add the service name to the [primary navigation component](/components/primary-navigation/). It was archived in November 2026. 

#### Example of the service name in the service navigation component

You could leave out the organisation name from your header if all of the following apply:

- it's an internal service
- the service contains the name of the organisation -- like MOJ Forms
- you're confident that users will know that it's an MOJ service (or do not need to know)

To do this you must add the service name to the header

### What you can and cannot add

You can also add:

- a user account area, for example showing a username and sign out link
- other global links, for example to support or feedback
- the [GOV.UK tag component](https://design-system.service.gov.uk/components/tag/), for example to show a 'DEV' environment label (use this sparingly and not for a product phase such as Beta)

Do not add the following to the header:

- navigation links 
- the [search component](/components/search/)

Use the [GOV.UK service navigation component](https://design-system.service.gov.uk/components/service-navigation) to let users navigate to different parts of your service, and find useful links and tools.

There’s not enough space in the header to add the [search component](/components/search/), and doing this would make the use of both components inconsistent.

#### User account area

The user account area can include a:

- username (which can be an email address)
- `Manage your details` link (if you have a page to link to)
- sign-out link

If your service displays email addresses in the header (or if you expect long user names) you may end up with a crowded header. You could explore:

- removing the email domain, for example alexander.watkins for alexander.watkins@justice.gov.uk
- removing the username (but not if users are sharing devices, for example in a workplace)
- setting a maximum width for the username (and cutting off usernames that are longer than that)

### Using the header with the notification badge component

Example screenshot

