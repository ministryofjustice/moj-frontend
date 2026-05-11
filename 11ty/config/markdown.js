const slugify = (s) => string(s).slugify().toString()
const markdownIt = require('markdown-it')
const markdownItAnchor = require('markdown-it-anchor')
const string = require('string')

const highlight = require('./highlight')

const markdown = markdownIt({
  html: true,
  typographer: true,
  quotes: '“”‘’',
  highlight
})
  .disable('code')
  .use(markdownItAnchor, {
    level: [1, 2, 3, 4],
    slugify
  })

module.exports = markdown
