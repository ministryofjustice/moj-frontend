const markdownIt = require('markdown-it')
const markdownItAnchor = require('markdown-it-anchor')
const highlight = require('./highlight')

const markdown = markdownIt({
    html: true,
    typographer: true,
    quotes: '“”‘’',
    highlight
  })
  .disable('code')
  .use(markdownItAnchor, {
    level: [1, 2, 3, 4]
  })

module.exports = markdown

