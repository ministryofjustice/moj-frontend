/* eslint-disable prefer-template */
const moment = require('moment')

const { MAX_ADD_ANOTHER } = require('../config.js')
const { titleize } = require('../helpers/text-helper.js')

const generateEleventyDataFile = (data) => {
  const { '/component-details': details } = data

  const componentName =
    details?.componentName?.toLowerCase() || 'unknown-component'

  const sanitizedComponentName = componentName
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/-+/g, '-')

  const filename = `${sanitizedComponentName}/${sanitizedComponentName}.11tydata.js`

  const content = `export default {
  githuburl: 'https://github.com/ministryofjustice/moj-frontend/discussions/categories/experimental-components-pages-and-patterns',
  tabCollection: '${sanitizedComponentName}',
  blockTitle: '${titleize(componentName)}'
}`

  return { filename, content }
}

const generateMarkdown = (data, files, tab) => {
  const { '/component-details': details } = data

  const componentName =
    details?.componentName?.toLowerCase() || 'unknown-component'

  const sanitizedComponentName = componentName
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/-+/g, '-')

  const filename = `${sanitizedComponentName}/${tab ? `_${tab}` : 'index'}.md`

  const githubDiscussionLink = (componentName = '') => {
    return `[${componentName ? `‘${componentName}’ ` : ''}Github discussion]({{ githuburl }})`
  }

  const generateIndexContent = (data) => {
    const content = `---
title: ${titleize(componentName)}
tabs: true
status: Experimental
statusDate: ${moment().format('MMMM YYYY')}
excerpt: "${details?.briefDescription || ''}"
lede: "${details?.briefDescription || ''}"
${data['/your-details']?.fullName ? (data['/your-details']?.fullName === 'Not shared' ? '' : `contributorName: ${data['/your-details']?.fullName}`) : ''}
${data['/your-details']?.teamName ? (data['/your-details']?.teamName === 'Not shared' ? '' : `contributorTeam: ${data['/your-details']?.teamName}`) : ''}
---`

    return content
  }

  const generateOverViewTabContent = () => {
    let content = ``
    content += `---
title: Overview
order: 10
tags: '${sanitizedComponentName}'
permalink: false
eleventyComputed:
  override:eleventyNavigation: false
---\r\n`
    content += `<div class="img-container">
  <img src="/${files?.['/component-image']?.path}" alt="${componentName}" />
</div>

## Overview
${details?.componentOverview || ''}

### How the component is currently used

${details?.howIsTheComponentUsed || ''}

### Contribute to this component
You can help develop this component by adding information to the ${githubDiscussionLink(componentName)}. This helps other people to use it in their service.`

    return content
  }

  const generateDesignsTabContent = (data) => {
    let content = ''
    content += `---
title: Designs
order: 20
tags: '${sanitizedComponentName}'
permalink: false
eleventyComputed:
  override:eleventyNavigation: false
---\r\n`
    if (data['/figma-link']?.figmaUrl ) {
      content += `A Figma design has been added for this component. There may be more links and resources in the ${githubDiscussionLink(componentName)}.\r\n

### Figma

If you work for MOJ, [View the ‘${componentName}’ component in the MOJ Figma Kit](${data['/figma-link']?.figmaUrl || ''}).

If you work outside MOJ, go to the [MOJ Figma Kit on the Figma community platform](https://www.figma.com/community/file/1543193133973726850/moj-design-system-figma-kit).\r\n\r\n`

      content += `### Contribute prototypes and Figma links

If you have design files that are relevant to this component you can add them to the ${githubDiscussionLink()}. This helps other people to use it in their service.`
    } else {
      content = `A Figma link was not included when this component was added.

There may be more information in the ${githubDiscussionLink(componentName)}. You can also view the component image in the overview.

## Contribute a Figma link

If you have a Figma link for this component (or a component like it) you can add it to ${githubDiscussionLink()}. This helps other people to use it in their service.`
    }

    return content
  }

  const generateAccessibilityTabContent = (data) => {
    const formatDate = (day, month, year) => {
      if (day && month && year) {
        return moment(`${year}-${month}-${day}`, 'YYYY-M-D').format(
          'D MMMM YYYY'
        )
      }
      return null
    }

    let content = ''
    const frontmatter = `---
title: Accessibility
order: 30
tags: '${sanitizedComponentName}'
permalink: false
eleventyComputed:
  override:eleventyNavigation: false
---\r\n`
    const externalAudit = data['/add-external-audit']
    const hasExternalAudit = externalAudit && typeof externalAudit === 'object' && Object.keys(externalAudit).length > 0
    const internalAudit = data['/add-internal-audit']
    const hasInternalAudit = internalAudit && typeof internalAudit === 'object' && Object.keys(internalAudit).length > 0
    const assistiveTech = data['/add-assistive-tech']
    const hasAssistiveTech = assistiveTech && typeof assistiveTech === 'object' && Object.keys(assistiveTech).length > 0

    if (hasExternalAudit){
      const externalAuditDate = formatDate(
        externalAudit['auditDate-day'],
        externalAudit['auditDate-month'],
        externalAudit['auditDate-year']
      )

      content += `### External audit

* Conducted by: ${externalAudit.externalOrganisation}
* Date: ${externalAuditDate}

#### Audit findings

${externalAudit.issuesDiscovered}\r\n`
    }

    if (hasInternalAudit) {
      const internalAuditDate = formatDate(
        internalAudit['auditDate-day'],
        internalAudit['auditDate-month'],
        internalAudit['auditDate-year']
      )
      content += `### Internal review

* By: ${internalAudit.internalOrganisation}
* Date: ${internalAuditDate}

#### Review findings

${internalAudit.issuesDiscovered}\r\n`
    }

    if (hasAssistiveTech) {
      const testingDate = formatDate(
        assistiveTech['testingDate-day'],
        assistiveTech['testingDate-month'],
        assistiveTech['testingDate-year']
      )
      content += `### Assistive Technology testing

Date: ${testingDate}

#### Testing details

${assistiveTech.issuesDiscovered}\r\n`
    }

    if (hasExternalAudit || hasInternalAudit || hasAssistiveTech) {
      content = `Accessibility findings have been added for this component. There may be more findings in the ${githubDiscussionLink(componentName)}.\r\n

${content}\r\n`
    } else {
      content = `No accessibility findings were included when this component was added. There may be more information in the ${githubDiscussionLink(componentName)}.\r\n`
    }

    content += `## Contribute accessibility findings

If you have accessibility findings that are relevant to this component you can add them to the ${githubDiscussionLink()}. This helps other people to use it in their service.`

    return frontmatter + content
  }

  const generateCodeTabContent = (data) => {
    const hljsLang = (lang) => {
      switch (lang?.toLowerCase()) {
        case 'html':
        case 'css':
        case 'scss':
        case 'javascript':
        case 'typescript':
          return lang
        case 'nunjucks':
          return 'njk'
        case 'sass':
          return 'scss'
        case 'react':
          return 'javascript'
        default:
          return ''
      }
    }
    let content = ''
    const frontmatter = `---
title: Code
order: 40
tags: '${sanitizedComponentName}'
permalink: false
eleventyComputed:
  override:eleventyNavigation: false
---\r\n`
    for (let i = 0; i <= MAX_ADD_ANOTHER; i++) {
      const code = data[`/component-code-details${i === 0 ? '' : `/${i}`}`]
      const hasCode = code && typeof code === 'object' && Object.keys(code).length > 0
      if (!hasCode) {
        break
      }
      const language =
        code?.componentCodeLanguage === 'other'
          ? code?.componentCodeLanguageOther
          : code?.componentCodeLanguage

      content += `
### Code block ${i + 1}: ${language}

<div class="app-example__code" data-module="app-copy">

\`\`\`${hljsLang(language)}
{% raw %}
${code?.componentCode || ''}
{% endraw %}
\`\`\`

</div>
`
      if (code?.componentCodeUsage) {
        content += `
#### How to use the code

${code.componentCodeUsage}`
      }
      content += `\r\n\r\n`
    }

    if (data['/component-code-details'] && typeof data['/component-code-details']  === 'object' && Object.keys(data['/component-code-details'] ).length > 0) {
      content = `Code has been added for this component. There may be other code blocks in the ${githubDiscussionLink(componentName)}.

${content}

## Contribute code for this component

If you have code that is relevant to this component you can add it to the ${githubDiscussionLink()}. This helps other people to use it in their service.`
    } else {
      content = `No code was included when this contribution was added.

You can use the ${githubDiscussionLink(componentName)} to:

* view other code blocks
* add relevant code
`
    }

    return frontmatter + content
  }

  let content = ''

  switch (tab) {
    case 'overview':
      content = generateOverViewTabContent()
      break
    case 'designs':
      content = generateDesignsTabContent(data)
      break
    case 'accessibility':
      content = generateAccessibilityTabContent(data)
      break
    case 'code':
      content = generateCodeTabContent(data)
      break
    default:
      content = generateIndexContent(data)
  }

  return { filename, content }
}

module.exports = { generateMarkdown, generateEleventyDataFile }
