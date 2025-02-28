const generateMarkdown = (data) => {
  const {
    '/component-details': details,
    '/accessibility-findings': accessibilityFindings,
    '/your-details': yourDetails
  } = data

  const documentationDirectory = 'component/documentation'
  const componentName = details?.componentName || 'unknown-component'
  const sanitizedComponentName = componentName
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '-')
  const filename = `${documentationDirectory}/${sanitizedComponentName}.md`
  const today = new Date()
  const formattedDate = today.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  })

  const generatePrototypeSection = (data) => {
    let content = '### Prototype\n'
    let n = 1
    while (data[`/prototype${n > 1 ? `-${n}` : ''}`]) {
      const prototype = data[`/prototype-url${n > 1 ? `-${n}` : ''}`]
      content += `
${prototype?.prototypeUrlAdditionalInformation || ''}

<a href="${prototype?.prototypeUrl || ''}" target="_blank" rel="noopener noreferrer">Prototype example (opens in a new tab)</a>
`
      n++
    }
    return content
  }

  const generateComponentCodeSection = (data) => {
    let content = '### Component Code\n'
    let n = 1
    while (data[`/component-code${n > 1 ? `-${n}` : ''}`]) {
      const componentCodeDetails =
        data[`/component-code-details${n > 1 ? `-${n}` : ''}`]
      content += `

### ${componentCodeDetails?.componentCodeLanguage || ''}

${componentCodeDetails?.componentCodeUsage || ''}

<div class="app-example app-example-borders">

\`\`\`html
${componentCodeDetails?.componentCode || ''}
\`\`\`

</div>
`
      n++
    }
    return content
  }

  const content = `---
layout: layouts/component.njk
title: ${componentName}
type: component
eleventyNavigation:
  key: ${componentName}
  parent: Components
  excerpt: "${details?.briefDescription || ''}"
---

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

${generateComponentCodeSection(data)}

{% endtab %}

{% tab "Additional Info" %}

## Links

${generatePrototypeSection(data)}

## Thing to consider

{% endtab %}

{% tab "Accessibility" %}

## Accessibility

## Links

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
`

  return { filename, content }
}

module.exports = { generateMarkdown }
