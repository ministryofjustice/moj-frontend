const getPrTitleAndDescription = (session) => {
  const title = session?.['/component-details']?.componentName || ''
  const description = session?.['/component-details']?.componentOverview || ''
  return { title, description }
}

module.exports = getPrTitleAndDescription
