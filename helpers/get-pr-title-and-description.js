const getPrTitleAndDescription = (session) => {
  const componentName =
    session?.['/component-details']?.componentName || 'Unnamed component'
  const title = `docs(contribution): ${componentName}`
  const description = session?.['/component-details']?.componentOverview || ''
  return { title, description }
}

module.exports = getPrTitleAndDescription
