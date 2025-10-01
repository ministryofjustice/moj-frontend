const paths = require( "./paths")
const renderMarkdown = require( "./render-markdown")
const renderNunjucks = require( "./render-nunjucks")
const rev = require( "./rev")
const timestamp = require( "./timestamp")

module.exports = {
  ...paths,
  renderMarkdown,
  renderNunjucks,
  rev,
  timestamp
}
