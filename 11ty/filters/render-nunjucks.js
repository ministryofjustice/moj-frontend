const nunjucksEnv = require('../config/nunjucks')

module.exports = function (string, context) {
  return nunjucksEnv.renderString(string, context)
}
