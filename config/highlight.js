const highlightJs = require('highlight.js')

highlightJs.registerAliases(['mjs', 'njk'], { languageName: 'javascript' })

module.exports = function(string, language) {
  if (language) {
    // Code language has been set, or can be determined
    let code
    if (highlightJs.getLanguage(language)) {
      code = highlightJs.highlight(string, { language }).value
    } else {
      code = highlightJs.highlightAuto(string).value
    }
    return `<pre><code data-module="app-scroll-container" tabindex="0" class="language-${language}">${code}</code></pre>\n`
  }

  // No language found, so render as plain text
  return `<pre><code data-module="app-scroll-container" tabindex="0">${string}</code></pre>\n`
}
