const releasePackage = require('../package/package.json')

module.exports = function () {
  return releasePackage.version
}
