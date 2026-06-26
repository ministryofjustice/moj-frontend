module.exports = function () {
  return {
    isStaging: process.env.ENV === 'staging' || false,
    showCommunity: true,
    siteUrl:
      process.env.SITE_URL || 'https://design-patterns.service.justice.gov.uk'
  }
}
