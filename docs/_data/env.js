module.exports = function () {
  return {
    isStaging: process.env.ENV === 'staging' || false,
    showCommunity: true
  }
}
