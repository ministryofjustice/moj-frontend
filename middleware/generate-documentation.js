const BASE_PATH = '/get-involved/add-new-component';

const generateMarkdown = (data) => {
  const {
    [`${BASE_PATH}/component-details`]: details,
    [`${BASE_PATH}/accessibility-findings`]: accessibilityFindings,
    [`${BASE_PATH}/accessibility-findings-more`]: accessibilityFindingsMore,
    [`${BASE_PATH}/prototype`]: prototype,
    [`${BASE_PATH}/prototype-url`]: prototypeUrl,
    [`${BASE_PATH}/component-code`]: componentCode,
    [`${BASE_PATH}/component-code-details`]: componentCodeDetails,
    [`${BASE_PATH}/component-image`]: imageData,
    [`${BASE_PATH}/additional-information`]: additionalInformation,
    [`${BASE_PATH}/your-details`]: yourDetails
  } = data;

  const documentationDirectory = 'component/documentation';
  const componentName = details?.componentName || 'unknown-component';
  const sanitizedComponentName = componentName
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '-');
  const filename = `${documentationDirectory}/${sanitizedComponentName}.md`;
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });
  let content = `---
layout: layouts/component.njk
title: ${componentName}
type: component
eleventyNavigation:
  key: ${componentName}
  parent: Components
  excerpt: "${details?.briefDescription || ''}"
---

# ${componentName}

{% tabs "Contents" %}

{% tab "Overview" %}
## Overview
${details?.componentOverview || ''}

## Why is the component needed?
${details?.componentProblemSolved || ''}

## Current uses for the component
${details?.howIsTheComponentUsed || ''}

{% endtab %}

{% tab "Code Stuff" %}
## Code Stuff

## ${componentCodeDetails?.howIsTheComponentUsed || ''}

${componentCodeDetails?.componentCode || ''}

{% endtab %}

{% tab "Additional Info" %}
## Additional Info
${additionalInformation?.additionalInformation || ''}

## Links

<a href="${prototypeUrl?.prototypeUrl || ''}" target="_blank" rel="noopener noreferrer">Protoype example (opens in a new tab)</a>

## Thing to consider

{% endtab %}

{% tab "Accessibility" %}
## Accessibility
${accessibilityFindingsMore?.accessibilityTellUsMore || ''}

## Links

<a href="${prototypeUrl?.prototypeUrl || ''}" target="_blank" rel="noopener noreferrer">Protoype example (opens in a new tab)</a>

## Thing to consider

{% endtab %}

{% tab "Contribution" %}
## Contribution
${yourDetails?.fullName || ''}
${yourDetails?.emailAddress || ''}

## History

**${yourDetails?.fullName || ''}** ${formattedDate}
Component added

{% endtab %}

{% endtabs %}
`;

  return { filename, content };
};

module.exports = { generateMarkdown };
