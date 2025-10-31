const MarkdownIt = require('markdown-it')
const nunjucks = require('nunjucks')
const md = new MarkdownIt()

const nunjucksEnv = nunjucks.configure([
  '.',
  'src',
  'docs/_includes/',
  'node_modules/govuk-frontend/dist/'
])

nunjucksEnv.addFilter('markdown', (str) => md.renderInline(str))

module.exports = nunjucksEnv
