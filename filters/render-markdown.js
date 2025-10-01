const markdown = require('../config/markdown')

module.exports = function(string) {
  return `${markdown.render(string)}`
}
