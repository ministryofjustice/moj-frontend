---
layout: layouts/content.njk
# subsection: Content standards
title: Content style guide
permalink: /content-standards/style-guide/
eleventyNavigation:
  key: Content style guide
  parent: Standards and principles
  order: 20
  excerpt: "The MoJ A to Z content style guide covering style, spelling and grammar conventions."
---

<p class="govuk-!-margin-bottom-6">
    This content style guide applies to services and guidance at MoJ. It should be used alongside the <a href="https://www.gov.uk/guidance/style-guide/a-to-z-of-gov-uk-style">style guide on GOV.UK</a>.
</p>

<p class="govuk-!-margin-bottom-0">
First published: 18 December 2024
</p>

<p class="govuk-!-margin-bottom-0">
Last updated: 28 February 2025
</p>

<p class="govuk-!-margin-bottom-6">
<a href="/content-standards/style-guide-updates">View all updates</a>
</p>

{% accordion "style-guide" %}
{% accordionSection "A" %}

### acronyms and initialisms

Acronyms and initialisms in services do not need to be spelt out if they are well understood by your audience. This also helps if it's difficult to spell them out, such as in a table.

If users are familiar with the acronym or initialism but you would still like to help them, you can spell it out afterwards, for example 'PDU (probation delivery unit)'.

For guidance or long-form content, spell them out on first mention (following the [abbreviations and acronyms guidance on GOV.UK](https://www.gov.uk/guidance/style-guide/a-to-z-of-gov-uk-style#abbreviations-and-acronyms)).

### alerts (DPS only)

Only use 'alerts' when talking about alerts created in NOMIS or DPS (Digital Prison Services).

Alerts can be 'active' or 'inactive'. You may find language in DPS that refers to 'adding', 'opening' and 'closing' alerts. This should become more consistent as users move away from using NOMIS.

### aliases

Always use 'aliases' when talking about other names a person has on their prison record. This term is commonly used and understood in prisons. Using a different term may confuse users.

### Assessment, Care in Custody and Teamwork (ACCT)

Use ACCT. This is more well known than the full version. When an ACCT is closed, it is referred to as 'ACCT post-closure' for 7 days.

{% endaccordionSection %}
{% accordionSection "B" %}

### breadcrumbs

Do not show the current page in the list of breadcrumbs.

In DPS, the first breadcrumb should always be 'Digital Prison Services'.

{% endaccordionSection %}
{% accordionSection "C" %}

### capitalisation

For general terms, follow the guidance in the [style guide on GOV.UK](https://www.gov.uk/guidance/style-guide/a-to-z-of-gov-uk-style).

There's not a standard approach to capitalising acronyms or initialisms when they are written out in full.

You may decide to capitalise abbreviations when:

- you’re referring to the proper name for something
- it would help users to understand what you’re referring to
- the full version of the abbreviation is long

Please share your decisions on capitalising abbreviations in the [content community Slack channel (MoJ staff only)](https://moj.enterprise.slack.com/archives/C58FBN6V6). These entries will be added to the content style guide to ensure consistency.

### case list

Use 2 separate words. Not caselist. For example, 'return to case list'.

### case note

Use 2 separate words. Not casenote.

### caseload (changing caseload)

If your service lets users change their 'caseload', always use 'change location' instead. 'Caseload' is a legacy term from NOMIS that would need explaining to users.

### Category (such as Category A prison)

Capitalise and write out in full. For example, 'Category A'.

You can shorten to 'Cat' if you have limited space, for example in alert flags on the prisoner profile.

Use 'Category A – high' for high-profile prisoners.

Use 'Category A – provisional' for provisional Category A prisoners.

### cell

Cell or cells should be used to refer to the rooms that people in prison live in. There are some instances in the open, female and youth estate where alternatives such as 'dormitory' or 'room' may be more appropriate. But for services rolled out across the entire prison estate, cell is likely to be the most widely understood term.

There is also research to suggest prisoners do not see 'cell' as a stigmatising term, but an accurate description of accommodation in prisons across England and Wales.

### Cell Sharing Risk Assessment (CSRA)

Use CSRA. This is more well known than the full version.

### Challenge, Support and Intervention Plan (CSIP)

Use CSIP. This is more well known than the full version.

### clock

See [guidance on using the 12 or 24-hour clock](#times).

### closed prison, closed conditions

Lower case.

### community probation practitioner

This is a [probation practitioner](#probation-practitioner) who works in the community and not in prisons.

It's better than 'community offender manager (COM)', although someone may have this job title. Refers to a probation officer, probation support officer or senior probation officer.

### contractions

Follow the [style guide on GOV.UK](https://www.gov.uk/guidance/style-guide/a-to-z-of-gov-uk-style#contractions) and avoid using negative contractions like can’t and don’t.

Avoid contractions with a noun and verb such as ‘the computer’s fast’. This may be misunderstood as showing possession. Use ‘the computer is fast’ instead.

You can use positive contractions like we’ll and you’ll.

We’d like to test positive contractions with users to find out if they’re more difficult to understand.

### CRN (case reference number)

The reference assigned to a person on probation in NDelius. Not NDelius number, case number or CRN number.

The initialism is likely to be familiar to NDelius users without needing to be spelt out. The format is 2 characters, 4 numbers and then 2 characters for example ‘RG5108AC’.

{% endaccordionSection %}
{% accordionSection "D" %}

### dates

Follow the [style for writing dates in full on GOV.UK](https://www.gov.uk/guidance/style-guide/a-to-z#dates) where possible. For example, 14 January 2025. This makes the date clear and accessible.

There's evidence that truncating dates can cause accessibility issues. If you need to do so, for example when short of space, abbreviate months as follows: Jan, Feb, Mar, Apr, May, June, July, Aug, Sept, Oct, Nov, Dec. This approach follows [Office for National Statistics (ONS) style on dates](https://service-manual.ons.gov.uk/content/content-types/datasets#dates-months-and-quarters).

You can also abbreviate dates using D/MM/YYYY, for example 30/9/2024, when they're repeated regularly in a long list or table. Do not use a leading zero - use 1/1/2025 instead of 01/01/2025.

Do not abbreviate the year.

It can be helpful to include the day of the week in an appointment or deadline.

When including the day of the week, do so before the rest of the date - for example, Thursday 14 January 2025.

If users can choose a date range, use 'earliest' and 'latest' in your labels. For example:

'Date from (earliest)'

'Date to (latest)'

This is being used on the DPS prisoner profile alerts and case notes pages in response to user feedback.

In an example of how to enter or select a date in the [date input component in the GOV.UK Design System](https://design-system.service.gov.uk/components/date-input/) or the [date picker](https://design-patterns.service.justice.gov.uk/components/date-picker/), follow the style in the respective guidance. For example, 14 5 2024 for date input, 14/5/2024 for a date picker. It's helpful if your example date uses the 13th day of the month or later (14/5/2024 makes it clear that 14 could not be the month).

### DPS, Digital Prison Services

Not 'the Digital Prison Service'.

DPS may be referred to as 'New NOMIS' in prisons, but we should always use 'DPS' or 'Digital Prison Services'.

The acronym 'DPS' is well understood and can be used without the full name.

{% endaccordionSection %}
{% accordionSection "E" %}

### empty states

Research with prison staff has shown that empty states help reassure users that nothing has been entered and the product is not broken.

In the DPS prisoner profile, the 'aliases' field was conditionally hidden if no aliases had been entered. Users said that they thought the page might be broken or just not showing the information from NOMIS.

### establishment

See [prison, establishment](#prison%2C-establishment).

### establishment roll, roll

This refers to the record of prisoners' movements and locations in an establishment. You can use 'roll' when referring to the establishment roll. This is commonly used in prisons and is well understood.

{% endaccordionSection %}
{% accordionSection "F" %}

### forfeiture of privileges

Always use ‘loss of privileges’ when referring to the outcome of an adjudication hearing.

{% endaccordionSection %}
{% accordionSection "G" %}

### global search

Global search is a NOMIS screen used to search for people in any establishment or who have been released. This term has also been used in DPS and is commonly used by staff in prisons.

Only a limited number of staff have access to search for people across all establishments. This is controlled by a 'global search' role.

If you're referring to this type of search in your service, use the label 'In any establishment (global)'. This is being used on the DPS homepage and the non-associations service.

As users are moved away from NOMIS, references to 'global' should be able to be removed.

{% endaccordionSection %}
{% accordionSection "H" %}

### help content (DPS only)

When directing users to help and support, always use this content:

**Get help with DPS**  
Call 0800 917 5148 or #6598 from inside an establishment.

This content does not provide any alternative contact methods such as email or chat. This may be raised as a recommendation if your service receives an accessibility audit.

### hint text

Always use full stops at the end of hint text, even when using examples.

This decision was made based on [research from other government departments and internal discussions (MoJ staff only)](https://trello.com/c/cjE65vrR).

The content community would like to test this approach to see if it causes users to include full stops in input fields.

This guidance only applies to hint text styled with the class “govuk-hint”.

### Home Office reference number

Initial caps for 'Home Office'.

{% endaccordionSection %}
{% accordionSection "I" %}

### identity numbers (HMPPS only)

Use 'identity numbers' when referring to:

- [CRN](#crn-%28case-reference-number%29)
- CRO number
- driving licence number
- Home Office reference number
- [PNC number](#pnc-number)
- [prison number](#prison-number)

Do not use 'identifiers' when referring to these items.

### incentive level, IEP

Always use ‘incentive level’.

References to ‘IEP’ were removed from DPS in response to the new Incentives Policy Framework. NOMIS has not been updated to reflect the policy change.

Staff in prisons may still use ‘IEP’ when referring to someone’s incentive level.

{% endaccordionSection %}
{% accordionSection "K" %}

### key worker

This is 2 separate words. Not keyworker.

{% endaccordionSection %}
{% accordionSection "N" %}

### naming

If you're naming a service in DPS, you should follow the [DPS naming guidelines (MoJ staff only)](https://docs.google.com/document/d/1Va7AIp6cmlyNgs_x42A4KHw3wo5NFQebYO6EhO3lJxg/edit?usp=sharing).

### NDelius

Not nDelius, Ndelius or Delius. It's the case management system in probation.

### NOMIS

Not Nomis or nomis. It's an initialism and stands for the National Offender Management Information System. This is a legacy digital system that's being replacing with DPS.

### non-associations

A non-association is a record that says 2 prisoners must be kept apart.

Staff in some prisons may also refer to non-associations as:

- keep-aparts
- KSFs (keep separate from)
- non-associates
- non-association markers
- conflicts

{% endaccordionSection %}
{% accordionSection "O" %}

### offender or ex-offender

Read [guidance on how to talk about people in the justice system (MoJ staff only)](https://docs.google.com/document/d/1Vh_ReT14BKQ8ATEZcSIyDvvPERW0NJA7Grhk1trKAq8/edit?tab=t.0#heading=h.zcolbmcvf6md).

### open prison, open conditions

Lower case.

{% endaccordionSection %}
{% accordionSection "P" %}

### page titles

In DPS, you must follow the [DPS guidelines for formatting page titles (MoJ staff only)](https://docs.google.com/document/d/17mHQYHOA5S6dOWjjPvkJvXrb-6f37o8hjjWUe9gBqKo/edit?tab=t.0#heading=h.1rt3kbplnmql).

### Person Escort Record (PER)

Write out Person Escort Record (PER) at the first usage and use PER thereafter.

PERs are a document which must be completed for all people in custody prior to any escorted movement outside prison (for example to or from court or a transfer to another prison).

### person on probation, people on probation

Read [guidance on how to talk about people in the justice system (MoJ staff only)](https://docs.google.com/document/d/1Vh_ReT14BKQ8ATEZcSIyDvvPERW0NJA7Grhk1trKAq8/edit?tab=t.0#heading=h.zcolbmcvf6md).

### personal data in title tags

The page title is the text displayed in the browser tab. It is not the page heading or H1. Titles should describe the purpose and content of the page.

The title can be the same as the H1 unless the H1 includes personal information such as names. Do not include personal information in the title because it may be included in analytics data and cause data protection issues.

You can either write the title content or work with a developer to see if it can be taken from the H1 but without any personal information.

### Personal Emergency Evacuation Plan (PEEP)

Use PEEP. This is more well known than the full version.

### Personal Identification Number (PIN)

Use PIN. This is more well known than the full version.

Prisoners use their secure PIN to call people on their approved contacts list from their in-cell PIN phones.

It is often written as pin or Pin in prisons, but PIN is the correct format.

<h3 class="govuk-heading-m" id="preferred-name">preferred name</h3>

Always use 'preferred name', not 'working name' as it's called in NOMIS.

### PNC number

An identity number assigned to a person in the Police National Computer (PNC). Use ‘PNC number’. This is more well known than the full version.

### prison, establishment

‘Prison’ and ‘establishment’ are both acceptable terms. Which one you should use depends on the context and audience.

‘Prison’ refers only to adult prisons. It’s more likely to be understood by the public than ‘establishment’. Users with English as a second language may also find it easier to understand.

Individual prison names can be used for clarity, for example ‘HMP Wayland’.

‘Establishment’ is used to collectively describe a mixture of prisons, young offender institutions (YOIs), dual-designated prisons and YOIs, and Secure Training Centres (STCs). ‘Prison’ is inappropriate when describing settings accommodating children and young adults.

‘Establishment’ is widely used in NOMIS and DPS, with no reported issues.

‘Location’ may refer to places within the prison, for example, the gym.

'Site' is sometimes used instead of prison or establishment, or to refer to where someone on probation is located. It might be used to describe places with several prisons or buildings.

### prison number

Always use ‘prison number’ when referring to the unique number given to someone when they arrive at prison. This term is widely used and understood by staff in prisons. It may need explaining in content or services for the public.

Do not use ‘prison no’, ‘prisoner number’, ‘NOMIS number’, ‘NOMS number’ or ‘offender number’.

Staff in prisons may still use ‘NOMIS number’ or ‘alpha number’ when referring to someone’s prison number.

### prisoner, person in prison

Read [guidance on how to talk about people in the justice system (MoJ staff only)](https://docs.google.com/document/d/1Vh_ReT14BKQ8ATEZcSIyDvvPERW0NJA7Grhk1trKAq8/edit?tab=t.0#heading=h.zcolbmcvf6md).

### prisoner record

Always use ‘prisoner record’ when referring to the data stored about a person in prison. A prisoner record is linked to a prison number and can contain information from multiple bookings.

Do not use ‘prison record’, ‘NOMIS record’, ‘NOMS record’ or ‘offender record’.

More research is needed to ensure that this is the best way to describe information the organisation has about someone in prison.

### Probation Delivery Unit (PDU)

Use upper case and the initialism on first mention. Research is needed to establish if users will understand PDU without it being spelt out.

<h3 class="govuk-heading-m" id="probation-practitioner">probation practitioner</h3>

This is better than 'community offender manager (COM)' and 'prison offender manager (POM)', although someone may have this job title. Refers to a probation officer, probation support officer or senior probation officer.

{% endaccordionSection %}
{% accordionSection "R" %}

### reciprocal reason

Do not use.

This was a term used in NOMIS to name a field that was not brought over to DPS.

Instead, in DPS, each [non-association](#non-associations) has a 'reason' and both prisoners have a 'role' in it.

Roles are usually victim or perpetrator.

### release dates

The phrase ‘release dates’ is used to describe a number of key dates in a prisoner's sentence. It includes the dates when their sentence and licence periods expire, and the estimated dates that they will be released from prison.

There are many different types of release date. For example, prisoners who are eligible for home detention curfew, will get a Home detention curfew eligibility date (HDCED). These dates can also change, depending on the circumstances and eligibility of the person in prison. You should consider whether you need to refer to a specific release date if referencing it in your service.

The most common types of release date are:

- Conditional release date (CRD)
  This is the date a person in prison is released from custody, subject to licence conditions.

- Sentence expiry date (SED)
  This is the date a person’s prison sentence expires.

- Licence expiry date (LED)
  This is the date the licence expires where release from custody is subject to licence conditions.

Read the [full list of release dates (MoJ staff only)](https://justiceuk.sharepoint.com/sites/Courtcaseandreleasedates/SitePages/Release-date-types-and-definitions.aspx).

### remand prisoner, on remand, remanded in custody

Someone is on remand if they are placed in custody whilst awaiting trial. Read [guidance on how to talk about people in the justice system (MoJ staff only)](https://docs.google.com/document/d/1Vh_ReT14BKQ8ATEZcSIyDvvPERW0NJA7Grhk1trKAq8/edit?tab=t.0#heading=h.zcolbmcvf6md).

### ROTL (Release on Temporary Licence)

Use upper case.

Users may well understand the acronym on its own. If you have evidence of this, use the acronym first and then spell out in brackets.

{% endaccordionSection %}
{% accordionSection "T" %}

### temporary absence

A temporary absence is when a person is allowed to leave prison for a short period. This could be to help them prepare for release by attending a work placement or for an exceptional circumstance such as receiving hospital treatment.

Temporary absence may be referred to as TAP (temporarily absent prisoner), but we should use temporary absence.

<h3 class="govuk-heading-m" id="times">times (in prison)</h3>

Use the 24-hour clock for DPS and any service used by prison staff. For example, 14:00 not 2.00pm.

The 24-hour clock should also be used for time input fields.

The 24-hour clock is widely used in prisons. Research has shown that [using the 12-hour clock in prison may cause confusion (MoJ staff only)](https://trello.com/c/D57IWwVT).

If your service is on DPS but is used by both prison and probation staff, it should still use the 24-hour clock.

### times (in probation)

Use the 12-hour clock for services in the probation space. For example, 11am.

{% endaccordionSection %}
{% accordionSection "V" %}

### Violent and Sex Offender Register (ViSOR)

Use ViSOR. This is more well known than the full version. Read [guidance on how to talk about people in the justice system (MoJ staff only)](https://docs.google.com/document/d/1Vh_ReT14BKQ8ATEZcSIyDvvPERW0NJA7Grhk1trKAq8/edit?tab=t.0#heading=h.zcolbmcvf6md).

{% endaccordionSection %}
{% accordionSection "W" %}

### working name

See [preferred name](#preferred-name).

{% endaccordionSection %}
{% accordionSection "X" %}

### X-ray body scan

Capital 'X' and lower case 'r'. Do not shorten to 'body scan' as this may be confused with other types of scans that take place in prisons.

{% endaccordionSection %}
{% accordionSection "Y" %}

### youth offender

This describes a prisoner aged between 15 and 21.

Read [guidance on how to talk about people in the justice system (MoJ staff only)](https://docs.google.com/document/d/1Vh_ReT14BKQ8ATEZcSIyDvvPERW0NJA7Grhk1trKAq8/edit?tab=t.0#heading=h.zcolbmcvf6md).

{% endaccordionSection %}
{% endaccordion %}
