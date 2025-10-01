const nunjucks = require('nunjucks')

const nunjucksEnv =  nunjucks.configure([
    '.',
    'src',
    'docs/_includes/',
    'node_modules/govuk-frontend/dist/'
  ])

module.exports = nunjucksEnv

