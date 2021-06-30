---
layout: layouts/component.njk
title: Badge
---

{% banner "The GOV.UK Design System has a similar component" %}
The [Tag component](https://design-system.service.gov.uk/components/tag/) in the GOV.UK Design System has a similar function and visual design to this component.

You should consider using the GOV.UK version if it fits your needs.
{% endbanner %}

Use the badge component to highlight small details like an urgent case.

{% lastUpdated "badge" %}

{% example "/examples/badge", 125 %}

## When to use this component

The badge is useful for drawing users attention to particular information. It should be used sparingly because when used a lot it loses its value.

## How it works

There are 2 ways to use the badge component. You can use HTML or, if you are using [Nunjucks](https://mozilla.github.io/nunjucks/) or the [GOV.UK Prototype Kit](https://govuk-prototype-kit.herokuapp.com/), you can use the Nunjucks macro.

The default, neutral badge is blue. Alternative styles are also available, for example, green and red.

{% example "/examples/badge-complete", 125 %}

{% example "/examples/badge-urgent", 125 %}

## Additional styles

There are a number of additional colour styles that can be used:

<table class="govuk-table">
<thead class="govuk-table__head">
  <tr class="govuk-table__row">
    <th class="govuk-table__header" scope="col">Class name</th>
    <th class="govuk-table__header" scope="col">badge</th>
  </tr>
</thead>
<tbody class="govuk-table__body">
  <tr class="govuk-table__row">
    <td class="govuk-table__cell">
      <code>moj-badge--purple</code>
    </td>
    <td class="govuk-table__cell">
      <span class="moj-badge moj-badge--purple">Lorem ipsum 1</span>
    </td>
  </tr>
  <tr class="govuk-table__row">
    <td class="govuk-table__cell">
      <code>moj-badge--bright-purple</code>
    </td>
    <td class="govuk-table__cell">
      <span class="moj-badge moj-badge--bright-purple">Lorem ipsum 2</span>
    </td>
  </tr>
  <tr class="govuk-table__row">
    <td class="govuk-table__cell">
      <code>moj-badge--red</code>
    </td>
    <td class="govuk-table__cell">
      <span class="moj-badge moj-badge--red">Lorem ipsum 3</span>
    </td>
  </tr>
  <tr class="govuk-table__row">
    <td class="govuk-table__cell">
      <code>moj-badge--green</code>
    </td>
    <td class="govuk-table__cell">
      <span class="moj-badge moj-badge--green">Lorem ipsum 4</span>
    </td>
  </tr>
  <tr class="govuk-table__row">
    <td class="govuk-table__cell">
      <code>moj-badge--blue</code>
    </td>
    <td class="govuk-table__cell">
      <span class="moj-badge moj-badge--blue">Lorem ipsum 5</span>
    </td>
  </tr>
  <tr class="govuk-table__row">
    <td class="govuk-table__cell">
      <code>moj-badge--black</code>
    </td>
    <td class="govuk-table__cell">
      <span class="moj-badge moj-badge--black">Lorem ipsum 6</span>
    </td>
  </tr>
  <tr class="govuk-table__row">
    <td class="govuk-table__cell">
      <code>moj-badge--grey</code>
    </td>
    <td class="govuk-table__cell">
      <span class="moj-badge moj-badge--grey">Lorem ipsum 7</span>
    </td>
  </tr>
</tbody>
</table>

### With a size modifier

<table class="govuk-table">
<thead class="govuk-table__head">
  <tr class="govuk-table__row">
    <th class="govuk-table__header" scope="col">Class names</th>
    <th class="govuk-table__header" scope="col">badge</th>
  </tr>
</thead>
<tbody class="govuk-table__body">
  <tr class="govuk-table__row">
    <td class="govuk-table__cell">
      <code>moj-badge--purple moj-badge--large</code>
    </td>
    <td class="govuk-table__cell">
      <span class="moj-badge moj-badge--purple moj-badge--large">Lorem ipsum 1</span>
    </td>
  </tr>
  <tr class="govuk-table__row">
    <td class="govuk-table__cell">
      <code>moj-badge--bright-purple moj-badge--large</code>
    </td>
    <td class="govuk-table__cell">
      <span class="moj-badge moj-badge--bright-purple moj-badge--large">Lorem ipsum 2</span>
    </td>
  </tr>
  <tr class="govuk-table__row">
    <td class="govuk-table__cell">
      <code>moj-badge--red moj-badge--large</code>
    </td>
    <td class="govuk-table__cell">
      <span class="moj-badge moj-badge--red moj-badge--large">Lorem ipsum 3</span>
    </td>
  </tr>
  <tr class="govuk-table__row">
    <td class="govuk-table__cell">
      <code>moj-badge--green moj-badge--large</code>
    </td>
    <td class="govuk-table__cell">
      <span class="moj-badge moj-badge--green moj-badge--large">Lorem ipsum 4</span>
    </td>
  </tr>
  <tr class="govuk-table__row">
    <td class="govuk-table__cell">
      <code>moj-badge--blue moj-badge--large</code>
    </td>
    <td class="govuk-table__cell">
      <span class="moj-badge moj-badge--blue moj-badge--large">Lorem ipsum 5</span>
    </td>
  </tr>
  <tr class="govuk-table__row">
    <td class="govuk-table__cell">
      <code>moj-badge--black moj-badge--large</code>
    </td>
    <td class="govuk-table__cell">
      <span class="moj-badge moj-badge--black moj-badge--large">Lorem ipsum 6</span>
    </td>
  </tr>
  <tr class="govuk-table__row">
    <td class="govuk-table__cell">
      <code>moj-badge--grey moj-badge--large</code>
    </td>
    <td class="govuk-table__cell">
      <span class="moj-badge moj-badge--grey moj-badge--large">Lorem ipsum 7</span>
    </td>
  </tr>
</tbody>
</table>

## Research on this component

This component has been used successfully in the following services:

- Claim fees for Crown court defence (Legal Aid Agency)
- Prisoner Escort Request (Her Majesty’s Prison and Probation Service)
- Professional case manager (Her Majesty’s Courts and Tribunals Service)

## Contribute to this component

You can contribute to this component via the [design system backlog](https://github.com/ministryofjustice/moj-design-system-backlog/issues/26)
