/* eslint-disable prefer-template */
const moment = require('moment')

const generateMarkdown = (data) => {
  const { '/component-details': details } = data

  const documentationDirectory = 'component/documentation'
  const componentName = details?.componentName || 'unknown-component'
  const sanitizedComponentName = componentName
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '-')
  const filename = `${documentationDirectory}/${sanitizedComponentName}.md`
  const generateLinksSection = (data) => {
    const noLinks =
      'No links have been provided for this component. If you have used this component in your service and you have a prototype you can share it here.\n'

    let content = ''
    let prototypeContent = ''
    let figmaContent = ''
    let n = 0

    // Process prototype data
    while (data[`/prototype-url${n > 0 ? `/${n}` : ''}`]) {
      const prototype = data[`/prototype-url${n > 0 ? `/${n}` : ''}`]
      prototypeContent += `
${prototype?.prototypeUrlAdditionalInformation || ''}

<a href="${prototype?.prototypeUrl || ''}" target="_blank" rel="noopener noreferrer">Prototype link (opens in a new tab)</a>
`
      n++
    }

    // Process figma data
    n = 0
    while (data[`/figma-link${n > 0 ? `/${n}` : ''}`]) {
      const figma = data[`/figma-link${n > 0 ? `/${n}` : ''}`]
      figmaContent += `
${figma?.figmaLinkAdditionalInformation || ''}

<a href="${figma?.figmaUrl || ''}" target="_blank" rel="noopener noreferrer">Figma link (opens in a new tab)</a>
`
      n++
    }

    if (prototypeContent.length) {
      content += '### Prototype\n' + prototypeContent
    }
    if (figmaContent.length) {
      content += '\n### Figma\n' + figmaContent
    }

    return content.length ? content : noLinks
  }

  const generateAccessibilityReportSection = (data) => {
    const contentHeading =
      'If you have had an accessibility audit or tested with users with access needs then you could contribute to this component.\n'
    const noContent =
      'No accessibility findings have been contributed for this component.\n'
    let content = ''
    const externalAudit = data['/add-external-audit']
    const internalAudit = data['/add-internal-audit']
    const assistiveTech = data['/add-assistive-tech']

    const formatDate = (day, month, year) => {
      if (day && month && year) {
        return moment(`${year}-${month}-${day}`, 'YYYY-M-D').format('MMMM YYYY')
      }
      return null
    }

    if (externalAudit && externalAudit.externalOrganisation) {
      const auditDate = formatDate(
        externalAudit['auditDate-day'],
        externalAudit['auditDate-month'],
        externalAudit['auditDate-year']
      )
      if (auditDate) {
        content += `### External audit (${externalAudit.externalOrganisation}) - ${auditDate}\n`
        if (externalAudit.issuesDiscovered) {
          content += externalAudit.issuesDiscovered + '\n'
        }
        if (externalAudit.accessibilityReport) {
          content += `[Download the accessibility report](/uploads/${externalAudit.accessibilityReport})\n`
        }
      }
    }

    if (internalAudit && internalAudit.internalOrganisation) {
      const auditDate = formatDate(
        internalAudit['auditDate-day'],
        internalAudit['auditDate-month'],
        internalAudit['auditDate-year']
      )
      if (auditDate) {
        content += `### Internal audit (${internalAudit.internalOrganisation}) - ${auditDate}\n`
        if (internalAudit.issuesDiscovered) {
          content += internalAudit.issuesDiscovered + '\n'
        }
        if (internalAudit.accessibilityReport) {
          content += `[Download the accessibility report](/uploads/${internalAudit.accessibilityReport})\n`
        }
      }
    }

    if (assistiveTech) {
      const testingDate = formatDate(
        assistiveTech['testingDate-day'],
        assistiveTech['testingDate-month'],
        assistiveTech['testingDate-year']
      )
      if (testingDate) {
        content += `### Assistive Technology audit - ${testingDate}\n`
        if (assistiveTech.issuesDiscovered) {
          content += assistiveTech.issuesDiscovered + '\n'
        }
        if (assistiveTech.accessibilityReport) {
          content += `[Download the accessibility report](/uploads/${assistiveTech.accessibilityReport})\n`
        }
      }
    }

    return content ? contentHeading + content : noContent
  }

  const generateComponentCodeSection = (data) => {
    const noCode =
      'No code has been contributed for this component. If you have examples of how you have used this component in your service then you could help the community. Most users are looking for HTML, Nunjucks, Javascript and CSS or SASS.\n'

    let content = ''
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
    return content.length ? content : noCode
  }

  const content = `---
layout: layouts/tabbed-component.njk
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

## How the component is currently used

${details?.howIsTheComponentUsed || ''}

{% endtab %}

{% tab "Code" %}

## Help develop existing building blocks in GitHub

After a new building block is published in the design system, you, and other users, have the chance to continue enhancing it. This is done with users adding more information and resources to the component via GitHub.

To do this you should:

- go to the GitHub conversation
- add your comments, information and resources about the building block

## Code

${generateComponentCodeSection(data)}

{% endtab %}

{% tab "Accessibility" %}

## Accessibility

${generateAccessibilityReportSection(data)}

{% endtab %}

{% tab "Links" %}

## Links

${generateLinksSection(data)}

{% endtab %}

{% endtabs %}
`

  return { filename, content }
}

module.exports = { generateMarkdown }
