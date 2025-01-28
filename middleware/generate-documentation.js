const generateMarkdown = (data) => {
  const {
    '/get-involved/add-new-component/component-details': details,
    '/get-involved/add-new-component/component-image': imageData
  } = data
  const documentationDirectory = 'component/documentation'
  const componentName = details?.componentName || 'unknown-component'
  const sanitizedComponentName = componentName
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '-')
  const filename = `${documentationDirectory}/${sanitizedComponentName}.md`

  let content = `---
layout: layouts/component.njk
title: ${componentName}
type: component
eleventyNavigation:
  key: ${componentName}
  parent: Components
  excerpt: "${details?.briefDescription || ''}"
---
`

  if (details?.componentName) {
    content += `# ${details.componentName}\n\n`
  }

  if (details?.briefDescription) {
    content += `## Brief Description\n\n${details.briefDescription}\n\n`
  }

  if (details?.whyNeeded) {
    content += `## Why this is needed\n\n${details.whyNeeded}\n\n`
  }

  if (imageData?.componentImage?.originalname) {
    const imageName = imageData.componentImage.originalname
    content += `<img src="{{ 'assets/images/${imageName} | rev | url' }}" alt="" width="100%">\n\n`
  }

  return { filename, content }
}

module.exports = { generateMarkdown }
