const { upperFirst } = require('lodash')

const inspect = require('./inspect')
const paths = require('./paths')
const renderMarkdown = require('./render-markdown')
const renderNunjucksString = require('./render-nunjucks')
const rev = require('./rev')
const timestamp = require('./timestamp')

const filters = {
  ...paths,
  inspect,
  renderMarkdown,
  renderNunjucksString,
  rev,
  timestamp,
  upperFirst
}

module.exports = (config) => {
  Object.entries(filters).forEach((item) => {
    const [name, filter] = item
    config.addFilter(name, filter)
  })
}
